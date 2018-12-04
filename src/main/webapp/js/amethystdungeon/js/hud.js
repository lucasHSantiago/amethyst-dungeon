var Hud = function () { }

Hud.prototype.main = function () {
    buttons();
    itemOptions();
    pausar();
    statusItens();

    $('.statusItens').hide();
    $('#statusItens').hide();
    $("#infoInimigo").hide();
    $('#aviso').hide();

    $(document).on('contextmenu', function (e) {
        e.preventDefault();
    });
}

function buttons() {
    $("#mochilaBorda").hide();
    $("#equipamentosBorda").hide();
    $("#habilidadesBorda").hide();
    $("#statusBorda").hide();

    var openBackpack = function () {
        $("#mochilaBorda").toggle();
        $("#equipamentosBorda").hide();
        $("#habilidadesBorda").hide();
        $("#statusBorda").hide();
    }

    var openEquipaments = function () {
        $("#equipamentosBorda").toggle(0);
        $("#mochilaBorda").hide();
        $("#habilidadesBorda").hide();
        $("#statusBorda").hide();
    }

    var openSkills = function () {
        $("#habilidadesBorda").toggle(0);
        $("#mochilaBorda").hide();
        $("#equipamentosBorda").hide();
        $("#statusBorda").hide();
    }

    var openStatus = function () {
        $("#statusBorda").toggle(0);
        $("#mochilaBorda").hide();
        $("#equipamentosBorda").hide();
        $("#habilidadesBorda").hide();
    }

    $("#backpack").click(openBackpack);
    $("#armor").click(openEquipaments);
    $("#status").click(openSkills);
    $("#statistics").click(openStatus);
}

var itemID;
var equipamentoID;

function itemOptions() {
    $('.item').on('contextmenu', function (e) {
        $('#itemOptions').hide();
        $('#itemOptions').show();
        $('#itemOptions').css('top', e.pageY);
        $('#itemOptions').css('left', e.pageX - 90);
        itemID = this.id;
        var itemNum = $(`#${itemID}`).attr("src");
        itemNum = itemNum.match(/\d+/g);
        if (itemNum == 28 || itemNum == 29) {
            $("#tomar").remove();
            $("#itemOptionsList").append("<li class='menu-option' onclick='tomar()' id='tomar'>Tomar</li>");
            $("#itemOptions").css("height", "130px");
        } else {
            $("#tomar").remove();
            $("#itemOptions").css("height", "90px");
        }
    });

    $('#mochila').click(function() {
        console.log('aaaaaaaaaa')
    })

    $('.equipamento').on('contextmenu', function (e) {
        $('#equipamentsOptions').hide();
        $('#equipamentsOptions').show();
        $('#equipamentsOptions').css('top', e.pageY);
        $('#equipamentsOptions').css('left', e.pageX);
        equipamentoID = this.id;
    });

    $(document).click(function (e) {
        $('#itemOptions').hide();
        $('#equipamentsOptions').hide();
        $('#statusItens').hide();
    });
}

var equipou;
var capacetes = [44, 45, 46, 47, 52, 53, 54, 55];
var peitorais = [56, 57, 58, 59];
var luvas = [60, 61, 62, 63];
var botas = [48, 49, 50, 51];
var espadas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var escudos = [24, 25, 26, 27];
var pocoesVida = [28, 29];

var itensBeach = [44, 45, 56, 57, 60, 61, 48, 49, 0, 1, 2, 3, 4, 24, 25, 28, 29];
var itensJungle = [46, 47, 52, 57, 58, 61, 62, 49, 50, 5, 6, 7, 8, 9, 25, 26, 28, 29];
var itensInferno = [53, 54, 55, 58, 59, 62, 63, 50, 51, 10, 11, 12, 13, 14, 15, 26, 27, 28, 29];

var itensBeachBoss = [53, 57, 61, 49, 13, 25];
var itensJungleBoss = [54, 5, 62, 50, 14, 26];
var itensInfernoBoss = [55, 59, 63, 51, 15, 227];

var defesaCapacete = 0;
var defesaPeitoral = 0;
var vitalidadeLuva = 0;
var defesaBota = 0;
var forcaEspada = 0;
var defesaEscudo = 0;

