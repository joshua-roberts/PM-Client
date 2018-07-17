import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() root;
    @Input() level;
    @Output() eleClicked = new EventEmitter<any>();
    @Output() eleDblClicked = new EventEmitter<any>();
    collapsed = true;
    colors;
    childrenGened = false;

    constructor() { }

    ngOnInit() {
        // console.log(this.root);
        this.colors = ['#e5f1ff', '#d3e7ff', '#bad9ff', '#a3ccff', '#8ec0ff', '#7ab5ff', '#5ba4ff', '#3f94ff', '#2887ff', '#167dff'];
        // this.colors = ['#d3e7ff', '#bad9ff', '#a3ccff', '#8ec0ff', '#7ab5ff', '#5ba4ff', '#3f94ff', '#2887ff', '#167dff'];
    }

    onDblClick (root) {
        this.eleDblClicked.emit(root);
    }

    onClick (root) {
        if (!this.childrenGened) {
            this.eleClicked.emit(root);
            this.childrenGened = true;
        }
        this.toggleCollapse();
    }

    onChildClick (root) {
        this.eleClicked.emit(root);
    }

    toggleCollapse() {
        const selector = '#collapse' + this.root.id;
        $(selector).collapse('toggle');
        this.collapsed = !this.collapsed;
    }
}
