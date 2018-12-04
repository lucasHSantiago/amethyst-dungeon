var Carangueijo = function () {
}

var enemy;
var enemies;
var monsters = new Monsters();

Carangueijo.prototype.preload = function () {
    game.load.spritesheet('Carangueijo', './praia/carangueijo.png', 16, 16);
    game.load.spritesheet('itens', './img/itens.png', 16, 16);
}

var quantidade = 10; //Quantiidade de monstros

Carangueijo.prototype.create = function () {
    enemies = game.add.physicsGroup();
    game.physics.enable(enemies, Phaser.Physics.ARCADE);

    for (var i = 0; i < quantidade; i++) {
        enemy = enemies.create(game.rnd.integerInRange(350, 2250), game.rnd.integerInRange(350, 2020), 'Carangueijo');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(1);
        enemy.frame = 0;
        enemy.animations.add('walking', [0, 1], true);
        enemy.animations.add('attacking', [0, 1], false);
        enemy.animations.add('death', [0, 1], false);
        enemy.health = game.rnd.integerInRange(10, 15);
        enemy.maxHealth = enemy.health;
        enemy.scale.setTo(1.5);
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano, this);

    monsters.checarFim(quantidade);
}

Carangueijo.prototype.update = function () {
    inimigosSeguirPlayer();
    checarVitalidade();
    monsters.exp(carangueijos, 8);

    game.physics.arcade.collide(enemies, layer1);
    game.physics.arcade.collide(enemies, layer2);
    game.physics.arcade.collide(enemies, layer3);

    monsters.monstersInMap(carangueijos, 20, 17.6);
}

function inimigosSeguirPlayer() {
    monsters.seguirPlayer(carangueijos, 150, quantidade, enemies);
}

function checarVitalidade() {
    monsters.vitalidade(carangueijos);
    monsters.levarDano(carangueijos, game.rnd.integerInRange(3, forca));
}

function carregarItens(carangueijo) {
    monsters.gerarItens(carangueijo, itensBeach);
}

var carangueijos = new Array();

function contadorDeDano() {
    monsters.damage(carangueijos, game.rnd.integerInRange(0, 10) - defesa);
}