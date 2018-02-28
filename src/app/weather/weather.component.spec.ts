import {ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

import {WeatherComponent} from './weather.component';
import {WeatherService} from '../weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let weatherService: WeatherService;
  let fixture: ComponentFixture<WeatherComponent>;
  let injector: TestBed;
  let dailyWeatherObj, currentWeatherObj;

  beforeEach(() => {

    dailyWeatherObj = {
      list: [{main: {temp_max: 100, temp_min: 20}, dt: 102212}],
      city: [{name: 'New York'}]
    };

    currentWeatherObj = {
      main: [{main: {temp_max: 100, temp_min: 20}, dt: 102212}],
      sys: [{name: 'New York'}],
      name: [{name: 'New York'}]
    };

    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [WeatherService],
    });

    injector = getTestBed();
    TestBed.compileComponents();
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    weatherService = fixture.debugElement.injector.get(WeatherService);

    spyOn(weatherService, 'dailyWeather').and.callFake(() => {
      return Observable.from([dailyWeatherObj]);
    });
    spyOn(weatherService, 'currentWeather').and.callFake(() => {
      return Observable.from([currentWeatherObj]);
    });
    spyOn(console, 'log');
  });

  afterEach(() => {
    component = null;
  });

  it('should defined weather component', () => {
    expect(component).toBeTruthy();
  });

  describe('dailyForcast()', () => {
    it('should show weather based on city', () => {
      component.dailyForcast('New York');
      expect(weatherService.dailyWeather).toHaveBeenCalledWith('New York');
    });
  });

  describe('currentForcast()', () => {
    it('should show current weather based on city', () => {
      component.currentForcast('New York');
      expect(weatherService.currentWeather).toHaveBeenCalledWith('New York');
    });
  });

  describe('showWeather()', () => {
    it('should call show Weather method with correct city name', () => {
      spyOn(component, 'dailyForcast');
      spyOn(component, 'currentForcast');

      component.showWeather('New York');

      expect(component.dailyForcast).toHaveBeenCalledWith('New York');
      expect(component.currentForcast).toHaveBeenCalledWith('New York');
    });

    it('should call show Weather method with incorrect city name', () => {
      spyOn(component, 'dailyForcast');
      spyOn(component, 'currentForcast');

      component.showWeather('');

      expect(console.log).toHaveBeenCalled;
    });
  });
});
