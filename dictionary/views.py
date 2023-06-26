from django.shortcuts import render
from django.http import JsonResponse
import requests,json
from freedictionaryapi.clients.sync_client import DictionaryApiClient

# Dummy function to simulate dictionary search
def perform_search(query):
    # Perform your dictionary search logic here and return the results
    # This is just a sample implementation
    print('In perform search')
    with DictionaryApiClient() as client:
        parser = client.fetch_parser(query)
    word=parser.word
    data={
    }
    print("Word = ",word.word)
    print("Phonetics = ",word.phonetics[0].text)
    data['audio'] = word.phonetics[1].audio
    data['word'] = word.word
    data['phonetics'] = word.phonetics[0].text
    for rows in word.meanings:
        print(rows.part_of_speech.upper() ,":")

        example=str(rows.definitions[0].example) if rows.definitions[0].example is not None  else "N/A"
        synonyms = ",".join(list(map(str, rows.definitions[0].synonyms))) if len(rows.definitions[0].synonyms)>0 else "N/A"
        data[rows.part_of_speech.upper()] = {
            "definition" :  str(rows.definitions[0].definition),
            "example" : example,
            "synonyms" : synonyms      
        }
        #print(dir(rows.definitions[0]))
        print("Defintion : ",rows.definitions[0].definition)
        print("Example : ",example)
        print("Synonyms : ",synonyms)

    print(data)
    return data

def homepage(request):
    data = {
        "title" : "Dictionary App"
    }
    return render(request, 'index.html',data)

def about(request):
    data = {
        "title" : "About this App"
    }
    return render(request, 'about.html',data)
def search(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        query = data.get('query')
        print(query)
        result = perform_search(query)
        return JsonResponse(result)
