"use strict";

// EXERCÍCIO 0 - ANTES DE MAIS NADA, IMPLEMENTE ESTA FUNÇÃO.
/**
 * Função que retorna um Array contendo os nomes dos alunos que fizeram este exercício.
 * @return {string[]} Os nomes dos alunos que fizeram este exercício.
 */
function nomesDosAlunos() {
    return [ "felipe aragão", "pedro almeida" ];
}

// EXERCÍCIO 1.
/**
 * Receba um valor em graus e converta para radianos.
 * @param {number} graus O valor em graus.
 * @return {number} O valor em radianos.
 * @throws ConvertError Se o valor em graus não for um número finito.
 */
function grausParaRadianos(graus) {
    if (isNaN(graus) || !isFinite(graus) || graus === null || typeof graus !== 'number' || graus === undefined || typeof graus === 'string') {
      throw new ConvertError('O valor em graus deve ser um número finito e válido.');
    }
  
    const radianos = (graus * Math.PI) / 180;
    return radianos;
  }
  
  (() => {
    try {
      grausParaRadianos(NaN);
    } catch (e) {
      if (!(e instanceof ConvertError) || [null, undefined, ''].includes(e?.message?.trim())) throw e;
      return;
    }
    throw new Error("A função grausParaRadianos aceitou porcaria.");
  })();
  
  (() => {
    try {
      grausParaRadianos(Infinity);
    } catch (e) {
      if (!(e instanceof ConvertError) || [null, undefined, ''].includes(e?.message?.trim())) throw e;
      return;
    }
    throw new Error("A função grausParaRadianos aceitou porcaria.");
  })();
  
  (() => {
    try {
      grausParaRadianos(null);
    } catch (e) {
      if (!(e instanceof ConvertError) || [null, undefined, ''].includes(e?.message?.trim())) throw e;
      return;
    }
    throw new Error("A função grausParaRadianos aceitou porcaria.");
  })();

// EXERCÍCIO 2.
/**
 * Receba um valor em radianos e converta para graus.
 * @param {number} graus O valor em radianos.
 * @return {number} O valor em graus.
 * @throws ConvertError Se o valor em radianos não for um número finito.
 */
function radianosParaGraus(radianos) {
    if (radianos === null || typeof radianos !== 'number' || isNaN(radianos) || !isFinite(radianos) || radianos === '') {
      throw new ConvertError('O valor em radianos deve ser um número finito.');
    }
  
    if (radianos === 0) {
      return 0;
    }
  
    return (radianos * 180) / Math.PI;
  }
// EXERCÍCIO 3.
/**
 * Converta uma temperatura entre 3 possíveis escalas: Celsius, Kelvin e Fahreinheit. As escalas são especificadas pelas strings "C", "F" e "K".
 * Zero graus Celsius é o mesmo que 32 graus Fahreinheit ou 273.15 graus Kelvin.
 * 100 graus Celsius é o mesmo que 212 graus Fahreinheit ou 373.15 graus Kelvin.
 * Os valores resultantes devem ser arredondados em 2 casas decimais. Use a função auxiliar arredondar2Casas para fazer isso.
 * @param {number} valor O valor da temperatura na escala especificada pelo parâmetro "de".
 * @param {string} de A escala da temperatura especificada pelo parâmetro "valor". Pode ser "K" para Kelvin, "C" para Celsius ou "F" para Fahreinheit.
 * @param {string} para A escala da temperatura a ser retornada. Pode ser "K" para Kelvin, "C" para Celsius ou "F" para Fahreinheit.
 * @return {number} O valor da temperatura correspondente.
 * @throw TypeError Se o valor não for um número finito ou se qualquer uma das escalas for diferente de "C", "F" ou "K".
 */
