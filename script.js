// Carrega a matriz do LocalStorage ou começa vazia
let carteira = JSON.parse(localStorage.getItem("minhaCarteira")) || [];

// Renderiza a tabela assim que abre a página
atualizarInterface();

function adicionarGasto() {
  const descInput = document.getElementById("descricao");
  const valorInput = document.getElementById("valor");

  const descricao = descInput.value;
  const valor = Number(valorInput.value);

  if (descricao && valor > 0) {
    const novoItem = {
      item: descricao,
      valor: valor,
      data: new Date().toLocaleDateString(),
    };

    function editarItem(id) {
    // Busca o item na nossa "matriz" pelo ID
    const itemParaEditar = carteira.find(it => it.id === id);
    
    if (itemParaEditar) {
        const novoNome = prompt("Novo nome do ativo:", itemParaEditar.item);
        const novoValor = prompt("Novo valor (use ponto para centavos):", itemParaEditar.valor);

        if (novoNome && !isNaN(parseFloat(novoValor))) {
            itemParaEditar.item = novoNome;
            itemParaEditar.valor = parseFloat(novoValor);
            salvarEDesenhar();
          }
      }
  }

  function excluirItem(id) {
    if (confirm("Deseja remover este registro?")) {
        carteira = carteira.filter(it => it.id !== id);
        salvarEDesenhar();
      }
    }
    function formatarMoeda(valor) {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

  function salvarEDesenhar() {
    localStorage.setItem('minhaCarteira', JSON.stringify(carteira));
    atualizarInterface();
    }

    // Adiciona na nossa matriz flexível
    carteira.push(novoItem);

    // Salva no navegador
    localStorage.setItem("minhaCarteira", JSON.stringify(carteira));

    // Limpa os campos e atualiza a tela
    descInput.value = "";
    valorInput.value = "";
    atualizarInterface();
  } else {
    alert("Preencha os campos corretamente!");
  }
}

function atualizarInterface() {
  const corpo = document.getElementById("tabelaCorpo");
  const totalSpan = document.getElementById("valorTotal");
  let somaTotal = 0;

  // Limpa a tabela antes de reconstruir
  corpo.innerHTML = "";

  // Percorre a matriz e cria as linhas no HTML
  carteira.forEach((ativo) => {
    const linha = `
            <tr>
                <td>${ativo.data}</td>
                <td>${ativo.item}</td>
                <td>R$ ${ativo.valor.toFixed(2)}</td>
            </tr>
        `;
    corpo.innerHTML += linha;
    somaTotal += ativo.valor;
  });

  totalSpan.innerHTML = `R$ ${somaTotal.toFixed(2)}`;
}
