class Gooddeed {
  constructor(gooddeedJSON) {
    this.body = gooddeedJSON.body
    this.id = gooddeedJSON.id
  }

  renderShow() {
  return `<h3>${this.body}</h3>`
  }

render() {
  return `<li data-id='${this.id}' data-props='${JSON.stringify(
    this
  )}' class='gooddeed-element'><a class="show-link" href='#'>${
    this.body
    }</a>  <button data-action='delete-gooddeed'>Delete</button></i></li>`
  }
}
