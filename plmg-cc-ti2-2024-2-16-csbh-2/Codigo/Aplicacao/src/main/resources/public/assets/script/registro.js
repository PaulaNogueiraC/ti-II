const CLOUD_NAME = "drovsbi3q";  // Nome do seu Cloud
const UPLOAD_PRESET = "minha_imagem_presets";  // Nome do seu upload preset
const formLogin = document.querySelector('.formLogin');
const submitForm = formLogin.querySelector('input[type="button"]');
const nomeInput = formLogin.querySelector('input[type="text"]');
const emailInput = formLogin.querySelector('input[type="email"]');
const passwordInput = formLogin.querySelector('input[type="password"]');
let video = "";
let fileInput = "";
let photoList = "";
let photoCount = "";
let photoArray = [];
let cadastrouFaceId = false;
document.getElementById('btnFaceId').addEventListener('click', function() {
    cadastrouFaceId = true;
    document.getElementById('photo-container').innerHTML = `<p>Por favor, capture ou faça o upload de 4 fotos para o seu Face ID.</p>
                <video id="video" width="100%" autoplay></video>
                <button type="button" id="captureButton" onclick="capturarImagem()">Capturar Foto</button>
                <input type="file" id="fileInput" accept="image/*" style="display: none;" />
                <button type="button" id="uploadButton" onclick="uploadImagem()">Fazer Upload de Foto</button>
                
                <div id="capturedPhotos">
                    <p>Fotos capturadas:</p>
                    <div id="photoList"></div>
                </div>
                <div id="erroFoto"></div>
                <p id="photoCount">Faltam 4 fotos</p>`;
                document.getElementById('btnFaceId').style.display = "none";
                document.querySelector('.page').style.marginTop = '450px'
                document.querySelector('.page').style.marginBottom = '300px'
                video = document.getElementById('video');
                fileInput = document.getElementById('fileInput');
                photoList = document.getElementById('photoList');
                photoCount = document.getElementById('photoCount');
                // Acessar a câmera do dispositivo
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    video.srcObject = stream;
                })
                .catch(function(error) {
                    console.log("Erro ao acessar a câmera:", error);
                });
                fileInput.addEventListener('change', function(event) {
                    if (photoArray.length < 4) {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                const img = document.createElement('img');
                                img.src = e.target.result;
                                photoList.appendChild(img);
                                photoArray.push(e.target.result);
                                
                                // Atualizar a contagem de fotos restantes
                                const remainingPhotos = 4 - photoArray.length;
                                photoCount.textContent = `Faltam ${remainingPhotos} foto(s)`;
                
                                // Habilitar o botão de finalização quando 4 fotos forem capturadas
                                if (photoArray.length === 4) {
                                    submitForm.disabled = false;
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    } else {
                        document.getElementById("erroFoto").innerHTML = `<p>Você já capturou 4 fotos.</p>`
                        setTimeout(() => {
                            erroFoto.innerHTML = ''; 
                        }, 2400);
                    }
                });
})


// Capturar a imagem do vídeo
function capturarImagem() {
if (photoArray.length < 4) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Adicionar a imagem capturada à lista
    const dataUrl = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = dataUrl;
    photoList.appendChild(img);
    photoArray.push(dataUrl);
    
    // Atualizar a contagem de fotos restantes
    const remainingPhotos = 4 - photoArray.length;
    photoCount.textContent = `Faltam ${remainingPhotos} foto(s)`;

    // Habilitar o botão de finalização quando 4 fotos forem capturadas
    if (photoArray.length === 4) {
        submitForm.disabled = false;
    }
    } else {
        document.getElementById("erroFoto").innerHTML = `<p>Você já capturou 4 fotos.</p>`
        setTimeout(() => {
            erroFoto.innerHTML = ''; 
        }, 2400);
    }
};

function uploadImagem(){
    fileInput.click(); // Abre o seletor de arquivo
};


function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

submitForm.addEventListener('click', async (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if(!isEmailValid(email)) {
        document.getElementById("emailInvalido").innerHTML = `<p>Digite um e-mail válido.</p>`
        setTimeout(() => {
            emailInvalido.innerHTML = ''; 
        }, 1200);
        return;
    } 

    if(cadastrouFaceId){
        if(photoArray.length < 4){
            document.getElementById("erroFoto").innerHTML = `<p>Você ainda não cadastrou todas as fotos.</p>`
            setTimeout(() => {
                erroFoto.innerHTML = ''; 
            }, 1200);
            return;
        }
    }
    
    let voluntarios = [];

    const response = await fetch("http://localhost:6789/voluntario/list");
    if(response.ok){
        voluntarios = await response.json();
        voluntarios.forEach(voluntario => {
        if(voluntario.email == email) { 
            document.getElementById("erroo").innerHTML = `<p>Você já possui uma conta.</p>`;
            setTimeout(() => {
                erroo.innerHTML = ''; 
            }, 1200);
            throw new Error("E-mail já cadastrado!");
        }
    });
    }
    

    let anfitrioes = [];

    const responseAnfitriao = await fetch("http://localhost:6789/anfitriao/list");   
    if(responseAnfitriao.ok){
        anfitrioes = await responseAnfitriao.json();
        anfitrioes.forEach(anfitriao => {
        if(anfitriao.email == email) { 
            document.getElementById("erroo").innerHTML = `<p>Você já possui uma conta.</p>`;
            setTimeout(() => {
                erroo.innerHTML = ''; 
            }, 1200);
            throw new Error("E-mail já cadastrado!");
        }
    });

}
    
    let arrayFinal = [];
    for (let i = 0; i < photoArray.length; i++) {
        arrayFinal[i] = await enviarFoto(photoArray[i]);
    }
    
    const novoUsuario = { nome, email, senha: password, fotos: arrayFinal};

    try {
        const response = await fetch('http://localhost:6789/voluntario/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            document.getElementById("login").innerHTML = `<p>Cadastro realizado com sucesso. Faça o login.</p>`;
            setTimeout(() => {
                window.location.href = 'login.html'; 
            }, 1200); 
        } else {
            document.getElementById("erro").innerHTML = `<p>Erro ao registrar usuário!</p>`;
            setTimeout(() => {
                erro.innerHTML = ''; 
            }, 1200);
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
    }
});

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