function isNumeric(n) {
    return typeof n === "number"
        && n === n // A única coisa que não é igual a si mesma é o NaN.
        && n !== Infinity
        && n !== -Infinity
}

function isInteger(n) {
    return isNumeric(n) && n % 1 === 0;
}

class ConvertError extends Error {
    constructor(mensagem) {
        if (typeof mensagem !== "string" || mensagem.trim() === "") throw new Error("Seu ConvertError está sem a mensagem correta!");
        super(mensagem);
    }
}

function arredondar2Casas(n) {
    return Math.round(n * 100) / 100;
}

class Endereco {
    #logradouro;
    #bairro;
    #cidade;
    #uf;

    constructor(logradouro, bairro, cidade, uf) {
        if (typeof logradouro !== "string") throw new TypeError("O logradouro deve ser string.");
        if (typeof bairro !== "string") throw new TypeError("O bairro deve ser string.");
        if (typeof cidade !== "string") throw new TypeError("A cidade deve ser string.");
        if (typeof uf !== "string") throw new TypeError("O uf deve ser string.");
        this.#logradouro = logradouro;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
    }

    get logradouro() {
        return this.#logradouro;
    }

    get bairro() {
        return this.#bairro;
    }

    get cidade() {
        return this.#cidade;
    }

    get uf() {
        return this.#uf;
    }

    toString() {
        return `${this.logradouro} - ${this.bairro} - ${this.cidade} - ${this.uf}`;
    }
}

class PesquisaCepError extends Error {
    constructor() {
        super("CEP não encontrado.");
    }
}

class PokemonNaoEncontradoError extends Error {
    constructor() {
        super("Pokémon não encontrado.");
    }
}

class Pokemon {
    #nome;
    #numero;
    #foto;

    constructor(nome, numero, foto) {
        if (typeof nome !== "string") throw new TypeError("O nome do pokémon deve ser string.");
        if (!isInteger(numero)) throw new TypeError("O número do pokémon deve ser numérico e inteiro.");
        if (typeof foto !== "string") throw new TypeError("O link da foto do pokémon deve ser uma string.");
        this.#nome = nome;
        this.#numero = numero;
        this.#foto = foto;
    }

    get nome() {
        return this.#nome;
    }

    get numero() {
        return this.#numero;
    }

    get foto() {
        return this.#foto;
    }
}