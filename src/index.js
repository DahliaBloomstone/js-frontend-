//index.js gets loaded and calls new App() 
//which will run the App constructor function defined above 
//which will set a property on that newly created app called gooddeeds
// that points to a new instance of our Gooddeeds object. 

const app = new App()
console.log("i am going crazy")

// object oriented javascript 
//create a new instance of app
//app, once it gets created, creates a new instance of deeds component 
//calls different methods like fetch and load deeds 
//makes a call to backend API 
//object of a  class that we are going to create a new instance of
 
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


// Your code here
let dodger = document.getElementById('dodger');


//move dodger left
function moveDodgerLeft() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left - 7}px`
  }
}

//move dodger right 
function moveDodgerRight() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left + 7}px`
  }
}

//making sure the dodger can't move past the left edge 
document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowLeft") {
    moveDodgerLeft()
  }
})

//dodger can't move past right edge 
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

