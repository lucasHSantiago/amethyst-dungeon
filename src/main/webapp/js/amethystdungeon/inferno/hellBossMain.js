var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p1 = new Player();
var hell = new HellBoss();
var sk = new Skeleton();
var hud = new Hud();

function preload() {
    p1.preload();
    hell.preload();
    sk.preload();
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    hell.create();
    sk.create();
    p1.create();

    cursors = game.input.keyboard.createCursorKeys();

    hud.main();

    $('#mapFrameMonsters').empty();
}

function update() {
    p1.update();
    p1.miniMap(23, 20)
    sk.update();
}

