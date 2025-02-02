// import the fetchJSON and renderProjects functions from global.js file:
import { fetchJSON, renderProjects } from '../global.js';

//Use the fetchJSON function to load the projects.json file
const projects = await fetchJSON('lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h1');

//add a count of projects at the top of the page by using a JavaScript 
// method to select the element with the class projects-title from the DOM and 
// integrate the projects-title class in the <h1> tag of your html file
const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `Projects (${projects.length})`;