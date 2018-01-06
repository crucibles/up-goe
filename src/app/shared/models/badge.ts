/**
 * A class to represent badges
 * @class
 *
 * @property badge_id identification for a badge
 * @property badge_photo photoname for the badge
 * @property badge_description description what the badge is all about
 * @property badge_conditions conditions needed to accomplish in order to obtain this badge
 */
export class Badge {
    private _id: string;
    private badge_photo: string;
    private badge_description: string;
    private badge_conditions: Conditions;

    constructor(
        badge?: any
    ) {
        if (badge) {
            this._id = badge._id;
            this.badge_photo = badge.badge_photo ? badge.badge_photo : "";
            this.badge_description = badge.badge_description ? badge.badge_description : "";
            this.badge_conditions = badge.badge_conditions ? new Conditions(badge.badge_conditions) : new Conditions();
        } else {
            this.badge_photo = "";
            this.badge_description = "";
            this.badge_conditions = new Conditions();
        }
    }

    setBadge(
        badge_photo,
        badge_description,
        badge_conditions
    ) {
        this.badge_photo = badge_photo ? badge_photo : "";
        this.badge_description = badge_description ? badge_description : "";
        this.badge_conditions = badge_conditions ? badge_conditions : new Conditions();
    }

    getBadgeId(): string {
        return this._id;
    }

    getBadgePhoto(): string {
        return this.badge_photo;
    }

    getBadgeDescription(): string {
        return this.badge_description;
    }

    getBadgeConditions(): Conditions {
        return this.badge_conditions;
    }

    setBadgeId(_id: string) {
        this._id = _id;
    }

    setBadgePhoto(badge_photo: string) {
        this.badge_photo = badge_photo;
    }

    setBadgeDescription(badge_description) {
        this.badge_description = badge_description;
    }

    setBadgeConditions(badge_conditions) {
        this.badge_conditions = badge_conditions;
    }
}

export class Conditions {
    hp: number;
    xp: number;
    ailment: string;
    log_in_streak: string;
    log_in_total: string;
    items: any[];
    items_used: string;
    items_owned: string;
    head: string;
    left_leg: string;
    right_leg: string;
    left_arm: string;
    right_arm: string;

    constructor(
        conditions?: any
    ) {
        if (conditions) {
            this.hp = conditions.hp;
            this.xp = conditions.xp;
            this.ailment = conditions.ailment;
            this.log_in_streak = conditions.log_in_streak;
            this.log_in_total = conditions.log_in_total;
            this.items = conditions.items;
            this.items_used = conditions.items_used;
            this.items_owned = conditions.items_owned;
            this.head = conditions.head;
            this.left_leg = conditions.left_leg;
            this.right_leg = conditions.right_leg;
            this.left_arm = conditions.left_arm;
            this.right_arm = conditions.right_arm;
        } else {
            this.hp = 0;
            this.xp = 0;
            this.ailment = "";
            this.log_in_streak = "";
            this.log_in_total = "";
            this.items = [];
            this.items_used = "";
            this.items_owned = "";
            this.head = "";
            this.left_leg = "";
            this.right_leg = "";
            this.left_arm = "";
            this.right_arm = "";
        }
    }

    getHp() {
        return this.hp;
    }

    getXp() {
        return this.xp;
    }

    getAilment() {
        return this.ailment;
    }

    getLogInStreak() {
        return this.log_in_streak;
    }

    getLogInTotal() {
        return this.log_in_total;
    }

    getItems() {
        return this.items;
    }

    getItemsUsed() {
        return this.items_used;
    }

    getItemsOwned() {
        return this.items_owned;
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

    setHp(hp) {
        this.hp = hp;
    }

    setXp(xp) {
        this.xp = xp;
    }

    setAilment(ailment) {
        this.ailment = ailment;
    }

    setLogInstreak(log_in_streak) {
        this.log_in_streak = log_in_streak;
    }

    setLogIntotal(log_in_total) {
        this.log_in_total = log_in_total;
    }

    setItems(items) {
        this.items = items;
    }

    setItemsUsed(items_used) {
        this.items_used = items_used;
    }

    setItemsOwned(items_owned) {
        this.items_owned = items_owned;
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

