//HTML ELEMENTS
const game_board = document.getElementById("game-board")
const top_bar = document.getElementById("top-bar")
const top_bar_content = document.getElementById("top-bar-content")
const difficulty_section = document.getElementById("difficulty-section")
const rule_title = document.getElementById("rule-title")
const rule_content = document.getElementById("rule-content")
const difficulty_buttons = document.getElementById("difficulty-buttons")
const easy_button = document.getElementById("easy-button")
const regular_button = document.getElementById("reg-button")
const hard_button = document.getElementById("hard-button")
const start_button_container = document.getElementById("start-button-container")
const start_button = document.getElementById("start-button")

//target image



//DIFFICULTY VARIABLE
//easy by default
let difficulty = 1

//Score variable
let score = 0







//MENU BUTTON PRESSES


//WHEN EASY BUTTON IS PRESSED SET difficulty 1 and apply css styling to show button is selected

easy_button.addEventListener ("click", function(){
    
    //select difficulty

    difficulty = 1

    //edit button css to look selected

    easy_button.classList.replace("bg-sky-900", "bg-sky-700")

    //edit all other buttons to be deselected

    regular_button.classList.replace("bg-sky-700", "bg-sky-900")
    hard_button.classList.replace("bg-sky-700", "bg-sky-900")

})

//WHEN REGULAR BUTTON IS PRESSED set difficulty 2 and apply css

regular_button.addEventListener ("click", function(){
    
    //select difficulty
    
    difficulty = 2

    //edit button css to look selected

    regular_button.classList.replace("bg-sky-900", "bg-sky-700")

    

    easy_button.classList.replace("bg-sky-700", "bg-sky-900")
    hard_button.classList.replace("bg-sky-700", "bg-sky-900")
})

//WHEN HARD BUTTON IS PRESSED set difficulty 3 and apply css

hard_button.addEventListener ("click", function(){
    
    //select difficulty
    
    difficulty = 3
    
    //edit button css to look selected
    
    hard_button.classList.replace("bg-sky-900", "bg-sky-700")
    
    //edit all other buttons to be deselected
    
    easy_button.classList.replace("bg-sky-700", "bg-sky-900")
    regular_button.classList.replace("bg-sky-700", "bg-sky-900")
})


//START THE GAME
start_button.addEventListener ("click", function(){

    //set all menu elements to display none

    top_bar.innerText = "none"
    difficulty_section.style.display = "none"
    start_button.style.display = "none"

    spawn_target()
   
})

function spawn_target() {

    //this function creates a button that can be clicked

    //remove old target

    let old_target = document.getElementById("target")
    if (old_target){
        old_target.remove()
    }
    
    //add the new target
    let target = document.createElement("img")
    target.src = "target.png"
    target.style.width = "50px"
    target.style.height = "50px"
    target.style.position = "absolute"
    target.id = "target"

    //position randomly
    target.style.left = Math.random() * 80 + '%'
    target.style.top = Math.random() * 80 + '%'

    //add the event listener
    target.addEventListener ("click", function(){
        score++
        spawn_target();
    })

    game_board.appendChild(target)
    
    


}



