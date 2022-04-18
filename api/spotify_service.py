from secrets import client_id, client_secret
from unittest.util import strclass
import requests as web
from requests.auth import HTTPBasicAuth
from urllib.parse import urlencode
import base64
import datetime
import pprint

def form_endpoint_from_params(base: str, params: list):
    
    query = ''
    for param in params:
        query = query + '/' + param

    return f'{base}{query}'

def authenticate_spotify():
    
    api_token_url = 'https://accounts.spotify.com/api/token'
    client_creds = f'{client_id}:{client_secret}'
    client_creds_b64 = base64.b64encode(client_creds.encode())

    data = {'grant_type': 'client_credentials'}
    headers = {'Authorization': f'Basic {client_creds_b64.decode()}'}
    res = web.post(api_token_url,data=data,headers=headers)
    json_data = res.json()

    return {
        'token': json_data['access_token'], 
        'expires_in': json_data['expires_in'], 
        'token_type': json_data['token_type'],
        'access_time': datetime.datetime.now()
    }
    
def get_genres_by_artist(auth,artist) -> list:

    endpoint = form_endpoint_from_params(uri,['search'])

    token = auth['token']
    headers = {'Authorization': f'Bearer {token}'}

    # Form query parameters by artist
    payload = {'q': artist,'type': 'artist', 'limit': '2'}

    res = web.get(endpoint, headers = headers, params = payload)
    data = res.json()

    genres = data['artists']['items'][0]['genres']

    return genres

def get_genres_by_album(auth,album):

    endpoint = form_endpoint_from_params(uri,['search'])

    token = auth['token']
    headers = {'Authorization': f'Bearer {token}'}

    # Form query parameters by artist
    payload = {'q': album,'type': 'album', 'limit': '1'}

    res = web.get(endpoint, headers = headers, params = payload)
    data = res.json()

    return data

auth = authenticate_spotify()
uri = 'https://api.spotify.com/v1'
data = get_genres_by_artist(auth,'Teengirl Fantasy')

print(data)