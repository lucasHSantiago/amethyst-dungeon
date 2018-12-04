$(document).ready(buscarDados());

function gerarTabela(scores) {
    var html = '<table class="table table-hover table-striped table-purple-light"><thead><tr class="text-light listaUsuarios"><th scope="col">Posição</th><th scope="col">Usuario</th><th scope="col">Score</th></tr></thead><tbody class="text-light listaUsuarios">';
    $.each(scores, function(t, score) {
        html += '<tr>' +
            '<td>' + score.colocacao + '</td>' +
            '<td>' + score.usuario.nome + '</td>' +
            '<td>' + score.score + '</td>'
        '</tr>';
    });
    html += '</tbody></table>';
    $('#rank').empty();
    $('#rank').append(html);
}

function buscarDados() {
    $.ajax({
        url: "/dungeon/api/score/listar",
        dataType: 'json',
        type: 'GET',
        headers: {"Authorization": sessionStorage.getItem("token")}
    }).done(function(data) {
        gerarTabela(data)
    }).fail(fail);
}

function fail(jqXHR, textStatus) {
    console.log('Status: ' + textStatus.toString());
    console.log('jqXHR: ' + jqXHR.toString());
}