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

    imageDir: string = "/assets/images/";

    private _id: string;
    private item_type: string;
    private item_name: string;
    private item_photo: string;
    private item_description: string;
    private item_hp: string;
    private item_xp: string;
    private item_ailment: string;

    constructor(
        item?: any
    ) {
        if(item){
            this._id = item._id;
            this.item_type = item.item_type ? item.item_type : "";
            this.item_name = item.item_name ? item.item_name : "";
            this.item_photo = item.item_photo ? item.item_photo : "";
            this.item_description = item.item_description ? item.item_description : "";
            this.item_hp = item.item_hp ? item.item_hp : "";
            this.item_xp = item.item_xp ? item.item_xp : "";
            this.item_ailment = item.item_ailment ? item.item_ailment : "";
        } else {
            this.item_type = "";
            this.item_name = "";
            this.item_photo = "";
            this.item_description = "";
            this.item_hp = "";
            this.item_xp = "";
            this.item_ailment = "";
        }
    }

    createItem(
        item_type,
        item_name,
        item_photo,
        item_description,
        item_hp,
        item_xp,
        item_ailment
    ) {
        this.item_type = item_type;
        this.item_name = item_name;
        this.item_photo = item_photo;
        this.item_description = item_description;
        this.item_hp = item_hp;
        this.item_xp = item_xp;
        this.item_ailment = item_ailment;
    }

    getItemId() {
        return this._id;
    }

    getItemType() {
        return this.item_type;
    }

    getItemName() {
        return this.item_name;
    }

    getItemPhoto() {
        let image: string = "";

        // if image does not exist or if user has not set an image
        if (!this.item_photo || this.item_photo.length == 0) {
            image = this.imageDir + "not-found.jpg";
        } else {
            image = this.imageDir + this.item_photo;
        }

        return image;
    }

    getItemDescription() {
        return this.item_description;
    }

    getItemHp() {
        return this.item_hp;
    }

    getItemXp() {
        return this.item_xp;
    }

    getItemAilment() {
        return this.item_ailment;
    }

    setItemId(_id) {
        this._id = _id;
    }

    setItemType(item_type) {
        this.item_type = item_type;
    }

    setItemName(item_name) {
        this.item_name = item_name;
    }

    setItemPhoto(item_photo) {
        this.item_photo = item_photo;
    }

    setItemDescription(item_description) {
        this.item_description = item_description;
    }

    setItemHp(item_hp) {
        this.item_hp = item_hp;
    }

    setItemXp(item_xp) {
        this.item_xp = item_xp;
    }

    setItemAilment(item_ailment) {
        this.item_ailment = item_ailment;
    }
}