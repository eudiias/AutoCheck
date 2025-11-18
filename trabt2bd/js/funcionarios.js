async function Main(){
    const response = await fetch('https://fatecbackend.vercel.app/api/funcionarios/listar');
    const funcionarios = await response.json();
    console.log(funcionarios)
    return funcionarios;
}
const funcionarios = await Main();

    async function atualizarLista(funcionarios){
        try {
            document.getElementById('tabelaFuncs').innerHTML = '';
            for (const funcionario of funcionarios) {
                const trFuncionario = document.createElement('tr');
                trFuncionario.classList.add('table-line');
                trFuncionario.id = funcionario.id_funcionario
                trFuncionario.innerHTML = `
                <td class="table-cellula">${funcionario.nome_funcionario}</td>
                <td class="table-cellula">${funcionario.telefone_funcionario}</td>
                    <td class="table-cellula">${funcionario.funcao}</td>
                    <td class="table-cellula table-cellula-buttons">
                        <button class="button">Editar</button>
                        <button class="button" id="btn-excluir-${funcionario.id_funcionario}">Excluir</button>
                    </td>
                `;
                document.getElementById('tabelaFuncs').appendChild(trFuncionario);
                document.getElementById(`btn-excluir-${funcionario.id_funcionario}`).addEventListener('click', () => removerFuncionario(funcionario.id_funcionario));
            }
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }
    async function removerFuncionario(id){
        try {
            const url = `https://fatecbackend.vercel.app/api/funcionarios/remover/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Erro ao remover funcionário:', response.status, text);
                alert('Falha ao remover funcionário. Verifique o console para mais detalhes.');
                return;
            }

            // atualizar a lista após remoção bem-sucedida
            atualizarLista();
        } catch (error) {
            console.error('Erro ao remover funcionário:', error);
            alert('Erro ao remover funcionário. Verifique o console para mais detalhes.');
        }
    }
    async function adicionarUsuario(user) {
        try {
            const url = 'https://fatecbackend.vercel.app/api/funcionarios/adicionar';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Erro ao adicionar funcionário:', response.status, text);
                alert('Falha ao adicionar funcionário.');
                return;
            }

            alert('Funcionário adicionado com sucesso!');
            atualizarLista();
        } catch (error) {
            console.error('Erro ao adicionar funcionário:', error);
            alert('Erro ao adicionar funcionário.');
        }
    }
    document.getElementById("register-form").addEventListener("submit",event => {
        event.preventDefault()
        const user = {
            nome_funcionario: document.getElementById('nome_funcionario').value,
            telefone_funcionario: document.getElementById('tel_funcionario').value,
            id_funcoes: document.getElementById('id_funcao').value
        };
        console.log(user)
        adicionarUsuario(user);
    })
    document.getElementById("searchForm").addEventListener("submit",event => {
        event.preventDefault()
        const termoBusca = document.getElementById('searchInput').value.toLowerCase();
        const funcionariosFiltrados = funcionarios.filter(funcionario => 
            funcionario.nome_funcionario.toLowerCase().includes(termoBusca) ||
            funcionario.telefone_funcionario.toLowerCase().includes(termoBusca) ||
            funcionario.funcao.toLowerCase().includes(termoBusca)
        );
        atualizarLista(funcionariosFiltrados);
    });
    atualizarLista(funcionarios);