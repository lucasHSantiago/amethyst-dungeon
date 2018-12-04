$(document).ready(function () {
    var userLoged = sessionStorage.getItem("token");

    if (!userLoged) {
        window.location.href = "../../";
    }
});

