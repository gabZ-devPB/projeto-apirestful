import {
    calcularTotais,
    calcularGastosPorCategoria
} from "./calculos.js";

import {
    atualizarPainelSaldo,
    atualizarBarraOrcamento,
    renderizarCategorias,
    renderizarHistorico
} from "./dom.js";

import {
    buscarTransacoes,
    adicionarTransacaoAPI,
    removerTransacaoAPI,
    buscarLimite,
    atualizarLimiteAPI,
    editarTransacaoAPI
} from "./api.js";

let limiteGlobal = 0;
let listaDeTransacoes = [];

function atualizarTelaPrincipal() {
    const totais = calcularTotais(listaDeTransacoes);
    const dadosCategorias = calcularGastosPorCategoria(listaDeTransacoes);

    atualizarPainelSaldo(totais, limiteGlobal);
    atualizarBarraOrcamento(totais.despesas, limiteGlobal);
    renderizarCategorias(dadosCategorias);
    renderizarHistorico(listaDeTransacoes);
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        listaDeTransacoes = await buscarTransacoes();

        const configuracao = await buscarLimite();
        limiteGlobal = configuracao.limite;

        atualizarTelaPrincipal();
    } catch (erro) {
        console.error(erro);
    }
});

export async function adicionarTransacao(novaTransacao) {
    try {
        await adicionarTransacaoAPI(novaTransacao);
        listaDeTransacoes = await buscarTransacoes();
        atualizarTelaPrincipal();
    } catch (erro) {
        console.error(erro);
    }
}

export async function atualizarLimite(novoValor) {
    try {
        limiteGlobal = novoValor;
        await atualizarLimiteAPI(novoValor);
        atualizarTelaPrincipal();
    } catch (erro) {
        console.error(erro);
    }
}

export async function removerTransacao(id) {
    try {
        await removerTransacaoAPI(id);
        listaDeTransacoes = await buscarTransacoes();
        atualizarTelaPrincipal();
    } catch (erro) {
        console.error(erro);
    }
}

export async function editarTransacao(id, transacaoAtualizada) {
    try {
        await editarTransacaoAPI(id, transacaoAtualizada);
        listaDeTransacoes = await buscarTransacoes();
        atualizarTelaPrincipal()
    } catch (erro) {
        console.error(erro);
    }
    
}

export function getLimiteGlobal() {
    return limiteGlobal;
}

export function getTransacoes() {
    return listaDeTransacoes;
}