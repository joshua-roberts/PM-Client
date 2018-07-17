import {Component, OnInit} from '@angular/core';
import {PmService} from '../../services/pm.service';

@Component({
    selector: 'app-translator-demo',
    templateUrl: './translator-demo.component.html',
    styleUrls: ['./translator-demo.component.scss']
})
export class TranslatorDemoComponent implements OnInit {

    constructor(private pm: PmService) {
    }

    ngOnInit() {
    }

    onTranslate(sqlInRef, host, port, username, password, database, sqlOutRef, responseRef) {
        this.pm.translate(sqlInRef.value, host, port, username, password, database)
            .then((data) => {
                if (data) {
                    console.log(data);
                    sqlOutRef.value = data.sql;
                    // run sql method
                    // get response
                    // put into response textarea like:
                    // responseRef.value = ...
                } else {
                    alert('translate web service failed')
                }
            });
    }
}
