//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

import { 
    ActivatedRoute, 
    Router 
} from '@angular/router';


//Application Imports
import {
    ExperienceService,
    PageService,
    QuestService,
    SectionService,
    UserService,
    FileService
} from 'shared/services';

import { 
    Section, 
    SectionQuest, 
    User, 
    Quest, 
    Experience,
    Course
} from 'shared/models';

import { 
    AsyncAction 
} from 'rxjs/scheduler/AsyncAction';

import { 
    ToastsManager 
} from 'ng2-toastr';

import {
    saveAs
} from 'file-saver';

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
    private maxXp: number;

    //student's grade
    private studentGrades: StudentGrades[];
    private sectionGrades: Experience[];
    private submissions: Experience[];
    private questStudents: any = [];
    private isGraded: boolean[] = [];

    constructor(
        private experienceService: ExperienceService,
        private questService: QuestService,
        private pageService: PageService,
        private route: ActivatedRoute,
        private sectionService: SectionService,
        private userService: UserService,
        private toaster: ToastsManager,
        private router: Router,
        private fileService: FileService
    ) { 
    }

    ngOnInit() {
        this.isGraded = [];
        this.setDefault();
        this.getCurrentSection();
        this.getCurrentUser();
        this.getSectionInformation();
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

    getSectionInformation() {
        // obtain section quest
        this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
            this.quests = quests.map(quest => new Quest(quest));

            //obtain section experiences
            this.experienceService.getSectionGrades(this.currentSection.getSectionId()).subscribe(experiences => {
                if(experiences) {
                    this.sectionGrades = experiences.map(submission => new Experience(submission));

                    //obtain section's students
                    let sectionId = this.currentSection.getSectionId();
                    this.sectionService.getSectionStudents(sectionId).subscribe((students) => {
                        if(students) {
                            console.log(students);
                            students.forEach(student => {
                                //obtain student tot EXP
                                if (student && student.length > 1) {
                                    this.userService.getUser(student).subscribe((user) => {
                                        this.experienceService.getUserExpRecord(new User(user).getUserId(), sectionId).subscribe(res => {
                                            if(res) {
                                                console.log(res);
                                                this.studentGrades.push({
                                                    student: new User(user),
                                                    grade: new Experience(res).getTotalExperience()
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    toStudentName(studentId: string) {
        let studentName = studentId ? this.questStudents.filter(
            student => studentId == student.studentId
        ) : AsyncAction;

        return studentName[0].studentName;
    }

    downloadFile(fileName: any) {
        this.fileService.download(fileName).subscribe(res => {
            alert("Downloading now!");
			saveAs(res, fileName),
			error => console.log(error)
        });
    }

    getQuestGrades(quest_id: string){
        this.isGraded = [];
        this.submissions = this.sectionGrades.filter(submission => {
            this.questStudents.push({
                studentId: submission.getUserId(),
                studentName: ""
            });
            return submission.getQuestSubmission(quest_id) != null && submission.getQuestSubmissionDate(quest_id) != "";
        });

        this.submissions.forEach(exp => {
            exp.getQuestsTaken().forEach(quest => {
                if(quest.quest_id == quest_id) {
                    this.isGraded.push(!quest.is_graded);
                }
            });
        });

        let tempStudents: any = [];
        let copyQuestStudents: any = [];
        this.questStudents.forEach(student => {
            if(tempStudents == null || tempStudents.indexOf(student.studentId) == -1) {
                tempStudents.push(student.studentId);
                copyQuestStudents.push({
                    studentId: student.studentId,
                    studentName: ""
                });
            }
        });

        this.questStudents = copyQuestStudents;
        this.questStudents.forEach(student => {
            this.userService.getUser(student.studentId).subscribe(res => {
                student.studentName = (new User(res).getUserFullName());
            });
        });
    }

    setStudentGrade(userId, questId, inputGrade, gradedIndex) {
        if(inputGrade == "") {
            this.toaster.error(
                "You must input a grade to be submitted!",
                "Grade Submission Error!"
            );
        } else {
            this.questService.getQuest(questId).subscribe(res => {
                if(Number(inputGrade) <= (new Quest(res).getQuestXp()) && Number(inputGrade) >=0) {
                    this.toaster.success(
                        "Successfully submitted the grade of " + this.toStudentName(userId),
                        "Grade Submission Success!"
                    );
                    this.experienceService.setStudentQuestGrade(this.currentSection.getSectionId(), userId, questId, inputGrade)
                        .subscribe(grade => {
                            this.isGraded[gradedIndex] = !this.isGraded[gradedIndex];
                            this.submissions = this.submissions.map(quest => {
                                if(quest.getUserId() == userId) {
                                    quest.setIsGraded(questId);
                                }
                                return quest;
                            });

                            this.experienceService.getUserExpRecord(userId, this.currentSection.getSectionId()).subscribe(res => {
                                if(res) {
                                    this.studentGrades.find(student => {
                                        return student.student.getUserId() == userId;
                                    }).grade = new Experience(res).getTotalExperience();
                                }
                            });
                        }
                    )
                } else {
                    this.toaster.error(
                        "Your submitted grade must be within 0 and " + (new Quest(res).getQuestXp()),
                        "Grade Submission Error!"
                    );
                }
            });
        }
    }

    /**
	 * Sets all the default less-related functions/properties of the component
	 */
    setDefault() {
        this.pageService.isProfilePage(false);
        this.submissions = [];
        this.studentGrades = [];
    }

    isSubmitted(quests_taken: any[], quest_id: string) {
        quests_taken.forEach(quest => {
            if(quest_id == quest.quest_id) {
                // this.isGraded = quest.is_graded;
                return quest.is_graded;

            }
        });
    }

    getQuestMaxXp(quest_id: string) {
        let quest = this.quests.find(quest => quest.getQuestId() == quest_id);
        return quest ? quest.getQuestXp() : 0;
    }

    setMaxXp(quest: Quest) {
        this.maxXp = quest.getQuestXp();
    }
}

export interface StudentGrades {
    student: User,
    grade: number
}