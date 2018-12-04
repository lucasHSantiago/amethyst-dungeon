var Skeleton = function () { }

var enemy;
var enemies;
var monsters = new Monsters();

Skeleton.prototype.preload = function () {
    game.load.spritesheet('Esqueleto', 'img/skeleton.png', 44, 52);
    game.load.spritesheet('itens', 'img/itens.png', 16, 16);
}

var quantidade = 10; //Qauntidade de monstros

Skeleton.prototype.create = function () {
    enemies = game.add.physicsGroup();
    game.physics.enable(enemies, Phaser.Physics.ARCADE);

    if (map.key == 'infernoBoss') {
        quantidade = 1;
    }

    for (var i = 0; i < quantidade; i++) {
        if (map.key == 'infernoBoss') {
            enemy = enemies.create(game.world.width * 0.5, game.world.height * 0.5, 'Esqueleto');
        } else {
            enemy = enemies.create(game.rnd.integerInRange(640, 3850), game.rnd.integerInRange(575, 2260), 'Esqueleto');
        }

        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(1.5);
        enemy.frame = 1;
        enemy.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7], true);
        enemy.animations.add('attacking', [0, 5], false);
        enemy.animations.add('death', [13, 12, 11, 10, 9], false);
        if (map.key == 'infernoBoss') {
            enemy.health = 250;
            enemy.maxHealth = enemy.health;
        } else {
            enemy.health = game.rnd.integerInRange(35, 40);
            enemy.maxHealth = enemy.health;
        }

        if (map.key == 'infernoBoss') {
            enemy.scale.setTo(7);
        }
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano, this);

    monsters.checarFim(quantidade);
}

Skeleton.prototype.update = function () {
    game.physics.arcade.collide(enemies, layer1);
    game.physics.arcade.collide(enemies, layer2);
    game.physics.arcade.collide(enemies, layer3);

    inimigosSeguirPlayer();
    checarVitalidade();
    if (map.key == 'infernoBoss') {
        monsters.exp(skeletons, 100);
    } else {
        monsters.exp(skeletons, 32);
    }
    if (map.key != 'infernoBoss') {
        monsters.monstersInMap(skeletons, 34.5, 20);
    }
}

function inimigosSeguirPlayer() {
    if (map.key == 'infernoBoss') {
        monsters.seguirPlayer(skeletons, 210, quantidade, enemies);
    } else {
        monsters.seguirPlayer(skeletons, 150, quantidade, enemies);
    }
}

function checarVitalidade() {
    monsters.vitalidade(skeletons);
    monsters.levarDano(skeletons, game.rnd.integerInRange(3, forca));
}

function carregarItens(skeleton) {
    if (map.key == 'infernoBoss') {
        monsters.gerarItens(skeleton, itensInfernoBoss);
    } else {
        monsters.gerarItens(skeleton, itensInferno);
    }
}

var skeletons = new Array();

function contadorDeDano() {
    if (map.key == 'infernoBoss') {
        monsters.damage(skeletons, game.rnd.integerInRange(20, 40) - defesa);
    } else {
        monsters.damage(skeletons, game.rnd.integerInRange(0, 40) - defesa);
    }
}
