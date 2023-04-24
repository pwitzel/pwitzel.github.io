import CircleGuy from "./CircleGuy.js";
import Player from "./Player.js";
import TileMap from "./TileMap.js";
import Projectile from "./Projectile.js";
import Food from "./Food.js";
import FoodSpawner from "./FoodSpawner.js";
import Spawner from "./Spawner.js";

export default class Game {
    constructor(WIDTH, HEIGHT, canv) {
        this.gameWidth = WIDTH;
        this.gameHeight = HEIGHT;
        this.groundFriction = 0.88;
        this.canv = canv;


        this.debugMode = false;
        this.enableNames = true;


        this.playerNames = ["Blaze Lightning",  "Spike Fury",  "Mystic Shadow",  "Nitro Blaze",  "Max Thunder",  "Ruby Storm",  "Ace Nova",  "Luna Vortex",  "Onyx Inferno",  "Aurora Borealis",  "Phoenix Blaze",  "Viper Venom",  "Jupiter Fury",  "Mars Fireball",  "Neptune Wave",  "Saturn Rings",  "Mercury Swift",  "Pluto Ice",  "Galaxy Blast",  "Cosmo Rocket",  "Comet Crash",  "Nebula Nova",  "Solar Flare",  "Lunar Eclipse",  "Meteor Strike",  "Starlight Shadow",  "Supernova",  "Black Hole",  "Celestial Storm",  "Dragon Blaze",  "Thunderbolt",  "Storm Surge",  "Earthquake",  "Typhoon",  "Tsunami",  "Avalanche",  "Volcano",  "Hurricane",  "Tornado",  "Sandstorm",  "Wildfire",  "Blizzard",  "Cyclone",  "Hailstorm",  "Heatwave",  "Iceberg",  "Lightning Bolt",  "Magma",  "Quicksilver",  "Rainbow",  "Sapphire",  "Emerald",  "Ruby",  "Diamond",  "Topaz",  "Amber",  "Opal",  "Pearl",  "Sapphire",  "Aquamarine",  "Garnet",  "Jade",  "Lapis Lazuli",  "Moonstone",  "Turquoise",  "Sunstone",  "Bloodstone",  "Citrine",  "Peridot",  "Rose Quartz",  "Smoky Quartz",  "Zircon",  "Beryl",  "Alexandrite",  "Andalusite",  "Kunzite",  "Morganite",  "Rhodochrosite",  "Rhodonite",  "Spinel",  "Tanzanite",  "Tourmaline",  "Frost Nova",  "Eclipse",  "Shadow Strike",  "Blaze Wave",  "Phoenix Storm",  "Dragon Fire",  "Thunder Fury",  "Magma Blast",  "Ice Storm",  "Crystal Shard",  "Rising Sun",  "Nightfall",  "Solar Eclipse",  "Galactic Pulse",  "Cosmic Ray",  "Aurora Beam",  "Plasma Blast",  "Gravity Surge",  "Dimension Shift",  "Time Warp"];
        
        this.tilemap = new TileMap();

        this.circles = []; 
        this.currentScale = 1;
        this.projectiles = [];
        this.food = [];
        this.player = new Player(this, this.canv);
        this.foodspawner = new FoodSpawner(this);
        this.spawner = new Spawner(this, this.canv);

        
    }

    zoomin() {
        let zScale = 0.1;
        let zoomFactor = 1.1;
        
        this.currentScale *= zoomFactor;

        this.player.size = this.player.size * zoomFactor;
        this.player.speed *= zoomFactor;
        this.player.accelX *= zoomFactor;
        this.player.accelY *= zoomFactor;
        this.player.x *= zoomFactor;
        this.player.y *= zoomFactor;

        let diffX = (this.gameWidth/2) - this.player.x;
        let diffY = (this.gameHeight/2) - this.player.y;
        this.player.x += diffX;
        this.player.y += diffY;

        this.food.forEach((f) => {
            f.size = f.size * zoomFactor;
            f.x *= zoomFactor;
            f.y *= zoomFactor;
            f.x += diffX; f.y += diffY;
        }); 
        this.circles.forEach((c) =>{
            c.size = c.size * zoomFactor;
            c.speed *= zoomFactor;
            c.dx *= zoomFactor;
            c.dy *= zoomFactor;
            c.x *= zoomFactor;
            c.y *= zoomFactor;
            c.x += diffX; c.y += diffY;
        });
        this.projectiles.forEach((p) => {
            p.size *= zoomFactor;
            p.dx *= zoomFactor;
            p.dy *= zoomFactor
        });

        this.tilemap.size = this.tilemap.size * zoomFactor;
        this.tilemap.x *= zoomFactor;
        this.tilemap.y *= zoomFactor;
        this.tilemap.x += diffX;
        this.tilemap.y += diffY;

        

    }

    zoomout() {
        let zScale = 0.1;
        let zoomFactor = 0.9;
        this.currentScale *= zoomFactor;


        this.player.size = this.player.size * zoomFactor;
        this.player.speed *= zoomFactor;
        this.player.accelX *= zoomFactor;
        this.player.accelY *= zoomFactor;
        this.player.x *= zoomFactor;
        this.player.y *= zoomFactor;

        let diffX = (this.gameWidth/2) - this.player.x;
        let diffY = (this.gameHeight/2) - this.player.y;
        this.player.x += diffX;
        this.player.y += diffY;

        this.food.forEach((f) => {
            f.size = f.size * zoomFactor;
            f.x *= zoomFactor;
            f.y *= zoomFactor;
            f.x += diffX; f.y += diffY;
        }); 
        this.circles.forEach((c) =>{
            c.size = c.size * zoomFactor;
            c.speed *= zoomFactor;
            c.dx *= zoomFactor;
            c.dy *= zoomFactor;
            c.x *= zoomFactor;
            c.y *= zoomFactor;
            c.x += diffX; c.y += diffY;
        });
        this.projectiles.forEach((p) => {
            p.size *= zoomFactor;
            p.dx *= zoomFactor;
            p.dy *= zoomFactor
        });

        this.tilemap.size = this.tilemap.size * zoomFactor;
        this.tilemap.x *= zoomFactor;
        this.tilemap.y *= zoomFactor;
        this.tilemap.x += diffX;
        this.tilemap.y += diffY;
    }

    

    update() {
        
        
        
        this.food.forEach((f) => {
            f.update();
        });
        this.projectiles.forEach((p) => {
            p.update();

        });
        
        this.circles.forEach((c) => {
            c.update();
          
        })

        this.player.update();

      

        this.circles = this.circles.filter((c) => c.notDeleted);
        this.projectiles = this.projectiles.filter((p) => p.notDeleted);
        this.food = this.food.filter((f) => f.notDeleted);

        this.foodspawner.update();
        this.spawner.update();
    }

    draw(ctx) {

        this.tilemap.draw(ctx);

        this.food.forEach((f) => {
            f.draw(ctx);
        });

        this.projectiles.forEach((p) => {
            p.draw(ctx);
        });


        this.circles.forEach((c) => {
            c.draw(ctx);
        })
        

        if(this.player.deleted == false) {
            this.player.draw(ctx);
        }
        
        
        
    }
}