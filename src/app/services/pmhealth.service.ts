import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class PmHealthService {
  headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  private authUrl = 'http://localhost:8083/pmhealth/api/auth';
  private linksUrl = 'http://localhost:8083/pmhealth/api/links';
  private recordsUrl = 'http://localhost:8083/pmhealth/api/records';
  private visitsUrl = 'http://localhost:8083/pmhealth/api/visits';
  private patientsUrl = 'http://localhost:8083/pmhealth/api/patients';
  private medsUrl = 'http://localhost:8083/pmhealth/api/medicines';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Promise<string> {
    const data = {
      'username': username,
      'password': password
    };

    return this.http
      .post(this.authUrl, data, this.headers)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        const sessionId = response['entity'];
        if (sessionId != null) {
          localStorage.setItem('SESSION_ID', sessionId);
          return sessionId;
        } else {
          return null;
        }
      });
  }

  public logout() {
    localStorage.removeItem('SESSION_ID');
    console.log(localStorage.getItem('SESSION_ID'));
  }

  public getSessionId(): string {
    console.log(localStorage.getItem('SESSION_ID'));
    return localStorage.getItem('SESSION_ID');
  }

  public getSessionUser(): string {
    console.log(localStorage.getItem('SESSION_USER'));
    return localStorage.getItem('SESSION_USER');
  }

  public getLinks(): Promise<any> {
    const url = `${this.linksUrl}?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        return response['entity'];
      });
  }

  public getHome(): Promise<any> {
    const url = `${this.linksUrl}/home?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        return response['entity'];
      });
  }

  public getActions(): Promise<any> {
    const url = `${this.linksUrl}/actions?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        return response['entity'];
      });
  }

  public getPatients(): Promise<any> {
    const url = `${this.recordsUrl}?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        return response['entity'];
      });
  }

  public getRecord(patientId: number): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
      });
  }

  public getInfo(patientId: number): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response['entity'];
      });
  }

  public getVisits(patientId: number): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}/visits?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response['entity'];
      });
  }

  public getAllVisits(): Promise<any> {
    const url = `${this.recordsUrl}/visits?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response['entity'];
      });
  }

  public getVitals(visitId: number): Promise<any> {
    const url = `${this.visitsUrl}/${visitId}/vitals?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response['entity'];
      });
  }

  public getLatestVitals(patientId: number): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}/vitals?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response['entity'];
      });
  }

  public updateInfo(patientId: number, data: any): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}?user=${this.getSessionUser()}`;
    return this.http.put(url, data)
      .toPromise()
      .then(response => response['entity']);
  }
  public updateVisit(patientId: number, visit: any): Promise<any> {
    console.log(visit);

    const url = `${this.recordsUrl}/${patientId}/visits/${visit.visitId}?user=${this.getSessionUser()}`;
    return this.http.put(url, visit)
      .toPromise()
      .then(response => {
        console.log(response['entity']);
        return response['entity'];
      });
  }

  public getUserPatientId(): Promise<number> {
    const url = `${this.patientsUrl}/${this.getSessionUser()}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response['entity'].patientId;
      });
  }

  public getPatientUsername(patientId) {
    return this.http.get(`${this.recordsUrl}/${patientId}/user`)
      .toPromise()
      .then(response => {
        return response['entity'];
      });
  }

  public startVisit(patientId: number): Promise<any> {
    const url = `${this.recordsUrl}/${patientId}/visits?${this.getSessionId()}`;
    return this.http.post(url, null)
      .toPromise()
      .then(response => {
        console.log(response);
        return response['entity'];
      });
  }

  getMedications() {
    const url = `${this.medsUrl}?user=${this.getSessionUser()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response['entity'];
      });
  }

  public getVisitNoteId(visitId: number): Promise<any> {
    return this.http.get(`${this.recordsUrl}/visits/${visitId}/notes`)
      .toPromise()
      .then(visitNoteId => {
        return visitNoteId['entity'];
      });
  }
}
