}
  fetchAndLoadGooddeeds() {
    this.adapter.getGooddeeds()
    .then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
    .then( this.render.bind(this))
    .catch(error => console.log(error))
    
    this.gooddeeds.sort(function (a, b) {
      let gooddeedA = a.gooddeed();
      let gooddeedB = b.gooddeed();
        if (gooddeedA < gooddeedB) {
          return -1;
      }
      if (gooddeedA > gooddeedB) {
        return 1;
      }
      return 0;
    });
  }