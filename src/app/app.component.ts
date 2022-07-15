import { Component, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { MSGReader } from 'wl-msg-reader';
import { DomSanitizer } from '@angular/platform-browser';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import * as fileSaver from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { MatDialog } from '@angular/material/dialog';

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
  image!: any;
  block: boolean = true;
  selectedFileBlob!: any;
  pdfUrl!: any;
  blobURL!: any;
  @ViewChild('pdfview') pdfview!: ElementRef<HTMLIFrameElement>;
  @ViewChild('modalRef', { read: TemplateRef }) modalRef:TemplateRef<any>;
 
  blob!: any;
  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog) {}
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
  fileReader = new FileReader();
  /*  */
  fileData(eve: any) {
    this.display = false;
    const selectedFile = eve.target.files[0];
    this.fileReader.readAsDataURL(selectedFile);

    this.fileReader.onload = () => {
      const value = this.fileReader.result;
      var tmp = new String(this.fileReader.result).split(',')[1];
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
  /* downloading attachment files */
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
      this.pdfview.nativeElement.src = this.selectedFileBlob;
      // this.dialog.open(AppComponent)
      this.displayStyle = "block";
    } else {
      var file = this.msgReader.getAttachment(this.filedata.attachments[i]);
      this.blob = new Blob([file.content]);
      this.blobURL = URL.createObjectURL(this.blob);

      this.image = this.sanitizer.bypassSecurityTrustUrl(this.blobURL);
      this.block = false;
      this.displayStyle = "block";
    }
  }
  displayStyle = "none";

  // openPopup() {
  //   this.displayStyle = "block";
  // }
  closePopup() {
    this.displayStyle = "none";
  }

  openFullscreen( i: any) {
    this.viewAttachement(i);
    const dialogRef = this.dialog.open(this.modalRef);

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
