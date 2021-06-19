// ALL REQUIRED ELEMENTS GOES HERE

const  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// NOW WE NEED TO GENERATE BOTH SMALL AND LARGE GRID

// THIS FUNCTION TAKES SMALL AND LARGE SIZES OF OF GRID AS INPUT

const largeContainer = document.querySelector('.grid-container.grid2');
const smallContainer = document.querySelector('.grid-container.grid1');
const body = document.querySelector('body');




function renderGrids(small, large) {

    // SETTING STYLE ATTRIBUTE FOR BOTH CONTAINERS BASED ON THE INPUT

    largeContainer.style.gridTemplateRows = 'repeat('+ large + ', 1fr)';
    largeContainer.style.gridTemplateColumns = 'repeat(' + large + ', 1fr)';
    
    smallContainer.style.gridTemplateRows = 'repeat(' + small + ', 1fr)';
    smallContainer.style.gridTemplateColumns = 'repeat(' + small + ', 1fr)';

    // CREATING THE LARGE GRID 
    largeGridLength = large * large;
    smallGridLength = small * small;

    // GIVING COLORS TO THE GRIDS

    // CREATING TWO SETS OF COLORS FOR 5X5 AND 6X6

    let colors = {
        '0':'dodgerblue',
        '1':'darkorange',
        '2': 'darkgreen',
        '3':'limegreen',
        '4':'crimson',
        '5':'darkkhaki'
    }

    let colors2 = {
        '0':'dodgerblue',
        '1':'darkorange',
        '2': 'darkgreen',
        '3':'limegreen',
        '4':'crimson',
        '5':'darkkhaki',
        '6': 'teal',
    }

    // CREATING THE COLOR ARRAY

    let colorArray = [];

    for (let i = 0; i < large + 1; i++) {
        for(let j = 0; j < small + 1; j++) {
            colorArray.push(i);
        }
    }

    // ADDING COLOR TO THE GRID

    // CREATING EMPTY FIRST

    let emptyItem = document.createElement('div');
    emptyItem.setAttribute('class', 'item-empty empty');
    largeContainer.appendChild(emptyItem);
    
    // NOW CREATING ACTUAL ELEMENTS

    for (let i = 0; i < largeGridLength - 1; i++) {
        let parentItem = document.createElement('div');
        parentItem.setAttribute('class','item-empty');
        let childItem = document.createElement('div');
        childItem.setAttribute('class', 'item');


        // NOW FROM THE COLOR ARRAY WE ARE GIVING COLORS

        if(large == 5) {
            childItem.style.background = colors[colorArray[i]];
        }
        else if (large == 6) {
            childItem.style.background = colors2[colorArray[i]];
        }


        parentItem.appendChild(childItem);
        largeContainer.appendChild(parentItem);
    }

    // AFTER ADDING COLORS WE HAVE ONE EMPTY GRID AND COLORED GRID
    // WE NEED TO CREATE A INDEX ARRAY AND SHUFFLE IT 
    // AND GIVE THE ARRAY VALUES AS THE ORDER TO THE GRID ELEMENTS INCLUDING EMPTY

    let indexArray = Array.from(Array(largeGridLength).keys());
    indexArray = shuffleArray(indexArray);

    const largeGridItems = document.getElementsByClassName('item-empty');

    // SHUFFLING ORDERS

    for (let i = 0; i < largeGridLength; i++) {
        largeGridItems[i].style.order = indexArray[i];
    }

    // AFTER CREATING AD SHUFFLING THE LARGE GRID

    // WE NEED TO CREATE TH SMALL 3X3 GRID

    // FOR THE RANDOM COLOR WE USE THE COLORARRAY WE CREATED BEFORE
    // WE SHUFFLE IT AND GET THE FIRST SOME ELEMENTS FROM IT

    colorArray = shuffleArray(colorArray);


    let smallColorArray = colorArray.slice(0, smallGridLength);

    // NOW PUTTING THE COLOR TO THE SMALL GRID

    for (let i = 0; i < smallGridLength; i++) {
        let newParentItem = document.createElement('div');
        newParentItem.setAttribute('class', 'new-item-empty');
        let newChildItem = document.createElement('div');
        newChildItem.setAttribute('class', 'new-item');


        // NOW FROM THE COLOR ARRAY WE ARE GIVING COLORS

        if(small == 3) {
            newChildItem.style.background = colors[smallColorArray[i]];
        }
        else if (small == 4) {
            newChildItem.style.background = colors2[smallColorArray[i]];
        }


        newParentItem.appendChild(newChildItem);
        smallContainer.appendChild(newParentItem);
    }


}

