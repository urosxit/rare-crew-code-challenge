import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppComponent, StartComponent, PieChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
