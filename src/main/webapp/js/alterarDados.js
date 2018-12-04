$(document).ready(function () {
    buscarUsuario();
    alterarDados();
});

function alterarDados() {
    $("#form").submit(function (e) {
        e.preventDefault();
        var token = sessionStorage.getItem("token");
        var claims = JSON.parse(atob(token.split('.')[1]))
        var usuario = new Object();
        usuario.id = claims.id;
        usuario.nome = $("#name").val();
        usuario.email = $("#email").val();
        usuario.nascimento = $("#datebirth").val();
        usuario.login = claims.login;
        usuario.senha = $("#password").val();
        $.ajax({
            url: '/dungeon/api/usuario',
            type: "PUT",
            data: JSON.stringify(usuario),
            contentType: 'application/json',
            headers: {"Authorization": sessionStorage.getItem("token")}
        }).done(function (data, textStatus, jqXHR) {
            $("#msgErro").empty();
            $("#error").removeClass("alert alert-danger");
            $("#error").addClass("alert alert-success");
            $("#msgErro").append("Usuário alterado com sucesso");
            $("#error").show();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#success").hide();
            $("#msgErro").empty();
            $("#error").removeClass("alert alert-success");
            $("#error").addClass("alert alert-danger");
            $("#msgErro").append(jqXHR.responseJSON.message);
            $("#error").show();
        });
    });
}

function mostrarDados(usuario) {
    $("#name").val(usuario.nome);
    $("#email").val(usuario.email);
    $("#datebirth").val(usuario.nascimento);
    $("#login").val(usuario.login);
}

function buscarUsuario() {
    var token = sessionStorage.getItem("token");
    var claims = JSON.parse(atob(token.split('.')[1]));
    $.ajax({
        url: "/dungeon/api/usuario/login/" + claims.login,
        dataType: 'json',
        type: 'GET',
        headers: {"Authorization": sessionStorage.getItem("token")}
    }).done(function (data) {
        mostrarDados(data);
    }).fail(function (jqXHR) {
        $("#msgErro").empty();
        $("#error").removeClass("alert-success");
        $("#error").addClass("alert alert-danger");
        $("#msgErro").append(jqXHR.responseJSON.message);
        $("#error").show();
    });
}