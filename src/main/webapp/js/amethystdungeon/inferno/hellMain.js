var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p1 = new Player();
var hell = new Hell();
var sk = new Skeleton();
var c = new Devil();
var hud = new Hud();

function preload() {
    p1.preload();
    hell.preload();
    sk.preload();
    c.preload();
}

function create() {
    $('#mapFrameMonsters').empty();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    hell.create();
    sk.create();
    c.create();
    p1.create();

    cursors = game.input.keyboard.createCursorKeys();

    hud.main();

    contar = 0;
    contar2 = 0;
    gerar = true;
    gerar2 = true;
}

function update() {
    p1.update();
    p1.miniMap(34.5, 20)
    sk.update();
    c.update();
}

