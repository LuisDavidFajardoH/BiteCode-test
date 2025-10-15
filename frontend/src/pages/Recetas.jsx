import { Box, Heading, Text } from '@chakra-ui/react'

function Recetas() {

  return (
    <Box>
      <Heading 
        size="lg" 
        mb={4} 
        color="blue.400"
        fontFamily="monospace"
        textShadow="0 0 15px rgba(0, 100, 255, 0.8)"
        letterSpacing="2px"
      >
        GESTIONAR RECETAS
      </Heading>
      <Text 
        color="gray.300" 
        fontFamily="monospace"
        fontSize="lg"
        letterSpacing="1px"
      >
        Aquí podrás crear, editar y eliminar recetas con sus ingredientes y cantidades.
      </Text>
    </Box>
  )
}

export default Recetas
