import { EmailIcon } from "@chakra-ui/icons"
import { Button, Input, Spacer, Textarea, useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { SetStateAction, useState } from "react"

const Contact = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState('')
    const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => setInput(e.target.value)
    const isError = input === ''

    let [messageValue, setMessageValue] = useState('')

    let handleMessageInputChange = (e: { target: { value: any } }) => {
        let inputValue = e.target.value
        setMessageValue(inputValue)
    }
    
    return(
    <>
        <Button 
            size='sm' 
            colorScheme='whiteAlpha'
            leftIcon={<EmailIcon />}
            position={'absolute'}
            right = {19}
            bottom = {3}
            onClick = {onOpen}
            maxW={150}>
              Contact
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Contact Us</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            Have comments, concerns, feedback, or any other questions for us? Feel free
            to send us a message using the form below!<br /><br />
            <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <Input
                    type='email'
                    value={input}
                    onChange={handleInputChange}
                />
                {!isError ? (
                    <FormHelperText>
                    We don&apos;t store your email, we only use it to send your comments to us
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
                <br />
                <FormLabel>Message</FormLabel>
                <Textarea
                    value={messageValue}
                    onChange={handleMessageInputChange}
                    placeholder='Enter your message'
                    size='sm'
                />
            </FormControl>
        </ModalBody>

        <ModalFooter>
            <Button>Send</Button>
        </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default Contact