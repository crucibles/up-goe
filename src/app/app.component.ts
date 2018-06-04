import {
	Component, ViewContainerRef
} from '@angular/core';

import {
	ToastsManager
} from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'up-goe';

	constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vcr);
	}
	
}
