const axios = require("axios");
const sha1 = require("js-sha1");

const TOKEN = ""; // *TOKEN CODENATION*

fs = require("fs");

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

axios({
        method: "get",
        url: "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=" +
            TOKEN
    })
    .then(result => {
        let data = result.data;

        let resultado = descriptografar(
            result.data.cifrado,
            result.data.numero_casas
        );

        data.decifrado = resultado;
        data.resumo_criptografico = sha1(resultado);

        fs.writeFileSync("answer.json", JSON.stringify(data));
    })
    .catch(err => {
        console.log(err);
    });

function criptografar(frase, casas) {
    let palavras = frase.toLowerCase();
    let res = new RegExp("[a-z]");
    let criptografado = "";

    palavras.split("").forEach(k => {
        if (res.test(k)) {
            count = alfabeto.indexOf(k) + casas;
            criptografado += alfabeto[count > 26 ? count - 26 : count];
        } else {
            criptografado += k;
        }
    });
    return criptografado;
}

function descriptografar(frase, casas) {
    let palavras = frase.toLowerCase();
    let res = new RegExp("[a-z]");
    let descriptografado = "";

    palavras.split("").forEach(k => {
        if (res.test(k)) {
            count = alfabeto.indexOf(k) - casas;
            descriptografado += alfabeto[count < 0 ? count + 26 : count];
        } else {
            descriptografado += k;
        }
    });
    return descriptografado;
}
