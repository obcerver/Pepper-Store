export class Pepper {
    id: number;
    name: string;
    pic: string;
    desc: string;
    price: number;
    qty:number;

    constructor(id = 0, name= '', pic='', desc='', price=0, qty=1){
        this.id = id
        this.name = name
        this.pic = pic
        this.desc = desc
        this.price = price
        this.qty = qty
    }
}
