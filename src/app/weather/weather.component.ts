import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  chart = [];
  myData:any = [];
  myDataSys:any = [];
  myDataSysSunset:any = [];

  constructor(private _weather: WeatherService) { }

  ngOnInit() {
    this._weather.dailyForecast()
    .subscribe(res => {
       console.log(res)
      let temp_max = res['list'].map(res => res.main.temp_max);
      let temp_min = res['list'].map(res => res.main.temp_min);
      let alldates = res['list'].map(res => res.dt)
      
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

    this._weather.currentForecast()
    .subscribe(res => {
      this.myData = res;
      if(res["main"]){
        this.myData = res["main"];
        this.myDataSys=res["sys"];
        let weatherDatesSys = []
        let jsdate2 = new Date(res["sys"] * 1000)

        let date = new Date(res["sys"].sunrise*1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTimeSunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        this.myDataSys =formattedTimeSunrise;

        let dateSunset = new Date(res["sys"].sunset*1000);
        let hoursSunset = date.getHours();
        let minutesSunset = "0" + date.getMinutes();
        let secondsSunset = "0" + date.getSeconds();
        let formattedTimeSunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        this.myDataSysSunset =formattedTimeSunset;
      }
    })
  } 

}
