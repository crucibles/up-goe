export class Quest {
    quest_id: number;
    quest_title: string;
    quest_description: string;
    quest_retakable: boolean;
    //quest_badge: 
    quest_xp: number;
    quest_hp: number;
    //quest_item: 
    //quest_consumable:
    quest_start_time_date: Date;
    quest_end_time_date: Date;
}

export const QUESTS: Quest[] = [
    {
        quest_id: 1,
        quest_title: 'Going Bananas!',
        quest_description: 'Retrieve all bananas',
        quest_retakable: true,
        quest_xp: 1000,
        quest_hp: 10,
        quest_start_time_date: new Date('2017/12/15'),
        quest_end_time_date: new Date('2017/12/21')
    },
    {
        quest_id: 1,
        quest_title: 'The Search for the Missing Ring',
        quest_description: "Find Mrs. Chicken's missing ring!",
        quest_retakable: true,
        quest_xp: 1000,
        quest_hp: 10,
        quest_start_time_date: new Date('2017/10/15'),
        quest_end_time_date: new Date('2017/12/20')
        }
];