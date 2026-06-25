# Mosqueteiros 

Jogo de tabuleiro para dois jogadores disputado num grid 5×5. 
Um jogador controla os Mosqueteiros e o outro os Guardas, cada um com objetivos opostos.

`Como jogar?`

Clique em uma peça sua para selecioná-la. As casas disponíveis para mover ficam destacadas em branco. Clique em uma delas para confirmar o movimento. O turno passa automaticamente para o outro jogador.

## Peças e objetivo

`Mosqueteiros` — começam com 3 peças espalhadas pelo tabuleiro. Ganham se ficarem sem movimentos possíveis.
`Guardas` — começam ocupando as demais casas do tabuleiro. Ganham se conseguirem alinhar todos os Mosqueteiros na mesma linha ou coluna.

## Regras de movimento


- Mosqueteiros só se movem para casas adjacentes (cima, baixo, esquerda, direita) ocupadas por Guardas.
- Guardas só se movem para casas vazias adjacentes.
- Movimentos na diagonal não são permitidos.

##Estado inicial do tabuleiro

M . . . .
. . . . .
. . M . .
. . . . .
. . . . M


##Tecnologias

`HTML5 Canvas e JavaScript puro, sem dependências externas.`
