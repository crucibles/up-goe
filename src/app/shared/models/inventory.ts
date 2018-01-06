/**
 * A class to represent inventories
 * @class
 *
 * @property user_id identification of the user owning the inventory
 * @property section_id id of the section where the user inventory belongs to
 * @property items[] array of item ids stored in this inventory
 */
export class Inventory {
    private _id: string;
    private user_id: string;
    private section_id: string;
    private items: string[];

    constructor(
        user_id,
        section_id,
        items,
    ) {
        this.user_id = user_id;
        this.section_id = section_id;
        this.items = items;
    }
    
    getInventoryId() {
        return this._id;
    }

    getUserId() {
        return this.user_id;
    }

    getSectionId() {
        return this.section_id;
    }

    getItems() {
        return this.items;
    }

    setInventoryId(_id) {
        this._id = _id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
    }

    setSectionId(section_id) {
        this.section_id = section_id;
    }

    setItems(items) {
        this.items = items;
    }
}