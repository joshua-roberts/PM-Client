import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {getResponseURL} from '@angular/http/src/http_utils';

@Injectable()
export class PepService {

    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    private pepUrl = 'http://localhost:8082/pm/api/pep';

    constructor(private http: HttpClient,
                private router: Router) { }

    login(username, password) {
        const data = {
            'username': username,
            'password': password
        };

        return this.http
            .post(`${this.pepUrl}/sessions`, data, this.headers)
            .toPromise()
            .then(response => {
                console.log(response['entity']);
                const sessionId = response['entity'];
                if (sessionId != null) {
                    localStorage.setItem('SESSION_ID', sessionId);
                    localStorage.setItem('SESSION_USER', username);
                    return sessionId;
                } else {
                    return null;
                }
            });
    }

    getWriteFields(username: string, rowId: string, tableName: string): Promise<any> {
        return this.http.get(`${this.pepUrl}/analytics/rows/${rowId}/columns?username=${username}&table=${tableName}`)
            .toPromise()
            .then(response => {
                console.log(response);
                return response['entity'];
            });
    }

    createNode(name, type, properties, baseId): Promise<any> {
        const data = {
            'name': name,
            'type': type,
            'properties': properties
        };
        return this.http
            .post(`http://localhost:8082/pm/api/kernel/nodes/${baseId}`, data, this.headers)
            .toPromise()
            .then(response => {
                console.log(response);
                return response['entity'];
            });
    }

    getNode(namespace, name): Promise<any> {
        return this.http.get(`${this.pepUrl}/nodes?namespace=${namespace}&name=${name}`)
            .toPromise()
            .then(response => {
                return response['entity'][0];
            });
    }

    getNodeByProp(propName, propValue): Promise<any> {
        return this.http.get(`${this.pepUrl}/nodes?key=${propName}&value=${propValue}`)
            .toPromise()
            .then(response => {
                console.log(response);
                return response['entity'][0];
            });
    }

    getRequests(username, nodeName): Promise<any> {
        return this.getNode(username, nodeName);
    }

    getChildren(id) {
        return this.http.get(`${this.pepUrl}/nodes/${id}/children`)
            .toPromise()
            .then(response => {
                console.log(response);
                return response['entity'];
            });
    }

    assign(child, parent) {
        const data = {
            'childId': child.id,
            'parentId': parent.id
        };
        return this.http
            .post(`${this.pepUrl}/assignments`, data, this.headers)
            .toPromise()
            .then((response) => {
                console.log(response);
            });
    }

    deassign(child, parent) {
        return this.http
            .delete(`${this.pepUrl}/assignments?childId=${child.id}&parentId=${parent.id}`, this.headers)
            .toPromise()
            .then((response) => {
                console.log(response);
            });
    }

    deleteNode(node) {
        return this.http.delete(`${this.pepUrl}/nodes/${node.id}`, this.headers)
            .toPromise()
            .then(response => {
                console.log(response);
            });
    }

    private getSessionId(): string {
        console.log(localStorage.getItem('SESSION_ID'));
        return localStorage.getItem('SESSION_ID');
    }

    private getSessionUserName(): string {
        console.log(localStorage.getItem('SESSION_USER'));
        return localStorage.getItem('SESSION_USER');
    }

    getSessionUserNode() {
        return this.getNodes(this.getSessionUserName(), 'U', null, null, null)
            .then(response => {
                console.log(response);
                return response[0];
            });
    }

    getNodes(name, type, namespace, key, value) {
        const params: URLSearchParams = new URLSearchParams();
        if (name != null) {
            params.set('name', name);
        }

        if (type != null) {
            params.set('type', type);
        }

        if (namespace != null) {
            params.set('namespace', namespace);
        }

        if (key != null) {
            params.set('key', key);
        }

        if (value != null) {
            params.set('value', value);
        }
        return this.http
            .get(`${this.pepUrl}/nodes?${params.toString()}`)
            .toPromise()
            .then(response => {
                return response['entity'];
            });
    }

    getUserPermsOn(targetName, targetType, targetProperties) {
        const targetStr = `target;name=${targetName};type=${targetType};properties=${targetProperties}`;
        return this.http.get(`${this.pepUrl}/analytics/${targetStr}/users/${this.getSessionUserName()}/permissions`)
            .toPromise()
            .then(response => {
                return response['entity'];
            })
    }

    grant(senderId, recipientName, attachmentId) {
        const data = {
            'senderId': senderId,
            'recipientName': recipientName,
            'attachmentId': attachmentId
        };
        return this.http.post(`${this.pepUrl}/grant`, data)
            .toPromise();
    }
}

