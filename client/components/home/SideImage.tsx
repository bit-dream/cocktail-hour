import { Image } from '@chakra-ui/react';

const SideImage = () => {
    return(
        <Image
            alt={'Cover Image'}
            objectFit={'cover'}
            src={
              '/fourgentsdrinking.svg'
            }
        />
    )
}

export default SideImage