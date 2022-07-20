import {
  Component,
  ElementRef,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { MSGReader } from 'wl-msg-reader';
import * as fileSaver from 'file-saver';

import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { DataService } from './data.service';
import { ViewAttachmentComponent } from './viewAttachment/viewAttachment.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  ibmButton:any="tertiary"
  size:any='sm'
  isExpressive:boolean=false
  assistiveTextAlignment:any="center"
  enableSingleSelect:boolean=false
  hidden = true;
  display = true;
  title = 'mail-document-viewer';
  senderName: string = '';
  subject: string = '';
 Cc:any[]=[]
  recipients: string = '';
  body: string = '';
  data: any;
  attachedFile: any;
  attachedURL!: any;
  val!: string;
  length: any;
  msgReader!: any;
  filedata!: any;
  attachment: any;
  image: any;
  imageView: any;
  block: boolean = true;
  selectedFileBlob!: any;
  pdfUrl!: any;
  blobURL!: any;
  view!: any;
  blob!: any;
  fileStore$:any
  filetake:any
  logo!:any;
  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dataservice: DataService,
    private viewAttachment: ViewAttachmentComponent
  ) {}
  ngOnInit():any
  {
     this.fileStore$=this.dataservice.msgFile()
    console.log(this.fileStore$) 
  }
/* get the file path from json*/
  displayFile(eve:string)
  {
    this.dataservice.fileView(eve).subscribe(data=>
      {
  this.filetake=data
  this.fileData()
      })
  }
  /*convert base64 to arraybuffer */
  _base64ToArrayBuffer(value: any) {
    var binary_string = window.atob(value);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
 
  /*get msg file data*/
  fileData() {
    this.display = false;
      this.msgReader = new MSGReader(this.filetake);
      this.filedata = this.msgReader.getFileData();
      console.log(this.filedata)
      this.senderName = this.filedata?.senderName;
      this.subject = this.filedata?.subject;
      this.recipients = this.filedata?.recipients[0]?.name || '' ;
      var len=this.filedata.recipients.length
      console.log(len)
      var k=0;
      for (let i = 0; i < len; i++) {
       
        this.Cc[i]=this.filedata.recipients[i].name
      }
      console.log(this.Cc)
      this.body = this.filedata?.body || '';
      console.log()
      this.attachedFile = this.filedata?.attachments[0];
      this.length = this.filedata?.attachments.length;
      this.attachment = this.filedata?.attachments;
      this.logo=this.senderName.split(' ')[0][0]+this.senderName.split(' ')[1][0]
  }
   /* download msg file attachments*/
  downloadAttachments(i: number) {
    var file = this.msgReader.getAttachment(this.filedata?.attachments[i]);
    this.blob = new Blob([file.content]);
    this.blobURL = URL.createObjectURL(this.blob);
    fileSaver.saveAs(this.blob, file.fileName);
  }
  /* view msg file attachments*/
  viewAttachement(i: number) {
    var file = this.msgReader.getAttachment(this.filedata?.attachments[i]);
    if (this.filedata?.attachments[i].extension == '.pdf') {
      this.blob = new Blob([file.content], { type: 'application/pdf' });
      this.blobURL = URL.createObjectURL(this.blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobURL);
      this.selectedFileBlob = this.pdfUrl.changingThisBreaksApplicationSecurity;
    } else {
      var file = this.msgReader.getAttachment(this.filedata?.attachments[i]);
      this.blob = new Blob([file.content], { type: 'image/png' });
      this.blobURL = URL.createObjectURL(this.blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobURL);
      this.selectedFileBlob = this.pdfUrl.changingThisBreaksApplicationSecurity;
    }
    this.dataservice.subject.next(this.selectedFileBlob);
  }
  /*view attachments in pop up */
  viewModule(i: number) {
    this.viewAttachement(i);
    this.dialog.open(ViewAttachmentComponent);
  }
  /* print attachments in pop up*/
  print(i: number) {
    this.viewAttachement(i);
    this.dataservice.blob.next(this.blobURL);
    this.viewAttachment.print();
  }
}
