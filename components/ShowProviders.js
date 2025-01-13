import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"


const ShowProviders = ({name, time, service , requirement}) => {
    useEffect(() => {
      setImage(`/images/${JSON.parse(localStorage.getItem("user")).service.toLowerCase()}sug.webp`)
    }, [])
    
    const [image, setImage] = useState("")
  return (
    <Flex bg="white" my={{md:"3%", base:"5%"}} p={{md:"2%", base:"5%"}} borderRadius={{md:"100px", base:"70px"}} textAlign="center" flexDirection={{md:"row", base:"column"}}>
                <Img w={{md:"40%", base:"60%"}} m="auto" src={image} alt="service" />
                <Box w={{md:"60%"}}>
                    <Heading mb="2%" fontSize="1.5rem">{name}</Heading>
                    <Flex justifyContent="space-around">
                    <Box>
                        <Text fontWeight="700" color="#A15942">Timings :</Text>
                        {time.map((slot, index)=><Text key={index} fontWeight="700">{slot}</Text>)}
                    </Box>
                    <Box>
                        <Text fontWeight="700" color="#A15942">Services :</Text>
                        {service.map((work, index)=><Text key={index} fontWeight="700">{work}</Text>)}
                    </Box>        
                    </Flex>
                </Box>
            </Flex>
  )
}

export default ShowProviders