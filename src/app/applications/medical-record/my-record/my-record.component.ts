import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PmHealthService} from '../../../services/pmhealth.service';

@Component({
    selector: 'app-my-record',
    templateUrl: './my-record.component.html',
    styleUrls: ['./my-record.component.css']
})
export class MyRecordComponent implements OnInit {
    patientId: number;
    currentVisit: any = {};
    oldCurrentVisit: any = {};

    infoModel: any = {};
    oldInfoModel: any = {};
    visitModel: any = {};
    vitalsModel: any = null;
    diagModel = [];

    constructor(private route: ActivatedRoute,
                private pmhealth: PmHealthService,
                private router: Router) {
        this.currentVisit.vitals = {};
        this.oldCurrentVisit.vitals = {};
    }

    ngOnInit() {
        this.pmhealth.getUserPatientId()
            .then(response => {
                this.patientId = response;
                console.log(this.patientId);
                this.router
                    .navigate([`/applications/medical/patient-detail/${this.patientId}`], {queryParams: {session: 'true'}});
            });
    }
}

