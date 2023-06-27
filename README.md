# Easydefine - A Quick Dictionary Web App

This is a web application built with Django that allows users to search for word definitions in a dictionary.

## Project Setup

1. Clone the repository:
```
git clone <repository_url>
```
2. Install the required dependencies:
```
pip install django httpx python-freeDictionaryAPI
```
3. Run the Django development server:
```
python manage.py runserver
```
4. Access the web application in your browser at http://localhost:8000.

## How it Works
### Frontend
The frontend of the application is built using HTML, CSS, and JavaScript/jQuery.

- The main page (index.html) consists of a search form with an input field and a search button.
- When the user enters a word and clicks the search button, an AJAX request is sent to the server using the Fetch API to fetch the word definition.
- A loading spinner is displayed while waiting for the response from the server.
- Once the response is received, the definition is displayed on the page dynamically using JavaScript/jQuery.

### Backend
The backend of the application is built with Django.

- The homepage view renders the index.html template as the main page.
- The search view handles the AJAX request sent from the frontend.
- When a POST request is received, the search view extracts the search query from the request data and calls the perform_search function.
- The perform_search function performs a dummy dictionary search (you can replace this with your actual search logic).
- The search results are processed and a JSON response is sent back to the frontend.

### Fetch API
The Fetch API is used to make asynchronous requests from the frontend to the server.

- When the user clicks the search button, the searchWord function is called.
- Inside the searchWord function, a Fetch API request is made to the server's /search/ endpoint.
- The request includes the search query as JSON data and the CSRF token for security.
- Upon receiving the response, the result is displayed on the page using JavaScript/jQuery.

## Credits
- This project uses the Dictionary API for retrieving word definitions. The API is provided by DictionaryAPI.dev.
