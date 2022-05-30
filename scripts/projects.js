// API liken from wordpress//
const API_URL = 'https://www.sherzad.one/wp-json/wp/v2';
const projectsContainer = document.getElementById('project_container');
const stripHtml = string => string.replace(/<\/?[^>]+(>|$)/g, '');

getProjects(API_URL);

async function getProjects(url) {
  try {
    const resp = await fetch(url + '/projects');
    const respData = await resp.json();
    if (respData.length !== 0) {
      showProjects(respData);
      document.querySelector('.loader').classList.add('hide');
    }
  } catch (error) {
    console.log(error);
  }
}

function showProjects(projects) {
  //======= clear project container her =========//
  projectsContainer.innerHTML = '';

  projects.forEach(project => {
    const {id, title, excerpt, x_featured_media} = project;
    const projectEle = document.createElement('div');
    projectEle.classList.add('card');

    projectEle.innerHTML = `
        <img src="${x_featured_media ? x_featured_media : './assets/images/project-placeholder.svg'}" alt="project" />
        <h2 class="card__title">${title.rendered}</h2>
        <p class="card__body">${stripHtml(excerpt.rendered)}</p>
        <a href="./project-detail.html?project_id=${id}">
            <button class="card__btn">Les Mer</button>
        </a>
        `;

    projectsContainer.appendChild(projectEle);
  });
}
