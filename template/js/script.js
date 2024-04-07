// Big thank you to Andrew for his help with the tricky bits! Other code is referenced from class assignments and Elisabeth's (minimal) past JavaScript experience.

// Setting empty global items list so it can be filled with either dogParkItems or beachItems.

let items = [];
let gameType = 'dogPark';

let winnerImage = document.querySelector('.winner');

// Findable items for the Dog Park image
let dogParkItems = [
    "The Sun",
    "An Escaped Balloon",
    "An Angry Squirrel",
    "An Airplane",
    "A Flock of Birds",
    "An Abandoned Kite",
    "A Brown Bird",
    "A Seagull",
    "An Embarrassed Dog",
    "Two Runners",
    "A Balding Dog",
    "An Escaped Dog",
    "A Pretty Princess",
    "A Nervous Wreck",
    "A Muddy Pup",
    "A Happy Star",
    "Some Clover",
    "A Buzzy Friend",
    "A Pair of Butterflies",
    "A Fancy Toy",
    "A Football",
    "A Basketball",
    "A Donut",
    "A Broken Friend",
    "A Chewy Bone",
    "A Long Rope",
    "A Set of Three Toys",
    "A Tugging Rope"
];

// Findable items for the Beach image
let beachItems = [
    "Sunglasses on a Journey",
    "Goldfish",
    "An Abandoned Surfboard",
    "Jellyfish",
    "A Tiny Island",
    "A Grinning Predator",
    "Two Flat Friends",
    "A Sea Turtle",
    "A Sad Cone",
    "Lost Green Treasure",
    "A Pail",
    "A Shovel",
    "A Sandcastle",
    "An Epic Duel",
    "An Abandoned Picnic",
    "A Yellow Polka-dot Bikini",
    "Two Feathers",
    "Seashells",
    "A Beach Ball"
];

// To change image using buttons on the header (overlays set in html, background images in css)

function changeType(newType) {
    gameType = newType;
    let resetButton = document.querySelector('.play');
    
    if (resetButton.innerHTML == 'Reset') {
        let theReturn = createList();

        if (theReturn == false) {
            return false;
        }
    }

    let dogOverlay = document.querySelector('#dog_overlay');
    let beachOverlay = document.querySelector('#beach_overlay');
    let dogButton = document.querySelector('.dog_button');
    let beachButton = document.querySelector('.beach_button');

    dogButton.classList.add('highlight');
    beachButton.classList.remove('highlight');

    if (newType == 'dogPark') {
        beachOverlay.style.display = 'none';
        dogOverlay.style.display = 'block';

        dogButton.classList.add('highlight');
        beachButton.classList.remove('highlight');
    }
    else if (newType == 'beach') {
        beachOverlay.style.display = 'block';
        dogOverlay.style.display = 'none';

        beachButton.classList.add('highlight');
        dogButton.classList.remove('highlight');
    }
}

// Gives us our list of 10 random items. listOfItems is global so it can always be accessed.

let listOfItems = [];

function createList() {
    let resetButton = document.querySelector('.play');
    let instructions = document.querySelector("#instructions");

    // Making a list of all the items that had the borders added to them during the game.
    let foundItems = document.querySelectorAll('.found-item');

    // So we get a confirm when the "Reset" button is pressed
    if (resetButton.innerHTML == 'Reset') {
        let theConfirm = confirm('Are you sure you want to reset your list?');

        if (theConfirm == false) {
            return theConfirm;
        }
    }

    if (gameType == 'dogPark') {
        items = dogParkItems;
    }
    else if (gameType == 'beach') {
        items = beachItems;
    }

    // We don't need the button to go back to "Play" at any point, so we can just change it upon first click. 
    resetButton.innerHTML = 'Reset';
    // Deletes the instructions for while the game is being played.
    instructions.innerHTML = '';

    winnerImage.classList.add('hidden');
    // Looping through list of border items to remove the border upon reset.
    for (let x of foundItems) {
        x.classList.remove('found-item');
    }

    // Emptying out listOfItems before we fill it again.
    listOfItems = [];

    let ispy_list = document.querySelector('#ispy_list');
    ispy_list.innerHTML = '';

    // Give us 10 random items
    let i = 0;
    while (i < 10) {
        let randomNum = Math.floor(Math.random() * items.length);

        // Make sure there are no repeats by checking the list using ".includes" built in function
        if (!listOfItems.includes(items[randomNum])) {
            listOfItems.push(items[randomNum]);

            let listItem = document.createElement('li');
            listItem.innerHTML = '<span>'+items[randomNum]+'</span>';

            ispy_list.append(listItem);

            i++;
        }
    }
    // Testing to make sure the items actually are generating correctly
    //console.log(listOfItems);
}

function itemClick(foundItem) {
    let ispy_list = document.querySelector('#ispy_list');

    // Used the RegEx from https://codetogo.io/how-to-replace-spaces-with-dashes-in-javascript/ to change the foundItem parameter to its matching class in order to query select it for box border adding.
    let boxClass = foundItem.replace(/ /g, '-').toLowerCase();
    let itemBox = document.querySelector("."+boxClass);

    for (let x of ispy_list.children) {
        let theStr = '<span>'+foundItem+'</span>';
        if (x.innerHTML == theStr) {
            x.classList.add('found');
            itemBox.classList.add('found-item');
        }
    }

    let foundCount = document.querySelectorAll('.found');

    if (foundCount.length == 10) {
        winnerImage.classList.remove('hidden');
    }
}

// Runs automatically to make sure the site defaults to dogPark
changeType('dogPark');
