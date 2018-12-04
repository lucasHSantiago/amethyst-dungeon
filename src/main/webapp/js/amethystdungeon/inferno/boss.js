var Boss = function () { }

var enemy;
var enemies;
var monsters = new Monsters();

Boss.prototype.preload = function () {
    game.load.spritesheet('Boss', 'inferno/bossInferno.png', 25, 32);
    game.load.spritesheet('itens', 'img/itens.png', 16, 16);
}

var quantidade = 1; //Qauntidade de monstros

Boss.prototype.create = function () {
    enemies = game.add.physicsGroup();
    game.physics.enable(enemies, Phaser.Physics.ARCADE);

    if (map.key == 'infernoBoss') {
        quantidade = 1;
    }

    for (var i = 0; i < quantidade; i++) {
        if (map.key == 'infernoBoss') {
            enemy = enemies.create(game.world.width * 0.5, game.world.height * 0.5, 'Boss');
        } else {
            enemy = enemies.create(game.world.randomX - 520, game.world.randomY - 610, 'Boss');
        }

        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(1.5);
        enemy.frame = 1;
        enemy.animations.add('walking', [0, 1, 2, 3], true);
        enemy.animations.add('attacking', [4, 6, 7, 8], false);
        enemy.animations.add('death', [9, 10, 11], false);
        enemy.health = game.rnd.integerInRange(18, 20);
        enemy.maxHealth = enemy.health;

        if (map.key == 'infernoBoss') {
            enemy.scale.setTo(3);
        }
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano, this);

    monsters.checarFim(quantidade);
}

Boss.prototype.update = function () {
    game.physics.arcade.collide(enemies, layer1);
    game.physics.arcade.collide(enemies, layer2);
    game.physics.arcade.collide(enemies, layer3);

    inimigosSeguirPlayer();
    checarVitalidade();
    monsters.exp(bosses, 10);
}

function inimigosSeguirPlayer() {
    monsters.seguirPlayer(bosses, 150, quantidade, enemies);
}

function checarVitalidade() {
    monsters.vitalidade(bosses);
    monsters.levarDano(bosses, forca);
}

function carregarItens(boss) {
    monsters.gerarItens(boss, itensDrop);
}

var bosses = new Array();

function contadorDeDano() {
    monsters.damage(bosses, 20 - defesa);
}
