let cheatMode = false;

// UI Objects
let gameBackground;          // Game Background sprite
let lowerBackground;         // Allocation/Upgrades background sprite
let clickArea;               // Main button for clicking to get Ants
let gameWon;

let workerAntsDisplay;       // Text showing worker ants amount
let militaryAntsDisplay;
let scienceAntsDisplay;
let religionAntsDisplay;
let antLimitDisplay;

let sugarGrainsDisplay;      // Text showing sugar grains amount
let militaryPointsDisplay;
let sciencePointsDisplay;
let religionPointsDisplay;

let resourcesBack1;             // Back sprite for resources
let resourcesBack2;             // Back sprite for population
let populationDisplayPrompt;    // Prompt for pouplation display
let sugarGrainsIconDisplay;     // Icons showing sugar grains amount
let workerAntsIconDisplay;      // Icons showing worker ants amount
let militaryAntsIconDisplay;    // Icons showing military ants amount
let scienceAntsIconDisplay;     // Icons showing science ants amount
let religionAntsIconDisplay;    // Icons showing religion ants amount

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
let panelDisplaySelectedUpgrade;

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
let workerUpgradesPageButton;           // Worker upgrades page button
let militaryUpgradesPageButton;         // Military upgrades page button
let scienceUpgradesPageButton;          // Science upgrades page button
let religionUpgradesPageButton;         // Religion upgrades page button

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

let xOffset = 0;
let yOffset = 0;

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
let sugarGrains = 0;            // Amount of sugar grains the player has
let sugarGatherRate = 1;        // Worker ant rate in Sugar Grains per second
let passiveAntRate = 0;
let universalCostReduction = 0; // Percent to deduct from an upgrades' sugar cost.
let generalCostReduction = 0;   // Note that general refers to worker ant
let militaryCostReduction = 0;
let scienceCostReduction = 0;
let religionCostReduction = 0;

// Variable for leaderboards
let timePlayed;

