class Gooddeeds { 
  constructor() { 
    this.gooddeeds = []
    this.gooddeedId = []
    this.initBindingsAndEventListeners()
    this.adapter = new GooddeedsAdapter() 
    this.fetchAndLoadGooddeeds()  
  }

  initBindingsAndEventListeners() {
       document.addEventListener("DOMContentLoaded", function() {
      console.log("The DOM has loaded");
    });
    this.gooddeedsForm = document.getElementById('new-gooddeed-form')
    this.gooddeedInput = document.getElementById('new-gooddeed-body')
    this.gooddeedsNode = document.getElementById('gooddeeds-container')
    this.gooddeedShowNode = document.getElementById('gooddeed-show')
  
    this.body = document.querySelector('body')
    this.gooddeedsForm.addEventListener('submit',this.handleAddGooddeed.bind(this))
   
    // methods to edit and delete 
    this.gooddeedsNode.addEventListener('click',this.handleDeleteGooddeed.bind(this))
    this.gooddeedsNode.addEventListener('click', this.handleEditGooddeed.bind(this))

    //ATTEMPT #1: 
   // this.gooddeedsNode.addEventListener('click', this.fetchAndLoadGooddeeds(this))
   
    //<button onclick="sortGooddeeds()">Sort</button>
    //const gooddeeds = [];
    //sortGooddeeds() {
     // gooddeeds.sort();
     // document.getElementById("gooddeeds-container").innerHTML = gooddeeds;
   // }

   //ATTEMPT #2: 
  // this.gooddeedsNode.addEventListener('click', this.fetchAndLoadGooddeeds(this))

  // sortGooddeeds() {
  // this.gooddeeds.sort(a, b) {return a - b});
  // }


  }
  //add sort method
  //const gooddeeds = []
  fetchAndLoadGooddeeds() {
   // gooddeed.sort();
   /// console.log(gooddeeds);
    this.adapter.getGooddeeds()
    .then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
      .then( this.render.bind(this))
      .catch(error => console.log(error))
   // gooddeed.sort

  }

  //ATTEMPT #3:
//sortGooddeeds() {
//  this.adapter.getGooddeeds()
 // .then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
 //.then( this.render.gooddeeds.sort())
 // console.log(gooddeeds);
 // this.render()
//}

//sortGooddeeds(gooddeed) {
//  return gooddeed.sort(function(a, b) {
 //   return a -b;
//  })
///}
//sortGooddeeds


  createGooddeed(e) {
    e.preventDefault() //preventing button from normal html being fired off
    const value = this.newGooddeedBody.value 

    this.adapter.createGooddeed(value).then(gooddeed => {
      this.gooddeeds.push(new Gooddeed(gooddeed))
      //gooddeed.sort()   
      //console.log(gooddeed)                                     //create new instance of deed push to array
      this.newGooddeedBody.value = '' //empty out what is in imput field 
      this.render() 
    })
  } 

  updateGooddeed() {
  const li = e.target 
  li.contentEditable = false 
  li.classList.remove('editable')
  const newValue = li.innerHTML
  const id = li.dataset.id 
  this.adapter.updateGooddeed(newValue, id)
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
      target.innerHTML = gooddeed.body 
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
    //debugger
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

  gooddeedsHTML() {
    return this.gooddeeds.map( gooddeed => gooddeed.render() ).join('')
  }

  render() {
    this.gooddeedsNode.innerHTML = `<ul>${this.gooddeedsHTML()}</ul>`
  }
}


