var tabela = [
    [1,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,1]
];

class Controlador
{   
    static TURNOS = Object.freeze({
        MOSQUETEIROS: 1,
        GUARDAS: 0
    });

    static atual = Controlador.TURNOS.MOSQUETEIROS;
    static selecionado = null;
    static movimentos = [];

    static avancar()
    {
        Controlador.atual = (Controlador.atual + 1) % 2;
    }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const texto = document.querySelector("#turno");

function atualizar()
{   
    let html;

    if(Controlador.atual === Controlador.TURNOS.MOSQUETEIROS)
    {
        html = 'Vez: <span style="color:darkolivegreen;">Mosqueteiros</span>';
    }
    else if(Controlador.atual === Controlador.TURNOS.GUARDAS)
    {
        html = 'Vez: <span style="color:goldenrod;">Guardas</span>';
    }
    else
    {
        html = "FIM DE JOGO";
        texto.style.color = "red";
    }

    texto.innerHTML = html;
}

function renderizar()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < tabela.length; i++)
    {
        for(let j = 0; j < tabela[i].length; j++)
        {
            let x = j * 100;
            let y = i * 100;

            ctx.fillStyle = "burlywood";
            ctx.fillRect(x + 5, y + 5, 90, 90);

            if(Controlador.movimentos.some(m => (m[0] === i) && (m[1] === j)))
            {
                ctx.fillStyle = "whitesmoke";
            } 
            else
            {
                switch(tabela[i][j])
                {
                    case 1: 
                        ctx.fillStyle = "darkolivegreen"; 
                    break;   

                    case 0: 
                        ctx.fillStyle = "goldenrod"; 
                    break;

                    case 2: 
                    continue;
                }
            }

            ctx.beginPath();
            ctx.arc(x + 50, y + 50, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
    atualizar();
}

function calcularPosicao(x, y)
{
    return [Math.floor(y / 100), Math.floor(x / 100)];
}

function capturar(linha, coluna)
{
    let tempmovimentos = [];
    const direcoes = [[-1,0],[1,0],[0,-1],[0,1]];
    let pecaselecionada = tabela[linha][coluna];

    for (let [linhaincremento, colunaincremento] of direcoes)
    {   
        let posicaoy = linha + linhaincremento;
        let posicaox = coluna + colunaincremento;

        if((posicaoy < 0) || (posicaox < 0) || (posicaoy >= tabela.length) || (posicaox >= tabela[0].length))
        {
            continue;
        } 

        let alvo = tabela[posicaoy][posicaox];

        if((pecaselecionada === 1) && (alvo === 0)) tempmovimentos.push([posicaoy, posicaox]); 
        if((pecaselecionada === 0) && (alvo === 2)) tempmovimentos.push([posicaoy, posicaox]); 
    }

    return tempmovimentos;
}

function checarVitoria()
{
    let mosqueteiros = [];
    let movimentacao = false;

    for (let i = 0; i < tabela.length; i++)
    {
        for (let j = 0; j < tabela[i].length; j++)
        {
            if(tabela[i][j] === 1)
            {   
                mosqueteiros.push([i,j]);
                if (capturar(i,j).length > 0)
                {
                    movimentacao = true;
                }
            }
        }
    }

    if ((movimentacao === false) && (Controlador.atual == Controlador.TURNOS.MOSQUETEIROS)) 
    {
        return "MOSQUETEIROS";
    }

    const ilinha = mosqueteiros.every(m => m[0] === mosqueteiros[0][0]);
    const icoluna = mosqueteiros.every(m => m[1] === mosqueteiros[0][1]);

    if((ilinha || icoluna) && (Controlador.atual == Controlador.TURNOS.GUARDAS))
    {
        return "GUARDAS";
    }

    return null;
}

canvas.addEventListener("click",(e) =>
    {
        let rect = canvas.getBoundingClientRect();
        let [linha, coluna] = calcularPosicao(e.clientX - rect.left, e.clientY - rect.top);

        if(Controlador.selecionado === null)
        {
            if(tabela[linha][coluna] === Controlador.atual)
            {
                Controlador.selecionado = [linha, coluna];
                Controlador.movimentos = capturar(linha, coluna);
            }
        } 
        else
        {
            let valido = Controlador.movimentos.some(m => m[0] === linha && m[1] === coluna);

            if(valido) 
            {
                tabela[linha][coluna] = tabela[Controlador.selecionado[0]][Controlador.selecionado[1]];
                tabela[Controlador.selecionado[0]][Controlador.selecionado[1]] = 2; 
                Controlador.avancar();
            }

            Controlador.selecionado = null;
            Controlador.movimentos = [];
        }

        let vencedor = checarVitoria();

        if(vencedor)
        {
            alert(vencedor + " VENCERAM!!!!");
            Controlador.atual = null;
        }

        renderizar();
    });

renderizar();