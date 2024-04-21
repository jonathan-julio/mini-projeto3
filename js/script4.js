class Tarefa {
    constructor(id, descricao, data,comentario,prioridade,notificacao) {
        this.id = id;
        this.descricao = descricao;
        this.data = data;
        this.comentario =comentario;
        this.prioridade = prioridade;
        this.notificacao=notificacao;
    }
}

const prioridadesMap = {
    "alta": 3,
    "media": 2,
    "baixa": 1
};
var taskSelectId = 0;
const listaDeTarefas = [];

const formTarefa = document.getElementById('formTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const comentario = document.getElementById('comentario');
const descricao = document.getElementById('descricao');
const data = document.getElementById('data');
const prioridade = document.getElementById('prioridade');
const notificacao = document.getElementById('notificacao');
const expandedDiv = document.querySelector('.expanded');

setDataInicial();


formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();

    const idTarefa = gerarIdTarefa(); // Gerar ID pseudoaleatório
    const tarefa = new Tarefa(idTarefa, descricao.value, data.value, 
        comentario.value, prioridade.value, notificacao.value);
    listaDeTarefas.push(tarefa);
    refreshList();
    formTarefa.reset();
    setDataInicial();
});

function gerarIdTarefa() {
    // Gera um ID pseudoaleatório usando Math.random() e Date.now()
    return Math.floor(Math.random() * 9999) + 1;
}

function setDataInicial() {
    const dataInicial = new Date();
    const dataFormatada = dataInicial.toISOString().split('T')[0];
    data.value = dataFormatada;
}

function formataData(data){
    const dataEscolhida = new Date(data);
    const dia = (dataEscolhida.getDate()+ 1).toString().padStart(2, '0');
    const mes = (dataEscolhida.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataEscolhida.getFullYear();
    return `${dia}/${mes}/${ano}`;

}

function converterDataParaFormatoISO(dataString) {
    var partes = dataString.split('/');
    if (partes.length !== 3) {
        console.error('Formato de data inválido. Use dd/mm/yyyy.');
        return null;
    }
    var dataISO = partes[2] + '-' + partes[1] + '-' + partes[0];
    return dataISO;
}

function findIndexById(id) {
    for (let i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].id === id) {
            return i;
        }
    }
    return -1; // Retorna -1 se o ID não for encontrado na lista
}



function edit() {
    var buttons = document.querySelector('.buttons');
    buttons.innerHTML = '<button onclick="salvar()">Salvar</button><button onclick="cancelar()">Cancelar</button>';

    var data = document.getElementById('data2');
    var descricao = document.getElementById('descricao2');
    var comentario = document.getElementById('comentario2');
    var prioridade = document.getElementById('prioridade2');
    var notificacao = document.getElementById('notificacao2');

    data.innerHTML = '<input type="date" id="editData" value="' + converterDataParaFormatoISO(data.innerHTML) + '">';
    descricao.innerHTML = '<input type="text" id="editDescricao" value="' + descricao.innerHTML + '">';
    comentario.innerHTML = '<input type="text" id="editComentario" value="' + comentario.innerHTML + '">';
    prioridade.innerHTML = '<input type="text" id="editPrioridade" value="' + prioridade.innerHTML + '">';
    notificacao.innerHTML = '<input type="text" id="editNotificacao" value="' + notificacao.innerHTML + '">';
}


function expandir(id){
    var index = findIndexById(id)

    var data = document.getElementById('data2');
    data.textContent = formataData(listaDeTarefas[index].data);
    var descricao = document.getElementById('descricao2');
    descricao.textContent = listaDeTarefas[index].descricao;
    var comentario = document.getElementById('comentario2');
    comentario.textContent = listaDeTarefas[index].comentario;
    var prioridade = document.getElementById('prioridade2');
    prioridade.textContent = listaDeTarefas[index].prioridade;
    var notificacao = document.getElementById('notificacao2');
    notificacao.textContent = listaDeTarefas[index].notificacao;

    expandedDiv.style.display = 'flex';
    taskSelectId = id;
}


function closeScreen() {
    expandedDiv.style.display = 'none';
    taskSelectId = 0;
}


