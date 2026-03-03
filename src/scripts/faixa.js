import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// faixa 
const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
    let direction = -1; // -1 = Vai para a esquerda, 1 = Vai para a direita
    
    // Cria o loop infinito movendo -50% do tamanho total (já que temos 2 blocos iguais)
    const marqueeAnim = gsap.to(marqueeTrack, {
        xPercent: -50,
        repeat: -1,
        duration: 20, // Tempo que demora para dar uma volta completa (diminua para ficar mais rápido)
        ease: "none"
    });

    // faz a faixa reagir à direção do scroll do usuário
    ScrollTrigger.create({
        onUpdate(self) {
            // Se o usuário mudou a direção da rolagem
            if (self.direction !== direction) {
                direction = self.direction;
                
                // Inverte a direção da animação suavemente
                gsap.to(marqueeAnim, { 
                    timeScale: direction, 
                    overwrite: true,
                    duration: 0.5 // Tempo macio da inversão de direção
                });
            }
        }
    });
}