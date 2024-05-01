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
    "Alta": 3,
    "Média": 2,
    "Baixa": 1
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
    return -1; 
}

function resetForm(){
    formTarefa.reset();
    setDataInicial();
}



function edit() {
    var buttons = document.querySelector('.buttons');
    buttons.innerHTML = '<button type="submit" onclick="salvar()">Salvar</button><button type="cancel" onclick="cancelar()">Cancelar</button>';

    var data = document.getElementById('dataExpanded');
    var descricao = document.getElementById('descricaoExpanded');
    var comentario = document.getElementById('comentarioExpanded');
    var prioridade = document.getElementById('prioridadeExpanded');
    var notificacao = document.getElementById('notificacaoExpanded');
    var selectPrioridade = prioridade.innerHTML;
    var selectNotificacao = notificacao.innerHTML;

    data.innerHTML = '<input type="date" id="editData" value="' + converterDataParaFormatoISO(data.innerHTML) + '">';
    descricao.innerHTML = '<input type="text" id="editDescricao" value="' + descricao.innerHTML + '">';
    comentario.innerHTML = '<input type="text" id="editComentario" value="' + comentario.innerHTML + '">';
    prioridade.innerHTML = '<select id="editPrioridade" required><option value="Alta" selected>Alta</option><option value="Média">Média</option><option value="Baixa">Baixa</option></select>';
    notificacao.innerHTML = '<select id="editNotificacao" required> <option value="Sim">Sim</option> <option value="Não">Não</option></select>';
    
    setSelects(selectNotificacao,selectPrioridade)
}

function setSelects(notificacao,prioridade){
    var selectNotificacao = document.getElementById("editNotificacao");
    selectNotificacao.value = notificacao;
    var selectPrioridade = document.getElementById("editPrioridade");
    selectPrioridade.value = prioridade;
    console.log(prioridade)
}



function expandir(id){
    var index = findIndexById(id)

    var data = document.getElementById('dataExpanded');
    data.textContent = formataData(listaDeTarefas[index].data);
    var descricao = document.getElementById('descricaoExpanded');
    descricao.textContent = listaDeTarefas[index].descricao;
    var comentario = document.getElementById('comentarioExpanded');
    comentario.textContent = listaDeTarefas[index].comentario;
    var prioridade = document.getElementById('prioridadeExpanded');
    prioridade.textContent = listaDeTarefas[index].prioridade;
    var notificacao = document.getElementById('notificacaoExpanded');
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
    buttons.innerHTML = '<button type="submit" onclick="edit()">Editar</button><button type="button" onclick="remove()">Excluir</button>';

    var index = findIndexById(taskSelectId);
    if (index === -1) {
        console.error('Índice inválido.');
        return;
    }

    var dataInput = document.getElementById('dataExpanded').querySelector('input').value;
    var descricaoInput = document.getElementById('descricaoExpanded').querySelector('input').value;
    var comentarioInput = document.getElementById('comentarioExpanded').querySelector('input').value;
    var prioridadeInput = document.getElementById('prioridadeExpanded').querySelector('select').value;
    var notificacaoInput = document.getElementById('notificacaoExpanded').querySelector('select').value;

    listaDeTarefas[index].data = dataInput; 
    listaDeTarefas[index].descricao = descricaoInput;
    listaDeTarefas[index].comentario = comentarioInput;
    listaDeTarefas[index].prioridade = prioridadeInput;
    listaDeTarefas[index].notificacao = notificacaoInput;

    atualizarCamposHTML(index);
    refreshList();
}

function atualizarCamposHTML(index) {
    var dataElement = document.getElementById('dataExpanded');
    var descricaoElement = document.getElementById('descricaoExpanded');
    var comentarioElement = document.getElementById('comentarioExpanded');
    var prioridadeElement = document.getElementById('prioridadeExpanded');
    var notificacaoElement = document.getElementById('notificacaoExpanded');

    dataElement.textContent = formataData(listaDeTarefas[index].data);
    descricaoElement.textContent = listaDeTarefas[index].descricao;
    comentarioElement.textContent = listaDeTarefas[index].comentario;
    prioridadeElement.textContent = listaDeTarefas[index].prioridade;
    notificacaoElement.textContent = listaDeTarefas[index].notificacao;
}

function cancelar(){
    
    var index = findIndexById(taskSelectId)

    var data = document.getElementById('dataExpanded');
    var descricao = document.getElementById('descricaoExpanded');
    var comentario = document.getElementById('comentarioExpanded');
    var prioridade = document.getElementById('prioridadeExpanded');
    var notificacao = document.getElementById('notificacaoExpanded');
    
    // Restaurar os valores originais dos campos de texto
    data.innerHTML = formataData(listaDeTarefas[index].data);
    descricao.innerHTML = listaDeTarefas[index].descricao;
    comentario.innerHTML = listaDeTarefas[index].comentario;
    prioridade.innerHTML = listaDeTarefas[index].prioridade;
    notificacao.innerHTML = listaDeTarefas[index].notificacao;

    var buttons = document.querySelector('.buttons');
    buttons.innerHTML = '<button type="submit" onclick="edit()">Editar</button><button type="button" onclick="remove()">Excluir</button>';
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
                    <button type="submit" id="button" onclick="expandir(${element.id})" class="expandir">Expandir</button>
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