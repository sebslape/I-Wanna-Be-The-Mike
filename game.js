class Vector2 {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }
}

class HitBox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Block {
    constructor(type,x,y,width,height) {
        this.name = "Block";
        this.type = type;
        this.x = x;
        this.y = y;
        this.hitbox = new HitBox(0,0,width,height);
    }
}

class Portal {
    constructor(x,y,destination) {
        this.name = "Portal";
        this.type = "Portal";
        this.x = x;
        this.y = y;
        this.hitbox = new HitBox(0,0,32,32);
        this.destination = destination;
    }
}

class GravityFlip {
    constructor(x,y) {
        this.name = "GravityFlip";
        this.type = "GravityFlipUp";
        this.x = x;
        this.y = y;
        this.hitbox = new HitBox(0,0,32,32);
    }
}

class Spike {
    constructor(type,x,y) {
        this.name = "Spike";
        this.type = type;
        this.x = x;
        this.y = y;
        this.hitbox = new HitBox(6,10,20,22);
    }
}

class SavePoint {
    constructor(x,y) {
        this.name = "SavePoint";
        this.type = "SavePoint";
        this.x = x;
        this.y = y;
        this.hitbox = new HitBox(0,0,32,32);
    }
}

// States List (Everything needs a flipped version)
// Idle (Not moving in both x and y)
// Run (Moving in x but not y)
// Falling (Moving in y positively)
// Jumping (Moving in y negatively)

class Mike {
    constructor() {
        this.name = "Mike";
        this.state = "Idle";
        this.x = 0;
        this.y = 0;
        this.hitbox = new HitBox(10,7,14,25);
        this.velocity = new Vector2();
    }
}

let timeStamp = 0
let previousTimeStamp = 0;
let deltaTime = 0;

// Camera
let screen = new Vector2(0,0);
let camera = new Vector2(0,0);

let hitbox = false;

let frame = 1;

// 25 Spaces: "                         ",

emptyMap = [
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "                         ",
    "GGGGGGGGGGGGGGGGGGGGGGGGG",
]

map = [
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                                 D",
    "                                  ^^             D",
    "                     GGGGG P      GG G    GG     D",
    "                       DDD           v    vv GG  D",
    "                         DGGG                   GD",
    "                         DD                      D",
    "                         D                       D",
    "                         D                       D",
    "                         D                     GGD",
    "                         D^^    S             GDDD",
    "                         DGG   GGGGGGGGGGGGGGGDDDD",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
]

map = [
    "G                                                 ",
    "D                                                 ",
    "D                                                 ",
    "GG                                                ",
    "DD                                                ",
    "DD                                                ",
    "DD                                                ",
    "DD                                                ",
    "GGG                                               ",
    "DDD                                               ",
    "DDD                                               ",
    "GGGG                                              ",
    "DDDD                                              ",
    "DDDD  S                                           ",
    "DDDD         ^                                    ",
    "GGGGGGGGG    G   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    "DDDDDD              DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDv                DDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDv                  DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD                   DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD                   DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD^ ^^^^^^^^^^^^         P DDDDDDDDDDDDDDDDDDDDDD",
    "DDDG GGGGGGGGGGGG           DDDDDDDDDDDDDDDDDDDDDD",
    "DDDD DDDDDDDDDDDD           DDDDDDDDDDDDDDDDDDDDDD",
    "DDDD vvDDDDDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDD   vvDDDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDv     vDDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD       vDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD        vDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD         DDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD         vDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD          DDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD          DDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD          vDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD           DDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD           DDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD           vDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD^^^^^^  ^^^^DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDGGGGGG  GGGGDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDv  vDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDvv    vvDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDv        vDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDv          DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDD           DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDv           DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD^^^ ^^^^^^^^DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDGGG GGGGGGGGDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDD DDDDDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDD vvvDDDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDD    vvDDDDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDv      vvvDD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDv          DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDD           DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDD           DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDv           DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDD            DD     DDDDDDD P v   v   v   DDDDDD",
    "DDD            DD     DDDDDDD     ^   ^     DDDDDD",
    "DDD            DD     DDDDDDD DDDDDDDDDDDD  DDDDDD",
    "DDD            DD^^^^^DDDDDDD DDDDDDDDDDDD  DDDDDD",
    "DDD            DDGGGGGDDDDDD  DDDDDDDDDDDv DDDDDDD",
    "DDD            DDDDDDDDDDDDD  DDDDDDDDDDD  DDDDDDD",
    "DDD            vDDDDDDDDDDDD  DDDDDDDDDDv  vv     D",
    "DDD             DDDDDDDDDDDv   DDDDDDDDv     P    D",
    "DDD             vDDDDDDDDvv    vDvvDDDD ^    GG F D",
    "DDD              DDDDDDD        v  DDDD G   <DDGGG",
    "DDD              vDDDDDD           <Dvv D    <DDDD",
    "DDD               DDDDDv     ^G^        DG>   DDDD",
    "DDD               vDDDD      GDG    P        GDDDD",
    "DDD                DDD        vD    G ^ ^    vDDDD",
    "DDD        P                 G       ^D GG    DDDD",
    "DDD       GGGG               v     ^^GD       <DDD",
    "DDD         P        ^            ^GGDD       <DDD",
    "DDD                GGG            GDDDD       <DDD",
    "DDD                       G        DDDD       <DDD",
    "DDD                                 DDD       <DDD",
    "DDD                                 DDD       <DDD",
    "DDD                                 DDD       <DDD",
    "DDD                                 DDD^      <DDD",
    "DDD                                 DDDG      <DDD",
]

