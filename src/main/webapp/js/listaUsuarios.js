$(document).ready(buscarDados());

function gerarTabela(usuarios) {
    var html = '<table class="table table-striped table-purple-light"><thead><tr class="text-light listaUsuarios"><th scope="col">Nome</th><th scope="col">Login</th><th scope="col">E-mail</th></tr></thead><tbody class="text-light listaUsuarios">';
    $.each(usuarios, function (t, usuario) {
        html += '<tr>' +
            '<td>' + usuario.nome + '</td>' +
            '<td>' + usuario.login + '</td>' +
            '<td>' + usuario.email + '</td>'
        '</tr>';
    });
    html += '</tbody></table>';
    $('#rank').empty();
    $('#rank').append(html);
}

function buscarDados() {
    $.ajax({
        url: "/dungeon/api/usuario",
        dataType: 'json',
        type: 'GET',
        headers: {"Authorization": sessionStorage.getItem("token")}
    }).done(function (data) {
        gerarTabela(data)
    }).fail(fail);
}

function fail(jqXHR, textStatus) {
    console.log('Status: ' + textStatus);
    console.log('jqXHR: ' + jqXHR);
}