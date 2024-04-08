document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const searchInput = document.getElementById('search').value.trim();
  
      if (searchInput === '') {
        alert('Please enter a username.');
        return;
      }
  
      try {
        // Fetch user data from GitHub User Search Endpoint
        const response = await fetch(`https://api.github.com/search/users?q=${searchInput}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
  
        const userData = await response.json();
        displayUsers(userData.items);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });
  
    // Function to display user search results
    function displayUsers(users) {
      userList.innerHTML = ''; // Clear previous search results
  
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.login;
        li.classList.add('user-item');
  
        li.addEventListener('click', () => {
          fetchUserRepos(user.login);
        });
  
        userList.appendChild(li);
      });
    }
  
    // Function to fetch and display user repositories
    async function fetchUserRepos(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user repositories.');
        }
  
        const reposData = await response.json();
        displayRepos(reposData);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  
    // Function to display user repositories
    function displayRepos(repos) {
      repoList.innerHTML = ''; // Clear previous repository list
  
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        repoList.appendChild(li);
      });
    }
  });
  