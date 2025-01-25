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