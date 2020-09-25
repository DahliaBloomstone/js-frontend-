class Gooddeed { //create a new instance as we iterate over deed json array
  constructor(gooddeedJSON) {
    this.id = gooddeedJSON.id
    this.body = gooddeedJSON.body
  }


  //content editable allows us to edit the content of a single li 
renderLi() {
  return `<li data-id=${this.id}>${this.body}</li>`
  }
}