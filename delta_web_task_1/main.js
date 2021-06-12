// every required elements are here 

const grid = document.getElementsByClassName('item');    // the tiles in the main grid
const gridOuter = document.getElementsByClassName('item-empty'); // the block parent of the grid element
const emptyGrid = document.getElementsByClassName('item-empty empty');  // the empty tile
const newGridElmInner = document.getElementsByClassName('new-item');  // tiles in side grid

// timer

let sec = 00;
let tens = 00;
const secondsElm = document.getElementById('seconds');   // seconds span element
const tensElm = document.getElementById('tens');  // tens span element


// buttons
const startBtn = document.getElementById('start-btn');   // button to start te game
const endBtn = document.getElementById('end-btn');    // button to stop or end the timer
const resetBtn = document.getElementById('reset-btn'); // button to reshuffle and start a newgame

const tryAgain = document.getElementById('try-again');  // try again button to start a new game

// gameover elements
const displayBox = document.getElementsByClassName('black-border');  // this box is shown after you win the game
const displayContent = document.getElementsByClassName('display-content'); // the content which is display after game ends


const  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

c = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
k = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

let d = c;
let m = shuffleArray(k);

let colors = {
    '1': 'darkorange',
    '2': 'dodgerblue',
    '3': 'goldenrod',
    '4': 'darkkhaki',
    '5': 'seagreen',
    '6': 'firebrick',
}

for (let i = 0; i < gridOuter.length; i++) {
    gridOuter[i].style.order = m[i];
}

for (let i = 0; i < grid.length; i++) {
    grid[i].style.backgroundColor = colors[d[i] + 1];
}


function shuffleEd() {
    let m = shuffleArray(k);

    for (let i = 0; i < gridOuter.length; i++) {
        gridOuter[i].style.order = m[i];
    }
    
}


// movement of tiles


let moves = 0;


function swipe(gridItem) {
    let element = document.createElement('div');

    element.setAttribute('class', 'item');
    element.setAttribute('id', gridItem.id);
    element.setAttribute('onclick', 'swipe(this);');

    let elmColor = gridItem.style.backgroundColor;
    element.style.backgroundColor = elmColor;

    emptyGrid[0].appendChild(element);
    emptyGrid[0].setAttribute('class', 'item-empty');

    gridItem.parentElement.setAttribute('class', 'item-empty empty');


    // ADDING MOVES FOR EACH SHIFT OF TILES
    moves += 1;
    let moveDiv = document.getElementsByClassName('moves');
    moveDiv[0].innerHTML = 'Moves : '+'<p>'+ moves + '</p>';
    
    gridItem.remove();


    for (let i = 0; i < gridOuter.length; i++) {
        gridOuter[i].children[0].removeAttribute('onclick');
    }
    

}

// SETTING EVENT LISTENERS TO THE NEIGHBOURING GRIDS 

