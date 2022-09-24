const createDrinkName = (drinkName: string): string => {
    if (drinkName.split(' ').length === 1) {
      return 'THE ' + drinkName
      // if first word is the or a we need to remove it since drink name starts with The
    } else if (drinkName.split(' ')[0] === 'THE' || drinkName.split(' ')[0] === 'A') {
      return 'THE ' + drinkName.split(' ').slice(1, drinkName.split(' ').length).join(' ')
    } else {
      return 'THE ' + drinkName
    }
}

export default createDrinkName