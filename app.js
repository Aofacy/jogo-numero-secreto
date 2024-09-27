let listaSorteados = [];
let limiteLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;    

    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = 'Você descobriu o número secreto em ' + tentativas + ' ' + palavraTentativa + '!';

        exibirTextoNaTela('h1', 'VOCÊ ACERTOU!!!');
        exibirTextoNaTela('p', mensagemTentativas);
        
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', "Você errou...");
            exibirTextoNaTela('p', 'O número secreto é menor. Tente de novo!');
        } else {
            exibirTextoNaTela('h1', 'Você errou...');
            exibirTextoNaTela('p', 'O número secreto é maior. Tente de novo!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * limiteLista + 1);
    let qtdElementosLista = listaSorteados.length;

    if (qtdElementosLista == limiteLista){
        listaSorteados = [];
    }

    if (listaSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaSorteados.push(numeroEscolhido);
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}