map2 = [
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D                        ",
    "D        GG G    GG     G",
    "D           DG      GG  D",
    "DGGG        DD         GD",
    "DD          DD          D",
    "D           DD          D",
    "D           DD          D",
    "D                     GGD",
    "D      S    ^^       GDDD",
    "DGG   GGGGGGGGGGGGGGGDDDD",
]

// Map Variables
let blocks = [];
let spikes = [];
let portals = [];
let savePoints = [];
let gravityFlips = [];

portals.push(new Portal(900,300,new Vector2(500,500)));

// If Mike falls out of the border, he will die if this is set to true
let deathBorder = false;

let start = new Vector2();
let spawn = new Vector2();

function LoadMap(map) {
    tileSize = 32;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let tile = map[i][j];

            // Add any special blocks to this array
            let special = ["S","E","^","v","<",">","P","F"];

            let letterToBlock = {
                ["G"]: "Grass",
                ["D"]: "Dirt"
            };

            if (!special.includes(tile) && tile != " ") {
                if (letterToBlock[tile] == null) {
                    console.error("Tile '" + tile + "' has been misread as block. Please update the special array.");
                    continue;
                }

                blocks.push(new Block(letterToBlock[tile], j * tileSize, i * tileSize, 32, 32));
                continue;
            }

            if (tile == "S") {
                start.x = j * tileSize;
                start.y = i * tileSize;

                spawn.x = start.x;
                spawn.y = start.y;
            } else if (tile == "^") {
                spikes.push(new Spike("SpikeUp", j * tileSize, i * tileSize));
            } else if (tile == "v") {
                let spike = new Spike("SpikeDown", j * tileSize, i * tileSize);
                spike.hitbox = new HitBox(6,0,20,22);
                spikes.push(spike);
            } else if (tile == "<") {
                let spike = new Spike("SpikeLeft", j * tileSize, i * tileSize);
                spike.hitbox = new HitBox(12,5,20,22);
                spikes.push(spike);
            } else if (tile == ">") {
                let spike = new Spike("SpikeRight", j * tileSize, i * tileSize);
                spike.hitbox = new HitBox(0,5,20,22);
                spikes.push(spike);
            }
            else if (tile == "P") {
                let savePoint = new SavePoint(j * tileSize, i * tileSize);
                savePoints.push(savePoint);
            }
            else if (tile == "F") {
                let gravityFlip = new GravityFlip(j * tileSize, i * tileSize);
                gravityFlips.push(gravityFlip);
            }
        }
    }
}

//-- Audio --\\

class Song {
    constructor(file,reset) {
        this.file = new Audio(file);
        this.file.volume = 0.3;
        this.reset = reset;
    }

    play() {
        this.file.play();
    }

    stop() {
        this.file.pause();

        // If reset is set to true, reset the file
        if (this.reset) {
            this.file.currentTime = 0;
        }
    }
}

