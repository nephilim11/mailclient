import {
  Component,
  ElementRef,
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hidden = true;
  display = true;
  title = 'mail-document-viewer';
  senderName: string = '';
  subject: string = '';
  Cc: string = '';
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
  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dataservice: DataService,
    private viewAttachment: ViewAttachmentComponent,
    private router: Router
  ) {}
  _base64ToArrayBuffer(value: any) {
    var binary_string = window.atob(value);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  filepdf(file: any) {
    return new TextDecoder('utf-8').decode(file);
  }
  fileData(eve: any) {
    this.display = false;
    const selectedFile = eve.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = () => {
      const value = fileReader.result;
      var tmp = new String(fileReader.result).split(',')[1];
      this.msgReader = new MSGReader(this._base64ToArrayBuffer(tmp));
      this.filedata = this.msgReader.getFileData();
      this.senderName = this.filedata.senderName;
      this.subject = this.filedata.subject;
      this.recipients = this.filedata.recipients[0].name;
      this.Cc = this.filedata.recipients[1].name;
      this.body = this.filedata.body;
      this.attachedFile = this.filedata.attachments[0];
      this.length = this.filedata.attachments.length;
      this.attachment = this.filedata.attachments;
    };
  }
  downloadAttachments(i: number) {
    var file = this.msgReader.getAttachment(this.filedata.attachments[i]);
    this.blob = new Blob([file.content]);
    this.blobURL = URL.createObjectURL(this.blob);
    fileSaver.saveAs(this.blob, file.fileName);
  }
  viewAttachement(i: number) {
    var file = this.msgReader.getAttachment(this.filedata.attachments[i]);
    if (this.filedata.attachments[i].extension == '.pdf') {
      this.blob = new Blob([file.content], { type: 'application/pdf' });
      this.blobURL = URL.createObjectURL(this.blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobURL);
      this.selectedFileBlob = this.pdfUrl.changingThisBreaksApplicationSecurity;
    } else {
      var file = this.msgReader.getAttachment(this.filedata.attachments[i]);
      this.blob = new Blob([file.content], { type: 'image/png' });
      this.blobURL = URL.createObjectURL(this.blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobURL);
      this.selectedFileBlob = this.pdfUrl.changingThisBreaksApplicationSecurity;
    }
    this.dataservice.subject.next(this.selectedFileBlob);
  }
  viewModule(i: number) {
    this.viewAttachement(i);
    this.dialog.open(ViewAttachmentComponent);
  }
  print(i: number) {
    this.viewAttachement(i);
    this.dataservice.blob.next(this.blobURL);
    this.viewAttachment.print();
  }
}
