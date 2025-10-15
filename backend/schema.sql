CREATE DATABASE IF NOT EXISTS recetario_cocina;
USE recetario_cocina;

CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Ingredientes (
    id_ingrediente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    unidad_medida VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Recetas (
    id_receta INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    id_categoria INT,
    tiempo_preparacion VARCHAR(50),
    dificultad ENUM('Fácil', 'Medio', 'Difícil') DEFAULT 'Fácil',
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Ingredientes_Recetas (
    id_ingrediente INT,
    id_receta INT,
    cantidad VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_ingrediente, id_receta),
    FOREIGN KEY (id_ingrediente) REFERENCES Ingredientes(id_ingrediente) ON DELETE CASCADE,
    FOREIGN KEY (id_receta) REFERENCES Recetas(id_receta) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Compras (
    id_compra INT PRIMARY KEY AUTO_INCREMENT,
    id_ingrediente INT,
    fecha_compra DATE NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    precio DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_ingrediente) REFERENCES Ingredientes(id_ingrediente) ON DELETE CASCADE
);

INSERT INTO Categorias (nombre) VALUES
('Italiana'),
('Mexicana'),
('Asiática'),
('Ensaladas'),
('Postres'),
('Vegetariana'),
('Carnes'),
('Pescados');

INSERT INTO Ingredientes (nombre, unidad_medida) VALUES
('Tomate', 'kg'),
('Cebolla', 'unidad'),
('Ajo', 'diente'),
('Aceite de oliva', 'ml'),
('Pasta', 'g'),
('Queso parmesano', 'g'),
('Pollo', 'kg'),
('Carne de res', 'kg'),
('Pescado', 'kg'),
('Huevos', 'unidad'),
('Leche', 'ml'),
('Mantequilla', 'g'),
('Sal', 'g'),
('Pimienta', 'g'),
('Papa', 'kg'),
('Zanahoria', 'unidad'),
('Brócoli', 'kg'),
('Espinaca', 'kg'),
('Arroz', 'g'),
('Frijoles', 'g');

INSERT INTO Recetas (nombre, descripcion, id_categoria, tiempo_preparacion, dificultad) VALUES
('Pasta con Salsa de Tomate', 'Deliciosa pasta con salsa casera de tomate y hierbas frescas', 1, '30 min', 'Fácil'),
('Ensalada César', 'Ensalada fresca con aderezo césar casero y crutones', 4, '15 min', 'Fácil'),
('Tacos de Pollo', 'Tacos tradicionales mexicanos con pollo marinado', 2, '45 min', 'Medio'),
('Pollo a la Plancha', 'Pechuga de pollo sazonada y cocinada a la plancha', 7, '25 min', 'Fácil'),
('Salmón al Horno', 'Filete de salmón con hierbas y limón al horno', 8, '20 min', 'Fácil');

INSERT INTO Ingredientes_Recetas (id_ingrediente, id_receta, cantidad) VALUES
(1, 1, 0.5),
(2, 1, 1),
(3, 1, 2),
(4, 1, 30),
(5, 1, 200),
(6, 1, 50),
(14, 1, 5),
(13, 1, 3),
(1, 2, 0.2),
(2, 2, 0.5),
(3, 2, 1),
(4, 2, 20),
(6, 2, 30),
(10, 2, 1),
(7, 3, 0.5),
(2, 3, 1),
(3, 3, 2),
(4, 3, 25),
(13, 3, 3),
(14, 3, 2),
(7, 4, 0.3),
(4, 4, 20),
(13, 4, 2),
(14, 4, 1),
(3, 4, 1),
(9, 5, 0.3),
(4, 5, 15),
(13, 5, 2),
(14, 5, 1);

INSERT INTO Compras (id_ingrediente, fecha_compra, cantidad, precio) VALUES
(1, '2024-01-15', 2, 3.50),
(2, '2024-01-15', 1, 2.00),
(3, '2024-01-14', 0.1, 1.50),
(4, '2024-01-14', 0.5, 4.00),
(5, '2024-01-13', 1, 2.50),
(7, '2024-01-13', 1, 8.00);
