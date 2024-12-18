let isMouseDown = false;
let startX;
let scrollLeft;
const container = document.querySelector('.scroll-container');
container.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
});
container.addEventListener('mouseleave', () => {
    isMouseDown = false;
    container.style.cursor = 'auto';
});
container.addEventListener('mouseup', () => {
    isMouseDown = false;
    container.style.cursor = 'auto';
});
container.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});