class Sound {
    constructor(file,reset) {
        this.file = new Audio(file);
        this.file.volume = 1;
        this.reset = reset;
    }

    play() {
        this.file.play();
    }

    stop() {
        this.file.pause();

        // If reset is set to true, reset the file
        if (this.reset) {
            this.file.currentTime = 0;
        }
    }
}

// Sound Variables
let musicPlaying = false;

let songs = {
    ["The Beginning"]: new Song('Music/Guilty Gear Isuka OST - Home Sweet Grave.mp3',false),
    ["Game Over"]: new Song('Music/Game Over.mp3',true)
}

let sounds = {
    ["Jump"]: new Song('Sounds/Jump.wav',true),
    ["Double Jump"]: new Song('Sounds/Double Jump.wav',true),
    ["Death"]: new Song('Sounds/Death.wav',true)
}

function stopSound(sound) {
    sounds[sound].stop();
}

function playSound(sound) {
    sounds[sound].play();
}

// Only one song can play at a time
function stopMusic() {
    for (song in songs) {
        songs[song].stop();
    }
    musicPlaying = false;
}

function playMusic(music) {

    if (musicPlaying) {
        stopMusic();
    }

    songs[music].play();

    musicPlaying = true;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Physics Constants
var MAX_FALL_SPEED = 9;
var GRAVITY = 0.4
var JUMP_FORCE = -8.5;
var DOUBLE_JUMP_FORCE = -7
var HORIZONTAL_SPEED = 3;

// Main Booleans
let started = true;
let dead = false;

// Players States
var onGround = false;
var onRoof = false;
var canJump = true;
var canDoubleJump = true;  
var canShoot = true;

LoadMap(map);

var mike = new Mike();

mike.x = spawn.x;
mike.y = spawn.y;

sprites = {
    "Grass": {
        src: "Sprites/Grass Block.png",
        width: 32,
        height: 32,
    },
    "Dirt": {
        src: "Sprites/Dirt Block.png",
        width: 32,
        height: 32,
    },
    "SpikeUp": {
        src: "Sprites/SpikeUp.png",
        width: 32,
        height: 32,
    },
    "SpikeDown": {
        src: "Sprites/SpikeDown.png",
        width: 32,
        height: 32,
    },
    "SpikeLeft": {
        src: "Sprites/SpikeLeft.png",
        width: 32,
        height: 32,
    },
    "SpikeRight": {
        src: "Sprites/SpikeRight.png",
        width: 32,
        height: 32,
    },
    "Portal": {
        src: "Sprites/Swirl.png",
        width: 32,
        height: 32,
    },
    "SavePoint": {
        src: "Sprites/SavePoint.png",
        width: 32,
        height: 32,
    },
    "SavePointSaved": {
        src: "Sprites/SavePointSaved.png",
        width: 32,
        height: 32,
    },
    "GravityFlipUp": {
        src: "Sprites/Swirl.png",
        width: 32,
        height: 32,
    },
    "Mike": {
        src: "Sprites/Mike.png",
        width: 32,
        height: 32,
    },
    "FMike": {
        src: "Sprites/FMike.png",
        width: 32,
        height: 32,
    },
    "MikeIdle1": {
        src: "Sprites/MikeIdle1.png",
        width: 32,
        height: 32,
    },
    "MikeIdle2": {
        src: "Sprites/MikeIdle2.png",
        width: 32,
        height: 32,
    },
    "MikeIdle3": {
        src: "Sprites/MikeIdle3.png",
        width: 32,
        height: 32,
    },
    "MikeIdle4": {
        src: "Sprites/MikeIdle4.png",
        width: 32,
        height: 32,
    },
    "MikeWalk1": {
        src: "Sprites/MikeWalk1.png",
        width: 32,
        height: 32,
    },
    "MikeWalk2": {
        src: "Sprites/MikeWalk2.png",
        width: 32,
        height: 32,
    },
    "MikeWalk3": {
        src: "Sprites/MikeWalk3.png",
        width: 32,
        height: 32,
    },
    "MikeWalk4": {
        src: "Sprites/MikeWalk4.png",
        width: 32,
        height: 32,
    },
    "MikeWalk5": {
        src: "Sprites/MikeWalk5.png",
        width: 32,
        height: 32,
    },
    "MikeWalk6": {
        src: "Sprites/MikeWalk6.png",
        width: 32,
        height: 32,
    },
    "MikeFall1": {
        src: "Sprites/MikeFall1.png",
        width: 32,
        height: 32,
    },
    "MikeFall2": {
        src: "Sprites/MikeFall2.png",
        width: 32,
        height: 32,
    },
    "MikeJump1": {
        src: "Sprites/MikeJump1.png",
        width: 32,
        height: 32,
    },
    "MikeJump2": {
        src: "Sprites/MikeJump2.png",
        width: 32,
        height: 32,
    },
    "Explosion1": {
        src: "Sprites/Explosion1.png",
        width: 32,
        height: 32,
    },
    "Explosion2": {
        src: "Sprites/Explosion2.png",
        width: 32,
        height: 32,
    },
    "Explosion3": {
        src: "Sprites/Explosion3.png",
        width: 32,
        height: 32,
    },
    "Explosion4": {
        src: "Sprites/Explosion4.png",
        width: 32,
        height: 32,
    },
    "Explosion5": {
        src: "Sprites/Explosion5.png",
        width: 32,
        height: 32,
    },
    "Explosion6": {
        src: "Sprites/Explosion6.png",
        width: 32,
        height: 32,
    },
    "Explosion7": {
        src: "Sprites/Explosion7.png",
        width: 32,
        height: 32,
    },
    "Explosion8": {
        src: "Sprites/Explosion8.png",
        width: 32,
        height: 32,
    },
    "Explosion9": {
        src: "Sprites/Explosion9.png",
        width: 32,
        height: 32,
    },
    "": {
        src: "",
        width: 0,
        height: 0
    }
}

spriteList = {};

// Load Sprites
for (sprite in sprites) {
    let img = new Image();

    img.src = sprites[sprite].src;

    spriteList[sprite] = img;
}

let followMike = false;

// Only needs name and position
function drawSprite(spriteName, position, flipped=false, verticallyFlipped=false) {

    // Get Sprite
    let sprite = spriteList[spriteName];

    let x = (position.x - camera.x);
    let y = (position.y - camera.y);

    if (followMike == true) {
        x = (position.x - mike.x + c.width/2);
        y = (position.y - mike.y + c.height/2);
    }

    let newX = x;
    let newY = y;
    let newWidth = sprite.width;
    let newHeight = sprite.height;

    if (flipped || verticallyFlipped) {
        // If the canvas will be flipped, save the original canvas
        ctx.save();
    }

    if (flipped) {
        // We first flip the canvas
        ctx.scale(-1, 1);

        // Then move the canvas over
        ctx.translate(-c.width, 0);

        // The canvas is now flipped on the x-axis so we must now flip the sprite's x position
        // We do this by subtracting the canvas width by the x position

        // Original x: 100
        // Updated x: 800 - 100 = 700
        newX = c.width - x;
        newWidth = sprite.width * -1;
    }

    if (verticallyFlipped) {
        // We first flip the canvas
        ctx.scale(1, -1);

        // Then move the canvas over
        ctx.translate(0, -c.height);

        // The canvas is now flipped on the y-axis so we must now flip the sprite's y position
        // We do this by subtracting the canvas height by the y position

        // Original y: 100
        // Updated y: 800 - 100 = 700
        newY = c.height - y - 5;
        newHeight = sprite.height * -1;
    }

    // Draw Sprite (Subtract by the camera's position)
    ctx.drawImage(sprite, newX, newY, newWidth, newHeight);

    if (flipped || verticallyFlipped) {
        // If the canvas was flipped, restore the original canvas
        ctx.restore();
    }
}

// Only need position and hitbox
function drawHitbox(position, objectHitbox) {
    let x = (position.x - camera.x);
    let y = (position.y - camera.y);

    if (followMike == true) {
        x = (position.x - mike.x + c.width/2);
        y = (position.y - mike.y + c.height/2);
    }

    if (hitbox) {
        ctx.fillStyle = "red";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(x + objectHitbox.x, y + objectHitbox.y, objectHitbox.width, objectHitbox.height);
        ctx.globalAlpha = 1;
    }
}

let direction = 1;

let enters = 0;
let explosion = 1;

class Animation {
    constructor(animation,speed,loop=false) {
        this.animation = animation;
        this.speed = speed; // In miliseconds
        this.loop = loop;
        this.time = 0;
        this.previousTime = timeStamp;
    }

    getCurrentSprite() {

        // Add the time elapsed from the last time this function was called
        let timePassed = timeStamp - this.previousTime;
        this.time += timePassed;
        this.previousTime = timeStamp;
        
        // If the time between the last time this function was called is
        // the deltatime times 2, restart the animation.
        if (timePassed > deltaTime * 2) {
            this.start();
        }

        // If the time is 500 and the speed is 200, the index should be 2
        let index = Math.floor(this.time/this.speed);

        if (this.loop) {
            let currentIndex = index % this.animation.length;
            return this.animation[currentIndex];
        } else {
            let currentIndex = Math.min(index,this.animation.length-1);
            return this.animation[currentIndex];
        }
    }

    // Use this when you have switched to this animation (We don't want the animation to start half way through)
    start() {
        this.time = 0;
    }
}

explosionAnim = new Animation(["Explosion1","Explosion2","Explosion3","Explosion4","Explosion5","Explosion6","Explosion7","Explosion8","Explosion9",""],60,false);
mikeWalk = new Animation(["MikeWalk1","MikeWalk2","MikeWalk3","MikeWalk4","MikeWalk5","MikeWalk6"],60,true);
mikeIdle = new Animation(["MikeIdle1","MikeIdle2","MikeIdle3","MikeIdle4"],60,true);
mikeFall = new Animation(["MikeFall1","MikeFall2"],60,true);
mikeJump = new Animation(["MikeJump1","MikeJump2"],60,true);

function draw() {

    // Draw Background
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, c.width, c.height);

    if (!started) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, c.height/2 - c.height/8, enters, c.height/4);
        return;
    }

    // Draw Foreground
    for (block of blocks) {
        drawSprite(block.type, new Vector2(block.x, block.y));
    }
    
    for (spike of spikes) {
        drawSprite(spike.type, new Vector2(spike.x, spike.y));
        drawHitbox(new Vector2(spike.x, spike.y), spike.hitbox);
    }

    for (portal of portals) {
        drawSprite(portal.type, new Vector2(portal.x, portal.y));
        drawHitbox(new Vector2(portal.x,portal.y),portal.hitbox);
    }

    for (savePoint of savePoints) {
        drawSprite(savePoint.type, new Vector2(savePoint.x, savePoint.y));
        drawHitbox(new Vector2(savePoint.x,savePoint.y),savePoint.hitbox);
    }

    for (gravityFlip of gravityFlips) {
        drawSprite(gravityFlip.type, new Vector2(gravityFlip.x, gravityFlip.y));
        drawHitbox(new Vector2(gravityFlip.x,gravityFlip.y),gravityFlip.hitbox);
    }

    // Draw Mike
    if (!dead) {
        if (mike.velocity.y > 0) {
            drawSprite(mikeFall.getCurrentSprite(), new Vector2(mike.x, mike.y), (direction == -1), (GRAVITY < 0));
        } else if (mike.velocity.y < 0) {
            drawSprite(mikeJump.getCurrentSprite(), new Vector2(mike.x, mike.y), (direction == -1), (GRAVITY < 0));
        }
        else {
            if (mike.velocity.x == 0) {
                drawSprite(mikeIdle.getCurrentSprite(), new Vector2(mike.x, mike.y), (direction == -1), (GRAVITY < 0));
            } else {
                drawSprite(mikeWalk.getCurrentSprite(), new Vector2(mike.x, mike.y), (direction == -1), (GRAVITY < 0));
            }
        }

        drawHitbox(new Vector2(mike.x,mike.y),mike.hitbox);
    }

    // Draw Game Over
    if (dead) {
        drawSprite(explosionAnim.getCurrentSprite(), new Vector2(mike.x-mike.hitbox.x, mike.y-mike.hitbox.y));

        let img = new Image();
        img.src = "Sprites/Game Over.png";
        ctx.drawImage(img, 0, c.height/3, c.width, c.height/3);
    }
}

