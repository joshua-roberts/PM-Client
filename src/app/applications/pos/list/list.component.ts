import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2
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
    selectedChild;
    colors;

    constructor(private render: Renderer2) { }

    ngOnInit() {
        this.selectedChild = null;
        // this.colors = ['#e5f1ff', '#d3e7ff', '#bad9ff', '#a3ccff', '#8ec0ff', '#7ab5ff', '#5ba4ff', '#3f94ff', '#2887ff', '#167dff'];
        this.colors = ['#d3e7ff', '#bad9ff', '#a3ccff', '#8ec0ff', '#7ab5ff', '#5ba4ff', '#3f94ff', '#2887ff', '#167dff'];
    }

    onDblClick (childRoot, event) {
        this.eleClicked.emit([childRoot, event]);
        this.selectedChild = childRoot[0];
    }

    isObject (type: string) {
        return (type.toLowerCase() === 'o');
    }
}
