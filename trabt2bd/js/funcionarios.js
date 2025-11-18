const responseFunc = await fetch('https://fatecbackend.vercel.app/api/funcionarios/listar');
const funcionarios = await responseFunc.json();
const responseFun = await fetch('https://fatecbackend.vercel.app/api/funcao/listar');
const funcao = await responseFun.json();

    async function atualizarLista(funcionarios,funcao){
        /*try {*/
            document.getElementById('tabelaFunc').innerHTML = '';
            // criar um select como o abaixo com todas as funcoes
            /*
                        <select name="nomeFuncao" class="editable-table-select">
                            <option value="mecanico" selected>MECÂNICO</option>
                            <option value="auxiliar de mecanico">AUXILIAR DE MECÂNICO</option>
                        </select>           
            
            */
            for (const funcionario of funcionarios) {
                const selectFuncao = document.createElement('select');
                selectFuncao.name = "nomeFuncao";
                selectFuncao.classList.add("editable-table-select");
                selectFuncao.id = `selectFuncao${funcionario.id_funcionario}`;
                for (const func of funcao) {
                    const option = document.createElement('option');
                    option.value = func.id_funcoes;
                    option.textContent = func.nome_funcao;
                    if (option.value == funcionario.id_funcoes) {
                        option.selected = true;
                    }
                    selectFuncao.appendChild(option);
                }
                const trFuncionario = document.createElement('tr');
                trFuncionario.classList.add('table-line');
                trFuncionario.id = funcionario.id_funcionario;
                
                const tdNome = document.createElement('td');
                tdNome.classList.add('table-cellula');
                const inputNome = document.createElement('input');
                inputNome.type = 'text';
                inputNome.value = funcionario.nome_funcionario;
                inputNome.name = 'nomeFunc';
                inputNome.id = `nomeFunc${funcionario.id_funcionario}`;
                inputNome.classList.add('editable-table-input');
                tdNome.appendChild(inputNome);
                
                const tdTel = document.createElement('td');
                tdTel.classList.add('table-cellula');
                const inputTel = document.createElement('input');
                inputTel.type = 'tel';
                inputTel.value = funcionario.telefone_funcionario;
                inputTel.name = 'telFunc';
                inputTel.id = `telFunc${funcionario.id_funcionario}`;
                inputTel.classList.add('editable-table-input');
                tdTel.appendChild(inputTel);
                
                const tdFuncao = document.createElement('td');
                tdFuncao.classList.add('table-cellula');
                tdFuncao.appendChild(selectFuncao);
                
                const tdBotoes = document.createElement('td');
                tdBotoes.classList.add('table-cellula', 'table-cellula-buttons');
                const btnSalvar = document.createElement('button');
                btnSalvar.classList.add('button');
                btnSalvar.id = `btn-salvar-${funcionario.id_funcionario}`;
                btnSalvar.textContent = 'Salvar';
                const btnExcluir = document.createElement('button');
                btnExcluir.classList.add('button');
                btnExcluir.id = `btn-excluir-${funcionario.id_funcionario}`;
                btnExcluir.textContent = 'Excluir';
                tdBotoes.appendChild(btnSalvar);
                tdBotoes.appendChild(btnExcluir);
                
                trFuncionario.appendChild(tdNome);
                trFuncionario.appendChild(tdTel);
                trFuncionario.appendChild(tdFuncao);
                trFuncionario.appendChild(tdBotoes);
                
                document.getElementById('tabelaFunc').appendChild(trFuncionario);
                btnExcluir.addEventListener('click', () => removerFuncionario(funcionario.id_funcionario));
                btnSalvar.addEventListener('click', () => atualizarFuncionario(funcionario.id_funcionario));
            }
        /*} catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }*/
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
                nome_funcionario: document.getElementById(`nomeFunc${id}`).value,
                telefone_funcionario: document.getElementById(`telFunc${id}`).value,
                id_funcoes: document.getElementById(`selectFuncao${id}`).value
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
                    id_funcoes: document.getElementById('nomeFuncaoNew').value
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
        NewFuncao(funcao);
    }