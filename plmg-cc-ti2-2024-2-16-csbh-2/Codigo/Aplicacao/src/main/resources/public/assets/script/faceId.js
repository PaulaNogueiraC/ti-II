// faceId.js
window.onload = function() {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('captureButton');
    const imageUpload = document.getElementById('imageUpload');
    const capturedImage = document.getElementById('capturedImage');
    const output = document.getElementById('output');

    // Acessar a câmera do dispositivo
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.log("Erro ao acessar a câmera:", error);
        });

    // Capturar a imagem do vídeo
    captureButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Exibir a imagem capturada
        const dataUrl = canvas.toDataURL('image/png');
        capturedImage.src = dataUrl;
        output.style.display = 'block';  // Exibir a imagem capturada
    });

    // Lidar com o upload do arquivo de imagem
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                capturedImage.src = e.target.result;
                output.style.display = 'block';  // Exibir a imagem carregada
            };
            reader.readAsDataURL(file);
        }
    });
};
