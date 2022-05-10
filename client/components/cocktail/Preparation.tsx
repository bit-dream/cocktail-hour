import { Heading, OrderedList, ListItem, Spacer, Center, Checkbox, Divider } from '@chakra-ui/react'

interface Preparation {
    cocktailName: string,
    directions: string[]
}

const Preparation = (props: Preparation) => {

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

    return(
        <div>
            <Heading fontSize='7xl' textAlign={'center'}>{createDrinkName(props.cocktailName)}</Heading>
            <Divider />
            <br/>
            <Heading fontSize='xl'>Preparation</Heading>
            <br/>
            <OrderedList spacing={3}>
                {props.directions.map(direction => <ListItem>{direction}</ListItem>)}
            </OrderedList>
        </div>
    )
}

export default Preparation