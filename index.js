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

//SOUNDS

let button_sound = new Audio("difficulty_button_clicked.mp3")
let target_clicked_sound = new Audio("target_clicked.mp3")


//GAME STATE VARIABLES

//DIFFICULTY VARIABLE
//easy by default

let difficulty = 1

//Score variable
let score = 0

//size variable
let size = 150

//movement variable
let movement = 0.5
let direction_x = 1
let direction_y = 1

//timer variable
let game_timer = 60

//timer and animation IDs, so can stop them
let timer_interval
let animation_id

//game state flag
let end_game_flag = false






//lock the viewport
document.body.style.overflow = 'hidden'

//MENU BUTTON PRESSES


//WHEN EASY BUTTON IS PRESSED SET difficulty 1 and apply css styling to show button is selected

easy_button.addEventListener ("click", function(){

    button_sound.play()

    
    //select difficulty

    difficulty = 1
    movement = 0.5
    size = 150

    //edit button css to look selected

    easy_button.classList.replace("bg-sky-900", "bg-sky-700")

    //edit all other buttons to be deselected

    regular_button.classList.replace("bg-sky-700", "bg-sky-900")
    hard_button.classList.replace("bg-sky-700", "bg-sky-900")

})

//WHEN REGULAR BUTTON IS PRESSED set difficulty 2 and apply css

regular_button.addEventListener ("click", function(){

    button_sound.play()
    
    //select difficulty
    
    difficulty = 2
    movement = 1
    size = 100

    //edit button css to look selected

    regular_button.classList.replace("bg-sky-900", "bg-sky-700")

    

    easy_button.classList.replace("bg-sky-700", "bg-sky-900")
    hard_button.classList.replace("bg-sky-700", "bg-sky-900")
})

//WHEN HARD BUTTON IS PRESSED set difficulty 3 and apply css

hard_button.addEventListener ("click", function(){

    button_sound.play()
    
    //select difficulty
    
    difficulty = 3
    movement = 1.5
    size = 50
    
    //edit button css to look selected
    
    hard_button.classList.replace("bg-sky-900", "bg-sky-700")
    
    //edit all other buttons to be deselected
    
    easy_button.classList.replace("bg-sky-700", "bg-sky-900")
    regular_button.classList.replace("bg-sky-700", "bg-sky-900")
})


//START THE GAME
start_button.addEventListener ("click", function(){

    button_sound.play()

    //set all menu elements to display none

    top_bar_content.innerText = "score"
    difficulty_section.style.display = "none"
    start_button.style.display = "none"
    rule_title.style.display = "none"
    rule_content.style.display = "none"

    animation_id = requestAnimationFrame(update_game)

    //timer function
    timer_interval = window.setInterval(decrement_time, 1000)
    
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
    target.style.width = `${size}px`
    target.style.height = `${size}px`
    target.style.position = "absolute"
    target.id = "target"
    target.draggable = false

    //position randomly
    target.style.left = Math.random() * 80 + '%'
    target.style.top = (Math.random() * 65 + 15) + '%'

    // Set independent random X and Y directions when the target spawns
    direction_x = Math.random() < 0.5 ? -1 : 1
    direction_y = Math.random() < 0.5 ? -1 : 1

    //add the event listener
    target.addEventListener ("click", function(){
        
        target_clicked_sound.currentTime = 0
        target_clicked_sound.play()    
        
        score++

            if (end_game_flag === false){

                spawn_target()
            }
            
        
    })

    game_board.appendChild(target)

    return target


}

//updates the score and time elememts

function update_game(){

    //display top bar text and update game

    top_bar_content.innerHTML = `Score: ${score} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: ${game_timer}` 

    //get the target for movement 
    let current_target = document.getElementById("target")

    // Only update movement if the target currently exists
    if (current_target) {
       
        //current current rect position in viewport
        let current_target_position = current_target.getBoundingClientRect()
        let viewport_width = window.innerWidth
        let viewport_height = window.innerHeight

        //get movement direction
        

        //calculate the movement amount
        let new_top = current_target_position.top + (movement*direction_x)
        let new_left = current_target_position.left + (movement*direction_y)

        // Apply the movement to the target CSS (needs 'px' appended)
        current_target.style.top = new_top + "px"
        current_target.style.left = new_left + "px"

        //check boundaries
        if (new_top < 0 || new_top + current_target_position.height > viewport_height 
            ||new_left < 0 || new_left + current_target_position.width > viewport_width
        )
        {
            current_target.remove()
            spawn_target()
        }
    }

    //if the target goes off screen, remove it

    animation_id = requestAnimationFrame(update_game)


}

//ends the game and displays score to the user with a menu button which reloads the page and sends user to the start menu

function end_game(){

    console.log("ended")
    //stops the game loop
    cancelAnimationFrame(animation_id)
    //stops timer
    clearInterval(timer_interval)
    //remove target
    let current_target = document.getElementById("target")
    if (current_target) {
        current_target.remove()
    }
    //reset top bar 
    top_bar_content.innerHTML = "GetGood.com"

    //create Game Over Screen
    let end_container = document.createElement("div")
    end_container.id = "end-container"
    end_container.className = "absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    end_container.innerHTML = `
        <h1 class="text-5xl font-bold text-slate-200 mb-4">Game Over</h1>
        <p class="text-3xl font-semibold text-slate-200">Final Score: ${score}</p>
    `
    game_board.appendChild(end_container)

    //add MENU button in the same location as Start button
    let menu_button = document.createElement("button")
    menu_button.id = "menu-button"
    menu_button.className = start_button.className
    menu_button.innerText = "MENU"
    start_button_container.appendChild(menu_button)

    menu_button.addEventListener("click", function(){
        
        button_sound.play()

        setTimeout(function() {
            location.reload()
        }, 300) // wait 300 milliseconds for the sound to play
    })
}


//function to decrement time
function decrement_time(){

    game_timer -= 1

    if (game_timer === 0){

        end_game()

    }
}
