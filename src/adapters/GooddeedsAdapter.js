class GooddeedsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/gooddeeds' 
  }

  getGooddeeds() { 
    return fetch(this.baseUrl).then(res => res.json())
  }

  createGooddeed(body) {
    const gooddeedCreateParams = { 
      method: 'POST', 
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify( { body }), 
    }
      return fetch(this.baseUrl, gooddeedCreateParams).then(res => res.json())
    }

    updateGooddeed(body, id) {
      const gooddeedUpdateParams = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body })
      }
  
      return fetch(`${this.baseUrl}/${id}`, gooddeedUpdateParams).then(res => res.json()
      )
    }

    deleteGooddeed(gooddeedId) {
      const gooddeedDeleteParams = {
        method: 'DElETE', 
        headers: {
          "Content-Type": "application/json"
        }
      }
      return fetch(`${this.baseUrl}/${gooddeedId}`, gooddeedDeleteParams).then(res => res.json()
      )
    }
  }