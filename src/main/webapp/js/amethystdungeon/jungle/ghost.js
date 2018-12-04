var Ghost = function () {
}

var enemy;
var enemies;
var monsters = new Monsters();

Ghost.prototype.preload = function () {
    game.load.spritesheet('Fantasma', './jungle/ghost.png', 32, 64);
    game.load.spritesheet('itens', './img/itens.png', 16, 16);
}

var quantidade = 10; //Quantiidade de monstros

Ghost.prototype.create = function () {
    enemies = game.add.physicsGroup();
    game.physics.enable(enemies, Phaser.Physics.ARCADE);

    if (map.key == 'jungleBoss') {
        quantidade = 1;
    }

    for (var i = 0; i < quantidade; i++) {
        if (map.key == 'jungleBoss') {
            enemy = enemies.create(game.world.width * 0.5, game.world.height * 0.5, 'Fantasma');
        } else {
            enemy = enemies.create(game.world.randomX, game.world.randomY, 'Fantasma');
        }
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(1);
        enemy.frame = 1;
        enemy.animations.add('walking', [0, 1, 2, 3], true);
        enemy.animations.add('attacking', [0, 1], false);
        enemy.animations.add('death', [0, 1, 2, 3], false);
        if (map.key == 'jungleBoss') {
            enemy.health = 200;
            enemy.maxHealth = enemy.health;
            enemy.body.velocity.set(10, 0);
            enemy.scale.setTo(5);
        } else {
            enemy.health = game.rnd.integerInRange(30, 35);
            enemy.maxHealth = enemy.health;
            enemy.body.velocity.set(10, 0);
        }
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano, this);

    monsters.checarFim(quantidade);
}

Ghost.prototype.update = function () {
    inimigosSeguirPlayer();
    checarVitalidade();
    if (map.key != 'jungleBoss') {
        monsters.monstersInMap(ghosts, 15, 12);
        monsters.exp(ghosts, 23);
    } else {
        monsters.exp(ghosts, 50);
    }
    player.body.collideWorldBounds = true;
}

function inimigosSeguirPlayer() {
    if (map.key == 'jungleBoss') {
        monsters.seguirPlayer(ghosts, 200, quantidade, enemies);
    } else {
        monsters.seguirPlayer(ghosts, 150, quantidade, enemies);
    }
}

function checarVitalidade() {
    monsters.vitalidade(ghosts);
    monsters.levarDano(ghosts, game.rnd.integerInRange(3, forca));
}

function carregarItens(ghost) {
    if (map.key == 'jungleBoss') {
        monsters.gerarItens(ghost, itensJungleBoss);
    } else {
        monsters.gerarItens(ghost, itensJungle);
    }
}

var ghosts = new Array();

function contadorDeDano() {
    if (map.key == 'jungleBoss') {
        monsters.damage(ghosts, game.rnd.integerInRange(15, 25) - defesa);
    } else {
        monsters.damage(ghosts, game.rnd.integerInRange(0, 20) - defesa);
    }
}
