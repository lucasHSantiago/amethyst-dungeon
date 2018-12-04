var Cogumelo = function () { }

var enemy1;
var enemies2;
var monsters1 = new Monsters();

Cogumelo.prototype.preload = function () {
    game.load.spritesheet('Cogumelo', './praia/cogumelo.png', 16, 16);
    game.load.spritesheet('itens', './img/itens.png', 16, 16);
}

var quantidade = 10; //Quantiidade de monstros

Cogumelo.prototype.create = function () {
    enemies2 = game.add.physicsGroup();
    game.physics.enable(enemies2, Phaser.Physics.ARCADE);

    if (map.key == 'beachBoss') {
        quantidade = 1;
    }

    for (var i = 0; i < quantidade; i++) {
        if (map.key == 'beachBoss') {
            enemy1 = enemies2.create(game.world.width * 0.5, game.world.height * 0.5, 'Cogumelo');
        } else {
            enemy1 = enemies2.create(game.rnd.integerInRange(350, 2250), game.rnd.integerInRange(350, 2020), 'Cogumelo');
        }
        enemy1.anchor.setTo(0.5, 0.5);
        enemy1.scale.setTo(1);
        enemy1.frame = 0;
        enemy1.animations.add('walking', [0, 1], true);
        enemy1.animations.add('attacking', [0, 1], false);
        enemy1.animations.add('death', [0, 1], false);
        if (map.key == 'beachBoss') {
            enemy1.health = 150;
            enemy1.maxHealth = enemy1.health;
            enemy1.scale.setTo(7);
        } else {
            enemy1.health = game.rnd.integerInRange(15, 20);
            enemy1.maxHealth = enemy1.health;
            enemy1.scale.setTo(2);
        }
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano1, this);

    monsters1.checarFim(quantidade);
}

Cogumelo.prototype.update = function () {
    inimigosSeguirPlayer1();
    checarVitalidade1();
    expa();
    if (map.key != 'beachBoss') {
        monsters1.monstersInMap2(cogumelos, 20, 17.6);
    }

    game.physics.arcade.collide(enemies2, layer1);
    game.physics.arcade.collide(enemies2, layer2);
    game.physics.arcade.collide(enemies2, layer3);
}

var passagens2 = 1;
var passou2 = false;

function inimigosSeguirPlayer1() {
    passagens2++;

    for (let i = 0; i < quantidade; i++) {
        cogumelos[i] = enemies2.children[i];

        if (Phaser.Math.distance(cogumelos[i].position.x, cogumelos[i].position.y, player.position.x, player.position.y) < 200 && cogumelos[i].alive && player.alive) {
            game.physics.arcade.moveToObject(cogumelos[i], player, 150, 0);
            if (Phaser.Math.distance(cogumelos[i].position.x, cogumelos[i].position.y, player.position.x, player.position.y) <= 65 && cogumelos[i].alive) {
                cogumelos[i].body.velocity.set(0, 0);
            }
        } else {
            if (cogumelos.length == quantidade && !passou2 && cogumelos[i].alive) {
                for (let l = 0; l < cogumelos.length; l++) {
                    cogumelos[l].body.velocity.set(game.rnd.integerInRange(-50, 50), 0);
                }
                passou2 = !passou2
            }

            if (passagens2 >= 100) {
                passou2 = !passou2;
                passagens2 = 0;
            }

        }

        if (cogumelos[i].body.velocity.x > 0 && cogumelos[i].alive) {
            cogumelos[i].angle = 180;
            cogumelos[i].scale.y = -1.5;
            cogumelos[i].animations.play('walking', 10);
        } else if (cogumelos[i].body.velocity.x < 0 && cogumelos[i].alive) {
            cogumelos[i].angle = 0;
            cogumelos[i].scale.y = 1.5;
            cogumelos[i].animations.play('walking', 10);
        } else if (cogumelos[i].body.velocity.x == 0 && Phaser.Math.distance(cogumelos[i].position.x, cogumelos[i].position.y, player.position.x, player.position.y) > 65 && cogumelos[i].alive) {
            cogumelos[i].animations.stop('walking');
            cogumelos[i].frame = 1;
        }
    }
}

function checarVitalidade1() {
    monsters1.vitalidade(cogumelos);
    monsters1.levarDano(cogumelos, game.rnd.integerInRange(3, forca));
}

function carregarItens1(cogumelo) {
    if (map.key == 'beachBoss') {
        monsters1.gerarItens(cogumelo, itensBeachBoss);
    } else {
        monsters1.gerarItens(cogumelo, itensBeach);
    }
}

var cogumelos = new Array();

function contadorDeDano1() {
    if (map.key == 'beachBoss') {
        monsters1.damage(cogumelos, game.rnd.integerInRange(15, 25) - defesa);
    } else {
        monsters1.damage(cogumelos, game.rnd.integerInRange(0, 15) - defesa);
    }
}

function expa() {
    var expNum = document.querySelector("#levelUp");
    var expBar = document.querySelector('#experienceBar');
    var playerNivel = document.querySelector('#personagemUp');

    cogumelos.forEach(monster => {
        if (!monster.alive && monsterVivo) {
            if (map.key == 'beachBoss') {
                exp += 50;
            } else {
                exp += 12;
                expTotal += 12;
            }
            monsterVivo = false;
        }
    });

    if (exp >= levelUp) {
        nivel++;
        levelUp = Math.round(levelUp * 1.2);
        exp = 0;
        subiuNivel = true;
    }

    expNum.innerHTML = `${exp}/${levelUp}`;
    var expBarSize = (exp * 100) / levelUp;
    expBar.style.width = `${expBarSize}%`;
    playerNivel.innerHTML = `${nivel}`;
    $('#score').html(expTotal);
}