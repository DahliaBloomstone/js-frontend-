//sole purpose of adapter: its only job is to communicate w the API
//then hands that information to the front end 
//what is going to talk to our backend API
//object oriented javascript 

//just an object w a constructor 
//whenever we instantiate that adapter it will set a base url
//willl have ability to call get good deeds 
//then parse json
class GooddeedsAdapter {
    constructor() {
      this.baseUrl = 'http://localhost:3000/gooddeeds' //api url 
    }
  
    getGooddeeds() { //make a fetch request to our base URL
      return fetch(this.baseUrl).then(res => res.json()) //response object//PARSE json from response
    }

    createGooddeed(value) {
      const gooddeed = { //create deed object where the body property is equal to the value 
        body: value,
      }
      return fetch(this.baseUrl, {
        method: 'POST', 
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ gooddeed }), //stringify new object 
      })
      .then(res => res.json()) //send parse json object back to deeds component 
    }
}
  //then returns that result to our deeds class
   // createGooddeed(body) {
     // const gooddeedCreateParams = {
     //   method: 'POST',
     //   headers: {
      //    'Content-Type': 'application/json'
     //   },
     //   body: JSON.stringify({ body })
    //  }
     // return fetch(this.baseUrl, gooddeedCreateParams).then(res => res.json())
  //  }
  
   // updateGooddeed(body, id) {
    //  const gooddeedUpdateParams = {
     //   method: 'PUT',
    //    headers: {
     //     'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({ body })
  //    }
  
   //   return fetch(`${this.baseUrl}/${id}`, gooddeedUpdateParams).then(res =>
   //     res.json()
   //   )
  //  }
  
   // deleteGooddeed(gooddeedId) {
   //   const gooddeedDeleteParams = {
    //    method: 'DELETE',
    //    headers: {
    //      'Content-Type': 'application/json'
    //    }
    //  }
     // return fetch(`${this.baseUrl}/${gooddeedId}`, gooddeedDeleteParams).then(res =>
      //  res.json()
    //  )
   // }
  //}

  /*
  adapter = new GooddeedsAdapter() // method as instance method 
  //const gooddeeds = adapter.getGooddeeds() //get our particular deeds from the database
  */