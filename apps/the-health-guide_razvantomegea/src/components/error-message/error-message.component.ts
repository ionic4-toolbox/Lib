// App
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Providers
import { AuthValidator } from '../../providers';

@Component({
  selector: 'error-message',
  templateUrl: 'error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
  @Input() group: FormGroup;
  constructor() { }

  public get errorMessage() {
    if (!!this.control && !!this.control.touched) {
      for (let propertyName in this.control.errors) {
        return AuthValidator.getErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    if (!!this.group && !!this.group.touched) {
      for (let propertyName in this.group.errors) {
        return AuthValidator.getErrorMessage(propertyName, this.group.errors[propertyName]);
      }
    }

    return null;
  }

}