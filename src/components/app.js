//this instantiates a new instance of deeds class 
//app we are creating a new instance of 

class App {
    constructor() { //creates a new instance of gooddeeds class 
        console.log('app loaded')
        this.gooddeeds = new Gooddeeds()
    }
}
//whenever we invoke app 
//fires off constructor  and deeds component 
//fires off gooddeeds