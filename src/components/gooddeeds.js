class Gooddeeds {
  constructor() { //where a lot of our js code is gonna live (container)
    this.gooddeeds = []
    this.initBindingsAndEventListeners()
    this.adapter = new GooddeedsAdapter() //creating new instance of deeds adapter, saving it in property called adapter 
    this.fetchAndLoadGooddeeds() //invoke method 
  }

  //to save deeds, we need to add more listeners. so go to the html, new gooddeeds form,
  //listeners: form to create a new deed 
  //bindings to bind different dom elements  
  //event listener that listens to the clicking of the good deed 
  //    }</a> <button data-action='edit-gooddeed'>Edit</button> <button data-action='delete-gooddeed'>Delete</button></i></li>`

  initBindingsAndEventListeners() {
   
    //make sure page is loaded first, then function
    document.addEventListener("DOMContentLoaded", function() {
      console.log("The DOM has loaded");
    });

    this.gooddeedsForm = document.getElementById('new-gooddeed-form')
    this.gooddeedInput = document.getElementById('new-gooddeed-body')
    this.gooddeedsNode = document.getElementById('gooddeeds-container')
    this.gooddeedShowNode = document.getElementById('gooddeed-show')
  
    //? put it in my index.html
   // this.gooddeedInput = document.getElementById('delete-gooddeed')
   // this.gooddeedInput = document.getElementById('edit-goodeed')

    this.body = document.querySelector('body')
    this.gooddeedsForm.addEventListener('submit',this.handleAddGooddeed.bind(this))
   
    //have methods to edit and delete 
    this.gooddeedsNode.addEventListener('click',this.handleDeleteGooddeed.bind(this))
    this.gooddeedsNode.addEventListener('click', this.handleEditGooddeed.bind(this))

    //this.gooddeedsForm.addEventListener('onmouseover')
  }

  fetchAndLoadGooddeeds() {
    this.adapter.getGooddeeds() //saving it in property called adapter
     //iterate over array, pushing the new deed instance onto the Deed container property which is set to an emptyr array 
              //once we are successful, we take the deeds from the server and iterate 
    .then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
      .then( this.render.bind(this))
      .catch(error => console.log(error))
  }

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

  
  //target: whatever triggers event, have access to it
  //method in adapter for patch request 
  updateGooddeed() {
    if (event.target.className.includes('gooddeed-element')) {
      const { target } = event
      target.contentEditable = false
      target.classList.remove('editable')
      const body = event.target.innerHTML
      const gooddeedId = target.dataset.gooddeedid
      this.adapter.updateGooddeed(body, gooddeedId).then(updatedGooddeed => {
        this.gooddeeds = this.gooddeeds.map(
          n => (n.id === updatedGooddeed.id ? new Gooddeed(updatedGooddeed) : n)
        )
        this.render()
      })
    }
  }

  handleAddGooddeed() {
  event.preventDefault() 
    const body = this.gooddeedInput.value
    this.adapter.createGooddeed(body)
    .then( (gooddeedJSON) => this.gooddeeds.push(new Gooddeed(gooddeedJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.gooddeedInput.value = '' )
  }

  handleEditGooddeed() {
    const { parentElement: target } = event.target
    if (target.className == 'gooddeed-element') {
      target.classList.add('editable')
      const gooddeedId = target.dataset.id
      const gooddeed = this.gooddeeds.find(n => n.id == gooddeedId)
      target.contentEditable = true
      target.innerHTML = gooddeed.body //body property doesn't exist?
      //returns a string, representing the HTML content of an element

      target.focus()
      //edit action console @@hello shows up when clicked 
      console.log('@@hello')
    }
  }

  handleGooddeedClick() {
    if (
      event.target.dataset.action === 'delete-gooddeed' &&
      event.target.parentElement.classList.contains('gooddeed-element')
    ) {
      const gooddeedId = event.target.parentElement.dataset.gooddeedid
      this.adapter.deleteGooddeed(gooddeedId).then(resp => this.removeDeletedGooddeed(resp))
    } else if (event.target.dataset.action === 'edit-gooddeed') {
      this.toggleEditGooddeed()
    } else if (event.target.className === 'show-link') {
      debugger
      const gooddeedId = event.target.parentElement.dataset.gooddeedid
      const gooddeed = this.gooddeeds.find(gooddeed => gooddeed.id === +gooddeedId)
      this.gooddeedShowNode.innerHTML = gooddeed.renderShow()
    }
  }



  handleDeleteGooddeed() {
    if (event.target.dataset.action === 'delete-gooddeed' && event.target.parentElement.classList.contains("gooddeed-element")) {
      const gooddeedId = event.target.parentElement.dataset.gooddeedid
      this.adapter.deleteGooddeed(gooddeedId)
      .then( resp => this.removeDeletedGooddeed(resp) )
      //something is happening, @@goodbye shows up in the console.
      console.log('@@goodbye')
    }
  }

  removeDeletedGooddeed(deleteResponse) {
    this.gooddeeds = this.gooddeeds.filter( gooddeed => gooddeed.id !== deleteResponse.gooddeedId )
    this.render()
  }

  //render stuff to the dom 
  //appending each individual deed w content 
  gooddeedsHTML() {
    return this.gooddeeds.map( gooddeed => gooddeed.render() ).join('')
  }

  render() {
    this.gooddeedsNode.innerHTML = `<ul>${this.gooddeedsHTML()}</ul>`
  }
}
