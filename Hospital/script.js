const navItems = document.querySelector("#nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector("#close__nav-btn");

openNavBtn.addEventListener("click", () => {
  navItems.style.display = "flex";
  openNavBtn.style.display = "none";
  closeNavBtn.style.display = "inline-block";
});

const closeNav = () => {
  navItems.style.display = "none";
  openNavBtn.style.display = "inline-block";
  closeNavBtn.style.display = "none";
};
closeNavBtn.addEventListener("click", closeNav);

//slide
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  /*autoplay: {
    delay: 2000, // Mengatur waktu tampilan slide (3 detik)
    disableOnInteraction: false, // Biarkan autoplay berlanjut saat interaksi
  },
  // Menambahkan efek hover untuk menghentikan autoplay
  on: {
    mouseenter: function () {
      swiper.autoplay.stop();
    },
    mouseleave: function () {
      swiper.autoplay.start();
    },
  },*/

  //Responsive Brealpoints
  breakpoints: {
    //width >= 600px
    600: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
