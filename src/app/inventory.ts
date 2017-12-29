/**
 * A class to represent inventories
 * @class
 *
 * @property user_id identification of the user owning the inventory
 * @property section_id id of the section where the user inventory belongs to
 * @property items[] array of item ids stored in this inventory
 */
export class Inventory {
    user_id: string;
    section_id: string;
    items: string[];
}

export const inventories: Inventory[] = [
    {
      user_id: "1",
      section_id: "11",
      items: ["111", "222"]
    },
    {
      user_id: "1",
      section_id: "22",
      items: ["111", "222"]
    }
  ];