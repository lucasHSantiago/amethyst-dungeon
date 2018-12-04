var Plant = function () { }

var enemy1;
var enemies2;
var monsters1 = new Monsters();

Plant.prototype.preload = function () {
    game.load.spritesheet('Planta', './jungle/plant.png', 16, 16);
    game.load.spritesheet('itens', './img/itens.png', 16, 16);
}

var quantidade = 10; //Quantiidade de monstros

Plant.prototype.create = function () {
    enemies2 = game.add.physicsGroup();
    game.physics.enable(enemies2, Phaser.Physics.ARCADE);

    for (var i = 0; i < quantidade; i++) {
        enemy1 = enemies2.create(game.world.randomX, game.world.randomY, 'Planta');
        enemy1.anchor.setTo(0.5, 0.5);
        enemy1.scale.setTo(1);
        enemy1.frame = 0;
        enemy1.animations.add('walking', [0, 1], true);
        enemy1.animations.add('attacking', [0, 1], false);
        enemy1.animations.add('death', [0, 1], false);
        enemy1.health = enemy1.health = game.rnd.integerInRange(15, 25);;
        enemy1.maxHealth = enemy1.health;
        enemy1.scale.setTo(2);
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2, contadorDeDano1, this);

    monsters1.checarFim(quantidade);
}

Plant.prototype.update = function () {
    inimigosSeguirPlayer1();
    checarVitalidade1();
    expa();

    game.physics.arcade.collide(enemies2, layer1);
    game.physics.arcade.collide(enemies2, layer2);
    game.physics.arcade.collide(enemies2, layer3);

    player.body.collideWorldBounds = true;

    monsters1.monstersInMap2(plants, 15, 12);
}

var passagens2 = 1;
var passou2 = false;

function inimigosSeguirPlayer1() {
    passagens2++;

    for (let i = 0; i < quantidade; i++) {
        plants[i] = enemies2.children[i];

        if (Phaser.Math.distance(plants[i].position.x, plants[i].position.y, player.position.x, player.position.y) < 200 && plants[i].alive && player.alive) {
            game.physics.arcade.moveToObject(plants[i], player, 150, 0);
            if (Phaser.Math.distance(plants[i].position.x, plants[i].position.y, player.position.x, player.position.y) <= 65 && plants[i].alive) {
                plants[i].body.velocity.set(0, 0);
            }
        } else {
            if (plants.length == quantidade && !passou2 && plants[i].alive) {
                for (let l = 0; l < plants.length; l++) {
                    plants[l].body.velocity.set(game.rnd.integerInRange(-50, 50), 0);
                }
                passou2 = !passou2
            }

            if (passagens2 >= 100) {
                passou2 = !passou2;
                passagens2 = 0;
            }

        }

        if (plants[i].body.velocity.x > 0 && plants[i].alive) {
            plants[i].angle = 180;
            plants[i].scale.y = -1.5;
            plants[i].animations.play('walking', 10);
        } else if (plants[i].body.velocity.x < 0 && plants[i].alive) {
            plants[i].angle = 0;
            plants[i].scale.y = 1.5;
            plants[i].animations.play('walking', 10);
        } else if (plants[i].body.velocity.x == 0 && Phaser.Math.distance(plants[i].position.x, plants[i].position.y, player.position.x, player.position.y) > 65 && plants[i].alive) {
            plants[i].animations.stop('walking');
            plants[i].frame = 1;
        }
    }
}

function checarVitalidade1() {
    monsters1.vitalidade(plants);
    monsters1.levarDano(plants, game.rnd.integerInRange(3, forca));
}

function carregarItens1(plant) {
    monsters1.gerarItens(plant, itensJungle);
}

var plants = new Array();

function contadorDeDano1() {
    monsters1.damage(plants, game.rnd.integerInRange(0, 20) - defesa);
}

function expa() {
    var expNum = document.querySelector("#levelUp");
    var expBar = document.querySelector('#experienceBar');
    var playerNivel = document.querySelector('#personagemUp');

    plants.forEach(monster => {
        if (!monster.alive && monsterVivo) {
            exp += 18;
            expTotal += 18
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