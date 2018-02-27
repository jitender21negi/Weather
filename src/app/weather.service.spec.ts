import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import 'rxjs/add/operator/map';
describe('WeatherService', () => {

  let service: WeatherService;
  let http: HttpClient;
  let testData = { name: 'Test Data' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService
      ],
    });
    service = new WeatherService(http);
  });
  afterEach(() => {
    service = null;
  });
  it('should defined service', () => {
    expect(service).toBeTruthy();
  });

  describe('dailyWeather()', () => {
    it('should call daily weather service', inject([HttpClient, WeatherService, HttpTestingController], (http, weatherService, httpTestingController) => {
      testData = { name: 'Test Data' };
      const mockResponse = {
        data: [
          { "coord": { "lon": -73.99, "lat": 40.73 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "base": "stations", "main": { "temp": 275.87, "pressure": 1038, "humidity": 100, "temp_min": 275.15, "temp_max": 276.15 }, "visibility": 16093, "wind": { "speed": 3.1, "deg": 110 }, "clouds": { "all": 90 }, "dt": 1519392900, "sys": { "type": 1, "id": 1969, "message": 0.0045, "country": "US", "sunrise": 1519385880, "sunset": 1519425659 }, "id": 5128581, "name": "New York", "cod": 200 }
        ]
      };
      http.get('http://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=83009a92a0f60be5e2f746464624abe8').subscribe(data =>
        expect(data).toEqual(testData)
      );
      weatherService.dailyWeather('New York');
      const req = httpTestingController.expectOne('http://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=83009a92a0f60be5e2f746464624abe8');

      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();

    }))
  });
  describe('currentWeather()', () => {
    it('should call current weather service', inject([HttpClient, WeatherService, HttpTestingController], (http, weatherService, httpTestingController) => {
      testData = { name: 'Test Data' };
      const mockResponse = {
        data: [
          { "cod": "200", "message": 0.0048, "cnt": 38, "list": [{ "dt": 1519711200, "main": { "temp": 274.86, "temp_min": 274.694, "temp_max": 274.86, "pressure": 1036.28, "sea_level": 1039.97, "grnd_level": 1036.28, "humidity": 87, "temp_kf": 0.17 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 0 }, "wind": { "speed": 3.22, "deg": 323.501 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-27 06:00:00" }] }
        ]
      };
      http.get('http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=83009a92a0f60be5e2f746464624abe8').subscribe(data =>
        expect(data).toEqual(testData)
      );
      weatherService.currentWeather('New York');
      const req = httpTestingController.expectOne('http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=83009a92a0f60be5e2f746464624abe8');

      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();

    }))
  });
});
