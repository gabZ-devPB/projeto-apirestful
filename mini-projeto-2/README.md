# Tema 1: Finanças Pessoais (Controle & Conscientização)

    • Descrição Geral: É uma plataforma digital voltada à conscientização financeira e
incentivo à economia. Seu objetivo é engajar usuários em ações que reduzam o
descontrole financeiro e promovam um estilo de vida econômico responsável. O
sistema surge do problema crescente do endividamento, muitas vezes pela
ausência de informação acessível e acompanhamento contínuo. Por meio de
uma interface amigável, o usuário poderá registrar despesas, acompanhar metas
diárias e visualizar seu progresso. O projeto estimula a reflexão sobre gastos
impulsivos e planejamento a longo prazo.

Funcionalidades Únicas:

    • Cálculo de Saldo: Utilizar o reduce() para somar todas as receitas, subtrair as
despesas e exibir o saldo total na tela.

    • Alerta Visual de Orçamento: O usuário define um "limite de gastos mensal". Se
a soma das despesas ultrapassar esse limite, a manipulação da DOM deve alterar
a cor do painel de saldo para vermelho.

    • Gráfico Dinâmico Simples: Criar barras coloridas usando <div> cujas larguras
(width no CSS) sejam alteradas dinamicamente via JS (style.width) representando
a porcentagem de gastos por categoria.  

Exemplo de Dados Inicial:

const dadosIniciais = [
{ id: 1, descricao: 'Salário Mensal', categoria: 'Renda', tipo: 'receita', valor:
3500.00, data: '2025-05-05' },
{ id: 2, descricao: 'Conta de Luz', categoria: 'Moradia', tipo: 'despesa', valor:
150.50, data: '2025-05-10' },
{ id: 3, descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'despesa', valor:
600.00, data: '2025-05-12' }
];
