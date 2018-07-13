import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    currentUser: any = {};

    constructor() {
    }

    ngOnInit() {
        this.currentUser = this.getSessionUser();

        console.log(this.currentUser);
    }

    openEGrant() {
        // alert('open E-grant');
    }

    openEmployeeRecords() {
        // alert('open Employee Records');
    }

    openMedicalRecords() {
        // alert('open Medical Records');
    }

    openEmail() {
        // alert('open E-Mail');
    }

    private getSessionUser() {
        return localStorage.getItem('SESSION_USER');
    }
}
