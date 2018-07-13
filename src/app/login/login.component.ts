import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {PepService} from '../services/pep.service';
import {PmService} from '../services/pm.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    constructor(private pepService: PepService,
                private router: Router,
                private pm: PmService) {
    }

    ngOnInit() {
        localStorage.removeItem('SESSION_ID');
        localStorage.removeItem('SESSION_USER');
    }

    login(form: NgForm) {
        const username = form.value.username;
        const password = form.value.password;

        this.pm.login(username, password).then((data) => {
            if (data) {
                this.router.navigate(['/home']);
            } else {
                alert('login failed, checked credentials');
            }
        })
    }
}