function converterTemperatura(valor, de, para) {
  const validScales = ["C", "F", "K"];

  if (Number.isNaN(valor)) {
    throw new ConvertError("O valor não pode ser NaN.");
  }

  if (!validScales.includes(de) || !validScales.includes(para)) {
    throw new ConvertError("As escalas devem ser especificadas como 'C', 'F' ou 'K'.");
  }

  if (!Number.isFinite(valor)) {
    throw new ConvertError("O valor não pode ser Infinity.");
  }

  if (de === para) {
    return valor;
  }

  let resultado;

  if (de === "C") {
    if (para === "F") {
      resultado = (valor * 9) / 5 + 32;
    } else if (para === "K") {
      resultado = valor + 273.15;
    }
  } else if (de === "F") {
    if (para === "C") {
      resultado = ((valor - 32) * 5) / 9;
    } else if (para === "K") {
      resultado = ((valor - 32) * 5) / 9 + 273.15;
    }
  } else if (de === "K") {
    if (para === "C") {
      resultado = valor - 273.15;
    } else if (para === "F") {
      resultado = ((valor - 273.15) * 9) / 5 + 32;
    }
  }

  if (resultado === undefined || !Number.isFinite(resultado)) {
    throw new ConvertError(`Não foi possível converter a temperatura de ${de} para ${para}.`);
  }

  return arredondar2Casas(resultado);
}

function arredondar2Casas(valor) {
  return Number(valor.toFixed(2));
}

console.log(converterTemperatura(32, "F", "C"));


// EXERCÍCIO 4.
/**
 * Obtenha o fatorial de um número.
 * @param {number} n O valor do qual se deseja obter o fatorial.
 * @return {bigint} O valor de n! expresso em BigInt.
 * @throw ConvertError Se o parâmetro não for um número inteiro ou for menor que zero.
 */
function fatorial(n) {
    if (
      typeof n !== 'number' ||
      isNaN(n) ||
      n === null ||
      n === undefined ||
      !Number.isInteger(n) ||
      n < 0
    ) {
      throw new TypeError('O parâmetro deve ser um número inteiro não negativo.');
    }
  
    if (n === 0 || n === 1) {
      return BigInt(1);
    }
  
    let resultado = BigInt(n);
  
    for (let i = n - 1; i >= 2; i--) {
      resultado *= BigInt(i);
    }
  
    return resultado;
  }
  (() => {
    try {
      fatorial(NaN);
    } catch (e) {
      if (
        !(e instanceof TypeError) ||
        [null, undefined, ''].includes(e?.message?.trim())
      )
        throw e; // Não era a exceção que devia ter sido.
      return;
    }
    throw new Error('A função fatorial aceitou porcaria.');
  })();
  
  (() => {
    try {
      fatorial(Infinity);
    } catch (e) {
      if (
        !(e instanceof TypeError) ||
        [null, undefined, ''].includes(e?.message?.trim())
      )
        throw e; // Não era a exceção que devia ter sido.
      return;
    }
    throw new Error('A função fatorial aceitou porcaria.');
  })();
  
  (() => {
    try {
      fatorial(-Infinity);
    } catch (e) {
      if (
        !(e instanceof TypeError) ||
        [null, undefined, ''].includes(e?.message?.trim())
      )
        throw e; // Não era a exceção que devia ter sido.
      return;
    }
    throw new Error('A função fatorial aceitou porcaria.');
  })();
  
  (() => {
    try {
      fatorial(null);
    } catch (e) {
      if (
        !(e instanceof TypeError) ||
        [null, undefined, ''].includes(e?.message?.trim())
      )
        throw e; // Não era a exceção que devia ter sido.
      return;
    }
    throw new Error('A função fatorial aceitou porcaria.');
  })();
  
  (() => {
    try {
      fatorial(undefined);
    } catch (e) {
      if (
        !(e instanceof TypeError) ||
        [null, undefined, ''].includes(e?.message?.trim())
      )
        throw e; // Não era a exceção que devia ter sido.
      return;
    }
    throw new Error('A função fatorial aceitou porcaria.');
  })();
    

  
 
  console.log(fatorial(0)); // BigInt(1)
  console.log(fatorial(1)); // BigInt(1)
  console.log(fatorial(5)); // BigInt(120)
  console.log(fatorial(10)); // BigInt(3628800)

  
