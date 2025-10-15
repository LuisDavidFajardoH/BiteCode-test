import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Home from './pages/Home'
import Ingredientes from './pages/Ingredientes'
import Recetas from './pages/Recetas'
import Compras from './pages/Compras'
import BuscarRecetas from './pages/BuscarRecetas'

function App() {

  return (
    <Router>
      <Box w="100%" minH="100vh" bg="black" position="relative">
        <Box 
          w="100%" 
          bg="rgba(0, 0, 0, 0.9)" 
          borderBottom="2px solid" 
          borderColor="cyan.400"
          px={6} 
          py={4}
          boxShadow="0 0 20px rgba(0, 255, 255, 0.3)"
        >
          <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
            <Heading 
              size="lg" 
              color="cyan.400"
              textShadow="0 0 10px rgba(0, 255, 255, 0.8)"
              fontFamily="monospace"
            >
              RECETARIO DE COCINA
            </Heading>
            <Flex gap={4}>
              <Button 
                as={RouterLink} 
                to="/" 
                variant="ghost" 
                color="cyan.400"
                border="1px solid"
                borderColor="cyan.400"
                _hover={{ 
                  bg: "rgba(0, 255, 255, 0.1)",
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)"
                }}
                fontFamily="monospace"
              >
                INICIO
              </Button>
              <Button 
                as={RouterLink} 
                to="/ingredientes" 
                variant="ghost" 
                color="green.400"
                border="1px solid"
                borderColor="green.400"
                _hover={{ 
                  bg: "rgba(0, 255, 0, 0.1)",
                  boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                }}
                fontFamily="monospace"
              >
                INGREDIENTES
              </Button>
              <Button 
                as={RouterLink} 
                to="/recetas" 
                variant="ghost" 
                color="blue.400"
                border="1px solid"
                borderColor="blue.400"
                _hover={{ 
                  bg: "rgba(0, 100, 255, 0.1)",
                  boxShadow: "0 0 15px rgba(0, 100, 255, 0.5)"
                }}
                fontFamily="monospace"
              >
                RECETAS
              </Button>
              <Button 
                as={RouterLink} 
                to="/buscar-recetas" 
                variant="ghost" 
                color="purple.400"
                border="1px solid"
                borderColor="purple.400"
                _hover={{ 
                  bg: "rgba(128, 0, 255, 0.1)",
                  boxShadow: "0 0 15px rgba(128, 0, 255, 0.5)"
                }}
                fontFamily="monospace"
              >
                BUSCAR
              </Button>
              <Button 
                as={RouterLink} 
                to="/compras" 
                variant="ghost" 
                color="orange.400"
                border="1px solid"
                borderColor="orange.400"
                _hover={{ 
                  bg: "rgba(255, 165, 0, 0.1)",
                  boxShadow: "0 0 15px rgba(255, 165, 0, 0.5)"
                }}
                fontFamily="monospace"
              >
                COMPRAS
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box w="100%" p={6}>
          <Box maxW="1200px" mx="auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/buscar-recetas" element={<BuscarRecetas />} />
              <Route path="/compras" element={<Compras />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  )
}

export default App