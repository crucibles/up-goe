//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

//Application Imports
import {
    SectionService, QuestService, UserService, PageService
} from 'shared/services';
import { Section, SectionQuest, User, Quest } from 'shared/models';
import { ActivatedRoute } from '@angular/router';


const SECTION: any = {
    _id: "2",
    course_id: "sad3",
    section_name: "A",
    students: [
        {
            user_id: "1",
            status: "E"
        },
        {
            user_id: "2",
            status: "R"
        }
    ],
    instructor: "Miguel Guillermo",
    quests: [
        new SectionQuest({ quest_id: "5a3b8e82b19a9e18d42d3890", quest_participants: ["5a37f4500d1126321c11e5e7", "2"], quest_prerequisite: [] }),
        new SectionQuest({ quest_id: "1", quest_participants: ["1", "2"], quest_prerequisite: [] })
    ],
    items: [],
    badges: []
};



@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
    // basic page info
    private currentUser: any;
    private currentSection: Section;

    // grades info
    private quests: Quest[];

    constructor(
        private questService: QuestService,
        private pageService: PageService,
        private route: ActivatedRoute,
        private sectionService: SectionService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.setDefault();
        this.getCurrentUser();
        this.getCurrentSection();
    }

    getCurrentUser() {
        //AHJ: unimplemented... or not sure. Di ko sure kung tama na ning pagkuha sa current user
        this.currentUser = new User(this.userService.getCurrentUser());
        console.log("currUser");
        console.log(this.currentUser);
        this.getQuest();
    }


    /**
	 * Obtains the user's navigated section
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
    getCurrentSection() {
        this.route.paramMap.subscribe(params => {
            let sectionId = params.get('sectionId');
            //AHJ: unimplemented; dummy section remove when working
            this.currentSection = new Section(SECTION);
            console.log(this.currentSection);
        });
    }

    getQuest() {
        this.questService.getUserJoinedQuests(this.currentUser.getUserId())
            .subscribe(quests => {
                console.log(quests);
                this.quests = quests.map(quest => new Quest(quest));
            });
    }

    /**
	 * Sets all the default less-related functions/properties of the component
	 */
    setDefault() {
        this.pageService.isProfilePage(false);
    }
}