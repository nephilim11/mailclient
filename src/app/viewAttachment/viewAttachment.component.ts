import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-viewAttachment',
  templateUrl: './viewAttachment.component.html',
  styleUrls: ['./viewAttachment.component.css'],
})
export class ViewAttachmentComponent implements AfterViewInit {
  @ViewChild('pdfview') pdfview!: ElementRef<HTMLIFrameElement>;
  image!: any;
  block: boolean = true;
  pdfblock: boolean = true;
  blobURL: any;
  iframe: any;
  constructor(private data: DataService, private cdref: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.data.subject.subscribe((data) => {
      this.pdfview.nativeElement.src = data;
    });
  }
  print() {
    this.data.blob.subscribe((data) => {
      this.iframe = document.createElement('iframe');
      this.iframe.style.display = 'none';
      this.iframe.src = data;
      document.body.appendChild(this.iframe);
      this.iframe.contentWindow.print();
    });
  }
}
