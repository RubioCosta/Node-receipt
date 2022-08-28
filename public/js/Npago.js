const socket = io();

document.querySelectorAll('.area-client').forEach(item =>{
    item.addEventListener('click', select);
});

function select(e){
    let event = e.currentTarget.querySelector(".area-client > *").parentNode;
    let id = event.getAttribute('id');
    let style = event.querySelector('#tag');
    let name = event.querySelector('#tag').getAttribute('class');
    if (name == "tagN") {
        style.className = "tagP";
    } else if (name =="tagP"){
        style.className = "tagN";
    }

    socket.emit('pagoN', id);

    socket.on('npagoN', (busca)=>{ 
        document.querySelector('.quant').innerHTML = `&nbsp${busca.length}&nbsp`;
        let lista = document.querySelectorAll(".area-client");
        for(var i = lista.length - 1; i >= 0; i--){
            lista[i].remove()
        }
        for(var i = 0; i < busca.length; i++){
            let div = document.createElement("div");
            div.setAttribute('class', "area-client");
            div.setAttribute('id', `${busca[i].id}`);
            document.querySelector('.area-debt').appendChild(div).innerHTML = `<div class="tagN" id="tag"></div>
            <div class="area-info"><div class="area-left"><div class="area-client-info">Nome: ${busca[i].child}</div>
            <div class="area-client-info">Valor: ${busca[i].value},00</div></div><div class="area-right"><div class="area-client-info">Telefone: ${busca[i].fone}</div><div class="area-client-info">Escola: ${busca[i].school}</div></div></div>`;
        }
        document.querySelectorAll('.area-client').forEach(item =>{
            item.addEventListener('click', select);
        });
        socket.off();
    });
}
