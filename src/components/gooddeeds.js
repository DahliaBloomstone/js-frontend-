class Gooddeeds {
    constructor() { //where a lot of our js code is gonna live (container)
      this.gooddeeds = []
      this.adapter = new GooddeedsAdapter() //creating new instance of deeds adapter, saving it in property called adapter 
      this.initBindingsAndEventListeners()
      this.fetchAndLoadGooddeeds() //invoke method 
    }
  
    //to save deeds, we need to add more listeners. so go to the html, new gooddeeds form,
    //listeners: form to create a new deed 
    //bindings to bind different dom elements  
    //event listener that listens to the clicking of the good deed 
    initBindingsAndEventListeners() {
    this.gooddeedsContainer = document.getElementById('gooddeeds-container')
    this.body = document.querySelector('body')
    this.newGooddeedBody = document.getElementById('new-gooddeed-body') //grabbing new deed element 
    this.gooddeedForm = document.getElementById('new-gooddeed-form')
    this.gooddeedForm.addEventListener('submit', this.createGooddeed.bind(this)) //whenever form submitted, fire off a function, bind THIS TO THE GOOD DEEDS CLASS when execute create good deed 
    this.gooddeedsContainer.addEventListener('dblclick', this.GooddeedClick.bind
    (this))
    this.body.addEventListener('blur', this.updateGooddeed.bind(this), true)
  } //added a parent to a listener for blue and true

    //define create gooddeed here: 
    //pass in event object e 
    //anytime you submit form, default behavior is to refresh page so that stops it 
    //everytime you add a deed, submit a post request to our rails API 
         //this is the form to be the Deeds class
         //patch request will update actual content in browser, need to grab innher html of li
    createGooddeed(e) {
      e.preventDefault()
      const value = this.newGooddeedBody.value 

      this.adapter.createGooddeed(value).then(gooddeed => {
        this.gooddeeds.push(new Gooddeed(gooddeed)) //create new instance of deed push to array
        this.newGooddeedBody.value = '' //empty out what is in imput field 
        this.render() //render to page 
      })
    } 

    //pass in the event object 
    GooddeedClick(e) {
      const li = e.target
      li.contentEditable = true  //class 
      li.focus()  //automatically add the cursor 
      li.classList.add('editable') //css class list 
    }

    updateGooddeed(e) {
      const li = e.target
      li.contentEditable = false
      li.classList.remove('editable') //when we click away from it, it removes the class so no more padding and border, no longer editable  
      const newValue = li.innerHTML //need adapter to make update request 
      this.adapter.updateGooddeed(newValue, id) //method in the adapter for patch request
    }


    fetchAndLoadGooddeeds() {
        this.adapter //saving it in a property called adapter 
         .getGooddeeds()
         .then(gooddeeds => {
            gooddeeds.forEach(gooddeed => this.gooddeeds.push(new Gooddeed(gooddeed))) //iterate over array, pushing the new deed instance onto the Deed container property which is set to an emptyr array 
             //once we are successful, we take the deeds from the server and iterate 
          })
        .then(() => {
            this.render()
        })
    }
  
   render() { //render stuff to the dom 
    this.gooddeedsContainer.innerHTML = this.gooddeeds.map(gooddeed => gooddeed.renderLi()).join
    ('')
    //array of lis surrounded by a deed body 
    //array of deed objects 
      //appending each individual deed w its content 
    }
}
//changing innher html of that to be equal to a bunch of lis, (the deeds bullet point list)