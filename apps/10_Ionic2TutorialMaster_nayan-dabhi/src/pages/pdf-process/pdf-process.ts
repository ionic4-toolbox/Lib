import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DocumentViewer } from '@ionic-native/document-viewer';

@Component({
  templateUrl: 'pdf-process.html'
})

export class PdfProcessPage {
  public options: any = {
    "title": "myPDF"
  };

  constructor(public navCtrl: NavController,
    public document: DocumentViewer) {

  }

  openFile() {
    this.document.viewDocument('assets/myFile.pdf', 'application/pdf', this.options);
  }

}
