import { Box, VStack, Image, Text, HStack, Flex, Heading } from "@chakra-ui/react";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { RxInstagramLogo } from "react-icons/rx";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/JaihamFarm-cropped-removebg-preview.png'
function Footer() {
  const footerItems = {
    company: [
      { head: 'About Us', link: '#' },
      { head: 'Career', link: '#' },
      { head: 'Blog', link: '#' },
    ],
    support: [
      { head: 'Help Center', link: '#' },
      { head: 'Shipping and Returns', link: '#' },
      { head: 'Contact Us', link: '#' },
    ],
    legal: [
      { head: 'Privacy Policy', link: '#' },
      { head: 'Terms of Service', link: '#' },
      { head: 'Contact Us', link: '#' },
    ],
  };
  
  const socialItems = [
    { icon: SlSocialFacebook, link: '#!' },
    { icon: CiTwitter, link: '#!' },
    { icon: RxInstagramLogo, link: '#!' },
    { icon: SlSocialLinkedin, link: '#!' },
  ]
  return (
<Box bg='gray.200'>
 <Flex py={10} align='center' justify='start' borderBottom="1px solid"
 borderColor="gray.400">
   <Box m={5}>
     <Image src={logo} alt='logo' h='50px' ml={-2} mb={4} />
     <Text w='80%' color='gray.600' fontSize='sm' mb={10}> Connecting Agriculture with technology for a sustainable future.</Text>
     <HStack fontSize='xl' gap={6} mt={5} color='gray.600'>
     {socialItems.map((item) => (
       <Link key={item.link} to={item.link}> <item.icon /></Link>
     ))}
     </HStack>
   </Box>
 
   <Flex w='85%' justify='space-around' align='center'>
     <VStack color='gray.600' fontSize='sm'>
       <Heading color='gray.800' fontSize={'md'}>Company</Heading>
       {footerItems.company.map((item) => (
         <Link key={item.head} to={item.link}>{ item.head}</Link>
       ))}
     </VStack>
     
     <VStack color='gray.600' fontSize='sm'>
       <Heading color='gray.800' fontSize={'md'}>Suppport</Heading>
       {footerItems.support.map((item) => (
         <Link key={item.head} to={item.link} color='gray.600'>{ item.head}</Link>
       ))}
     </VStack>
     
     <VStack color='gray.600' fontSize='sm'>
       <Heading color='gray.800' fontSize={'md'}>Legal</Heading>
       {footerItems.legal.map((item) => (
         <Link key={item.head} to={item.link} color='gray.600'>{ item.head}</Link>
       ))}
     </VStack>
   </Flex>
 </Flex>
 
 <HStack color='gray.600' fontSize='xs' justify='center' py={10}>
   <FaCopyright />
   <Text> 2026 Jaiham Farm. All Rights Reserved</Text>
 </HStack>
 
</Box>
  );
}

export default Footer