// Initializes all UI elements
function initializeUIElements() {
    gameBackground = new Sprite("BG2.png", 0, 0, GAME.WIDTH, GAME.HEIGHT * 0.5, 100);
    lowerBackground = new Sprite("BG1.png", 0, GAME.HEIGHT * 0.5, GAME.WIDTH, GAME.HEIGHT * 0.5, 90);
    clickArea = new Button("white.png", 0, 0, GAME.WIDTH, GAME.HEIGHT * 0.5, -100, gainWorkerAnts, [1]);
    clickArea.sprite.visible = false; // Make click area a invisible
    purchasedList = [];

    // Text displays for game resources
    resourcesBack1 = new Sprite("resourcesback1.png", 2, 2, 140, 260, 20);
    workerAntsIconDisplay = new Sprite("workerant.png", 5, 10, 50, 50, 0);
    workerAntsDisplay = new RenderText("0", 60, 40, "24px Gothic", "#2b3664", "left", false, 0);
    militaryAntsIconDisplay = new Sprite("militaryant.png", 5, 60, 50, 50, 0);
    militaryAntsDisplay = new RenderText("0", 60, 90, "24px Gothic", "#2e402a", "left", false, 0);
    scienceAntsIconDisplay = new Sprite("scienceant.png", 5, 110, 50, 50, 0);
    scienceAntsDisplay = new RenderText("0", 60, 140, "24px Gothic", "#6b471c", "left", false, 0);
    religionAntsIconDisplay = new Sprite("religionant.png", 5, 160, 50, 50, 0);
    religionAntsDisplay = new RenderText("0", 60, 190, "24px Gothic", "#662160", "left", false, 0);
    sugarGrainsIconDisplay = new Sprite("SugarGrain.png", 0, 205, 60, 60, 0);
    sugarGrainsDisplay = new RenderText("0", 60, 240, "24px Gothic", "white", "left", false, 0);

    resourcesBack2 = new Sprite("resourcesback2.png", GAME.WIDTH - 182, 2, 180, 80, 20);
    populationDisplayPrompt = new RenderText("Population:", GAME.WIDTH - 91, 35, "24px Gothic", "black", "center", false, 0);
    antLimitDisplay = new RenderText("0/100", GAME.WIDTH - 91, 65, "24px Gothic", "black", "center", false, 0);

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
    upgradesInfoPanelElements.push(panelDisplaySelectedUpgrade = new Sprite("selectedupgrade.png", 0, 0, 66, 66, -5));
    xOffset = -(panelDisplaySelectedUpgrade.width - 60) * 0.5;
    yOffset = -(panelDisplaySelectedUpgrade.height - 60) * 0.5;
    upgradesInfoPanelElements.push(panelDisplayName = new RenderText("Name", 130, 595, "24px Gothic", "black", "left", true, -5));
    upgradesInfoPanelElements.push(panelDisplayDescription = new RenderText("-Description", 135, 620, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayEffect = new RenderText("-Effect", 135, 645, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayRequirement = new RenderText("-Requirement", 135, 670, "20px Gothic", "black", "left", false, -5));
    upgradesInfoPanelElements.push(panelDisplayCost = new RenderText("-Cost", 470, 672, "20px Gothic", "red", "center", false, -6));
    upgradesInfoPanelElements.push(panelDisplayBuyPrompt = new RenderText("Buy For:", 470, 640, "20px Gothic", "black", "center", false, -6));
    upgradesInfoPanelElements.push(panelDisplayBuyButton = new Button("white.png", 425, 647, 90, 35, -5));

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
    workerUpgradesTabElements.push(workerUpgradesPageButton = new Button("black.png", 90, 420, 460, 280, 0, showWorkerTab));
    workerUpgradesPageButton.sprite.defaultVisibility = false;
    militaryUpgradesTabElements.push(militaryUpgradesTabBackground = new Sprite("militaryupgradebackground.png", 50, 420, 500, 280, 70));
    militaryUpgradesTabElements.push(militaryUpgradesPageButton = new Button("black.png", 90, 420, 460, 280, 0, showMilitaryTab));
    militaryUpgradesPageButton.sprite.defaultVisibility = false;
    scienceUpgradesTabElements.push(scienceUpgradesTabBackground = new Sprite("scienceupgradebackground.png", 50, 420, 500, 280, 70));
    scienceUpgradesTabElements.push(scienceUpgradesPageButton = new Button("black.png", 90, 420, 460, 280, 0, showScienceTab));
    scienceUpgradesPageButton.sprite.defaultVisibility = false;
    religionUpgradesTabElements.push(religionUpgradesTabBackground = new Sprite("religionupgradebackground.png", 50, 420, 500, 280, 70));
    religionUpgradesTabElements.push(religionUpgradesPageButton = new Button("black.png", 90, 420, 460, 280, 0, showReligionTab));
    religionUpgradesPageButton.sprite.defaultVisibility = false;

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

    if (cheatMode) {
        sugarGrains = 999999999999999;
        workerAnts.value = 999999999999999;
        militaryAnts.value = 999999999999999;
        scienceAnts.value = 999999999999999;
        religionAnts.value = 999999999999999;
        antLimit = 99999999999999999;
        workerAntsDisplay.text = simplifyNumber(workerAnts.value);
        militaryAntsDisplay.text = simplifyNumber(militaryAnts.value);
        scienceAntsDisplay.text = simplifyNumber(scienceAnts.value);
        religionAntsDisplay.text = simplifyNumber(religionAnts.value);
    }
}

// Called every game tick, 60 ticks in a second
function update() {
    showAntCap();
    gainSugarGrains();
    if (passiveAntRate > 0) {
        gainWorkerAntsPassively();
    }

    timePlayed++;
    // end game trigger stops timePlayed counter...
    // divide it by 60 at end because game updates at 60 ticks per second
}

// Last milestone of an upgrades tab has been purchased, and therefore the game is won!
function endGame(winType) {
    gameWon = new RenderText(`${winType}`, GAME.WIDTH * 0.5 - 150, GAME.HEIGHT * 0.5 - 100, "50px Comic Sans", "black", "left", false, 0);
    // gameWon.visible = false;
    // needs a lot of polishing, that ill get to when i come back from dog walk...
}

// Updates and renders the total number of ants you can have
function showAntCap() {
    totalAnts = workerAnts.value + militaryAnts.value + scienceAnts.value + religionAnts.value;
    antLimitDisplay.text = `${simplifyNumber(Math.trunc(totalAnts))} / ${simplifyNumber(antLimit)}`;
}

// Gains sugar gains based on how many worker ants there are
// Later we can add big number formatting here to simplify as like "5.5B"...
function gainSugarGrains() {
    sugarGrains += workerAnts.value * sugarGatherRate / 60;
    sugarGrainsDisplay.text = simplifyNumber(Math.trunc(sugarGrains));
}

// Gains sugar gains based on how many worker ants there are
function gainWorkerAntsPassively() {
    if (totalAnts < antLimit) {
        workerAnts.value += workerAnts.value * passiveAntRate / 60;
        workerAntsDisplay.text = simplifyNumber(Math.trunc(workerAnts.value));
    }
}

// Use this function to add to the amount of worker ants
function gainWorkerAnts(amount) {
    if (totalAnts < antLimit) {
        workerAnts.value += amount;
        workerAntsDisplay.text = simplifyNumber(workerAnts.value);
    }
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

function showWorkerTab() {
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
            if (active) {
                e.sprite.visible = e.sprite.defaultVisibility;
                e.enabled = active;
            }
            else {
                e.sprite.visible = active;
                e.enabled = active;
            }
        } else {
            if (active) {
                e.visible = e.defaultVisibility;
            }
            else {
                e.visible = active;
            }
        }
    });
}

