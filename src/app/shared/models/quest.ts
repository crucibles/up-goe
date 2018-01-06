/**
 * A class to represent inventories
 * @class
 *
 * @property quest_id identification string of the quest
 * @property quest_title quest's title/name
 * @property quest_descrption quest's description on 
 * what is the quest all about and what needs to be achieved
 * @property quest_retakable identifies if a quest is retakable or not;
 * true if retakable and false if otherwise
 * @property quest_badge badge to be obtained if quest is accomplished
 * @property quest_items[] items to be obtained if quest is accomplished
 * @property quest_hp the item's addition to the the user's health points if quest successfully accomplished
 * @property quest_xp the item's addition to the the user's exp points if quest successfully accomplished
 * @property quest_start_time_date time and date the quest had started/created
 * @property quest_end_time_date time and date of the quest's deadline
 * @property quest_party identifies if a quest requires party or not;
 * true if it requires party and false if otherwise
 * @property quest_prerequisite the list of quest names that must be accomplished before this quest can be added
 * 
*/
export class Quest {
    quest_id: number;
    quest_title: string;
    quest_description: string;
    quest_retakable: boolean;
    quest_badge: string;
    quest_item: string[]; 
    quest_xp: number;
    quest_hp: number;
    quest_start_date: Date;
    quest_end_date: Date;
    quest_party: boolean;
    quest_prerequisite: string[];
}