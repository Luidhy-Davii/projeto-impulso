import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// louder animado
const tlLoad = gsap.timeline({ onComplete: () => document.body.classList.remove("loading") });
const counter = { val: 0 };

tlLoad.to(counter, {
    val: 100,
    duration: 2,
    onUpdate: () => {
        const el = document.querySelector(".loader-count");
        if (el) el.innerText = Math.floor(counter.val);
    }
})
    .to(".loader-count", { y: -100, opacity: 0, duration: 0.5 })
    .to(".loader-bar", { height: 0, duration: 0.8, stagger: 0.05 }, "-=0.5")
    .from(".hero h1", { y: 100, opacity: 0, duration: 1.5 }, "-=0.6");