const NodeList = require("./node.js");

class DoubleNode extends NodeList{
    constructor(data, previous, next){
        super(data, next)
        this.previous = previous
    }
}

class DoubleLinkedList extends LinkedList{
    constructor(equalsFn = defaultEquals){
        super(equalsFn)
        this.tail = null
    }
    
}