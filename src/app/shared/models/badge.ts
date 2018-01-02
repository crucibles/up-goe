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
    badge_id: string;
    badge_photo: string;
    badge_description: string;
    badge_conditions: Conditions;
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
        hp, xp, ailment, log_in_streak, log_in_total, items, items_used, items_owned, head, left_leg, right_leg, left_arm, right_arm
    ) {
        this.hp = hp;
        this.xp = xp;
        this.ailment = ailment;
        this.log_in_streak = log_in_streak;
        this.log_in_total = log_in_total;
        this.items = items;
        this.items_used = items_used;
        this.items_owned = items_owned;
        this.head = head;
        this.left_leg = left_leg;
        this.right_leg = right_leg;
        this.left_arm = left_arm;
        this.right_arm = right_arm;
    }
}

export const cond: Conditions = {
    hp: 0,
    xp: 0,
    ailment: "",
    log_in_streak: "",
    log_in_total: "",
    items: [],
    items_used: "",
    items_owned: "",
    head: "",
    left_leg: "",
    right_leg: "",
    left_arm: "",
    right_arm: ""
}

export const badges: Badge[] = [
    {
        badge_id: "111",
        badge_photo: "",
        badge_description: "Rookie Commentor",
        badge_conditions: new Conditions(0, 0, "", "", "", "", "", "", "", "", "", "", "")
    },
    {
        badge_id: "222",
        badge_photo: "",
        badge_description: "Expert Commentor",
        badge_conditions: new Conditions(0, 0, "", "", "", "", "", "", "", "", "", "", "")
    }
];
