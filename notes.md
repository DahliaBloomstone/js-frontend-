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
  initBindingsAndEventListeners() {
    this.gooddeedsForm = document.getElementById('new-gooddeed-form')
    this.gooddeedInput = document.getElementById('new-gooddeed-body')
    this.gooddeedsNode = document.getElementById('gooddeeds-container')
    this.gooddeedShowNode = document.getElementById('gooddeed-show')
    this.body = document.querySelector('body')
    this.gooddeedsForm.addEventListener('submit',this.handleAddGooddeed.bind(this))
    this.gooddeedsNode.addEventListener('click',this.handleDeleteGooddeed.bind(this))
    this.gooddeedsForm.addEventListener('click', this.handleEditGooddeed.bind(this))
  }

  fetchAndLoadGooddeeds() {
    this.adapter.getGooddeeds() //saving it in property called adapter
     //iterate over array, pushing the new deed instance onto the Deed container property which is set to an emptyr array 
              //once we are successful, we take the deeds from the server and iterate 
    .then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
      .then( this.render.bind(this))
      .catch(error => console.log(error))
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
    event.preventDefault() 
    const body = this.gooddeedInput.value 
    this.adapter.editGooddeed(body)
    .then( (gooddeedJSON) => this.gooddeeds.push(new Gooddeed(gooddeedJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.gooddeedInput.value = '' )
  }

  handleDeleteGooddeed() {
    if (event.target.dataset.action === 'delete-gooddeed' && event.target.parentElement.classList.contains("gooddeed-element")) {
      const gooddeedId = event.target.parentElement.dataset.gooddeedid
      this.adapter.deleteGooddeed(gooddeedId)
      .then( resp => this.removeDeletedGooddeed(resp) )
    }
  }

  removeDeletedGooddeed(deleteResponse) {
    this.gooddeeds = this.gooddeeds.filter( gooddeed => gooddeed.id !== deleteResponse.gooddeedId )
    this.render()
  }

  gooddeedsHTML() {
    return this.gooddeeds.map( gooddeed => gooddeed.render() ).join('')
  }

  render() {
    this.gooddeedsNode.innerHTML = `<ul>${this.gooddeedsHTML()}</ul>`
  }
}
