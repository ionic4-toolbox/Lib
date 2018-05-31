import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: 'demo.html'
})
export class DemoComponent {

  text: string;

  constructor() {
    console.log('Hello DemoComponent Component');
    this.text = 'Hello DemoComponent';
  }

}
