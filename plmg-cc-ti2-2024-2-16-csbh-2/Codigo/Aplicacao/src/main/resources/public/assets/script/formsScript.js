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

async function enviarDados(formId, rota, tipo) {
    const form = document.getElementById(formId);
    const fotos = document.getElementById('imagem');
    const foto = fotos.files[0];

    let urlImagem = await enviarFoto(foto);
    if (!urlImagem) {
        console.error('Erro ao obter a URL da imagem. Dados não enviados.');
        urlImagem = "/assets/imagens/placeholder_projetos.png";
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
    const anfitriaoLogadoId = JSON.parse(localStorage.getItem('anfitriaoLogado')).id;
    data.idAnfitriao = anfitriaoLogadoId;
    data.tipo = tipo;
    console.log(data);
    // Faz a requisição como JSON
    fetch(rota, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("sucesso").innerHTML = `<p>Dados enviados com sucesso.</p>`;
            setTimeout(() => {
                erro.innerHTML = ''; 
                window.location.href = 'novoProjeto.html'; 
            }, 1200);
            form.reset();
            
            
        } else {
            document.getElementById("erro").innerHTML = `<p>Erro ao enviar dados. Por favor, tente novamente.</p>`;
            setTimeout(() => {
                erro.innerHTML = ''; 
            }, 1200);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        document.getElementById("erro").innerHTML = `<p>Erro ao enviar dados. Por favor, tente novamente.</p>`;
        setTimeout(() => {
            erro.innerHTML = ''; 
        }, 1200);
    });
}

function enviarDadosVoluntariado() {
    enviarDados('voluntariadoForm', 'http://localhost:6789/projeto/insert', 'Voluntariado'); 
}

function enviarDadosDoacao() {
    enviarDados('doacaoForm', 'http://localhost:6789/projeto/insert', 'Doação');
}

function enviarDadosCFinanceira() {
    enviarDados('cfinanceiraForm', 'http://localhost:6789/projeto/insert', 'Contribuição');
}
