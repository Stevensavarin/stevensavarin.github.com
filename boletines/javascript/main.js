// Obetener los elementos de la clase .close

let links = document.querySelectorAll(".close");

// Recorrerlos

links.forEach(function(link){

    // Agregar un evento click a cada uno de ellos
    link.addEventListener("click",function(ev){
        ev.preventDefault();
        let content= document.querySelector('.content');


    // remove class
    content.classList.remove("animate__animated animate__fadeInDown");
    content.classList.remove("animate__animated");

    //add

    content.classList.add("animate__animated animate__fadeOutUp")
    content.classList.add("animate__animated")

    setTimeout(function() {
        location.href="/boletines";

    }, 600);

    return false;
        
    });
});