// Adds 1 to certain ant type on respective button press
// Maybe make value scalable as game goes on or add a x10 setting x100... like cookie clicker or implement via hold button
function antsPlus(a) {
    totalAnts = Math.floor(totalAnts);
    if (totalAnts <= antLimit && workerAnts.value !== 0) {
        antsMinus('workerAnts');
        antTypes[a].value++;
        antTypes[a].display.text = simplifyNumber(Math.trunc(antTypes[a].value));
    }
}

// Subtracts 1 from certain ant type on respective button press
// Maybe make value scalable as game goes on or add a x10 setting x100... like cookie clicker
function antsMinus(a) {
    if (antTypes[a].value > 0) {
        antTypes[a].value--;
        antTypes[a].display.text = simplifyNumber(Math.trunc(antTypes[a].value));
    }
}

function importUpgradesFromJson() {
    readUpgradesFromJson("general", workerUpgradesTabElements);
    readUpgradesFromJson("military", militaryUpgradesTabElements);
    readUpgradesFromJson("science", scienceUpgradesTabElements);
    readUpgradesFromJson("religion", religionUpgradesTabElements);
}

function readUpgradesFromJson(category, elementList) {
    var filePath = category + ".json";
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", filePath, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            var data = JSON.parse(rawFile.responseText);
            for (var i = 0; i < data.Upgrades.length; i++) {
                var id = elementList.length;
                var name = data.Upgrades[i].Name;
                var cost = data.Upgrades[i].Cost;
                var description = data.Upgrades[i].Description;
                var effects = data.Upgrades[i].Effect;
                var requirements = data.Upgrades[i].UnlockRequirements;
                elementList.push(new Button("unpurchased" + category + ".png", 115 + (i % 6) * 70, 430 + ~~(i / 6) * 70, 60, 60, -10, displayUpgrade, [category, id, name, cost, description, requirements, effects]));
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
    var alreadyPurchased = false;
    purchasedList.forEach(e => {
        if (e.category == category && e.id == id) {
            alreadyPurchased = true;
        }
    });
    if (alreadyPurchased) {
        panelDisplayBuyPrompt.text = "";
        panelDisplayCost.text = "Purchased";
    }
    else {
        panelDisplayBuyPrompt.text = "Buy For:";
        panelDisplayCost.text = simplifyNumber(cost);
    }
    panelDisplayName.text = name;
    panelDisplayDescription.text = `*${description}*`;

    switch (category) {
        case "general":
            panelDisplayEffect.text = `-Passive Ant Rate +${simplifyNumber(effects[0].passiveAntPerSecond * 100)}%`;
            panelDisplayRequirement.text = `-Population Requirement: ${simplifyNumber(requirements[0].Population)}`;
            panelDisplaySelectedUpgrade.x = workerUpgradesTabElements[id].sprite.x + xOffset;
            panelDisplaySelectedUpgrade.y = workerUpgradesTabElements[id].sprite.y + yOffset;
            panelDisplayBuyButton.parameters = [workerUpgradesTabElements, id, requirements[0].Population, cost, effects[0].passiveAntPerSecond];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, percentIncrease) => {
                // note that the buttons need to be repainted!!!!!
                // Cost update based on modifiers
                console.log('original cost: ', cost);
                cost *= (1 - universalCostReduction - generalCostReduction);
                console.log('updated cost: ', cost);

                // Check requirements and cost and if purchased before
                var failedCheck = false;
                if (totalAnts < requirement || sugarGrains < cost) {
                    failedCheck = true;
                }
                purchasedList.forEach(e => {
                    if (e.category == category && e.id == id) {
                        failedCheck = true;
                    }
                });
                if (!failedCheck) {
                    // Subtract cost from sugar supply
                    sugarGrains -= cost;
                    sugarGrainsDisplay.text = simplifyNumber(sugarGrains); // can maybe remove this...

                    // Give effect to player
                    passiveAntRate = percentIncrease; // not sure whether you want += or =. also whether to do the military thing so you cant downgrade with a lower buy.

                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedgeneral.png";
                    purchasedList.push({ category: category, id: id });
                    panelDisplayCost.text = "Purchased";
                    panelDisplayBuyPrompt.text = "";
                }
            };
            break;
        case "military":
            var type;
            if (effects[0].militaryWin) {
                type = "win";
                panelDisplayEffect.text = "-Total world domination!";
            }
            else {
                type = "normal";
                panelDisplayEffect.text = `-New Population Cap of ${simplifyNumber(effects[0].populationCap)}`;
            }
            panelDisplayRequirement.text = `-Military Requirement: ${simplifyNumber(requirements[0].Military)}`;
            panelDisplaySelectedUpgrade.x = militaryUpgradesTabElements[id].sprite.x + xOffset;
            panelDisplaySelectedUpgrade.y = militaryUpgradesTabElements[id].sprite.y + yOffset;
            panelDisplayBuyButton.parameters = [militaryUpgradesTabElements, id, requirements[0].Military, cost, type, effects[0].populationCap];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, type, newPopulationCap) => {
                // Cost update based on modifiers
                cost *= (1 - universalCostReduction - militaryCostReduction);

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
                    // Subtract cost from sugar supply
                    sugarGrains -= cost;
                    sugarGrainsDisplay.text = simplifyNumber(sugarGrains);

                    // Give effect to player
                    // Currently set so that you dont need a previous badge to unlock next
                    if (effects[0].populationCap > antLimit) {
                        antLimit = newPopulationCap;
                    }

                    // if type is "win", have a game over function (maybe have a parameter so we know what type of victory we get: military, science, or religion)
                    if (type === "win") {
                        endGame("Martial Victory");
                    }

                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedmilitary.png";
                    purchasedList.push({ category: category, id: id });
                    panelDisplayCost.text = "Purchased";
                    panelDisplayBuyPrompt.text = "";
                }
            };
            break;
        case "science":
            var type;
            var value;
            if (effects[0].scienceWin) {
                type = "win";
                value = undefined;
                panelDisplayEffect.text = "-Live amongst the stars!";
            }
            // Universal reduction
            else if (effects[0].upgradecostreduction) {
                type = "universal";
                value = effects[0].upgradecostreduction;
                panelDisplayEffect.text = `-Upgrade Costs -${simplifyNumber(value * 100)}%`;
            }
            // General reduction
            else if (effects[0].generalupgradecostreduction) {
                type = "general";
                value = effects[0].generalupgradecostreduction;
                panelDisplayEffect.text = `-General Upgrade Costs -${simplifyNumber(value * 100)}%`;
            }
            // Military reduction
            else if (effects[0].militaryupgradecostreduction) {
                type = "military";
                value = effects[0].militaryupgradecostreduction
                panelDisplayEffect.text = `-Military Upgrade Costs -${simplifyNumber(value * 100)}%`;
            }
            // Science reduction
            else if (effects[0].scienceupgradecostreduction) {
                type = "science";
                value = effects[0].scienceupgradecostreduction;
                panelDisplayEffect.text = `-Science Upgrade Costs -${simplifyNumber(value * 100)}%`;
            }
            // Religion reduction
            else if (effects[0].religionupgradecostreduction) {
                type = "religion";
                value = effects[0].religionupgradecostreduction;
                panelDisplayEffect.text = `-Religion Upgrade Costs -${simplifyNumber(value * 100)}%`;
            }
            panelDisplayRequirement.text = `-Science Requirement: ${simplifyNumber(requirements[0].Science)}`;
            panelDisplaySelectedUpgrade.x = scienceUpgradesTabElements[id].sprite.x + xOffset;
            panelDisplaySelectedUpgrade.y = scienceUpgradesTabElements[id].sprite.y + yOffset;
            panelDisplayBuyButton.parameters = [scienceUpgradesTabElements, id, requirements[0].Science, cost, type, value];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, type, percentReduced) => {
                // Cost update based on modifiers
                cost *= (1 - universalCostReduction - scienceCostReduction);

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
                    // Subtract cost from sugar supply
                    sugarGrains -= cost;
                    sugarGrainsDisplay.text = simplifyNumber(sugarGrains);

                    // Give effect to player
                    // type will be universal, general, military, science, or religion
                    // percentReduced will be how much reduction is applied to the global reduction variable corresponding to the type
                    if (type === "universal") {
                        universalCostReduction += percentReduced; // or = or *= ? not sure on the math wanted
                    } else if (type === "general") {
                        generalCostReduction += percentReduced;
                    } else if (type === "military") {
                        militaryCostReduction += percentReduced;
                    } else if (type === "science") {
                        scienceCostReduction += percentReduced;
                    } else if (type === "religion") {
                        religionCostReduction += percentReduced;
                    }
                    // ^ when reducing costs of specific types, apply the universal reduction as well as its own reduction...

                    // if type is "win", have a game over function (maybe have a parameter so we know what type of victory we get: military, science, or religion)
                    if (type === "win") {
                        endGame("Scientific Victory");
                    }

                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedscience.png";
                    purchasedList.push({ category: category, id: id });
                    panelDisplayCost.text = "Purchased";
                    panelDisplayBuyPrompt.text = "";
                }
            };
            break;
        case "religion":
            var type;
            if (effects[0].religionWin) {
                type = "win";
                panelDisplayEffect.text = "-Cleanse from mortal sin!";
            }
            else {
                type = "normal";
                panelDisplayEffect.text = `-New Sugar Per Worker of ${simplifyNumber(effects[0].sugarPerAnt)}`;
            }
            panelDisplayRequirement.text = `-Religion Requirement: ${simplifyNumber(requirements[0].Religion)}`;
            panelDisplaySelectedUpgrade.x = religionUpgradesTabElements[id].sprite.x + xOffset;
            panelDisplaySelectedUpgrade.y = religionUpgradesTabElements[id].sprite.y + yOffset;
            panelDisplayBuyButton.parameters = [religionUpgradesTabElements, id, requirements[0].Religion, cost, type, effects[0].sugarPerAnt];
            panelDisplayBuyButton.functionCall = (elementList, id, requirement, cost, type, newAmountPerWorker) => {
                // Cost update based on modifiers
                cost *= (1 - universalCostReduction - religionCostReduction);

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
                if (!failedCheck) {
                    // Subtract cost from sugar supply
                    sugarGrains -= cost;
                    sugarGrainsDisplay.text = simplifyNumber(sugarGrains);

                    // Give effect to player
                    sugarGatherRate += newAmountPerWorker;

                    // if type is "win", have a game over function (maybe have a parameter so we know what type of victory we get: military, science, or religion)
                    if (type === "win") {
                        endGame("Holy Victory");
                    }

                    // Update icon to that of purchased one and add to purchased list
                    elementList[id].sprite.image.src = GAME.ASSETS_PATH + "purchasedreligion.png";
                    purchasedList.push({ category: category, id: id });
                    panelDisplayCost.text = "Purchased";
                    panelDisplayBuyPrompt.text = "";
                }
            };
            break;
    }
}

