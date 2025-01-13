import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Slider from 'react-slick';

export default function CarouselSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Arrows disabled for mobile screens
    pauseOnHover: true,
  };

  return (
    <Box id="yellowsense" bg="#F5F5F5" py="4">
      <Flex justify="center" mb="4">
        {/* React Slick Carousel */}
        <Box
          px="2"
          py="4"
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
          bg="#FF9918"
        >
          <Slider {...settings}>
            {/* Slide 1 */}
            <Box>
              <img
                src="images/Slider1.png"
                alt="Slide 1"
                style={{
                  width: '100%',
                  height: '300px', // Reduced height for mobile
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 2 */}
            <Box>
              <img
                src="images/Slider2.png"
                alt="Slide 2"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 3 */}
            <Box>
              <img
                src="images/Slider3.png"
                alt="Slide 3"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 4 */}
            <Box>
              <img
                src="images/Slider4.png"
                alt="Slide 4"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 5 */}
            <Box>
              <img
                src="images/Slider5.png"
                alt="Slide 5"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 6 */}
            <Box>
              <img
                src="images/Slider6.png"
                alt="Slide 6"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Slide 7 */}
            <Box>
              <img
                src="images/Slider7.png"
                alt="Slide 7"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
}



// import React from 'react';
// import { Box, Flex, Image } from '@chakra-ui/react';
// import Slider from 'react-slick';

// export default function CarouselSection() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1024, // Desktop and large screens
//         settings: {
//           slidesToShow: 1,
//           dots: true,
//           arrows: true,
//         },
//       },
//       {
//         breakpoint: 768, // Tablets
//         settings: {
//           slidesToShow: 1,
//           dots: true,
//           arrows: false,
//         },
//       },
//       {
//         breakpoint: 480, // Mobile devices
//         settings: {
//           slidesToShow: 1,
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   };

//   return (
//     <Box id="yellowsense" bg="#F5F5F5" py={{ base: '6', md: '8' }}>
//       <Flex justify="center" mb="4">
//           {/* React Slick Carousel */}
//         <Box
//         px={{ base: '6', md: '10' }}
//         py={{ base: '6', md: '6' }}
//         boxShadow="lg"
//         borderRadius="lg"
//         overflow="hidden"
//         bg='#FF9918'
//       >
//           <Slider {...settings}>
//             {/* Slide 1 */}
//             <Box>
//               <img
//                 src="images/Slider1.png"
//                 alt="Slide 1"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
               
//                 }}
//               />
//             </Box>

//             {/* Slide 2 */}
//             <Box>
//               <img
//                 src="images/Slider2.png"
//                 alt="Slide 2"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
                 
//                 }}
//               />
//             </Box>

//             {/* Slide 3 */}
//             <Box>
//               <img
//                 src="images/Slider3.png"
//                 alt="Slide 3"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
                 
//                 }}
//               />
//             </Box>

//             {/* Slide 4 */}
//             <Box>
//               <img
//                 src="images/Slider4.png"
//                 alt="Slide 4"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
           
//                 }}
//               />
//             </Box>
            
//              {/* Slide 5 */}
//              <Box>
//               <img
//                 src="images/Slider5.png"
//                 alt="Slide 5"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//             </Box>

//              {/* Slide 6 */}
//              <Box>
//               <img
//                 src="images/Slider6.png"
//                 alt="Slide 6"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//             </Box>

//              {/* Slide 7 */}
//              <Box>
//               <img
//                 src="images/Slider7.png"
//                 alt="Slide 7"
//                 style={{
//                   width: "100%",
//                   height: "700px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//             </Box>
         
//           </Slider>
//           </Box>
//           </Flex>
//           </Box>
//   );
// }
