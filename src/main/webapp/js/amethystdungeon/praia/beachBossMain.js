var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p = new Player();
var praia = new BeachBoss();
var cg = new Cogumelo();
var h = new Hud();

function preload() {
    p.preload();
    praia.preload();
    cg.preload();
}

function create() {
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    praia.create();

    p.create();
    cg.create();

    h.main();

    $('#mapFrameMonsters').empty();
}

function update() {
    p.update();
    p.miniMap(12, 10);
    cg.update();
}