let scale = {
    THOUSAND: "1000",
    MILLION: "1000000",
    BILLION: "1000000000",
    TRILLION: "1000000000000",
    QUADRILLION: "1000000000000000",
    QUINTILLION: "1000000000000000000",
    SEXTILLION: "1000000000000000000000",
    SEPTILLION: "1000000000000000000000000",
    OCTILLION: "1000000000000000000000000000",
    NONILLION: "1000000000000000000000000000000",
    DECILLION: "1000000000000000000000000000000000",
};

/**
 * @description Simplifies a number to a string representation
 * @param {number} number Number to be simplified
 * @returns {string} Simplified form of number
 */
function simplifyNumber(number) {
    if (number == undefined) {
        return number;
    }
    var num = number.toString();
    var decimals = 1;
    if (num.length >= scale.DECILLION.length && num >= scale.DECILLION) {
        var x = num.substring(0, num.length - scale.DECILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Decillion";
        else
            return x + " Decillion";
    } else if (num.length >= scale.NONILLION.length && num >= scale.NONILLION) {
        var x = num.substring(0, num.length - scale.NONILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Nonillion";
        else
            return x + " Nonillion";
    } else if (num.length >= scale.OCTILLION.length && num >= scale.OCTILLION) {
        var x = num.substring(0, num.length - scale.OCTILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Octillion";
        else
            return x + " Octillion";
    } else if (num.length >= scale.SEPTILLION.length && num >= scale.SEPTILLION) {
        var x = num.substring(0, num.length - scale.SEPTILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Septillion";
        else
            return x + " Septillion";
    } else if (num.length >= scale.SEXTILLION.length && num >= scale.SEXTILLION) {
        var x = num.substring(0, num.length - scale.SEXTILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Sextillion";
        else
            return x + " Sextillion";
    } else if (num.length >= scale.QUINTILLION.length && num >= scale.QUINTILLION) {
        var x = num.substring(0, num.length - scale.QUINTILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + " Quintillion";
        else
            return x + " Quintillion";
    } else if (num.length >= scale.QUADRILLION.length && num >= scale.QUADRILLION) {
        var x = num.substring(0, num.length - scale.QUADRILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + "Q";
        else
            return x + "Q";
    } else if (num.length >= scale.TRILLION.length && num >= scale.TRILLION) {
        var x = num.substring(0, num.length - scale.TRILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + "T";
        else
            return x + "T";
    } else if (num.length >= scale.BILLION.length && num >= scale.BILLION) {
        var x = num.substring(0, num.length - scale.BILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + "B";
        else
            return x + "B";
    } else if (num.length >= scale.MILLION.length && num >= scale.MILLION) {
        var x = num.substring(0, num.length - scale.MILLION.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + "M";
        else
            return x + "M";
    } else if (num.length >= scale.THOUSAND.length && num >= scale.THOUSAND) {
        var x = num.substring(0, num.length - scale.THOUSAND.length + decimals + 1);
        if (decimals > 0)
            return [x.slice(0, x.length - decimals), ".", x.slice(x.length - decimals)].join('') + "K";
        else
            return x + "K";
    } else {
        return num;
    }
}
