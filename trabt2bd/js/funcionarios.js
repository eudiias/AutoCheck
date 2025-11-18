const responseFunc = await fetch('https://fatecbackend.vercel.app/api/funcionarios/listar');
const funcionarios = await responseFunc.json();
const responseFun = await fetch('https://fatecbackend.vercel.app/api/funcao/listar');
const funcao = await responseFun.json();

    async function atualizarLista(funcionarios,funcao){
        try {
            document.getElementById('tabelaFunc').innerHTML = '';
            // criar um select como o abaixo com todas as funcoes
            /*
                        <select name="nomeFuncao" class="editable-table-select">
                            <option value="mecanico" selected>MECÂNICO</option>
                            <option value="auxiliar de mecanico">AUXILIAR DE MECÂNICO</option>
                        </select>           
            
            */
            const selectFuncao = document.createElement('select');
            selectFuncao.name = "nomeFuncao";
            selectFuncao.classList.add("editable-table-select");
            selectFuncao.id = "selectFuncao";
            for (const func of funcao) {
                const option = document.createElement('option');
                option.value = func.id_funcoes;
                option.textContent = func.nome_funcao;
                selectFuncao.appendChild(option);
            }
            for (const funcionario of funcionarios) {
                const trFuncionario = document.createElement('tr');
                trFuncionario.classList.add('table-line');
                trFuncionario.id = funcionario.id_funcionario;
                trFuncionario.innerHTML = `
                    <td class="table-cellula">
                        <input type="text" value="${funcionario.nome_funcionario}" name="nomeFunc" id="nomeFunc" class="editable-table-input">
                    </td>
                    <td class="table-cellula">
                        <input type="tel" value="${funcionario.telefone_funcionario}" name="telFunc" id="telFunc" class="editable-table-input">
                    </td>
                    <td class="table-cellula">
                        ${selectFuncao.outerHTML}
                    </td>
                    <td class="table-cellula table-cellula-buttons">
                        <button class="button" id="btn-salvar-${funcionario.id_funcionario}" save-button" >Salvar</button>
                        <button class="button" id="btn-excluir-${funcionario.id_funcionario}">Excluir</button>
                    </td>
                `;
                document.getElementById('tabelaFunc').appendChild(trFuncionario);
                document.getElementById(`btn-excluir-${funcionario.id_funcionario}`).addEventListener('click', () => removerFuncionario(funcionario.id_funcionario));
                document.getElementById(`btn-salvar-${funcionario.id_funcionario}`).addEventListener('click', () => atualizarFuncionario(funcionario.id_funcionario));
            }
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }
    async function NewFuncao(funcao) {
        //adicionar options com os nomes das funcoes no id = "nomeFuncaoNew"
        for (const func of funcao) {
            const option = document.createElement('option');
            option.value = func.id_funcoes;
            option.textContent = func.nome_funcao;
            document.getElementById('nomeFuncaoNew').appendChild(option);
        }
    }
    async function atualizarFuncionario(id){
        try {
            const url = `https://fatecbackend.vercel.app/api/funcionarios/atualizar/${id}`;
            const user = {
                nome_funcionario: document.getElementById('nomeFunc').value,
                telefone_funcionario: document.getElementById('telFunc').value,
                id_funcoes: document.getElementById('selectFuncao').value
            };
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                const text = await response.text();
                console.error('Erro ao atualizar funcionário:', response.status, text);
                alert('Falha ao atualizar funcionário. Verifique o console para mais detalhes.');
                return;
            }
            alert('Funcionário atualizado com sucesso!');
            location.reload();
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            alert('Erro ao atualizar funcionário. Verifique o console para mais detalhes.');
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
            atualizarLista(funcionarios);
        } catch (error) {
            console.error('Erro ao adicionar funcionário:', error);
            alert('Erro ao adicionar funcionário.');
        }
    }

    function inicializarEventos(funcionarios,funcao) {
        const registerForm = document.getElementById("register-form");
        const searchInput = document.getElementById('search-input');
        const searchForm = document.getElementById("searchForm");

        if (registerForm) {
            registerForm.addEventListener("submit", event => {
                event.preventDefault()
                const user = {
                    nome_funcionario: document.getElementById('nome_funcionario').value,
                    telefone_funcionario: document.getElementById('tel_funcionario').value,
                    id_funcoes: document.getElementById('id_funcao').value
                };
                adicionarUsuario(user);
            })
        }

        if (searchInput) {
            searchInput.addEventListener('input', event => {
                const termoBusca = event.target.value.toLowerCase();
                const funcionariosFiltrados = funcionarios.filter(funcionario =>
                    funcionario.nome_funcionario.toLowerCase().includes(termoBusca) ||
                    funcionario.telefone_funcionario.toLowerCase().includes(termoBusca) ||
                    funcionario.funcao.toLowerCase().includes(termoBusca)
                );
                atualizarLista(funcionariosFiltrados,funcao);
            });
        }

        if (searchForm) {
            searchForm.addEventListener("submit", event => {
                event.preventDefault()
                const termoBusca = document.getElementById('search-input').value.toLowerCase();
                const funcionariosFiltrados = funcionarios.filter(funcionario => 
                    funcionario.nome_funcionario.toLowerCase().includes(termoBusca) ||
                    funcionario.telefone_funcionario.toLowerCase().includes(termoBusca) ||
                    funcionario.funcao.toLowerCase().includes(termoBusca)
                );
                atualizarLista(funcionariosFiltrados);
            });
        }
        atualizarLista(funcionarios,funcao);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarEventos);
    } else {
        inicializarEventos(funcionarios,funcao);
        //NewFuncao(funcao);
    }