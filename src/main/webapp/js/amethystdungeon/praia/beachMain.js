var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p = new Player();
var praia = new Beach();
var cr = new Carangueijo();
var cg = new Cogumelo();
var h = new Hud();

function preload() {
    p.preload();
    praia.preload();
    cr.preload();
    cg.preload();
}

function create() {
    $('#mapFrameMonsters').empty();
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    praia.create();

    p.create();
    cr.create();
    cg.create();

    h.main();

    contar = 0;
    contar2 = 0;
    gerar = true;
    gerar2 = true;
}

function update() {
    p.update();
    p.miniMap(20, 17.6);
    cr.update();
    cg.update();
}