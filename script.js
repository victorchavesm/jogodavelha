const tabuleiro = document.getElementById('tabuleiro');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

let jogadorAtual = 'X';
let jogoTerminado = false;
let estadoTabuleiro = Array(9).fill(null);


const combinacoesVencedoras = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

function criarTabuleiro() {
    tabuleiro.innerHTML = ''; // Limpar o tabuleiro
    estadoTabuleiro.forEach((celula, indice) => {
        const divCelula = document.createElement('div');
        divCelula.classList.add('celula', 'd-flex');
        if (celula) {
            divCelula.textContent = celula;
            divCelula.classList.add('desativada');
        }
        divCelula.addEventListener('click', () => fazerJogada(indice));
        tabuleiro.appendChild(divCelula);
    });
}

function verificarFimDoJogo() {
    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (
            estadoTabuleiro[a] &&
            estadoTabuleiro[a] === estadoTabuleiro[b] &&
            estadoTabuleiro[a] === estadoTabuleiro[c]
        ) {
            return estadoTabuleiro[a]; // Retorna o vencedor
        }
    }

    if (!estadoTabuleiro.includes(null)) {
        return 'Empate';
    }

    return null; // Jogo continua
}


function fazerJogada(indice) {
    if (jogoTerminado || estadoTabuleiro[indice]) return;

    estadoTabuleiro[indice] = jogadorAtual;
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    atualizarJogo();
}

function atualizarJogo() {
    criarTabuleiro();
    const resultado = verificarFimDoJogo();
    if (resultado) {
        jogoTerminado = true;
        if (resultado === 'Empate') {
            mensagem.textContent = 'O jogo terminou em empate!';
            mensagem.classList.add('text-warning');
        } else {
            mensagem.textContent = `Jogador ${resultado} venceu!`;
            mensagem.classList.add('text-success');
        }
    } else {
        mensagem.textContent = `Vez do jogador ${jogadorAtual}`;
        mensagem.classList.remove('text-success', 'text-warning');
    }
}

function reiniciarJogo() {
    jogadorAtual = 'X';
    jogoTerminado = false;
    estadoTabuleiro = Array(9).fill(null);
    mensagem.textContent = 'Vez do jogador X';
    mensagem.classList.remove('text-success', 'text-warning');
    criarTabuleiro();
}

botaoReiniciar.addEventListener('click', reiniciarJogo);
reiniciarJogo();
