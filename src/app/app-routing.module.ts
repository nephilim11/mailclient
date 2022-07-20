import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAttachmentComponent } from './viewAttachment/viewAttachment.component';

const routes: Routes = [
  {path:'check',component:ViewAttachmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
