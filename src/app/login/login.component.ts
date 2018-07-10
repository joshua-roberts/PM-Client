import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {PepService} from '../services/pep.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private pepService: PepService,
              private router: Router) { }

  ngOnInit() {
      localStorage.removeItem('SESSION_ID');
      localStorage.removeItem('SESSION_USER');
  }

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    const sessionId = this.pepService.login(username, password);
    console.log(sessionId);
    if (sessionId != null) {
        this.router.navigate(['/home']);
    } else {
        // TODO alert
    }
  }
}
