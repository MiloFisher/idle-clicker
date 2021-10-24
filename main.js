
var button, button1, sprite;

function start() {
    console.log("start");
    button = new Button("rhino.jpeg", 30, 30, 60, 45, 0, hello, [1, 2, 3, 4, 5]);
    button1 = new Button("rhino.jpeg", 30, 60, 60, 45, 1, hello1);
    sprite = new Sprite("rhino.jpeg", 0, 0, 720, 360, 2);
}

function update() {
    if(GAME.TICKS % 60 == 0) {
        console.log("One Second");
    }
    if(GAME.TICKS % 120 == 0 && GAME.TICKS != 0) {
       button1.sprite.setLayer(button1.sprite.layer * -1);
    }
}

function hello(one, two, three, four, five) { console.log("Hello, " + one + " " + two + " " + five); }
function hello1() { console.log("Hello 1"); }