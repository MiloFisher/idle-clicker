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
let upgradesTabText;         // Upgrades tab button text
let upgradesTabElements;     // Array holding upgrade tab UI elements
let upgradesTabBackground;   // Upgrades tab background

let upgradesInfoPanelElements;          // Array holding upgrades info panel elements
let upgradesInfoPanel;                  // Upgrades info panel
let panelDisplayName;
let panelDisplayEffect;
let panelDisplayDescription;
let panelDisplayRequirement;
let panelDisplayCost;
let panelDisplayBuyPrompt;
let panelDisplayBuyButton;

let workerUpgradesTabElements;          // Array holding worker upgrades tab UI elements
let workerUpgradesTabBackground;        // Worker upgrades tab background
let militaryUpgradesTabElements;        // Array holding military upgrades tab UI elements
let militaryUpgradesTabBackground;      // Military upgrades tab background
let scienceUpgradesTabElements;         // Array holding science upgrades tab UI elements
let scienceUpgradesTabBackground;       // Science upgrades tab background
let religionUpgradesTabElements;        // Array holding religion upgrades tab UI elements
let religionUpgradesTabBackground;      // Religion upgrades tab background

let workerUpgradesTabButton;            // Worker upgrades tab button
let militaryUpgradesTabButton;          // Military upgrades tab button
let scienceUpgradesTabButton;           // Science upgrades tab button
let religionUpgradesTabButton;          // Religion upgrades tab button
let workerUpgradesTabIcon;              // Worker upgrades tab icon
let militaryUpgradesTabIcon;            // Military upgrades tab icon
let scienceUpgradesTabIcon;             // Science upgrades tab icon
let religionUpgradesTabIcon;            // Religion upgrades tab icon

let infoTabButton;           // Info tab button
let infoTabText;             // Info tab button text
let infoTabElements;         // Array holding info tab UI elements
let infoTabBackground;       // Info tab background

let allocationTabButton;     // Ant allocation tab button
let allocationTabText;       // Allocation tab button text
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

// Purchase list
let purchasedList;

// Resources and rates

let sugarGrains = 0;     // Amount of sugar grains the player has
let sugarGatherRate = 0.25; // Worker ant rate in Sugar Grains per second
let sugarCostReduction = 0; // Percent to deduct from an upgrades' sugar cost.
// let militaryPoints = 0;  // Amount of points for specialized ants...
// let sciencePoints = 0;
// let religionPoints = 0;

// Variable for leaderboards
let timePlayed;

