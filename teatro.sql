-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-02-2022 a las 21:45:42
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `teatro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso` varchar(250) NOT NULL,
  `id_teatro` int(11) NOT NULL,
  `docentes` varchar(400) NOT NULL,
  `resumen` varchar(1000) NOT NULL,
  `horario` varchar(300) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `clasificacion` varchar(300) NOT NULL,
  `img_id_curso` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `FK_id_teatro` (`id_teatro`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre_curso`, `id_teatro`, `docentes`, `resumen`, `horario`, `fecha_inicio`, `fecha_fin`, `clasificacion`, `img_id_curso`) VALUES
(2, 'Seminario de Acrodúo', 2, 'Artdúo acrobatas', 'Seminario de acrobacia', 'Sábado 30 y domingo 31 de 14 a 17 hs', '2022-03-30', '2022-03-31', 'Acrobacia', 'd13xlimbps740mamdbm8'),
(4, 'Taller Adolescentes', 2, 'Paula Esteve', 'Teatro para adolescentes', 'Lunes de 17 a 19hs', '2022-04-01', '2022-11-30', 'Actuación', 'hc1hsjwhrlmwfcyuwqm3'),
(8, 'Entrenamiento físico y vocal', 2, 'Jerónimo Buffalo', 'Seminario de entrenamiento físico y vocal', '15 a 18 hs', '2022-04-11', '2022-04-18', 'Actuación', 'assfutnkd5tmygpmubxf'),
(9, 'Teatro', 7, 'Cecilia Dondero', 'Clases de teatro para niños adolescentes y adultos', 'según curso', '2022-04-01', '2022-11-30', 'Actuación', 'g3kpf83i6pp8dkzzjx9y'),
(10, 'Juegos Teatrales', 2, 'Juan Carlos Rodriguez', 'Taller de verano de juegos teatrales', 'Martes 20.30 hs', '2022-01-01', '2022-02-28', 'Actuación', 'fhgk5umcqixhosewfjyx'),
(11, 'Praxis', 7, 'Cecilia Dondero', 'Taller de teatro', 'Martes 20hs', '2022-03-01', '2022-11-30', 'Actuación', 'w64czztv2uziw2ptjn8x'),
(12, 'Curso terminado', 4, 'mn', 'jb', 'bj', '2021-04-01', '2021-07-31', 'Actuación', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
CREATE TABLE IF NOT EXISTS `newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

DROP TABLE IF EXISTS `obras`;
CREATE TABLE IF NOT EXISTS `obras` (
  `id_obra` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_obra` varchar(250) NOT NULL,
  `id_teatro` int(11) NOT NULL,
  `elenco` varchar(400) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `resumen` varchar(1000) NOT NULL,
  `horario_funciones` varchar(250) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `clasificacion` varchar(250) NOT NULL,
  `img_id_obra` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_obra`),
  KEY `FK_id_teatro` (`id_teatro`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`id_obra`, `nombre_obra`, `id_teatro`, `elenco`, `direccion`, `resumen`, `horario_funciones`, `fecha_inicio`, `fecha_fin`, `clasificacion`, `img_id_obra`) VALUES
(28, 'Zapa', 2, 'Cecilia Mendez', 'Gustavo Cantalapiedra', 'Resumen de la obra', 'Jueves 21hs', '2022-04-01', '2022-06-30', 'Drama', 'oj7xqamn4xxzpceus4ip'),
(29, 'Suecia', 3, 'Pablo Ramirez y Eliana Bustamante', 'Pedro Artigas', 'Resumen de la obra', 'Sabados 21hs', '2022-02-01', '2022-02-28', 'Comedia', 't6mepfhtnzf1chszknds'),
(30, 'Hamlet Máquina', 2, 'Santiago Pereira', 'Lisandro Arana', 'Unipersonal basado en la obra de William Shakespeare', 'Miercoles 20hs', '2022-04-01', '2022-04-30', 'Drama', 'vip6gll4iexlnydwcoww'),
(31, 'Pandemia y yo', 2, 'Silvina de Urquia y Antonio Monaco', 'Silvina de Urquia y Antonio Monaco', 'Resumen de la obra', 'Sabados 21hs', '2022-05-01', '2022-05-31', 'Drama', 'zkngzxyyptgdedhzhgwr'),
(32, 'Cuando fui puta', 4, 'Amalia Estevez', 'Mario Carneglia', 'Resumen de la obra', 'Viernes 21hs', '2022-01-01', '2022-03-31', 'Comedia', 'ivowbwwn5yk0sje5naaf'),
(33, 'Plutón', 2, 'Juan Peinado y Ricardo Gómez', 'Soledad Villalba', 'Resumen de la obra', 'Viernes 20hs', '2022-06-01', '2022-07-31', 'Drama', 'lccbllplhvn75stomfg5'),
(35, 'Obra 7', 5, 'h', 'h', 'h', 'h', '2022-04-01', '2022-05-31', 'Drama', 'gk2atptknqu7rrax9fxn'),
(36, 'Obra 8', 4, 'k', 'jh', 'jh', 'h', '2022-07-01', '2022-09-30', 'Comedia', 'vtsmhaug7zgokakf6oiu'),
(38, 'Obra terminada', 4, 'k', 'j', 'bh', 'hb', '2021-04-01', '2021-08-31', 'Drama', ''),
(39, 'Nueva Obra', 5, 'as', 'as', 'afs', 'af', '2022-01-01', '2022-03-31', 'Drama', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teatros`
--

DROP TABLE IF EXISTS `teatros`;
CREATE TABLE IF NOT EXISTS `teatros` (
  `id_teatro` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_teatro` varchar(250) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `telefono` varchar(14) DEFAULT NULL,
  `mail` varchar(250) NOT NULL,
  `img_id_teatro` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_teatro`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `teatros`
--

INSERT INTO `teatros` (`id_teatro`, `nombre_teatro`, `direccion`, `telefono`, `mail`, `img_id_teatro`) VALUES
(2, 'El Club del Teatro', 'Rivadavia 3422', '0223 6430302', 'laschicasdelclubdelteatro@gmail.com', 'sjzo3ink1ihhltggcugh'),
(3, 'Cuatro Elementos', 'Alberti 2746', '0223 495-3479', 'espaciocuatroelementos@gmail.com', 'v8uzevomdzn8kpknqvee'),
(4, 'El Galpón de las artes', 'Jujuy 2755', '0223 496-4030', 'teatro@galponartes.com.ar', 'tkrui2qjsiw9qllsxubk'),
(5, 'La Maga', 'Jujuy 1771', '0223 634-2822', 'lamagamdq@gmail.com', 'ge79ptisn6pjpxitpc6t'),
(6, 'CCAVE', 'Alberti 3723', '223-455-5052', 'angelesdepaoli@hotmail.com', 'y5qdjdcqe7voxdizn95n'),
(7, 'América Libre', '20 de septiembre 1719', '', 'ccamericalibre@gmail.com', 'kgfvmqk7xvw60kgjaub8'),
(8, 'El Séptimo Fuego', 'Bolivar 3675', '(223) 495-9572', 'septimofuego@speedy.com.ar', 'brd3yle8ovf0qdjxex2e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `usuario`, `password`) VALUES
(5, 'admin', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`id_teatro`) REFERENCES `teatros` (`id_teatro`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `obras`
--
ALTER TABLE `obras`
  ADD CONSTRAINT `obras_ibfk_1` FOREIGN KEY (`id_teatro`) REFERENCES `teatros` (`id_teatro`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
