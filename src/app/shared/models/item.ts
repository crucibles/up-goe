/**
 * A class to represent inventories
 * @class
 *
 * @property item_id identification string of the item
 * @property item_type the type of the item;
 * "W" for wearable & "C" for consummable
 * @property item_name the item's name
 * @property item_photo the item's photo name
 * @property item_description the item's description about what it is and what it does
 * @property item_hp the item's addition or deduction to the user's health points
 * @property item_xp the item's addition or deduction to the user's exp points
 * @property item_ailment the item's ailment effects
 */
export class Item {
    item_id: string;
    item_type: string;
    item_name: string;
    item_photo: string;
    item_description: string;
    item_hp: string;
    item_xp: string;
    item_ailment: string;
}