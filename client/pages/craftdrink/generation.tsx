import ApiResponse from "./interfaces"

/* Generates a list of instructions that can be used to paint the instructions screen */ 
export const generateInstructions = (json: ApiResponse): string[] => {
  
  let instructions: string[] = []

  if (json['fruit'] !== null && json['style'] !== 'blended') {
    instructions.push(`Combine ${json['sweetner']} and ${json['fruit']} in a cocktail shaker`)
    instructions.push('Muddle fruit and sweetener')
  } else if (json['fruit'] !== null && json['style'] === 'blended') {
    instructions.push(`Combine ${json['sweetner']} and ${json['fruit']} in a blender`)
  } else if (json['fruit'] === null) {
    instructions.push(`
    Add ${json['spirit']} and ${json['sweetner']} ${json['liqueur'] ? 'and ' + json['liqueur'] : ''} to a ${json['style'] === 'blended' ? 'blender' : 'cocktail shaker'}
    `)
  }

  instructions.push(`Add a few dashes of ${json['bitter']} bitters`)

  let style = ''
  if (json['style'] === 'blended') {
    instructions.push('Add ice and blend until a smooth consistency is reached')
  } else {
    // Capitialize first letter of style since it is start of sentence
    // Also remove last 2 characters since they are 'en' and 'ed'  shaken and stirred
    const wordStart = json['style'].charAt(0).toUpperCase()
    
    // truncate en if style is shaken and red if style is stirred
    json['style'] === 'shaken' ? 
      style = wordStart + json['style'].slice(1, -1) 
      : 
      style = wordStart + json['style'].slice(1, -2)
  }

  instructions.push(`${style} until chilled and slightly diluted`)
  if (json['fragrance'] !== null && json['fragrance'].includes('smoke')) {
    instructions.push(`Smoke glass with ${json['fragrance']}`)
  }

  instructions.push(`Strain and serve in an ${json['glass']} glass`)
  if (json['topper'] !== null) {
    instructions.push(`Add a splash of ${json['topper']}`)
  }

  if (json['fragrance'] !== null && json['fragrance'].includes('smoke') === false) {
    instructions.push(`Express ${json['fragrance']} over drink for fragrance`)
  }

  if (json['spice'] !== null) {
    instructions.push(`Lightly dust drink with ${json['spice']} for extra aroma if desired`)
  }

  instructions.push(`Garnish with ${json['garnish']}`)
  instructions.push('Enjoy!')

  return instructions
}

export const generateIngredientsList = (ingredients: string[]) => {

  let ingredientsMap = new Map()

  for (const [key, value] of Object.entries(ingredients)) {
    if (key === 'glass' || key === 'fragrance') {
      continue
    } else {
      if (key === 'style' || value === 'blended'){ingredientsMap.set('ice', '1 cup')}
      if (key === 'spirit' && value !== null) {ingredientsMap.set(value, '2 oz')}
      if (key === 'liqueur' && value !== null) {ingredientsMap.set(value, '0.75 oz')}
      if (key === 'sweetner' && value !== null) {ingredientsMap.set(value, '1 oz')}
      if (key === 'spice' && value !== null) {ingredientsMap.set(value, '0.35 g')}
      if (key === 'topper' && value !== null) {ingredientsMap.set(value, '1/5 oz')}
      if (key === 'bitter' && value !== null) {ingredientsMap.set(value + ' bitters', '2 dashes')}
      if (key === 'fruit' && value !== null) {ingredientsMap.set(value , '1')}
      if (key === 'garnish' && value !== null) {ingredientsMap.set(value , '1')}
    }
  }

  return ingredientsMap
}


export const validateReponse = (json: ApiResponse): boolean => {

  let validRes = false;
  for (const [key,value] of Object.entries(json)) {
    if (value !== null) {
      validRes = true
    }
  }
  return validRes;

}