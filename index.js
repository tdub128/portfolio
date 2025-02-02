import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

async function loadLatestProjects() {
    try {
        const projects = await fetchJSON('./projects/lib/projects.json');
        const githubData = await fetchGitHubData('giorgianicolaou');
        const profileStats = document.querySelector('#profile-stats');
        if (profileStats) {
            profileStats.innerHTML = `
                  <dl>
                    <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
                    <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
                    <dt>Followers:</dt><dd>${githubData.followers}</dd>
                    <dt>Following:</dt><dd>${githubData.following}</dd>
                  </dl>
              `;
          }
        if (!projects || projects.length === 0) {
            console.error("No projects found!");
            return;
        }
        const latestProjects = projects.slice(0, 3);
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error("Container '.projects' not found in DOM.");
            return;
        }
        renderProjects(latestProjects, projectsContainer, 'h2');
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Call the function to load projects
loadLatestProjects();
