// Core imports.
import {
    Component, 
    OnInit,
    TemplateRef
} from '@angular/core';

// Application imports.
import { 
    LeaderboardService 
} from "../shared/services/leaderboard.service";

import { 
    AlertService 
} from 'shared/services/alert.service';

import { 
    UserService 
} from 'shared/services';

// Third party imports.
import {
    BsModalService,
    BsModalRef
} from 'ngx-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-quest-leaderboard',
    templateUrl: './quest-leaderboard.component.html',
    styleUrls: ['./quest-leaderboard.component.css']
})

export class QuestLeaderboardComponent implements OnInit {
    private modalRef: BsModalRef;
    private student = [];
    private scores: object[] = new Array();

    constructor(
        private modalService: BsModalService,
        private leaderboardService: LeaderboardService,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    getQuestScores() {
        var dummySection = "5a3807410d1126321c11e5ee";
        var dummyQuest = "5a3b8e82b19a9e18d42d3890";
        this.leaderboardService.getQuestScores(dummySection, dummyQuest)
        .subscribe((user) => {
            if (user) {
                console.log('Yays');
                console.log(user);
                // JSON.parse(user);
                // JSON.stringify(user);
                console.log(user);
            } else {
                console.log('boo');
            }
        }, error => {
            // login failed so display error
            this.alertService.error(error);
        });
    }

    ngOnInit() {
        this.getQuestScores();
    }
}