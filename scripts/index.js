//==============   selecting DOM element   ===============//

//========= initializing Projects swiper slider ==========//
const projectSwiper = new Swiper(".prosjekterSwiper", {
  autoplay: {
    delay: 3000,
  },
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//========== initializing Services swiper slider ========== //
let serviceSwiper =
  window.innerWidth <= 425
    ? new Swiper(".serviceSwiper", {
        autoplay: {
          delay: 4000,
        },
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          //====== bulletActiveClass: ".service__bullet-active ======//
        },
      })
    : new Swiper(".serviceSwiper", {
        autoplay: {
          delay: 4000,
        },
        loop: true,
        slidesPerView: 3,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          //====== bulletActiveClass: ".service__bullet-active ========//
        },
      });
window.addEventListener("resize", (event) => {
  serviceSwiper =
    event.target.innerWidth <= 425
      ? new Swiper(".serviceSwiper", {
          loop: true,
          autoplay: {
            delay: 4000,
          },
          slidesPerView: 1,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
            //==== bulletActiveClass: ".service__bullet-active ========//
          },
        })
      : new Swiper(".serviceSwiper", {
          autoplay: {
            delay: 4000,
          },
          loop: true,
          slidesPerView: 3,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
            //======= bulletActiveClass: ".service__bullet-active ======//
          },
        });
});

const API_URL = "https://www.sherzad.one/wp-json/wp/v2";

const stripHtml = (string) => string.replace(/<\/?[^>]+(>|$)/g, "");

index(API_URL);

async function index(url) {
  try {
    //service  page swiper //
    const serviceSwiperWrapper = document.getElementById(
      "serviceSwiperWrapper"
    );
    const services = await fetch(url + "/service");
    const servicesData = await services.json();

    serviceSwiperWrapper.innerHTML = "";
    const loaders = document.querySelectorAll(".loader");
    loaders.forEach((item) => item.classList.add("hide"));
    servicesData.slice(4).forEach((service) => {
      const { id, title, content, x_featured_media } = service;
      const serviceEle = document.createElement("div");
      serviceEle.classList.add("swiper-slide");

      serviceEle.innerHTML = `
        <a href="./service-detail.html?service_id=${id}" id="service_content">
            <div class="service--card">
                <div class="service--card__image">
                    <img src="${
                      x_featured_media
                        ? x_featured_media
                        : "./assets/images/project-placeholder.svg"
                    }" alt="services" />
                </div>
                <div class="service--card__body">
                    <h2>${stripHtml(title.rendered)}</h2>
                    <p>${stripHtml(content.rendered).substring(1, 115)}</p>
                </div>
            </div>
        </a>
        `;

      serviceSwiperWrapper.appendChild(serviceEle);
    });

    //service swiper //
    const projectSwiperWrapper = document.getElementById(
      "projectSwiperWrapper"
    );
    const projects = await fetch(url + "/projects");
    const projectsData = await projects.json();

    projectSwiperWrapper.innerHTML = "";
    projectsData.forEach((project) => {
      const { id, x_featured_media } = project;
      const projectEle = document.createElement("div");
      projectEle.classList.add("swiper-slide");

      projectEle.innerHTML = `
      <a href="./project-detail.html?project_id=${id}" id="project_content">
        <img src="${x_featured_media ? x_featured_media : './assets/images/project-placeholder.svg'}" alt="slide image" />
       </a> 
        `;

      projectSwiperWrapper.appendChild(projectEle);
    });
  } catch (error) {
    console.log(error);
  }
}
