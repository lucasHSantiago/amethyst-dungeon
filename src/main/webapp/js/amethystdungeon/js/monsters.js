var Monsters = function () { }

Monsters.prototype.damage = function (array, damage) {
    if (damage < 0) {
        damage = 0;
    }
    array.forEach(monster => {
        if (Phaser.Math.distance(monster.position.x, monster.position.y, player.position.x, player.position.y) <= 65 && monster.alive && player.alive) {
            player.damage(damage);
            monster.animations.play('attacking', 2);
        }
    });
}

var itens = new Array();
var itemCount = 1;

Monsters.prototype.gerarItens = function (monster, itenArray) {
    if (monster.health <= 0) {
        itens[itemCount] = game.add.sprite(monster.position.x, monster.position.y, 'itens');
        var random = itenArray[Math.floor(Math.random() * itenArray.length)];
        itens[itemCount].frame = random;
        itens[itemCount].scale.setTo(1.5);
        itemCount++;
    }
}

var die;
var monsterVivo = false;

Monsters.prototype.vitalidade = function (array) {
    array.forEach(monster => {
        if (!monster.alive && monster.health <= 0) {
            monster.body.velocity.set(0, 0);
            die = monster.animations.play('death', 2);
            monster.exists = true;

            die.onComplete.addOnce(function () {
                monster.exists = false;
                carregarItens(monster);
                monster.health = 100;
                monsterVivo = true;
            })
        }
    });
}

var passagens = 1;
var passou = false;

Monsters.prototype.seguirPlayer = function (array, velocidade, quantidade, mEnemies) {
    passagens++;

    for (let i = 0; i < quantidade; i++) {
        array[i] = mEnemies.children[i];

        if (Phaser.Math.distance(array[i].position.x, array[i].position.y, player.position.x, player.position.y) < 200 && array[i].alive && player.alive) {
            game.physics.arcade.moveToObject(array[i], player, velocidade, 0);
            if (Phaser.Math.distance(array[i].position.x, array[i].position.y, player.position.x, player.position.y) <= 65 && array[i].alive) {
                array[i].body.velocity.set(0, 0);
            }
        } else {
            if (array.length == quantidade && !passou && array[i].alive) {
                for (let l = 0; l < array.length; l++) {
                    array[l].body.velocity.set(game.rnd.integerInRange(-50, 50), 0);
                }
                passou = !passou
            }

            if (passagens >= 100) {
                passou = !passou;
                passagens = 0;
            }

        }

        if (array[i].body.velocity.x > 0 && array[i].alive) {
            array[i].angle = 180;
            array[i].scale.y = -1.5;
            array[i].animations.play('walking', 10);
        } else if (array[i].body.velocity.x < 0 && array[i].alive) {
            array[i].angle = 0;
            array[i].scale.y = 1.5;
            array[i].animations.play('walking', 10);
        } else if (array[i].body.velocity.x == 0 && Phaser.Math.distance(array[i].position.x, array[i].position.y, player.position.x, player.position.y) > 65 && array[i].alive) {
            array[i].animations.stop('walking');
            array[i].frame = 1;
        }
    }
}

var podeLevarDano = false;
var healthbarMonsterSize = 100;
var teste = new Array();
var beach = '<script id="monstro1" src="praia/carangueijo.js"></script><script id="monstro2" src="praia/cogumelo.js"></script><script id="mapa" src="praia/beach.js"></script><script id="main" src="praia/beachMain.js"></script>';
var beachBoss = '<script id="monstro2" src="praia/cogumelo.js"></script><script id="mapa" src="praia/beachBoss.js"></script><script id="main" src="praia/beachBossMain.js"></script>';
var jungle = '<script id="monstro1" src="./jungle/ghost.js"></script><script id="monstro2" src="./jungle/plant.js"></script><script id="mapa" src="./jungle/jungle.js"></script><script id="main" src="./jungle/jungleMain.js"></script>';
var jungleBoss = '<script id="monstro2" src="jungle/ghost.js"></script><script id="mapa" src="jungle/jungleBoss.js"></script><script id="main" src="jungle/jungleBossMain.js"></script>';
var hell = '<script id="monstro1" src="inferno/skeleton.js"></script><script id="monstro2" src="inferno/devil.js"></script><script id="mapa" src="inferno/hell.js"></script><script id="main" src="inferno/hellMain.js"></script>';
var hellBoss = '<script id="monstro2" src="inferno/skeleton.js"></script><script id="mapa" src="inferno/hellBoss.js"></script><script id="main" src="inferno/hellBossMain.js"></script>';

