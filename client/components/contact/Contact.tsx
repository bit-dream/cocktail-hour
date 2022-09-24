import { EmailIcon } from "@chakra-ui/icons"
import { Button, Input, Spacer, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
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
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event"
import { SetStateAction, useState } from "react"

const Contact = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState('')
    const [subject, setSubject] = useState('')
    const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => setInput(e.target.value)
    const handleSubjectChange = (e: { target: { value: SetStateAction<string> } }) => setSubject(e.target.value)
    const isError = input === ''
    const toast = useToast();

    let [messageValue, setMessageValue] = useState('')

    let handleMessageInputChange = (e: { target: { value: any } }) => {
        let inputValue = e.target.value
        setMessageValue(inputValue)
    }

    const handleSubmit = () => {
        console.log('GOT IT!')

        const data = {
            "address": input,
            "subject": subject,
            "message": messageValue
        };

        fetch(`/v1/api/email/`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.status !== 200) {
                toast({
                    title: 'Bad Email',
                    description: `It looks like email address you submitted was malformed. Please double check your entered email and try again. If the
                    error persists, please feel free to reach out directly to cocktailhour.tk@gmail.com`,
                    status: 'error',
                    duration: null,
                    isClosable: true,
                })
            }
            response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Close modal
        onClose()
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
            to send us a message using the form below.<br /><br />
            <FormControl isInvalid={isError}>
                <FormLabel>Subject</FormLabel>
                <Input
                    type='subject'
                    value={subject}
                    onChange={handleSubjectChange}
                />
                <br />
                <br />
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
            <Button type="submit" onClick={handleSubmit}>Send</Button>
        </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default Contact