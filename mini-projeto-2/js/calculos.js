
export function calcularTotais(transacoes) {
    const receitas = transacoes.reduce(
        (acumulador, t) => 
            t.tipo === 'receita' ? acumulador + t.valor : acumulador,
        0
    );

    const despesas = transacoes.reduce(
        (acumulador, t) => 
            t.tipo === 'despesa' ? acumulador + t.valor : acumulador,
        0
    );

    const saldo = receitas - despesas;
    
    return { receitas, despesas, saldo };
}



export function calcularGastosPorCategoria(transacoes) {

    const despesas = transacoes.filter(
        t => t.tipo === 'despesa'
    );
    const totalDespesas = despesas.reduce(
        (acc, t) => acc + t.valor,
        0
    );

    const agrupamento = {};
    
    despesas.forEach(t => {

        if (!agrupamento[t.categoria]) {
            agrupamento[t.categoria] = 0;
        }

        agrupamento[t.categoria] += t.valor;
    });

    return Object.keys(agrupamento).map(categoria => ({
        nome: categoria,
        valor: agrupamento[categoria],

        porcentagem: totalDespesas > 0
            ? (agrupamento[categoria] / totalDespesas) * 100
            : 0
    }));
}