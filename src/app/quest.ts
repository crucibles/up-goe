export class Quest {
    quest_id: number;
    quest_title: string;
    quest_description: string;
    quest_retakable: boolean;
    quest_badge: string;
    quest_xp: number;
    quest_hp: number;
    quest_item: string[]; 
    quest_start_time_date: Date;
    quest_end_time_date: Date;
    quest_party: boolean;
    quest_prerequisite: string[];
}

export const quests: Quest[] = [
    {
      quest_id: 11,
      quest_title: 'Going Bananas!',
      quest_description: 'Retrieve all bananas',
      quest_retakable: true,
      quest_badge: "",
      quest_xp: 1000,
      quest_hp: 10,
      quest_item: [],
      quest_start_time_date: new Date('2017/12/15'),
      quest_end_time_date: new Date('2017/12/22'),
      quest_party: false,
      quest_prerequisite: []
    },
    {
      quest_id: 22,
      quest_title: 'The Rise of the Fallen Dragon',
      quest_description: 'Put the dragon back to sleep',
      quest_retakable: true,
      quest_badge: "",
      quest_xp: 1000,
      quest_hp: 10,
      quest_item: [],
      quest_start_time_date: new Date('2017/12/15'),
      quest_end_time_date: new Date('2017/12/30'),
      quest_party: false,
      quest_prerequisite: []
    },
    {
      quest_id: 23,
      quest_title: 'The Search for the Missing Ring',
      quest_description: "Find Mrs. Chicken's missing ring!",
      quest_retakable: true,
      quest_badge: "",
      quest_xp: 1000,
      quest_hp: 10,
      quest_item: [],
      quest_start_time_date: new Date('2017/12/15'),
      quest_end_time_date: new Date('2017/12/30'),
      quest_party: false,
      quest_prerequisite: []
    }
  ];