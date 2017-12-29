//Core Imports
import {
  Injectable
} from '@angular/core';

import {
  Item
} from './item';

@Injectable()
export class ItemService {

  constructor() { }

  /**
   * Creates new item in the database
   * @description Creates new item by adding the received item parameter to the database
   * @param item item to be added to the database
   */
  createItem(item: Item) {

  }

  /**
   * Edits existing item in the database 
   * @description Edit old information of existing item of id contained in the item parameter with the new item received in the parameter
   * @param item the item editing the existing item in the database; also contains id to identify which item to edit
   */
  editItem(item: Item) {

  }

  /**
   * Deletes the existing item from the database
   * @param item_id id of the item to be deleted
   */
  deleteItem(item_id) {

  }

  /**
   * Returns the item information based on item id
   * @param item_id id of the item whose information are to be retrieved
   */
  getItemById(item_id) {

  }

  /**
   * Gets the user's section inventory
   * @param user_id id of the user whose section inventory is to be retrieved
   * @param section_id id of the section where the user inventory is to be retrieved from
   */
  getUserSectionInventory(user_id, section_id) {

  }

  /**
   * Adds item to the inventory
   * @param item_id id of the item to be added to the inventory
   * @param inventory_id id of the inventory where the added item will be placed 
   */
  addItem(item_id, inventory_id) {

  }
  /**
   * Removes item from the inventory
   * @param item_id id of the item to be removed to the inventory
   * @param inventory_id id of the inventory where the item will be removed from
   */
  removeItem(item_id, inventory_id){

  }
  
  /**
   * Use the item and make use of its effects
   * @description Use the item and make use of its effects and deletes them 
   * from the inventory (using removeItem)
   * @param item_id id of the item to be used
   * @param user_id id of the user where the item will be used on
   * @param inventory_id id of the inventory where the item was located
   * 
   * @see removeItem
   */
  useItem(item_id, user_id, inventory_id){

  }

  /**
   * Equip the wearable item and make use of its effects
   * @description Equip the wearable item and make use of its effects and 
   * remove them from the inventory (using removeItem)
   * @param item_id id of the item to be equipped
   * @param user_id id of the user where the item will be placed on
   * @param inventory_id id of the inventory where the item was located
   * 
   * @see removeItem
   */
  equipItem(item_id, user_id, inventory_id){

  }

  /**
   * Equip the wearable item and make use of its effects
   * @description Equip the wearable item and remove effects (if applicable) and 
   * add them back to the inventory (using addItem)
   * @param item_id id of the item to be unequipped
   * @param user_id id of the user who equipped the item
   * @param inventory_id id of the inventory where the item will be placed
   * 
   * @see addItem
   */
  unequipItem(item_id, user_id, inventory_id){

  }

}
