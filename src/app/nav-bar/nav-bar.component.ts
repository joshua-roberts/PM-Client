import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    @Input() homepageActive: boolean;
    @Input() posActive: boolean;
    @Input() medAppActive: boolean;
    @Input() empActive: boolean;
    @Input() egrantActive: boolean;
    @Input() wordActive: boolean;

    constructor() {}
}
