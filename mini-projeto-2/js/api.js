const API = "http://localhost:3000";

export async function buscarTransacoes() {
    const resposta = await fetch(`${API}/transacoes`);
    return await resposta.json();
}

export async function adicionarTransacaoAPI(transacao) {
    await fetch(`${API}/transacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transacao)
    });
}

export async function removerTransacaoAPI(id) {
    await fetch(`${API}/transacoes/${id}`, {
        method: "DELETE"
    });
}

export async function editarTransacaoAPI(id, transacao) {
    await fetch(`${API}/transacoes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transacao)
    });
}

export async function buscarLimite() {
    const resposta = await fetch(`${API}/configuracao`);
    return await resposta.json();
}

export async function atualizarLimiteAPI(limite) {
    await fetch(`${API}/configuracao`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 1,
            limite
        })
    });
}