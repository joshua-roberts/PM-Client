import { Component, OnInit } from '@angular/core';
import {PmHealthService} from '../../../services/pmhealth.service';

@Component({
  selector: 'app-med-rec-dashboard',
  templateUrl: './med-rec-dashboard.component.html',
  styleUrls: ['./med-rec-dashboard.component.scss']
})
export class MedRecDashboardComponent implements OnInit {
    links: any[];
    username: string;

    constructor(private pmHealth: PmHealthService) { }

    ngOnInit() {
        this.pmHealth.getLinks()
            .then(res => {
                console.log(res);
                this.links = res;
            });
        this.username = localStorage.getItem('SESSION_USER');
    }

    toRouterLink(link: string): string {
        return '/applications/medical/' + link.toLowerCase().replace(' ', '-');
    }
}
