"use strict";

prepararTestes(funcs => {
    const erroGravissimo = funcs.erroGravissimo;
    window.onerror = (ev, arquivo, linha, coluna, erro) => {
        erroGravissimo(""
                + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE O SEU JAVASCRIPT CONTÉM ERROS GRAVES.</h1>"
                + "<p>Este é um erro gravíssimo. Veja mais detalhes no console do navegador para tentar entender onde ocorreu o erro.</p>"
                + "<p>Quem entregar para o professor algo que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
        );
        document.querySelector("#testefw-botao-executar").disabled = true;
    };
    const divNota = document.querySelector("#testefw-nota");
    if (divNota) divNota.style.display = "none";
},
funcs => {
    const grupo = funcs.grupo;
    const teste = funcs.teste;
    const igual = funcs.igual;
    const naoDeuErro = funcs.naoDeuErro;
    const Utilitarios = funcs.Utilitarios;
    const ErroFormatado = funcs.ErroFormatado;
    const Xoshiro128ssSeedRandom = funcs.Xoshiro128ssSeedRandom;
    const erroGravissimo = funcs.erroGravissimo;
    const numeroMaximoDeAlunos = 5;
    const random = Xoshiro128ssSeedRandom.std();
    let nomesOk = false;
    function testOk() { return nomesOk; }
    function setTestOk(ok) { nomesOk = ok; }

    function mexer(oQue, coisaRuim, verificador) {
        const c = coisaRuim("objeto").trim().replaceAll(/ +/g, ' ');
        const v = verificador("objeto").trim().replaceAll(/ +/g, ' ');
        return ``
                + `() => (() => {\n`
                + `    let fezCoisaRuim = false;\n`
                + `    const objeto = ${oQue};\n`
                + `    try {\n`
                + `        ${c};\n`
                + `        fezCoisaRuim = true;\n`
                + `    } catch (e) { \n`
                + `        // A exceção é esperada. Tem que dar errado se não houver exceção!\n`
                + `    }\n`
                + `    if (fezCoisaRuim) throw new Error("Deixou setar!");\n`
                + `    if (${v}) throw new Error("Não era pra o objeto ter sofrido alteração!");\n`
                + `})()`;
    }

    class Abacaxi {}

    // NOME DOS ALUNOS.

    function validarNomesAlunos() {
        const alunos = nomesDosAlunos(), nomes = [];
        if (!(alunos instanceof Array)) throw new Error("Os nomes do(a)(s) aluno(a)(s) deveriam estar em um array.");
        if (alunos.length === 0) throw new Error("Você(s) se esqueceu(ram) de preencher os nomes do(a)(s) aluno(a)(s).");

        alunos.forEach((aluno, idx) => {
            const numero = idx + 1;

            if (typeof aluno !== "string") throw new Error(`O nome do(a) aluno(a) ${numero} deveria ser uma string.`);
            if (["João da Silva", "Maria da Silva", ""].includes(aluno.trim())) {
                throw new Error(`O nome do(a) aluno(a) ${numero} não está correto.`);
            }
            if (aluno !== aluno.trim()) {
                throw new Error(`Não deixe espaços em branco sobrando no começo ou no final do nome de ${aluno.trim()}.`);
            }
            if (nomes.includes(aluno)) throw new Error("Há nomes de alunos(as) repetidos.");
            nomes.push(aluno);
        });
        if (alunos.length > numeroMaximoDeAlunos) {
            throw new Error(`Vocês só podem fazer grupo de até ${numeroMaximoDeAlunos} alunos(as).`);
        }
        return alunos;
    }

    function mostrarValidacaoNomesAlunos() {
        try {
            const alunos = validarNomesAlunos();
            alunos.forEach(nome => {
                const li = document.createElement("li");
                li.append(nome);
                document.querySelector("#testefw-alunos").append(li);
            });
        } catch (e) {
            erroGravissimo(""
                    + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE VOCÊ NÃO DEFINIU CORRETAMENTE OS INTEGRANTES DO SEU GRUPO.</h1>"
                    + "<p>Arrumar isto é a primeira coisa que você tem que fazer neste ADO, e assim que o fizer esta mensagem vai desaparecer.</p>"
                    + "<p>Procure a função nomesDosAlunos() no arquivo ado1.js.</p>"
                    + "<p>Quem entregar para o professor um JavaScript que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
            );
            throw e;
        }
    }

    grupo("Nomes dos alunos", "Verifica se a identificação do(a)(s) aluno(a)(s) está ok").naoFracionado.minimo(-10).testes([
        teste("Listagem de alunos ok.", () => mostrarValidacaoNomesAlunos(), naoDeuErro(), undefined, setTestOk)
    ]);

    // Exercícios 1 e 2.

    function proximo(valorEsperado) {
        if (typeof valorEsperado !== "function") {
            const valor = valorEsperado;
            valorEsperado = status => valor;
        }
        return {
            testar: valorObtido => {
                const v1 = valorEsperado("testando");
                const j1 = Utilitarios.stringify(v1);
                const j2 = Utilitarios.stringify(valorObtido);
                if (typeof v1 === "number" && typeof valorObtido === "number" && Math.abs(v1 - valorObtido) <= 10 ** -6) return;
                throw new ErroFormatado(v1, valorObtido);
            },
            esperado: jaExecutou => `Resultado esperado: ${Utilitarios.escapeHtml(Utilitarios.stringify(valorEsperado(jaExecutou ? "mostrando depois" : "mostrando antes")))}.`
        };
    }

    const tabelaAngulos = [
        {graus:    0               , radianos:   0                   },
        {graus:    1               , radianos:   0.017453292519943295},
        {graus:   -1               , radianos:  -0.017453292519943295},
        {graus:   30               , radianos:   0.5235987755982988  },
        {graus:  -30               , radianos:  -0.5235987755982988  },
        {graus:   45               , radianos:   0.7853981633974483  },
        {graus:  -45               , radianos:  -0.7853981633974483  },
        {graus:   57.29577951308232, radianos:   1                   },
        {graus:  -57.29577951308232, radianos:  -1                   },
        {graus:   90               , radianos:   1.5707963267948966  },
        {graus:  -90               , radianos:  -1.5707963267948966  },
        {graus:  114.59155902616465, radianos:   2                   },
        {graus: -114.59155902616465, radianos:  -2                   },
        {graus:  180               , radianos:   3.141592653589793   },
        {graus: -180               , radianos:  -3.141592653589793   },
        {graus:  270               , radianos:   4.71238898038469    },
        {graus: -270               , radianos:  -4.71238898038469    },
        {graus:  333               , radianos:   5.811946409141117   },
        {graus: -333               , radianos:  -5.811946409141117   },
        {graus:  360               , radianos:   6.283185307179586   },
        {graus: -360               , radianos:  -6.283185307179586   },
        {graus:  445.1882068166496 , radianos:   7.77                },
        {graus: -445.1882068166496 , radianos:  -7.77                },
        {graus:  720               , radianos:  12.566370614359172   },
        {graus: -720               , radianos: -12.566370614359172   },
        {graus:  777.777           , radianos:  13.574769496283938   },
        {graus: -777.777           , radianos: -13.574769496283938   }
    ];

    const tabelaTemperaturas = [
        {c: -273.15, k:   0   , f: -459.67  },
        {c:  -20   , k: 253.15, f:   -4     },
        {c:  -17.78, k: 255.37, f:    0     },
        {c:    0   , k: 273.15, f:   32     },
        {c:  100   , k: 373.15, f:  212     },
    ];

    const lixos = ["NaN", "Infinity", "-Infinity", "null", "undefined", "new Abacaxi()", '"0"', '""', '"abc"', "/[a-z]/g", "[1, 2, 3]", '{a: "x", b: "y"}'];

    function testarFunc(func, params, erro) {
        const x = ``
                + `() => (() => {\n`
                + `    try {\n`
                + `        ${func}(${params});\n`
                + `    } catch (e) {\n`
                + `        if (!(e instanceof ${erro}) || [null, undefined, ""].includes(e?.message?.trim())) throw e; // Não era a exceção que devia ter sido.\n`
                + `        return;\n`
                + `    }\n`
                + `    throw new Error("A função ${func} aceitou porcaria.");\n`
                + `})()`;
        return x;
    }

    grupo("Exercício 1 - parte 1 (caminho feliz)", "Graus para radianos").maximo(0.4).testes(
        tabelaAngulos.map(x => teste(`${x.graus}° = ${x.radianos} rad.`, eval(`() => grausParaRadianos(${x.graus})`), proximo(x.radianos), testOk))
    );

    grupo("Exercício 1 - parte 2 (caminho infeliz)", "Graus para radianos com parâmetro lixo").maximo(0.4).testes(
        lixos.map(x => teste(`Deve recusar ${x}.`, eval(testarFunc("grausParaRadianos", x, "ConvertError")), naoDeuErro(), testOk))
    );

    grupo("Exercício 2 - parte 1 (caminho feliz)", "Radianos para graus").maximo(0.4).testes(
        tabelaAngulos.map(x => teste(`${x.radianos} rad = ${x.graus}°.`, eval(`() => radianosParaGraus(${x.radianos})`), proximo(x.graus), testOk))
    );

    grupo("Exercício 2 - parte 2 (caminho infeliz)", "Radianos para graus com parâmetro lixo").maximo(0.4).testes(
        lixos.map(x => teste(`Deve recusar ${x}.`, eval(testarFunc("radianosParaGraus", x, "ConvertError")), naoDeuErro(), testOk))
    );

    // Exercício 3.

    const testes3a = tabelaTemperaturas.flatMap(x => [
        teste(`${x.c}°C = ${x.f}°F`, eval(`() => converterTemperatura(${x.c}, "C", "F")`), igual(x.f), testOk),
        teste(`${x.f}°F = ${x.c}°C`, eval(`() => converterTemperatura(${x.f}, "F", "C")`), igual(x.c), testOk),
        teste(`${x.c}°C = ${x.k}°K`, eval(`() => converterTemperatura(${x.c}, "C", "K")`), igual(x.k), testOk),
        teste(`${x.k}°K = ${x.c}°C`, eval(`() => converterTemperatura(${x.k}, "K", "C")`), igual(x.c), testOk),
        teste(`${x.f}°F = ${x.k}°K`, eval(`() => converterTemperatura(${x.f}, "F", "K")`), igual(x.k), testOk),
        teste(`${x.k}°K = ${x.f}°F`, eval(`() => converterTemperatura(${x.k}, "K", "F")`), igual(x.f), testOk)
    ]);

    const testes3b = tabelaTemperaturas.flatMap(x => [
        teste(`${x.c}°C = ${x.c}°C`, eval(`() => converterTemperatura(${x.c}, "C", "C")`), igual(x.c), testOk),
        teste(`${x.f}°F = ${x.f}°F`, eval(`() => converterTemperatura(${x.f}, "F", "F")`), igual(x.f), testOk),
        teste(`${x.k}°K = ${x.k}°K`, eval(`() => converterTemperatura(${x.k}, "K", "K")`), igual(x.k), testOk)
    ]);

    const testes3c = lixos.flatMap(x => [
        teste(`Deve recusar ${x} como valor.` , eval(testarFunc("converterTemperatura", `${x}, "C", "C"`, "ConvertError")), naoDeuErro(), testOk),
        teste(`Deve recusar ${x} como "de".`  , eval(testarFunc("converterTemperatura", `5, ${x}, "C"`  , "ConvertError")), naoDeuErro(), testOk),
        teste(`Deve recusar ${x} como "para".`, eval(testarFunc("converterTemperatura", `7, "C", ${x}`  , "ConvertError")), naoDeuErro(), testOk)
    ]);

    const lixos2 = ["5", "0", '"u"', '"c"', '"f"', '"k"', '" C "', '" K"', '"F "'];

    testes3c.push(...lixos2.flatMap(x => [
        teste(`Deve recusar ${x} como "de".`  , eval(testarFunc("converterTemperatura", `2, ${x}, "C"`, "ConvertError")), naoDeuErro(), testOk),
        teste(`Deve recusar ${x} como "para".`, eval(testarFunc("converterTemperatura", `8, "C", ${x}`, "ConvertError")), naoDeuErro(), testOk)
    ]));

    grupo("Exercício 3 - parte 1 (caminho feliz)"  , "Conversão de temperaturas"                   ).maximo(0.4).testes(testes3a);
    grupo("Exercício 3 - parte 2 (casos triviais)" , "Conversão de temperaturas na mesma escala"   ).maximo(0.4).testes(testes3b);
    grupo("Exercício 3 - parte 3 (caminho infeliz)", "Conversão de temperaturas com parâmetro lixo").maximo(0.4).testes(testes3c);

    // Exercício 4.

    const f50  = 30414093201713378043612608166064768844377641568960512000000000000n;
    const f82  = 475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000n;
    const f100 = 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000n;
    const f111 = 1762952551090244663872161047107075788761409536026565516041574063347346955087248316436555574598462315773196047662837978913145847497199871623320096254145331200000000000000000000000000n;
    const tabelaFatoriais = [
        {de:   0, para:    1n},
        {de:   1, para:    1n},
        {de:   2, para:    2n},
        {de:   3, para:    6n},
        {de:   4, para:   24n},
        {de:   5, para:  120n},
        {de:   6, para:  720n},
        {de:   7, para: 5040n},
        {de:  50, para: f50  },
        {de:  82, para: f82  },
        {de: 100, para: f100 },
        {de: 111, para: f111 }
    ];

    const lixos3 = [...lixos];
    lixos3.push("-1", "1.5", "0.333", "-0.777");

    const testes4a = tabelaFatoriais.map(x => teste(`${x.de}! = ${x.para}`, eval(`() => fatorial(${x.de})`), igual(x.para), testOk));

    const testes4b = lixos3.map(x => teste(`Deve recusar ${x} como valor.`, eval(testarFunc("fatorial", x, "ConvertError")), naoDeuErro(), testOk));

    grupo("Exercício 4 - parte 1 (caminho feliz)"  , "Fatorial").maximo(0.4).testes(testes4a);
    grupo("Exercício 4 - parte 2 (caminho infeliz)", "Fatorial").maximo(0.4).testes(testes4b);

    // Exercício 5.

    const fi50  = 12586269025n;
    const fi100 = 354224848179261915075n;
    const fi500 = 139423224561697880139724382870407283950070256587697307264108962948325571622863290691557658876222521294125n;
    const fi1000 = 43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n;
    const tabelaFibonacci = [
        {de:    0, para:     0n},
        {de:    1, para:     1n},
        {de:    2, para:     1n},
        {de:    3, para:     2n},
        {de:    4, para:     3n},
        {de:    5, para:     5n},
        {de:    6, para:     8n},
        {de:    7, para:    13n},
        {de:    8, para:    21n},
        {de:    9, para:    34n},
        {de:   10, para:    55n},
        {de:   11, para:    89n},
        {de:   12, para:   144n},
        {de:   50, para: fi50  },
        {de:  100, para: fi100 },
        {de:  500, para: fi500 },
        {de: 1000, para: fi1000}
    ];

    const testes5a = tabelaFibonacci.map(x => teste(`fibonacci(${x.de}) = ${x.para}`, eval(`() => fibonacci(${x.de})`), igual(x.para), testOk));

    const testes5b = lixos3.map(x => teste(`Deve recusar ${x} como valor.`, eval(testarFunc("fibonacci", x, "ConvertError")), naoDeuErro(), testOk));

    grupo("Exercício 5 - parte 1 (caminho feliz)"  , "Fibonacci").maximo(0.4).testes(testes5a);
    grupo("Exercício 5 - parte 2 (caminho infeliz)", "Fibonacci").maximo(0.4).testes(testes5b);

    // Exercício 6.

    const tabelaTriangular = [
        {de:   "0", para:    "0"},
        {de:   "1", para:    "1"},
        {de:   "2", para:    "3"},
        {de:   "3", para:    "6"},
        {de:   "4", para:   "10"},
        {de:   "5", para:   "15"},
        {de:   "6", para:   "21"},
        {de:   "7", para:   "28"},
        {de:   "8", para:   "36"},
        {de:   "9", para:   "45"},
        {de:  "10", para:   "55"},
        {de:  "11", para:   "66"},
        {de:  "12", para:   "78"},
        {de:  "50", para: "1275"},
        {de: "100", para: "5050"},
        {de: "8888888888888888", para: "39506172839506169382716049382716"}
    ];

    const testes6a = tabelaTriangular.map(x => teste(`triangular(${x.de}n) = ${x.para}n`, eval(`() => triangular(${x.de}n)`), igual(BigInt(x.para)), testOk));

    const testes6b = lixos3.map(x => teste(`Deve recusar ${x} como valor.`, eval(testarFunc("triangular", x, "ConvertError")), naoDeuErro(), testOk));

    grupo("Exercício 6 - parte 1 (caminho feliz)"  , "Triangular").maximo(0.4).testes(testes6a);
    grupo("Exercício 6 - parte 2 (caminho infeliz)", "Triangular").maximo(0.4).testes(testes6b);

    // Exercício 7.

    let rc = undefined, ehRegex7 = false;

    const aceita7 = ["01001000", "01001-000", "12345-678", "12345678", "98765432", "98765-432", "00000-000", "00000000", "77777-777", "77777777"];
    const rejeita7 = [
        "", "abc", " ", "xxx12345-678xxx", "xxx12345678xxx", "012345678", "0123456789", "012345-678", "0123-456", "0123456", "9876-543", "9876543",
        "12345-6789", "12345-67", "teste-cep", ".....-...", "12345.678", "lixolixo", "lixol-ixo", "texto grandão bem longo e comprido", "1234", "---------"
    ];

    const testes7a = [
        teste("cepRegex() roda"                , eval(`() => { rc = cepRegex(); return rc; }`                      ), naoDeuErro(), testOk                ),
        teste("cepRegex() traz uma regex"      , eval(`() => { ehRegex7 = rc instanceof RegExp; return ehRegex7; }`), igual(true) , () => rc !== undefined),
        teste("cepRegex() traz uma regex curta", eval(`() => ("" + rc).length <= 25`                               ), igual(true) , () => ehRegex7        ),
    ];

    aceita7
        .map(t => teste(`cepRegex() funciona com "${t}".`    , eval(`() => "${t}".match(rc)`), igual([t] ), () => ehRegex7)).forEach(x => testes7a.push(x));
    const testes7b = rejeita7
        .map(t => teste(`cepRegex() não funciona com "${t}".`, eval(`() => "${t}".match(rc)`), igual(null), () => ehRegex7));

    grupo("Exercício 7 - parte 1 (caminho feliz)"  , "Regex do CEP").maximo(0.4).testes(testes7a);
    grupo("Exercício 7 - parte 2 (caminho infeliz)", "Regex do CEP").maximo(0.4).testes(testes7b);

    // Exercício 8.

    let ru = undefined, ehRegex8 = false;

    const aceita8 = [
        "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "21", "22",       "24",             "27", "28",
        "31", "32", "33", "34", "35",       "37", "38",
        "41", "42", "43", "44", "45", "46", "47", "48", "49",
        "51",       "53", "54", "55",
        "61", "62", "63", "64", "65", "66", "67", "68", "69",
        "71",       "73", "74", "75",       "77",       "79",
        "81", "82", "83", "84", "85", "86", "87", "88", "89",
        "91", "92", "93", "94", "95", "96", "97", "98", "99"
    ];
    const rejeita8 = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "20", "30", "40", "50", "60", "70", "80", "90",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "00", "100", "-1", "111", "1111", "444", "12345-678", "xxx11xxx",
        "", "abc", " ", "xxx12345-678xxx", "xxx12345678xxx", "012345678", "0123456789", "012345-678", "0123-456", "0123456", "9876-543", "9876543",
        "12345-6789", "12345-67", "teste-cep", ".....-...", "12345.678", "lixolixo", "lixol-ixo", "texto grandão bem longo e comprido", "1234", "---------"
    ];

    const testes8a = [
        teste("dddRegex() roda"                , eval(`() => { ru = dddRegex(); return ru; }`                      ), naoDeuErro(), testOk                ),
        teste("dddRegex() traz uma regex"      , eval(`() => { ehRegex8 = ru instanceof RegExp; return ehRegex8; }`), igual(true) , () => ru !== undefined),
        teste("dddRegex() traz uma regex curta", eval(`() => ("" + ru).length <= 60`                               ), igual(true) , () => ehRegex8        ),
    ];

    aceita8
        .map(t => teste(`dddRegex() funciona com "${t}".`    , eval(`() => "${t}".match(ru)`), igual([t] ), () => ehRegex8)).forEach(x => testes8a.push(x));
    const testes8b = rejeita8
        .map(t => teste(`dddRegex() não funciona com "${t}".`, eval(`() => "${t}".match(ru)`), igual(null), () => ehRegex8));

    grupo("Exercício 8 - parte 1 (caminho feliz)"  , "Regex do DDD").maximo(0.4).testes(testes8a);
    grupo("Exercício 8 - parte 2 (caminho infeliz)", "Regex do DDD").maximo(0.4).testes(testes8b);

    // Exercício 9.

    async function testePorcaria9(cep) {
        try {
            await pesquisarCep(cep);
        } catch (e) {
            if (!(e instanceof ConvertError) || [null, undefined, ""].includes(e?.message?.trim())) throw e; // Não era a exceção que devia ter sido.
            return;
        }
        throw new Error("A função pesquisarCep aceitou porcaria.");
    }

    async function testeNaoExiste9(cep) {
        try {
            await pesquisarCep(cep);
        } catch (e) {
            if (!(e instanceof PesquisaCepError) || [null, undefined, ""].includes(e?.message?.trim())) throw e; // Não era a exceção que devia ter sido.
            return;
        }
        throw new Error("A função pesquisarCep retornou normalmente para um CEP inexistente.");
    }

    async function testeExiste9(cep, logradouro, bairro, cidade, uf) {
        const e = await pesquisarCep(cep);
        if (!(e instanceof Endereco)) throw new Error("A função pesquisarCep retornou porcaria.");
        if (e.logradouro !== logradouro) throw new Error(`Logradouro errado. Devia ser "${logradouro}", mas veio "${e.logradouro}".`);
        if (e.bairro     !== bairro    ) throw new Error(`Bairro errado. Devia ser "${bairro}", mas veio "${e.bairro}".`            );
        if (e.cidade     !== cidade    ) throw new Error(`Cidade errada. Devia ser "${cidade}", mas veio "${e.cidade}".`            );
        if (e.uf         !== uf        ) throw new Error(`UF errado. Devia ser "${uf}", mas veio "${e.uf}".`                        );
    }

    const naoExiste9 = ["01991000", "45678120", "89457388", "82935-712", "03790-444", "10669-333", "01234-002", "01777010", "42867010", "65123000"];

    const existe9 = [
        ["01234-000", "Avenida Pacaembu", "Pacaembu", "São Paulo", "SP"],
        ["04696-000", "Avenida Engenheiro Eusébio Stevaux", "Jurubatuba", "São Paulo", "SP"],
        ["87051-028", "Avenida Brasil", "Centro Cívico de Maringá", "Maringá", "PR"],
        ["09520-060", "Rua Amazonas", "Centro", "São Caetano do Sul", "SP"],
        ["68900-098", "Rua Tiradentes", "Central", "Macapá", "AP"],
        ["70100-000", "Praça dos Três Poderes", "Zona Cívico-Administrativa", "Brasília", "DF"],
        ["22460050" , "Rua Corcovado", "Jardim Botânico", "Rio de Janeiro", "RJ"],
        ["40026280" , "Largo do Pelourinho", "Centro Histórico", "Salvador", "BA"]
    ]

    const lixos9 = lixos3.filter(x => x[0] !== '"');
    const testes9a = existe9   .map(t => teste(`pesquisarCep() deve encontrar "${t[0]}".`, eval(`async () => await testeExiste9("${t[0]}", "${t[1]}", "${t[2]}", "${t[3]}", "${t[4]}")`), naoDeuErro(), testOk));
    const testes9b = rejeita7  .map(t => teste(`pesquisarCep() não deve aceitar "${t}".` , eval(`async () => await testePorcaria9("${t}")` ), naoDeuErro(), testOk));
    const testes9c = lixos9    .map(t => teste(`pesquisarCep() não deve aceitar "${t}".` , eval(`async () => await testePorcaria9(${t})`   ), naoDeuErro(), testOk));
    const testes9d = naoExiste9.map(t => teste(`pesquisarCep() não deve aceitar "${t}".` , eval(`async () => await testeNaoExiste9("${t}")`), naoDeuErro(), testOk));

    grupo("Exercício 9 - parte 1 (caminho feliz)"                                  , "AJAX ou fetch na viacep").maximo(0.4).testes(testes9a);
    grupo("Exercício 9 - parte 2 (caminho infeliz - CEPs inválidos)"               , "AJAX ou fetch na viacep").maximo(0.2).testes(testes9b);
    grupo("Exercício 9 - parte 3 (caminho infeliz - parâmetro de tipo inválido)"   , "AJAX ou fetch na viacep").maximo(0.2).testes(testes9c);
    grupo("Exercício 9 - parte 4 (caminho infeliz - CEP válido, porém inexistente)", "AJAX ou fetch na viacep").maximo(0.2).testes(testes9d);

    // Exercício 10.

    async function testePorcaria10(cep) {
        limparForm10();
        document.getElementById("cep").value = cep;
        await pesquisarCepDOM();
        const resposta = document.getElementById("resultado-cep").value;
        if (resposta.trim() === "") throw new Error("A mensagem de erro não apareceu.");
    }

    async function testeExiste10(cep, logradouro, bairro, cidade, uf) {
        limparForm10();
        document.getElementById("cep").value = cep;
        await pesquisarCepDOM();
        return document.getElementById("resultado-cep").value;
    }

    const testes10a = existe9   .map(t => teste(`pesquisarCep() deve encontrar "${t[0]}".`, eval(`async () => await testeExiste10("${t[0]}")`), igual(`${t[1]} - ${t[2]} - ${t[3]} - ${t[4]}`), testOk));
    const testes10b = rejeita7  .map(t => teste(`pesquisarCep() não deve aceitar "${t}".` , eval(`async () => await testePorcaria10("${t}")` ), naoDeuErro(), testOk));
    const testes10c = naoExiste9.map(t => teste(`pesquisarCep() não deve aceitar "${t}".` , eval(`async () => await testePorcaria10("${t}")` ), naoDeuErro(), testOk));

    grupo("Exercício 10 - parte 1 (caminho feliz)"                                  , "DOM da pesquisa de CEP").maximo(0.4).testes(testes10a);
    grupo("Exercício 10 - parte 2 (caminho infeliz - CEPs inválidos)"               , "DOM da pesquisa de CEP").maximo(0.2).testes(testes10b);
    grupo("Exercício 10 - parte 3 (caminho infeliz - CEP válido, porém inexistente)", "DOM da pesquisa de CEP").maximo(0.2).testes(testes10c);

    // Exercício 11.

    async function testeNaoExiste11(pesquisa) {
        try {
            await pesquisarPokemon(pesquisa);
        } catch (e) {
            if (!(e instanceof PokemonNaoEncontradoError) || [null, undefined, ""].includes(e?.message?.trim())) throw e; // Não era a exceção que devia ter sido.
            return;
        }
        throw new Error("A função pesquisarPokemon retornou normalmente para um pokémon inexistente.");
    }

    async function testeExiste11(pesquisa, nome, numero, foto) {
        const e = await pesquisarPokemon(pesquisa);
        if (!(e instanceof Pokemon)) throw new Error("A função pesquisarPokemon retornou porcaria.");
        if (e.nome   !== nome  ) throw new Error(`Nome errado. Devia ser "${nome}", mas veio "${e.nome}".`      );
        if (e.numero !== numero) throw new Error(`Número errado. Devia ser "${numero}", mas veio "${e.numero}".`);
        if (e.foto   !== foto  ) throw new Error(`Foto errada. Devia ser "${foto}", mas veio "${e.foto}".`      );
    }

    const naoExiste11 = ["dollynho", "aquaman", "chocolate", "bozo-lula", "aluminium", "0", "-1", "-2", "5000", "hkjdhfksd", "   12", "!@$@&*"];

    const existe11 = [
        ["pikachu", "pikachu", 25, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"],
        ["25", "pikachu", 25, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"],
        ["jigglypuff", "jigglypuff", 39, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"],
        ["39", "jigglypuff", 39, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"],
        ["celebi", "celebi", 251, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/251.png"],
        ["251", "celebi", 251, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/251.png"],
        ["charmander", "charmander", 4, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"],
        ["4", "charmander", 4, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"]
    ]

    const testes11a = existe11   .map(t => teste(`pesquisarPokemon() deve encontrar "${t[0]}".`, eval(`async () => await testeExiste11("${t[0]}", "${t[1]}", ${t[2]}, "${t[3]}")`), naoDeuErro(), testOk));
    const testes11b = naoExiste11.map(t => teste(`pesquisarPokemon() não deve aceitar "${t}".` , eval(`async () => await testeNaoExiste11("${t}")` ), naoDeuErro(), testOk));

    grupo("Exercício 11 - parte 1 (caminho feliz)"  , "AJAX ou fetch na pokeapi").maximo(0.4).testes(testes11a);
    grupo("Exercício 11 - parte 2 (caminho infeliz)", "AJAX ou fetch na pokeapi").maximo(0.3).testes(testes11b);

    // Exercício 12.

    const nada = "https://cdn-icons-png.flaticon.com/256/4467/4467515.png";

    async function testePorcaria12(pesquisa) {
        limparForm12();
        document.getElementById("pokemon-pesquisa").value = pesquisa;
        await pesquisarPokemonDOM();
        const resposta = document.getElementById("pokemon-nome").value;
        if (resposta.trim() === "") throw new Error("A mensagem de erro não apareceu.");
        if (document.getElementById("pokemon-numero").value !== "") throw new Error("O número do pokémon devia estar em branco já que não existe.");
        if (document.getElementById("pokemon-foto").src !== nada) throw new Error("A foto do pokémon devia ser " + nada + " já que não existe.");
    }

    async function testeExiste12(pesquisa, nome, numero, foto) {
        limparForm12();
        document.getElementById("pokemon-pesquisa").value = pesquisa;
        await pesquisarPokemonDOM();
        return [document.getElementById("pokemon-nome").value, document.getElementById("pokemon-numero").value, document.getElementById("pokemon-foto").src];
    }

    const testes12a = existe11   .map(t => teste(`pesquisarPokemonDOM() deve encontrar "${t[0]}".`, eval(`async () => await testeExiste12("${t[0]}")`), igual([t[1], "" + t[2], t[3]]), testOk));
    const testes12b = naoExiste11.map(t => teste(`pesquisarPokemonDOM() não deve aceitar "${t}".` , eval(`async () => await testePorcaria12("${t}")` ), naoDeuErro(), testOk));

    grupo("Exercício 12 - parte 1 (caminho feliz)"  , "DOM da pesquisa de pokémon").maximo(0.4).testes(testes12a);
    grupo("Exercício 12 - parte 2 (caminho infeliz)", "DOM da pesquisa de pokémon").maximo(0.3).testes(testes12b);
});