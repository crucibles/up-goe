// Core Imports
import {
	Component,
	OnInit,
	TemplateRef
} from '@angular/core';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

//Third-Party Imports
import {
	BsModalRef,
	BsModalService
} from 'ngx-bootstrap';

//Application Imports
import {
	Badge,
	Item,
	User,
	Conditions,
	Section,
	Course
} from 'shared/models';

import {
	BadgeService,
	ItemService,
	UserService,
	SectionService
} from 'shared/services';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const ITEMS: any[] = [
	{
		_id: "12",
		item_type: "Head",
		item_name: "Dark Sword",
		item_photo: "dark-sword.jpg",
		item_description: "Pierces to the soul.",
		item_hp: "123",
		item_xp: "124",
		item_ailment: "Poison"
	}
];

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
	//modal
	private bsModalRef: BsModalRef;
	private itemForm: FormGroup;
	private badgeForm: FormGroup;
	//url of uploaded image
	private itemImgUrl: string = "/assets/images/not-found.jpg";
	private badgeImgUrl: string = "/assets/images/not-found.jpg";
	private badgeImgFile: File;
	
	private url = 'api/upload';
	public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'file' });

	currentUser: User;
	items: Item[];
	badges: Badge[];
	instructorSections: any[];
	sectionId: any;

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		private modalService: BsModalService,
		private userService: UserService,
		private sectionService: SectionService,
		private badgeService: BadgeService,
		private route: ActivatedRoute,
		private toastr: ToastsManager
	) { 
		this.uploader = new FileUploader({ url: this.url, itemAlias: 'file' });
	}

	ngOnInit() {
		//override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		//overide the onCompleteItem property of the uploader so we are 
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			this.toastr.success("Well done!", "Upload success!");
			this.createBadge(JSON.parse(response));
		};

		this.getUser();
		this.initializeForm();
		this.getSections();

		this.route.paramMap.subscribe(params => {
			this.sectionId = params.get('sectionId');
		});
	}

	createBadge(res: any) {
		this.badgeForm.value.badgeImage = res? res.uploadName: "";
		this.badgeService.createBadge(this.setBadge(), this.badgeForm.value.badgeSection).subscribe(data => {
			if(!data) {
				console.log('Your badge failed to be created.');
			} 
		});

		this.bsModalRef.hide();
		this.badgeForm.reset();
	}

	private setConditions() {
		let badgeCondition = new Conditions();
		badgeCondition.setXp(this.badgeForm.value.badgeXP);
		badgeCondition.setLogInstreak(this.badgeForm.value.badgeLoginStreak);
		return badgeCondition;
	}

	private setBadge() {
		let badge = new Badge();
		badge.setBadge(
			this.badgeForm.value.badgeName,
			this.badgeForm.value.badgeImage,
			this.badgeForm.value.badgeDescription,
			this.setConditions(),
			false,
			false
		);
		return badge;
	}


	public badgeImageEvent($event: any) {		
		if ($event.target.files && $event.target.files[0]) {
			const fileSelected: File = $event.target.files[0];
			var reader = new FileReader();
			
			reader.readAsDataURL($event.target.files[0]); // read file as data url

			reader.onload = ($event) => { // called once readAsDataURL is completed
				let target: any = $event.target;
				let content: string = target.result;
				this.badgeImgUrl = content;
			}
		}
	}

	createItem() {
		console.log("description:" + this.itemForm.value.itemName);

	}

	initializeForm() {
		this.itemForm = this.formBuilder.group({
			itemName: new FormControl("", Validators.required),
			itemImage: new FormControl(""),
			itemEffect1: new FormControl("", Validators.required),
			itemEffect2: new FormControl("", Validators.required),
			itemEffect3: new FormControl("", Validators.required),
			itemDescription: new FormControl("", Validators.required)
		});
		this.badgeForm = this.formBuilder.group({
			badgeName: new FormControl("", Validators.required),
			badgeImage: new FormControl(""),
			badgeDescription: new FormControl("", Validators.required),
			badgeSection: new FormControl("", Validators.required),
			badgeXP: new FormControl("", Validators.required),
			badgeLoginStreak: new FormControl("", Validators.required)
		});
	}

	public itemImageEvent($event: any) {
		if ($event.target.files && $event.target.files[0]) {
			const fileSelected: File = $event.target.files[0];
			var reader = new FileReader();

			reader.readAsDataURL($event.target.files[0]); // read file as data url

			reader.onload = ($event) => { // called once readAsDataURL is completed
				let target: any = $event.target;
				let content: string = target.result;
				this.itemImgUrl = content;
			}
		}
	}

	/**
	 * Obtains information of the current user
	 */
	getUser(): void {
		let currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.userService.getUser(currentUser._id)
			.subscribe(user => {
				this.currentUser = new User(user);
				this.getTeacherItems();
				this.getTeacherBadges();
			});
	}

	getTeacherItems() {
		//AHJ: unimplemented; add items relative to the teacher; 
		//remove dummy below if itemService.getTeacherInventoryItems() get properly implemented
		this.items = ITEMS.map(item => new Item(item));

		/*this.itemService.getTeacherInventoryItems().subscribe(items => {
			this.items = items.map(item => new Item(item));
		});*/
	}

	getTeacherBadges() {
		//AHJ: unimplemented; add items relative to the teacher; 
		//remove dummy below if itemService.getTeacherInventoryItems() get properly implemented
		// this.badges = BADGES.map(badge => new Badge(badge));

		this.badgeService.getAllbadges().subscribe(badge => {
			console.warn(badge);
			this.badges = badge.map(b => new Badge(b));
		});

		/*this.itemService.getTeacherInventoryItems().subscribe(items => {
			this.items = items.map(item => new Item(item));
		});*/
	}

	/**
	 * Open item modal
	 * @description Open 'Add Item' modal.
	 * @param itemTemplate template
	 */
	openItemModal(itemTemplate: TemplateRef<any>) {
		this.bsModalRef = this.modalService.show(itemTemplate);
	}

	/**
	 * Open badge modal
	 * @description Open 'Add Badge' modal.
	 * @param badgeTemplate template
	 */
	openBadgeModal(badgeTemplate: TemplateRef<any>) {
		this.bsModalRef = this.modalService.show(badgeTemplate);
	}

	getSections(): void {
		this.sectionService.getInstructorSections(
			this.userService.getCurrentUser().getUserId()
		).subscribe(data => {
			this.instructorSections = data;
		});
	}
}
