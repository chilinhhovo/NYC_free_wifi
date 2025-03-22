// Store all markers for search functionality
var allMarkers = [];

// Function to add a marker to the searchable markers array
function addSearchableMarker(marker, address) {
    allMarkers.push({
        marker: marker,
        address: address
    });
}

// Initialize search functionality
function initializeSearch() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search for an address...">
        <div id="search-results"></div>
    `;
    document.body.insertBefore(searchContainer, document.body.firstChild);

    // Add search styles
    const style = document.createElement('style');
    style.textContent = `
        #search-container {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            width: 80%;
            max-width: 500px;
        }
        #search-input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        #search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 5px;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
        .search-result-item {
            padding: 8px;
            cursor: pointer;
        }
        .search-result-item:hover {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);

    // Add search event listeners
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const resultsContainer = document.getElementById('search-results');
        
        if (searchTerm.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const results = allMarkers.filter(item => 
            item.address.toLowerCase().includes(searchTerm)
        );

        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(item => 
                `<div class="search-result-item">${item.address}</div>`
            ).join('');
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Handle search result selection
    document.getElementById('search-results').addEventListener('click', function(e) {
        if (e.target.classList.contains('search-result-item')) {
            const selectedAddress = e.target.textContent;
            const selectedMarker = allMarkers.find(item => item.address === selectedAddress);
            
            if (selectedMarker) {
                map_157ab164513b944ff3d21e29e5a3c43b.setView(selectedMarker.marker.getLatLng(), 15);
                document.getElementById('search-input').value = selectedAddress;
                document.getElementById('search-results').style.display = 'none';
            }
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        const searchContainer = document.getElementById('search-container');
        const searchResults = document.getElementById('search-results');
        
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Initialize search when the page loads
window.addEventListener('load', initializeSearch); 