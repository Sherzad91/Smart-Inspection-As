const API_URL = 'https://www.sherzad.one/wp-json/wp/v2';

const stripHtml = string => string.replace(/<\/?[^>]+(>|$)/g, '');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {project_id, service_id} = params;

showService();
async function showService() {
  try {
    const resp = await fetch(API_URL + '/service/' + service_id);
    const respData = await resp.json();
    if (respData.length !== 0) {
      
      //===============       change tap title      ================//
      document.title = `Smart Inspection | ${respData.title.rendered}`;
      document.querySelector('.loader').classList.add('hide');
      document.getElementById('service_title').innerHTML = stripHtml(respData.title.rendered);
      document.getElementById('service_detail').innerHTML = '';
      document.getElementById('service_detail').innerHTML = `
        <div class="image--container">
          <a href="#service_id_${respData.id}">
          <img src="${respData.x_featured_media_original}" alt="service detail image" />
          </a>
        </div>

        <p class="content">${stripHtml(respData.content.rendered)}</p>

        <a href="#" class="lightbox" id="service_id_${respData.id}">
            <span style="background-image: url('${respData.x_featured_media_original}')"></span>
        </a>
          `;
    }
  } catch (error) {
    console.log(error);
  }
}
