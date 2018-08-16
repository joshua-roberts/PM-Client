import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import {
    AgmCoreModule
} from '@agm/core';
import {HomepageComponent} from './homepage/homepage.component';
import { MedRecDashboardComponent } from './applications/medical-record/med-rec-dashboard/med-rec-dashboard.component';
import {PmHealthService} from './services/pmhealth.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { PatientsComponent } from './applications/medical-record/patients/patients.component';
import {PatientDetailComponent} from './applications/medical-record/patient-detail/patient-detail.component';
import {MyRecordComponent} from './applications/medical-record/my-record/my-record.component';
import {MedicinesComponent} from './applications/medical-record/medicines/medicines.component';
import {MessagesComponent} from './applications/medical-record/messages/messages.component';
import {PepService} from './services/pep.service';
import {LoginComponent} from './login/login.component';
import { DelegationsComponent } from './applications/medical-record/delegations/delegations.component';
import { DoctorsComponent } from './applications/medical-record/doctors/doctors.component';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
} from '@angular/material';
import {AlertService} from 'app/services/alert.service';
import {AlertComponent} from './alert/alert.component';
import { EgrantComponent } from './applications/egrant/egrant.component';
import {SidebarComponent} from './applications/medical-record/sidebar/sidebar.component';
import { AppBoxComponent } from './app-box/app-box.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PosComponent } from './applications/pos/pos.component';
import { ListComponent } from './applications/pos/list/list.component';
import { SideMenuComponent } from './nav-bar/side-menu/side-menu.component';
import { WordComponent } from './applications/word/word.component';
import {PmService} from './services/pm.service';
import { PoshomeComponent } from './applications/pos/poshome/poshome.component';
import { TranslatorDemoComponent } from './applications/translator-demo/translator-demo.component';
import { NlpComponent } from './applications/nlp/nlp.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppRoutingModule,

        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        MedRecDashboardComponent,
        PatientsComponent,

        PatientsComponent,
        PatientDetailComponent,
        MyRecordComponent,
        MedicinesComponent,
        MessagesComponent,
        LoginComponent,
        DelegationsComponent,
        DoctorsComponent,
        AlertComponent,
        EgrantComponent,
        SidebarComponent,
        AppBoxComponent,
        NavBarComponent,
        PosComponent,
        ListComponent,
        SideMenuComponent,
        WordComponent,
        PoshomeComponent,
        TranslatorDemoComponent,
        NlpComponent
    ],
    providers: [
        PmHealthService,
        PepService,
        AlertService,
        PmService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
