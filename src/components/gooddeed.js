
class Gooddeed { //create a new instance as we iterate over deed json array
    constructor(gooddeedJSON) {
      this.id = gooddeedJSON.id
      this.body = gooddeedJSON.body
    }


    //content editable allows us to edit the content of a single li 
  renderLi() {
    return `<li data-gooddeedId=${this.id}>${this.body}</li>`
  }
}
  
    /*
    renderShow() {
      return `<h3>${this.body}</h3>`
    }
  
    render() {
      return `<li data-gooddeedid='${this.id}' data-props='${JSON.stringify(
        this
      )}' class='gooddeed-element'><a class="show-link" href='#'>${
        this.body
      }</a> <button data-action='edit-gooddeed'>Edit</button> <i data-action='delete-gooddeed' class="em em-scream_cat"></i></li>`
   
    }
 */
 
 
  
  