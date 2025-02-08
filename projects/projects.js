// import the fetchJSON and renderProjects functions from global.js file:
import { fetchJSON, renderProjects } from '../global.js';

//Use the fetchJSON function to load the projects.json file
const projects = await fetchJSON('lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h1');
const titleElement = document.querySelector('.projects-title');
if (titleElement) {
    titleElement.textContent = `My Projects (${projects.length})`;
}

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');

function renderPieChart(projectsGiven) {
    // Clear previous chart and legend
    let newSVG = d3.select('svg');
    newSVG.selectAll('path').remove();
    d3.select('.legend').selectAll('li').remove();

    // Re-calculate rolled data
    let newRolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year,
    );

    // Re-calculate data
    let newData = newRolledData.map(([year, count]) => ({
        value: count,
        label: year
    }));

    // If there's no data, do not attempt to render
    if (newData.length === 0) return;

    // Re-calculate slice generator, arc data, arc, etc.
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(newData);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    // Append new paths to the updated <svg>
    arcData.forEach((d, idx) => {
        newSVG.append('path')
            .attr('d', arcGenerator(d))
            .attr('fill', colors(idx));
    });

    // Generate the legend dynamically
    let legend = d3.select('.legend');
    newData.forEach((d, idx) => {
        let legendItem = legend.append('li')
            .attr('class', 'legend-item')
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);

        // Explicitly set swatch color
        legendItem.select('.swatch')
            .style('background-color', colors(idx));
    });
}

// Call this function on page load with the initial data
renderPieChart(projects);

// Event listener for search input
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => { // Change to 'input' for real-time filtering
    let query = event.target.value.toLowerCase();

    // Filter projects based on user input
    let filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query);
    });

    // Re-render the projects list
    renderProjects(filteredProjects, projectsContainer, 'h2');

    // Re-render legends and pie chart with cleaned-up elements
    renderPieChart(filteredProjects);
});

// let selectedIndex = -1;

// let svg = d3.select('svg');
//   svg.selectAll('path').remove();
//   arcs.forEach((arc, i) => {
//     svg
//       .append('path')
//       .attr('d', arc)
//       .attr('fill', colors(i))
//       .on('click', () => {
//         selectedIndex = selectedIndex === i ? -1 : i;
        
//         svg
//         .selectAll('path')
//         .attr('class', (_, idx) => (
//             // Each slice gets a unique class based on its index
//             `pie-slice pie-slice-${idx} ${idx === 0 ? 'active' : ''}`
//         ));
    
//     legend
//         .selectAll('li')
//         .attr('class', (_, idx) => (
//             // Each legend item gets matching classes with its pie slice
//             `legend-item legend-item-${idx} ${idx === 0 ? 'active' : ''}`
//         ));
//       });
      
//   });

