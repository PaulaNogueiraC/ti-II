let parametros = new URLSearchParams(window.location.search);
const email = parametros.get("email");
const video = document.getElementById('video');
const imageUpload = document.getElementById('imageUpload');
const capturarFoto = document.getElementById('captureButton');
console.log(email);
let anfitriaoLog;
let usuarioLog;
// Acessar a câmera do dispositivo
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
      video.srcObject = stream;
  })
  .catch(function(error) {
      console.log("Erro ao acessar a câmera:", error);
});
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  ])
    .then(start)
    .catch(err => console.error('Erro ao carregar os modelos:', err));
  
  async function start() {
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  
    imageUpload.addEventListener('change', async () => {
      const files = Array.from(imageUpload.files);
      for (const file of files) {
        const image = await faceapi.bufferToImage(file);
  
        const canvas = faceapi.createCanvasFromMedia(image);
  
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
  
        const detections = await faceapi
          .detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceDescriptors();
  
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d =>
          faceMatcher.findBestMatch(d.descriptor)
        );

        let encontrou = false;
        results.forEach((result, i) => {
          // Extrai o email removendo o valor da chance de erro
            const emailResultado = result.toString().split(' ')[0]; // Pega a parte antes do espaço
            console.log(emailResultado); // Exibe apenas o email
            if(emailResultado == email){
              if(usuarioLog.email == email){
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLog));
              }
              else{
                localStorage.setItem('anfitriaoLogado', JSON.stringify(anfitriaoLog));
              }
              window.location.href = 'index.html';
              encontrou = true;
            }
        });
        if(!encontrou){
          document.getElementById("erro").innerHTML = `<p>Acesso negado!</p>`
          setTimeout(() => {
            erro.innerHTML = ''; 
        }, 1500);
        }
      }
    });
    capturarFoto.addEventListener('click', async () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Exibir a imagem capturada
      const dataUrl = canvas.toDataURL('image/png');
      const img = new Image();
      img.src = dataUrl;

      img.onload = async () => {
        // Converte a imagem capturada para uso no face-api.js
        const image = await faceapi.bufferToImage(await fetch(dataUrl).then(res => res.blob()));

        const displaySize = { width: image.width, height: image.height };
        const detections = await faceapi
          .detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));

        let encontrou = false;
        results.forEach((result) => {
          // Extrai o email removendo a chance de erro
          const emailResultado = result.toString().split(' ')[0]; // Pega a parte antes do espaço
          console.log(emailResultado); // Exibe apenas o email

          if(emailResultado == email){
            if(usuarioLog){
              localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLog));
            }
            else{
              localStorage.setItem('anfitriaoLogado', JSON.stringify(anfitriaoLog));
            }
            window.location.href = 'index.html';
            encontrou = true;
          }
        });

        if (!encontrou) {
          document.getElementById("erro").innerHTML = `<p>Acesso negado!</p>`
          setTimeout(() => {
            erro.innerHTML = ''; 
        }, 2600);
        }
      };
    });
  }
  
  async function loadLabeledImages() {
    try {
      // Fetch os dados do backend, que retorna as URLs das imagens de anfitriões
      const responseAnfitriao = await fetch('http://localhost:6789/anfitriao/list'); // Substitua pelo seu endpoint
      const responseUsuario = await fetch('http://localhost:6789/voluntario/list'); // Substitua pelo seu endpoint
      if(responseAnfitriao.ok || responseUsuario.ok){
        let anfitrioes = [];
        let usuarios = [];
        if(responseAnfitriao.ok){
          anfitrioes = await responseAnfitriao.json(); // Espera-se que o backend retorne um array de anfitriões com o nome e as fotos
        }
        
      // Busca o anfitrião pelo email
      const anfitriao = anfitrioes.find(a => a.email === email); 
      anfitriaoLog = anfitriao;

      if(responseUsuario.ok){
        usuarios = await responseUsuario.json(); // Espera-se que o backend retorne um array de anfitriões com o nome e as fotos
      }

      // Fetch os dados do backend, que retorna as URLs das imagens de anfitriões
      
      const usuario = usuarios.find(a => a.email === email); 
      usuarioLog = usuario;

      // Busca o anfitrião pelo email
      if (!anfitriao && !usuario) {
        console.error('Usuario com email ${email} não encontrado.');
        return;
      }
      const descriptions = [];
      let imageUrls = [];
      let label = '';
      if(anfitriao){
        label = anfitriao.email; // Cria o label com o nome do anfitrião
        imageUrls = anfitriao.fotos; // O array de URLs das fotos
      }
      else if(usuario){
        label = usuario.email; // Cria o label com o nome do anfitrião
        imageUrls = usuario.fotos; // O array de URLs das foto
      }
  
      for (const url of imageUrls) {
        try {
          console.log('Carregando imagem de referência: ${url}');
          const img = await faceapi.fetchImage(url); // Busca diretamente a imagem do Cloudinary
          const detection = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
  
          if (detection) {
            descriptions.push(detection.descriptor); // Adiciona o descritor se a face for detectada
            console.log('Face detectada para ${label} em ${url}');
          } else {
            console.warn('Rosto não detectado para ${label} em ${url}');
          }
        } catch (err) {
          console.error('Erro ao carregar a imagem ${url}:', err);
        }
      }
  
      // Cria um objeto LabeledFaceDescriptors para o anfitrião
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
      }
      else{
        throw new Error("Nao existe anfitriao nem voluntário");
      }
    } catch (err) {
      console.error('Erro ao carregar imagens:', err);
    }
  }