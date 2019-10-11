const menu = document.querySelector('.menu')
const header = document.querySelector('.explore__header')
const footer = document.querySelector('.footer')

/* BUTTONS MENU */

const menuLogo = document.querySelector('.explore__header__menu__logo')

const menuClose = document.querySelector('.menu__header__close')

/* BUTTONS NEXT PREVIOUS */

const next = document.querySelector('.footer__next__container')

const previous = document.querySelector('.footer__previous__container')

/* OPEN MENU */

menuLogo.addEventListener('click', function(){
    menu.classList.toggle('hidden')
    header.classList.toggle('fixed')
    footer.classList.toggle('fixed')
})

/* CLOSE MENU */

menuClose.addEventListener('click', function(){
    menu.classList.add('hidden')
    header.classList.add('fixed')
    footer.classList.add('fixed')
})




/* CHARACTERS */

const name1 = document.querySelector('.name1')
const name2 = document.querySelector('.name2')
const name3 = document.querySelector('.name3')
const name4 = document.querySelector('.name4')
const name5 = document.querySelector('.name5')
const name6 = document.querySelector('.name6')
const name7 = document.querySelector('.name7')
const name8 = document.querySelector('.name8')
const name9 = document.querySelector('.name9')
const descriptionTitle = document.querySelector('.imageDescription h2')
const descriptionText = document.querySelector('.imageDescription p')

name1.addEventListener(
    'click',
    function(){
      descriptionTitle.innerHTML = "SAM FLYNN"
      descriptionText.innerHTML = "Sam is the son of Kevin Flynn,he was deeply affected by the mysterious disappearance of his father in 1989. He refuses any contact with ENCOM, the computer company that was formerly run by his father."
      name1.style.opacity = "1"
      name2.style.opacity = "0.5"
      name3.style.opacity = "0.5"
      name4.style.opacity = "0.5"
      name5.style.opacity = "0.5"
      name6.style.opacity = "0.5"
      name7.style.opacity = "0.5"
      name8.style.opacity = "0.5"
      name9.style.opacity = "0.5"
    }
)

name2.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "KEVIN FLYNN"
    descriptionText.innerHTML = "Kevin Flynn,is  a game design genius and the father of Sam Flynn. He claimed to have made an incredible discovery that would revolutionize the world, but he mysteriously disappeared in 1989 before revealing his secret."
    name1.style.opacity = "0.5"
    name2.style.opacity = "1"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name3.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "CLU"
    descriptionText.innerHTML = "Clu was originally a research program created by Kevin Flynn to explore inside the ENCOM mainframe. Flynn has created another program named CLU after returning from the grid with a more specific task in mind…"
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "1"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name4.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "QUORRA"
    descriptionText.innerHTML = "A program, a warrior adept and confidant of Kevin Flynn in the TRON system."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "1"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name5.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "ALAN BRADLEY"
    descriptionText.innerHTML = "Alan, an experienced ENCOM programmer, is Kevin Flynn's best friend. After Flynn's death in 1989, Alan continued to protect the company at ENCOM and married Dr. Lora Baines."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "1"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name6.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "CASTOR"
    descriptionText.innerHTML = "Castor is a well-known Grid live program that runs the End of Line Club at the top of the Tron Town Tower."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "1"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name7.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "RINZLER"
    descriptionText.innerHTML = "Rinzler is an exceptionally talented warrior and an elite fighter in all grid games. He takes his orders from Clu."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "1"
    name8.style.opacity = "0.5"
    name9.style.opacity = "0.5"
  }
)

name8.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "JARVIS"
    descriptionText.innerHTML = "Right Arm and Chief Intelligence Officer of CLU."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "1"
    name9.style.opacity = "0.5"
  }
)

name9.addEventListener(
  'click',
  function(){
    descriptionTitle.innerHTML = "GEM"
    descriptionText.innerHTML = "Gem belongs to a group of programs called Sirens. Its function is to prepare programs for games by providing an adjusted armor - and in the case of Sam Flynn - an ID disc."
    name1.style.opacity = "0.5"
    name2.style.opacity = "0.5"
    name3.style.opacity = "0.5"
    name4.style.opacity = "0.5"
    name5.style.opacity = "0.5"
    name6.style.opacity = "0.5"
    name7.style.opacity = "0.5"
    name8.style.opacity = "0.5"
    name9.style.opacity = "1"
  }
)

/* GALLERY */

