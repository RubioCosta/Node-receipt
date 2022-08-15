document.querySelectorAll('.client').forEach(item=>{
    item.addEventListener('click', select);
});

function select(e) {
    var id = e.currentTarget.querySelector('.client > *').parentNode;
    console.log(id);
}