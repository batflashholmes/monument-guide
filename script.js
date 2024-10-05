// script.js

// Function to fetch monument details from Wikipedia API
async function fetchMonumentDetails(monumentName) {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(monumentName)}`);

        if (!response.ok) {
            throw new Error('Monument not found');
        }

        const data = await response.json();
        displayMonumentDetails(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Function to display monument details on the webpage
function displayMonumentDetails(data) {
    const detailsDiv = document.getElementById('monumentDetails');
    detailsDiv.innerHTML = `
        <h2>${data.title}</h2>
        ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title} Image">` : ''}
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
    `;
}

// Function to display error messages
function displayError(message) {
    const detailsDiv = document.getElementById('monumentDetails');
    detailsDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', () => {
    const monumentName = document.getElementById('monumentName').value.trim();
    if (monumentName) {
        fetchMonumentDetails(monumentName);
    } else {
        displayError('Please enter a monument name.');
    }
});

// Optional: Add event listener for Enter key
document.getElementById('monumentName').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});
