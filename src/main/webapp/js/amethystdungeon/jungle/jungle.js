var Jungle = function () {
}

var layer1;
var layer2;
var layer3;
var map;

Jungle.prototype.preload = function () {
    game.load.image('tileset', './jungle/tileset.png');
    game.load.tilemap('jungle', './jungle/jungle.json', null, Phaser.Tilemap.TILED_JSON);
}

Jungle.prototype.create = function () {
    map = game.add.tilemap('jungle');
    map.addTilesetImage('tileset', 'tileset');
    map.setCollisionBetween(0, 999, true, 'colisao');
    map.setCollisionBetween(0, 999, true, 'gramado');

    layer2 = map.createLayer('chao');
    layer1 = map.createLayer('colisao');
    layer5 = map.createLayer('gramado');
    layer4 = map.createLayer('semColisao');
    layer3 = map.createLayer('colisao');

    layer1.setScale(2);
    layer2.setScale(2);
    layer3.setScale(2);
    layer4.setScale(2);
    layer5.setScale(2);

    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();
    layer4.resizeWorld();
    layer5.resizeWorld();
}