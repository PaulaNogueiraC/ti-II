usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const usuarioId = usuarioLogado.id; // ID do anfitrião para o qual você deseja obter os projetos

// Função para obter os projetos associados a um anfitrião específico
async function obterFavoritosDoUsuario(usuarioId) {
    try {
        const response = await fetch(`http://localhost:6789/favorito/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor.');
        }
        const projetos = await response.json();

        return projetos;
    } catch (error) {
        console.error('Erro ao obter favoritos do usuario:', error);
        return [];
    }
}

// Função para preencher dinamicamente o HTML com as informações dos projetos do anfitrião
async function preencherProjetosNoHTML() {
    try {
        const projetos = await obterFavoritosDoUsuario(usuarioId);

        const cardsContainer = document.getElementById("cards-container");
        const semCards = document.getElementById("semCards");

        // Verificar se há projetos
        if (projetos.length === 0) {
            semCards.style.display = 'block';
        } else {
            semCards.style.display = 'none';
        }
        // Para cada projeto, criar e adicionar um elemento HTML com suas informações
        for (const projeto of projetos) {
            const card = await criarCard(projeto); // Espera a criação do card
            cardsContainer.appendChild(card); // Adiciona ao container
        }
        

        async function criarCard(projeto) {
            // Obter o template do card
            const template = document.getElementById("card-template");
        
            // Criar uma cópia do template
            const cardClone = document.importNode(template.content, true);
        
            const cardElement = cardClone.querySelector('#cardCompleto');
            if(projeto.tipo == "Voluntariado"){
                cardElement.querySelector(".card-link").href = `cardVolunt.html?id=${projeto.id}`
            }
            else if(projeto.tipo == "Doação"){
                cardElement.querySelector(".card-link").href = `cardDoacao.html?id=${projeto.id}`
            }else{
                cardElement.querySelector(".card-link").href = `cardFinanceiro.html?id=${projeto.id}`
            }
            cardElement.querySelector(".projtitulo").textContent = projeto.nome;
            cardElement.querySelector(".projimagem").src = projeto.imagem;
            try {
                const response = await fetch(`http://localhost:6789/anfitriao/${projeto.idAnfitriao}`);
                if (response.ok) {
                    const anfitriao = await response.json(); // Esperar pela resposta e convertê-la para JSON
                    cardClone.querySelector(".anfitriao").innerHTML = `<strong>Anfitrião:</strong> ${anfitriao.nome}`;
                } else {
                    console.error('Erro ao buscar dados do anfitrião:', response.statusText);
                    cardClone.querySelector(".anfitriao").innerHTML = `<strong>Anfitrião:</strong> Informação indisponível`;
                }
            } catch (error) {
                console.error('Erro ao buscar dados do anfitrião:', error);
                cardClone.querySelector(".anfitriao").innerHTML = `<strong>Anfitrião:</strong> Erro ao carregar`;
            }
            const temas = JSON.parse(projeto.temas);
            const temasFormatados = temas.join(", ");
            cardElement.querySelector(".temas").innerHTML = `<strong>Temas:</strong> ${temasFormatados}`;
            cardClone.querySelector(".resumo").innerHTML = `<strong>Descrição:</strong> ${projeto.descricao}`;
            
            // Adicionar evento de clique para o botão de excluir
            const btnExcluir = cardElement.querySelector("#btnExcluir");
            btnExcluir.addEventListener('click', async () => {
                await retirarFavorito(usuarioId, projeto.id);
                cardElement.style.display = 'none';
            });


            return cardClone;
        }
    } catch (error) {
        console.error('Erro ao preencher projetos no HTML:', error);
    }
}

// Função para excluir um projeto
async function retirarFavorito(usuarioId, projetoId) {
    try {
        const response = await fetch(`http://localhost:6789/favorito/delete/${usuarioId}/${projetoId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Erro ao remover favorito.');
        }

        alert('Favorito removido com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao remover favorito.');
    }
}

// Função para obter os selecionados de um projeto
function obterSelecionados(opcoes) {
    const Selecionados = opcoes
      .map((opcao) => opcao.nome)
      .join(", ");
    return Selecionados;
}

// Chamar a função para preencher os projetos no carregamento da página
window.addEventListener('load', () => {
    preencherProjetosNoHTML();
});
