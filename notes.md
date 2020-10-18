 updateGooddeed() {
    if (event.target.className.includes('gooddeed-element')) {
      const { target } = event
      target.contentEditable = false
      target.classList.remove('editable')
      const body = event.target.innerHTML
      const gooddeedId = target.dataset.gooddeedId
      this.adapter.updateGooddeed(body, gooddeedId).then(updatedGooddeed => {
        this.gooddeeds = this.gooddeeds.map(
          n => (n.id === updatedGooddeed.id ? new Gooddeed(updatedGooddeed) : n)
        )
        this.render()
      })
    }
  }



    deleteGooddeed(gooddeedId) {
      const gooddeedDeleteParams = {
        method: 'DELETE', 
        headers: {
          "Content-Type": "application/json"
        }
      }
      return fetch(`${this.baseUrl}/${gooddeedId}`, gooddeedDeleteParams).then(res => res.json()
      )
    }
  
  }


      return fetch(`${this.baseUrl}/${gooddeedId}`, gooddeedDeleteParams).then(res => res.json()

      this.adapter.deleteGooddeed(gooddeedId)
