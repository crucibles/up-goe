//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

import { 
    ActivatedRoute 
} from '@angular/router';


//Application Imports
import {
    ExperienceService,
    PageService,
    QuestService, 
    SectionService, 
    UserService 
} from 'shared/services';

import { 
    Section, 
    SectionQuest, 
    User, 
    Quest, 
    Experience
} from 'shared/models';

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

    //student's grade
    private sectionGrades: Experience[];
    private submissions: Experience[];

    constructor(
        private experienceService: ExperienceService,
        private questService: QuestService,
        private pageService: PageService,
        private route: ActivatedRoute,
        private sectionService: SectionService,
        private userService: UserService
    ) { 
    }

    ngOnInit() {
        this.setDefault();
        this.getCurrentSection();
        this.getCurrentUser();
        this.getQuest();
    }

    getCurrentUser() {
        this.route.paramMap.subscribe(params => {
            let sectionId = params.get('sectionId');
		});
		//AHJ: unimplemented... or not sure. Di ko sure kung tama na ning pagkuha sa current user
		this.currentUser = new User(this.userService.getCurrentUser());
	}


    /**
	 * Obtains the user's navigated section
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentSection() {
		this.currentSection = this.sectionService.getCurrentSection();
	}

    getQuest() {
        this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
            this.quests = quests.map(quest => new Quest(quest));
            this.experienceService.getSectionGrades(this.currentSection.getSectionId()).subscribe(experiences => {
                this.sectionGrades = experiences.map(submission => new Experience(submission));
            })
        });
    }

    getQuestGrades(quest_id: string){
        this.submissions = this.sectionGrades.filter(submission => submission.getQuestSubmission(quest_id) != null);
    }

    setStudentGrade(userId, questId, inputGrade){
        this.experienceService.setStudentQuestGrade(this.currentSection.getSectionId(), userId, questId, inputGrade).subscribe(
            grade => {
                console.log("FINISH subscription grade");
                console.log(grade);
            }
        )
    }

    /**
	 * Sets all the default less-related functions/properties of the component
	 */
    setDefault() {
        this.pageService.isProfilePage(false);
        this.submissions = [];
    }
}