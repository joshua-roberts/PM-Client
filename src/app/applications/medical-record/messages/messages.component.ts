import { Component, OnInit } from '@angular/core';
import {PmHealthService} from '../../../services/pmhealth.service';
import {PepService} from '../../../services/pep.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    requests = [];
    acceptedRequests = [];
    constructor(private pepService: PepService,
                private pmhealth: PmHealthService) { }

    ngOnInit() {
        this.getRequests();
        this.getAcceptedRequests();
    }

    public getRequests() {
        const username = this.pmhealth.getSessionUser();

        this.pepService.getRequests(username, 'requests')
            .then(requestNode => {
                console.log(requestNode);
                this.pepService.getChildren(requestNode.id)
                    .then((res) => {
                        this.requests = res;
                        console.log(this.requests);
                    });
            });
    }

    getRequesterProperty(req) {
        const props = req.properties;
        for (const prop of props) {
            if (prop.key === 'requester') {
                return prop.value;
            }
        }
    }

    public getAcceptedRequests() {
        const username = this.pmhealth.getSessionUser();
        this.pepService.getRequests(username, 'accepted requests')
            .then(requestNode => {
                console.log(requestNode);
                this.pepService.getChildren(requestNode.id)
                    .then((res) => {
                        this.acceptedRequests = res;
                    });
            });
    }

    public accept(requestNode) {
        // assign the request object to the requesters accepted records
        this.pepService.getNode(this.getRequesterProperty(requestNode), 'accepted requests')
            .then(accReqsNode => {
                this.pepService.assign(requestNode, accReqsNode);
            });

        // assign the request object to the patient's accepted records
        const username = this.pmhealth.getSessionUser();

                this.pepService.getNode(username, 'accepted requests')
                    .then(res => {
                        this.pepService.assign(requestNode, res);
                    });

                this.pepService.getNodeByProp('patient', username)
                    .then(recordNode => {
                        this.pepService.assign(requestNode, recordNode);
                    });

                // delete the assignment between the request and the 'requests' folder
                this.pepService.getNode(username, 'requests')
                    .then(requestsNode => {
                        this.pepService.deassign(requestNode, requestsNode);
                        this.getRequests();
                        this.getAcceptedRequests();
                    });
    }

    revoke(requestNode) {
        console.log(requestNode);
        // delete the request object
        this.pepService.deleteNode(requestNode);
        this.getRequests();
        this.getAcceptedRequests();
    }
}
