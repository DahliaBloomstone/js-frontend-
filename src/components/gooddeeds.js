class Gooddeeds {
    constructor() { //where a lot of our js code is gonna live (container)
      this.gooddeeds = []
     this.initBindingsAndEventListeners()
      this.adapter = new GooddeedsAdapter() //creating new instance of deeds adapter, saving it in property called adapter 
      this.fetchAndLoadGooddeeds() //invoke method 
    }
  
    
    initBindingsAndEventListeners() {
    this.gooddeedsContainer = document.getElementById('gooddeeds-container')
    }

  
    fetchAndLoadGooddeeds() {
        this.adapter //saving it in a property called adapter 
         .getGooddeeds()
         .then(gooddeeds => {
            gooddeeds.forEach(gooddeed => this.gooddeeds.push(new Gooddeed(gooddeed))) //iterate over array, pushing the new deed instance onto the Deed container property which is set to an emptyr array 
            console.log(this.gooddeeds) //once we are successful, we take the deeds from the server and iterate 
          })
        .then(() => {
            this.render()
        })
    }
  
   render() { //render stuff to the dom 
    const gooddeedsContainer = document.getElementById('gooddeeds-container')
    this.gooddeedsContainer.innerHTML = this.gooddeeds.map(gooddeed => gooddeed.renderLi()).join('')
    //array of lis surrounded by a deed body 
    //array of deed objects 
      //appending each individual deed w its content 
    }
}