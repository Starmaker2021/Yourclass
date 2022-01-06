let storage={
  /**
   * update storage item
   * @param key
   * @param value
   */
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * get storage item
   * @param key
   * @returns {undefined|any}
   */
  get(key){
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch (e){
      return undefined
    }
  },
  /**
   * remove storage item
   * @param key
   */
  remove(key){
    localStorage.removeItem(key);
  }
};

export default storage;