function allowSwipe() {
    let emptyElm = emptyGrid[0];
    let pos = emptyElm.style.order;

    let gridSize = 5;

    for (let i=0; i < gridOuter.length; i++) {

        // 4 CORNERS OF THE GRID
        //  for the 5x5 grid

        if (pos == '0') {
            if (gridOuter[i].style.order == 1 || gridOuter[i].style.order == 5) {
                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == '4') {
            if (gridOuter[i].style.order == gridSize - 2 || gridOuter[i].style.order == (2 * gridSize) - 1) {
                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == '20') {
            if (gridOuter[i].style.order == 15 || gridOuter[i].style.order == 21) {
                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == '24') {
            if (gridOuter[i].style.order == 19 || gridOuter[i].style.order == 23) {
                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        // OTHER GRIDS

        // HORIZONTAL

        for (let verticIndex = 0; verticIndex < gridSize; verticIndex++) {

            // TOP HORIZONTAL

            if (verticIndex == 0) {
                for (let horiIndex = 1; horiIndex < gridSize - 1; horiIndex++) {
                    if (pos == (gridSize * verticIndex) + horiIndex) {

                        if ( (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex - 1)
                            || (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex + 1)
                            || (gridOuter[i].style.order == gridSize * (verticIndex + 1) + horiIndex))
                            {

                                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');

                            }
                    }
                }
            }


            // BOTTOM HORIZONTAL

            else if (verticIndex == gridSize - 1) {
                for (let horiIndex = 1; horiIndex < gridSize - 1; horiIndex++) {
                    if (pos == (gridSize * verticIndex) + horiIndex) {

                        if ( (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex - 1)
                            || (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex + 1)
                            || (gridOuter[i].style.order == gridSize * (verticIndex - 1) + horiIndex))
                            {
                                gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
                            }
                    }
                }
            }

            // OTHR GRIDS  
            else {

                // LEFT VERTICAL
                if (pos == (gridSize * verticIndex)) {
                    if ((gridOuter[i].style.order == (gridSize * verticIndex) + 1)
                    || (gridOuter[i].style.order == gridSize * (verticIndex - 1))
                    || (gridOuter[i].style.order == gridSize * (verticIndex + 1)))
                    {
                        gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
                    }
                }

                // CENTER HORIZONTAL

                for (let horiIndex = 1; horiIndex < gridSize - 1; horiIndex++) {
                    if (pos == (gridSize * verticIndex) + horiIndex) {
                        if ( (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex - 1)
                        || (gridOuter[i].style.order == (gridSize * verticIndex) + horiIndex + 1)
                        || (gridOuter[i].style.order == gridSize * (verticIndex - 1) + horiIndex)
                        || (gridOuter[i].style.order == gridSize * (verticIndex + 1) + horiIndex) )
                        {
                            gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
                        }
                    }
                }

                // RIGHT VERTICAL 
                if (pos == (gridSize * verticIndex) + (gridSize - 1)) {
                    if ((gridOuter[i].style.order == (gridSize * verticIndex) + gridSize - 2)
                    || (gridOuter[i].style.order == gridSize * (verticIndex - 1) + gridSize - 1)
                    || (gridOuter[i].style.order == gridSize * (verticIndex + 1) + gridSize - 1))
                    {
                        gridOuter[i].children[0].setAttribute('onclick', 'swipe(this);');
                    }
                }
            }
        }
        
    }
}

// ALLOWSWIPE SHOULD COME AFTER SWIPING AND EVERY TIME SWIPE IS RUN ALL EVENT LISTENER SHOULD 
// BECOME NULL AND ONLY AFTER CHECKING(ALLOWSWIPE()) CERTAIN GRIDS WHICH COMES UNDER THE GIVEN CONDITIONS
// WILL GET THEIR EVENT LISTENERS



allowSwipe();
setInterval(allowSwipe, 200);



// timer functions

function startIt() {
    tens++

    if (tens < 9) {
        tensElm.innerHTML = "0" + tens;
    }

    if (tens > 9) {
        tensElm.innerHTML = tens;
    }

    if (tens > 99) {
        sec++
        secondsElm.innerHTML = "0" + sec;
        tens = 0
        tensElm.innerHTML = "0" + 0;
    }

    if (sec > 9) {
        secondsElm.innerHTML = sec;
    }

}


function start() {
    interval = setInterval(startIt, 10);
}


function end() {
    clearInterval(interval);
}


function restart() {
    clearInterval(interval);
    sec = '00';
    tens = '00';
    secondsElm.innerHTML = sec;
    tensElm.innerHTML = tens;
    moves = 0;
}

function randomGrid() {
    let keys = [1, 2, 3, 4, 5, 6]
    shuffledKeys = shuffleArray(keys);
    
    let innerElmOrder = 0;
    var keyOrder = 0;

    for (let i = 0; i < 9; i++) {
        newGridElmInner[innerElmOrder].style.backgroundColor = colors[shuffledKeys[keyOrder]];

        innerElmOrder += 1;
        keyOrder += 1;

        if (keyOrder >= 5) {
            keyOrder = 0;
        }
    }

}

// now the grid is create and it will be shuffled now
randomGrid();


// checking if the colors match and game over

var gameOver = false; // a flag which is set to false

function check() {

    let validCollection = [6, 7, 8, 11, 12, 13, 16, 17, 18];

    let connections = 0;

    for (let i = 0; i < 25; i++) {
        let gridOrder = parseInt(gridOuter[i].style.order);
        if (validCollection.includes(gridOrder)) {

            // console.log(gridOrder);
            let index = validCollection.indexOf(gridOrder);

            if(gridOuter[i].children[0] != undefined) {
                let x = gridOuter[i].children[0].style.backgroundColor;

                if (x === newGridElmInner[index].style.backgroundColor) {
                    connections++;
                }
            }
        }
    }

    if (connections === 9) {
        gameOver = true; // here the flag is turns true      
    }

    if (gameOver === true) {
        displayContent[0].style.display = 'flex';
        displayBox[0].style.zIndex = "3";
        end();
    }
    else {
        displayContent[0].style.display = 'none';
    }
}


function removeDisplay() {
    displayBox[0].remove();
}

tryAgain.setAttribute('onclick', 'removeDisplay()');


check();
// setting check function to check continously
setInterval(check, 500);