//-- Input --\\

// Tracking pressed keys
var pressedKeys = {};

window.onkeyup = function(e) { 
    pressedKeys[e.keyCode] = false; 

    // If shift is let go while in the first half of a jump, lower the velocity
    if (e.keyCode == 16) {
        if (GRAVITY > 0 && mike.velocity.y < 0) {
            mike.velocity.y *= 0.45;
        } else if (GRAVITY < 0 && mike.velocity.y > 0) {
            mike.velocity.y *= 0.45;
        }
        canJump = true;
    }

    if (e.keyCode == 90) {
        canShoot = true;
    }
}

window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

// Controls
function checkPresses() {

    // Respawn (r)
    if (pressedKeys[82]) {
        if (dead) {
            playMusic("The Beginning");
        }

        stopSound("Death");

        dead = false;
        
        mike.x = spawn.x;
        mike.y = spawn.y;
        mike.velocity.x = 0;
        mike.velocity.y = 0;
        return;
    }

    if (dead) {
        return;
    }

    mike.velocity.x = 0;

    // Shift (Prevents the player from holding down the jump button)
    if (pressedKeys[16]) {
        if ((onGround && GRAVITY > 0) || (onRoof && GRAVITY < 0)) {
            if (canJump) {
                console.log(onRoof);
                console.log("Jump!");

                canDoubleJump = true;
                canJump = false;

                if (GRAVITY > 0) {
                    mike.velocity.y = JUMP_FORCE;
                } else {
                    mike.velocity.y = -JUMP_FORCE;
                }
                
                playSound("Jump");
            }
        } else {
            if (canDoubleJump && canJump) {
                console.log("Double Jump!")

                canJump = false;
                canDoubleJump = false;

                if (GRAVITY > 0) {
                    mike.velocity.y = DOUBLE_JUMP_FORCE;
                } else {
                    mike.velocity.y = -DOUBLE_JUMP_FORCE;
                }
                playSound("Double Jump");
            }
        }
    }

    // Left
    if (pressedKeys[37]) {
        mike.velocity.x -= HORIZONTAL_SPEED;
        direction = -1;
        mike.state = "Left";
    }

    // Right
    if (pressedKeys[39]) {
        mike.velocity.x += HORIZONTAL_SPEED;
        direction = 1;
        mike.state = "Right";
    }

    // Shoot (z)
    if (pressedKeys[90]) {
        if (canShoot) {
            canShoot = false;
            console.log("Bang!");
        }
    }

    // Suicide (q)
    if (pressedKeys[81]) {
        killMike();
    }

    //-- Extras --\\

    // Hitbox on (h)
    if (pressedKeys[72]) {
        hitbox = true;
    }

    // Hitbox off (j)
    if (pressedKeys[74]) {
        hitbox = false;
    }

    // Start (Enter)
    if (pressedKeys[13]) {
        enters++;
        if (enters >= 800) {
            started = true;
            title.innerHTML = "I Wanna Be The Mike!";
            playMusic("The Beginning");
        }
    }
}

