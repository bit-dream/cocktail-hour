from tkinter import S
import spacy
from ingredients import *
from styles import styles
from spotify_service import Spotify
from api_secrets import client_id, client_secret

# Main load from spacy so similarity can be calculated
nlp = spacy.load('en_core_web_md')
spotify = Spotify(client_id,client_secret)

def similarity(item1,item2) -> float:
    return nlp(item1).similarity(nlp(item2))

# Determine which keyword in list has the highest similarity score
def best_choice(keywords: str, choices: dict) -> str:

    choice_ranking = []
    choice_keys = list(choices.keys())
    for choice in choice_keys:
        choice_ranking.append(similarity(keywords,choice))

    max_value = max(choice_ranking)
    idx = choice_ranking.index(max_value)
    key = choice_keys[idx]
    return choices.get(key)

def word_exists(word: str) -> bool:
    return nlp(word) and nlp(word).vector_norm

# Determine style of cocktail to be used by using similarity determined by spacy from input
def style_of_drink(keywords: str) -> str:
    
    return best_choice(keywords,styles)

def drink_complexity(keywords: str) -> bool:
    pass

def craft_drink(keywords: str) -> dict:

    # Initialize drink recipe
    drink = {
        'type': None,
        'glass': None,
        'spirit': None,
        'liqueur': None,
        'sweetener': None,
        'bitter': None,
        'fruit': None,
        'oil': None,
        'spice': None,
        'sour': None,
        'fizz': None,
        'muddle': None,
        'smoke': None,
        'garnish': None,
        'ice': None
    }

    if word_exists(keywords):
        print(f'{keywords} exists in spacy')
        drink_keywords = keywords
    else:
        print(f'{keywords} does not exist in spacy')
        drink_keywords = spotify.get_genres_from_keywords(keywords)[0]

    # Determine style of drink
    style = style_of_drink(drink_keywords)
    drink['type'] = style
    if style == 'blend':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['ice'] = True
    elif style == 'fruit':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
    elif style == 'basic':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['bitter'] = best_choice(drink_keywords,bitters)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['smoke'] = best_choice(drink_keywords,smokes)
    elif style == 'sour':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['sour'] = best_choice(drink_keywords,sours)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['bitter'] = best_choice(drink_keywords,bitters)
    elif style == 'strong':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['liqueur'] = best_choice(drink_keywords,liqueurs)
        drink['bitter'] = best_choice(drink_keywords,bitters)
        drink['oil'] = best_choice(drink_keywords,oils)
        drink['smoke'] = best_choice(drink_keywords,smokes)
    elif style == 'complex':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['liqueur'] = best_choice(drink_keywords,liqueurs)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['bitter'] = best_choice(drink_keywords,bitters)
        drink['oil'] = best_choice(drink_keywords,oils)
        drink['spice'] = best_choice(drink_keywords,spices)
    elif style == 'smash':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['muddle'] = best_choice(drink_keywords,muddlers)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['fruit'] = best_choice(drink_keywords,fruits)
        drink['ice'] = True
    elif style == 'fizz':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['fizz'] = best_choice(drink_keywords,fizzes)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
    elif style == 'neat':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)

    return drink

if __name__ == '__main__':
    print(craft_drink('Crime in Stereo'))