$(document).ready(function () {
    $("#form").submit(function (e) {
        e.preventDefault();
        var login = $("#login").val();
        $.ajax({
            url: '/dungeon/api/usuario/novaSenha',
            type: "POST",
            data: JSON.stringify({login: login}),
            contentType: 'application/json',
            headers: {"Authorization": sessionStorage.getItem("token")}
        }).done(function (data) {
            $("#msgErro").empty();
            $("#error").removeClass("alert-danger");
            $("#error").addClass("alert-success")
            $("#msgErro").append("E-mail enviado com a nova senha");
            $("#error").show();
        }).fail(function (jqXHR) {
            $("#msgErro").empty();
            $("#error").removeClass("alert-success");
            $("#erro").addClass("alert-danger")
            $("#msgErro").append("Erro ao enviar nova senha");
            $("#error").show();
        }).always(function () {
        });
    });
});