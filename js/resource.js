document.addEventListener('DOMContentLoaded', function() {
    const filterRadios = document.querySelectorAll('input[name="filter"]');
    const searchInput = document.querySelector('.form-control');
    const cards = document.querySelectorAll('.card');

    // Add event listener for filter radios
    filterRadios.forEach(radio => {
        radio.addEventListener('change', filterCards);
    });

    // Add event listener for search input
    searchInput.addEventListener('input', filterCards);

    function filterCards() {
        const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
        const searchQuery = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const cardCategory = card.querySelector('.card-title').innerText.toLowerCase();
            const isVisible = card.style.display !== 'none';

            // Check if card matches filter and search query
            const matchesFilter = selectedFilter === 'all' || cardCategory === selectedFilter;
            const matchesSearch = cardCategory.includes(searchQuery) || cardDate.includes(searchQuery) || cardDescription.includes(searchQuery);

            // Show or hide card based on filter and search
            if (matchesFilter && matchesSearch) {
                if (!isVisible) card.style.display = '';
            } else {
                if (isVisible) card.style.display = 'none';
            }
        });
    }
});



