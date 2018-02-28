import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WeatherComponent} from './weather/weather.component';

const appRoutes: Routes = [
  {path: '', loadChildren: ''},
  {path: 'weather', component: WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
