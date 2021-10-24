// Game object
let GAME = {
    // Update speed set to 60fps
    UPDATE_SPEED: 1000 / 60,
    // Paused can stop update from being called
    PAUSED: false,
    // Ticks keeps track of game update ticks
    TICKS: 0,
    // SpriteList holds all sprites
    SPRITE_LIST: [],
    // Sprite ids
    SPRITE_IDS: 0,
    // ButtonList holds all buttons
    BUTTON_LIST: [],
    // Flag set when adding new sprites or changing their layers
    NEED_LAYER_SORT: false,
};

// Declare canvas and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Start function called before update loop
start();
updateImages();

// Update loop called
setInterval(updateEngine, GAME.UPDATE_SPEED);
function updateEngine() {
    if(!GAME.PAUSED) {
        update();
        updateImages();
        GAME.TICKS++;
    }
}

// Function to redraw each image after update() is called
function updateImages() {
    // Clear old sprites first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Sort layers
    if (GAME.NEED_LAYER_SORT) { 
        GAME.SPRITE_LIST.sort((a, b) => b.layer - a.layer);
        GAME.BUTTON_LIST.sort((a, b) => a.sprite.layer - b.sprite.layer);
        GAME.NEED_LAYER_SORT = false;
    }
    // Draw updated sprites
    GAME.SPRITE_LIST.forEach(e => {
        if(e.visible) {
            ctx.drawImage(e.image, e.x, e.y, e.width, e.height);
        }
    });
}

// Sprite object
function Sprite(src, x, y, width, height, layer) {
    this.image = new Image(this.width, this.height);
    this.image.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layer = layer;
    this.visible = true;
    this.id = GAME.SPRITE_IDS++;
    this.setLayer = (layer) => {this.layer = layer; GAME.NEED_LAYER_SORT = true;};

    GAME.SPRITE_LIST.push(this);
    GAME.NEED_LAYER_SORT = true;
}

// Delete Sprite function
function deleteSprite(sprite) {
    if(sprite == undefined) { return; }
    for(var i = 0; i < GAME.SPRITE_LIST.length; i++) {
        if(sprite.id == GAME.SPRITE_LIST[i].id) {
            GAME.SPRITE_LIST.splice(i, 1);
            break;
        }
    }
    sprite = undefined;
}

// Button Object
function Button(src, x, y, width, height, layer, functionCall = () => {}, parameters = []) {
    this.sprite = new Sprite(src, x, y, width, height, layer);
    this.enabled = true;
    this.functionCall = functionCall;
    this.parameters = parameters;

    GAME.BUTTON_LIST.push(this);
}

// Delete Button function
function deleteButton(button) {
    if (button == undefined) { return; }
    for (var i = 0; i < GAME.BUTTON_LIST.length; i++) {
        if (button.sprite.id == GAME.BUTTON_LIST[i].sprite.id) {
            GAME.BUTTON_LIST.splice(i, 1);
            break;
        }
    }
    deleteSprite(button.sprite);
    button = undefined;
}

// Event Listener on canvas
canvas.addEventListener('click', function (event) {
    var bounds = canvas.getBoundingClientRect();
    var mouse = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
    }
    for(var i = 0; i < GAME.BUTTON_LIST.length; i++) {
        if (GAME.BUTTON_LIST[i].enabled && mouse.y > GAME.BUTTON_LIST[i].sprite.y && mouse.y < GAME.BUTTON_LIST[i].sprite.y + GAME.BUTTON_LIST[i].sprite.height && mouse.x > GAME.BUTTON_LIST[i].sprite.x && mouse.x < GAME.BUTTON_LIST[i].sprite.x + GAME.BUTTON_LIST[i].sprite.width) {
            GAME.BUTTON_LIST[i].functionCall(...GAME.BUTTON_LIST[i].parameters);
            break;
        }
    } 
}, false);