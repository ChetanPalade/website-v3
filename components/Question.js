import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react"


const Question = ({question, answer}) => {
  return (
    <AccordionItem
      border="2px solid black"
      p="1%"
      borderRadius="10px"
      my={{md:"2%", base:"5%"}}
      color="black"
    >
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton _hover={{}}>
              <Box as="span" flex="1" textAlign="left">
                {question}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel textAlign="left" fontSize="1rem">
            {answer}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default Question