renderGrids(3, 5);


// function shuffleGrids(elem, size) {

// }

let easyModeBtn = document.getElementById('easy');
let normalModeBtn = document.getElementById('normal');
let selectorBtn = document.querySelector('.selector-bg');


// MAKING THE INITIAL COLOR WHITE
easyModeBtn.style.color = '#fff';


// EASYMODE FUNCTION ONCLICK FUNCTION

easyModeBtn.addEventListener('click', () => {
    selectorBtn.style.transform = 'translate(0%)';
    easyModeBtn.style.color = '#fff';
    normalModeBtn.style.color = '#000';
    smallContainer.innerHTML = '';
    largeContainer.innerHTML = '';

    renderGrids(3, 5);


    // RECREATING GAMEOVER DISPLAY

    renderDisplay();


    // FOR THIS FUNCTION WHEN EVER CHANGING WE NEED TO GET
    //  THE GRID ELEMENT AND ADD SWIPE AND ENABLE SWIPE TO THAT ELEMENT HERE


    clearInterval(easyModeInterval);
    clearInterval(normalModeInterval);


    easyModeInterval = setInterval('allowSwipe(5)', 200);


    // AS WE CHANGE TO A NEW GRID WE START OF WITH 0 AND RESET EVERYTHING

    clearInterval(interval);
    sec = '00';
    tens = '00';
    secondsElm.innerHTML = sec;
    tensElm.innerHTML = tens;
    moves = 0;
    moveDiv.innerHTML = 'Moves : '+'<p>'+ moves + '</p>';
})



// NORMAL MODE ONCLICK FUNCTION
normalModeBtn.addEventListener('click', () => {
    // CHANGING STYLE OF THE NORMAL MODE BTN
    selectorBtn.style.transform = 'translate(102%)';
    normalModeBtn.style.color = '#fff';
    easyModeBtn.style.color = '#000';

    // CLEARING ELEMENTS FROM THE SITE
    smallContainer.innerHTML = '';
    largeContainer.innerHTML = '';

    // RENDERING THE GRID WITH NEW PROPOTIONS
    renderGrids(4, 6);

    // RECREATING GAMEOVER DISPLAY
    renderDisplay();

    // CLEARING EASYMODE INTERVAL
    clearInterval(easyModeInterval);
    // SETTING ALL ELEMENTS ONCLICK FUNC TO CHECK
    
    normalModeInterval = setInterval('allowSwipe(6)', 200);


    // AS WE CHANGE TO A NEW GRID WE START OF WITH 0 AND RESET EVERYTHING
    if(interval) {
        clearInterval(interval);
    }
    
    sec = '00';
    tens = '00';
    secondsElm.innerHTML = sec;
    tensElm.innerHTML = tens;
    moves = 0;
    moveDiv.innerHTML = 'Moves : '+'<p>'+ moves + '</p>';
    
})



const gridItems = document.getElementsByClassName('item-empty');


// ADDING SWIPE OPTION TO THE GRIDS

// THIS FUNCTION ENABLES THE MOVEMENT OF THE INNER ELEMENTS IN THE MAIN GRID


let moves = 0;
const moveDiv = document.querySelector('.moves');


