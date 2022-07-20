import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewAttachmentComponent } from './viewAttachment/viewAttachment.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'carbon-components-angular/button';
import { IconModule, IconService } from 'carbon-components-angular/icon';
import { TableModule } from 'carbon-components-angular';

@NgModule({
  declarations: [	
    AppComponent,
    ViewAttachmentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    IconModule,
    TableModule
    ],
  providers: [DataService,ViewAttachmentComponent,IconService],
  bootstrap: [AppComponent]
})
export class AppModule { }
