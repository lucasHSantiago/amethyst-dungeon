$(document).ready(buscarDados());

function gerarTabela(logs) {
    var html = '<table class="table table-striped table-purple-light"><thead><tr class="text-light listaUsuarios"><th scope="col">Nome</th><th scope="col">Data</th></tr></thead><tbody class="text-light listaUsuarios">';
    $.each(logs, function (t, log) {
        html += '<tr>' +
            '<td>' + log.usuario.nome + '</td>' +
            '<td>' + log.acesso + '</td>'
        '</tr>';
    });
    html += '</tbody></table>';
    $('#logs').empty();
    $('#logs').append(html);
}

function buscarDados() {
    $.ajax({
        url: "/dungeon/api/log",
        type: 'GET',
        contentType: 'application/json',
        headers: {"Authorization": sessionStorage.getItem("token")}
    }).done(function (data) {
        gerarTabela(data)
    }).fail(function () {
        console.log("Erro ao buscar logs");
    });
}