function swipe(gridItem) {


    // CALLING EMPTY GRID INSIDE THE FUNCTION AS IT CHANGES EVERY TIMES THIS FUNCTION EXECUTES
    const emptyGrid = document.querySelector('.item-empty.empty');

    // NOW RECREATING THE GRID ELEMENT
    let element = document.createElement('div');

    element.setAttribute('class', 'item');
    element.setAttribute('id', gridItem.id);

    // SETTING THIS FUNCTION TO THE NEW ELEMENT
    element.setAttribute('onclick', 'swipe(this);');

    let elmColor = gridItem.style.backgroundColor;
    element.style.backgroundColor = elmColor;


    // MAKING THE EMPTY GRID A COLORED GRID BY CHANGING CLASSES
    emptyGrid.appendChild(element);
    emptyGrid.setAttribute('class', 'item-empty');

    // MAKING COLORED GRID A EMPTY GRID 
    gridItem.parentElement.setAttribute('class', 'item-empty empty');


    // ADDING MOVES FOR EACH SHIFT OF TILES

    moves++;
    
    moveDiv.innerHTML = 'Moves : '+'<p>'+ moves + '</p>';
    
    gridItem.remove();


    // ITS TO MAKE SURE THAT NOELEMENT HAS SWIPE EXCEPT THE ONES WE SET
    for (let i = 0; i < gridItems.length; i++) {
        if(gridItems[i].children[0] != undefined) {
            gridItems[i].children[0].removeAttribute('onclick');
        }
        
    }

    // NOW TO ADD SOME MUSIC
    

    // console.log(gridItems.length);
    


    document.querySelector('audio').remove();
    let swipeAudio = document.createElement('audio');
    swipeAudio.src = '/assets/mixkit-video-game-mystery-alert-234.wav';
    swipeAudio.setAttribute('autoplay', 'true');
    body.appendChild(swipeAudio);
  
    
    if (gridItems.length == 25) {
        check(5);
    }
    else if(gridItems.length == 36) {
        console.log('CHECK OK!')
        check(6);
    }

}



// THIS ALLOWSWIPE FUNCTION GIVES ONLY THE NEIGHBOURING GRIDS THE SWIPE FUNCTION 


