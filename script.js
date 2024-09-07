// Temas com as respectivas palavras possíveis
const temas = {
    frutas: ["cacau", "amora", "manga", "uva", "caqui", "limão", "mamão", "melão"],
    animais: ["tigre", "lebre", "lesma", "arara", "cabra", "cisne", "cobra", "corvo", "coala", "furão", "grilo", "ganso", "hiena", "panda", "pavão", "urubu", "zebra"],
    países: ["china", "índia", "egito", "haiti", "catar", "chile", "iêmen", "guiné", "síria", "japão", "chade", "butão", "níger", "gabão", "suíça", "líbia", "malta", "samoa"],
    cores: ["verde", "cinza", "preto", "prata", "lilás"],
    comidas: ["pudim", "pizza", "torta", "crepe", "sonho", "sushi", "bauru"],
    bebidas: ["cidra", "leite", "saquê", "vinho", "chopp", "licor", "vodca"]
};

let palavraEscolhida = "";
let temaAtual = "";
let tentativaAtual = 0;
let maxTentativas = 5; // Definir o número máximo de tentativas

// Função para buscar o tema digitado
function Pesquisar() {
    const Input = document.getElementById('Input').value.toLowerCase();
    const messageDiv = document.getElementById('message');
    const gameDiv = document.getElementById('game');
    
    if (temas[Input]) {
        temaAtual = Input;
        palavraEscolhida = getPalavraAleatoria(temaAtual);
        messageDiv.innerText = ""; // Limpa a mensagem de erro
        iniciaJogo(temaAtual);
    } else {
        gameDiv.style.display = 'none'; // Esconde o jogo caso não encontre o tema
        messageDiv.innerText = "Tema não encontrado. Tente outro tema.";
    }
}

// Função para iniciar o jogo
function iniciaJogo(tema) {
    palavraEscolhida = getPalavraAleatoria(tema);
    document.getElementById("titulo-tema").innerText = `Tema: ${tema.charAt(0).toUpperCase() + tema.slice(1)}`;
    document.getElementById("temas").style.display = "none";
    document.getElementById("game").style.display = "block";
    createGrid();
    tentativaAtual = 0; // Reinicia as tentativas
}

// Função para obter uma palavra aleatória do tema
function getPalavraAleatoria(tema) {
    const themeWords = temas[tema];
    return themeWords[Math.floor(Math.random() * themeWords.length)].toLowerCase();
}

// Função para criar o grid de tentativas
function createGrid() {
    const wordGrid = document.getElementById("word-grid");
    wordGrid.innerHTML = ""; // Limpa o grid para cada novo jogo

    // Cria 5 linhas com 5 caixas de letra cada
    for (let i = 0; i < maxTentativas; i++) {
        for (let j = 0; j < 5; j++) {
            const div = document.createElement("div");
            div.classList.add("letter-box");
            wordGrid.appendChild(div);
        }
    }
}

// Função para lidar com a tentativa do usuário
function handleGuess(event) {
    if (event.key === "Enter") {
        const guess = event.target.value.toLowerCase();
        
        // Verifica se a palavra tem 5 letras
        if (guess.length !== 5) {
            mostraMensagem("A palavra deve ter 5 letras!");
            return;
        }

        // Verifica o número de tentativas
        if (tentativaAtual < maxTentativas) {
            checkGuess(guess);
            tentativaAtual++;
            event.target.value = "";
        } else {
            mostraMensagem("Você já usou todas as suas tentativas!");
        }
    }
}

// Função para verificar a tentativa do usuário
function checkGuess(guess) {
    const wordGrid = document.getElementById("word-grid");
    const start = tentativaAtual * 5; // Define a linha atual no grid
    
    for (let i = 0; i < 5; i++) {
        const letterBox = wordGrid.children[start + i];
        letterBox.innerText = guess[i];
        
        // Verifica se a letra está correta e na posição correta
        if (guess[i] === palavraEscolhida[i]) {
            letterBox.style.backgroundColor = "green";
        } else if (palavraEscolhida.includes(guess[i])) {
            letterBox.style.backgroundColor = "yellow";
        } else {
            letterBox.style.backgroundColor = "#ccc";
        }
    }

    // Verifica se a palavra foi adivinhada corretamente
    if (guess === palavraEscolhida) {
        mostraMensagem("Parabéns!! Você acertou!", "green");
    }
}

// Função para exibir mensagens
function mostraMensagem(text, color = "red") {
    const message = document.getElementById("message");
    message.innerText = text;
    message.style.color = color;
}
