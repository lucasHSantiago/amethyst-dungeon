var Hell = function () { }

var layer1;
var layer2;
var layer3;
var layer4;
var map;

Hell.prototype.preload = function () {
    game.load.image('tileset', './inferno/tileset.png');
    game.load.tilemap('inferno', './inferno/hell.json', null, Phaser.Tilemap.TILED_JSON);
}

Hell.prototype.create = function () {
    map = game.add.tilemap('inferno');
    map.addTilesetImage('tileset', 'tileset');
    map.setCollisionBetween(0, 999, true, 'lava');
    map.setCollisionBetween(0, 999, true, 'colisao');

    layer2 = map.createLayer('chao');
    layer1 = map.createLayer('lava');
    layer4 = map.createLayer('semColisao');
    layer3 = map.createLayer('colisao');

    layer1.setScale(2);
    layer2.setScale(2);
    layer3.setScale(2);
    layer4.setScale(2);

    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();
    layer4.resizeWorld();
}

