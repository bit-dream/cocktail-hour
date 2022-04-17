import flask, json
from flask import request
from cocktail_creator import generate_drink_recipe

app = flask.Flask(__name__)

@app.route('/craftdrink', methods=['GET'])
def craft_drink():
    genres = request.args.getlist('genre')
    
    recipe = generate_drink_recipe(genres)
    return json.dumps(recipe)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')