import { stringify } from "querystring";
import CocktailData from "./interfaces"

/* Generates a list of instructions that can be used to paint the instructions screen */ 
export const generateInstructions = (data: CocktailData): string[] => {
  
  let instructions: string[] = []

  switch (data['type']) {
    case 'neat':
      if (data['ice'] !== null) {
        instructions.push(`Serve ${data['spirit']} neat in a ${data['glass']} glass`);
      } else {
        instructions.push(`In a ${data['glass']} glass add ${data['ice']}`);
        instructions.push(`Add a generous pour of ${data['spirit']} and serve`);
      }
      break;
    case 'strong':
      instructions.push(`Add ice to a cocktail mixing glass`);
      instructions.push(`Combine ${data['spirit']}, ${data['liqueur']}, and ${data['bitter']}`);
      instructions.push(`Stir ingredients with a cocktail spoon, vigorously, until chilled and slightly diluted`);
      if (data['smoke'] !== null) {
        instructions.push(`Smoke ${data['glass']} glass with ${data['smoke']}`);
      }
      if (data['ice'] !== null) {
        instructions.push(`Add chilled contents to a ${data['glass']} glass with ${data['ice']}`);
      } else {
        instructions.push(`Add contents to a chilled ${data['glass']} glass`);
      }
      instructions.push(`Express ${data['oil']} over the drink and rim`);
      if (data['garnish'] !== null) {
        instructions.push(`Garnish with ${data['garnish']} and serve`)
      }
      break;
    case 'smash':
      instructions.push(`Combine ${data['spirit']}, ${data['sweetener']}, ${data['fruit']}, and ${data['muddle']} to a mixing glass`);
      instructions.push(`Muddle all ingredients together`);
      instructions.push(`Add ingredients to a cocktail shaker with ice and shake well, until chilled`);
      instructions.push(`Strain chilled contents to a ${data['glass']} glass with ${data['ice']}`);
      instructions.push(`Garnish with ${data['garnish']} and serve`);
      break;
    case 'blend':
      instructions.push(`Combine ${data['spirit']}, ${data['sweetener']}, ${data['fruit']} to a blender with enough ice`);
      instructions.push(`Blend all ingredients until a smooth, but icy consistency is reached`);  
      instructions.push(`Garnish with ${data['garnish']} and serve in a ${data['glass']} glass`);
      break;
    case 'basic':
      if (data['smoke'] !== null) {
        instructions.push(`Smoke ${data['glass']} glass with ${data['smoke']} smoke`);
      }
      instructions.push(`Combine ${data['spirit']}, ${data['sweetener']}, and ${data['bitter']} to a cocktail shaker`);
      instructions.push(`Shake ingredients until chilled`);
      instructions.push(`Strain chilled contents to a ${data['glass']} glass`);
      if (data['ice'] !== null) {
      instructions.push(`Add ${data['ice']}`);
      }
      instructions.push(`Garnish with ${data['garnish']} and serve`);
      break;
    case 'sour':
      if (data['bitter'] !== null && data['foam'] === null) {
        instructions.push(`Combine ${data['spirit']}, ${data['sour']} juice, ${data['bitter']}, and ${data['sweetener']} to a cocktail shaker`);
      } else {
        instructions.push(`Combine ${data['spirit']}, ${data['sour']} juice, and ${data['sweetener']} to a cocktail shaker`);
      }
      instructions.push('Shake ingredients until chilled');
      if (data['ice'] !== null) {
        instructions.push(`Strain into a chilled ${data['glass']} glass with ${data['ice']}`);
      } else {
        instructions.push(`Strain into a chilled ${data['glass']} glass`);
      }
      if (data['foam'] !== null) {
        instructions.push(`Dry shake ${data['foam']} or use a frother and top drink with foam`);
        if (data['bitter'] !== null) {
          instructions.push(`Add a few dashs of ${data['bitter']} to foam`)
        }
      }
      instructions.push(`Garnish with ${data['garnish']} and serve`);
      break;
    case 'complex':
      if (data['smoke'] !== null) {
        instructions.push(`Smoke ${data['glass']} glass with ${data['smoke']}`);
      }
      instructions.push(`Combine ${data['spirit']}, ${data['liqueur']}, ${data['sweetener']} and ${data['bitter']} to a cocktail shaker`);
      instructions.push(`Shake ingredients untill chilled and slightly diluted`);
      instructions.push(`Strain and serve in a chilled ${data['glass']} glass with ${data['ice']}`);
      instructions.push(`Express and flame ${data['oil']} over the drink`);
      instructions.push(`Sprinkle a small amount of ${data['spice']} over drink`);
      instructions.push(`Garnish with ${data['garnish']} and serve`);
      break;
    case 'fizz':
      if (data['bitter'] !== null) {
        instructions.push(`Combine ${data['spirit']}, ${data['sour']} juice, ${data['bitter']}, and ${data['sweetener']} to a cocktail shaker`);
      } else {
        instructions.push(`Combine ${data['spirit']}, ${data['sour']} juice, and ${data['sweetener']} to a cocktail shaker`);
      }
      instructions.push('Shake ingredients until chilled and slightly diluted');
      if (data['ice'] !== null) {
        instructions.push(`Strain into a chilled ${data['glass']} glass with ${data['ice']}`);
      } else {
        instructions.push(`Strain into a chilled ${data['glass']} glass`);
      }
      instructions.push(`Top drink with ${data['fizz']}`);
      instructions.push(`Garnish with ${data['garnish']} and serve`);
      break;
  }

  instructions.push('Enjoy!')

  return instructions
}

export const generateIngredientsList = (ingredients: CocktailData) => {

  let ingredientsMap = new Map()

  for (const [key, value] of Object.entries(ingredients)) {
    if (key === 'type' && value === 'blend'){ingredientsMap.set('ice', '1 cup')}
    if (key === 'spirit' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1 part')
        })
      } else {
      ingredientsMap.set(value, '2 part')
      }
    }
    if (key === 'liqueur' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1 part')
        })
      } else {
        ingredientsMap.set(value, '1 part')
      }
    }
    if (key === 'sweetener' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1 part')
        })
      } else {
        ingredientsMap.set(value, '1 part')
      }
    }
    if (key === 'spice' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1 pinch')
        })
      } else {
        ingredientsMap.set(value, '1 pinch')
      }
    }
    if (key === 'fizz' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1/2 part')
        })
      } else {
      ingredientsMap.set(value, '1/2 part')
      }
    }
    if (key === 'bitter' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '1 dash')
        })
      } else {
        ingredientsMap.set(value, '2 dashes')
      }
    }
    if (key === 'fruit' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '-')
        })
      } else {
      ingredientsMap.set(value , '-')
      }
    }
    if (key === 'garnish' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(ingredient => {
          ingredientsMap.set(ingredient, '-')
        })
      } else {
        ingredientsMap.set(value , '-')
      }
    }
    if (key === 'glass' && value !== null) {
      ingredientsMap.set(value , 'glass')
    }
  }

  return ingredientsMap
}


export const validateReponse = (json: CocktailData): boolean => {

  // Check that we actually received an object
  if (typeof(json) !== 'object') return false

  let validRes = false;
  for (const [key,value] of Object.entries(json)) {
    if (value !== null) {
      validRes = true
    }
  }
  return validRes;

}