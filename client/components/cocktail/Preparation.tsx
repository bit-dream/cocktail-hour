import { Heading, OrderedList, ListItem, Spacer, Center, Checkbox, Divider } from '@chakra-ui/react'
import createDrinkName from './createDrinkName'

interface Preparation {
    cocktailName: string,
    directions: string[]
}

const Preparation = (props: Preparation) => {

    return(
        <div>
            <Heading fontSize='7xl' textAlign={'center'}>{createDrinkName(props.cocktailName)}</Heading>
            <Divider />
            <br/>
            <Heading fontSize='xl'>Preparation</Heading>
            <br/>
            <OrderedList spacing={3}>
                {props.directions.map((direction, index) => <ListItem key={index}>{direction}</ListItem>)}
            </OrderedList>
        </div>
    )
}

export default Preparation