import { Box, Heading, Text } from '@chakra-ui/react'

function Compras() {

  return (
    <Box>
      <Heading 
        size="lg" 
        mb={4} 
        color="orange.400"
        fontFamily="monospace"
        textShadow="0 0 15px rgba(255, 165, 0, 0.8)"
        letterSpacing="2px"
      >
        GESTIONAR COMPRAS
      </Heading>
      <Text 
        color="gray.300" 
        fontFamily="monospace"
        fontSize="lg"
        letterSpacing="1px"
      >
        Registra tus compras de ingredientes para llevar un control de tu despensa.
      </Text>
    </Box>
  )
}

export default Compras
