import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast(city: string) {    
    return this._http.get("http://api.openweathermap.org/data/2.5/forecast?q="+city+"+&appid=83009a92a0f60be5e2f746464624abe8")
      .map(result => result);
  }
  currentForecast(city: string) {    
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=83009a92a0f60be5e2f746464624abe8")
      .map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res;
    return body || [];
  }
}
