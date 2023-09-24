import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  dataArray: any;
  newRiiken = new Array();
  constructor(private https: HttpClient) {}

  private apiUrl =
    'https://qa-apis.icreditspace.com/apis/third-party/assignment/v1/random-chart-data/';

  getData(): Observable<any> {
    // fetch charts data
    return this.https.get(this.apiUrl);
  }
}
