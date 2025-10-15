import { Box, Heading, Text } from '@chakra-ui/react'

function BuscarRecetas() {

  return (
    <Box>
      <Heading 
        size="lg" 
        mb={4} 
        color="purple.400"
        fontFamily="monospace"
        textShadow="0 0 15px rgba(128, 0, 255, 0.8)"
        letterSpacing="2px"
      >
        BUSCAR RECETAS
      </Heading>
      <Text 
        color="gray.300" 
        fontFamily="monospace"
        fontSize="lg"
        letterSpacing="1px"
      >
        Encuentra recetas que puedes preparar con los ingredientes que tienes disponibles.
      </Text>
    </Box>
  )
}

export default BuscarRecetas
