const wikiApiEndpoint = 'https://en.wikipedia.org/w/api.php';
const playerNameInput = document.getElementById('playerName');
const suggestionsBox = document.getElementById('suggestions');
const fetchButton = document.getElementById('fetchButton');
const validationMessage = document.querySelector('.validation');

/**
 * Fetch player suggestions from Wikipedia based on the input query
 */
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

/**
 * Display player suggestions in the suggestions box
 */
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

/**
 * Validate that the player's name is in lowercase letters
 */
function isValidPlayerName(playerName) {
    return /^[a-z\s]+$/.test(playerName);
}

/**
 * Search for the player and redirect to Wikipedia if the name is valid
 */
function searchPlayer() {
    const playerName = playerNameInput.value.trim();
    
    if (!isValidPlayerName(playerName)) {
        validationMessage.style.display = 'block'; // Show validation message
        return;
    }

    validationMessage.style.display = 'none'; // Hide validation message if valid

    if (playerName) {
        const formattedName = playerName.replace(/\s+/g, '_');
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedName}`;
        window.location.href = wikipediaUrl;
    } else {
        alert('Please enter a player name.');
    }
}

/**
 * Event listener for input field to trigger suggestion fetch
 */
playerNameInput.addEventListener('input', function() {
    const input = playerNameInput.value.trim();
    if (input.length > 2) {  
        fetchPlayerSuggestions(input);
    } else {
        suggestionsBox.style.display = 'none';
    }
});

/**
 * Allow searching via Enter key in the input field
 */
playerNameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
});

/**
 * Trigger search when the button is clicked
 */
fetchButton.addEventListener('click', searchPlayer);

/**
 * Close suggestions box if clicked outside
 */
document.addEventListener('click', function(event) {
    if (!suggestionsBox.contains(event.target) && event.target !== playerNameInput) {
        suggestionsBox.style.display = 'none';
    }
});
