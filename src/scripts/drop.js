// alternar foto da camisa
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll('.toggle-side');
    const shirtImages = document.querySelectorAll('.sw-img');

    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                toggleBtns.forEach(b => b.classList.remove('active'));
                shirtImages.forEach(img => img.classList.remove('active'));

                btn.classList.add('active');

                const targetSide = btn.getAttribute('data-side');
                document.querySelector(`.sw-img.${targetSide}`).classList.add('active');
            });
        });
    }
});
