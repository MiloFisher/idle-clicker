// UI Objects
let gameBackground;          // Game Background sprite
let lowerBackground;         // Allocation/Upgrades background sprite
let clickArea;               // Main button for clicking to get Ants

let workerAntsDisplay;       // Text showing worker ants amount
let militaryAntsDisplay;
let scienceAntsDisplay;
let religionAntsDisplay;
let antLimitDisplay;

let sugarGrainsDisplay;      // Text showing sugar grains amount
let militaryPointsDisplay;
let sciencePointsDisplay;
let religionPointsDisplay;

let upgradesTabButton;       // Upgrades tab button
let upgradesTabElements;     // Array holding upgrades tab UI elements
let upgradesTabBackground;   // Upgrades tab background

let allocationTabButton;     // Ant allocation tab button
let allocationTabElements;   // Array holding allocation tab UI elements
let allocationTabBackground; // Allocation tab background
let militaryAntIcon;
let scienceAntIcon;
let religionAntIcon;

let militaryAntPlus;         // Increment for militaryAnts
let militaryAntMinus;        // Decrement for militaryAnts
let scienceAntPlus;
let scienceAntMinus;
let religionAntPlus;
let religionAntMinus;

// Types of ants and their info
let antLimit = 100;
let totalAnts = 0;
let workerAnts = {
    name: 'Worker Ants',
    value: 0,
    display: 0,
};
let militaryAnts = {
    name: 'Military Ants',
    value: 0,
    display: 0,
};
let scienceAnts = {
    name: 'Science Ants',
    value: 0,
    display: 0,
};
let religionAnts = {
    name: 'Religion Ants',
    value: 0,
    display: 0,
};
let antTypes = { workerAnts, militaryAnts, scienceAnts, religionAnts };

// Resources and rates
let workerAntRate = 0.5; // Worker ant rate in Sugar Grains per second
let sugarGrains = 0;     // Amount of sugar grains the player has
let militaryPoints = 0;  // Amount of points for specialized ants...
let sciencePoints = 0;
let religionPoints = 0;

