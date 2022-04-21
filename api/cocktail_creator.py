import spacy
from cocktail import spirits, liqueurs, garnishes, sweetners, bitters, optionals, toppers, spices, fruits, fragrances, glasses
from spotify_service import Spotify
from secrets import client_id, client_secret

nlp = spacy.load('en_core_web_md')

def _should_be_optional_ingredients(genre: str, options: list, threshold=0.15):
    
    option_list = []
    for option in options:
        score = nlp(genre).similarity(nlp(option))
        if score >= threshold:
            option_list.append(option)

    if option_list:
        return option_list
    else:
        return None

def _find_best_ingredient(genres: list, ingredient_list: list):
    
    best = {'ingredient': None, 'score': 0}
    scoring = {}
    for genre in genres:
        sim_arr = []
        scoring[genre] = {}
        scoring[genre]['ingredient'] = []
        scoring[genre]['score'] = []
        i = scoring[genre]['ingredient']
        s = scoring[genre]['score']
        for ingredient in ingredient_list:
            sim_score = nlp(genre).similarity(nlp(ingredient))
            sim_arr.append(sim_score)
            
            i.append(ingredient)
            s.append(sim_score)

        max_idx = _get_max_idx(sim_arr)
        if sim_arr[max_idx] > best['score']:
            best['ingredient'] =  ingredient_list[max_idx]
            best['score'] = sim_arr[max_idx]
        
    return best['ingredient']

def _get_max_idx(arr: list):

    max_value = max(arr)
    idx = arr.index(max_value)
    return idx

def generate_drink_recipe(genres: list) -> dict:

    #TODO handle edget case of list being empty

    # Bare min. for a cocktail should be: spirit, sweetner, bitter, garnish, and how it's served
    spirit = _find_best_ingredient(genres,spirits)
    sweetner = _find_best_ingredient(genres,sweetners)
    bitter = _find_best_ingredient(genres,bitters)
    garnish = _find_best_ingredient(genres,garnishes)
    glass = _find_best_ingredient(genres,glasses)

    # initialize optionals to None 
    liqueur = None
    topper = None
    spice = None
    fruit = None
    fragrance = None

    num_genres = len(genres)

    if num_genres > 1:
        options = _should_be_optional_ingredients(genres[1],optionals)
        optionals_genre = genres[1]
    else:
        options = _should_be_optional_ingredients(genres[0],optionals)
        optionals_genre = genres[0]

    if num_genres > 3:
        liqueur = _find_best_ingredient(genres,liqueurs)

    if options:
        for option in options:
            if option == 'spice':
                spice = _find_best_ingredient(genres,spices)
            elif option == 'fruit':
                fruit = _find_best_ingredient(genres,fruits)
            elif option == 'topper':
                topper = _find_best_ingredient(genres,toppers)
            elif option == 'fragrance':
                fragrance = _find_best_ingredient(genres,fragrances)
    
    return {
        'spirit': spirit,
        'sweetner': sweetner,
        'bitter': bitter,
        'garnish': garnish,
        'glass': glass,
        'liqueur': liqueur,
        'topper': topper,
        'spice': spice,
        'fruit': fruit,
        'fragrance': fragrance
    }


if __name__ == '__main__':

    spotify = Spotify(client_id,client_secret)

    search = 'asdf'
    keywords = spotify.get_genres_from_keywords(search)

    if not keywords:
        keywords = [search]

    receipe = generate_drink_recipe(keywords)
    print(receipe)
