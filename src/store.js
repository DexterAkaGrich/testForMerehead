//Redux
export default class Store {
  constructor(result){
    this._result = result;
    this._state = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}. desc:  ${item.desc}`);
    this._callbacks = [];
  }

  get state(){
    return this._state;
  }

  update(){
    this._state = this._result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}. desc:  ${item.desc}`);
  }

  subscribe(callback){
    this._callbacks.push(callback);
    return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
  }
}
