const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {//13 é a tecla Enter
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);

    }
});

function limpaImput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaImput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){//apagar a tarefa
    const el = e.target;

    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();