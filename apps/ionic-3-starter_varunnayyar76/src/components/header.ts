import { Component, Input } from '@angular/core';

@Component({
	selector: 'custom-header',
	templateUrl: './header.html'
})

export class HeaderComponent {
	@Input() value: String;
}
