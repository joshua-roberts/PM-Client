import {Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    @Input() clr;

    constructor(private render: Renderer2) {
    }

    ngOnInit() {
    }

    openGo(el) {
        this.render.addClass(el, 'reveal');
    }

    closeGo(el) {
        this.render.removeClass(el, 'reveal');
    }

    openSettings() {
        alert('open settings')
    }

}
