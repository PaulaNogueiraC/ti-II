const CLOUD_NAME = "drovsbi3q";  // Nome do seu Cloud
const UPLOAD_PRESET = "minha_imagem_presets";  // Nome do seu upload preset
let video = "";
let fileInput = "";
let photoList = "";
let photoCount = "";
let photoArray = [];
let cadastrouFaceId = false;
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
    document.getElementById("erroFoto").innerHTML = `<p>Você já capturou 4 fotos.</p>`;
  }
};
function uploadImagem() {
  fileInput.click(); // Abre o seletor de arquivo
}
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
document.addEventListener('DOMContentLoaded', () => {

  const anfitriaoLogado = JSON.parse(localStorage.getItem('anfitriaoLogado'));
  console.log(anfitriaoLogado);

  if (!anfitriaoLogado) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('nome').value = anfitriaoLogado.nome;
  document.getElementById('email').value = anfitriaoLogado.email;
  document.getElementById('info').value = anfitriaoLogado.info;


  if (anfitriaoLogado.fotos.length == 0) {
    document.getElementById('botaoFaceId').innerHTML = `<button type="button" id="btnFaceId">Cadastrar FaceID</button>`
  }

  if (document.getElementById('btnFaceId')) {
    document.getElementById('btnFaceId').addEventListener('click', function () {
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
                  <p id="photoCount">Faltam 4 fotos</p>`;
      document.getElementById('btnFaceId').style.display = "none";
      document.querySelector('.page').style.marginTop = '500px'
      document.querySelector('.page').style.marginBottom = '350px'
      video = document.getElementById('video');
      fileInput = document.getElementById('fileInput');
      photoList = document.getElementById('photoList');
      photoCount = document.getElementById('photoCount');
      // Acessar a câmera do dispositivo
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Erro ao acessar a câmera:", error);
        });
    })
  }

  if (document.getElementById('fileInput')) {
    fileInput.addEventListener('change', function (event) {
      if (photoArray.length < 4) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            photoList.appendChild(img);
            photoArray.push(e.target.result);

            // Atualizar a contagem de fotos restantes
            const remainingPhotos = 4 - photoArray.length;
            photoCount.textContent = `Faltam ${remainingPhotos} foto(s)`;

          };
          reader.readAsDataURL(file);
        }
      } else {
        document.getElementById("erroFoto").innerHTML = `<p>Você já capturou 4 fotos.</p>`;
        setTimeout(() => {
          erro.innerHTML = ''; 
      }, 1200);
      }
    });
  }
  // Lidar com o envio do formulário
  document.querySelector('input[type="button"]').addEventListener('click', async function () {
    const formUser = document.getElementById('profile-form');
    const nomeInput = formUser.querySelector('input[type="text"]');
    const emailInput = formUser.querySelector('input[type="email"]');
    const infoInput = formUser.querySelector('input[type="info"]');
    const nome = nomeInput.value;
    const email = emailInput.value;
    const info = infoInput.value;

    if (!isEmailValid(email)) {
      document.getElementById("erro").innerHTML = `<p>Por favor, insira um e-mail válido.</p>`;
      setTimeout(() => {
        erro.innerHTML = ''; 
    }, 1200);
      return;
    }
    let arrayFinal = [];
    if (cadastrouFaceId) {
      if (photoArray.length < 4) {
        document.getElementById("erro").innerHTML = `<p>Você ainda não capturou todas as fotos.</p>`;
        setTimeout(() => {
          erro.innerHTML = ''; 
      }, 1200);
        return;
      }
      else {
        for (let i = 0; i < photoArray.length; i++) {
          arrayFinal[i] = await enviarFoto(photoArray[i]);
        }
      }
    }

    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const senhaAtual = document.getElementById('senha-atual').value;
    let password = senhaAtual;
    const response = await fetch('http://localhost:6789/autenticador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          senhaCriptografada: anfitriaoLogado.senha,
          senhaFornecida: senhaAtual
      })
      });
      const autenticado = await response.json(); // Resultado será true ou false
    if(!senhaAtual){
      document.getElementById("erro").innerHTML = `<p>Digite a senha para confirmar as alterações!</p>`;
      setTimeout(() => {
        erro.innerHTML = '';
    }, 2400);
    return;
    }
    else if(!autenticado){
      document.getElementById("erro").innerHTML = `<p>A senha atual está incorreta.</p>`;
          setTimeout(() => {
            erro.innerHTML = '';
        }, 1200);
        return;
    }
    else {
      if (novaSenha || confirmarSenha) {
        if (novaSenha !== confirmarSenha) {
          document.getElementById("erro").innerHTML = `<p>As novas senhas não coincidem.</p>`;
          setTimeout(() => {
            erro.innerHTML = ''; 
          }, 1200);
          return;
        }
        else{
          password = novaSenha;
        }
    } else {
      password = senhaAtual;
    }

    let usuario = { nome: nome, email : email, senha: password, info: info, fotos: arrayFinal };
    fetch(`http://localhost:6789/anfitriao/update/${anfitriaoLogado.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || 'Erro ao atualizar dados no servidor.') });
        }
        return response.json();
      })
      .then(async data => {
        const responseAnfitriao = await fetch(`http://localhost:6789/anfitriao/${anfitriaoLogado.id}`);
        const anfitriaoBD = await responseAnfitriao.json();
        document.getElementById("sucesso").innerHTML = `<p>Dados atualizados com sucesso.</p>`;
        usuario = { id: anfitriaoLogado.id, nome, email, senha: anfitriaoBD.senha, info: info, fotos: arrayFinal };
        localStorage.setItem('anfitriaoLogado', JSON.stringify(usuario)); // Atualiza o objeto no localStorage
        console.log(usuario);
        setTimeout(() => {
          window.location.href = 'index.html'; 
      }, 1200); 
      })
      .catch(error => {
        alert(error.message);
        document.getElementById("erro").innerHTML = `<p>Algo inesperado aconteceu, tente novamente.</p>`;
          
      });
    }
  });

});


