import {Component, OnInit} from '@angular/core';
import {PmService} from '../../services/pm.service';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss']
})
// TODO: finsih add folder and file funcitonalty. Fix issue about collapsing after loading
export class PosComponent implements OnInit {
    pos = null;
    selectedDoc;
    sessionUser;

    constructor(private pm: PmService) {
        this.pm.getPolicyClasses().then((pcs) => {
            if (pcs) {
                this.pos = pcs;
                this.pos.forEach ((po) => {
                    po.children = [];
                });
                this.selectedDoc = this.pos[0];
                // console.log(this.pos);
            } else {
                alert('get PC\'s failed');
            }
        });
        this.sessionUser = localStorage.getItem('SESSION_USER');
    }

    ngOnInit() {
    }

    addFolder () {
        this.pos[0].children.push({
            id: 800,
            propertyId: 99,
            label: 'oa',
            title: 'test folder',
            children: []
        });
        console.log(this.pos);
    }

    addDocument () {
        this.pos[0].children.push({
            id: 799,
            propertyId: 98,
            label: 'o',
            title: 'test doc',
            children: []
        });
        console.log(this.pos);
    }
}
