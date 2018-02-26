import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: "[app-weather],[app-drop-down]",
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  chart = [];
  myData: any = [];
  myDataSys: any = [];
  myDataSysSunset: any = [];
  name: any;
  cityName: any;
  list: any = [
    { id: 0, name: 'New York' },
    { id: 1, name: 'Texas' },
    { id: 2, name: 'Highlands County' },
    { id: 3, name: 'Bedford' },
    { id: 4, name: 'Los Angeles County' },
    { id: 5, name: 'Sprite' },
    { id: 6, name: 'Texas' },
    { id: 7, name: 'Illinois' },
    { id: 8, name: 'Grainfield' },
    { id: 9, name: 'Miami County' },
    { id: 10, name: 'Indiana' },
    { id: 11, name: 'Wellington' },
    { id: 12, name: 'Uniontown' },
    { id: 13, name: 'City and Borough of Birmingham' },
    { id: 14, name: 'Edgbaston' }
  ];


  constructor(private _weather: WeatherService) { }

  public showWeather(city: string) {
    this.dailyForcast(city)
    this.currentForcast(city);
  }

  public dailyForcast(name) {
    this._weather.dailyWeather(name)
      .subscribe(res => {
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        this.cityName = res['city'].name;

        let weatherDates = []


        alldates.forEach((res) => {
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: weatherDates,
              datasets: [
                {
                  data: temp_max,
                  borderColor: "#FF6F00",
                  fill: true
                },
                {
                  data: temp_min,
                  borderColor: "#FF6F00",
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
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })
      })
  }

  public currentForcast(name) {

    this._weather.currentWeather(name)
      .subscribe(res => {
        this.myData = res;
        if (res["main"]) {
          this.myData = res["main"];
          this.myDataSys = res["sys"];
          this.name = res["name"];

          let weatherDatesSys = []
          let jsdate2 = new Date(res["sys"] * 1000)

          let date = new Date(res["sys"].sunrise * 1000);
          let hours = date.getHours();
          let minutes = "0" + date.getMinutes();
          let seconds = "0" + date.getSeconds();
          let formattedTimeSunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          this.myDataSys = formattedTimeSunrise;

          let dateSunset = new Date(res["sys"].sunset * 1000);
          let hoursSunset = dateSunset.getHours();
          let minutesSunset = "0" + dateSunset.getMinutes();
          let secondsSunset = "0" + dateSunset.getSeconds();
          let formattedTimeSunset = hoursSunset + ':' + minutesSunset.substr(-2) + ':' + secondsSunset.substr(-2);
          this.myDataSysSunset = formattedTimeSunset;
        }
      })
  }

  ngOnInit() {

  }
}
