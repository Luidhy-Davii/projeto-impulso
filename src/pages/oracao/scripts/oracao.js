const FASES_ORACAO = [
    { titulo: "ADORAÇÃO", desc: "Foque em quem Deus é. Exalte Sua soberania.", label: "FASE 1" },
    { titulo: "CONFISSÃO", desc: "Seja honesto. Entregue suas falhas e pecados.", label: "FASE 2" },
    { titulo: "GRATIDÃO", desc: "Lembre-se das bençãos. Agradeça por cada detalhe.", label: "FASE 3" },
    { titulo: "SÚPLICA", desc: "Apresente seus pedidos e interceda por outros.", label: "FASE 4" },
    { titulo: "ESCUTA", desc: "Fique em silêncio. Deixe Deus falar ao seu coração.", label: "FASE 5" }
];

let tempoSelecionado = 5;
let intervalo;

const SalaDeGuerra = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.animarPonto();
    },

    cacheDOM() {
        this.botoesTempo = document.querySelectorAll('.js-botao-tempo');
        this.botaoIniciar = document.querySelector('.js-botao-iniciar');
        this.telaSetup = document.querySelector('.js-tela-setup');
        this.telaOracao = document.querySelector('.js-tela-oracao');
        this.circuloProgresso = document.querySelector('.js-circulo-progresso');
        this.displayCronometro = document.querySelector('.js-cronometro');

        // Elementos da Fase
        this.faseLabel = document.querySelector('.js-fase-label');
        this.faseTitulo = document.querySelector('.js-fase-titulo');
        this.faseDesc = document.querySelector('.js-fase-desc');
    },

    bindEvents() {
        this.botoesTempo.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.botoesTempo.forEach(b => b.classList.remove('ativo'));
                e.target.classList.add('ativo');
                tempoSelecionado = parseInt(e.target.dataset.minutos);
            });
        });

        this.botaoIniciar.addEventListener('click', () => this.iniciarSessao());
    },

    animarPonto() {
        gsap.to(".js-ponto-central", {
            scale: 2,
            opacity: 0.4,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    },

    iniciarSessao() {
        gsap.to(this.telaSetup, {
            opacity: 0, y: -20, duration: 0.5, onComplete: () => {
                this.telaSetup.style.display = 'none';
                this.telaOracao.classList.add('ativa');
                this.contagemRegressiva();
            }
        });
    },

    contagemRegressiva() {
        const totalSegundos = tempoSelecionado * 60;
        let segundosAtuais = 0;
        const duracaoFase = totalSegundos / FASES_ORACAO.length;

        intervalo = setInterval(() => {
            segundosAtuais++;

            // Atualiza Cronômetro
            const restante = totalSegundos - segundosAtuais;
            const min = Math.floor(restante / 60);
            const seg = restante % 60;
            this.displayCronometro.innerText = `${min}:${seg < 10 ? '0' + seg : seg}`;

            // Atualiza Círculo SVG (Stroke-dashoffset de 942 a 0)
            const offset = 942 - (942 * (segundosAtuais / totalSegundos));
            this.circuloProgresso.style.strokeDashoffset = offset;

            // Troca de Fase
            if (segundosAtuais % Math.floor(duracaoFase) === 0 && segundosAtuais < totalSegundos) {
                const proximaFase = Math.floor(segundosAtuais / duracaoFase);
                if (FASES_ORACAO[proximaFase]) {
                    this.atualizarInterfaceFase(FASES_ORACAO[proximaFase]);
                }
            }

            if (segundosAtuais >= totalSegundos) {
                clearInterval(intervalo);
                this.finalizarSessao();
            }
        }, 1000);
    },

    atualizarInterfaceFase(dados) {
        gsap.to(".js-conteudo-fase", {
            opacity: 0, y: 10, duration: 0.5, onComplete: () => {
                this.faseLabel.innerText = dados.label;
                this.faseTitulo.innerText = dados.titulo;
                this.faseDesc.innerText = dados.desc;
                gsap.to(".js-conteudo-fase", { opacity: 1, y: 0, duration: 0.5 });
            }
        });
    },

    finalizarSessao() {
        this.faseTitulo.innerText = "AMÉM";
        this.faseDesc.innerText = "Sessão concluída. Vá em paz.";
        gsap.to(".js-ponto-central", { scale: 5, opacity: 0, duration: 2 });
    }
};

SalaDeGuerra.init();