function salvar() {
    var buttons = document.querySelector('.buttons');
    buttons.innerHTML = '<button onclick="edit()">Editar</button><button onclick="remove()">Excluir</button>';

    var index = findIndexById(taskSelectId);
    if (index === -1) {
        console.error('Índice inválido.');
        return;
    }

    var dataInput = document.getElementById('data2').querySelector('input').value;
    var descricaoInput = document.getElementById('descricao2').querySelector('input').value;
    var comentarioInput = document.getElementById('comentario2').querySelector('input').value;
    var prioridadeInput = document.getElementById('prioridade2').querySelector('input').value;
    var notificacaoInput = document.getElementById('notificacao2').querySelector('input').value;

    listaDeTarefas[index].data = dataInput; 
    listaDeTarefas[index].descricao = descricaoInput;
    listaDeTarefas[index].comentario = comentarioInput;
    listaDeTarefas[index].prioridade = prioridadeInput;
    listaDeTarefas[index].notificacao = notificacaoInput;

    atualizarCamposHTML(index);
    refreshList();
}

function atualizarCamposHTML(index) {
    var dataElement = document.getElementById('data2');
    var descricaoElement = document.getElementById('descricao2');
    var comentarioElement = document.getElementById('comentario2');
    var prioridadeElement = document.getElementById('prioridade2');
    var notificacaoElement = document.getElementById('notificacao2');

    dataElement.textContent = formataData(listaDeTarefas[index].data);
    descricaoElement.textContent = listaDeTarefas[index].descricao;
    comentarioElement.textContent = listaDeTarefas[index].comentario;
    prioridadeElement.textContent = listaDeTarefas[index].prioridade;
    notificacaoElement.textContent = listaDeTarefas[index].notificacao;
}

function cancelar(){
    
    var index = findIndexById(taskSelectId)

    var data = document.getElementById('data2');
    var descricao = document.getElementById('descricao2');
    var comentario = document.getElementById('comentario2');
    var prioridade = document.getElementById('prioridade2');
    var notificacao = document.getElementById('notificacao2');
    
    // Restaurar os valores originais dos campos de texto
    data.innerHTML = formataData(listaDeTarefas[index].data);
    descricao.innerHTML = listaDeTarefas[index].descricao;
    comentario.innerHTML = listaDeTarefas[index].comentario;
    prioridade.innerHTML = listaDeTarefas[index].prioridade;
    notificacao.innerHTML = listaDeTarefas[index].comentario;

    var buttons = document.querySelector('.buttons');
    buttons.innerHTML = '<button onclick="edit()">Editar</button><button onclick="remove()">Excluir</button>';
    refreshList();
}


function remove() {
    var index = findIndexById(taskSelectId)
    listaDeTarefas.splice(index, 1);
    closeScreen();
    refreshList();
}

function refreshList(){
    listIsEmpty()
    var tbody = listaTarefas.querySelector(`.tbody`);
    if (tbody) {
        tbody.innerHTML = "";
        for (let index = 0; index < listaDeTarefas.length; index++) {
            const element = listaDeTarefas[index];
            const novaLinha = document.createElement('tr');
            novaLinha.classList.add('tarefa');
            novaLinha.innerHTML = `
                <td id="data">${formataData(element.data)}</td>
                <td id="descricao">${element.descricao}</td>
                <td id="prioridade">${element.prioridade}</td>
                <td>
                    <button id="button" onclick="expandir(${element.id})" class="expandir">Expandir</button>
                </td>
            `;
            novaLinha.setAttribute('id', `${element.id}`);
            tbody.appendChild(novaLinha);
        }
    }
}


function listIsEmpty(){
    const criterio = document.getElementById("ordenacao");
    if (listaDeTarefas.length > 0) {
        listaTarefas.innerHTML = "";
        criterio.style.display = 'block';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Prioridade</th>
                <th>Ação</th>
            </tr>
        `;
        listaTarefas.appendChild(thead);
        const tbody = document.createElement('tbody');
        tbody.classList.add('tbody');
        listaTarefas.appendChild(tbody)
        
    } else {
        listaTarefas.innerHTML = "<div>Nenhuma tarefa cadastrada</div>";
        criterio.style.display = 'none';
    }
}

function ordenarTarefas() {
    const criterio = document.getElementById("ordem").value;
    if (criterio === "dataMaior") {
        listaDeTarefas.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else if (criterio === "dataMenor") {
        listaDeTarefas.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (criterio === "prioridade") {
        listaDeTarefas.sort((a, b) => prioridadesMap[b.prioridade] - prioridadesMap[a.prioridade]);
    } else if (criterio === "descricao") {
        listaDeTarefas.sort((a, b) => a.descricao.localeCompare(b.descricao));
    }
    refreshList()
}
listIsEmpty();