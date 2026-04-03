  gsap.registerPlugin(ScrollTrigger);

        // --- DADOS DO ROADMAP (ESTRATÉGICO) ---
        const readingPlan = [
            {
                phase: "Fase 1: O Fundamento (Quem é Jesus?)",
                books: [
                    { name: "João", caps: 21 },
                    { name: "Marcos", caps: 16 },
                    { name: "Gálatas", caps: 6 },
                    { name: "Efésios", caps: 6 },
                    { name: "Filipenses", caps: 4 },
                    { name: "Colossenses", caps: 4 }
                ]
            },
            {
                phase: "Fase 2: As Origens (O Início)",
                books: [
                    { name: "Gênesis", caps: 50 },
                    { name: "Êxodo", caps: 40 },
                    { name: "Lucas", caps: 24 },
                    { name: "Atos", caps: 28 },
                    { name: "Romanos", caps: 16 }
                ]
            },
            {
                phase: "Fase 3: A História (Israel)",
                books: [
                    { name: "Josué", caps: 24 },
                    { name: "Juízes", caps: 21 },
                    { name: "Rute", caps: 4 },
                    { name: "1 Samuel", caps: 31 },
                    { name: "2 Samuel", caps: 24 },
                    { name: "1 Reis", caps: 22 },
                    { name: "2 Reis", caps: 25 },
                    { name: "Tiago", caps: 5 }
                ]
            },
            {
                phase: "Fase 4: Sabedoria e Poesia",
                books: [
                    { name: "Provérbios", caps: 31 },
                    { name: "Salmos", caps: 150 },
                    { name: "Eclesiastes", caps: 12 },
                    { name: "Jó", caps: 42 },
                    { name: "Cantares", caps: 8 },
                    { name: "1 Coríntios", caps: 16 }
                ]
            },
            {
                phase: "Fase 5: Profetas e Final",
                books: [
                    { name: "Isaías", caps: 66 },
                    { name: "Jeremias", caps: 52 },
                    { name: "Lamentações", caps: 5 },
                    { name: "Ezequiel", caps: 48 },
                    { name: "Daniel", caps: 12 },
                    { name: "Oséias", caps: 14 },
                    { name: "Joel", caps: 3 },
                    { name: "Amós", caps: 9 },
                    { name: "Obadias", caps: 1 },
                    { name: "Jonas", caps: 4 },
                    { name: "Miquéias", caps: 7 },
                    { name: "Naum", caps: 3 },
                    { name: "Habacuque", caps: 3 },
                    { name: "Sofonias", caps: 3 },
                    { name: "Ageu", caps: 2 },
                    { name: "Zacarias", caps: 14 },
                    { name: "Malaquias", caps: 4 },
                    { name: "1 Pedro", caps: 5 },
                    { name: "2 Pedro", caps: 3 },
                    { name: "1 João", caps: 5 },
                    { name: "2 João", caps: 1 },
                    { name: "3 João", caps: 1 },
                    { name: "Judas", caps: 1 },
                    { name: "Apocalipse", caps: 22 }
                ]
            }
        ];

        window.onload = function() {
            
            // 1. GERAR ROADMAP
            const container = document.getElementById('bible-roadmap');
            let globalIndex = 1;

            readingPlan.forEach(phase => {
                const title = document.createElement('div');
                title.className = 'phase-title';
                title.innerText = phase.phase;
                container.appendChild(title);

                const grid = document.createElement('div');
                grid.className = 'roadmap-grid';

                phase.books.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'book-card';
                    card.innerHTML = `
                        <div class="book-number">${globalIndex < 10 ? '0'+globalIndex : globalIndex}</div>
                        <div>
                            <div class="book-title">${book.name}</div>
                            <div class="book-chapters">${book.caps} caps</div>
                        </div>
                        <div class="status-dot"></div>
                    `;
                    grid.appendChild(card);
                    globalIndex++;
                });
                container.appendChild(grid);
            });

            // 2. Refresh GSAP
            ScrollTrigger.refresh();

            // 3. Animações Padrão
            gsap.to(".progress-bar", {
                width: "100%", ease: "none",
                scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }
            });

            gsap.utils.toArray(".trigger-hl").forEach(text => {
                ScrollTrigger.create({
                    trigger: text, start: "top 80%", onEnter: () => text.classList.add("active")
                });
            });

            gsap.utils.toArray(".step").forEach(step => {
                gsap.to(step, {
                    scrollTrigger: {
                        trigger: step, start: "top 60%", end: "bottom 40%",
                        toggleClass: "active", scrub: 0.5
                    }
                });
            });

            // 4. Animação do Roadmap (BATCH)
            // Define estado inicial
            gsap.set(".book-card", { y: 30, opacity: 0 });
            
            ScrollTrigger.batch(".book-card", {
                start: "top 95%", // Dispara quando quase entra na tela
                onEnter: batch => gsap.to(batch, { 
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.05, 
                    duration: 0.6, 
                    ease: "back.out(1.2)" 
                })
            });

            // Seta
            gsap.to(".ri-arrow-down-line", { y: 10, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" });
        };