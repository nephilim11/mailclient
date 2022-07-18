import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewAttachmentComponent } from './viewAttachment/viewAttachment.component';
import { DataService } from './data.service';

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
    BrowserAnimationsModule
    ],
  providers: [DataService,ViewAttachmentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
