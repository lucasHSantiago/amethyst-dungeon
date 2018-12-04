$(document).ready(function () {
    var userLog = sessionStorage.getItem("token");
    var navHtml = '<li class="nav-item"><a class="nav-link" href="/dungeon/menu.html">Menu</a></li>';
    var sair = '<button type="button" class="btn btn-outline-warning" id="logout">Sair</button>';

    if (userLog) {
        $('#lista').append(navHtml);
        $('#navBar').append(sair);

        $('#logout').click(function () {
            sessionStorage.removeItem("token");
            window.location.href = "index.html";
        });
    }
});