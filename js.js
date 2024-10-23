const canvas = document.getElementById('gameCanvas');// pwga o id 'gameCanvas'
const ctx = canvas.getContext('2d');//criar um espaço em brnco com propriedade 2d

const larguracanvas = 320;
const alturacanvas = 480;

//atribui a largura e altura do canva ao valor atribuido na var acima
canvas.width = larguracanvas;//certifiuqem de nao errar o th
canvas.height = alturacanvas;

//config do pasarinho
let passaro = {
    x: 50,
    y: alturacanvas / 2,
    largura: 30,
    altura: 30,
    gravidade: 0.5,
    impulso: -10,
    velocidade: 0,
    cor: 'yellow',
};

let canos = [];

const larguraCano = 50;
const espacoCano = 150;
const velocidadeCano = 2;
let pontuacao = 0;
let recorde = 0;
let jogoAcabado = false;

//fun p desenh o passaro
function desenharPassarinho() {
    ctx.fillStyle = passaro.cor;
    ctx.fillRect(passaro.x, passaro.y, passaro.largura, passaro.altura)
}

//função para desenharos canos
function desenharCanos() {
    canos.forEach(cano => {//para cada cano la ele
        ctx.fillStyle = 'green'//preencha de verde
        ctx.fillRect(cano.x, 0, larguraCano, cano.topo)// 4 valores no retangulo
        ctx.fillRect(cano.x, alturacanvas - cano.fundo, larguraCano, cano.fundo)
    })
}

//função p desenhar o placar
function desenharPlacar() {
    ctx.fillStyle = 'black'//deixa preto
    ctx.font = '20px Arial'//preenche o tamnho e fonte
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 50)//exibe o ecord acima do placar
}

//função p desenhar o record
function desenharRecorde() {
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';//preenche o tamanho e fonte
    ctx.fillText(`Recorde: ${recorde}`, 10, 30);//exibe o record acima do placar
}


//atualização a posição e a velocidade do passaro
function atualizarPassaro() {
    passaro.velocidade += passaro.gravidade;
    passaro.y += passaro.velocidade;

    //garante q o passaro n saia da tela
    if (passaro.y + passaro.altura > alturacanvas) {
        passaro.y = alturacanvas - passaro.altura;
        passaro.velocidade = 0;
    }

    if (passaro.y < 0) {
        passaro.y = 0;
        passaro.velocidade = 0;
    }
}


//alualiza a posição dos cano e add novos canos
function atualizarCano() {
    canos.forEach(cano => {
        cano.x -= velocidadeCano;
    });
    //removem canos q sairam da tela e incrementa a pontuação

    if (canos.length > 0 && canos[0].x + larguraCano < 0) {
        canos.shift();//metodo 'shit' é ut para remover e rotonar o pri elemneto de um array


        pontuacao++; //pontuacao = potuacao + 1



        //atualizaçao e recorde se a pontuacao atual for maior
        if (pontuacao > recorde) {
            recorde = pontuacao
        }
    }

    //add um novo cano se necessario
    if (canos.length === 0 || canos[canos.length - 1].x < larguracanvas - 150) {
        const alturaTopoCano = Math.floor(Math.random() * (alturacanvas - espacoCano));
        canos.push({
            x: larguracanvas,
            topo: alturaTopoCano,
            fundo: alturacanvas - espacoCano - alturaTopoCano
        })
    }

}

//verifica se a colisao entre o passaro e os canos
function verificarColisao() {
    for (const cano of canos) {
        if (passaro.x < cano.x + larguraCano &&
            passaro.x + passaro.largura > cano.x &&
            (passaro.y < cano.topo || passaro.y + passaro.altura >
                alturacanvas - cano.fundo
            )) {
            return true;
        }
    }
    return false;
}


//desenho o jogo passaro , canos, placar e record 
function desenhar() {
    ctx.clearRect(0, 0, larguracanvas, alturacanvas)
    desenharPassarinho();
    desenharCanos();
    desenharRecorde();
    desenharPlacar();
}


function atualizar() {
    if (!jogoAcabado) {
        atualizarPassaro();
        atualizarCano();
        if (verificarColisao()) {
            jogoAcabado = true;
            alert(`Game over! Sua pontuação foi ${pontuacao}.`)
            reiniciarJogo();
            return;
        }
    }
}


function loop() {
    atualizar();
    desenhar();
    desenharPlacar();
    desenharRecorde();
    requestAnimationFrame(loop);
}


function reiniciarJogo() {
    passaro = {
        x: 50,
        y: alturacanvas / 2,
        largura: 30,
        altura: 30,
        gravidade: 0.5,
        impulso: -10,
        velocidade: 0,
        cor: "yellow",
    };
    canos = [];
    pontuacao = 0;
    jogoAcabado = false

}


canvas.addEventListener('click', () => {
    if (!jogoAcabado) {
        passaro.velocidade = passaro.impulso
    }
});


document.addEventListener(`DOMContentLoaded`, () => {
    reiniciarJogo()
    loop()
})