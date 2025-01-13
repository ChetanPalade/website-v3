import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Team from '@/components/Team';
import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const index = () => {
  return (
    <>
      <Header />
      <Flex
        pt={{ base: '15vh', md: '20vh' }}
        id="team"
        alignItems="center"
        direction="column"
        bg="#FFFFE9"
      >
        <Heading
          fontSize={{ md: '2.5rem', base: '1.8rem' }}
          color="#A15942"
          mb={{ md: '2%', base: '5%' }}
          textAlign="center"
        >
          Our Professional Team
        </Heading>
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={{ md: '8%', base: '4%' }}
          p={{ md: '5%', base: '1%' }}
        >
          <Team
            photo="images/Prakhar.webp"
            name="Prakhar Goyal"
            position="Founder & CTO"
            linkedIn="https://www.linkedin.com/in/prakhar-goyal-1744021b/"
          />
          <Team
            photo="images/Shilpi.webp"
            name="Shilpi Gupta"
            position="Co-Founder & CEO"
            linkedIn="https://www.linkedin.com/in/shilpi-gupta-a7548479/"
          />
          <Team
            photo="images/Sravani.webp"
            name="Sravani Vallepu"
            position="Backend Developer"
            linkedIn="https://www.linkedin.com/in/sravani-vallepu-02185024a/"
          />
          <Team
            photo="images/waqi.webp"
            name="Mond Waqi Pervez"
            position="UI/UX & Frontend Developer"
            linkedIn="https://www.linkedin.com/in/mohd-waqi-pervez-52a432291/"
          />
          <Team
            photo="images/Laxman.webp"
            name="Laxman Bhajantri"
            position="App Developer"
            linkedIn="https://www.linkedin.com/in/laxman-bhajantri-b781471a4/"
          />
          <Team
            photo="images/shailee.webp"
            name="Shailee Jaiswal"
            position="UI/UX & Frontend Developer"
            linkedIn="https://www.linkedin.com/in/shailee-jaiswal-445785214/"
          />
          <Team
            photo="images/khushbu.webp"
            name="Khushbu Shukla"
            position="Operations Team member"
            linkedIn="https://www.linkedin.com/"
          />
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default index;
