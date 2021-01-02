// getting all the cell elements
let cells = document.querySelectorAll(".cell")
// getting the board element
let board = document.querySelector(".board")

// elements for win-board
let restart_but = document.querySelector("button")
let win_stats =  document.querySelector(".win_stats")
let won_player = document.querySelector(".won_player")
let playerX_score = document.querySelector("#pX")
let playerO_score = document.querySelector("#pO")
let turn = document.querySelector("#turn")
let pX = 0,pO = 0

//Player X starts first
let Player_turn = "X"
// all the winnnig combinations
let Winning_combination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
// a place to store our inputs
let Inputs



function start_game(){
    Inputs = ["","","","","","","","",""]
    // Adding eventlistners to the cell elements

    cells.forEach(cell=>{
        cell.classList.remove("X")
        cell.classList.remove("O")
        cell.removeEventListener('click',player_input)
        cell.addEventListener('click', player_input, {once: true})
    })
    turn.textContent = Player_turn
    board.classList.add(Player_turn)
}


start_game()

restart_but.addEventListener("click",()=>{
    start_game()
    win_stats.classList.remove("show")
})


// Handling the click of the cell 
function player_input(e){
    let Player_marker
    // if the current player_turn is "X" then we put this in the board and change the board to "O"
    if(Player_turn =="X"){
        Player_marker = "X"
        Player_turn = "O"
        board.classList.remove(Player_marker)
        board.classList.add(Player_turn)
    }
    // if the current player_turn is "O" then we put this in the board and change the board to "X"
    else{
        Player_marker = "O"
        Player_turn = "X"
        board.classList.remove(Player_marker)
        board.classList.add(Player_turn)
    }
    turn.textContent = Player_turn
    // here we place the player mark on the board.
    const cell = e.target
    cell.classList.add(Player_marker)

    // creating a array for storing the inputs to check later
    Inputs[cell.classList[1][1]-1] = Player_marker
    Win_check(Player_marker)
    Draw_check()
}




// win cehck condition where we check for every combination in Winning_combination until we find a win
// this is done by a For Each loop and in it an if statement checking if the elements in Input array at index
// of the "places(obtained form Winning_combinatons)" are equal to each other
function Win_check(marker){
    Winning_combination.forEach(combination =>{
        if(Inputs[combination[0]]===Inputs[combination[1]] && Inputs[combination[1]]===Inputs[combination[2]] && Inputs[combination[1]]!=""){
            console.log("the winnner is \n\t "+marker)
            won_player.textContent = marker+" Won"
            win_stats.classList.add("show")
            if(marker==="X"){
                pX+=1
                playerX_score.textContent= pX
            }else{
                pO+=1
                playerO_score.textContent= pO
            }
            return
        }
    })
}

// this check for draw 
function Draw_check(){
    if(!Inputs.includes("")){
        console.log("Draw")
        won_player.textContent = "Draw"
        win_stats.classList.add("show")
    }
}