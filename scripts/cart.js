export class Cart {
  constructor(){
    this.items = [];
  }
  add(product){
    this.items.push(product);
  }
  remove(id){
    const idx = this.items.findIndex(i=>i.id===id);
    if(idx!==-1) this.items.splice(idx,1);
  }
  list(){ return this.items; }
  clear(){ this.items = []; }
  total(){ return this.items.reduce((s,p)=>s+p.price,0); }
  count(){ return this.items.length; }
}
