function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function HTMLcategorias(cat, corCategoria, marginBottom) {

    return `
        <div style="margin-bottom:${marginBottom};">

            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:14px;">

                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="
                        width:8px;
                        height:8px;
                        border-radius:50%;
                        background:${corCategoria};
                        display:inline-block;
                        flex-shrink:0;
                    "></span>

                    <span style="font-weight:500;color:var(--text-main);">
                        ${cat.nome}
                    </span>
                </div>

                <div style="display:flex;align-items:center;gap:10px;">

                    <span style="font-size:12px;color:var(--text-muted);">
                        ${cat.porcentagem.toFixed(0)}%
                    </span>

                    <strong style="font-weight:600;font-size:14px;color:var(--text-main);">
                        ${formatarMoeda(cat.valor)}
                    </strong>

                </div>

            </div>


            <div style="
                width:100%;
                height:6px;
                background:#f0f0f2;
                border-radius:10px;
                overflow:hidden;
            ">

                <div style="
                    width:${cat.porcentagem}%;
                    height:100%;
                    background:${corCategoria};
                    border-radius:10px;
                    transition:width .3s;
                ">
                </div>

            </div>

        </div>
    `;
}

function HTMLhistorico(t, formatarData, corBase, corFundoTransparente, isReceita) {

    return `

            <div class="item-transacao">

                <div class="item-info">

                    <div class="item-icone" style="background:${corFundoTransparente};">
                        <div class="icone-ponto" style="background:${corBase};"></div>
                    </div>

                    <div class="item-text" style="text-align:left;">
                        <h4>${t.descricao}</h4>
                        <p>${t.categoria} · ${formatarData}</p>
                    </div>

                </div>

                <div class="item-valor ${isReceita ? 'valor-positivo' : 'valor-negativo'}">

                    <span>
                        ${isReceita ? '+' : '-'} ${formatarMoeda(t.valor)}
                    </span>

                    <button
                        class="btn-editar"
                        data-id="${t.id}"
                        title="Editar transação">

                        <svg width="18" height="18" viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round">

                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>

                        </svg>

                    </button>

                    <button
                        class="btn-deletar"
                        data-id="${t.id}"
                        title="Excluir transação">

                        <svg width="18" height="18" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round">

                            <polyline points="3 6 5 6 21 6"></polyline>

                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>

                            <line x1="10" y1="11" x2="10" y2="17"></line>

                            <line x1="14" y1="11" x2="14" y2="17"></line>

                        </svg>

                    </button>

                </div>

            </div>

        `;
}

export function atualizarPainelSaldo(totais, limiteMensal) {
    document.getElementById('saldoTotal').textContent = formatarMoeda(totais.saldo);
    document.getElementById('totalReceitas').textContent = formatarMoeda(totais.receitas);
    document.getElementById('totalDespesas').textContent = formatarMoeda(totais.despesas);

    const cardSaldo = document.querySelector('.saldo');
    const badgeAlerta = document.getElementById('badgeAlerta');

    if (totais.despesas > limiteMensal) {
        cardSaldo.classList.add('excedido');
        badgeAlerta.classList.remove('hidden');
    } else {
        cardSaldo.classList.remove('excedido');
        badgeAlerta.classList.add('hidden');
    }
}

export function atualizarBarraOrcamento(totalDespesas, limiteMensal) {

    const porcentagemUso =
        limiteMensal > 0
            ? Math.min((totalDespesas / limiteMensal) * 100, 100)
            : 0;

    document.getElementById('textoOrcamento').textContent =
        `${formatarMoeda(totalDespesas)} de ${formatarMoeda(limiteMensal)}`;

    document.getElementById('porcentagemOrcamento').textContent =
        `${porcentagemUso.toFixed(0)}%`;

    const barraFill = document.getElementById('barraOrcamento');
    barraFill.style.width = `${porcentagemUso}%`;

    if (totalDespesas > limiteMensal) {
        barraFill.style.backgroundColor = 'var(--cor-alerta)';
    } else {
        barraFill.style.backgroundColor = 'var(--cor-vermelha)';
    }
}

export function renderizarCategorias(categorias) {

    const container = document.getElementById('listaCategorias');

    if (categorias.length === 0) {
        container.innerHTML =
            '<p class="text-muted" style="text-align:center; padding:10px 0;">Sem gastos registrados.</p>';
        return;
    }

    container.style.marginTop = '5px';

    container.innerHTML = categorias.map((cat, index) => {

        const corCategoria = obterCorCategoria(cat.nome);

        const isUltimo = index === categorias.length - 1;

        const marginBottom = isUltimo ? '0' : '18px';

        return HTMLcategorias(
            cat,
            corCategoria,
            marginBottom
        );

    }).join('');

}

function obterCorCategoria(categoria) {

    const cores = {
        'Renda': '#34c759',
        'Moradia': '#007aff',
        'Alimentação': '#ff9500',
        'Transporte': '#5856d6',
        'Saúde': '#ff3b30',
        'Lazer': '#ff2d55',
        'Educação': '#5ac8fa',
        'Outros': '#8e8e93'
    };

    return cores[categoria] || '#8e8e93';

}

export function renderizarHistorico(transacoes) {

    const lista = document.getElementById('listaTransacoes');

    document.getElementById('qtdRegistros').textContent =
        `${transacoes.length} registros`;

    if (transacoes.length === 0) {

        lista.innerHTML =
            '<div style="padding:30px;text-align:center;">Nenhuma transação ainda.</div>';

        return;

    }

    lista.innerHTML = transacoes.map(t => {

        const formatarData = t.data.split('-').reverse().join('/');

        const isReceita = t.tipo === 'receita';

        const corBase = obterCorCategoria(t.categoria);

        const corFundoTransparente = corBase + '25';

        return HTMLhistorico(
            t,
            formatarData,
            corBase,
            corFundoTransparente,
            isReceita
        );

    }).join('');

} 