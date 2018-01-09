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
    private head: string;
    private left_leg: string;
    private right_leg: string;
    private left_arm: string;
    private right_arm: string;

    constructor(
        inventory?: any
    ) {
        if (inventory) {
            this._id = inventory._id ? inventory._id : "";
            this.user_id = inventory.user_id ? inventory.user_id : "";
            this.section_id = inventory.section_id ? inventory.section_id : "";
            this.items = inventory.items ? inventory.items : "";
            this.head = inventory.head? inventory.head: "";
            this.left_leg = inventory.left_leg? inventory.left_leg: "";
            this.right_leg = inventory.right_leg? inventory.right_leg: "";
            this.left_arm = inventory.left_arm? inventory.left_arm: "";
            this.right_arm = inventory.right_arm? inventory.right_arm: "";
        } else {
            this.user_id = "";
            this.section_id = "";
            this.items = [];
        }
    }

    setInventory(
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

    getHead() {
        return this.head;
    }

    getLeftLeg() {
        return this.left_leg;
    }

    getRightLeg() {
        return this.right_leg;
    }

    getLeftArm() {
        return this.left_arm;
    }

    getRightArm() {
        return this.right_arm;
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

    setHead(head) {
        this.head = head;
    }

    setLeftLeg(left_leg) {
        this.left_leg = left_leg;
    }

    setRightLeg(right_leg) {
        this.right_leg = right_leg;
    }

    setLeftArm(left_arm) {
        this.left_arm = left_arm;
    }

    setRightArm(right_arm) {
        this.right_arm = right_arm;
    }
}