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
