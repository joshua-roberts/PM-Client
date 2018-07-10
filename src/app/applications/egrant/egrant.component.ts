import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PmHealthService} from '../../services/pmhealth.service';
import {PepService} from '../../services/pep.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-egrant',
    templateUrl: './egrant.component.html',
    styleUrls: ['./egrant.component.scss']
})
export class EgrantComponent implements OnInit {
    attachments = [];
    model: any = {
        'attachment': {}
    };

    constructor(private route: ActivatedRoute,
                private pmhealth: PmHealthService,
                private pepService: PepService,
                private alertService: AlertService,
                private router: Router) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe(
                (qParams) => {
                    const key = qParams['key'];
                    const value = qParams['value'];
                    console.log(qParams);
                    this.pepService.getNodeByProp(key, value)
                        .then(response => {
                            console.log(response);
                            this.model.attachment = response;
                            console.log(this.model.attachment);

                            this.pepService.getSessionUserNode()
                                .then(response1 => {
                                    this.model.sender = response1;
                                    console.log(response1);
                                })
                        })

                });
    }

    send() {
        console.log(this.model);
    }

}
