
var button, button1, sprite, text, text1, spriteSheet, animation;

function start() {
    console.log("start");
    button = new Button("rhino.jpeg", 30, 30, 60, 45, 0, startAnim);
    button1 = new Button("rhino.jpeg", 30, 90, 60, 45, 1, stopAnim);
    sprite = new Sprite("rhino.jpeg", 0, 0, 720, 360, 2);
    text = new RenderText("Let's Go!", GAME.WIDTH / 2, 40, "40px Arial", "red", "center", false, -1);
    text = new RenderText("LLLLLLLLLL", GAME.WIDTH / 2 + 50, 40, "60px Arial", "black", "center", false, 1);
    spriteSheet = new SpriteSheet("testSpriteSheet.png", 2, 4);
    animation = new RenderAnimation(spriteSheet, 200, 150, 60, 60, 12, true, -2);
}

function update() {
    if(GAME.TICKS % 60 == 0) {
        console.log("One Second");
    }
}

function stopAnim() { animation.stop(); }
function startAnim() { animation.play(); }