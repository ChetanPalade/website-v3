import { Button, Img } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"



const ServiceButton = ({image, person}) => {
  const router = useRouter()
  return (
    <Button
      my="10%"
      className="serviceBtn"
      p={{md:"8% 0", base:"10%"}}
      w={{md:"30%"}}
      borderRadius="20px"
      bg="#FCE31D"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      _hover={{}}
      onClick={()=>router.push(`/${person.toLowerCase()}`)}
    >
      <Img w={{md:"20%",base:"15%"}} src={image} mr={{base:"10%",md:"2%"}} alt="maid" />
      Book a {person}
    </Button>
  )
}

export default ServiceButton