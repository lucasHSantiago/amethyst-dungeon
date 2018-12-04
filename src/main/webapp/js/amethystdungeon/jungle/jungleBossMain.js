var game = new Phaser.Game("100", "100", Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var p1 = new Player();
var jungle = new JungleBoss();
var gh = new Ghost();
var hud = new Hud();

function preload() {
    p1.preload();
    jungle.preload();
    gh.preload();
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    jungle.create();
    p1.create();
    gh.create();

    cursors = game.input.keyboard.createCursorKeys();

    hud.main();

    $('#mapFrameMonsters').empty();
}

function update() {
    p1.update();
    p1.miniMap(11, 10.5)
    gh.update();
}