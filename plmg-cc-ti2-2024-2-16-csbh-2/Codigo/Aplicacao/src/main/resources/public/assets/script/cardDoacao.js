let parametros = new URLSearchParams(window.location.search);
let idProjeto = parametros.get("id");
console.log(idProjeto);


usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

async function verificarUsuarioLogado() {
    if(usuarioLogado){
        const idUsuario = usuarioLogado.id;
        const response = await fetch(`http://localhost:6789/favorito/${idUsuario}/${idProjeto}`);
        if (response.status == 404) {
            console.log("Projeto ainda nao favoritado");
            document.getElementById('btnFav').disabled = false;
            document.getElementById('btnFav').addEventListener('click', function () {
                favoritarProjeto(idUsuario, idProjeto);
            });
        }
        else{
            document.getElementById('btnFav').addEventListener('click', function () {
                alert('Este projeto já está nos seus favoritos');
                document.getElementById('btnFav').disabled = true;
            });
        }
    } else {
        document.getElementById('btnFav').addEventListener('click', function () {
            document.getElementById("erroLog").innerHTML = `Para favoritar um projeto é preciso estar logado como voluntário.`;
            setTimeout(() => {
                erroLog.innerHTML = '';
            }, 1200);
            document.getElementById('btnFav').disabled = true;
        });
    }
}

async function favoritarProjeto(idUsuario, idProjeto) {
    const dados = {
        idVoluntario: idUsuario,
        idProjeto: idProjeto
    };
    console.log(dados);
    try {
        const response = await fetch(`http://localhost:6789/favorito/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'   
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            document.getElementById("erroLog").innerHTML = `Projeto favoritado com sucesso.`;
            setTimeout(() => {
                erroLog.innerHTML = '';
            }, 1200);
            document.getElementById('btnFav').disabled = true;
        } else {
            alert('Erro ao adicionar o projeto aos favoritos.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro inesperado ao favoritar o projeto.');
    }
}

fetch(`http://localhost:6789/projeto/${idProjeto}`)
    .then(res => res.json())
    .then(data => {
        if (data) {
            let projeto = data;
            console.log(projeto);
            const dias = JSON.parse(projeto.dias);
            const diasFormatados = dias.join(", ");
            document.getElementById('titulo').innerHTML = projeto.nome;
            document.getElementById('imagem').src = projeto.imagem;
            document.getElementById('descricao').innerHTML = `<strong>Descrição do Projeto: </strong>` + projeto.descricao;
            document.getElementById('horario').innerHTML = `<strong>Horário: </strong>` + projeto.horario;
            document.getElementById('localizacao').innerHTML = `<strong>Localização: </strong>` + projeto.local;
            document.getElementById('dias').innerHTML = `<strong>Dias: </strong>` + diasFormatados;
            return fetch(`http://localhost:6789/anfitriao/${projeto.idAnfitriao}`)
                .then(res => res.json())
                .then(anfitriao => {
                    document.getElementById('anfitriao').innerHTML = `<strong>Anfitrião: </strong>` + anfitriao.nome;
                    document.getElementById('infoAnfitriao').innerHTML = `<strong>Informações do Anfitrião: </strong>` + anfitriao.info;
                    document.getElementById('contato').innerHTML = `<strong>Contato: </strong>` + anfitriao.email;
                });
        } else {
            console.error(`Doação com ID ${id} não encontrado.`);
        }
    })
    .catch(err => console.error('Erro ao buscar doações:', err));

// Função auxiliar para obter dias selecionados
function obterSelecionados(opcoes) {
    const selecionados = opcoes.map(opcao => opcao.nome).join(", ");
    return selecionados;
}
