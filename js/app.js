'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'
const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'
var gBallCounter = 0

// Model:
var gBoard
var gGamerPos
var gNegsCounter = 0
var gInterval

var gEmptyCells= []

function onInitGame() {
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function buildBoard() {
    const board = []
    // DONE: Create the Matrix 10 * 12 
    // DONE: Put FLOOR everywhere and WALL at edges
    const rowCount = 10
    const colCount = 12
    for (var i = 0; i < rowCount; i++) {
        board[i] = []
        for (var j = 0; j < colCount; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if (i === 0 || i === rowCount - 1 || j === 0 || j === colCount - 1) {
                board[i][j].type = WALL
            }
        }
    }
    // DONE: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[5][5].gameElement = BALL
    board[7][2].gameElement = BALL

    console.log(board)
    return board
}

// Render the board to an HTML table
function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })
            // console.log('cellClass:', cellClass)

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i},${j})" >\n`

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    elBoard.innerHTML = strHTML
}

// Move the player to a specific location
function moveTo(i, j) {
    console.log(i, j)
    const targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    const iAbsDiff = Math.abs(i - gGamerPos.i)
    const jAbsDiff = Math.abs(j - gGamerPos.j)

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            console.log('Collecting!')
        }

        // DONE: Move the gamer
        // REMOVING FROM
        // update Model
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        // update DOM
        renderCell(gGamerPos, '')

        // ADD TO
        // update Model
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }
        // update DOM
        renderCell(gGamerPos, GAMER_IMG)

    } 

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
    
}

// Move the player by keyboard arrows
function onHandleKey(event) {
    const i = gGamerPos.i
    const j = gGamerPos.j
    console.log('event.key:', event.key)

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case 'ArrowUp':
            moveTo(i - 1, j)
            break
        case 'ArrowDown':
            moveTo(i + 1, j)
            break
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}