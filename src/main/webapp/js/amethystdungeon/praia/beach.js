var Beach = function () {
}

var layer1;
var layer2;
var layer3;
var map;

Beach.prototype.preload = function () {
    game.load.image('tileset', './praia/tileset.png');
    game.load.tilemap('beach', './praia/beach.json', null, Phaser.Tilemap.TILED_JSON);
}

Beach.prototype.create = function () {
    map = game.add.tilemap('beach');
    map.addTilesetImage('tileset', 'tileset');
    map.setCollisionBetween(0, 999, true, 'colisao');
    map.setCollisionBetween(0, 999, true, 'agua');

    layer3 = map.createLayer('agua');
    layer4 = map.createLayer('areia');
    layer2 = map.createLayer('chao');
    layer1 = map.createLayer('colisao');

    layer1.setScale(2);
    layer2.setScale(2);
    layer3.setScale(2);
    layer4.setScale(2);

    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();
    layer4.resizeWorld();
}