// Core Imports
import {
	Component,
	OnInit,
	TemplateRef
} from '@angular/core';

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
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

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

	currentUser: User;
	items: Item[];
	badges: Badge[];

	constructor(
		private itemService: ItemService,
		private modalService: BsModalService,
		private userService: UserService
	) { }

	ngOnInit() {
		this.getUser();
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

}
