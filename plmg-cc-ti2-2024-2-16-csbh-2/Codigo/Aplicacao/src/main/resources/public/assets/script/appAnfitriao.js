anfitriaoLogado = JSON.parse(localStorage.getItem('anfitriaoLogado'));
const anfitriaoId = anfitriaoLogado.id; // ID do anfitrião para o qual você deseja obter os projetos
console.log(anfitriaoLogado);

// Função para obter os projetos associados a um anfitrião específico
async function obterProjetosDoAnfitriao(anfitriaoId) {
    const projetos = await fetch(`http://localhost:6789/projeto/anfitriao/${anfitriaoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar projetos.');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro ao buscar projetos:', error);
            return []; 
        });
    return projetos;
}

// Função para preencher dinamicamente o HTML com as informações dos projetos do anfitrião
async function preencherProjetosNoHTML() {
    try {
        const projetos = await obterProjetosDoAnfitriao(anfitriaoId);
        console.log(projetos);
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
            const cardElement = cardClone.getElementById('cardCompleto');
            if(projeto.tipo == "Voluntariado"){
                cardElement.querySelector(".card-link").href = `cardVolunt.html?id=${projeto.id}`
            }
            else if(projeto.tipo == "Doação"){
                cardElement.querySelector(".card-link").href = `cardDoacao.html?id=${projeto.id}`
            }else{
                cardElement.querySelector(".card-link").href = `cardFinanceiro.html?id=${projeto.id}`
            }
            const temas = JSON.parse(projeto.temas);
            const temasFormatados = temas.join(", ");
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
            cardElement.querySelector(".temas").innerHTML = `<strong>Temas:</strong> ${temasFormatados}`;
            cardClone.querySelector(".resumo").innerHTML = `<strong>Descrição:</strong> ${projeto.descricao}`;
            
            // Adicionar evento de clique para o botão de excluir
            const btnExcluir = cardElement.querySelector("#btnExcluir");
            const btnEditar = cardElement.querySelector("#btnEditar");
            btnExcluir.addEventListener('click', async () => {
                await excluirProjeto(projeto.id);
                cardElement.style.display = 'none';
            });
            btnEditar.addEventListener('click', async () => {
                window.location.href=`atualizarProjeto.html?id=${projeto.id}`
            });
            console.log(cardClone);
            return cardClone;
        }
    } catch (error) {
        console.error('Erro ao preencher projetos no HTML:', error);
    }
}

// Função para excluir um projeto
async function excluirProjeto(projetoId) {
    const confirmacao = confirm("Tem certeza que deseja deletar este projeto?");
    
    if (!confirmacao) return; // Se o usuário cancelar, não prossegue

    try {
        const response = await fetch(`http://localhost:6789/projeto/delete/${projetoId}`, {
            method: 'GET', // Conforme sua rota usa GET para deletar
        });

        if (response.ok) {
            document.getElementById("erro").innerHTML = `<p>Projeto deletado com sucesso!</p>`;
            setTimeout(() => {
                erro.innerHTML = '';
            }, 1200);
            // Atualize a interface ou redirecione após a deleção
            window.location.reload();
        } else {
            alert('Erro ao deletar projeto. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        alert('Erro ao deletar projeto. Tente novamente.');
    }
}
// Chamar a função para preencher os projetos no carregamento da página
window.addEventListener('load', () => {
    preencherProjetosNoHTML();
});
