import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
    @ViewChild('doc') doc: ElementRef;
    currentObjectId: number;

    constructor() {
    }

    ngOnInit() {
    }

    onOpen (objectId) {
        let result;
        if (this.doc.nativeElement.value || this.currentObjectId) {
            result = window.confirm('Have you saved your work?');
        } else {
            result = true;
        }
        if (result) {
            this.currentObjectId = objectId;
            this.doc.nativeElement.value = null; // change to object contents
        }
        $('#chooseFile').modal('toggle');
    }

    onNew () {
        let result;
        if (this.currentObjectId) {
            result = window.confirm('Have you saved your work?');
        } else {
            result = true;
        }

        if (result) {
            this.doc.nativeElement.value = null;
            this.currentObjectId = null;
        }
    }

    onSave () {
        if (!this.currentObjectId) {
            $('#saveFileAs').modal('toggle');
        } else {
            alert('saving: ' + this.currentObjectId)
        }
    }

    onSaveAs (objectId) {
        alert('save as');
    }
}
