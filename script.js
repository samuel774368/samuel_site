document.addEventListener('DOMContentLoaded', () => {
    // Carregar atividades salvas no localStorage
    carregarAtividades();
  
    // Adicionar o evento de clique ao botão de cadastro
    document.getElementById('cadastrarBtn').addEventListener('click', cadastrarAtividade);
  });
  
  // Função para cadastrar atividade
  function cadastrarAtividade() {
    const nome = document.getElementById('nomeAtividade').value.trim();
    const descricao = document.getElementById('descricaoAtividade').value.trim();
    const participantes = document.getElementById('participantesAtividade').value.trim();
  
    // Validar se todos os campos foram preenchidos
    if (!nome || !descricao || !participantes) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
  
    const novaAtividade = { nome, descricao, participantes };
    
    // Salvar atividade no localStorage
    const atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    atividades.push(novaAtividade);
    localStorage.setItem('atividades', JSON.stringify(atividades));
  
    // Limpar campos
    document.getElementById('nomeAtividade').value = '';
    document.getElementById('descricaoAtividade').value = '';
    document.getElementById('participantesAtividade').value = '';
  
    // Atualizar lista de atividades
    adicionarAtividadeNaTela(novaAtividade, atividades.length - 1);
  }
  
  // Função para exibir atividade na tela
  function adicionarAtividadeNaTela(atividade, index) {
    const div = document.createElement('div');
    div.classList.add('atividade');
    div.innerHTML = `
      <h3>${atividade.nome}</h3>
      <p><strong>Descrição:</strong> ${atividade.descricao}</p>
      <p><strong>Participantes:</strong> ${atividade.participantes}</p>
      <button onclick="removerAtividade(${index})" class="botao-remover">Remover</button>
    `;
    document.getElementById('listaAtividades').appendChild(div);
  }
  
  // Função para carregar atividades salvas ao iniciar a página
  function carregarAtividades() {
    const atividadesSalvas = JSON.parse(localStorage.getItem('atividades')) || [];
    atividadesSalvas.forEach((atividade, index) => {
      adicionarAtividadeNaTela(atividade, index);
    });
  }
  
  // Função para remover atividade
  function removerAtividade(index) {
    let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    atividades.splice(index, 1); // Remove do array
    localStorage.setItem('atividades', JSON.stringify(atividades)); // Atualiza o localStorage
  
    // Recarregar lista de atividades
    document.getElementById('listaAtividades').innerHTML = ''; 
    atividades.forEach((atividade, idx) => adicionarAtividadeNaTela(atividade, idx));
  }
  