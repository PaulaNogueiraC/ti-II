async function carregarProjeto() {
    const parametros = new URLSearchParams(window.location.search);
    const idProjeto = parametros.get("id");
    try {
        const response = await fetch(`http://localhost:6789/projeto/${idProjeto}`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const projeto = await response.json();
        return projeto;
    } catch (error) {
        console.error("Erro ao carregar o projeto:", error);
    }
}
async function carregarFormulario() {
    try {
        const projeto = await carregarProjeto()
        console.log(projeto);
        if (projeto){
            if(projeto.tipo == "Voluntariado"){
                document.getElementById("project-form").innerHTML = `<h1>Atualizar Projeto</h1>
                <div class="input-box">
                    <label for="nome">Nome do Projeto:</label><br>
                    <input type="text" placeholder="Carregando..." id="nome" name="nome"><br>
                </div>

                <div class="input-box">
                    <label for="temas">Temas:</label><br>
                    <input type="checkbox" name="temas" value="Idosos"> Idosos<br>
                    <input type="checkbox" name="temas" value="Animais"> Animais<br>
                    <input type="checkbox" name="temas" value="Hospitais"> Hospitais<br>
                    <input type="checkbox" name="temas" value="Crianças"> Crianças<br>
                    <input type="checkbox" name="temas" value="Pessoas e famílias necessitadas"> Pessoas e famílias necessitadas<br>
                    <input type="checkbox" name="temas" value="Ambientais"> Ambientais<br>
                    <input type="checkbox" name="temas" value="Educacionais"> Educacionais<br>
                </div>

                <div class="input-box">
                    <label for="regiao">Região:</label><br>
                    <input type="checkbox" name="regiao" value="Região Centro-Sul"> Região Centro-Sul<br>
                    <input type="checkbox" name="regiao" value="Região Leste"> Região Leste<br>
                    <input type="checkbox" name="regiao" value="Região Nordeste"> Região Nordeste<br>
                    <input type="checkbox" name="regiao" value="Região Noroeste"> Região Noroeste<br>
                    <input type="checkbox" name="regiao" value="Região Norte"> Região Norte<br>
                    <input type="checkbox" name="regiao" value="Região Oeste"> Região Oeste<br>
                    <input type="checkbox" name="regiao" value="Região Pampulha"> Região Pampulha<br>
                    <input type="checkbox" name="regiao" value="Região Barreiro"> Região Barreiro<br>
                    <input type="checkbox" name="regiao" value="Venda Nova"> Venda Nova<br>
                </div>
                <div id="mostrarImagem">
                    <label for="mostrarImagem">Imagem Atual:</label><br>
                    <img src="" alt="Imagem do projeto" id="imagemProjeto">
                </div>
                <div class="input-box">
                    <label for="imagem">Alterar Imagem:</label><br>
                    <input type="file" id="imagem" name="imagem" multiple><br>
                </div>

                <div class="input-box">
                    <label for="descricao">Descrição:</label><br>
                    <textarea id="descricao" placeholder="Carregando..." name="descricao"></textarea><br>
                </div>

                <div class="input-box">
                    <label for="local">Localização:</label><br>
                    <input type="text" placeholder="Carregando..." id="local" name="local"><br>
                </div>

                <div class="input-box">
                    <label for="dias">Dias Disponíveis:</label><br>
                    <input type="checkbox" name="dias" value="Segunda-Feira"> Segunda-Feira<br>
                    <input type="checkbox" name="dias" value="Terça-Feira"> Terça-Feira<br>
                    <input type="checkbox" name="dias" value="Quarta-Feira"> Quarta-Feira<br>
                    <input type="checkbox" name="dias" value="Quinta-Feira"> Quinta-Feira<br>
                    <input type="checkbox" name="dias" value="Sexta-Feira"> Sexta-Feira<br>
                    <input type="checkbox" name="dias" value="Sábado"> Sábado<br>
                    <input type="checkbox" name="dias" value="Domingo"> Domingo<br>
                </div>

                <div class="input-box">
                    <label for="horario">Horário:</label><br>
                    <input type="text" placeholder="Carregando..." id="horario" name="horario"><br>
                </div>

                <div class="input-box">
                    <label for="periodo">Período:</label><br>
                    <input type="checkbox" name="periodo" value="Manhã"> Manhã<br>
                    <input type="checkbox" name="periodo" value="Tarde"> Tarde<br>
                    <input type="checkbox" name="periodo" value="Noite"> Noite<br>
                </div>

                <button type="button" class="button" onclick="atualizarDados()">Enviar</button>
                <div id="erro"></div>
                `
            }
        else if(projeto.tipo == "Doação"){
            document.getElementById("project-form").innerHTML = `<h1>Atualizar Projeto</h1>
                    <div class="input-box">
                        <label for="nome">Nome da Campanha:</label><br>
                        <input type="text" placeholder="Carregando..." id="nome" name="nome"><br>
                    </div>

                    <div class="input-box">
                        <label for="temas">Temas:</label><br>
                        <input type="checkbox" name="temas" value="Idosos"> Idosos<br>
                        <input type="checkbox" name="temas" value="Animais"> Animais<br>
                        <input type="checkbox" name="temas" value="Hospitais"> Hospitais<br>
                        <input type="checkbox" name="temas" value="Crianças"> Crianças<br>
                        <input type="checkbox" name="temas" value="Pessoas e famílias necessitadas"> Pessoas e famílias necessitadas<br>
                        <input type="checkbox" name="temas" value="Ambientais"> Ambientais<br>
                        <input type="checkbox" name="temas" value="Educacionais"> Educacionais<br>
                    </div>

                    <div class="input-box">
                        <label for="regiao">Região:</label><br>
                        <input type="checkbox" name="regiao" value="Região Centro-Sul"> Região Centro-Sul<br>
                        <input type="checkbox" name="regiao" value="Região Leste"> Região Leste<br>
                        <input type="checkbox" name="regiao" value="Região Nordeste"> Região Nordeste<br>
                        <input type="checkbox" name="regiao" value="Região Noroeste"> Região Noroeste<br>
                        <input type="checkbox" name="regiao" value="Região Norte"> Região Norte<br>
                        <input type="checkbox" name="regiao" value="Região Oeste"> Região Oeste<br>
                        <input type="checkbox" name="regiao" value="Região Pampulha"> Região Pampulha<br>
                        <input type="checkbox" name="regiao" value="Região Barreiro"> Região Barreiro<br>
                        <input type="checkbox" name="regiao" value="Venda Nova"> Venda Nova<br>
                    </div>
                    <div id="mostrarImagem">
                        <label for="mostrarImagem">Imagem Atual:</label><br>
                        <img src="" alt="Imagem do projeto" id="imagemProjeto">
                    </div>
                    <div class="input-box">
                        <label for="imagem">Alterar Imagem:</label><br>
                        <input type="file" id="imagem" name="imagem" multiple><br>
                    </div>

                    <div class="input-box">
                        <label for="descricao">Descrição:</label><br>
                        <textarea id="descricao" placeholder="Carregando..." name="descricao"></textarea><br>
                    </div>

                    <div class="input-box">
                        <label for="localizacao">Local de Entrega (ou informe se prefere recolhimento "a domicílio"):</label><br>
                        <input type="text" placeholder="Carregando..." id="local" name="local"><br>
                    </div>

                    <div class="input-box">
                        <label for="dias">Dias Disponíveis para Entrega:</label><br>
                        <input type="checkbox" name="dias" value="Segunda-Feira"> Segunda-Feira<br>
                        <input type="checkbox" name="dias" value="Terça-Feira"> Terça-Feira<br>
                        <input type="checkbox" name="dias" value="Quarta-Feira"> Quarta-Feira<br>
                        <input type="checkbox" name="dias" value="Quinta-Feira"> Quinta-Feira<br>
                        <input type="checkbox" name="dias" value="Sexta-Feira"> Sexta-Feira<br>
                        <input type="checkbox" name="dias" value="Sábado"> Sábado<br>
                        <input type="checkbox" name="dias" value="Domingo"> Domingo<br>
                    </div>

                    <div class="input-box">
                        <label for="horario">Horário de Entrega:</label><br>
                        <input type="text" placeholder="Carregando..." id="horario" name="horario"><br>
                    </div>

                    <div class="input-box">
                        <label for="periodo">Período:</label><br>
                        <input type="checkbox" name="periodo" value="Manhã"> Manhã<br>
                        <input type="checkbox" name="periodo" value="Tarde"> Tarde<br>
                        <input type="checkbox" name="periodo" value="Noite"> Noite<br>
                    </div>

                    <button type="button" class="button" onclick="atualizarDados()">Enviar</button>
                    <div id="erro"></div>
                    `

        }
        else{
            document.getElementById("project-form").innerHTML = `<h1>Atualizar Projeto</h1>
                    <div class="input-box">
                        <label for="nome">Nome da Campanha:</label> <br>
                        <input type="text" placeholder="Carregando..." id="nome" name="nome"><br>
                    </div>

                    <div class="input-box">
                        <label for="temas">Temas:</label><br>
                        <input type="checkbox" name="temas" value="Idosos"> Idosos<br>
                        <input type="checkbox" name="temas" value="Animais"> Animais<br>
                        <input type="checkbox" name="temas" value="Hospitais"> Hospitais<br>
                        <input type="checkbox" name="temas" value="Crianças"> Crianças<br>
                        <input type="checkbox" name="temas" value="Pessoas e famílias necessitadas"> Pessoas e famílias necessitadas<br>
                        <input type="checkbox" name="temas" value="Ambientais"> Ambientais<br>
                        <input type="checkbox" name="temas" value="Educacionais"> Educacionais<br>
                    </div>
                    <div id="mostrarImagem">
                        <label for="mostrarImagem">Imagem Atual:</label><br>
                        <img src="" alt="Imagem do projeto" id="imagemProjeto">
                    </div>
                    <div class="input-box">
                        <label for="imagem">Alterar Imagem:</label><br>
                        <input type="file" id="imagem" name="imagem" multiple><br>
                    </div>

                    <div class="input-box">
                        <label for="descricao">Descrição:</label><br>
                        <textarea id="descricao" placeholder="Carregando..." name="descricao"></textarea><br>
                    </div>

                    <div class="input-box">
                        <label for="infoBancaria">Informações Bancárias:</label><br>
                        <input type="text" id="infoBancaria" placeholder="Carregando..." name="ibancarias"><br>
                    </div>

                    <button type="button" class="button" onclick="atualizarDados()">Enviar</button>
                    <div id="erro"></div>
                    `;

            document.querySelector('.page').style.marginTop = '400px';
            document.querySelector('.page').style.marginBottom = '300px';
        }

        document.getElementById('descricao').value = projeto.descricao; 
        document.getElementById('nome').value = projeto.nome; 
        document.getElementById('imagemProjeto').src = projeto.imagem;
        if (document.getElementById('local')) document.getElementById('local').value = projeto.local; 
        if (document.getElementById('horario')) document.getElementById('horario').value = projeto.horario; 
        if (document.getElementById('infoBancaria')) document.getElementById('infoBancaria').value = projeto.ibancarias; 
        
        const form = document.getElementById('project-form');
        const checkboxTemas = form.querySelectorAll('input[name="temas"]');

        checkboxTemas.forEach(checkbox => {
            if (projeto.temas.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
        if(form.querySelectorAll('input[name="regiao"]')){
            const checkboxRegiao = form.querySelectorAll('input[name="regiao"]');

            checkboxRegiao.forEach(checkbox => {
                if (projeto.regiao.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }

        if(form.querySelectorAll('input[name="dias"]')){
            const checkboxDias = form.querySelectorAll('input[name="dias"]');

            checkboxDias.forEach(checkbox => {
                if (projeto.dias.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }
        if(form.querySelectorAll('input[name="periodo"]')){
            const checkboxPeriodos = form.querySelectorAll('input[name="periodo"]');

            checkboxPeriodos.forEach(checkbox => {
                if (projeto.periodo.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }
    }
    } catch (error) {
        console.error("Erro ao carregar o projeto:", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    carregarFormulario();
});
const CLOUD_NAME = "drovsbi3q";  // Nome do seu Cloud
const UPLOAD_PRESET = "minha_imagem_presets";  // Nome do seu upload preset

async function enviarFoto(foto) {
    const formFoto = new FormData();
    formFoto.append('file', foto);  // Correção do erro de digitação
    formFoto.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formFoto
        });

        if (response.ok) {
            const data = await response.json();
            console.log('URL da imagem:', data.secure_url);
            return data.secure_url;
        } else {
            const errorData = await response.json();
            console.error('Erro no upload:', errorData);  // Exibe o erro detalhado
            throw new Error('Erro no upload!');
        }
    } catch (error) {
        console.error('Erro no processo de upload:', error);
        return null;  // Garantir que a URL da imagem seja nula se houver erro
    }
}
async function atualizarDados(){
    const projeto = await carregarProjeto()
    const form = document.getElementById('project-form');
    const fotos = document.getElementById('imagem');
    const foto = fotos.files[0];
    let urlImagem;
    if(fotos && foto){
        urlImagem = await enviarFoto(foto);
        if (!urlImagem) {
            console.error('Erro ao obter a URL da imagem. Dados não enviados.');
            urlImagem = "/assets/imagens/placeholder_projetos.png";
        }
    }
    else{
        urlImagem = projeto.imagem;
    }
    const temasSelecionados = [];
    let checkboxes = form.querySelectorAll('input[name="temas"]:checked');
    checkboxes.forEach(checkbox => {
        temasSelecionados.push(checkbox.value);  // Adiciona o valor do checkbox selecionado
    });
    const periodoSelecionados = [];
    checkboxes = form.querySelectorAll('input[name="periodo"]:checked');
    checkboxes.forEach(checkbox => {
        periodoSelecionados.push(checkbox.value);  // Adiciona o valor do checkbox selecionado
    });
    const diasSelecionados = [];
    checkboxes = form.querySelectorAll('input[name="dias"]:checked');
    checkboxes.forEach(checkbox => {
        diasSelecionados.push(checkbox.value);  // Adiciona o valor do checkbox selecionado
    });
    const regiaoSelecionados = [];
    checkboxes = form.querySelectorAll('input[name="regiao"]:checked');
    checkboxes.forEach(checkbox => {
        regiaoSelecionados.push(checkbox.value);  // Adiciona o valor do checkbox selecionado
    });
    const formData = new FormData(form);
    formData.set('imagem', urlImagem);  // Substitui a imagem com a URL obtida
    formData.set('temas', JSON.stringify(temasSelecionados));
    formData.set('dias', JSON.stringify(diasSelecionados));
    formData.set('regiao', JSON.stringify(regiaoSelecionados));
    formData.set('periodo', JSON.stringify(periodoSelecionados));

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    // Adiciona os campos extras
    data.idAnfitriao = projeto.idAnfitriao;
    data.tipo = projeto.tipo;

    console.log(data);

    fetch(`http://localhost:6789/projeto/update/${projeto.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("erro").innerHTML = `<p>Dados atualizados com sucesso.</p>`
            form.reset();
            setTimeout(() => {
                window.location.href = 'meusProjsAnfitriao.html'; 
            }, 1200); 
        } else {
            alert('Erro ao enviar dados. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Por favor, tente novamente.');
    });
}

    