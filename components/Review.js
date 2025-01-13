import { Box, Img, Text } from "@chakra-ui/react"


const Review = ({photo, name, words, status}) => {
  return (
    <Box
            w={{md:"30%"}}
            py={{base:"15%", md:"3%"}}
            my={{base:"20%", md:"0"}}
            px="5%"
            borderRadius="30px"
            bg="#FCE31D"
            position="relative"
            pb="1%"
          >
          <Img position="absolute" top={{md:"-15%", base:"-18%"}} left="30%" borderRadius="50%" height="150px" width="150px" objectFit="cover" border="10px solid #FFFFE9" src={photo} alt="user"/>
          <Text textAlign="center" fontWeight="800">{name}</Text>
          <Text textAlign="center" >-{status}</Text>
            <Text fontSize="3rem">"</Text>
            <Text>
            {words}
            </Text>
            <Text fontSize="3rem" float="right">"</Text>
          
          </Box>
  )
}

export default Review