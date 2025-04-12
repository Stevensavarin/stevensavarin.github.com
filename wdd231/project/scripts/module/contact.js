document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "images/contact-1.webp",
        "images/contact-2.webp",
        "images/contact-3.webp",
        "images/contact-4.webp",
        "images/contact-5.webp",
        "images/aruba-houten-trap-small.webp",
        "images/contact-6.webp",
        "images/contact-7.webp",
    ];

    const rotatingImage = document.getElementById("rotating-image");
    const recentImages = new Set();
    let currentIndex = 0;

    function changeImage() {
        do {
            currentIndex = Math.floor(Math.random() * images.length);
        } while (recentImages.has(currentIndex));

        recentImages.add(currentIndex);
        if (recentImages.size > 5) {
            recentImages.delete([...recentImages][0]);
        }

        rotatingImage.src = images[currentIndex];
        rotatingImage.classList.remove("fade");
        rotatingImage.classList.add("initial");

        void rotatingImage.offsetWidth;

        setTimeout(() => {
            rotatingImage.classList.remove("initial");
            rotatingImage.classList.add("fade");
        }, 30);
    }

    setInterval(changeImage, 3000);
});