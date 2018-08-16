import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {MedRecDashboardComponent} from './applications/medical-record/med-rec-dashboard/med-rec-dashboard.component';
import {PatientsComponent} from './applications/medical-record/patients/patients.component';
import {LoginComponent} from './login/login.component';
import {MedicinesComponent} from './applications/medical-record/medicines/medicines.component';
import {MyRecordComponent} from './applications/medical-record/my-record/my-record.component';
import {MessagesComponent} from './applications/medical-record/messages/messages.component';
import {DelegationsComponent} from './applications/medical-record/delegations/delegations.component';
import {DoctorsComponent} from './applications/medical-record/doctors/doctors.component';
import {PatientDetailComponent} from './applications/medical-record/patient-detail/patient-detail.component';
import {EgrantComponent} from './applications/egrant/egrant.component';
import {PosComponent} from './applications/pos/pos.component';
import {WordComponent} from './applications/word/word.component';
import {TranslatorDemoComponent} from './applications/translator-demo/translator-demo.component';
import {NlpComponent} from './applications/nlp/nlp.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomepageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'applications/medical', component: MedRecDashboardComponent},
    {path: 'applications/medical/patients', component: PatientsComponent},
    {path: 'applications/medical/medicines', component: MedicinesComponent},
    {path: 'applications/medical/my-record', component: MyRecordComponent},
    {path: 'applications/medical/messages', component: MessagesComponent},
    {path: 'applications/medical/delegations', component: DelegationsComponent},
    {path: 'applications/medical/doctors', component: DoctorsComponent},
    {path: 'applications/medical/patient-detail/:patientId', component: PatientDetailComponent},
    {path: 'applications/egrant', component: EgrantComponent},
    {path: 'applications/pos', component: PosComponent},
    {path: 'applications/word', component: WordComponent},
    {path: 'applications/translator', component: TranslatorDemoComponent},
    {path: 'applications/nlp', component: NlpComponent}

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
