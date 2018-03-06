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
	Conditions
} from 'shared/models';

import {
	BadgeService,
	ItemService,
	UserService
} from 'shared/services';

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

const BADGES = [
	{
		_id: "1",
		badge_name: "Badge1",
		badge_photo: "badge1.png",
		badge_description: "Earn th issd fs dfsdf sdsd fs df dsflo  lsdf fsdfsd fsdf ffff ffff ffff fff fffffffff ffffff fffff ffff",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_name: "Badge2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	}
]

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
	private imageUrl: string = "";

	currentUser: User;
	items: Item[];
	badges: Badge[];

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		private modalService: BsModalService,
		private userService: UserService
	) { }

	ngOnInit() {
		this.getUser();
		this.initializeForm();
	}

	createBadge() {
		console.log("description:" + this.badgeForm.value.badgeName);

	}

	createItem() {
		console.log("description:" + this.itemForm.value.itemName);

	}

	initializeForm() {
		this.itemForm = this.formBuilder.group({
			itemName: new FormControl("", Validators.required),
			itemImage: new FormControl(),
			itemEffect1: new FormControl("", Validators.required),
			itemEffect2: new FormControl("", Validators.required),
			itemEffect3: new FormControl("", Validators.required),
			itemDescription: new FormControl("", Validators.required)
		});
		this.badgeForm = this.formBuilder.group({
			badgeName: new FormControl("", Validators.required),
			badgeImage: new FormControl("", Validators.required),
			badgeDescription: new FormControl("", Validators.required)
		});
	}

	public fileEvent($event: any) {
		if ($event.target.files && $event.target.files[0]) {
			const fileSelected: File = $event.target.files[0];
			var reader = new FileReader();

			reader.readAsDataURL($event.target.files[0]); // read file as data url

			reader.onload = ($event) => { // called once readAsDataURL is completed
				let target: any = $event.target;
				let content: string = target.result;
				this.imageUrl = content;
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
		this.badges = BADGES.map(badge => new Badge(badge));

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
		console.log("here!");
		this.bsModalRef = this.modalService.show(itemTemplate);
	}

	/**
	 * Open item modal
	 * @description Open 'Add Item' modal.
	 * @param itemTemplate template
	 */
	openBadgeModal(badgeTemplate: TemplateRef<any>) {
		console.log("here!");
		this.bsModalRef = this.modalService.show(badgeTemplate);
	}

}