Monsters.prototype.levarDano = function (array, damage) {
    array.forEach(monster => {
        var distancia = Phaser.Math.distance(monster.position.x, monster.position.y, player.position.x, player.position.y);
        var vidaTotal = monster.maxHealth;
        if (player.body.velocity.x == 0 && player.body.velocity.y == 0 && distancia <= 65 && player.alive && podeLevarDano && monster.alive) {
            monster.damage(damage);

            if (monster.health < 0 || monster.health == 0) {
                monster.health = 0;
                totalInimigos--;
            }

            healthbarMonsterSize = (monster.health * 100) / vidaTotal;
            $("#infoInimigo").show();
            $("#vidaInimigo").html(monster.health + "/" + vidaTotal);
            $("#healthbarBixo").width(`${healthbarMonsterSize}%`);
            $("#nomeInimigo").html(monster.key);
            $(".fotoInimigo").attr("src", `monstros/${monster.key}.png`).width(32).height(32);

            podeLevarDano = false;

            setTimeout(function () {
                $("#infoInimigo").hide();
            }, 3000)
        }
    });

    var teclaH = game.input.keyboard.addKey(Phaser.Keyboard.H);

    if (map.key == 'beach' && totalInimigos == 0) {
        $('#aviso').html('Dirija-se para o píer no sul!');
        $('#aviso').show();
        if (player.position.x < 1595 && player.position.x > 1505 && player.position.y > 2230 && player.position.y < 2240) {
            game.destroy();
            $('#scripts').empty();
            $('#scripts').append(beach);
            $('#reload').show();
            setTimeout(function () {
                game.destroy();
                $('#scripts').empty();
                $('#scripts').append(beachBoss);
                $('#miniMap').attr('src', './praia/mapBeachBoss.png');
                $('#reload').hide();
                $('#aviso').hide();
            }, 150)
        }
    }

    if (map.key == 'beachBoss' && totalInimigos == 0) {
        $('#aviso').html('Dirija-se para o píer no sul!');
        $('#aviso').show();
        if (player.position.x == 709.5 && player.position.y == 1216.55) {
            game.destroy();
            $('#scripts').empty();
            $('#scripts').append(beach);
            $('#reload').show();
            setTimeout(function () {
                game.destroy();
                $('#scripts').empty();
                $('#scripts').append(jungle);
                $('#miniMap').attr('src', './jungle/MapFloresta.png');
                $('#reload').hide();
                $('#aviso').hide();
            }, 150)
        }
    }

    if (map.key == 'jungle' && totalInimigos == 0) {
        $('#aviso').html('Dirija-se a pedra do lado da árvore com cipó!');
        $('#aviso').show();
        if (player.position.x == 1125.5 && player.position.y < 1570 && player.position.y > 1480) {
            game.destroy();
            $('#scripts').empty();
            $('#scripts').append(beach);
            $('#reload').show();
            setTimeout(function () {
                game.destroy();
                $('#scripts').empty();
                $('#scripts').append(jungleBoss);
                $('#miniMap').attr('src', './jungle/MapFlorestaBoss.png');
                $('#reload').hide();
                $('#aviso').hide();
            }, 150)
        }
    }

    if (map.key == 'jungleBoss' && totalInimigos == 0) {
        $('#aviso').html('Dirija-se ao lado da árvore com cipó!');
        $('#aviso').show();
        if (player.position.x == 613.5 && player.position.y < 1015 && player.position.y > 955) {
            game.destroy();
            $('#scripts').empty();
            $('#scripts').append(beach);
            $('#reload').show();
            setTimeout(function () {
                game.destroy();
                $('#scripts').empty();
                $('#scripts').append(hell);
                $('#miniMap').attr('src', './inferno/mapaInferno.png');
                $('#reload').hide();
                $('#aviso').hide();
            }, 150)
        }
    }

    if (map.key == 'inferno' && totalInimigos == 0) {
        $('#aviso').html('Dirija-se para o altar');
        $('#aviso').show();
        if (player.position.x > 965 && player.position.x < 1050 && player.position.y == 703.45) {
            game.destroy();
            $('#scripts').empty();
            $('#scripts').append(beach);
            $('#reload').show();
            setTimeout(function () {
                game.destroy();
                $('#scripts').empty();
                $('#scripts').append(hellBoss);
                $('#miniMap').attr('src', './inferno/mapaInfernoBoss.png');
                $('#reload').hide();
                $('#aviso').hide();
            }, 250)
        }
    }

    if (map.key == 'infernoBoss' && totalInimigos == 0) {
        $('#fim').show();
    }
}

