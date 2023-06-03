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
        console.log(x);
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

    grupo("Exercício 3 - parte 1 (caminho feliz)", "Conversão de temperaturas").maximo(0.4).testes(testes3a);
    grupo("Exercício 3 - parte 2 (casos triviais)", "Conversão de temperaturas na mesma escala").maximo(0.4).testes(testes3b);
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

    const lixosFatorial = [...lixos];
    lixosFatorial.push("-1", "1.5", "0.333", "-0.777");

    const testes4a = tabelaFatoriais.map(x => teste(`${x.de}! = ${x.para}`, eval(`() => fatorial(${x.de})`), igual(x.para), testOk));

    const testes4b = lixosFatorial.map(x => teste(`Deve recusar ${x} como valor.`, eval(testarFunc("fatorial", x, "ConvertError")), naoDeuErro(), testOk));

    grupo("Exercício 4 - parte 1 (caminho feliz)", "Fatorial").maximo(0.4).testes(testes4a);
    grupo("Exercício 4 - parte 2 (caminho infeliz)", "Fatorial").maximo(0.4).testes(testes4b);
});
