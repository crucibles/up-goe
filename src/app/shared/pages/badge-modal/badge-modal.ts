// Core imports
import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';

import {
    ActivatedRoute
} from '@angular/router';

import {
    BsModalRef,
    BsModalService
} from 'ngx-bootstrap';

@Component({
    selector: 'badge-modal',
    templateUrl: './badge-modal.html',
    styleUrls: ['./badge-modal.css']
})
export class BadgeModal implements OnInit {
    @ViewChild('badgeModal') badgeModal: TemplateRef<any>;

    private bsModalRef: BsModalRef;

    constructor(
        private modalService: BsModalService
    ) { }

    ngOnInit() {
    }

    open() {
        // and use the reference from the component itself
        this.bsModalRef = this.modalService.show(this.badgeModal);
    }

}
