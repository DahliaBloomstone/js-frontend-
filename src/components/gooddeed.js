class Gooddeed { //create a new instance as we iterate over deed json array
  constructor(gooddeedJSON) {
    this.body = gooddeedJSON.body
    this.id = gooddeedJSON.id
  }

  //content editable allows us to edit the content of a single li 
renderShow() {
  return `<h3>${this.body}</h3>`
  }

render() {
  return `<li data-gooddeedid='${this.id}' data-props='${JSON.stringify(
    this
  )}' class='gooddeed-element'><a class="show-link" href='#'>${
    this.body
    }</a> <button data-action='edit-gooddeed'>Edit</button> <button data-action='delete-gooddeed'>Delete</button></i></li>`
  }
}
