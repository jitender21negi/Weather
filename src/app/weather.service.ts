import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) {
  }

  dailyWeather(city: string) {
    return this._http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '+&appid=83009a92a0f60be5e2f746464624abe8')
      .map(result => result);
  }

  currentWeather(city: string) {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=83009a92a0f60be5e2f746464624abe8')
      .map(result => result);
  }
}