function equipar() {
    var itemNum = $(`#${itemID}`).attr("src");
    itemNum = itemNum.match(/\d+/g);
    equipou = true;

    capacetes.forEach(capacete => {
        if (itemNum == capacete && $(`#equipamento${1}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${1}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (capacetes.indexOf(capacete) == 0) {
                defesa += 1;
                defesaCapacete = 1;
            } else {
                defesa += capacetes.indexOf(capacete) + 1;
                defesaCapacete = capacetes.indexOf(capacete) + 1;
            }
        }
    });

    peitorais.forEach(peitoral => {
        if (itemNum == peitoral && $(`#equipamento${2}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${2}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (peitorais.indexOf(peitoral) == 0) {
                defesa += 1;
                defesaPeitoral = 1;
            } else {
                defesa += peitorais.indexOf(peitoral) + 1;
                defesaPeitoral = peitorais.indexOf(peitoral) + 1;
            }
        }
    });

    luvas.forEach(luva => {
        if (itemNum == luva && $(`#equipamento${3}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${3}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (luvas.indexOf(luva) == 0) {
                player.maxHealth += 5;
                vitalidadeLuva = 5;
            } else {
                player.maxHealth += luvas.indexOf(luva) * 10;
                vitalidadeLuva = luvas.indexOf(luva) * 10;
            }
        }
    });

    botas.forEach(bota => {
        if (itemNum == bota && $(`#equipamento${4}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${4}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (botas.indexOf(bota) == 0) {
                defesa += 1;
                defesaBota = 1;
            } else {
                defesa += botas.indexOf(bota) + 1;
                defesaBota = botas.indexOf(bota) + 1;
            }
        }
    });

    espadas.forEach(espada => {
        if (itemNum == espada && $(`#equipamento${5}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${5}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (espadas.indexOf(espada) == 0) {
                forca += 1;
                forcaEspada = 1;
            } else {
                forca += espadas.indexOf(espada) + 1;
                forcaEspada = espadas.indexOf(espada) + 1;
            }
        }
    });

    escudos.forEach(escudo => {
        if (itemNum == escudo && $(`#equipamento${6}`).attr("src") == "img/semItem.png" && equipou) {
            $(`#equipamento${6}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${itemID}`).attr("src", `img/semItem.png`);
            equipou = false;
            if (escudos.indexOf(escudo) == 0) {
                defesa += 1;
                defesaEscudo = 1;
            } else {
                defesa += escudos.indexOf(escudo) + 1;
                defesaEscudo = escudos.indexOf(escudo) + 1;
            }
        }
    });
}

function dropar() {
    var itemNum = $(`#${itemID}`).attr("src");
    itemNum = itemNum.match(/\d+/g);
    if ($(`#${itemID}`).attr("src") != "img/semItem.png") {
        $(`#${itemID}`).attr("src", `img/semItem.png`);
        itens[itemCount] = game.add.sprite(player.position.x, player.position.y, 'itens');
        itens[itemCount].frame = parseInt(itemNum);
        itens[itemCount].scale.setTo(1.5);
        itemCount++;
    }
}

var desequipou;

function desequipar() {
    var itemNum = $(`#${equipamentoID}`).attr("src");
    itemNum = itemNum.match(/\d+/g);
    desequipou = true;
    itemSlots.forEach(itemSlot => {
        if ($(`#item${itemSlot}`).attr("src") == "img/semItem.png" && desequipou) {
            $(`#item${itemSlot}`).attr("src", `Item/item${itemNum}.png`).width(32).height(32);
            $(`#${equipamentoID}`).attr("src", `img/semItem.png`);
            desequipou = false;

            espadas.forEach(espada => {
                if (itemNum == espada) {
                    forca = forca - forcaEspada;
                    forcaEspada = 0;
                }
            });

            capacetes.forEach(capacete => {
                if (itemNum == capacete) {
                    defesa = defesa - defesaCapacete;
                    defesaCapacete = 0;
                }
            });

            peitorais.forEach(peitoral => {
                if (itemNum == peitoral) {
                    defesa = defesa - defesaPeitoral;
                    defesaPeitoral = 0;
                }
            });

            luvas.forEach(luva => {
                if (itemNum == luva) {
                    player.maxHealth = player.maxHealth - vitalidadeLuva;
                    vitalidadeLuva = 0;
                }
            });

            botas.forEach(bota => {
                if (itemNum == bota) {
                    defesa = defesa - defesaBota;
                    defesaBota = 0;
                }
            });

            escudos.forEach(escudo => {
                if (itemNum == escudo) {
                    defesa = defesa - defesaEscudo;
                    defesaEscudo = 0;
                }
            });
        }

    });
}

function droparEquipamento() {
    var itemNum = $(`#${equipamentoID}`).attr("src");
    itemNum = itemNum.match(/\d+/g);
    if ($(`#${equipamentoID}`).attr("src") != "img/semItem.png") {
        $(`#${equipamentoID}`).attr("src", `img/semItem.png`);
        itens[itemCount] = game.add.sprite(player.position.x, player.position.y, 'itens');
        itens[itemCount].frame = parseInt(itemNum);
        itens[itemCount].scale.setTo(1.5);
        itemCount++;
    }
}

var tomou;

function tomar() {
    var itemNum = $(`#${itemID}`).attr("src");
    itemNum = itemNum.match(/\d+/g);
    tomou = true;
    var poderPocao = 0;
    if (tomou && $(`#${itemID}`).attr("src") != "img/semItem.png" && player.health < player.maxHealth) {
        $(`#${itemID}`).attr("src", `img/semItem.png`);
        if (itemNum == 28) {
            while (player.health < player.maxHealth && poderPocao < 20) {
                player.health++;
                poderPocao++;
            }
        } else {
            while (player.health < player.maxHealth && poderPocao < 50) {
                player.health++;
                poderPocao++;
            }
        }
        tomou = false;
    }
}

var pontosForca = 0;

function adicionarForca() {
    if (statsPoints > 0) {
        pontosForca++;
        statsPoints--;
        forca += 1;
    }
    $("#pontosHabilidade").html(statsPoints);
    $("#pontosForca").html(pontosForca);
}

var pontosDefesa = 0;

function adicionarDefesa() {
    if (statsPoints > 0) {
        pontosDefesa++;
        statsPoints--;

    }
    if (defesa == 0) {
        defesa = 1;
    } else {
        defesa = Math.round(defesa * 1.2);
    }
    $("#pontosHabilidade").html(statsPoints);
    $("#pontosDefesa").html(pontosDefesa);
}

var pontosVitalidade = 0;

function adicionarVitalidade() {
    if (statsPoints > 0) {
        pontosVitalidade++;
        statsPoints--;
        player.maxHealth = Math.round(player.maxHealth * 1.1);
    }
    $("#pontosHabilidade").html(statsPoints);
    $("#pontosVitalidade").html(pontosVitalidade);
}

function pausar() {
    $('#pausar').click(function () {
        if (game.paused == true) {
            $("#pausar").removeClass('fas fa-play-circle');
            $("#pausar").addClass('fas fa-pause-circle');
            game.paused = false;
        } else {
            $("#pausar").removeClass('fas fa-pause-circle');
            $("#pausar").addClass('fas fa-play-circle');
            game.paused = true;
        }
    })
}

function statusItens() {
    $('.item').hover(function (e) {
        if ($(`#${this.id}`).attr("src") != 'img/semItem.png') {
            var itemNum = $(`#${this.id}`).attr("src");
            itemNum = itemNum.match(/\d+/g);
            $('.statusItens').show();
            $('#statusItens').show();

            capacetes.forEach(capacete => {
                if (itemNum == capacete) {
                    if (capacetes.indexOf(capacete) == 0) {
                        $('#statusItens').html('Defesa: ' + 1);
                    } else {
                        $('#statusItens').html('Defesa: ' + (capacetes.indexOf(capacete) + 1));
                    }

                    if (capacetes.indexOf(capacete) + 1 > defesaCapacete) {
                        $('#statusItens').css("color", "green");
                    } else if (capacetes.indexOf(capacete) + 1 < defesaCapacete) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }

            });

            peitorais.forEach(peitoral => {
                if (itemNum == peitoral) {
                    if (peitorais.indexOf(peitoral) == 0) {
                        $('#statusItens').html('Defesa: ' + 1);
                    } else {
                        $('#statusItens').html('Defesa: ' + (peitorais.indexOf(peitoral) + 1));
                    }

                    if (peitorais.indexOf(peitoral) + 1 > defesaPeitoral) {
                        $('#statusItens').css("color", "green");
                    } else if (peitorais.indexOf(peitoral) + 1 < defesaPeitoral) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }
            });

            luvas.forEach(luva => {
                if (itemNum == luva) {
                    if (luvas.indexOf(luva) == 0) {
                        $('#statusItens').html('Vitalidade: ' + 5);
                    } else {
                        $('#statusItens').html('Vitalidade: ' + luvas.indexOf(luva) * 10);
                    }

                    if (luvas.indexOf(luva) * 10 > vitalidadeLuva) {
                        $('#statusItens').css("color", "green");
                    } else if (luvas.indexOf(luva) * 10 < vitalidadeLuva) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }
            });

            botas.forEach(bota => {
                if (itemNum == bota) {
                    if (botas.indexOf(bota) == 0) {
                        $('#statusItens').html('Defesa: ' + 1);
                    } else {
                        $('#statusItens').html('Defesa: ' + (botas.indexOf(bota) + 1));
                    }

                    if (botas.indexOf(bota) + 1 > defesaBota) {
                        $('#statusItens').css("color", "green");
                    } else if (botas.indexOf(bota) + 1 < defesaBota) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }
            });

            espadas.forEach(espada => {
                if (itemNum == espada) {
                    if (espadas.indexOf(espada) == 0) {
                        $('#statusItens').html('Força: ' + 1)
                    } else {
                        $('#statusItens').html('Força: ' + (espadas.indexOf(espada) + 1));
                    }

                    if (espadas.indexOf(espada) + 1 > forcaEspada) {
                        $('#statusItens').css("color", "green");
                    } else if (espadas.indexOf(espada) + 1 < forcaEspada) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }

            });

            escudos.forEach(escudo => {
                if (itemNum == escudo) {
                    if (escudos.indexOf(escudo) == 0) {
                        $('#statusItens').html('Defesa: ' + 1);
                    } else {
                        $('#statusItens').html('Defesa: ' + (escudos.indexOf(escudo) + 1));
                    }

                    if (escudos.indexOf(escudo) + 1 > defesaEscudo) {
                        $('#statusItens').css("color", "green");
                    } else if (escudos.indexOf(escudo) + 1 < defesaEscudo) {
                        $('#statusItens').css("color", "red");
                    } else {
                        $('#statusItens').css("color", "white");
                    }
                }
            });

            if (itemNum == 28) {
                $('#statusItens').html('Cura : ' + 20);
                $('#statusItens').css("color", "white");
            }
            if (itemNum == 29) {
                $('#statusItens').html('Cura: ' + 50);
                $('#statusItens').css("color", "white");
            }

        }
    }, function () {
        setTimeout(function () {
            $('.statusItens').hide();
            $('#statusItens').hide();
        }, 3000)
    });

    var player = new Player();
    var itns = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    $('#restart').click(function () {
        game.destroy();
        $('#scripts').empty();
        $('#scripts').append(beach);
        $('#reload').show();
        setTimeout(function () {
            game.destroy();
            $('#scripts').empty();
            player.recreate();
            itns.forEach(itne => {
                if ($(`#item${itne}`).attr('src') != 'img/semItem.png') {
                    $(`#item${itne}`).attr('src', 'img/semItem.png');
                }
            });
            $('#item1').attr('src', 'Item/item28.png');
            $('#item2').attr('src', 'Item/item28.png');
            $('#item3').attr('src', 'Item/item29.png');
            $('#scripts').append(beach);
            $('#reload').hide();
            $('#aviso').hide();
            $('#share').hide();
            $('#miniMap').attr('src', './praia/mapBeach.png');
            expTotal = 0;
        }, 150)
    });

    $('#sair').click(function () {
        window.location.href = '/dungeon/index.html';
    })

    $('#rest').click(function () {
        game.destroy();
        $('#scripts').empty();
        $('#scripts').append(beach);
        $('#reload').show();
        setTimeout(function () {
            game.destroy();
            $('#scripts').empty();
            $('#retry').empty();
            $('#retry').append(retry);
            player.recreate();
            itns.forEach(itne => {
                if ($(`#item${itne}`).attr('src') != 'img/semItem.png') {
                    $(`#item${itne}`).attr('src', 'img/semItem.png');
                }
            });
            $('#item1').attr('src', 'Item/item28.png');
            $('#item2').attr('src', 'Item/item28.png');
            $('#item3').attr('src', 'Item/item29.png');
            $('#scripts').append(beach);
            $('#reload').hide();
            $('#aviso').hide();
            $('#miniMap').attr('src', './praia/mapBeach.png');
            $('#share').hide();
            $('#fim').hide();
            expTotal = 0;
        }, 150)
    });

    $('#exit').click(function () {
        window.location.href = '/dungeon/index.html';
    })
}