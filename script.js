document.getElementById('fetchButton').addEventListener('click', searchPlayer);
document.getElementById('playerName').addEventListener('keypress', function(event) {

const wikiApiEndpoint = 'https://en.wikipedia.org/w/api.php';
const playerNameInput = document.getElementById('playerName');
const suggestionsBox = document.getElementById('suggestions');
const fetchButton = document.getElementById('fetchButton');

function fetchPlayerSuggestions(query) {
    const url = `${wikiApiEndpoint}?action=query&list=search&srsearch=${query}+footballer|soccer+player&format=json&origin=*`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data.query.search);
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
        });
}


function displaySuggestions(players) {
    suggestionsBox.innerHTML = ''; 
    if (players.length > 0) {
        suggestionsBox.style.display = 'block';
        players.forEach(player => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = player.title;  
            suggestionItem.addEventListener('click', function() {
                playerNameInput.value = player.title; 
                suggestionsBox.style.display = 'none'; 
            });
            suggestionsBox.appendChild(suggestionItem);
        });
    } else {
        suggestionsBox.style.display = 'none';  
    }
}

playerNameInput.addEventListener('input', function() {
    const input = playerNameInput.value.trim();
    if (input.length > 2) {  
        fetchPlayerSuggestions(input);
    } else {
        suggestionsBox.style.display = 'none';
    }
});

playerNameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
});

function searchPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    const playerName = playerNameInput.value.trim();

    if (playerName) {
        // Replace spaces with underscores for Wikipedia URLs
        const formattedName = playerName.replace(/\s+/g, '_');
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedName}`;

        // Redirect to Wikipedia page

        window.location.href = wikipediaUrl;
    } else {
        alert('Please enter a player name.');
    }
}

fetchButton.addEventListener('click', searchPlayer);

document.addEventListener('click', function(event) {
    if (!suggestionsBox.contains(event.target) && event.target !== playerNameInput) {
        suggestionsBox.style.display = 'none';
    }
});
