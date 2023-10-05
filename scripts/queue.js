
export class Queue{

    constructor(in_items){
        this.items = in_items || [];
    }

    size(){
        return this.items.length;
    }
    //añade un elemento a items
    enqueue(elem){
        this.items.push(elem);
    }
    //devuelve el primer elemento o undefined si está vacía la queue
    dequeue(){
        return this.items.length > 0 ? this.items.shift() : undefined;
    }
    //devuelve true si el element está en la queue
    contains(elem) {
        return this.items.includes(elem);
    }

}

