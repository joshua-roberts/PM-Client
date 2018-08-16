import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PmService} from '../../../services/pm.service';

@Component({
    selector: 'app-poshome',
    templateUrl: './poshome.component.html',
    styleUrls: ['./poshome.component.scss']
})
export class PoshomeComponent implements OnInit {
    pos;
    @Output('selectedDoc') selectedDoc = new EventEmitter<any>();
    sessionUser;
    constructor(private pm: PmService) {
        this.pm.getPolicyClasses().then((pcs) => {
            if (pcs) {
                this.pos = pcs;
                this.pos.forEach((po) => {
                    po.children = [];
                });
                this.selectedDoc.emit(this.pos[0]);
            } else {
                alert('get PC\'s failed');
            }
        });
        this.sessionUser = localStorage.getItem('SESSION_USER');
    }

    ngOnInit() {
    }

    onDocClick(name) {
        const objID = name.id;
        this.pm.getChildren(objID).then((response) => {
            console.log(response);
            response.forEach ((item) => {
                item.children = [];
            });
            this.pos.forEach ((po) => {
                this.recursiveSearchNExec (po, objID, (ele) => {
                    console.log(ele.name);
                    ele.children = response;
                });
            })
            console.log(this.pos);
        });
    }

    onDocDblClick(name) {
        const objID = name.id;
        this.pos.forEach ((po) => {
            this.recursiveSearchNExec (po, objID, (ele) => {
                this.selectedDoc.emit(ele);
            });
        });
    }

    // {id: 11111, name: "", type: "OA", properties: [], content: null}
    addFolder (name, parentId) {
        console.log ('put ' + name + ' in ' + parentId);
        this.pm.createNodeWPropsAndContent(parentId, name, 'OA', []).then((nodeData) => {
            if (nodeData) {
                nodeData.children = [];
                console.log('assign ' + nodeData.id + ' to ' + parentId);
                // this.pm.assign(nodeData.id, parentId).then((assignData) => {
                //     console.log(assignData);
                //     if (assignData) {
                        this.pos.forEach ((po) => {
                            this.recursiveSearchNExec (po, parentId, (ele) => {
                                ele.children.push(nodeData);
                            });
                        })
                    // } else {
                    //     this.pm.deleteNode(nodeData.id).then((deleteData) => {
                    //         if (deleteData) {
                    //             alert('node assignment unsuccessful, node deleted')
                    //         } else {
                    //             alert('node deletion failed')
                    //         }
                    //     });
                    // }
                // })
            } else {
                alert('node creation unsuccessful')
            }
        });
        // this.pos.push({
        //     children: [],
        //     content:  null,
        //     id: 11099,
        //     name: name,
        //     properties: [],
        //     type: 'OA'
        // });
        console.log(this.pos);
    }

    addDocument (name, parentId) {
        console.log ('put ' + name + ' in ' + parentId);
        this.pos.push({
            children: [],
            content:  null,
            id: 11099,
            name: name,
            properties: [],
            type: 'O'
        });
        console.log(this.pos);
    }

    // Object:
    //  children: [] (0)
    //  id: 1
    //  name: "pm_health"
    //  properties: [{}, {}] (2)
    //  type: "PC"
    recursiveSearchNExec (root, id, fn) { // potential error: if two nodes are linked to each other
        if (root) {
            if (root.id === id) {
                fn(root);
            }
            if (root.children.length) {
                root.children.forEach((child) => {
                    this.recursiveSearchNExec(child, id, fn);
                })
            }
        }
    }
}
