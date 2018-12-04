var Devil = function () { }

var enemy1;
var enemies2;
var monsters1 = new Monsters();

Devil.prototype.preload = function () {
    game.load.spritesheet('Diabinho', './inferno/devil.png', 16, 16);
    game.load.spritesheet('itens', './img/itens.png', 16, 16);
}

var quantidade = 10; //Quantiidade de monstros

Devil.prototype.create = function () {
    enemies2 = game.add.physicsGroup();
    game.physics.enable(enemies2, Phaser.Physics.ARCADE);

    for (var i = 0; i < quantidade; i++) {
        enemy1 = enemies2.create(game.rnd.integerInRange(640, 3850), game.rnd.integerInRange(575, 2260), 'Diabinho');
        enemy1.anchor.setTo(0.5);
        enemy1.scale.setTo(1);
        enemy1.frame = 0;
        enemy1.animations.add('walking', [0, 1], true);
        enemy1.animations.add('attacking', [0, 1], false);
        enemy1.animations.add('death', [0, 1], false);
        enemy1.health = game.rnd.integerInRange(30, 40);
        enemy1.maxHealth = enemy1.health;
        enemy1.scale.setTo(2);
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano1, this);

    monsters1.checarFim(quantidade);
}

Devil.prototype.update = function () {
    inimigosSeguirPlayer1();
    checarVitalidade1();
    expa();

    game.physics.arcade.collide(enemies2, layer1);
    game.physics.arcade.collide(enemies2, layer2);
    game.physics.arcade.collide(enemies2, layer3);

    monsters1.monstersInMap2(devils, 34.5, 20);
}

var passagens2 = 1;
var passou2 = false;

function inimigosSeguirPlayer1() {
    passagens2++;

    for (let i = 0; i < quantidade; i++) {
        devils[i] = enemies2.children[i];

        if (Phaser.Math.distance(devils[i].position.x, devils[i].position.y, player.position.x, player.position.y) < 200 && devils[i].alive && player.alive) {
            game.physics.arcade.moveToObject(devils[i], player, 150, 0);
            if (Phaser.Math.distance(devils[i].position.x, devils[i].position.y, player.position.x, player.position.y) <= 65 && devils[i].alive) {
                devils[i].body.velocity.set(0, 0);
            }
        } else {
            if (devils.length == quantidade && !passou2 && devils[i].alive) {
                for (let l = 0; l < devils.length; l++) {
                    devils[l].body.velocity.set(game.rnd.integerInRange(-50, 50), 0);
                }
                passou2 = !passou2
            }

            if (passagens2 >= 100) {
                passou2 = !passou2;
                passagens2 = 0;
            }

        }

        if (devils[i].body.velocity.x > 0 && devils[i].alive) {
            devils[i].angle = 180;
            devils[i].scale.y = -1.5;
            devils[i].animations.play('walking', 10);
        } else if (devils[i].body.velocity.x < 0 && devils[i].alive) {
            devils[i].angle = 0;
            devils[i].scale.y = 1.5;
            devils[i].animations.play('walking', 10);
        } else if (devils[i].body.velocity.x == 0 && Phaser.Math.distance(devils[i].position.x, devils[i].position.y, player.position.x, player.position.y) > 65 && devils[i].alive) {
            devils[i].animations.stop('walking');
            devils[i].frame = 1;
        }
    }
}

function checarVitalidade1() {
    monsters1.vitalidade(devils);
    monsters1.levarDano(devils, game.rnd.integerInRange(3, forca));
}

function carregarItens1(devil) {
    monsters1.gerarItens(devil, itensInferno);
}

var devils = new Array();

function contadorDeDano1() {
    monsters1.damage(devils, game.rnd.integerInRange(0, 30) - defesa);
}

function expa() {
    var expNum = document.querySelector("#levelUp");
    var expBar = document.querySelector('#experienceBar');
    var playerNivel = document.querySelector('#personagemUp');

    devils.forEach(monster => {
        if (!monster.alive && monsterVivo) {
            exp += 28;
            expTotal += 28;
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