import {Component, Input, OnInit} from '@angular/core';
import {PmHealthService} from '../../../services/pmhealth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    links: any[];
    @Input() patientsActive: boolean;
    @Input() medicinesActive: boolean;
    @Input() myRecordActive: boolean;
    @Input() messagesActive: boolean;
    @Input() delegationsActive: boolean;
    @Input() doctorsActive: boolean;

    constructor(private pmHealth: PmHealthService) { }

    ngOnInit() {
        this.pmHealth.getLinks()
            .then(res => {
                console.log(res);
                this.links = res;
            });
    }

    getIcon(link) {

    }

    isActive(link) {
        if (link === 'Patients') {
            return this.patientsActive ? 'active' : '';
        } else if (link === 'Medicines') {
            return this.medicinesActive ? 'active' : '';
        } else if (link === 'Messages') {
            return this.messagesActive ? 'active' : '';
        } else if (link === 'Delegations') {
            return this.delegationsActive ? 'active' : '';
        } else if (link === 'My Record') {
            return this.myRecordActive ? 'active' : '';
        } else if (link === 'Doctors') {
            return this.doctorsActive ? 'active' : '';
        }
    }

    toRouterLink(link: string): string {
        return '/applications/medical/' + link.toLowerCase().replace(' ', '-');
    }
}
