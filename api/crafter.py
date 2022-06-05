from tkinter import S
from typing import Union
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
def best_choice(keywords: str, choices: dict, items: int = 1) -> str or list[str]:
    
    choice_ranking = []
    choice_keys = list(choices.keys())
    for choice in choice_keys:
        choice_ranking.append(similarity(keywords,choice))

    if items == 1 or items == 0 or items > len(choice_keys):
        max_value = max(choice_ranking)
        idx = choice_ranking.index(max_value)
        key = choice_keys[idx]
        return choices.get(key)
    else:
        choice_dict = dict(zip(list(choices.values()),choice_ranking))
        # Sort by similarity score
        choice_dict = dict(sorted(choice_dict.items(), key=lambda item: item[1], reverse=True))
        # Return top n items
        return list(choice_dict.keys())[:items]

def drink_has(type: dict, keywords: str , threshold: float = 0.20) -> bool:
    choice_keys = list(type.keys())
    for choice in choice_keys:
        if similarity(keywords,choice) >= threshold:
            return True
    return False

def how_many_items(keywords: str) -> int:
    d = {'simple': 1, 'complex': 2}
    choice_ranking = []
    choice_keys = list(d.keys())
    for choice in choice_keys:
        choice_ranking.append(similarity(keywords,choice))

    max_value = max(choice_ranking)
    idx = choice_ranking.index(max_value)
    key = choice_keys[idx]
    return d.get(key)

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
        'ice': None,
        'foam': None
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
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['fruit'] = best_choice(drink_keywords,fruits, items = how_many_items(drink_keywords))
    elif style == 'basic':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['bitter'] = best_choice(drink_keywords,bitters)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        if drink_has(smokes,drink_keywords):
            drink['smoke'] = best_choice(drink_keywords,smokes)
        if drink_has(ices,drink_keywords):
            drink['ice'] = best_choice(drink_keywords,ices)
    elif style == 'sour':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['sour'] = best_choice(drink_keywords,sours)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        if drink_has(bitters,drink_keywords):
            drink['bitter'] = best_choice(drink_keywords,bitters)
        if drink_has(foams,drink_keywords):
            drink['foam'] = best_choice(drink_keywords,foams)
        if drink_has(ices,drink_keywords):
            drink['ice'] = best_choice(drink_keywords,ices)
    elif style == 'strong':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['liqueur'] = best_choice(drink_keywords,liqueurs, items = how_many_items(drink_keywords))
        drink['bitter'] = best_choice(drink_keywords,bitters, items = how_many_items(drink_keywords))
        drink['oil'] = best_choice(drink_keywords,oils)
        if drink_has(smokes,drink_keywords):
            drink['smoke'] = best_choice(drink_keywords,smokes)
        if drink_has(ices,drink_keywords):
            drink['ice'] = best_choice(drink_keywords,ices)
        if drink_has(garnishes,drink_keywords):
            drink['garnish'] = best_choice(drink_keywords,garnishes)
    elif style == 'complex':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['liqueur'] = best_choice(drink_keywords,liqueurs, items = how_many_items(drink_keywords))
        drink['sweetener'] = best_choice(drink_keywords,sweetners, items = how_many_items(drink_keywords))
        drink['bitter'] = best_choice(drink_keywords,bitters, items = how_many_items(drink_keywords))
        drink['oil'] = best_choice(drink_keywords,oils)
        drink['spice'] = best_choice(drink_keywords,spices)
        drink['garnish'] = best_choice(drink_keywords,garnishes, items = how_many_items(drink_keywords))
        drink['ice'] = best_choice(drink_keywords,ices)
        if drink_has(smokes,drink_keywords):
            drink['smoke'] = best_choice(drink_keywords,smokes)
    elif style == 'smash':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['muddle'] = best_choice(drink_keywords,muddlers)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['fruit'] = best_choice(drink_keywords,fruits)
        drink['ice'] = ices['crush']
    elif style == 'fizz':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        drink['sour'] = best_choice(drink_keywords,sours)
        drink['sweetener'] = best_choice(drink_keywords,sweetners)
        drink['garnish'] = best_choice(drink_keywords,garnishes)
        drink['fizz'] = best_choice(drink_keywords,fizzes)
        if drink_has(bitters,drink_keywords):
            drink['bitter'] = best_choice(drink_keywords,bitters)
        if drink_has(foams,drink_keywords):
            drink['foam'] = best_choice(drink_keywords,foams)
        if drink_has(ices,drink_keywords):
            drink['ice'] = best_choice(drink_keywords,ices)
    elif style == 'neat':
        drink['glass'] = best_choice(drink_keywords,glasses)
        drink['spirit'] = best_choice(drink_keywords,spirits)
        if drink_has(ices,drink_keywords):
            drink['ice'] = best_choice(drink_keywords,ices)

    return drink

if __name__ == '__main__':
    print(craft_drink('Keviny Spacy'))