import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// animação de scroll 
gsap.utils.toArray(".card, .timeline-item, .vol-card, .cta-box").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        y: 50, opacity: 0, duration: 0.8
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnIgnite = document.getElementById("btnIgnite");
    const glow = document.querySelector(".ignition-glow"); // Mudou para glow
    const message = document.getElementById("ignicao-message");

    if (btnIgnite) {
        btnIgnite.addEventListener("click", () => {
            // 1. O botão dissolve e some
            btnIgnite.classList.add("hidden");
            
            // 2. A luz laranja ambiente se acende
            glow.classList.add("active");

            // 3. A mensagem surge suavemente da fumaça (blur) após 300ms
            setTimeout(() => {
                message.classList.add("show");
            }, 300); 
        });
    }
});