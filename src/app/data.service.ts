import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
constructor(private http: HttpClient) { }
subject = new BehaviorSubject('')
blob = new BehaviorSubject('')
msgFile():Observable<any>
{
  let details = this.http.get('./assets/JsonFile/msgFile.json');
  return details;
}
fileView(url:string):Observable<any>
{
  let details = this.http.get(url,{responseType:'arraybuffer'});
  return details;
}
}