// ObjectA, ObjectB
// Needs: x, y, and a hitbox.
function rectangleCollision(objectA,objectB) {
    let objectALeft = objectA.x + objectA.hitbox.x;
    let objectARight = objectALeft + objectA.hitbox.width;
    let objectATop = objectA.y + objectA.hitbox.y;
    let objectABottom = objectATop + objectA.hitbox.height;

    let objectBLeft = objectB.x + objectB.hitbox.x;
    let objectBRight = objectBLeft + objectB.hitbox.width;
    let objectBTop = objectB.y + objectB.hitbox.y;
    let objectBBottom = objectBTop + objectB.hitbox.height;

    let sameX = false;
    let sameY = false;

    if (objectARight > objectBLeft && objectALeft < objectBRight) {
        sameX = true;
    }
    if (objectABottom > objectBTop && objectATop < objectBBottom) {
        sameY = true;
    }

    return sameX && sameY;
}

function killMike() {
    console.log("DEAD!");

    dead = true;
    explosion = 1;

    playMusic("Game Over");
    playSound("Death");
}

// When subtracting the position by 'sign', make sure the sign is divided by 3 or more.

// If the gravity is 0.4 and the player is 0 above the block which is at y = 0, the following will occur
// --Frame 1--
// player.y += gravity (player.y = 0.4) [COLLISION]
// player.y -= sign due to collision (player.y is now equal to -0.6)
// --Frame 2--
// player.y += gravity (player.y = -0.2) >>>>>>> [NO COLLISION] <<<<<<<
function moveCharacterRight(mike, pixels) {
    mike.x += pixels;

    let sign = Math.sign(pixels);

    for (block of blocks) {

        // If there is no collision, there is no need to adjust the x
        if (!rectangleCollision(mike,block)) {
            continue;
        }

        mike.velocity.x = 0;

        while (pixels) {
            mike.x -= sign/100;
            pixels -= sign/100;

            if (!rectangleCollision(mike,block)) {
                return true;
            }
        }

        return false;
    }
}

