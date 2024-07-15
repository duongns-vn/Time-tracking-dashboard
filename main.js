document.addEventListener('DOMContentLoaded', () => {
    // URL of the JSON file
    const dataUrl = './data.json';

    // Function to fetch data from the JSON file
    const fetchData = async () => {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) throw new Error('Somthing error'); // If the response is not ok, throw an error
            return await response.json(); // Return the data as JSON
        } catch (error) {
            console.error('Fetch error:', error); // Catch and log any errors
        }
    };

    // Function to display data in the HTML elements
    const displayData = (data, timeframe) => {
        data.forEach(item => {

            // Get the container by transforming the title to match the HTML element id
            const container = document.getElementById(item.title.toLowerCase().replace(' ', '-'));
            if (container) {
                // Update the current and previous timeframes
                container.querySelector('.current').textContent = `${item.timeframes[timeframe].current}hrs`;
                container.querySelector('.previous').textContent = `${item.timeframes[timeframe].previous}hrs`;

                // Update the label for the previous timeframe based on the selected timeframe
                if(timeframe == 'daily') {
                    container.querySelector('.previous-day').textContent = `Last day:`;
                }
                if(timeframe == 'weekly') {
                    container.querySelector('.previous-day').textContent = `Last week:`;
                }
                if(timeframe == 'monthly') {
                    container.querySelector('.previous-day').textContent = `Last month:`;
                }
            }
        });
    };

    // Function to update the active button class
    const updateActiveButton = (activeButton) => {
        document.querySelectorAll('button[data-timeframe]').forEach(button => {
            button.classList.toggle('active', button === activeButton); // Toggle the active class
        });
    };

    // Add event listeners to the buttons to fetch and display data on click
    document.querySelectorAll('button[data-timeframe]').forEach(button => {
        button.addEventListener('click', async () => {
            const data = await fetchData(); // Fetch the data
            displayData(data, button.getAttribute('data-timeframe')); // Display the data for the selected timeframe
            updateActiveButton(button); // Update the active button
        });
    });

    // Initialize the page by displaying the daily data and setting the active button
    const initialize = async () => {
        const data = await fetchData(); // Fetch the data
        displayData(data, 'daily'); // Display the daily data 
        updateActiveButton(document.querySelector('button[data-timeframe="daily"]')); // Set the daily button as active
    };

    // Call the initialize function when the page loads
    initialize()
});