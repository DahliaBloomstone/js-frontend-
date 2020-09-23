class Gooddeeds {
    constructor() { //where a lot of our js code is gonna live (container)
      this.gooddeeds = []
     this.BindingsAndEventListeners()
      this.adapter = new GooddeedsAdapter() //creating new instance of deeds adapter, saving it in property called adapter 
      this.fetchAndLoadGooddeeds() //invoke method 
    }
  
    
    initBindingsAndEventListeners() {
    this.gooddeedsContainer = document.getElementById('gooddeeds-container')
    }
      /*
      this.gooddeedsForm = document.getElementById('new-gooddeed-form')
      this.gooddeedInput = document.getElementById('new-gooddeed-body')
      this.gooddeedsNode = document.getElementById('gooddeeds-container')
      this.gooddeedShowNode = document.getElementById('gooddeed-show')
      this.body = document.querySelector('body')
      this.gooddeedsForm.addEventListener('submit', this.handleAddGooddeed.bind(this))
      this.gooddeedsNode.addEventListener('click', this.handleGooddeedClick.bind(this))
      this.body.addEventListener('blur', this.updateGooddeed.bind(this), true)
    }
    */


  
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
        
        
        //use our adapter (equal to instance of adapter, which means we can get the deeds)
    //  this.adapter.getGooddeeds().then(gooddeedsJSON =>  //promise  
            //iterate over each deed, as we iterate we will push each individual object into this.gooddeeds 
            //have access to array of deeds by calling this.gooddeeds in other methods 
            //pushing a new deed instance into the deed array 
      //    gooddeedsJSON.forEach(gooddeed => this.gooddeeds.push(new Gooddeed(gooddeed)))
      //  )
       //   .then(this.render.bind(this))
       // .catch(error => console.log(error))
  //  }

  
    /*
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
      this.adapter
        .createGooddeed(body)
        .then(gooddeedJSON => this.gooddeeds.push(new Gooddeed(gooddeedJSON)))
        .then(this.render.bind(this))
        .then(() => (this.gooddeedInput.value = ''))
    }
  
    toggleEditGooddeed() {
      const { parentElement: target } = event.target
      if (target.className == 'gooddeed-element') {
        target.classList.add('editable')
        const gooddeedId = target.dataset.gooddeedid
        const gooddeed = this.gooddeeds.find(n => n.id == gooddeedId)
        target.contentEditable = true
        target.innerHTML = gooddeed.body
        target.focus()
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
  
    removeDeletedGooddeed(deleteResponse) {
      this.gooddeeds = this.gooddeeds.filter(gooddeed => gooddeed.id !== deleteResponse.gooddeedId)
      this.render()
    }
  
    gooddeedsHTML() {
      return this.gooddeeds.map(gooddeed => gooddeed.render()).join('')
    }

    */
  
   render() { //render stuff to the dom 
    const gooddeedsContainer = document.getElementById('gooddeeds-container')
    this.gooddeedsContainer.innerHTML = this.gooddeeds.map(gooddeed => gooddeed.renderLI()).join('')
    //array of lis surrounded by a deed body 
    //array of deed objects 
      //appending each individual deed w its content 
    }
}