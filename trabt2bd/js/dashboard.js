function iniciarModal(id){
    document.getElementById(id).style.display="flex";
}

function fecharModal(id){
    document.getElementById(id).style.display="none";
}

// Abrir Modal Cliente

document.getElementById("abrModalC").addEventListener("click", () => {
    iniciarModal('modalClientes');
});

document.getElementById("CancCliente").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('#modalClientes form').reset();
    fecharModal('modalClientes');
});

//Abrir Modal Carro

document.getElementById("abrModalCar").addEventListener("click", () => {
    iniciarModal('modalCarro');
});

document.getElementById("CancCarro").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('#modalCarro form').reset();
    fecharModal('modalCarro');
});

//Abrir Modal Triagem

document.getElementById("abrModalTri").addEventListener("click", () => {
    iniciarModal('modalTriagem');
});

document.getElementById("CancTriagem").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('#modalTriagem form').reset;
    fecharModal('modalTriagem');
});

//Select Funcinários

const selectFuncionarios = document.getElementById('selectFuncionarios');

async function carregarFuncionarios() {
    try {
        const response = await fetch('https://fatecbackend.vercel.app/api/funcionarios/listar');
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        selectFuncionarios.innerHTML = '<option value="">Selecione um funcionário</option>';

        data.forEach(func => {
            const option = document.createElement('option');
            option.textContent = func.nome_funcionario;
            selectFuncionarios.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar funcionários.', error);
        selectFuncionarios.innerHTML = '<option value="">Erro ao carregar</option>';
    }
}
carregarFuncionarios();

//Select Placas

const selectPlacas = document.getElementById('selectPlacas');

async function carregarPlacas() {
    try {
        const response = await fetch('https://fatecbackend.vercel.app/api/veiculos/listar');

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        selectPlacas.innerHTML = '<option value="">Selecione a placa</option>';

        data.forEach(func => {
            const option = document.createElement('option');
            option.textContent = func.placa_carro;
            selectPlacas.appendChild(option);

        });
            } catch (error) {
        console.error('Erro ao carregar as placas registradas.', error);
        selectFuncionarios.innerHTML = '<option value="">Erro ao carregar</option>';
    }
}
carregarPlacas();

//select clientes

const selectClientes = document.getElementById('selectClientes');

async function carregarClientes() {
    try {
        const response = await fetch('https://fatecbackend.vercel.app/api/clientes/listar');
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        selectClientes.innerHTML = '<option value="">Selecione o cliente</option>';
        data.forEach(func => {
            const option = document.createElement('option');
            option.value = func.cliente.id_cliente
            option.textContent = func.nome_cliente;
            selectClientes.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os clientes registrados.', error);
        selectClientes.innerHTML = '<option value="">Erro ao carregar</option>';
    }
}
carregarClientes();

// criar novo cliente

document.getElementById('formNovoCliente').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cliente = {
        nome_cliente: document.getElementById('nomeCliente').value,
        cpf_cliente: document.getElementById('cpfCliente').value,
        telefone_cliente: document.getElementById('telCliente').value
    };
    await adicionarCliente(cliente);
});
// criar novo carro

document.getElementById('formNovoCarro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const carro = {
        placa_carro: document.getElementById('num-placa').value,
        id_cliente: await obterIdClientePorNome(document.getElementById('selectClientes').value)
    };
    await adicionarCarro(carro);
});
// criar nova triagem
document.getElementById('formNovaTriagem').addEventListener('submit', async (e) => {
    e.preventDefault();
    await adicionarTriagem();
});
async function adicionarCliente(cliente) {
    try {
        const response = await fetch('https://fatecbackend.vercel.app/api/clientes/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar cliente');
        }
        alert('Cliente adicionado com sucesso!');
        location.reload();
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        alert('Erro ao adicionar cliente.');
    }
}
// crie a parte de adicionar veiculos

async function adicionarCarro(carro){
    try{
        const response = await fetch('https://fatecbackend.vercel.app/api/veiculos/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carro)
        });
    } catch {
        console.error('Erro ao adicionar Veiculo:',error)
        alert('Erro ao adicionar veiculo')
    }
}