// EXERCÍCIO 5.
/**
 * Obtenha o n-ésimo número de Fibonacci.
 *
 * Dica:
 * Cuidado ao implementar essa função! A implementação mais direta pode demorar séculos para fornecer
 * o resultado de um número de Fibonacci grande. Mas uma implementação um pouco mais inteligente que
 * memorize resultados já anteriormente computados trás o mesmo resultado em microssegundos.
 *
 * @param {number} n O valor do qual se deseja obter o número de Fibonacci correspondente.
 * @return {bigint} O n-ésimo número de Fibonacci expresso em BigInt.
 * @throw ConvertError Se o parâmetro não for um número inteiro ou for menor que zero.
 */
function fibonacci(n) {
    naoFizIssoAinda();
}

// EXERCÍCIO 6.
/**
 * Obtenha o n-ésimo número triangular.
 *
 * @param {n} n O valor do qual se deseja obter o número triangular correspondente.
 * @return {bigint} O n-ésimo número triangular expresso em BigInt.
 * @throw ConvertError Se o parâmetro não for um número inteiro ou for menor que zero.
 */
function triangular(num) {
    naoFizIssoAinda();
}

// EXERCÍCIO 7.
/**
 * Retorne uma expressão regular que valide um CEP da seguinte forma:
 * Cinco dígitos, talvez um hífen, mais três dígitos.
 * É importante que a expressão regular tenha menos que 25 caracteres de comprimento!
 * @return {RegExp} Uma expressão regular.
 */
function cepRegex() {
    naoFizIssoAinda();
}

// EXERCÍCIO 8.
/**
 * Retorne uma expressão regular que valide um número de DDD brasileiro.
 * É importante que a expressão regular tenha menos que 60 caracteres de comprimento!
 * @return {RegExp} Uma expressão regular.
 */
function dddRegex() {
    naoFizIssoAinda();
}

// EXERCÍCIO 9.
/**
 * Utilizando AJAX ou fetch API, pesquise por um CEP na URL http://viacep.com.br/ws/XXXXX-XXX/json/,
 * onde XXXXX-XXX é o CEP a ser pesquisado.
 * @param {string} cep O CEP a ser pesquisado.
 * @return {Endereco} Uma instância da classe Endereco contendo o logradouro, bairro, localidade (cidade) e UF do CEP pesquisado.
 * @throws ConvertError Se o CEP a ser pesquisado não for uma string ou não tiver o formato correto de um CEP.
 * @throws PesquisaCepError Se o CEP não for encontrado.
 */
async function pesquisarCep(cep) {
    naoFizIssoAinda();
}

// EXERCÍCIO 10.
/**
 * Faça o formulário na tela de pesquisa de CEP. Você o encontra facilmente no HTML.
 *
 * No campo do resultado do CEP, você deve colocar as informações do CEP encontrado
 *(converta a instância de Endereco encontrada em string para fazer isso). Se ocorrer
 * algum erro na busca, coloque a mensagem de erro lá também (use o try-catch para isso).
 */
async function pesquisarCepDOM() {
    naoFizIssoAinda();
}

// EXERCÍCIO 11.
/**
 * Utilizando AJAX ou fetch API, pesquise por um CEP na URL https://pokeapi.co/api/v2/pokemon/NNNNNN,
 * onde NNNNNN é o número ou nome de um pokémon a ser pesquisado.
 * @param {number | string} chave O número ou nome do pokémon a ser pesquisado.
 * @return {Pokemon} Uma instância da classe Pokemon contendo o nome, o número e a URL da foto da arte oficial do pokémon visto de frente.
 * @throws PokemonNaoEncontradoError Se não existir pokémon com o nome ou número dado.
 */
async function pesquisarPokemon(chave) {
    naoFizIssoAinda();
}

// EXERCÍCIO 12.
/**
 * Faça o formulário na tela de pesquisa de pokémon. Você o encontra facilmente no HTML.
 *
 * Há três campos para os resultados: O nome do pokémon, o número e uma imagem.
 * Se ocorrer algum erro na busca, coloque a mensagem de erro no campo do nome e coloque
 * o link https://cdn-icons-png.flaticon.com/256/4467/4467515.png na foto (use o try-catch).
 */
async function pesquisarPokemonDOM() {
    naoFizIssoAinda();
}