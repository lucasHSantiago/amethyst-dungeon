$(document).ready(function () {
    var userLoged = sessionStorage.getItem("token");

    if (!userLoged) {
        window.location.href = "login.html";
    }

    var token = sessionStorage.getItem("token");
    var claims = JSON.parse(atob(token.split('.')[1]));
    var html = "<li class=\"nav-item\">\n" +
        "<a class=\"nav-link\" href=\"/dungeon/log.html\">Lista de Logs</a>\n" +
        "</li> " +
        "<li class=\"nav-item\">\n" +
        "<a class=\"nav-link\" href=\"/dungeon/listaUsuarios.html\">Lista de Usuarios</a>\n" +
        "</li>"
    if (claims.admin) {
        $('#lista').append(html);
    }
});

