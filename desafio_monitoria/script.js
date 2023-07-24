const dinheiro = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' });

const produtos = {
    /**
     * id -> identificador
     * src -> imagem do produto
     * alt -> descrição p/ letior de tela
     * preco -> preço em reais
     * descrição -> nome do produto
     */
    femininos: [
        { id: "1", src: "imagens/feminino/1.jpg", alt: "alt-text", preco: 139.90, descricao: "camisa xadrez" },
        { id: "2", src: "imagens/feminino/2.jpg", alt: "alt-text", preco: 180.80, descricao: "casaco casual xadrez" },
        { id: "3", src: "imagens/feminino/3.jpg", alt: "alt-text", preco: 59.90, descricao: "camisa casual" },
        { id: "4", src: "imagens/feminino/4.jpg", alt: "alt-text", preco: 85, descricao: "blusa bege" },
        { id: "5", src: "imagens/feminino/5.jpg", alt: "alt-text", preco: 111.50, descricao: "blusa estampa Leopardo" },
        { id: "6", src: "imagens/feminino/6.jpg", alt: "alt-text", preco: 85.90, descricao: "blusa preta casual" },
    ], masculinos: [
        { id: "7", src: "imagens/masculino/1.jpg", alt: "alt-text", preco: 110.90, descricao: "casaco casual xadrez" },
        { id: "8", src: "imagens/masculino/2.jpg", alt: "alt-text", preco: 209.90, descricao: "blusa de frio" },
        { id: "9", src: "imagens/masculino/3.jpg", alt: "alt-text", preco: 79.90, descricao: "camisa estampa Rick e Morty" },
        { id: "10", src: "imagens/masculino/4.jpg", alt: "alt-text", preco: 70, descricao: "blusa basica" },
        { id: "11", src: "imagens/masculino/5.jpg", alt: "alt-text", preco: 79.90, descricao: "camisa estampa praia" },
        { id: "12", src: "imagens/masculino/6.jpg", alt: "alt-text", preco: 72.80, descricao: "camisa bege" },
    ], infantis: [
        { id: "13", src: "imagens/infantil/1.jpg", alt: "alt-text", preco: 59.90, descricao: "blusa manga comprida estampa Stitch" },
        { id: "14", src: "imagens/infantil/2.jpg", alt: "alt-text", preco: 49.9, descricao: "blusa estampa Sonic" },
        { id: "15", src: "imagens/infantil/3.jpg", alt: "alt-text", preco: 85.90, descricao: "vestido xadrez" },
        { id: "16", src: "imagens/infantil/4.jpg", alt: "alt-text", preco: 49.9, descricao: "blusa estampa Dinossáuro" },
        { id: "17", src: "imagens/infantil/5.jpg", alt: "alt-text", preco: 110, descricao: "blusa de frio estampa Minnie" },
        { id: "18", src: "imagens/infantil/6.jpg", alt: "alt-text", preco: 85.9, descricao: "vestido estampa Leopardo" },
    ]
}

var carrinho = {};

function listarProdutos(listaDeProdutos) {
    const listaProdutosElement = document.getElementById("lista-produtos")

    var htmlProdutos = "";
    for (const produto of listaDeProdutos) {
        htmlProdutos += `
        <div class="card" style="width: 18rem;">
            <img src="${produto.src}" class="card-img-top" alt="${produto.alt}">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title">${produto.descricao}</h5>
                <p class="card-text">${dinheiro.format(produto.preco)}</p>
                <a class="btn btn-info" onclick="adicionarNoCarrinho('${produto.id}', '${produto.src}', '${produto.descricao}', '${produto.preco}')">Adicionar</a>
            </div>
        </div>`
    }
    listaProdutosElement.innerHTML = htmlProdutos
}

function marcarAtivo(nomeLista) {
    const ativo = document.querySelector('.nav-item .active')
    if (ativo) {
        ativo.classList.toggle('active');
    }

    const filtroAtivoElement = document.getElementById(`filtrar-${nomeLista}`);
    filtroAtivoElement.classList.toggle('active');
}

function trocarLista(nomeLista) {
    marcarAtivo(nomeLista)
    listarProdutos(buscarProtudos(nomeLista, ''))
}

function buscarProtudos(nomeLista, filtro) {
    const categoria = produtos[nomeLista] ? produtos[nomeLista] : Object.values(produtos).flatMap(p => p);
    return categoria.filter(produto => produto.descricao.includes(filtro))
}

function pesquisar(event) {
    event.preventDefault()
    var formData = new FormData(event.target);
    listarProdutos(buscarProtudos('todos', formData.get('filtro')))
}

function adicionarNoCarrinho(id, src, descricao, preco) {
    const produtoCarrinho = carrinho[id];
    if (produtoCarrinho) {
        produtoCarrinho.quantidade++
    } else {
        carrinho[id] = { id, src, descricao, preco, quantidade: 1 };
    }
}

function init() {
    const pesquisarForm = document.getElementById('pesquisar')
    pesquisarForm.addEventListener('submit', pesquisar)
    listarProdutos(buscarProtudos('todos', ''))
    marcarAtivo('todos')
}

function listarCarrinho(carrinho) {
    const produtosCarrinho = document.getElementById("produtos-carrinho")

    var htmlProdutos = "";
    for (const produto of Object.values(carrinho)) {
        htmlProdutos += `
        <div class="card" style="width: 18rem;">
            <img src="${produto.src}" class="card-img-top" alt="${produto.alt}">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title">${produto.descricao}</h5>
                <p class="card-text">${dinheiro.format(produto.preco)}</p>
                <p class="card-text">${produto.quantidade}<p>
            </div>
        </div>`
    }
    return htmlProdutos
}

const modalCarrinho = document.getElementById('carrinhoDeCompras')
if (modalCarrinho) {
  modalCarrinho.addEventListener('show.bs.modal', event => {
    const modalBody = modalCarrinho.querySelector('.modal-body')
    modalBody.innerHTML = listarCarrinho(carrinho)
  })
}