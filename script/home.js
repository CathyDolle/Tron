//PARALLAX
document.addEventListener('mousemove' , parallax);
function parallax(e){
    this.querySelectorAll('.layer').forEach(layer => {
        let speed = layer.getAttribute('data-speed')
        let x = (window.innerWidth - e.pageX * speed)/100
        let y = (window.innerWidth - e.pageY * speed)/100
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}