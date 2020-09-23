const app = new App()
console.log("Welcome!")

// object oriented javascript 
//create a new instance of app
//app, once it gets created, creates a new instance of deeds component 
//calls different methods like fetch and load deeds 
//makes a call to backend API 
//object of a  class that we are going to create a new instance of 




// Your code here
let dodger = document.getElementById('dodger');


//move dodger left
function moveDodgerLeft() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left - 1}px`
  }
}

//move dodger right 
function moveDodgerRight() {
  let leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left + 1}px`
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

