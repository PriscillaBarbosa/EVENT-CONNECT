import '../src/style.css'

// ---ESTADO DA APLICAÇÃO ---
let listaGlobal = [];
let listaFiltrada = [];
//aplica persistência simples em memória
let itensContratados = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

// --- SELETORES DOM ---
const containerLista = document.getElementById('lista-fornecedores');
const containerFiltros = document.getElementById('container-filtros');
const displayTotal = document.getElementById('valor-total');
const displayQtd = document.getElementById('qtd-itens');

// ---1. BUSCA DADOS (ASYNC / FETCH) ---
async function fetchFornecedores() {
  try {
    const response = await fetch('/fornecedores.json');
    listaGlobal = await response.json();
    listaFiltrada = listaGlobal;
    renderizar(listaFiltrada);
  } catch (error) {
    containerLista.innerHTML = '<p>Erro ao carregar fornecedores</p>';
    console.error('Erro na requisição:', error);
  }
};

// ---2. RENDERIZAÇÃO (MAP + TEMPLATE LITERALS) ---
const renderizar = (lista) => {
  if (lista.length === 0) {
    containerLista.innerHTML = '<p>Nenhum fornecedor encontrado</p>';
    return;
  }

  containerLista.innerHTML = lista.map(({ id, nome, categoria, preco}) => {
    const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(preco);
    return ` 
    <div class = "card-servico">
      <div>
        <h3>${nome}</h3>
        <span class="tag">${categoria.toUpperCase()}</span>
      </div>
      <div>
        <p class="preco">${precoFormatado}</p>
        <button class="btn-contratar" data-id="${id}">Adicionar</button>
      </div>
    </div>
    `;
  }).join('');
};

// ---3. EVENTOS (EVENT DELEGATION & FILTER) ---

//clique na lista de cards
containerLista.addEventListener('click', (evento) => {
  //verifica se o elemento clicado (target) tem a classe do botão
  const botao = evento.target.closest('.btn-contratar');

  if (botao) {
    const id = parseInt(botao.dataset.id); //pega o id do data-atributo
    adicionarAoCarrinho(id);
  }
});

//Lógica para FILTRAR(clique nos botões de filtro)
containerFiltros.addEventListener('click', (evento) => {
  const botao = evento.target;
  if (botao.tagName === 'BUTTON') {
    //Atualiza visual dos botões
    document.querySelectorAll('.filtros button').forEach(btn => btn.classList.remove('ativo'));
    botao.classList.add('ativo');

    //filtra os dados
    const categoria = botao.dataset.categoria;
    if (categoria === 'todos') {
      listaFiltrada = listaGlobal;
    } else {
      listaFiltrada = listaGlobal.filter(item => item.categoria === categoria);
    }
    renderizar(listaFiltrada)
  }
});

// ---4. LÓGICA DO NEGÓCIO (FIND + REDUCE) ---
const adicionarAoCarrinho = (id) => {
  const item = listaGlobal.find(i => i.id === id);

  if (itensContratados.some(i => i.id === id)) {
    alert("Este serviço já foi contratado!");
    return;
  }

  itensContratados.push(item);
  atualizarTotais();
};

const atualizarTotais = () => {
  // 1. Salva no navegador (transforma array em texto)
  localStorage.setItem('meuCarrinho', JSON.stringify(itensContratados));
  
  //REDUCE: Soma os preços dos itens no carrinho
  const total = itensContratados.reduce((acc, item) => acc + item.preco, 0);
  //Atualiza o DOM 
  displayTotal.innerText = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL' }).format(total);
  displayQtd.innerText = itensContratados.length;
};

// ---5. INICIALIZAÇÃO ---
fetchFornecedores();
atualizarTotais();