function moveCharacterUp(mike, pixels) {
    mike.y += pixels;

    let sign = Math.sign(pixels);

    for (block of blocks) {

        if (!rectangleCollision(mike,block)) {
            continue;
        }

        if ((mike.velocity.y >= 0 && GRAVITY > 0)) {
            onGround = true;
            canDoubleJump = true;
        } else if (mike.velocity.y <= 0 && GRAVITY < 0) {
            onRoof = true;
            canDoubleJump = true;
        }

        mike.velocity.y = 0;

        while (pixels) {
            mike.y -= sign/100;
            pixels -= sign/100;

            if (!rectangleCollision(mike,block)) {
                return true;
            }
        }
        
        return false;
    }
}

function adjustCamera() {
    let mode = "Screen";

    if (mode == "Screen") {
        screen.x = Math.floor((mike.x + mike.hitbox.x + mike.hitbox.width/2)/c.width);
        screen.y = Math.floor((mike.y + mike.hitbox.x + mike.hitbox.height/2)/c.height);

        camera.x = screen.x * c.width;
        camera.y = screen.y * c.height;
    } else if (mode == "FollowX") {
        camera.x = mike.x - c.width/2;
        camera.y = 0;
    }
}

function updatePhysics() {
    onGround = false;
    onRoof = false;

    mike.velocity.y += GRAVITY;

    // Limit how fast the play can fall
    if (mike.velocity.y > MAX_FALL_SPEED) {
        mike.velocity.y = MAX_FALL_SPEED;
    }

    // Limit how fast the play can fly up
    if (mike.velocity.y < -MAX_FALL_SPEED) {
        mike.velocity.y = -MAX_FALL_SPEED;
    }

    for (spike of spikes) {
        if (rectangleCollision(mike,spike)) {
            killMike();
        }
    }

    for (portal of portals) {
        if (rectangleCollision(mike,portal)) {
            mike.x = portal.destination.x;
            mike.y = portal.destination.y;
        }
    }

    for (gravityFlip of gravityFlips) {
        if (rectangleCollision(mike,gravityFlip)) {
            if (gravityFlip.type == "GravityFlipUp") {
                GRAVITY = -Math.abs(GRAVITY);
            } else {
                GRAVITY = Math.abs(GRAVITY);
            }
        }
    }

    moveCharacterRight(mike, mike.velocity.x);
    moveCharacterUp(mike, mike.velocity.y);

    let saved = false;
    for (savePoint of savePoints) {
        // Save (s)
        if (pressedKeys[83]) {
            if (rectangleCollision(mike,savePoint)) {
                spawn.x = mike.x;
                spawn.y = mike.y;
                savePoint.type = "SavePointSaved";

                // Reset all other savepoint sprites
                for (savePoint2 of savePoints) {
                    if (savePoint2 != savePoint) {
                        savePoint2.type = "SavePoint";
                    }
                }

                break;
            }
        }
    }

    // If Mike falls off and deathBorder is true, kill him
    if (mike.y > c.height && deathBorder) {
        killMike();
    }

    adjustCamera();
}

// The proper game loop
window.requestAnimationFrame(gameLoop);

function gameLoop(time) {
    // Time
    timeStamp = time;
    deltaTime = timeStamp - previousTimeStamp
    previousTimeStamp = timeStamp;

    // Draw all sprites
    draw();
    
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);

    // Check for buttons being held and update movement accordingly
    checkPresses();

    if (!started) {
        return;
    }

    // Physics
    if (!dead) {
        updatePhysics();
    }

    frame++;
}