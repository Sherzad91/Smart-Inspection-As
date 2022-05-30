const servicesContainer = document.getElementById('service_container');
const API_URL = 'https://www.sherzad.one/wp-json/wp/v2';

const stripHtml = string => string.replace(/<\/?[^>]+(>|$)/g, '');

getServices(API_URL);

async function getServices(url) {
  try {
    const resp = await fetch(url + '/service');
    const respData = await resp.json();
    if (respData.length !== 0) {
      showServices(respData);
      document.querySelector('.loader').classList.add('hide');
    }
  } catch (error) {
    console.log(error);
  }
}

function showServices(services) {
  //================= clear service container  ================//
  servicesContainer.innerHTML = '';

  services.forEach(service => {
    const {id, title, x_featured_media} = service;

    const serviceEle = document.createElement('div');
    serviceEle.classList.add('services--card');

    serviceEle.innerHTML = `
         <div class="services--card__image">
            <img src="${x_featured_media ? x_featured_media : './assets/images/project-placeholder.svg'}" alt="services" />
          </div>
          <div class="services--card__body">
            <h2>${stripHtml(title.rendered)}</h2>
          </div>
          <a href="./service-detail.html?service_id=${id}" class="see--more">Les Mer</a>


        `;

    servicesContainer.appendChild(serviceEle);
  });
}