// Initializes all UI elements
function initializeUIElements() {
    gameBackground = new Sprite("gray.png", 0, 0, GAME.WIDTH, GAME.HEIGHT, 100);
    lowerBackground = new Sprite("black.png", 0, GAME.HEIGHT * 0.5, GAME.WIDTH, GAME.HEIGHT * 0.5, 90);
    clickArea = new Button("white.png", 0, 0, GAME.WIDTH, GAME.HEIGHT * 0.5, -100, gainWorkerAnts, [1]);
    clickArea.sprite.visible = false; // Make click area a invisible

    // Text displays for game resources
    sugarGrainsDisplay = new RenderText("Sugar Grains: 0", GAME.WIDTH - 10, 20, "20px Comic Sans", "black", "right", false, 0);
    militaryPointsDisplay = new RenderText("Military Points: 0", GAME.WIDTH - 10, 40, "20px Comic Sans", "black", "right", false, 0);
    sciencePointsDisplay = new RenderText("Science Points: 0", GAME.WIDTH - 10, 60, "20px Comic Sans", "black", "right", false, 0);
    religionPointsDisplay = new RenderText("Religion Points: 0", GAME.WIDTH - 10, 80, "20px Comic Sans", "black", "right", false, 0);
    workerAntsDisplay = new RenderText("Worker Ants: 0", 10, 20, "20px Comic Sans", "black", "left", false, 0);
    militaryAntsDisplay = new RenderText("Military Ants: 0", 10, 40, "20px Comic Sans", "black", "left", false, 0);
    scienceAntsDisplay = new RenderText("Science Ants: 0", 10, 60, "20px Comic Sans", "black", "left", false, 0);
    religionAntsDisplay = new RenderText("Religion Ants: 0", 10, 80, "20px Comic Sans", "black", "left", false, 0);
    antLimitDisplay = new RenderText("Ant Cap: 0/100", 10, 100, "20px Comic Sans", "black", "left", false, 0);
    
    // Push the elements for the upgrades tab into its array for showing/hiding its functionality later
    upgradesTabButton = new Button("upgradesTabButton.png", GAME.WIDTH - 250, GAME.HEIGHT * 0.5 + 20, 100, 25, 0, showUpgradesTab);
    upgradesTabElements = [];
    upgradesTabElements.push(upgradesTabBackground = new Sprite("white.png", 50, GAME.HEIGHT * 0.5 + 50, GAME.WIDTH - 100, GAME.HEIGHT * 0.5 - 100, 80));

    // Push the elements for the allocation tab into its array for showing/hiding its functionality later
    allocationTabButton = new Button("allocationTabButton.png", 150, GAME.HEIGHT * 0.5 + 20, 100, 25, 0, showAllocationTab);
    allocationTabElements = [];
    allocationTabElements.push(allocationTabBackground = new Sprite("gray.png", 50, GAME.HEIGHT * 0.5 + 50, GAME.WIDTH - 100, GAME.HEIGHT * 0.5 - 100, 80));
    allocationTabElements.push(militaryAntPlus = new Button("uparrow.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 100, 50, 50, 0, antsPlus, ['militaryAnts']));
    allocationTabElements.push(militaryAntIcon = new Sprite("militaryant.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(militaryAntMinus = new Button("downarrow.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 200, 50, 50, 0, antsMinus, ['militaryAnts']));
    allocationTabElements.push(scienceAntPlus = new Button("uparrow.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 100, 50, 50, 0, antsPlus, ['scienceAnts']));
    allocationTabElements.push(scienceAntIcon = new Sprite("scienceant.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(scienceAntMinus = new Button("downarrow.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 200, 50, 50, 0, antsMinus, ['scienceAnts']));
    allocationTabElements.push(religionAntPlus = new Button("uparrow.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 100, 50, 50, 0, antsPlus, ['religionAnts']));
    allocationTabElements.push(religionAntIcon = new Sprite("religionant.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(religionAntMinus = new Button("downarrow.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 200, 50, 50, 0, antsMinus, ['religionAnts']));

    // Setting the display values of the different types of ants
    workerAnts.display = workerAntsDisplay;
    militaryAnts.display = militaryAntsDisplay;
    scienceAnts.display = scienceAntsDisplay;
    religionAnts.display = religionAntsDisplay;
}

// Called at start of game, before update()
function start() {
    initializeUIElements();
    showAllocationTab(); // Start out with upgrades tab open
}

// Called every game tick, 60 ticks in a second
function update() {
    
    gainSugarGrains();
    gainMilitaryPoints()
    gainSciencePoints()
    gainReligionPoints()
    showAntCap();
}

// phase out this function when other function works...............
// Use this function to add to the amount of worker ants
function gainWorkerAnts(amount) {
    workerAnts.value += amount;
    // Later we can add big number formatting here to simplify as like "5.5B"
    workerAntsDisplay.text = "Worker Ants: " + workerAnts.value;
}

// Gains sugar gains based on how many worker ants there are
// Later we can add big number formatting here to simplify as like "5.5B"
// can use regex or js methods for this ^
function gainSugarGrains() {
    sugarGrains += workerAntRate * workerAnts.value / 60;
    sugarGrainsDisplay.text = "Sugar Grains: " + ~~sugarGrains;
}

function gainMilitaryPoints() {
    militaryPoints += workerAntRate * militaryAnts.value / 60;
    militaryPointsDisplay.text = "Military Points: " + ~~militaryPoints;
}

function gainSciencePoints() {
    sciencePoints += workerAntRate * scienceAnts.value / 60;
    sciencePointsDisplay.text = "Science Points: " + ~~sciencePoints;
}

function gainReligionPoints() {
    religionPoints += workerAntRate * religionAnts.value / 60;
    religionPointsDisplay.text = "Religion Points: " + ~~religionPoints;
}

function showAntCap() {
    totalAnts = workerAnts.value + militaryAnts.value + scienceAnts.value + religionAnts.value;
    antLimitDisplay.text = `Ant Cap: ${totalAnts} / ${antLimit}`;
}

// Shows all allocation tab elements, hiding all upgrades tab elements
function showAllocationTab() {
    allocationTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = true;
        } else {
            e.visible = true;
        }
    });
    upgradesTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = false;
        } else {
            e.visible = false;
        }
    });
}

// Shows all upgrade tab elements, hiding all allocation tab elements
function showUpgradesTab() {
    upgradesTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = true;
        } else {
            e.visible = true;
        }
    });
    allocationTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = false;
        } else {
            e.visible = false;
        }
    });
}

// Adds 1 to certain ant type on respective button press
// Maybe make value scalable as game goes on or add a x10 setting x100... like cookie clicker
function antsPlus(a) {
    // add in workerants distribution condition
    if (totalAnts < antLimit && workerAnts.value !== 0) {
        antTypes[a].value++;
        antTypes[a].display.text = `${antTypes[a].name}: ` + antTypes[a].value;
        antsMinus('workerAnts');
    }
}

// Subtracts 1 from certain ant type on respective button press
// Maybe make value scalable as game goes on or add a x10 setting x100... like cookie clicker
function antsMinus(a) {
    if (antTypes[a].value > 0) {
        antTypes[a].value--;
        antTypes[a].display.text = `${antTypes[a].name}: ` + antTypes[a].value;
    }
}