function allowSwipe(size) {

    // THE EMPTY GRID'S POSITION IS IMPORTANT AND EVERYTHING IS COMPARED WITH IT
    // GETTING THE POSITION OF THE EMPTY GRID
    const emptyGrid = document.querySelector('.item-empty.empty');
    let pos = emptyGrid.style.order;

    // let gridSize = 5;

    for (let i = 0; i < gridItems.length; i++) {


        // ASSIGNING IT TO THE VARIABLE AS IT ALWAYS CHANGES
        let elemPos = gridItems[i].style.order;
        // 4 CORNERS OF THE GRID
        
        if (pos == 0) {
            if (elemPos == 1 || elemPos == size) {
                // console.log(gridItems[i].children[0], elemPos);
                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == size - 1) {
            if (elemPos == size - 2 || elemPos == (2 * size) - 1) {
                // console.log(gridItems[i].children[0], elemPos);
                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == (size - 1) * size) {
            if (elemPos == (size - 2) * size || elemPos == ((size - 1) * size) + 1) {
                // console.log(gridItems[i].children[0], elemPos);
                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        if (pos == (size * size) - 1) {
            if (elemPos == (size - 1) * size - 1 || elemPos == (size * size) - 2) {
                // console.log(gridItems[i].children[0], elemPos);
                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
            }
        }

        // OTHER GRIDS

        // FOR OTHER GRIDS WE USE TWO INDEXES TO POSITION A ELEMENT
        // HORIZONTAL

        // INDEXING VERTICALLY ONLY

        for (let verticIndex = 0; verticIndex < size; verticIndex++) {

            
            // TOP HORIZONTAL

            if (verticIndex == 0) {
                for (let horiIndex = 1; horiIndex < size - 1; horiIndex++) {
                    if (pos == (size * verticIndex) + horiIndex) {

                        if ( (elemPos == (size * verticIndex) + horiIndex - 1)
                            || (elemPos == (size * verticIndex) + horiIndex + 1)
                            || (elemPos == size * (verticIndex + 1) + horiIndex))
                            {
                                // console.log(gridItems[i].children[0], elemPos);
                                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');

                            }
                    }
                }
            }


            // BOTTOM HORIZONTAL

            else if (verticIndex == size - 1) {
                for (let horiIndex = 1; horiIndex < size - 1; horiIndex++) {
                    if (pos == (size * verticIndex) + horiIndex) {

                        if ( (elemPos == (size * verticIndex) + horiIndex - 1)
                            || (elemPos == (size * verticIndex) + horiIndex + 1)
                            || (elemPos == size * (verticIndex - 1) + horiIndex))
                            {
                                // console.log(gridItems[i].children[0], elemPos);
                                gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
                            }
                    }
                }
            }

            // OTHR GRIDS  
            else {

                // LEFT VERTICAL
                if (pos == (size * verticIndex)) {
                    if ((elemPos == (size * verticIndex) + 1)
                    || (elemPos == size * (verticIndex - 1))
                    || (elemPos == size * (verticIndex + 1)))
                    {
                        // console.log(gridItems[i].children[0], elemPos);
                        gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
                    }
                }

                // CENTER HORIZONTAL

                for (let horiIndex = 1; horiIndex < size - 1; horiIndex++) {
                    if (pos == (size * verticIndex) + horiIndex) {
                        if ( (elemPos == (size * verticIndex) + horiIndex - 1)
                        || (elemPos == (size * verticIndex) + horiIndex + 1)
                        || (elemPos == size * (verticIndex - 1) + horiIndex)
                        || (elemPos == size * (verticIndex + 1) + horiIndex) )
                        {
                            // console.log(gridItems[i].children[0], elemPos);
                            gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
                        }
                    }
                }

                // RIGHT VERTICAL 
                if (pos == (size * verticIndex) + (size - 1)) {
                    if ((elemPos == (size * verticIndex) + size - 2)
                    || (elemPos == size * (verticIndex - 1) + size - 1)
                    || (elemPos == size * (verticIndex + 1) + size - 1))
                    {
                        // console.log(gridItems[i].children[0], elemPos);
                        gridItems[i].children[0].setAttribute('onclick', 'swipe(this);');
                    }
                }
            }
        }
        
    }
}


let easyModeInterval = setInterval('allowSwipe(5)', 200); 



// NOW THE TIMER AND MOVES PART


// ELEMENTS REQUIRED FOR TIMER

let sec = 00;
let tens = 00;
const secondsElm = document.getElementById('seconds');   // SECONDS SPAN ELEMENT
const tensElm = document.getElementById('tens');  // TENS SPAN ELEMENT



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


let startBtn = document.getElementById('start-btn');
let endBtn = document.getElementById('end-btn');
let resetBtn = document.getElementById('reset-btn');



startBtn.addEventListener('click', ()=> {
    interval = setInterval(startIt, 10);
})


endBtn.addEventListener('click', ()=> {
    clearInterval(interval);
})


function reset() {
    // AGAIN SHUFFLING
    // CLEARING THE SWIPE FUNCTION

    let lengthOfGrid = gridItems.length;
    if (lengthOfGrid == 25) {
        clearInterval(easyModeInterval);
    }
    else if(lengthOfGrid == 36){
        clearInterval(normalModeInterval);
    }
    
    // NOW REMOVING ALL THE ELEMENTS FROM THE CONTAINERS
    smallContainer.innerHTML = '';
    largeContainer.innerHTML = '';
    
    console.log(lengthOfGrid);
    if(lengthOfGrid == 25) {
        renderGrids(3, 5);
        easyModeInterval = setInterval('allowSwipe(5)', 200);
    }
    else if(lengthOfGrid == 36) {
        renderGrids(4, 6);
        normalModeInterval = setInterval('allowSwipe(6)', 200);
    }
    

    // NOW STOPING THE TIME
    clearInterval(interval);
    sec = '00';
    tens = '00';
    secondsElm.innerHTML = sec;
    tensElm.innerHTML = tens;
    moves = 0;
    moveDiv.innerHTML = 'Moves : '+'<p>'+ moves + '</p>';

    // AND AS WE CLEAR ALL ELEMENTS INSIDE THE LARGE CONTAINER THE GAMEOVER DISPLAY WILL ALSO
    // BE REMOVED
    renderDisplay();
}

resetBtn.addEventListener('click', reset);



// NOW TO CHECK IF THE GAME IS OVER AND DISPLAY THE SCORECARD


// AFTER THE GAME ENDS THE NAME IN THE INPUT AND THE SCORE AT THR END ADDS TO THE SCOREBOARD

// CREATING A NEW SET OF NAME SCORE ELEMENT AT THE END OF EVERY GAME

// localStorage.clear();
const scoreCard = document.querySelector('.scorecard');


// CREATING A NUM OF PLAYERS VARIABLE A INCREMENTING IT AS WE GET MANY PLAYERS
if (localStorage.getItem('regi') == NaN){
    let reg = 0;
    localStorage.setItem('regi', JSON.stringify(reg));
    console.log('if happened', reg);
}
else {
    reg = localStorage.getItem('regi');
    reg = JSON.parse(reg);
    console.log('else happened', reg);
}



// CREATING RENDERDISPLAY FUNCTION TO SHOW GAMEOVER

function renderDisplay() {
    let blackBorder = document.createElement('div');
    blackBorder.setAttribute('class','black-border');
    blackBorder.style.zIndex = '-1';

    let gameOverDisplay = document.createElement('div');
    gameOverDisplay.setAttribute('class', 'display-content');

    let subHeader = document.createElement('h2');
    subHeader.setAttribute('class', 'heading');
    subHeader.textContent = 'Game Over!';

    let buttons = document.createElement('div');
    buttons.setAttribute('class', 'buttons');

    let tryAgainBtn = document.createElement('button');
    tryAgainBtn.setAttribute('class', 'btn btn-active');
    tryAgainBtn.setAttribute('id', 'try-again');
    tryAgainBtn.textContent = 'try again';

    // ADDING RESET TO THE TRYAGAIN BTN TO START A NEW FRESH GAME
    tryAgainBtn.addEventListener('click', reset);

    // ADDING ELEMENTS TO THEIR PARENTS
    buttons.appendChild(tryAgainBtn);

    gameOverDisplay.appendChild(subHeader);
    gameOverDisplay.appendChild(buttons);

    blackBorder.appendChild(gameOverDisplay);

    largeContainer.appendChild(blackBorder);

}



// CALLING THE FUNCTION INITIALLY 
renderDisplay();






function check(size) {

    let newGridItem = document.getElementsByClassName('new-item');

    let totalSize = Math.pow(size, 2);

    // I NEED TO CHANGE THE VALID COLLECTION TO MORE OF A AUTOMATED THING
    // I GOT IT TRY IT TOMMOROW

    let validCollection = [];
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            validCollection.push(size * i + j);
        }
    }

    console.log(Math.pow(size - 2, 2));
    // console.log(gridItems);
    let connections = 0;

    for (let i = 0; i < totalSize; i++) {

        // ASSIGNING ORDER VALUE TO A VARIABLE
        let gridOrder = parseInt(gridItems[i].style.order);

        if (validCollection.includes(gridOrder)) {

                
            let index = validCollection.indexOf(gridOrder);
    
            if(gridItems[i].children[0] != undefined) {
                let x = gridItems[i].children[0].style.backgroundColor;
                    
                if (x === newGridItem[index].style.backgroundColor) {
                    connections++;
                }
            }
        }

        
    }

    let gameOver = false;

    if (connections === Math.pow(size - 2, 2)) {
        gameOver = true;     // THE FLAG TURNS TRUE HERE
        console.log('over');     

        
    }

    if (gameOver) {
        // AS A PLAYER FINISHED THE GAME THE REG IS INCREMENTED
        reg++;

        // WE USE P + REG AS KEY
        let storageKey = 'p' + reg;

        // UPDATING THE REGI
        localStorage.setItem('regi', JSON.stringify(reg));
        
        
        const inputBar = document.querySelector('input');
        let inputName = inputBar.value;

        localStorage.setItem(storageKey, JSON.stringify([moves, inputName]));
        

        // CREATING THE SCORE DETAILS

        let scoreDetails = document.createElement('div');
        scoreDetails.setAttribute('class', 'score-details');

        let nameDetail = document.createElement('div');
        nameDetail.setAttribute('class', 'name');

        nameDetail.innerHTML = JSON.parse(localStorage.getItem(storageKey))[1];
        
        let movesDetail = document.createElement('div');
        movesDetail.setAttribute('class', 'score');

        movesDetail.innerHTML = JSON.parse(localStorage.getItem(storageKey))[0];

        scoreCard.appendChild(scoreDetails);
        scoreDetails.appendChild(nameDetail);
        scoreDetails.appendChild(movesDetail);

        // THIS GIVES THE SCORE AS THE ORDER SO HIGHER THE SCORE THE LAST IT WILL BE
        scoreDetails.style.order = movesDetail.textContent;


        // AS THE GAME ID FINISHED TH MOVES REVERT BACK TO 0 AND TIMER STOPS
        moves = 0;
        clearInterval(interval);
        
        // NOW DISPLAYING THE GAME OVER WINDOW
        const blackContent = document.querySelector('.black-border');
        const displayContent = document.querySelector('.display-content');
        blackContent.style.zIndex = '4';
        displayContent.style.display = 'flex';


        // AS THE GAME IS OVER THE WE PLAY THE GAME WON AUDIO
        document.querySelector('audio').remove();
        let gameAudio = document.createElement('audio');
        gameAudio.src = '../assets/mixkit-winning-chimes-2015.wav';
        gameAudio.setAttribute('autoplay', 'true');
        body.appendChild(gameAudio);
    
    }
    


}

// NOW WE NEED TO STORE THE NAME AND SCORE OF THAT PLAYER AND DISPLAY IT IN THE ORDER WISE


// THIS FUNCTION GENERATES THE SCOREDETAIL WITH NAME AND SCORE ATTRIBUTES

function renderScores(name, score) {
    let scoreDetails = document.createElement('div');
    scoreDetails.setAttribute('class', 'score-details');

    let nameDetail = document.createElement('div');        
    nameDetail.setAttribute('class', 'name');

    nameDetail.innerHTML = name;
        
    let movesDetail = document.createElement('div');
    movesDetail.setAttribute('class', 'score');

    
    movesDetail.innerHTML = score;

    scoreCard.appendChild(scoreDetails);    
    scoreDetails.appendChild(nameDetail);
    scoreDetails.appendChild(movesDetail);

    // TO MAKE THE LESS MOVE TO BE AT THE TOP
    scoreDetails.style.order = score;

}


// NOW RENDERING ALL THE SCORES WITH THE DETAILS WE GOT

// localStorage.clear();

for (let i = 0; i < Object.entries(localStorage).length; i++) {
    if(Object.entries(localStorage)[i][0] != 'regi') {
        let nameInfo = JSON.parse(Object.entries(localStorage)[i][1])[1];
        let scoreInfo = JSON.parse(Object.entries(localStorage)[i][1])[0];
        renderScores(nameInfo, scoreInfo);
    }
}


