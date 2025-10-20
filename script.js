document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeBtn = document.querySelector(".close");

    images.forEach(image => {
        image.addEventListener("click", () => {
            lightboxImage.src = image.src;
            lightbox.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImage) {
            lightbox.style.display = "none";
        }
    });
});


