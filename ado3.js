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
  if (!Number.isInteger(n) || n < 0) {
      throw new ConvertError("O parâmetro é inválido. Deve ser um número inteiro não negativo.");
    }
  
    let resultado = BigInt(1);
  
    for (let i = 2; i <= n; i++) {
      resultado *= BigInt(i);
    }
  
    return resultado;
}

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
  if (typeof n !== 'number' || isNaN(n) || n < 0 || !Number.isInteger(n)) {
    throw new ConvertError('O parâmetro deve ser um número inteiro não negativo.');
  }

  if (n === 0) {
    return BigInt(0);
  }

  let prev = BigInt(0);
  let current = BigInt(1);

  for (let i = 2; i <= n; i++) {
    let next = prev + current;
    prev = current;
    current = next;
  }

  return current;
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
  if (num === null || num === "0" || num === "") {
    throw new ConvertError('O parâmetro deve ser um número inteiro não negativo.');
  }

  const n = Number(num);

  if (!Number.isInteger(n) || n < 0) {
    throw new ConvertError('O parâmetro deve ser um número inteiro não negativo.');
  }

  if (n === 0) {
    return 0n;
  }

  return (BigInt(n) * (BigInt(n) + 1n)) / 2n;
}


// EXERCÍCIO 7.
/**
 * Retorne uma expressão regular que valide um CEP da seguinte forma:
 * Cinco dígitos, talvez um hífen, mais três dígitos.
 * É importante que a expressão regular tenha menos que 25 caracteres de comprimento!
 * @return {RegExp} Uma expressão regular.
 */
function cepRegex() {
  return /^\d{5}-?\d{3}$/;
}


// EXERCÍCIO 8.
/**
 * Retorne uma expressão regular que valide um número de DDD brasileiro.
 * É importante que a expressão regular tenha menos que 60 caracteres de comprimento!
 * @return {RegExp} Uma expressão regular.
 */
function dddRegex() {
  return /^(?!0[1-9]|00|10|20|30|40|50|60|70|80|90)\d{2}$/;
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
  if (typeof cep !== "string" || !/^\d{5}-?\d{3}$/.test(cep)) {
    throw new ConvertError("O CEP fornecido é inválido. Deve ser uma string no formato XXXXX-XXX.");
  }

  const url = `http://viacep.com.br/ws/${cep}/json/`;
  const response = await fetch(url);
 
  if (!response.ok) {
    throw new PesquisaCepError();
  }

  const data = await response.json();

  if (data.erro) {
    throw new PesquisaCepError();
  }

  const endereco = new Endereco(data.logradouro, data.bairro, data.localidade, data.uf);

  return endereco;
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
  try {
    const form = document.querySelector(".formzinho.ex10");
    const cepInput = form.querySelector("#cep");
    const resultadoCep = form.querySelector("#resultado-cep");
    const cep = cepInput.value.trim();
    const data = await pesquisarCep(cep);
    
    if (!data.cidade) {
      data.cidade = ""; 
    }

    const endereco = new Endereco(data.logradouro, data.bairro, data.cidade, data.uf);
    const enderecoString = `${endereco.logradouro} - ${endereco.bairro} - ${endereco.cidade} - ${endereco.uf}`;
    resultadoCep.value = enderecoString;
  } catch (error) {
    if (!error.message) {
      error.message = ""; 
    }
    const resultadoCep = document.getElementById("resultado-cep");
    resultadoCep.value = error.message;
  }
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
  const url = `https://pokeapi.co/api/v2/pokemon/${chave}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new PokemonNaoEncontradoError('Pokémon não encontrado.');
    }

    const data = await response.json();

    const nome = data.name;
    const numero = data.id;
    const fotoUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

    if (!nome || !numero || !fotoUrl) {
      throw new PokemonNaoEncontradoError('Dados inválidos do Pokémon.');
    }

    return new Pokemon(nome, numero, fotoUrl);
  } catch (error) {
    if (error instanceof PokemonNaoEncontradoError) {
      throw error;
    } else {
      throw new ConvertError('Erro ao pesquisar o Pokémon.');
    }
  }
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
  try {
    const chave = document.getElementById('pokemon-pesquisa').value;

    const pokemon = await pesquisarPokemon(chave);
  
    document.getElementById('pokemon-nome').value = pokemon.nome;
    document.getElementById('pokemon-numero').value = pokemon.numero;
    document.getElementById('pokemon-foto').src = pokemon.foto;
  } catch (error) {
    document.getElementById('pokemon-nome').value = error.message;
    document.getElementById('pokemon-foto').src =
      'https://cdn-icons-png.flaticon.com/256/4467/4467515.png';
  }
}