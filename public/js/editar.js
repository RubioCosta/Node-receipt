const socket = io();
var pai = document.querySelector('.area-pai input');
var mae = document.querySelector('.area-mae input');
var filho = document.querySelector('.area-nome input');
var escola = document.querySelector('.area-escola input');
var fone = document.querySelector('.area-fone input');
var valor = document.querySelector('.area-value input');
var idUser;
document.querySelectorAll('.area-names .client').forEach(item=>{
    item.addEventListener('click', select);
});
document.querySelector('#salvar').addEventListener('click', salvar);
document.querySelector('#excluir').addEventListener('click', excluir);
document.querySelector('.search').addEventListener('keyup', busca);

function busca(e){
    if (e.keyCode == 13){
        buscaUser = document.querySelector('.search').value;
        socket.emit('enviar-busca', buscaUser);
        socket.on('reenviar-busca', (busca)=>{ 
            let lista = document.querySelectorAll(".client");
            for(var i = lista.length - 1; i >= 0; i--){
                lista[i].remove()
            }
            for(var i = 0; i < busca.length; i++){
                let div = document.createElement("div");
                div.setAttribute('class', "client");
                div.setAttribute('id', `${busca[i].id}`);
                document.querySelector('.area-names').appendChild(div).innerHTML = `<div class="name">Nome: ${busca[i].child}</div><div class="school">Escola: ${busca[i].school}</div>`;
            }
            document.querySelectorAll('.area-names .client').forEach(item=>{
                item.addEventListener('click', select);
            });
            socket.off();
        });
        
    }
}

function excluir(e){
    e.preventDefault();
    socket.emit('excluir-user', idUser);
    socket.on('reenviar-excluido', (busca)=>{ 
        let lista = document.querySelectorAll(".client");
        for(var i = lista.length - 1; i >= 0; i--){
            lista[i].remove()
        }
        for(var i = 0; i < busca.length; i++){
            let div = document.createElement("div");
            div.setAttribute('class', "client");
            div.setAttribute('id', `${busca[i].id}`);
            document.querySelector('.area-names').appendChild(div).innerHTML = `<div class="name">Nome: ${busca[i].child}</div><div class="school">Escola: ${busca[i].school}</div>`;
        }
        document.querySelectorAll('.area-names .client').forEach(item=>{
            item.addEventListener('click', select);
        });
        socket.off();
    });
}

function salvar(e){
    e.preventDefault();
    if(pai.value && mae.value && filho.value && escola.value && fone.value && valor.value) {
        let dados = {
            id: idUser,
            pai: pai.value,
            mae: mae.value,
            filho: filho.value,
            escola: escola.value,
            fone: fone.value,
            valor: valor.value
        };
        socket.emit('editar-user', dados);  
        socket.on('reenviar-editavel', (busca)=>{ 
            let lista = document.querySelectorAll(".client");
            for(var i = lista.length - 1; i >= 0; i--){
                lista[i].remove()
            }
            for(var i = 0; i < busca.length; i++){
                let div = document.createElement("div");
                div.setAttribute('class', "client");
                div.setAttribute('id', `${busca[i].id}`);
                document.querySelector('.area-names').appendChild(div).innerHTML = `<div class="name">Nome: ${busca[i].child}</div><div class="school">Escola: ${busca[i].school}</div>`;
            }
            document.querySelectorAll('.area-names .client').forEach(item=>{
                item.addEventListener('click', select);
            });
            socket.off();
        });
    }
}




function select(e) {
    let id = e.currentTarget.querySelector('.client > *').parentNode;
    idUser = id.getAttribute('id');
    socket.emit('enviar-id', id.getAttribute('id'));

    socket.on('enviar-dados', (dados)=>{ 
        pai.value = dados.father;
        mae.value = dados.mother;
        filho.value = dados.child;
        escola.value = dados.school;
        fone.value = dados.fone;
        valor.value = `${dados.value},00`;
    });

}


