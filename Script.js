// Controles globais da página
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar biblioteca de animações ao rolar a página (AOS)
    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Animar apenas uma vez ao rolar para baixo
        offset: 100    // Distância de acionamento
    });

    // Menu Hambúrguer Mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    window.closeMenu = function() {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    };

    // Funcionalidade de Play / Pause para a prévia do card
    const reelItems = document.querySelectorAll('.reel-item');

    reelItems.forEach(item => {
        const video = item.querySelector('video');
        
        if (!item.querySelector('.play-pause-btn')) {
            const btn = document.createElement('div');
            btn.className = 'play-pause-btn';
            btn.innerHTML = '❚❚';
            item.appendChild(btn);
        }

        const btn = item.querySelector('.play-pause-btn');

        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-pause-btn')) {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    btn.innerHTML = '❚❚';
                    item.classList.remove('paused');
                } else {
                    video.pause();
                    btn.innerHTML = '▶';
                    item.classList.add('paused');
                }
            }
        });
    });

    // Criação Dinâmica do Modal de Tela Cheia com Desfoque (Lightbox)
    let modal = document.getElementById('video-modal-lightbox');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-modal-lightbox';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <video id="modal-video-player" controls autoplay playsinline></video>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalVideo = document.getElementById('modal-video-player');
    const closeModalBtn = modal.querySelector('.modal-close');

    reelItems.forEach(item => {
        const videoSource = item.querySelector('video').getAttribute('src');

        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-pause-btn')) return;

            modalVideo.src = videoSource;
            modal.classList.add('active');
            
            modalVideo.onloadedmetadata = function() {
                if (modalVideo.videoWidth > modalVideo.videoHeight) {
                    modalVideo.classList.remove('is-vertical');
                    modalVideo.classList.add('is-horizontal');
                } else {
                    modalVideo.classList.remove('is-horizontal');
                    modalVideo.classList.add('is-vertical');
                }
            };

            modalVideo.play();
        });
    });

    function fecharModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    }

    closeModalBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Envio do Formulário Personalizado para o WhatsApp
    const form = document.getElementById('orcamento-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome-cliente').value;
            const whatsapp = document.getElementById('whatsapp-cliente').value;
            const servico = document.getElementById('servico-cliente').value;
            const mensagemExtra = document.getElementById('mensagem-cliente').value;

            if (!servico) {
                alert('Por favor, escolha um serviço.');
                return;
            }

            const meuNumeroWhatsApp = "5516991353649";

            let textoMensagem = `Olá! Meu nome é *${nome}*.\n`;
            textoMensagem += `Tenho interesse no serviço de: *${servico}*.\n`;
            if (whatsapp) textoMensagem += `WhatsApp: ${whatsapp}\n`;
            if (mensagemExtra) {
                textoMensagem += `\nDetalhes do projeto:\n"${mensagemExtra}"`;
            }

            const urlWhatsApp = `https://wa.me/${meuNumeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});

// Função para abrir e fechar os reels de forma fluida
function toggleReels(categoria) {
    const container = document.getElementById('reels-container');
    const grids = document.querySelectorAll('.reels-grid');
    const targetGrid = document.getElementById('reels-' + categoria);

    const jaEstaAberta = targetGrid.classList.contains('active-grid');

    grids.forEach(grid => grid.classList.remove('active-grid'));

    if (jaEstaAberta) {
        container.classList.remove('active');
    } else {
        targetGrid.classList.add('active-grid');
        container.classList.add('active');
        
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }
}

// Funcionalidade do Acordeon de FAQ
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
});