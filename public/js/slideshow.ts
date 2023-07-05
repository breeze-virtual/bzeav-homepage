let slideIndex = 0;

function nextSlide(back = false) {
    slideIndex += back ? -1 : 1;

    let i;
    let slides = Array.from(document.getElementsByClassName("slide") as HTMLCollectionOf<HTMLElement>);
    let dots = document.getElementsByClassName("dot");

    if (slideIndex > slides.length) slideIndex = 1
    if (slideIndex < 1) slideIndex = slides.length

    for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
}