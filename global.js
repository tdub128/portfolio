console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// navlinks = $$('nav a');
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
//   );
//     currentLink.classList.add('current');
//     if (currentLink) {
//         // or if (currentLink !== undefined)
//         currentLink?.classList.add('current');
//       }

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/tdub128', title: 'GitHub' }
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);
  
for (let p of pages) {
    let url = p.url
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }
      if (a.host != location.host) {
        a.target = "_blank"
      }
    nav.append(a);

  }

  
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
        Theme:
        <select id="theme-select">
          <option value="light dark">Automatic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    `
  );
  
  const select = document.querySelector('select');

  if ('colorScheme' in localStorage) {
    select.value = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', select.value);
  }

  select.addEventListener('input', function (event) {
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
    console.log('color scheme changed to', event.target.value);
  });

  export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        
        // Parse the response JSON data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
    console.error('Invalid container element');
    return;
  }

  containerElement.innerHTML = '';
  for (let project of projects) {
    const article = document.createElement('article');
    article.innerHTML = `
        <${headingLevel}>${project.title}</${headingLevel}>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
    `;
    containerElement.appendChild(article);
  }
}

// const projects = await fetchJSON('/projects/lib/projects.json')
//Test it by calling the function with different headingLevel values.
// renderProjects(projects, document.querySelector('.projects'), 'h1');
export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/tdub128`);
}