// Initializes all UI elements
function initializeUIElements() {
    gameBackground = new Sprite("white.png", 0, 0, GAME.WIDTH, GAME.HEIGHT, 100);
    lowerBackground = new Sprite("gray.png", 0, GAME.HEIGHT * 0.5, GAME.WIDTH, GAME.HEIGHT * 0.5, 90);
    clickArea = new Button("white.png", 0, 0, GAME.WIDTH, GAME.HEIGHT * 0.5, -100, chanceGainWorkerAnts, [1]);
    clickArea.sprite.visible = false; // Make click area a invisible
    purchasedList = [];

    // Text displays for game resources
    sugarGrainsDisplay = new RenderText("Sugar Grains: 0", GAME.WIDTH - 10, 20, "20px Comic Sans", "black", "right", false, 0);
    // militaryPointsDisplay = new RenderText("Military Ants: 0", GAME.WIDTH - 10, 40, "20px Comic Sans", "black", "right", false, 0);
    // sciencePointsDisplay = new RenderText("Science Ants: 0", GAME.WIDTH - 10, 60, "20px Comic Sans", "black", "right", false, 0);
    // religionPointsDisplay = new RenderText("Religion Ants: 0", GAME.WIDTH - 10, 80, "20px Comic Sans", "black", "right", false, 0);
    workerAntsDisplay = new RenderText("Worker Ants: 0", 10, 20, "20px Comic Sans", "black", "left", false, 0);
    militaryAntsDisplay = new RenderText("Military Ants: 0", 10, 40, "20px Comic Sans", "black", "left", false, 0);
    scienceAntsDisplay = new RenderText("Science Ants: 0", 10, 60, "20px Comic Sans", "black", "left", false, 0);
    religionAntsDisplay = new RenderText("Religion Ants: 0", 10, 80, "20px Comic Sans", "black", "left", false, 0);
    antLimitDisplay = new RenderText("Ant Cap: 0/100", 10, 100, "20px Comic Sans", "black", "left", false, 0);

    /**
     * Info objects here:
     */
    infoTabButton = new Button("black.png", 390, 360, 180, 40, 0, showInfoTab);
    infoTabButton.sprite.visible = false;
    infoTabText = new RenderText("Info", 455, 390, "26px Gothic", "black", "left", false, -1);
    infoTabElements = [];
    infoTabElements.push(infoTabBackground = new Sprite("infobackground.png", 30, 360, 540, 360, 80));
    
    /**
     * Upgrades objects here:
     */
    upgradesTabButton = new Button("black.png", 210, 360, 180, 40, 0, showUpgradesTab);
    upgradesTabButton.sprite.visible = false;
    upgradesTabText = new RenderText("Upgrades", 250, 390, "26px Gothic", "black", "left", false, -1);
    upgradesTabElements = [];
    upgradesTabElements.push(upgradesTabBackground = new Sprite("upgradesbackground.png", 30, 360, 540, 360, 80));

    upgradesInfoPanelElements = [];
    upgradesInfoPanelElements.push(upgradesInfoPanel = new Sprite("upgradeinfopanel.png", 115, 570, 410, 120, 0));
    upgradesInfoPanelElements.push(panelDisplayName = new RenderText("Name", 130, 595, "24px Gothic", "black", "left", true, -5));
    upgradesInfoPanelElements.push(panelDisplayDescription = new RenderText("-Description", 135, 620, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayEffect = new RenderText("-Effect", 135, 645, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayRequirement = new RenderText("-Requirement", 135, 670, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayCost = new RenderText("-Cost", 475, 672, "20px Gothic", "red", "center", false, -6));
    upgradesInfoPanelElements.push(panelDisplayBuyPrompt = new RenderText("Buy For:", 475, 640, "20px Gothic", "black", "center", false, -6));
    upgradesInfoPanelElements.push(panelDisplayBuyButton = new Button("white.png", 440, 647, 70, 35, -5));

    workerUpgradesTabElements = [];
    militaryUpgradesTabElements = [];
    scienceUpgradesTabElements = [];
    religionUpgradesTabElements = [];

    upgradesTabElements.push(workerUpgradesTabButton = new Button("black.png", 50, 420, 40, 70, 0, showWorkerTab));
    workerUpgradesTabButton.sprite.defaultVisibility = false;
    upgradesTabElements.push(militaryUpgradesTabButton = new Button("white.png", 50, 490, 40, 70, 0, showMilitaryTab));
    militaryUpgradesTabButton.sprite.defaultVisibility = false;
    upgradesTabElements.push(scienceUpgradesTabButton = new Button("black.png", 50, 560, 40, 70, 0, showScienceTab));
    scienceUpgradesTabButton.sprite.defaultVisibility = false;
    upgradesTabElements.push(religionUpgradesTabButton = new Button("white.png", 50, 630, 40, 70, 0, showReligionTab));
    religionUpgradesTabButton.sprite.defaultVisibility = false;

    upgradesTabElements.push(workerUpgradesTabIcon = new Sprite("workerant.png", 50, 440, 40, 40, 0));
    upgradesTabElements.push(militaryUpgradesTabIcon = new Sprite("militaryant.png", 50, 510, 40, 40, 0));
    upgradesTabElements.push(scienceUpgradesTabIcon = new Sprite("scienceant.png", 50, 580, 40, 40, 0));
    upgradesTabElements.push(religionUpgradesTabIcon = new Sprite("religionant.png", 50, 645, 40, 40, 0));

    workerUpgradesTabElements.push(workerUpgradesTabBackground = new Sprite("workerupgradebackground.png", 50, 420, 500, 280, 70));
    militaryUpgradesTabElements.push(militaryUpgradesTabBackground = new Sprite("militaryupgradebackground.png", 50, 420, 500, 280, 70));
    scienceUpgradesTabElements.push(scienceUpgradesTabBackground = new Sprite("scienceupgradebackground.png", 50, 420, 500, 280, 70));
    religionUpgradesTabElements.push(religionUpgradesTabBackground = new Sprite("religionupgradebackground.png", 50, 420, 500, 280, 70));

    /**
     * Allocation objects here:
     */
    allocationTabButton = new Button("black.png", 30, 360, 180, 40, 0, showAllocationTab);
    allocationTabButton.sprite.visible = false;
    allocationTabText = new RenderText("Allocation", 65, 390, "26px Gothic", "black", "left", false, -1);

    allocationTabElements = [];
    allocationTabElements.push(allocationTabBackground = new Sprite("allocationbackground.png", 30, 360, 540, 360, 80));
    allocationTabElements.push(militaryAntPlus = new Button("uparrow.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 100, 50, 50, -50, antsPlus, ['militaryAnts']));
    allocationTabElements.push(militaryAntIcon = new Sprite("militaryant.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(militaryAntMinus = new Button("downarrow.png", GAME.WIDTH - 475, GAME.HEIGHT * 0.5 + 200, 50, 50, -50, antsMinus, ['militaryAnts']));
    allocationTabElements.push(scienceAntPlus = new Button("uparrow.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 100, 50, 50, -50, antsPlus, ['scienceAnts']));
    allocationTabElements.push(scienceAntIcon = new Sprite("scienceant.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(scienceAntMinus = new Button("downarrow.png", GAME.WIDTH - 325, GAME.HEIGHT * 0.5 + 200, 50, 50, -50, antsMinus, ['scienceAnts']));
    allocationTabElements.push(religionAntPlus = new Button("uparrow.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 100, 50, 50, -50, antsPlus, ['religionAnts']));
    allocationTabElements.push(religionAntIcon = new Sprite("religionant.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 150, 50, 50, 0));
    allocationTabElements.push(religionAntMinus = new Button("downarrow.png", GAME.WIDTH - 175, GAME.HEIGHT * 0.5 + 200, 50, 50, -50, antsMinus, ['religionAnts']));

    // Setting the display values of the different types of ants
    workerAnts.display = workerAntsDisplay;
    militaryAnts.display = militaryAntsDisplay;
    scienceAnts.display = scienceAntsDisplay;
    religionAnts.display = religionAntsDisplay;

    timePlayed = 0;
}

// Called at start of game, before update()
function start() {
    initializeUIElements();
    importUpgradesFromJson(); // Must be after UI element initialization
    showAllocationTab(); // Start out with upgrades tab open

    timePlayed++;
    // end game trigger stops timePlayed counter...
    // divide it by 60 at end because game updates at 60 ticks per second
}

// Called every game tick, 60 ticks in a second
function update() {
    
    gainSugarGrains();
    // gainMilitaryPoints()
    // gainSciencePoints()
    // gainReligionPoints()
    showAntCap();
}

// phase out this function when other function works...............
// Use this function to add to the amount of worker ants
function gainWorkerAnts(amount) {
    workerAnts.value += amount;
    // Later we can add big number formatting here to simplify as like "5.5B"
    workerAntsDisplay.text = "Worker Ants: " + workerAnts.value;
}

// This function gives ants based on a random chance
function chanceGainWorkerAnts(amount) {
    var chance = Math.random();
    if (chance < 0.25) {
        workerAnts.value += amount;
    }
    // Later we can add big number formatting here to simplify as like "5.5B"
    workerAntsDisplay.text = "Worker Ants: " + workerAnts.value;
}

// Gains sugar gains based on how many worker ants there are
// Later we can add big number formatting here to simplify as like "5.5B"
// can use regex or js methods for this ^
function gainSugarGrains() {
    sugarGrains += sugarGatherRate / 60;
    sugarGrainsDisplay.text = "Sugar Grains: " + ~~sugarGrains;
}

// function gainMilitaryPoints() {
//     //militaryPoints += workerAntRate * militaryAnts.value / 60;
//     militaryPointsDisplay.text = "Military Ants: " + ~~militaryAnts.value;
// }

// function gainSciencePoints() {
//     //sciencePoints += workerAntRate * scienceAnts.value / 60;
//     sciencePointsDisplay.text = "Science Ants: " + ~~scienceAnts.value;
// }

// function gainReligionPoints() {
//     //religionPoints += workerAntRate * religionAnts.value / 60;
//     religionPointsDisplay.text = "Religion Ants: " + ~~religionAnts.value;
// }

function showAntCap() {
    totalAnts = workerAnts.value + militaryAnts.value + scienceAnts.value + religionAnts.value;
    antLimitDisplay.text = `Ant Cap: ${totalAnts} / ${antLimit}`;
}

// Shows all allocation tab elements
function showAllocationTab() {
    // Main Tabs
    setTabActive(allocationTabElements, true);
    setTabActive(upgradesTabElements, false);
    setTabActive(infoTabElements, false);
    // Sub Tabs
    setTabActive(upgradesInfoPanelElements, false);
    setTabActive(workerUpgradesTabElements, false);
    setTabActive(militaryUpgradesTabElements, false);
    setTabActive(scienceUpgradesTabElements, false);
    setTabActive(religionUpgradesTabElements, false);
}

// Shows all upgrade tab elements
function showUpgradesTab() {
    // Main Tabs
    setTabActive(allocationTabElements, false);
    setTabActive(upgradesTabElements, true);
    setTabActive(infoTabElements, false);
    // Sub Tabs
    showWorkerTab();
}

// Shows all info tab elements
function showInfoTab() {
    // Main Tabs
    setTabActive(allocationTabElements, false);
    setTabActive(upgradesTabElements, false);
    setTabActive(infoTabElements, true);
    // Sub Tabs
    setTabActive(upgradesInfoPanelElements, false);
    setTabActive(workerUpgradesTabElements, false);
    setTabActive(militaryUpgradesTabElements, false);
    setTabActive(scienceUpgradesTabElements, false);
    setTabActive(religionUpgradesTabElements, false);
}

function showWorkerTab(){
    setTabActive(workerUpgradesTabElements, true);
    setTabActive(militaryUpgradesTabElements, false);
    setTabActive(scienceUpgradesTabElements, false);
    setTabActive(religionUpgradesTabElements, false);
    setTabActive(upgradesInfoPanelElements, false);
}

function showMilitaryTab() {
    setTabActive(workerUpgradesTabElements, false);
    setTabActive(militaryUpgradesTabElements, true);
    setTabActive(scienceUpgradesTabElements, false);
    setTabActive(religionUpgradesTabElements, false);
    setTabActive(upgradesInfoPanelElements, false);
}

function showScienceTab() {
    setTabActive(workerUpgradesTabElements, false);
    setTabActive(militaryUpgradesTabElements, false);
    setTabActive(scienceUpgradesTabElements, true);
    setTabActive(religionUpgradesTabElements, false);
    setTabActive(upgradesInfoPanelElements, false);
}

function showReligionTab() {
    setTabActive(workerUpgradesTabElements, false);
    setTabActive(militaryUpgradesTabElements, false);
    setTabActive(scienceUpgradesTabElements, false);
    setTabActive(religionUpgradesTabElements, true);
    setTabActive(upgradesInfoPanelElements, false);
}

function setTabActive(tab, active) {
    tab.forEach(e => {
        if (e instanceof Button) {
            if(active){
                e.sprite.visible = e.sprite.defaultVisibility;
                e.enabled = active;
            }
            else {
                e.sprite.visible = active;
                e.enabled = active;
            }
        } else {
            if(active){
                e.visible = e.defaultVisibility;
            }
            else {
                e.visible = active;
            }
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

function importUpgradesFromJson() {
    readUpgradesFromJson("general", workerUpgradesTabElements);
    readUpgradesFromJson("military", militaryUpgradesTabElements);
    readUpgradesFromJson("science", scienceUpgradesTabElements);
    readUpgradesFromJson("religion", religionUpgradesTabElements);
}

function readUpgradesFromJson(category, elementList){
    var filePath = category + ".json";
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", filePath, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            var data = JSON.parse(rawFile.responseText);
            for(var i = 0; i < data.Upgrades.length; i++) {
                var id = elementList.length;
                var name = data.Upgrades[i].Name;
                var cost = data.Upgrades[i].Cost;
                var description = data.Upgrades[i].Description;
                var effects = data.Upgrades[i].Effect;
                var requirements = data.Upgrades[i].UnlockRequirements;
                elementList.push(new Button("unpurchasedupgrade.png", 115 + (i % 6) * 70, 430 + ~~(i/6) * 70, 60, 60, -10, displayUpgrade, [category, id, name, cost, description, requirements, effects]));
            }
            setTabActive(elementList, false);
        }
    }
    rawFile.send(null);
}

/**
 * @param {string} category
 * @param {string} name
 * @param {number} cost
 * @param {string} description
 * @param {Array} requirements
 * @param {Array} effects
 */
function displayUpgrade(category, id, name, cost, description, requirements, effects) {
    setTabActive(upgradesInfoPanelElements, true);
    panelDisplayName.text = name;
    panelDisplayCost.text = cost;
    panelDisplayDescription.text = `*${description}*`;

    switch(category){
        case "general":
            panelDisplayEffect.text = `-Passive Ant Rate +${effects[0].passiveAntPerSecond * 100}%`;
            panelDisplayRequirement.text = `-Population Requirement: ${requirements[0].Population}`;
            panelDisplayBuyButton.parameters = [workerUpgradesTabElements, id, requirements[0].Population, cost, effects[0].passiveAntPerSecond];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, percentIncrease) => {
                // Check requirements and cost and if purchased before
                var failedCheck = false;
                if(totalAnts < requirement || sugarGrains < cost) {
                    failedCheck = true;
                }
                purchasedList.forEach(e => {
                    if(e.category == category && e.id == id){
                        failedCheck = true;
                    }
                });
                if (!failedCheck) {
                    // Give effect to player
                    
                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedupgrade.png";
                    purchasedList.push({ category: category, id: id });
                }
            };
            break;
        case "military":
            panelDisplayEffect.text = `-New Population Cap of ${effects[0].populationCap}`;
            panelDisplayRequirement.text = `-Military Requirement: ${requirements[0].Military}`;
            panelDisplayBuyButton.parameters = [militaryUpgradesTabElements, id, requirements[0].Military, cost, effects[0].populationCap];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, newPopulationCap) => {
                // Check requirements and cost and if purchased before
                var failedCheck = false;
                if (militaryAnts.value < requirement || sugarGrains < cost) {
                    failedCheck = true;
                }
                purchasedList.forEach(e => {
                    if (e.category == category && e.id == id) {
                        failedCheck = true;
                    }
                });
                if (!failedCheck) {
                    // Give effect to player
                    
                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedupgrade.png";
                    purchasedList.push({ category: category, id: id });
                }
            };
            break;
        case "science":
            panelDisplayEffect.text = `-Upgrade Costs -${effects[0].upgradecostreduction}%`;
            panelDisplayRequirement.text = `-Science Requirement: ${requirements[0].Science}`;
            panelDisplayBuyButton.parameters = [scienceUpgradesTabElements, id, requirements[0].Science, cost, effects[0].upgradecostreduction];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, percentReduced) => {
                // Check requirements and cost and if purchased before
                var failedCheck = false;
                if (scienceAnts.value < requirement || sugarGrains < cost) {
                    failedCheck = true;
                }
                purchasedList.forEach(e => {
                    if (e.category == category && e.id == id) {
                        failedCheck = true;
                    }
                });
                if (!failedCheck) {
                    // Give effect to player
                    
                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedupgrade.png";
                    purchasedList.push({ category: category, id: id });
                }
            };
            break;
        case "religion":
            panelDisplayEffect.text = `-New Sugar Per Worker of ${effects[0].sugarPerFarmer}`;
            panelDisplayRequirement.text = `-Religion Requirement: ${requirements[0].Religion}`;
            panelDisplayBuyButton.parameters = [religionUpgradesTabElements, id, requirements[0].Religion, cost, effects[0].sugarPerFarmer];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, newAmountPerWorker) => {
                // Check requirements and cost and if purchased before
                var failedCheck = false;
                if (religionAnts.value < requirement || sugarGrains < cost) {
                    failedCheck = true;
                }
                purchasedList.forEach(e => {
                    if (e.category == category && e.id == id) {
                        failedCheck = true;
                    }
                });
                if(!failedCheck) {
                    // Give effect to player
                    
                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedupgrade.png";
                    purchasedList.push({ category: category, id: id });
                }
            };
            break;
    }
}
