import {Injectable} from '@angular/core';
import {Headers, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {PmNode} from '../model/PmNode';
import {AlertService} from './alert.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PmService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };
    // private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});
    private baseGraphUrl = 'http://localhost:8080/pm/api/graph';
    private nodesUrl = 'http://localhost:8080/pm/api/graph/nodes';
    private assignmentsUrl = 'http://localhost:8080/pm/api/assignments';
    private associationsUrl = 'http://localhost:8080/pm/api/associations';
    private analyticsUrl = 'http://localhost:8080/pm/api/analytics';
    private configUrl = 'http://localhost:8080/pm/api/configuration';
    private kernelUrl = 'http://localhost:8080/pm/api/kernel';
    private proUrl = 'http://localhost:8080/pm/api/prohibitions';
    private evrUrl = 'http://localhost:8080/pm/api/evr';
    private sessionUrl = 'http://localhost:8080/pm/api/sessions';
    private translateUrl = 'http://localhost:8080/pm/api/translate';
    private emailUrl = 'http://localhost:8080/pm/api/email';

    public SUCCESS_CODE = 9000;

    constructor(private http: HttpClient,
                private alertService: AlertService) {
    }


    get(url: string, params: URLSearchParams) {
        if (params === null) {
            params = new URLSearchParams();
        }
        params.set('session', localStorage.getItem('SESSION_ID'));

        return this.http
            .get(`${url}?${params.toString()}`)
            .toPromise()
            .then(response => {
                return this.doResponse(response);
            });
    }

    post(url: string, data: any) {
        const params = new URLSearchParams();
        params.set('session', localStorage.getItem('SESSION_ID'));
        return this.http
            .post(`${url}?${params}`, data, this.httpOptions)
            .toPromise()
            .then(response => {
                return this.doResponse(response);
            });
    }

    put(url: string, data: any) {
        console.log(data);
        const params = new URLSearchParams();
        params.set('session', localStorage.getItem('SESSION_ID'));
        return this.http
            .put(`${url}?${params}`, data, this.httpOptions)
            .toPromise()
            .then(response => {
                return this.doResponse(response);
            });
    }

    delete(url: string, params) {
        if (params === null) {
            params = new URLSearchParams();
        }
        params.set('session', localStorage.getItem('SESSION_ID'));
        return this.http.delete(`${url}?${params}`, this.httpOptions)
            .toPromise()
            .then(response => {
                return this.doResponse(response);
            });
    }

    doResponse(response) {
        if (response['code'] !== this.SUCCESS_CODE) {
            this.alertService.error(response['message']);
            throw new Error(response['message']);
        } else {
            return response;
        }
    }

    getProhibitions() {
        return this.get(this.proUrl, null)
            .then((response) => response['entity']);
    }

    getGraph() {
        return this.get(`${this.configUrl}/graph`, null)
            .then((response) => response['entity']);
    }

    getUserGraph() {
        return this.get(`${this.configUrl}/graph/users`, null)
            .then((response) => response['entity']);
    }

    getObjGraph() {
        return this.get(`${this.configUrl}/graph/objects`, null)
            .then((response) => response['entity']);
    }

    createAssociation(uaId: number, targetId: number, ops: string[]) {
        const data = {
            'operations': ops
        };

        return this.post(this.baseGraphUrl + '/' + uaId + '/associations/' + targetId, data)
            .then((response) => response['entity']);
    }

    deleteProhibition(name: string) {
        return this.delete(`${this.proUrl}/${name}`, null)
            .then((response) => response['entity']);
    }

    createProhibition(name: string, subjectType: string, subjectId: number, resources: any,
                      operations: string[], intersection: boolean) {
        const data = {
            'name': name,
            'intersection': intersection,
            'operations': operations,
            'resources': resources,
            'subject': {
                'subjectId': subjectId,
                'subjectType': subjectType
            }
        };

        return this.post(this.proUrl, data)
            .then((response) => response['entity']);
    }

    updateProhibition(name: string, subjectType: string, subjectId: number, resources: any,
                      operations: string[], intersection: boolean) {
        const data = {
            'name': name,
            'intersection': intersection,
            'operations': operations,
            'resources': resources,
            'subject': {
                'subjectId': subjectId,
                'subjectType': subjectType
            }
        };

        return this.put(`${this.proUrl}/${name}`, data)
            .then((response) => response['entity']);
    }

    updateAssociation(uaId: number, targetId: number, ops: string[]) {
        const data = {
            'operations': ops
        };

        return this.put(this.baseGraphUrl + '/' + uaId + '/associations/' + targetId, data)
            .then((response) => response['entity']);
    }

    createNode(name: string, type: string) {
        const data = {
            'name': name,
            'type': type,
            'properties': []
        };
        return this.post(this.nodesUrl, data)
            .then((response) => response['entity']);
    }

    createNodeWProps(name: string, type: string, props: string[]) {
        const propsArr: { key: string, value: string }[] = [];
        for (const prop of props) {
            const propArr = prop.split('=');
            if (propArr.length === 2) {
                propsArr.push({'key': propArr[0], 'value': propArr[1]});
            }
        }
        const data = {
            'name': name,
            'type': type,
            'properties': propsArr
        };

        return this.post(this.nodesUrl, data)
            .then((response) => response['entity']);
    }

    createNodeWPropsAndContent(baseId, name: string, type: string, props: string[]) {
        const propsArr: { key: string, value: string }[] = [];
        for (const prop of props) {
            const propArr = prop.split('=');
            if (propArr.length === 2) {
                propsArr.push({'key': propArr[0], 'value': propArr[1]});
            }
        }
        if (baseId) {
            const data = {
                'parentID': baseId,
                'name': name,
                'type': type,
                'properties': propsArr
            };

            return this.post(this.nodesUrl, data)
                .then((response) => response['entity']);
        } else {
            return this.createNodeWProps(name, type, props);
        }
    }

    assign(childId: number, parentId: number) {
        return this.post(`${this.baseGraphUrl}/${childId}/assignments/${parentId}`, null)
            .then((response) => response['entity']);
    }

    deassign(childId, parentId) {
        return this.delete(`${this.baseGraphUrl}/${childId}/assignments/${parentId}`, null)
            .then((response) => response['entity']);
    }

    association(uaId: number, targetId: number, ops: string[]) {
        const data = {
            'ops': ops
        };
        return this.post(`${this.baseGraphUrl}/${uaId}/associations/${targetId}`, data)
            .then((response) => response['entity']);
    }

    deleteAssociation(targetId: number, uaId: number) {
        return this.delete(`${this.baseGraphUrl}/${uaId}/associations/${targetId}`, null)
            .then((response) => response['entity']);
    }

    getNodes(name: string, type: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('type', type);
        // console.log(params);
        return this.get(this.nodesUrl, params)
            .then((response) => response['entity']);
    }

    // private String sql;
    // private String username;
    // private String process;
    // private String host;
    // private int    port;
    // private String dbUsername;
    // private String dbPassword;
    // private String database;

    translate(sql: string, host: string, port: number,
              dbUsername: string, dbPaswword: string, database: string) {
        const data = {
            'sql': sql,
            'username': localStorage.getItem('SESSION_USER'),
            'process': null,
            'host': host,
            'port': port,
            'dbUsername': dbUsername,
            'dbPassword': dbPaswword,
            'database': database
        }

        // console.log(params);
        return this.post(this.translateUrl, data)
            .then((response) => response['entity']);
    }

    getNodeContent(namespace: string, name: string, type: string, key: string, value: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('namespace', namespace);
        params.set('name', name);
        params.set('type', type);
        params.set('key', key);
        params.set('value', value);
        params.set('content', 'true');
        console.log(params);
        return this.get(this.nodesUrl, params)
            .then((response) => response['entity']);
    }

    getPolicyClasses() {
        return this.getNodes(null, 'PC');
    }

    getObjectAttributes() {
        return this.getNodes(null, 'OA');
    }

    getObjects() {
        return this.getNodes(null, 'O');
    }

    getUserAttributes() {
        return this.getNodes(null, 'UA');
    }

    getUsers() {
        return this.getNodes(null, 'U');
    }

    getAssociations(nodeId: number, type: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('type', type); // either 'source' or 'target'
        return this.get(`${this.baseGraphUrl}/${nodeId}/associations`, params)
            .then((response) => response['entity']);
    }

    getNode(nodeId: number) {
        return this.get(`${this.nodesUrl}/${nodeId}`, null)
            .then((response) => response['entity']);
    }

    getChildren(nodeId: number) {
        return this.get(`${this.nodesUrl}/${nodeId}/children`, null)
            .then((response) => response['entity']);
    }

    getChildrenOfType(id: number, type: string) {
        const url = `${this.nodesUrl}/${id}/children`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('type', type);
        return this.get(url, params)
            .then((response) => response['entity']);
    }

    getParents(nodeId: number) {
        return this.get(`${this.nodesUrl}/${nodeId}/parents`, null)
            .then((response) => response['entity']);
    }

    deleteNode(nodeId: number) {
        return this.delete(`${this.nodesUrl}/${nodeId}`, null)
            .then((response) => response['entity']);
    }

    updateNode(nodeID: number, name: string, props: string[]) {
        const propsArr: { key: string, value: string }[] = [];
        for (const prop of props) {
            const propArr = prop.split('=');
            if (propArr.length === 2) {
                propsArr.push({'key': propArr[0], 'value': propArr[1]});
            }
        }
        const data = {
            'name': name,
            'properties': propsArr
        };
        return this.put(`${this.nodesUrl}/${nodeID}`, data)
            .then((response) => response['entity']);
    }

    login(username: string, password: string) {
        const data = {
            'username': username,
            'password': password
        };

        return this.post(this.sessionUrl, data)
            .then(response => {
                const sessionId = response['entity'];
                localStorage.setItem('SESSION_ID', sessionId);
                localStorage.setItem('SESSION_USER', username);
                return sessionId;
            });
    }

    logout() {
        const sessionId = localStorage.getItem('SESSION_ID');
        if (sessionId !== null) {
            return this.delete(`${this.sessionUrl}/${sessionId}`, null)
                .then(response => {
                    localStorage.removeItem('SESSION_ID');
                    localStorage.removeItem('SESSION_USER');
                    return response['entity'];
                });
        } else {
            return null;
        }
    }

    nlpm(model) {
        return this.post('http://localhost:8080/pm/api/nlpm', model);
    }

    getAccessibleNodes(username: string) {
        return this.get(`${this.analyticsUrl}/${username}/targets/permissions`, null)
            .then(response => response['entity']);
    }

    getUsersPermissions(node) {
        const name = node.name;
        const type = node.type;
        let properties = '';
        for (let prop of node.properties) {
            if (properties.length === 0) {
                properties += prop['key'] + '=' + prop['value'];
            } else {
                properties += ',' + prop['key'] + '=' + prop['value'];
            }
        }

        return this.get(`${this.analyticsUrl}/target;name=${name};type=${type};properties=${properties}/users/permissions`, null)
            .then(response => response['entity']);
    }

    getEmails(box) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('box', box);
        params.set('session', localStorage.getItem('SESSION_ID'));
        return this.get(this.emailUrl, params)
            .then(response => response['entity']);
    }

    // private int emailNodeId;
    // private String emailBody;
    // private String emailSubject;
    // private String recipient;
    // private String sender;
    // private Timestamp timestamp;
    // private List<Integer> attachments;
    sendEmail(emailNodeId: number, emailBody: string, emailSubject: string, recipient: string,
              sender: string, timestamp: number, attachments) {
        const email = {
            'emailNodeId': emailNodeId,
            'emailBody': emailBody,
            'emailSubject': emailSubject,
            'recipient': recipient,
            'sender': sender,
            'timestamp': timestamp,
            'attachments': attachments,
        };

        const params: URLSearchParams = new URLSearchParams();
        params.set('session', localStorage.getItem('SESSION_ID'));

        return this.post(`${this.emailUrl}/sendEmail`, email)
            .then(response => response['entity']);
    }
}

