const veiResponse = await fetch('https://fatecbackend.vercel.app/api/veiculos/listar');
const veiculos = await veiResponse.json();
const clResponse = await fetch('https://fatecbackend.vercel.app/api/clientes/listar');
const clientes = await clResponse.json();

async function fetchVeiculos(veiculos,clientes) {
    try {

    for (const veiculo of veiculos) {
        const selectClient = document.createElement('select');
        selectClient.classList.add('editable-table-select');
        const trVeiculo = document.createElement('tr');
        trVeiculo.classList.add('table-line');
        selectClient.id = `SelectVeiculo${veiculo.placa_carro}`;
        trVeiculo.id = `idVeiculo${veiculo.placa_carro}`;
        trVeiculo.innerHTML = `
            <td class="table-cellula">${veiculo.placa_carro}</td>
            <td class="table-cellula" id="select${veiculo.placa_carro}"></td>
            <td class="table-cellula table-cellula-buttons">
                <button class="button save-button" id="save-button-${veiculo.placa_carro}">Salvar</button>
                <button class="button" id="remove-button-${veiculo.placa_carro}">Excluir</button>
            </td>
        `;
        document.getElementById('table-main').appendChild(trVeiculo);
        for (const cliente of clientes) {
            const option = document.createElement('option');
            option.value = cliente.id_cliente;
            option.text = cliente.nome_cliente;
            option.id = `${veiculo.placa_carro}-option-${cliente.id_cliente}`;
            if (cliente.id_cliente === veiculo.id_cliente) {
                option.selected = true;
            }
            selectClient.appendChild(option);
        }
        document.getElementById(`select${veiculo.placa_carro}`).appendChild(selectClient);
        // Adiciona event listener para o botão de salvar e remover
        document.getElementById(`save-button-${veiculo.placa_carro}`).addEventListener('click', function() {
            atualizarVeiculo(veiculo.placa_carro);
        });
        document.getElementById(`remove-button-${veiculo.placa_carro}`).addEventListener('click', function() {
            removerVeiculo(veiculo.placa_carro);
        });
    }
    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
    }
}
fetchVeiculos(veiculos,clientes);
// Funções para atualizar e remover veículos podem ser adicionadas aqui
async function atualizarVeiculo(placa) {
    try {
        console.log(placa);
        const selectElement = document.getElementById(`SelectVeiculo${placa}`);
        const idClienteSelecionado = selectElement.value;
        const response = await fetch(`https://fatecbackend.vercel.app/api/veiculos/atualizar/${placa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_cliente: idClienteSelecionado
            })
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar veículo');
        }
        alert('Veículo atualizado com sucesso!');
        location.reload();
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        alert('Erro ao atualizar veículo.');
    }
}
async function removerVeiculo(placa) {
    try {
        const response = await fetch(`https://fatecbackend.vercel.app/api/veiculos/remover/${placa}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao remover veículo');
        }
        const trVeiculo = document.getElementById(`idVeiculo${placa}`).remove();
        alert('Veículo removido com sucesso!');
    } catch (error) {
        console.error('Erro ao remover veículo:', error);
        alert('Erro ao remover veículo.');
    }
}
//criar logica de adicionar veiculo
document.getElementById('add-veiculo-button').addEventListener('click', async event => {
    event.preventDefault();
    try {
            const placaVeiculo = document.getElementById(`placa`).value;
            const idClienteVeiculo = document.getElementById(`clientesSelec`).value;
            const response = await fetch('https://fatecbackend.vercel.app/api/veiculos/adicionar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    placa_carro: placaVeiculo,
                    id_cliente: idClienteVeiculo
                })
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar veículo');
            }
            alert('Veículo adicionado com sucesso!');
            location.reload();
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error);
            alert('Erro ao adicionar veículo.');
        }
});
//no form adicionar veiculos popular clientesSelec com clientes usando a variavel clientes
const clientesSelec = document.getElementById('clientesSelec');
clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id_cliente;
    option.text = cliente.nome_cliente;
    clientesSelec.appendChild(option);
});