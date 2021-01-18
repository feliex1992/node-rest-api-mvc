import * as NodeCache from "node-cache";

class CacheData {
  private nodeCache: any;

  constructor() {
    this.nodeCache = new NodeCache();
  }

  storeCache(dataStore: any) {
    const result = this.nodeCache.set(dataStore.user_id, { token: dataStore.token }, 1200);
    return result;
  }

  getCache(dataStore: any) {
    const result = this.nodeCache.get(dataStore.user_id);
    return result;
  }

  deleteCache(dataStore: any) {
    const result = this.nodeCache.del(dataStore.user_id);
    return result;
  }
}

export default CacheData;