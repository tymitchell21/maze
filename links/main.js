const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const directions = {
    ArrowUp: () => move(-1, +0),
    ArrowRight: () => move(+0, +1),
    ArrowDown: () => move(+1, +0),
    ArrowLeft: () => move(+0, -1)
}

let characterY = 9
let characterX = 0

const start = document.querySelector('#start-button')
const destination = document.querySelector('#maze-wrap')
const win = document.querySelector('#win')

// creates a single piece of maze
function addCell (piece,column,row) {
    let newCell = document.createElement('div')

    if (piece === 'W') newCell.className = 'walls'
    else if (piece === 'S') newCell.className = 'start'
    else if (piece === 'F') newCell.className = 'finish'
    else newCell.className = 'blank'

    newCell.id = `[${column}][${row}]`

    let columnDest = document.getElementById(column)
    columnDest.appendChild(newCell)
}

// creates new column
function createColumn (column) {
    let newCell = document.createElement('div')
    newCell.id = column
    newCell.className = 'column'
    destination.appendChild(newCell)
}

// creates the character
function createCharacter () {
    let newCharacter = document.createElement('div')
    newCharacter.id = 'character'

    const start = document.querySelector('.start')
    start.appendChild(newCharacter)

    document.addEventListener('keydown', dir)
}

// calls directions
function dir (event) {
    directions[event.key]();
}

// moves the character
function move (row, column) {
    const character = document.querySelector('#character')
    const nextSpot = map[characterY+row][characterX+column]
    if(nextSpot === ' ' || nextSpot === 'F') {
        characterY+=row
        characterX+=column
    }
    const newPos = document.getElementById(`[${characterY}][${characterX}]`)
    newPos.appendChild(character)
    if (newPos.className == 'finish') youWon()
}

// runs youWon() function
function youWon() {
    win.style.display = 'block'
    start.innerHTML = 'Try Again'
    start.style.display = 'block'
    document.removeEventListener('keydown', dir);
}

// builds maze when start button is clicked
const createMaze = function () {
    destination.innerHTML = ''
    start.style.display = 'none'
    win.style.display = 'none'
    characterX=0
    characterY=9

    const maze = document.querySelector('#maze-wrap')

    map.forEach ((x,column)=> {
        let array = x.split('')
        createColumn(column)
        array.forEach ((z,row) => {
            addCell(z,column,row)
        })
    })

    createCharacter()
}

start.addEventListener('click', createMaze)