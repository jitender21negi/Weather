import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  chart = [];
  currentWeather: any = [];
  citySunrise: any = [];
  citySunset: any = [];
  name: any;
  cityName: any;
  location: Array<object> = [
    {id: 0, name: 'New York'},
    {id: 1, name: 'Texas'},
    {id: 2, name: 'Highlands County'},
    {id: 3, name: 'Bedford'},
    {id: 4, name: 'Los Angeles County'},
    {id: 5, name: 'Sprite'},
    {id: 6, name: 'Texas'},
    {id: 7, name: 'Illinois'},
    {id: 8, name: 'Grainfield'},
    {id: 9, name: 'Miami County'},
    {id: 10, name: 'Indiana'},
    {id: 11, name: 'Wellington'},
    {id: 12, name: 'Uniontown'},
    {id: 13, name: 'City and Borough of Birmingham'},
    {id: 14, name: 'Edgbaston'}
  ];


  constructor(public _weather: WeatherService) {
  }

  ngOnInit() {
  }

  public showWeather(city: string) {
    const result = this.location.filter(function (obj: any) {
      return obj.name === city;
    })[0];
    if (typeof result !== 'undefined') {
      this.dailyForcast(city);
      this.currentForcast(city);
    } else {
      console.log('please enter correct location');
    }
  }

  public dailyForcast(city) {
    this._weather.dailyWeather(city)
      .subscribe(res => {
        const temp_max = res['list'].map(res => res.main.temp_max);
        const temp_min = res['list'].map(res => res.main.temp_min);
        const alldates = res['list'].map(res => res.dt);
        this.cityName = res['city'].name;

        const weatherDates = [];

        alldates.forEach((res) => {
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: weatherDates,
              datasets: [
                {
                  data: temp_max,
                  borderColor: '#FF6F00',
                  fill: true
                },
                {
                  data: temp_min,
                  borderColor: '#FF6F00',
                  fill: true
                },
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
          const jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        });
      });
  }

  public currentForcast(city) {

    this._weather.currentWeather(city)
      .subscribe(res => {
        this.currentWeather = res;
        if (res['main']) {
          this.currentWeather = res['main'];
          this.citySunrise = res['sys'];
          this.name = res['name'];

          const weatherDatesSys = [];

          const date = new Date(res['sys'].sunrise * 1000);
          const minutes = '0' + date.getMinutes();
          const seconds = '0' + date.getSeconds();
          this.citySunrise = date.getHours() + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

          const dateSunset = new Date(res['sys'].sunset * 1000);
          const minutesSunset = '0' + dateSunset.getMinutes();
          const secondsSunset = '0' + dateSunset.getSeconds();
          this.citySunset = dateSunset.getHours() + ':' + minutesSunset.substr(-2) + ':' + secondsSunset.substr(-2);
        }
      });
  }
}
