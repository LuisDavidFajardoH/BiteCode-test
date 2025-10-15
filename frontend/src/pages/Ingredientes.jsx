import { Box, Heading, Text } from '@chakra-ui/react'

function Ingredientes() {

  return (
    <Box>
      <Heading 
        size="lg" 
        mb={4} 
        color="green.400"
        fontFamily="monospace"
        textShadow="0 0 15px rgba(0, 255, 0, 0.8)"
        letterSpacing="2px"
      >
        GESTIONAR INGREDIENTES
      </Heading>
      <Text 
        color="gray.300" 
        fontFamily="monospace"
        fontSize="lg"
        letterSpacing="1px"
      >
        Aquí podrás agregar, editar y eliminar ingredientes de tu despensa.
      </Text>
    </Box>
  )
}

export default Ingredientes
