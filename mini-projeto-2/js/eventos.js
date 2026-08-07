import {
    adicionarTransacao,
    atualizarLimite,
    removerTransacao,
    getLimiteGlobal,
    editarTransacao,
    getTransacoes
} from "./app.js";

function mostrarPopup(mensagem) {

    const toast = document.getElementById("toast");
    const texto = document.getElementById("toastMensagem");

    texto.textContent = mensagem;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

const modalOverlay = document.getElementById("modalOverlay");
const modalLimite = document.getElementById("modalLimite");

const btnDespesa = document.getElementById("btnDespesa");
const btnReceita = document.getElementById("btnReceita");

let tipoSelecionado = "despesa";
let idEditando = null;


document.getElementById("btnNovaTransacao").addEventListener("click", () => {

    modalOverlay.classList.add("active");

    document.getElementById("data").valueAsDate = new Date();

});

document.getElementById("btnFecharModal").addEventListener("click", () => {

    modalOverlay.classList.remove("active");

});

modalOverlay.addEventListener("click", (e) => {

    if (e.target === modalOverlay) {

        modalOverlay.classList.remove("active");

    }

});

btnDespesa.addEventListener("click", () => {

    tipoSelecionado = "despesa";

    btnDespesa.classList.add("active");
    btnReceita.classList.remove("active");

});

btnReceita.addEventListener("click", () => {

    tipoSelecionado = "receita";

    btnReceita.classList.add("active");
    btnDespesa.classList.remove("active");

});

document.getElementById("formTransacao").addEventListener("submit", async (e) => {

    e.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const categoria = document.getElementById("categoria").value;
    const valor = document.getElementById("valor").value;
    const data = document.getElementById("data").value;

    if (!descricao) {
        mostrarPopup("Preencha a descrição.");
        return;
    }

    if (!categoria) {
        mostrarPopup("Selecione uma categoria.");
        return;
    }

    if (!valor || Number(valor) <= 0) {
        mostrarPopup("Informe um valor válido.");
        return;
    }

    if (!data) {
        mostrarPopup("Selecione uma data.");
        return;
    }

    const novaTransacao = {
        descricao,
        tipo: tipoSelecionado,
        categoria,
        valor: parseFloat(valor),
        data
    };

if (idEditando) {

    await editarTransacao(idEditando, novaTransacao);
    idEditando = null;

} else {

    await adicionarTransacao(novaTransacao);
}

    e.target.reset();
    modalOverlay.classList.remove("active");
    idEditando = null;
    tipoSelecionado = "despesa";
    btnDespesa.classList.add("active");
    btnReceita.classList.remove("active");

});

document.getElementById("btnEditarLimite").addEventListener("click", (e) => {

    e.preventDefault();

    modalLimite.classList.add("active");

    document.getElementById("inputNovoLimite").value = getLimiteGlobal();

});

document.getElementById("btnCancelarLimite").addEventListener("click", () => {

    modalLimite.classList.remove("active");

});

modalLimite.addEventListener("click", (e) => {

    if (e.target === modalLimite) {

        modalLimite.classList.remove("active");

    }

});

document.getElementById("formEditarLimite").addEventListener("submit", async (e) => {

    e.preventDefault();

    const novoLimite = parseFloat(
        document.getElementById("inputNovoLimite").value
    );
    if (!isNaN(novoLimite) && novoLimite >= 0) {
        await atualizarLimite(novoLimite);
        modalLimite.classList.remove("active");

    }

});

document.getElementById("listaTransacoes").addEventListener("click", async (e) => {

    const btnEditar = e.target.closest(".btn-editar");

    if (btnEditar) {

        const id = btnEditar.dataset.id;

        const transacao = getTransacoes().find(t => t.id == id);

        if (!transacao) return;

        idEditando = id;

        document.getElementById("descricao").value = transacao.descricao;
        document.getElementById("categoria").value = transacao.categoria;
        document.getElementById("valor").value = transacao.valor;
        document.getElementById("data").value = transacao.data;

        tipoSelecionado = transacao.tipo;

        if (tipoSelecionado === "receita") {
            btnReceita.classList.add("active");
            btnDespesa.classList.remove("active");
        } else {
            btnDespesa.classList.add("active");
            btnReceita.classList.remove("active");
        }

        modalOverlay.classList.add("active");

        return;
    }

    const btnDeletar = e.target.closest(".btn-deletar");

    if (btnDeletar) {

        const id = btnDeletar.dataset.id;

        await removerTransacao(id);

    }

});