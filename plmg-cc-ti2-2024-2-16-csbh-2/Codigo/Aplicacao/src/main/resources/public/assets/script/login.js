const formLogin = document.querySelector('.formLogin');
const emailInput = formLogin.querySelector('input[type="email"]');
const passwordInput = formLogin.querySelector('input[type="password"]');
const acessarInput = formLogin.querySelector('#acessar');

document.getElementById("faceId").addEventListener('click', async (event) => {
    if(!emailInput.value) {
        document.getElementById("erro").innerHTML = `<p>Primeiro, digite o e-mail.</p>`
        setTimeout(() => {
        erro.innerHTML = ''; 
        }, 1200);
    }
    else{
        const email = emailInput.value;
        const responseUsuario = await fetch('http://localhost:6789/voluntario/list');
        const responseAnfitriao = await fetch('http://localhost:6789/anfitriao/list');

        // Verifique se ambas as respostas foram bem-sucedidas
        if (!responseUsuario.ok && !responseAnfitriao.ok) {
            throw new Error(`Erro nas requisições: 
                            Voluntário: ${responseUsuario.status} - ${responseUsuario.statusText},
                            Anfitrião: ${responseAnfitriao.status} - ${responseAnfitriao.statusText}`);
        }

        let usuario, anfitriao;

        // Buscar usuário
        if (responseUsuario.ok) {
            const usuarios = await responseUsuario.json();
            usuario = usuarios.find(u => u.email === email);
        }
        if (responseAnfitriao.ok) {
            const anfitrioes = await responseAnfitriao.json();
            anfitriao = anfitrioes.find(a => a.email === email);
        }
        if(!usuario && !anfitriao){
            document.getElementById("erro").innerHTML = `<p>O e-mail informado não está associado a nenhuma conta.</p>`
            setTimeout(() => {
                erro.innerHTML = ''; 
            }, 1200);
        }
        else if(usuario){
            if(usuario.fotos.length == 0) {
                document.getElementById("erro").innerHTML = `<p>O FaceID não foi cadastrado. Cadastre na página de configuração.</p>`
                setTimeout(() => {
                    erro.innerHTML = ''; 
                }, 1500);
            }
            
            else window.location.href = `faceId.html?email=${emailInput.value}`;
        }
        else if(anfitriao){
            if(anfitriao.fotos.length == 0) {
                document.getElementById("erro").innerHTML = `<p>O FaceID não foi cadastrado. Cadastre na página de configuração.</p>`
                setTimeout(() => {
                    erro.innerHTML = ''; 
                }, 1500);
            }
            else window.location.href = `faceId.html?email=${emailInput.value}`;
        }
    }    
});
acessarInput.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const senhaFornecida = passwordInput.value;

    try {
        const responseUsuario = await fetch('http://localhost:6789/voluntario/list');
        const responseAnfitriao = await fetch('http://localhost:6789/anfitriao/list');

        // Verifique se ambas as respostas foram bem-sucedidas
        if (!responseUsuario.ok && !responseAnfitriao.ok) {
            throw new Error(`Erro nas requisições: 
                            Voluntário: ${responseUsuario.status} - ${responseUsuario.statusText},
                            Anfitrião: ${responseAnfitriao.status} - ${responseAnfitriao.statusText}`);
        }

        let usuario, anfitriao;
        // Buscar usuário
        if (responseUsuario.ok) {
            const usuarios = await responseUsuario.json();
            usuario = usuarios.find(u => u.email === email);
        }

        // Buscar anfitrião
        if (responseAnfitriao.ok) {
            const anfitrioes = await responseAnfitriao.json();
            anfitriao = anfitrioes.find(a => a.email === email);
        }
        
        if(usuario){
            const response = await fetch('http://localhost:6789/autenticador', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senhaCriptografada: usuario.senha,
                    senhaFornecida: senhaFornecida
                })
            });
            
            const autenticado = await response.json(); // Resultado será true ou false
            if (autenticado) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = 'index.html';
            } else {
                document.getElementById("erro").innerHTML = `<p>E-mail ou senha incorretos.</p>`;
                setTimeout(() => {
                    erro.innerHTML = '';
                }, 1200);
            }
        }
        else if (anfitriao) {
            const response = await fetch('http://localhost:6789/autenticador', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senhaCriptografada: anfitriao.senha,
                    senhaFornecida: senhaFornecida
                })
            });
            
            const autenticado = await response.json(); // Resultado será true ou false
            if (autenticado) {
                localStorage.setItem('anfitriaoLogado', JSON.stringify(anfitriao));
                window.location.href = 'index.html';
            } else {
                document.getElementById("erro").innerHTML = `<p>E-mail ou senha incorretos.</p>`;
                setTimeout(() => {
                    erro.innerHTML = '';
                }, 1200);
            }
        }
        else{
            document.getElementById("erro").innerHTML = `<p>E-mail ou senha incorretos.</p>`;
            setTimeout(() => {
                erro.innerHTML = '';
            }, 1200);
        }

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
});
