// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const nome = document.getElementById("nomeAtividade");
  const descricao = document.getElementById("descricaoAtividade");
  const participantes = document.getElementById("participantesAtividade");
  const lista = document.getElementById("listaAtividades");
  const filtro = document.getElementById("filtro");
  const cadastrarBtn = document.getElementById("cadastrarBtn");

  const modal = document.getElementById("modalConfirmacao");
  const confirmar = document.getElementById("confirmarRemocao");
  const cancelar = document.getElementById("cancelarRemocao");

  const darkModeToggle = document.getElementById("darkModeToggle");
  
  // Buttons for menu navigation
  const menuButtons = document.querySelectorAll(".menu-item");
  const formSection = document.querySelector(".form-section");
  
  // Variable to track the activity to be removed
  let atividadeParaRemover = null;

  // Save activities to localStorage
  function salvarAtividades() {
    const atividades = [];
    document.querySelectorAll('.atividade').forEach(atv => {
      atividades.push({
        nome: atv.querySelector('h3').textContent,
        descricao: atv.querySelector('p:nth-child(2)').textContent,
        participantes: atv.querySelector('p:last-child').textContent
      });
    });
    localStorage.setItem('atividades', JSON.stringify(atividades));
  }

  // Load activities from localStorage
  function carregarAtividades() {
    const atividades = JSON.parse(localStorage.getItem('atividades') || '[]');
    atividades.forEach(atv => {
      adicionarAtividade(atv.nome, atv.descricao, atv.participantes);
    });
  }

  // Add a new activity to the list
  function adicionarAtividade(nomeValor, descricaoValor, participantesValor) {
    // Create activity element
    const div = document.createElement("div");
    div.className = "atividade";
    div.innerHTML = `
      <div class="atividade-info">
        <h3>${nomeValor}</h3>
        <p>${descricaoValor}</p>
        <p><strong>Participantes:</strong> ${participantesValor}</p>
      </div>
      <button class="botao-remover">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    // Append to list and update
    lista.appendChild(div);
    salvarAtividades();
    atualizarRemocao();
  }

  // Register activity button click event
  cadastrarBtn.addEventListener("click", () => {
    // Validate input fields
    if (!nome.value || !descricao.value || !participantes.value) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Add activity
    adicionarAtividade(nome.value, descricao.value, participantes.value);

    // Clear input fields
    nome.value = "";
    descricao.value = "";
    participantes.value = "";
  });

  // Filter activities
  filtro.addEventListener("input", () => {
    const atividades = document.querySelectorAll(".atividade");
    const termo = filtro.value.toLowerCase();

    atividades.forEach(div => {
      const texto = div.innerText.toLowerCase();
      div.style.display = texto.includes(termo) ? "flex" : "none";
    });
  });

  // Update removal buttons
  function atualizarRemocao() {
    const botoes = document.querySelectorAll(".botao-remover");

    botoes.forEach(botao => {
      botao.onclick = () => {
        atividadeParaRemover = botao.closest('.atividade');
        modal.style.display = "flex";
      };
    });
  }

  // Confirm removal
  confirmar.onclick = () => {
    if (atividadeParaRemover) {
      atividadeParaRemover.remove();
      atividadeParaRemover = null;
      modal.style.display = "none";
      salvarAtividades();
    }
  };

  // Cancel removal
  cancelar.onclick = () => {
    modal.style.display = "none";
    atividadeParaRemover = null;
  };

  // Dark mode toggle
  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    // Save theme preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });

  // Load theme preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark');
    darkModeToggle.checked = true;
  }
  
  // Menu navigation
  menuButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      menuButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");
      
      // Handle navigation based on button index
      if (index === 0) { // Nova Atividade
        formSection.style.display = "block";
        filtro.value = ""; // Clear filter
        // Show all activities
        document.querySelectorAll(".atividade").forEach(atv => {
          atv.style.display = "flex";
        });
      } else if (index === 1) { // Todas Atividades
        formSection.style.display = "none";
        filtro.value = ""; // Clear filter
        // Show all activities
        document.querySelectorAll(".atividade").forEach(atv => {
          atv.style.display = "flex";
        });
      }
    });
  });

  // Load saved activities on startup
  carregarAtividades();
});