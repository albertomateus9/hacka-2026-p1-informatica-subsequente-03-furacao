document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     GERENCIADOR DE EVENTOS (DADOS)
     ========================================================================== */
  const eventDetails = {
    'feira-ciencias': {
      title: 'Feira de Ciências e Tecnologia',
      badge: 'Ciências',
      day: '12',
      month: 'Jun',
      time: '08:00 - 17:00',
      location: 'Quadra e Laboratórios',
      desc: 'Exposição de projetos de inovação tecnológica, robótica, biotecnologia e sustentabilidade desenvolvidos por alunos dos cursos técnicos e médio. O evento reúne pais, professores e profissionais do mercado para avaliar os melhores trabalhos do ano.',
      schedule: [
        { time: '08:00', label: 'Credenciamento e Abertura Oficial' },
        { time: '09:00', label: 'Início das Avaliações dos Projetos pelos Juízes' },
        { time: '12:00', label: 'Intervalo de Almoço' },
        { time: '14:00', label: 'Palestra: "Tecnologia, Sustentabilidade e o Futuro Técnico na Amazônia"' },
        { time: '16:00', label: 'Divulgação dos Resultados e Cerimônia de Premiação' }
      ]
    },
    'gincana-cultural': {
      title: 'Gincana Cultural Furacão',
      badge: 'Cultural',
      day: '26',
      month: 'Jun',
      time: '09:00 - 18:00',
      location: 'Pátio e Auditório',
      desc: 'Um dia repleto de desafios culturais, artísticos e esportivos entre as equipes. Prepare sua torcida e venha participar de competições de dança, perguntas e respostas, arrecadação de alimentos e muito entretenimento escolar.',
      schedule: [
        { time: '09:00', label: 'Apresentação de Abertura e Desfile de Mascotes' },
        { time: '10:30', label: 'Quiz Cultural (Torta na Cara)' },
        { time: '12:30', label: 'Pausa para Almoço' },
        { time: '14:00', label: 'Mostra de Dança e Batalha de Dublagens' },
        { time: '16:30', label: 'Provas Surpresas e Contagem Geral de Pontos' },
        { time: '17:30', label: 'Premiação da Equipe Campeã' }
      ]
    },
    'noite-tec': {
      title: 'Noite Tec Info',
      badge: 'Tecnologia',
      day: '10',
      month: 'Jul',
      time: '18:30 - 22:00',
      location: 'Lab TI & Auditório',
      desc: 'Mostra de projetos integradores do Curso de Informática Subsequente da EETEPA Vilhena Alves. Apresentações de sistemas de software, simulações de redes e palestras com profissionais de destaque na região de Belém.',
      schedule: [
        { time: '18:30', label: 'Mesa Redonda: Mercado de Trabalho para Técnicos de Informática' },
        { time: '19:30', label: 'Demonstrações de Softwares e Projetos nos Labs' },
        { time: '21:00', label: 'Desafio Relâmpago de Programação (Hackathon)' },
        { time: '21:45', label: 'Encerramento e Sorteio de Brindes' }
      ]
    }
  };

  /* ==========================================================================
     GERENCIADOR DE TEMA ESCURO/CLARO
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Obter preferência salva ou usar escuro como padrão
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }

  /* ==========================================================================
     CONTROLE DOS MODAIS GERAIS
     ========================================================================== */
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close-btn');

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    // Verificar se não há outros modais abertos antes de restaurar o scroll do body
    const activeModals = document.querySelectorAll('.modal.active, .lightbox-modal.active');
    if (activeModals.length === 0) {
      document.body.style.overflow = '';
    }
  }

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = btn.closest('.modal') || btn.closest('.lightbox-modal');
      if (modal) closeModal(modal);
    });
  });

  // Fechar clicando fora da caixa do modal
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  /* ==========================================================================
     DETALHAMENTO DE EVENTOS (MODAL)
     ========================================================================== */
  const calendarCards = document.querySelectorAll('.calendar-card');
  const eventDetailModal = document.getElementById('event-detail-modal');

  calendarCards.forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.getAttribute('data-event-id');
      const details = eventDetails[eventId];
      
      if (details) {
        // Preencher o modal
        document.getElementById('modal-event-title').textContent = details.title;
        document.getElementById('modal-event-badge').textContent = details.badge;
        document.getElementById('modal-event-time').textContent = details.time;
        document.getElementById('modal-event-location').textContent = details.location;
        document.getElementById('modal-event-desc').textContent = details.desc;
        
        const dateBadge = document.getElementById('modal-event-date');
        dateBadge.querySelector('.day').textContent = details.day;
        dateBadge.querySelector('.month').textContent = details.month;
        
        // Montar a programação
        const scheduleList = document.getElementById('modal-event-schedule');
        scheduleList.innerHTML = '';
        
        details.schedule.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="schedule-time">${item.time}</span> <span>${item.label}</span>`;
          scheduleList.appendChild(li);
        });
        
        openModal('event-detail-modal');
      }
    });
  });

  /* ==========================================================================
     FILTRO E LIGHTBOX DA GALERIA MURAL
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxFrame = lightboxModal.querySelector('.lightbox-frame');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  // Filtros
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Alternar classe ativa do botão
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden-item');
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgWrapper = item.querySelector('.gallery-img-wrapper');
      const img = imgWrapper.querySelector('img');
      const title = item.querySelector('h4').textContent;
      const desc = item.querySelector('p').textContent;
      
      // Limpar frame do lightbox
      lightboxFrame.innerHTML = '';
      
      if (img) {
        // Clonar imagem para o lightbox
        const imgClone = img.cloneNode(true);
        lightboxFrame.appendChild(imgClone);
      } else {
        // Se usar o placeholder SVG, cloná-lo
        const svgContent = imgWrapper.querySelector('.gallery-svg-art');
        if (svgContent) {
          const svgClone = svgContent.cloneNode(true);
          lightboxFrame.appendChild(svgClone);
        }
      }
      
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      
      // Abrir o lightbox
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Fechar lightbox clicando fora
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target === lightboxFrame) {
      lightboxModal.classList.remove('active');
      const activeModals = document.querySelectorAll('.modal.active, .lightbox-modal.active');
      if (activeModals.length === 0) {
        document.body.style.overflow = '';
      }
    }
  });

  /* ==========================================================================
     GERADOR DE QR CODE E INSCRIÇÃO
     ========================================================================== */
  const registrationForm = document.getElementById('registration-form');

  // Gerar QR Code SVG Fictício determinístico
  function generateMockQRCode(text) {
    const size = 21; // QR code tamanho base grid (versão 1)
    let grid = Array(size).fill().map(() => Array(size).fill(0));
    
    // Inserir padrões de canto de localização (Finder patterns - 7x7)
    const addFinder = (x, y) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            grid[y + i][x + j] = 1;
          }
        }
      }
    };
    
    addFinder(0, 0);       // Superior Esquerdo
    addFinder(14, 0);      // Superior Direito
    addFinder(0, 14);      // Inferior Esquerdo
    
    // Gerar ruído visual determinístico baseado em um hash simples da string de entrada
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Ignorar regiões dos marcadores de canto
        if ((x < 8 && y < 8) || (x > 13 && y < 8) || (x < 8 && y > 13)) {
          continue;
        }
        // Equação matemática pseudo-aleatória determinística
        const val = Math.abs(Math.sin(hash + x * 17.3 + y * 31.7));
        grid[y][x] = val > 0.48 ? 1 : 0;
      }
    }
    
    // Converter a grid para markup SVG
    let paths = '';
    const boxSize = 100 / size;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] === 1) {
          paths += `<rect x="${(x * boxSize).toFixed(2)}" y="${(y * boxSize).toFixed(2)}" width="${boxSize.toFixed(2)}" height="${boxSize.toFixed(2)}" fill="var(--bg-primary)" />`;
        }
      }
    }
    
    return `<svg viewBox="0 0 100 100" style="background: white; padding: 4px; border-radius: 4px;" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
  }

  // Tratador da submissão do formulário
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Elementos dos campos
    const nameInput = document.getElementById('reg-name');
    const contactInput = document.getElementById('reg-contact');
    const eventSelect = document.getElementById('reg-event');
    const roleSelect = document.getElementById('reg-role');
    
    let isValid = true;
    
    // Validação Simples com feedback visual nativo/estilizado
    [nameInput, contactInput, eventSelect, roleSelect].forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (!isValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Gerar Código de Acesso Aleatório
    const ticketCode = 'FUR-' + Math.floor(100000 + Math.random() * 900000);
    
    // Preencher informações no ticket digital
    document.getElementById('ticket-name').textContent = nameInput.value;
    document.getElementById('ticket-event').textContent = eventSelect.value;
    document.getElementById('ticket-category').textContent = roleSelect.value;
    document.getElementById('ticket-code').textContent = ticketCode;
    
    // Gerar e inserir QR Code
    const qrContainer = document.getElementById('ticket-qr-container');
    const qrText = `Credencial: ${ticketCode} | Participante: ${nameInput.value} | Evento: ${eventSelect.value}`;
    qrContainer.innerHTML = generateMockQRCode(qrText);
    
    // Abrir modal do ingresso
    openModal('ticket-modal');
    
    // Limpar o formulário
    registrationForm.reset();
  });
  
});
