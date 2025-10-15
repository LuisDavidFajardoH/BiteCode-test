import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Home() {
  const features = [
    {
      title: 'Gestionar Ingredientes',
      description: 'Agrega, edita y elimina ingredientes de tu despensa',
      link: '/ingredientes',
      color: 'green'
    },
    {
      title: 'Gestionar Recetas',
      description: 'Crea y modifica recetas con sus ingredientes y cantidades',
      link: '/recetas',
      color: 'blue'
    },
    {
      title: 'Buscar Recetas',
      description: 'Encuentra recetas que puedes preparar con tus ingredientes',
      link: '/buscar-recetas',
      color: 'purple'
    },
    {
      title: 'Gestionar Compras',
      description: 'Registra tus compras de ingredientes',
      link: '/compras',
      color: 'orange'
    }
  ]

  return (
    <Box>
      <Box textAlign="center" mb={10}>
        <Heading 
          size="2xl" 
          mb={4} 
          color="cyan.400"
          textShadow="0 0 20px rgba(0, 255, 255, 0.8)"
          fontFamily="monospace"
          letterSpacing="2px"
        >
          BIENVENIDO AL RECETARIO DE COCINA
        </Heading>
        <Text 
          fontSize="xl" 
          color="gray.300" 
          maxW="600px" 
          mx="auto"
          fontFamily="monospace"
          letterSpacing="1px"
        >
          Organiza tus recetas, gestiona tus ingredientes y descubre qué puedes cocinar
          con lo que tienes en casa.
        </Text>
      </Box>

      <Flex direction="column" gap={6}>
        {features.map((feature, index) => (
          <Box 
            key={index} 
            bg="rgba(0, 0, 0, 0.8)" 
            p={6} 
            borderRadius="md" 
            border="2px solid"
            borderColor={`${feature.color}.400`}
            boxShadow={`0 0 20px rgba(${feature.color === 'green' ? '0, 255, 0' : feature.color === 'blue' ? '0, 100, 255' : feature.color === 'purple' ? '128, 0, 255' : '255, 165, 0'}, 0.3)`}
            _hover={{
              boxShadow: `0 0 30px rgba(${feature.color === 'green' ? '0, 255, 0' : feature.color === 'blue' ? '0, 100, 255' : feature.color === 'purple' ? '128, 0, 255' : '255, 165, 0'}, 0.6)`,
              transform: "translateY(-2px)"
            }}
            transition="all 0.3s ease"
          >
            <Heading 
              size="md" 
              color={`${feature.color}.400`} 
              mb={2}
              fontFamily="monospace"
              textShadow={`0 0 10px rgba(${feature.color === 'green' ? '0, 255, 0' : feature.color === 'blue' ? '0, 100, 255' : feature.color === 'purple' ? '128, 0, 255' : '255, 165, 0'}, 0.8)`}
            >
              {feature.title.toUpperCase()}
            </Heading>
            <Text color="gray.300" mb={4} fontFamily="monospace">
              {feature.description}
            </Text>
            <Button 
              as={RouterLink} 
              to={feature.link} 
              color={`${feature.color}.400`}
              bg="transparent"
              border="1px solid"
              borderColor={`${feature.color}.400`}
              size="sm"
              fontFamily="monospace"
              _hover={{
                bg: `rgba(${feature.color === 'green' ? '0, 255, 0' : feature.color === 'blue' ? '0, 100, 255' : feature.color === 'purple' ? '128, 0, 255' : '255, 165, 0'}, 0.1)`,
                boxShadow: `0 0 15px rgba(${feature.color === 'green' ? '0, 255, 0' : feature.color === 'blue' ? '0, 100, 255' : feature.color === 'purple' ? '128, 0, 255' : '255, 165, 0'}, 0.5)`
              }}
            >
              IR A {feature.title.toUpperCase()}
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default Home