var levelUp = 20;
var nivel = 1;
var exp = 0;
var subiuNivel = false;

Monsters.prototype.exp = function (array, quantidadeEXP) {

    var expNum = document.querySelector("#levelUp");
    var expBar = document.querySelector('#experienceBar');
    var playerNivel = document.querySelector('#personagemUp');

    array.forEach(monster => {
        if (!monster.alive && monsterVivo) {
            exp += quantidadeEXP;
            expTotal += exp;
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

var totalInimigos;
Monsters.prototype.checarFim = function (quantidade) {
    totalInimigos = quantidade * 2;
    if (map.key == 'beachBoss' || map.key == 'jungleBoss' || map.key == 'infernoBoss') {
        totalInimigos = 1;
    }
}

var gerar = true;
var contar = 0;
Monsters.prototype.monstersInMap = function (array, porX, porY) {
    array.forEach(monster => {
        if (gerar) {
            $('#mapFrameMonsters')
                .append(`<div id="${monster.key}${contar}" style = "width: 5px;height: 5px;background-color: red;position: absolute;left: ${monster.position.x / porX}px; top: ${monster.position.y / porY}px;" ></div>`);
            contar++;
        }
        if (contar == array.length) {
            gerar = false;
        }

        $(`#${monster.key}${array.indexOf(monster)}`).css('top', `${monster.position.y / porY}px`);
        $(`#${monster.key}${array.indexOf(monster)}`).css('left', `${monster.position.x / porX}px`);

        if (!monster.alive) {
            $(`#${monster.key}${array.indexOf(monster)}`).remove();
        }
    });
}

var gerar2 = true;
var contar2 = 0;
Monsters.prototype.monstersInMap2 = function (array, porX, porY) {
    array.forEach(monster => {
        if (gerar2) {
            $('#mapFrameMonsters')
                .append(`<div id="${monster.key}${contar2}" style = "width: 5px;height: 5px;background-color: red;position: absolute;left: ${monster.position.x / porX}px; top: ${monster.position.y / porY}px;" ></div>`);
            contar2++;
        }
        if (contar2 == array.length) {
            gerar2 = false;
        }

        $(`#${monster.key}${array.indexOf(monster)}`).css('top', `${monster.position.y / porY}px`);
        $(`#${monster.key}${array.indexOf(monster)}`).css('left', `${monster.position.x / porX}px`);

        if (!monster.alive) {
            $(`#${monster.key}${array.indexOf(monster)}`).remove();
        }
    });
}