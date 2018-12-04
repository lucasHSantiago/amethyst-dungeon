var Player = function () { }

var fullHealth;
var forca = 5;
var defesa = 0;
var expTotal = 0;

Player.prototype.preload = function () {
    game.load.spritesheet('player', 'img/jogador.png', 50, 37);
}

Player.prototype.create = function () {
    if (map.key == 'beachBoss') {
        player = game.add.sprite(709.5, 1216.55, 'player');
    } else if (map.key == 'beach') {
        player = game.add.sprite(2586.5, 575.45, 'player');
    } else if (map.key == 'inferno' || map.key == 'infernoBoss') {
        player = game.add.sprite(1008, 703, 'player');
    } else if (map.key == 'jungleBoss') {
        player = game.add.sprite(623.5000000000001, 1010.6666666666702, 'player');
    } else {
        player = game.add.sprite(game.world.width * 0.5, game.world.height * 0.5, 'player');
    }
    player.frame = 1;
    player.animations.add('walking', [9, 10, 11, 12, 13], true);
    player.animations.add('attacking', [49, 50, 51, 52, 53, 54, 55, 56]), true;
    player.animations.add('death', [64, 65, 66]), true;
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(1.5);
    player.health = 100;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.immovable = true;
    fullHealth = player.health;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    $("#mensagem").hide();
}

Player.prototype.update = function () {
    game.physics.arcade.collide(player, layer1);
    game.physics.arcade.collide(player, layer2);
    game.physics.arcade.collide(player, layer3);
    player.body.collideWorldBounds = true;
    playerAndar();
    playerAtacar();
    checarVida();
    playerStats();
    healthBar();
    pegarItem();

    $("#pontosForcaAtual").html(forca);
    $("#pontosDefesaAtual").html(defesa);
    $("#pontosVitalidadeAtual").html(player.maxHealth);
    $('#vidaPlayer').html(player.health + "/" + player.maxHealth);

    // console.log("x: ", player.position.x, " y: ", player.position.y);
}

Player.prototype.recreate = function () {
    forca = 5;
    defesa = 0;
    player.health = 100;
    player.maxHealth = player.health;
    levelUp = 20;
    nivel = 1;
    exp = 0;
    subiuNivel = false;
}

var podeAndar = true;

function playerAndar() {
    var teclaW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var teclaA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var teclaS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var teclaD = game.input.keyboard.addKey(Phaser.Keyboard.D);

    player.body.velocity.set(0, 0);

    if (teclaW.isDown && player.alive && podeAndar) {
        player.body.velocity.y = -200;
        player.animations.play('walking', 15);
    } else if (teclaS.isDown && player.alive && podeAndar) {
        player.body.velocity.y = +200;
        player.animations.play('walking', 15);
    }

    if (teclaA.isDown && player.alive && podeAndar) {
        player.body.velocity.x = -200;
        player.animations.play('walking', 15);
        player.angle = 180;
        player.scale.y = -1.7;
    } else if (teclaD.isDown && player.alive && podeAndar) {
        player.body.velocity.x = +200;
        player.animations.play('walking', 15);
        player.angle = 0;
        player.scale.y = 1.7;
    }

    if (!teclaW.isDown && !teclaA.isDown && !teclaS.isDown && !teclaD.isDown && player.frame >= 9 && player.frame <= 13 && player.alive) {
        player.animations.stop('walking');
        player.frame = 1;
    }
}

var podeAtacar = true;
var atc = null;

function playerAtacar() {
    if (podeAtacar) {
        if (cursors.up.isDown && player.body.velocity.x == 0 && player.body.velocity.y == 0 && player.alive) {
            atc = player.animations.play('attacking', 10);
            player.angle = 0;
            player.scale.y = 1.7;
            podeAtacar = false;
            podeAndar = false;
            podeLevarDano = true;
        } else if (cursors.down.isDown && player.body.velocity.x == 0 && player.body.velocity.y == 0 && player.alive) {
            atc = player.animations.play('attacking', 10);
            player.angle = 180;
            player.scale.y = -1.7;
            podeAtacar = false;
            podeAndar = false;
            podeLevarDano = true;
        }

        if (cursors.left.isDown && player.body.velocity.x == 0 && player.body.velocity.y == 0 && player.alive) {
            atc = player.animations.play('attacking', 10);
            player.angle = 180;
            player.scale.y = -1.7;
            podeAtacar = false;
            podeAndar = false;
            podeLevarDano = true;
        } else if (cursors.right.isDown && player.body.velocity.x == 0 && player.body.velocity.y == 0 && player.alive) {
            atc = player.animations.play('attacking', 10);
            player.angle = 0;
            player.scale.y = 1.7;
            podeAtacar = false;
            podeAndar = false;
            podeLevarDano = true;
        }

        if (!cursors.up.isDown && !cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown && player.frame >= 49 && player.frame <= 56 && player.alive) {
            player.animations.stop('attacking');
            player.frame = 1;
        }
    } else {
        atc.onComplete.addOnce(function () {
            podeAndar = true;
            player.animations.stop('attacking');
            player.frame = 1;
            setTimeout(function () {
                podeAtacar = true;
            }, 1000)
        })
    }
}

var vivo = true;
var salvou = false;

function checarVida() {
    if (!player.alive && vivo) {
        player.exists = true;
        die = player.animations.play('death', 2);
        die.onComplete.addOnce(function () {
            player.exists = false;
            vivo = false;
            salvou = true;
        }, this);
    }

    if (vivo && !salvou) {
        $("#mensagem").hide();
    } else {
        $("#mensagem").show();
        $("#share").show();
    }

    if (!vivo && salvou) {
        var scoreObj = new Object();
        var token = sessionStorage.getItem("token");
        var claims = JSON.parse(atob(token.split('.')[1]));
        var usuario = new Object();
        usuario.id = claims.id;

        scoreObj.score = expTotal;
        scoreObj.usuario = usuario;

        $.ajax({
            url: '/dungeon/api/score',
            type: "POST",
            data: JSON.stringify(scoreObj),
            contentType: 'application/json',
            headers: {
                "Authorization": token
            }
        }).done(function (data) {
            console.log("score salvo")
        }).fail(function (jqXHR) {
            console.log(jqXHR);
        });
        $("#mensagem").show();
        salvou = false;
    }
}

Player.prototype.miniMap = function (porX, porY) {
    var posX = player.position.x / porX;
    var posY = player.position.y / porY;
    var miniPlayer = document.querySelector('#miniPlayer');
    miniPlayer.style.left = `${posX}px`;
    miniPlayer.style.top = `${posY}px`;
}

function healthBar() {
    if (fullHealth > 0) {
        var healthBar = document.querySelector('#healthbar');
        var healthBarSize = (player.health * 100) / player.maxHealth;
        healthBar.style.width = `${healthBarSize}%`
    }
}

var statsPoints = 0;

function playerStats() {
    if (subiuNivel) {
        subiuNivel = false;
        statsPoints++;
        $("#pontosHabilidade").html(statsPoints);
    }
}

var itemSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function pegarItem() {
    teclaE = game.input.keyboard.addKey(Phaser.Keyboard.E);

    itens.forEach(item => {
        if (Phaser.Math.distance(item.position.x, item.position.y, player.position.x, player.position.y) < 100) {
            itemSlots.forEach(itemSlot => {
                if ($(`#item${itemSlot}`).attr("src") == "img/semItem.png" && teclaE.isDown && item.alive) {
                    $(`#item${itemSlot}`).attr("src", `Item/item${item.frame}.png`).width(32).height(32);
                    item.kill();
                }
            });
        }
    });

}
