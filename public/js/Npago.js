var valor = document.querySelectorAll('.area-client').forEach(item =>{
    item.addEventListener('click', select);
});

function select(e){
    let event = e.currentTarget.querySelector(".area-client > *").parentNode;
    console.log(event.getAttribute('id'));
    let style = event.querySelector('#tag');
    let name = event.querySelector('#tag').getAttribute('class');
    if (name == "tagN") {
        style.className = "tagP";
    } else if (name =="tagP"){
        style.className = "tagN";
    }
}