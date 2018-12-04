$(document).ready(function () {

    $("#form").submit(function (e) {
        e.preventDefault();
        var usuario = new Object();
        usuario.nome = $("#name").val();
        usuario.email = $("#email").val();
        usuario.nascimento = $("#datebirth").val();
        usuario.login = $("#login").val();
        usuario.senha = $("#password").val();
        $.ajax({
            url: '/dungeon/api/usuario/cadastrar',
            type: "POST",
            data: JSON.stringify(usuario),
            contentType: 'application/json',
        }).done(function (data) {
            sessionStorage.setItem("token", data.token);
            window.location.replace("/dungeon/login.html");
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#msgErro").empty();
            $("#error").removeClass("alert-success");
            $("#error").addClass("alert-danger")
            $("#msgErro").append(jqXHR.responseJSON.message);
            $("#error").show();
        });

    });

});