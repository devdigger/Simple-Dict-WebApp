from django.shortcuts import render
from django.http import JsonResponse
import requests,json
# Dummy function to simulate dictionary search
def perform_search(query):
    # Perform your dictionary search logic here and return the results
    # This is just a sample implementation
    print('In perform search')
    response = requests.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+query)
    decoded = response.json()
    results = dict(decoded[0])
    
    return results

def homepage(request):
    return render(request, 'index.html')

def search(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        query = data.get('query')
        print(query)
        result = perform_search(query)
        print(result)
        if result:
            response_data = {
                'word': query,
                'definition': result['meanings'][0]['definitions'][0]['definition']
            }
        else:
            response_data = {
                'word': query,
                'definition': 'No definition found for the given word.'
            }
        return JsonResponse(response_data)
