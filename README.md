# Exercício - Avançado no JavaScript - ADO 3

Exercícios de JavaScript da disciplina de Linguagens de Script para Web do Senac.

IMPORTANTE: Ainda está incompleto, faltam os testes dos exercícios 5 em diante.

## O que fazer?

Você deve mexer apenas no arquivo `ado3.js`.
Lá há 12 exercícios com códigos JavaScript a serem desenvolvidos.
Vocês devem desenvolver o código necessário para cada função/método funcionar de acordo com as respectivas documentações.
Além desses 12 exercícios, há uma lista com o nome dos alunos perto do começo do arquivo também que vocês devem alterar (esse é o exercício 0).

Comece pela função que fornece a lista com o nome dos alunos (exercício 0).
Se você não conseguir fazer isso corretamente, sua nota será zero independente de todo o resto.

Os nomes das funções não devem ser trocados (se você fizer isso, os testes não vão te perdoar).
No entanto, você pode criar outras funções que/se julgar necessário.
Não é recomendado mudar o nome dos parâmetros, embora você possa fazer isso.

Faça o ADO em grupos de 1 até 5 pessoas.

## Como executar os exercícios? Como saber se o que fiz está certo?

O exercício funciona usando um framework de testes em JavaScript desenvolvido para a atividade.

Para executar e testar este ADO, basta abrir o arquivo `ado3.html` em um navegador moderno (Chrome, Firefox, Opera, Edge, Konqueror, Safari ou Samsung Internet).
A página vem com dois formulários para testar os exercícios 10 e 12.
Eles estão lá porque esses dois exercícios são acerca de manipulação do DOM. Entrentanto, você também pode interagir com eles diretamente.
Mas antes deles, há um pequeno formulário com um botão de executar os testes.
Clique nesse botão e veja toda a mágica dos testes acontecer!

Este botão dispara a execução de um montão de testes.
O relatório de testes é colocado logo após ao HTML dos formulários dos exercícios 10 e 12.
Se houverem problemas, esses testes vão descrever o que foi que deu errado.

Obviamente, o arquivo `ado3.js` dado aqui falhará em todos os testes e vai te dar uma nota zero.
Não só isso, já te dará de cara uma caixa de mensagem de erro amarela com letras grandes vermelhas piscando bem chamativas dizendo que você precisa configurar o nome dos alunos (esse é o exercício 0).

O seu objetivo é editar esse monte de funções e métodos JavaScript de forma a fazer todos os testes passarem.
Você deverá alterar este arquivo até conseguir a nota 10 (ou até desistir de fazê-lo, mas espero que não seja o caso).
Faça EXATAMENTE o que o enunciado de cada exercício pede, nem mais e nem menos.
Se houver algum erro, os testes te dirão o que há de errado.

Se o seu script tiver algum erro sintático (exemplo: parênteses que abre e não fecha em lugar nenhum, `else` sem `if`, entre outros), uma caixa amarela com letras grandes vermelhas piscando vai aparecer para te avisar disso.

## E os demais arquivos?

Os testes estão no arquivo `ado3-teste.js`.
O código responsável por gerenciar os testes está no `lib/testefw.js` e no `lib/testefw.css`.
Há também os arquivos `ado3.html` (que é o que você deve executar) e `ado3.css` (para estilizar os formulários dos exercícios 10 e 12).
Para implementar alguns dos exercícios, você precisará usar as funções definidas no arquivo `lib/utils.js` e `ado3-auxiliar.js`.
Por fim, há este arquivo aqui (`README.md`) e o arquivo `LICENSE` com o qual você não precisa se preocupar.

É recomendável você deixar estes arquivos como estão, pois o professsor sempre usará os originais na correção, logo não há porque alterá-los.
Se você tiver coragem, você até pode mexer nesses arquivos para fazer algum experimento, colocar linhas de `console.log` para tentar entender como o código funciona, desmontar ou alterar pedaços para fazer debugging, etc.
No entanto, o funcionamento interno desses arquivos está em um nível bastante avançado e complexo e não é esperado que alunos que estejam recém-começando em JavaScript os entendam.
De toda forma, se quiser fuçar neles, fique a vontade.
Apenas sempre tenha em mãos os arquivos originais para poder se certificar de que não bagunçou nada e poder voltar atrás facilmente caso tenha bagunçado.

## Como fica a nota?

A página `ado3.html` já calculará a nota automaticamente, da seguinte forma:

- Faça o exercício 0 antes de qualquer coisa.
  Ele se chama exercício 0 porque se você não o fizer direito, a sua nota também será 0.

- Cada exercício do 1 ao 12 tem um peso diferente e uma quantidade de testes diferentes.
  Uns são um pouco mais fáceis e valem um pouco menos e uns um pouco mais difíceis e valem um pouco mais.
  Alguns exercícios são distribuídos em mais de um grupo de testes.
  Cada grupo tem a nota proporcional ao peso e ao número de testes realizados com sucesso.
  Se todos os testes num grupo forem executados com sucesso, o peso correspondente àquele grupo é somado à nota.
  Se nenhum for executado com sucesso, nada acontece.
  Se somente alguns forem bem sucedidos, a nota proporcional à quantidade de testes do exercício e ao peso do exercício será aplicada.

No entanto, há algumas observações a serem feitas:

- Se você fizer a entrega incorretamente, será penalizado em -1 ponto.

- Você só deve entregar o arquivo `ado3.js`. Vou ignorar quaisquer mudanças realizadas em outros arquivos e sempre fazer a correção com os demais arquivos originais.

- Quem tentar colocar algum tipo de malware ou código malicioso no `ado3.js` fica com nota zero.

- **Fique atento(a) a erros que aparecerem no console do navegador. Scripts que não puderem ser carregados e/ou executados devido a erros sintáticos podem ocasionar uma nota zero.**

- **Scripts que travem ou não terminem de carregar nunca (por exemplo, `while (true) { /* fica preso no laço infinito. */}`) também podem ocasionar uma nota zero.**

- Se o professor encontrar alguma tentativa de burlar os testes, você vai perder pontos!

## Burlar os testes!? Como assim!?

Eis um exemplo de uma implementação sacana para tentar burlar os testes:

```js
// Este é o teste do professor.
teste("4 é menor que 7.", () => retornaMaiorNumero(4, 7), igual(7));
teste("3 é maior que 2.", () => retornaMaiorNumero(3, 2), igual(3));

// Esta é a implementação que visa burlar o teste.
// Ela foi feita apenas para passar nos dois testes acima, mesmo estando
// totalmente errada em qualquer outro caso.
function retornaMaiorNumero(a, b) {
    if (a === 4) return 7;
    return 3;
}
```

Além de executar os testes automáticos, o professor também vai olhar o código procurando por coisas assim.

É claro que enquanto você estiver desenvolvendo, fazendo experimentos e debugging, você até pode fazer coisas assim.
Apenas se certifique de que no final não se esqueceu de limpar isso.

## Como fazer a entrega?

A entrega deve ser feita no GitHub.

Faça um fork do projeto deste professor e convide o professor a ele. O professor verá como o projeto estava na data de entrega na branch principal.

Quem fizer a entrega de uma forma errada (ex: enviar por e-mail ou de qualquer outra forma sem que haja uma boa justificativa para tal), vai ser penalizado em -1 ponto.
Isso, é claro, se o professor quiser e puder aceitar a entrega feita assim.
Além disso, pessoas que não realizarem a entrega da forma correta serão os últimos a terem os seus trabalhos corrigidos, isso se forem corrigidos.
