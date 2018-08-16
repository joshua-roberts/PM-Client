import {Component, OnInit} from '@angular/core';
import {PmService} from '../../services/pm.service';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss']
})
// TODO: finish add folder and file funcitonalty. Fix issue about collapsing after loading
export class PosComponent implements OnInit {
    pos = null;
    selectedDoc;
    sessionUser;

    constructor(private pm: PmService) {
        // this.pm.getPolicyClasses().then((pcs) => {
        //     if (pcs) {
        //         this.pos = pcs;
        //         this.pos.forEach ((po) => {
        //             po.children = [];
        //         });
        //         this.selectedDoc = this.pos[0];
        //         // console.log(this.pos);
        //     } else {
        //         alert('get PC\'s failed');
        //     }
        // });
        this.sessionUser = localStorage.getItem('SESSION_USER');
    }

    ngOnInit() {
    }

    addFolder(graphRef, name) {
        graphRef.addFolder(name, this.selectedDoc.id);
    }

    addDocument(graphRef) {
        graphRef.addDocument(name, this.selectedDoc.id);
    }
}
