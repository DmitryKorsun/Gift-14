function createHearts() {
    for (let i = 0; i < 15; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.right = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 2 + "s";
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}
setInterval(createHearts, 500);