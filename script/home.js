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

const loader_1 = document.querySelector('.loader__1')
const loader_2 = document.querySelector('.loader__2')
const loadPage = document.querySelector('.loading-page')
const logo = document.querySelector('.logo')


//brigthness of bars after the loading 
function loadingBrightness(){
    setTimeout(function(){
    loader_1.classList.add('loadingBrightness_cyan')  
    loader_2.classList.add('loadingBrightness_orange')
    }, 2000)
}

function loadPageMove(){
    setTimeout(function(){
        logo.style.transform = 'translateY(-100%)'
        logo.style.opacity = '0';
        setTimeout(function(){
            loadPage.style.opacity = '0';
            setTimeout(function(){
                loadPage.style.display = 'none';
            },1000)
        }, 2000)
    }, 3500)
}

//animation of loading bars
window.addEventListener('load', function(){
    loader_1.style.left = '0%'
    loader_2.style.right = '50%'
    loadingBrightness()
    loadPageMove()
})

