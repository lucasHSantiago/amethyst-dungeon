var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p1 = new Player();
var jungle = new Jungle();
var gh = new Ghost();
var pl = new Plant();
var hud = new Hud();

function preload() {
    p1.preload();
    jungle.preload();
    gh.preload();
    pl.preload();
}

function create() {
    $('#mapFrameMonsters').empty();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    jungle.create();
    p1.create();
    gh.create();
    pl.create();

    cursors = game.input.keyboard.createCursorKeys();

    hud.main();

    contar = 0;
    contar2 = 0;
    gerar = true;
    gerar2 = true;
}

function update() {
    p1.update();
    p1.miniMap(15, 12)
    gh.update();
    pl.update();
}