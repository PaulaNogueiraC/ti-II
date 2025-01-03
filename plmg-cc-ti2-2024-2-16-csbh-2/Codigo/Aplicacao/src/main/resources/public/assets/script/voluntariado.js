const temasInput = document.querySelectorAll(".temaInput");
const regiaoInput = document.querySelectorAll(".regiaoInput");
const diaInput = document.querySelectorAll(".diaInput");
const periodoInput = document.querySelectorAll(".periodoInput");
let filtrosTema = [];
let filtrosRegiao = [];
let filtrosDia = [];
let filtrosPeriodo = [];

const temValoresEmComum = (array1, array2) =>
  array1.some((item) => array2.includes(item));

const aplicarFiltros = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    console.log(card.querySelector(".regiao"))
    console.log(card.querySelector(".temas"))
    const temas = card
      .querySelector(".temas")
      .textContent.toLowerCase()
      .slice(6)
      .trim()
      .split(", ");
      console.log(temas)
    const regiao = card
      .querySelector(".regiao")
      .textContent.toLowerCase()
      .slice(7)
      .trim()
      .split(", ");
      console.log(regiao)
    const dias = card
      .querySelector(".dias")
      .textContent.toLowerCase()
      .slice(5)
      .trim()
      .split(", ");

    const periodos = card
      .querySelector(".periodos")
      .textContent.toLowerCase()
      .slice(9)
      .trim()
      .split(", ");

    const mostrarPorTema =
      filtrosTema.length === 0 || temValoresEmComum(temas, filtrosTema);
    const mostrarPorRegiao =
      filtrosRegiao.length === 0 || temValoresEmComum(regiao, filtrosRegiao);
    const mostrarPorDia =
      filtrosDia.length === 0 || temValoresEmComum(dias, filtrosDia);
    const mostrarPorPeriodos =
      filtrosPeriodo.length === 0 ||
      temValoresEmComum(periodos, filtrosPeriodo);

    if (
      mostrarPorTema &&
      mostrarPorRegiao &&
      mostrarPorDia &&
      mostrarPorPeriodos
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

temasInput.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      filtrosTema.push(event.target.value.toLowerCase());
    } else {
      filtrosTema = filtrosTema.filter(
        (tema) => tema !== event.target.value.toLowerCase()
      );
    }
    aplicarFiltros();
  });
});

regiaoInput.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      filtrosRegiao.push(event.target.value.toLowerCase());
    } else {
      filtrosRegiao = filtrosRegiao.filter(
        (regiao) => regiao !== event.target.value.toLowerCase()
      );
    }
    aplicarFiltros();
  });
});

diaInput.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      filtrosDia.push(event.target.value.toLowerCase());
    } else {
      filtrosDia = filtrosDia.filter(
        (dias) => dias != event.target.value.toLowerCase()
      );
    }
    aplicarFiltros();
  });
});

periodoInput.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      filtrosPeriodo.push(event.target.value.toLowerCase());
    } else {
      filtrosPeriodo = filtrosPeriodo.filter(
        (periodos) => periodos != event.target.value.toLowerCase()
      );
    }
    aplicarFiltros();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar e exibir os cards dos projetos
  async function carregarProjetos() {
    try {
        const response = await fetch("http://localhost:6789/projeto/list/Voluntariado");
        const projetos = await response.json();
        const cardsContainer = document.getElementById("cards-container");

        for (const projeto of projetos) {
            const card = await criarCard(projeto); // Espera a criação do card
            cardsContainer.appendChild(card); // Adiciona ao container
        }
    } catch (error) {
        console.error("Erro ao carregar projetos:", error);
    }
}

  // Função para criar um card com os dados de um projeto
  async function criarCard(projeto) {
    // Obter o template do card
    const template = document.getElementById("card-template");

    // Criar uma cópia do template
    const cardClone = document.importNode(template.content, true);

    // Preencher os elementos do card com os dados do projeto
    cardClone.querySelector(".card-link").href = `cardVolunt.html?id=${projeto.id}`
    cardClone.querySelector(".projtitulo").textContent = projeto.nome;
    cardClone.querySelector(".projimagem").src = projeto.imagem;
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
    const dias = JSON.parse(projeto.dias);
    const diasFormatados = dias.join(", ");
    const regiao = JSON.parse(projeto.regiao);
    const regiaoFormatados = regiao.join(", ");
    const temas = JSON.parse(projeto.temas);
    const temasFormatados = temas.join(", ");
    const periodo = JSON.parse(projeto.periodo);
    const periodoFormatados = periodo.join(", ");

    cardClone.querySelector(".temas").innerHTML = `<strong>Temas:</strong> ${temasFormatados}`;
    cardClone.querySelector(".regiao").innerHTML = `<strong>Região:</strong> ${regiaoFormatados}`;
    cardClone.querySelector(".dias").innerHTML = `<strong>Dias:</strong> ${diasFormatados}`;
    cardClone.querySelector(".periodos").innerHTML = `<strong>Periodos:</strong> ${periodoFormatados}`;
    cardClone.querySelector(".resumo").innerHTML = `<strong>Descrição:</strong> ${projeto.descricao}`;
    
    return cardClone;
  }

  // Função para buscar projetos com base no texto digitado
  function buscarProjetos() {
    const searchText = normalizeText(
      document.getElementById("search").value.toLowerCase()
    );
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const titulo = normalizeText(card.querySelector(".projtitulo").textContent.toLowerCase());
      const anfitriao = normalizeText(card.querySelector(".anfitriao").textContent.toLowerCase());
      const temas = normalizeText(card.querySelector(".temas").textContent.toLowerCase());
      const resumo = normalizeText(card.querySelector(".resumo").textContent.toLowerCase());

      if (titulo.includes(searchText) || anfitriao.includes(searchText) || temas.includes(searchText) || resumo.includes(searchText)) 
      {
        card.style.display = "block";
      } 
      else {
        card.style.display = "none";
      }
    });
  }

  // Função para normalizar caracteres, removendo acentos e caracteres especiais
  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  var menuTuggle = document.getElementById("menuTuggle");
  var filtroTuggle = document.getElementById("filtroTuggle");

  menuTuggle.addEventListener("change", function() {
      if (menuTuggle.checked) {
          filtroTuggle.checked = false;
      }
    });

  filtroTuggle.addEventListener("change", function() {
      if (filtroTuggle.checked) {
          menuTuggle.checked = false;
      }
  });

  // Adicionar um listener para o evento de input no campo de busca
  document.getElementById("search").addEventListener("input", buscarProjetos);

  // Chamada para carregar os projetos ao carregar a página
  carregarProjetos();
});
