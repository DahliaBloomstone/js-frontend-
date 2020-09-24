class Gooddeeds {
    constructor() { //where a lot of our js code is gonna live (container)
      this.gooddeeds = []
      this.adapter = new GooddeedsAdapter() //creating new instance of deeds adapter, saving it in property called adapter 
      this.initBindingsAndEventListeners()
      this.fetchAndLoadGooddeeds() //invoke method 
    }
  
    //to save deeds, we need to add more listeners. so go to the html, new gooddeeds form, 
    initBindingsAndEventListeners() {
    this.gooddeedsContainer = document.getElementById('gooddeeds-container')
    this.newGooddeedBody = document.getElementById('new-gooddeed-body') //grabbing new deed element 
    this.gooddeedForm = document.getElementById('new-gooddeed-form')
    this.gooddeedForm.addEventListener('submit', this.createGooddeed.bind(this)) //whenever form submitted, fire off a function, bind THIS TO THE GOOD DEEDS CLASS when execute create good deed 
    }

    //define create gooddeed here: 
    //pass in event object e 
    //anytime you submit form, default behavior is to refresh page so that stops it 
    //everytime you add a deed, submit a post request to our rails API 
         //this is the form to be the Deeds class
    createGooddeed(e) {
      e.preventDefault()
      const value = this.newGooddeedBody.value 

      this.adapter.createGooddeed(value).then(gooddeed => {
        console.log(gooddeed)
      })
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