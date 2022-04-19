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


def _find_best_ingredient(genre: str, ingredient_list: list):

    sim_arr = []
    for ingredient in ingredient_list:
        sim_arr.append(nlp(genre).similarity(nlp(ingredient)))
    
    return ingredient_list[_get_max_idx(sim_arr)]

def _get_max_idx(arr: list):

    max_value = max(arr)
    idx = arr.index(max_value)
    return idx

def generate_drink_recipe(genres: list) -> dict:

    #TODO handle edget case of list being empty

    # Bare min. for a cocktail should be: spirit, sweetner, bitter, garnish, and how it's served
    spirit = _find_best_ingredient(genres[0],spirits)
    sweetner = _find_best_ingredient(genres[0],sweetners)
    bitter = _find_best_ingredient(genres[0],bitters)
    garnish = _find_best_ingredient(genres[0],garnishes)
    glass = _find_best_ingredient(genres[0],glasses)

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
        liqueur = _find_best_ingredient(optionals_genre,liqueurs)

    for option in options:
        if option == 'spice':
            spice = _find_best_ingredient(optionals_genre,spices)
        elif option == 'fruit':
            fruit = _find_best_ingredient(optionals_genre,fruits)
        elif option == 'topper':
            topper = _find_best_ingredient(optionals_genre,toppers)
        elif option == 'fragrance':
            fragrance = _find_best_ingredient(optionals_genre,fragrances)
    
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
