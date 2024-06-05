//Constantes

const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBT = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const comecarPlay = new Audio('sons/play.wav')
const comecarPause = new Audio('sons/pause.mp3')
const alarmeCronometro = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true

//Funções

//Ativando funionalidades dos botões principais
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    // Alterando o contexto da página
    html.setAttribute('data-contexto', contexto)
    
    // Alterando a Imagem do banner
    banner.setAttribute('src', `imagens/${contexto}.png`)

    // Alterando texto da chamada
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break;
        default:
            break;
    }
}

// Adicionando música ao botao musica

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

// Alterando o data-contexto da página

/* Exemplo de alteração do contexto
focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', 'imagens/foco.png')
})*/

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

// Botão cronômetro
// Cronometro
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        alarmeCronometro.play()
        alert('Tempo finalizado')
        zerar()
        //tempoDecorridoEmSegundos = 5
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        comecarPause.play()
        zerar()
        return
    }
    comecarPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBT.textContent = "Pausar"
    iniciarOuPausarIcon.setAttribute('src', 'imagens/pause.png')


}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarIcon.setAttribute('src', 'imagens/play_arrow.png')
    iniciarOuPausarBT.textContent = `Começar`
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()