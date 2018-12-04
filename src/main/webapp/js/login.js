$(document).ready(function () {

    $("#form").submit(function (e) {
        e.preventDefault();
        var login = $("#login").val();
        var password = $("#password").val();
        $.ajax({
            url: '/dungeon/api/login',
            type: "POST",
            data: JSON.stringify({login: login, senha: password}),
            contentType: 'application/json'
        }).done(function (data) {
            sessionStorage.setItem("token", data.token);
            window.location.replace("/dungeon/menu.html");
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#msgErro").empty();
            $("#error").removeClass("alert-success");
            $("#error").addClass("alert-danger")
            $("#msgErro").append(jqXHR.responseJSON.message);
            $("#error").show();
        });

    });

});