const nome = document.getElementById("nomeAtividade");
const descricao = document.getElementById("descricaoAtividade");
const participantes = document.getElementById("participantesAtividade");
const lista = document.getElementById("listaAtividades");
const filtro = document.getElementById("filtro");
const cadastrarBtn = document.getElementById("cadastrarBtn");

const modal = document.getElementById("modalConfirmacao");
const confirmar = document.getElementById("confirmarRemocao");
const cancelar = document.getElementById("cancelarRemocao");

let atividadeParaRemover = null;

cadastrarBtn.addEventListener("click", () => {
  if (!nome.value || !descricao.value || !participantes.value) return;

  const div = document.createElement("div");
  div.className = "atividade";
  div.innerHTML = `
    <h3>${nome.value}</h3>
    <p>${descricao.value}</p>
    <p><strong>Participantes:</strong> ${participantes.value}</p>
    <button class="botao-remover">Remover</button>
  `;

  lista.appendChild(div);

  nome.value = "";
  descricao.value = "";
  participantes.value = "";

  // Atualizar botão de remoção
  atualizarRemocao();
});

filtro.addEventListener("input", () => {
  const atividades = document.querySelectorAll(".atividade");
  const termo = filtro.value.toLowerCase();

  atividades.forEach(div => {
    const texto = div.innerText.toLowerCase();
    div.style.display = texto.includes(termo) ? "block" : "none";
  });
});

function atualizarRemocao() {
  const botoes = document.querySelectorAll(".botao-remover");

  botoes.forEach(botao => {
    botao.onclick = () => {
      atividadeParaRemover = botao.parentElement;
      modal.style.display = "flex";
    };
  });
}

confirmar.onclick = () => {
  if (atividadeParaRemover) {
    atividadeParaRemover.remove();
    atividadeParaRemover = null;
    modal.style.display = "none";
  }
};

cancelar.onclick = () => {
  modal.style.display = "none";
  atividadeParaRemover = null;
};

// Modo escuro
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
