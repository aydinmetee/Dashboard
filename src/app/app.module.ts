import { FullCalendarModule } from 'primeng/fullcalendar';
import { ChartModule } from 'primeng/chart';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { OrderListModule } from 'primeng/orderlist';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import {CarouselModule} from 'primeng/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    CardModule,
    TableModule,
    MessagesModule,
    MessageModule,
    OrderListModule,
    TabViewModule,
    CheckboxModule,
    ButtonModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
