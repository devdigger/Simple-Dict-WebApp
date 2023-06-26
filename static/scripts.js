console.log('Starting ...');
        $(document).ready(function() {
            // Bind the click event to the search button
            $('#search-form').submit(function(event) {
                event.preventDefault();
                console.log('Button clicked');
                searchWord();
            });
        });
        document.addEventListener('DOMContentLoaded', function() {
            const storedData = retrieveData();
            if (storedData) {
              // Handle and display the stored data
              displayResult(storedData);
            }
          });   
        function storeData(data) {
            localStorage.setItem('dictionaryData', JSON.stringify(data));
          }
          
          // Retrieve the data from localStorage
          function retrieveData() {
            const storedData = localStorage.getItem('dictionaryData');
            if (storedData) {
              return JSON.parse(storedData);
            } else {
              return null;
            }
          }
        function displayResult(data){

            
            const word = data.word;
            const phonetics = data.phonetics;
            const audio = data.audio;
            // Construct the HTML content for meanings using a loop
            let meaningsHtml = '';
            for (const key in data) {
                if (key !== 'word' && key !== 'phonetics' && key !="audio") {
                    const definition = data[key].definition;
                    const example = data[key].example;
                    const synonyms = data[key].synonyms;

                    meaningsHtml += `
                        <h3>${key}</h3>
                        <p>Definition: ${definition}</p>
                        <p>Example: ${example}</p>
                        <p>Synonyms: ${synonyms}</p>
                    `;
                }
            }
            console.log(audio);
            // Handle the response data
            $('.search-results').html(`
                <h2 class="result-word">${word}</h2>
                <p class="result-phonetics">${phonetics}</p>
                <audio controls><source src="${audio}">
                Your browser does not support the audio element.
                </audio>
                ${meaningsHtml}
            `);
            console.log("NOw going to show button");
            
        }
        function clearResults(){

            const element = document.getElementById("search-results");
            document.getElementById("close-btn").style.display = "none";
            console.log("Going to clear....");
            localStorage.removeItem('dictionaryData');
            element.innerHTML = "";
        }
        function searchWord() {
            // Get the search query from the input field
            const query = $('#search-input').val();

            const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();

            // Show the loading element
            $('.loading').show();

            // Make the Fetch API request
            fetch('/search/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ query: query }),
            })
                .then(response => response.json())
                .then(data => {
                    if (!isDictionaryEmpty(data)){
                        displayResult(data);
                        storeData(data);
                    }
                    else{
                        $('.search-results').html(`
                        <h2 class="result-word">No Word Found</h2>
                        <p class="result-phonetics">Please make sure the word is correctly spelled!</p>
                    `);
                    }
                    document.getElementById("close-btn").style.display = "flex";
                    // Hide the loading element
                    $('.loading').hide();
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                    // Hide the loading element
                    $('.loading').hide();
                });
        }
        function isDictionaryEmpty(obj) {
            return Object.keys(obj).length === 0;
          }
        function toggleDarkMode() {
            const body = document.querySelector('body');
            const container = document.getElementById('header');
            const buttonIcon = container.querySelector('#dark-mode-button');

            const srchresults = body.querySelector('#search-results');
            const aboutresults = body.querySelector('#about-results');
            if(aboutresults != null){
                aboutresults.classList.toggle('about-results-dark');
            }
            
            var toggleIcons = document.getElementsByClassName('toggle-icon');
            for (var i = 0; i < toggleIcons.length; i++) {
                toggleIcons[i].classList.toggle('dark');
            }
            if (srchresults){
                srchresults.classList.toggle('search-results-dark');
            }
            body.classList.toggle('dark-mode');
            buttonIcon.classList.toggle('button-icon-clicked');

            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        }
        function checkDarkMode() {
            const isDarkMode = localStorage.getItem('darkMode');
            if (isDarkMode === 'true') {
                toggleDarkMode();
            }
        }
        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');

            sidebar.classList.toggle('open');
            const navbarToggle = document.querySelector('.navbar-toggle');
            navbarToggle.classList.toggle('open');
        }
        checkDarkMode();
