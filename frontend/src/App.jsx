import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Box, Flex, Heading, Button, useColorModeValue } from '@chakra-ui/react'
import Home from './pages/Home'
import Ingredientes from './pages/Ingredientes'
import Recetas from './pages/Recetas'
import Compras from './pages/Compras'
import BuscarRecetas from './pages/BuscarRecetas'
import './App.css'

function App() {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.400, pink.400)',
    'linear(to-r, purple.600, pink.600)'
  )
  
  const buttonHoverBg = useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')
  const buttonColor = useColorModeValue('white', 'white')

  return (
    <Router>
      <Box minH="100vh" bg="white">
        <Box
          as="nav"
          bgGradient={bgGradient}
          px={6}
          py={4}
          boxShadow="lg"
          position="sticky"
          top={0}
          zIndex={1000}
        >
          <Flex
            maxW="1200px"
            mx="auto"
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap={4}
          >
            <Heading
              as={Link}
              to="/"
              size="lg"
              color="white"
              fontWeight="bold"
              letterSpacing="wide"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              FLAVORFUSION
            </Heading>
            
            <Flex gap={2} flexWrap="wrap">
              <Button
                as={Link}
                to="/"
                variant="ghost"
                color={buttonColor}
                _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                size="md"
              >
                Inicio
              </Button>
              <Button
                as={Link}
                to="/ingredientes"
                variant="ghost"
                color={buttonColor}
                _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                size="md"
              >
                Ingredientes
              </Button>
              <Button
                as={Link}
                to="/recetas"
                variant="ghost"
                color={buttonColor}
                _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                size="md"
              >
                Recetas
              </Button>
              <Button
                as={Link}
                to="/buscar-recetas"
                variant="ghost"
                color={buttonColor}
                _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                size="md"
              >
                Buscar
              </Button>
              <Button
                as={Link}
                to="/compras"
                variant="ghost"
                color={buttonColor}
                _hover={{ bg: buttonHoverBg, transform: 'translateY(-2px)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                size="md"
              >
                Compras
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box as="main" minH="calc(100vh - 80px)">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ingredientes" element={<Ingredientes />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/buscar-recetas" element={<BuscarRecetas />} />
            <Route path="/compras" element={<Compras />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App