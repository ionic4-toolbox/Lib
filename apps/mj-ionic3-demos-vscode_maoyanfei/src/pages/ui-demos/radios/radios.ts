import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-radios',
  templateUrl: 'radios.html',
})
export class RadiosPage {

  langs: FormControl;
  langForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.langForm = new FormGroup({
      "langs": new FormControl({ value: 'rust', disabled: false })
    });
  }

  doSubmit(event:Event) {
    console.log('Submitting form', this.langForm.value);
    event.preventDefault();
  }

}
