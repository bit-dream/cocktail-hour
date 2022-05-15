import flask, json
from flask import request
from cocktail_creator import generate_drink_recipe
from spotify_service import Spotify
from api_secrets import client_id, client_secret

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return flask.jsonify('Nothing is here')

@app.route('/craftdrink', methods=['GET'])
def craft_drink():
    keywords = request.args.getlist('search')
    print(f'Raw keysword search: {keywords}')
    # Init spotify class to make calls to spotify api
    spotify = Spotify(client_id,client_secret)

    # Try getting genres from search keywords, assume search keywords are a single phrase
    drink_keywords = spotify.get_genres_from_keywords(keywords[0])
    print(f'Genres found for {keywords}: {drink_keywords}')
    # Did not find genres from spotify, need a fallback
    # in this case we will break up the search string into individual
    # keywords and generate a recipe based on those keywords
    if not drink_keywords:
        if not isinstance(keywords,list):
            drink_keywords = [keywords]
        else:
            drink_keywords = keywords

    for key in keywords[0].split():
        drink_keywords.insert(0, key)
    print(f'Keywords used in drink generation: {drink_keywords}')
    receipe = generate_drink_recipe(drink_keywords)
    print(f'Drink recipe generated:\n {receipe}')

    response = flask.jsonify(receipe)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':

    
    #from waitress import serve
    app.run(host='0.0.0.0', port='5000')
    #serve(app, listen='*:5000')
    #serve(app, host='0.0.0.0', port=5000)
    

