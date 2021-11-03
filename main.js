// UI Objects
let gameBackground;         // Game Background sprite
let clickArea;              // Main button for clicking to get Ants
let workerAntsDisplay;      // Text showing worker ants amount
let sugarGrainsDisplay;     // Text showing sugar grains amount
let lowerBackground;        // Allocation/Upgrades background sprite
let upgradesTabButton;      // Upgrades tab button
let allocationTabButton;    // Ant allocation tab button
let upgradesTabElements;    // Array holding upgrades tab UI elements
let allocationTabElements;  // Array holding allocation tab UI elements
let upgradesTabBackground;  // Upgrades tab background
let allocationTabBackground;// Allocation tab background

// Game Objects
let workerAnts;             // Amount of worker ants the player has
let sugarGrains;            // Amount of sugar grains the player has
let workerAntRate;          // Worker ant rate in Sugar Grains per second


// Called at start of game, before update()
function start() {
    initializeUIElements();
    initializeGameObjects();

    showUpgradesTab(); // Start out with upgrades tab open
}
let lastVal = 0;
// Called every game tick, 60 ticks in a second
function update() {
    gainSugarGrains();
}

// Initializes all UI elements
function initializeUIElements() {
    gameBackground = new Sprite("gray.png", 0,0, GAME.WIDTH, GAME.HEIGHT, 100);
    clickArea = new Button("white.png", 0, 0, GAME.WIDTH, GAME.HEIGHT * 0.5, -100, gainWorkerAnts, [1]);
    clickArea.sprite.visible = false; // Make click area a invisible
    workerAntsDisplay = new RenderText("Worker Ants: 0", 10, 20, "20px Comic Sans", "black", "left", false, 0);
    sugarGrainsDisplay = new RenderText("Sugar Grains: 0", GAME.WIDTH - 10, 20, "20px Comic Sans", "black", "right", false, 0);
    lowerBackground = new Sprite("black.png", 0, GAME.HEIGHT * 0.5, GAME.WIDTH, GAME.HEIGHT * 0.5, 90);
    upgradesTabButton = new Button("upgradesTabButton.png", 150, GAME.HEIGHT * 0.5 + 20, 100, 25, 0, showUpgradesTab);
    allocationTabButton = new Button("allocationTabButton.png", GAME.WIDTH - 250, GAME.HEIGHT * 0.5 + 20, 100, 25, 0, showAllocationTab);
    upgradesTabElements = [];
    allocationTabElements = [];
    upgradesTabElements.push(upgradesTabBackground = new Sprite("white.png", 50, GAME.HEIGHT * 0.5 + 50, GAME.WIDTH - 100, GAME.HEIGHT * 0.5 - 100, 80));
    allocationTabElements.push(allocationTabBackground = new Sprite("gray.png", 50, GAME.HEIGHT * 0.5 + 50, GAME.WIDTH - 100, GAME.HEIGHT * 0.5 - 100, 80));
}

// Initializes all Game Objects
function initializeGameObjects() {
    workerAnts = 0;         // Starting ants amount
    sugarGrains = 0;        // Starting sugar grains amount 
    workerAntRate = 0.5;    // Starting worker ant sugar collection rate
}

// Use this function to add to the amount of worker ants
function gainWorkerAnts(amount) {
    workerAnts += amount;
    // Later we can add big number formatting here to simplify as like "5.5B"
    workerAntsDisplay.text = "Worker Ants: " + workerAnts;
}

// Gains sugar gains based on how many worker ants there are
function gainSugarGrains() {
    sugarGrains += workerAntRate * workerAnts / 60;
    // Later we can add big number formatting here to simplify as like "5.5B"
    sugarGrainsDisplay.text = "Sugar Grains: " + ~~sugarGrains;
}

// Shows all upgrade tab elements, hiding all allocation tab elements
function showUpgradesTab() {
    upgradesTabElements.forEach(e => {
        if(e instanceof Button) {
            e.sprite.visible = true;
        }
        else {
            e.visible = true;
        }
    });
    allocationTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = false;
        }
        else {
            e.visible = false;
        }
    });
}

// Shows all allocation tab elements, hiding all upgrades tab elements
function showAllocationTab() {
    allocationTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = true;
        }
        else {
            e.visible = true;
        }
    });
    upgradesTabElements.forEach(e => {
        if (e instanceof Button) {
            e.sprite.visible = false;
        }
        else {
            e.visible = false;
        }
    });
}