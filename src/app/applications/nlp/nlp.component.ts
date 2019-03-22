import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PmService} from '../../services/pm.service';

@Component({
    selector: 'app-nlp',
    templateUrl: './nlp.component.html',
    styleUrls: ['./nlp.component.scss']
})
export class NlpComponent implements OnInit {
    @ViewChild('doc') doc: ElementRef;
    commands = [];
    nodeTypes = ['U', 'UA', 'O', 'OA', 'PC'];
    attributeTypes = ['UA', 'OA', 'PC'];
    objectTypes = ['O', 'OA'];
    userTypes = ['U', 'UA'];
    operations = ['read', 'write', 'create', 'delete'];
    maxNodeId = -5;
    nodes = [];
    osadjb = {};
    xml;

    constructor(private pm: PmService) {
    }

    ngOnInit() {
        this.pm.getNodes(null, null).then ((data) => {
            if (data) {
                this.nodes = data;
                // console.log (this.nodes);
                this.nodes.forEach((node) => {
                    if (node.id >= this.maxNodeId) {
                        this.maxNodeId = node.id;
                    }
                })
                // console.log('max node id: ' + ++this.maxNodeId);
            } else {
                alert('get Nodes failed');
            }
        });
    }

    stringify(obj) {
        return JSON.stringify(obj);
    }

    onCompileClick() {
        // const attributes = { id: 'mathApplet',
        //     code: 'jstojava.MathApplet',  width: 1, height: 1} ;
        // const parameters = { jnlp_href: 'math_applet.jnlp'} ;
        // deployJava.runApplet(attributes, parameters, '1.6');
        if (this.doc.nativeElement.value !== '') {
            return true;
        } else {
            return false;
        }
    }

    onSubmitClick() {
        alert('in submit()');
    }

    onSaveClick() {
        alert('in save()');
    }

    filterNodesBy (type) {
        return this.nodes.filter((node) => {
            return node.type === type;
        })
    }

    getEntries (data) {
        console.log (data);
        const entries = [];
        Object.keys(data).forEach((key) => {
            entries.push({'key': key, 'value': data[key]});
        })
        return entries;
    }

    onNodeClick() {
        this.commands.push({
            type: 'node',
            data: {
                'nodeId': ++this.maxNodeId,
                'nodeType': 'Type...',
                'nodeName': '',
                'parentType': 'Type...',
                'parentId': 'Choose...'
            }
        })
        this.nodes.push({
            id: this.maxNodeId,
            name: '',
            type: '',
            properties: [],
            content: null
        });
        // console.log(this.nodes);
    }

    onAssignmentClick() {
        this.commands.push({
            type: 'assignment',
            data: {
                'nodeType': 'Type...',
                'nodeId': 'Choose...',
                'parentType': 'Type...',
                'parentId': 'Choose...'
            }
        })
    }

    onAssociationClick() {
        this.commands.push({
            type: 'association',
            data: {
                'oaName': '',
                'ops': {
                    'read': false,
                    'write': true,
                    'change': false,
                    'delete': false
                }
            }
        })
    }

    onCommandUpdate (row, col, value) {
        this.commands[row].data[col] = value;
        if (this.commands[row].type === 'node') {
            if (col === 'nodeType') {
                this.nodes.forEach((node) => {
                    if (node.id === this.commands[row].data.nodeId) {
                        node.type = value;
                        console.log(node);
                    }
                })
            } else if (col === 'nodeName') {
                this.nodes.forEach((node) => {
                    if (node.id === this.commands[row].data.nodeId) {
                        node.name = value;
                        console.log(node);
                    }
                })
            }
        }
        console.log (this.commands);
    }

    onOpenXML() {
        this.xml = this.processXML(this.commands);
        $('#xmlModal').modal('toggle');
    }

    processXML (commands) {
        const xml = { 'nodes': [], 'assignments': [], 'associations': [] };
        commands.forEach((d) => {
            if (d.type === 'node') {
                xml.nodes.push({
                    'id': d.data.nodeId,
                    'name': d.data.nodeName,
                    'type': d.data.nodeType
                });
                xml.assignments.push({
                    'child': d.data.nodeId,
                    'parent': d.data.parentId
                })
            } else if (d.type === 'assignment') {
                xml.assignments.push({
                    'child': d.data.nodeId,
                    'parent': d.data.parentId
                })
            }
        })
        return xml;
    }
}
