const app = new App()
console.log("i am going crazy")
alert('Welcome, fellow good person friend!');
 
function createDeleteButton(gooddeed, li) {
  const btn = document.createElement('button')
  btn.className = "delete"
  btn.innerHTML = "Delete"
  btn.addEventListener('click', () => {
    btn.parentElement.remove()
    deleteGooddeed(gooddeed["id"])
  })
  li.appendChild(btn)
}

//gooddeeds.sort((a, b) => a.gooddeed.localeCompare(b.gooddeed))


//SORT METHOD
//let sortByAlpha = document.getElementById('sort-by-alpha')
//sortByAlpha.addEventListener('click', this.fetchByAlphaFunction().bind(this))
//console.log(sortByAlpha)
//debugger
//function fetchByAlphaFunction() {
   // debugger
    //this.adapter.getGooddeeds()
    //.then( gooddeedsJSON => gooddeedsJSON.forEach( gooddeed => this.gooddeeds.push( new Gooddeed(gooddeed) )))
   // .then( gooddeeds => sortByAlphaFunction(gooddeeds))
   // .catch(error => console.log(error))
//}
//function sortByAlphaFunction(gooddeeds) {
 // console.log(gooddeeds)
//}


//game 

let dodger = document.getElementById('dodger');

function moveDodgerLeft() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left - 7}px`
  }
}

function moveDodgerRight() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left + 7}px`
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowLeft") {
    moveDodgerLeft()
  }
})

document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowRight") {
    moveDodgerRight()
  }
})



//mouse animation
var tID; 
function animateScript() {
  console.log("hi")
  var    position = 256;
  const  interval = 100; 
  tID = setInterval ( () => {
  document.getElementById("image").style.backgroundPosition = 
`-${position}px 0px`; 
if (position < 1536)
  { position = position + 256;}
else
  { position = 256; }
  }
  , interval );   
} 



// 
