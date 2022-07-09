-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-07-2022 a las 10:30:02
-- Versión del servidor: 10.3.35-MariaDB
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `desacl_app-contigo`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`desacl`@`localhost` PROCEDURE `GET_DOCTOR_TRAMOS` (IN `doctor_id` INT(11), IN `dia` INT(11))  NO SQL
BEGIN

SELECT 
hr_doc.horario_doctor_id,
hr_doc.doctor_id,
hr_doc.hora_fin,
hr_doc.hora_inicio,
hr_doc.dia,
hr_doc.hora_dia_doctor,
hr_doc.fecha_creacion,

hr_tram_doc.horario_tramo_doctor_id,
TIME_FORMAT (hr_tram_doc.hora_inicio,'%h:%i') AS 'Hora_Inicio',
TIME_FORMAT (hr_tram_doc.hora_fin, '%h:%i') AS 'Hora_Fin',
hr_tram_doc.horario_doctor_id


FROM horario_doctor AS hr_doc

JOIN horario_tramo_doctor AS hr_tram_doc
ON hr_doc.horario_doctor_id = hr_tram_doc.horario_doctor_id

WHERE hr_doc.doctor_id = doctor_id
AND hr_doc.dia = dia 
AND hr_doc.horario_doctor_id = hr_tram_doc.horario_doctor_id;

END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_DATOS_HIJOS` (IN `rut_hijo` VARCHAR(10))  NO SQL
BEGIN
SELECT h.nombre,h.apellido,h.rut,h.fecha_nac,h.peso,h.estatura,h.alergico,t.nombre AS sexo FROM hijos as h JOIN tipo_sexo AS t on h.tipo_sexo_id = t.id
WHERE rut = rut_hijo;

END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_GET_DOCTOR_TIPO_CITA` (IN `tipo_cita` INT(50))  NO SQL
BEGIN
SELECT * FROM registro_doctores AS rg_doc JOIN tipo_cita AS tp_c ON rg_doc.tipo_cita_id = tp_c.id 
WHERE rg_doc.tipo_cita_id = tp_c.id 
AND tp_c.id = tipo_cita;
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_GET_DOCTOR_TRAMOS` (IN `doctor_id` INT(10), IN `dia` TIMESTAMP(6))  NO SQL
BEGIN
SELECT * FROM horario_doctor AS hdoc
WHERE hdoc.doctor_id = doctor_id
AND hdoc.dia = dia;

END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_HORAS_MEDICAS_TOTALES_PACIENTES` (IN `padre_rut_id` VARCHAR(10))  NO SQL
BEGIN

SELECT hr_pac.hijo_id AS Rut,  concat_ws (' ',hijos.nombre , hijos.apellido) AS 'Nombre_Paciente', hr_pac.fecha, TIME_FORMAT(hr_tr_doc.hora_inicio,'%h:%i') AS 'Hora_Cita_Medica', concat_ws (' ', rgt_doc.nombre , rgt_doc.apellido) AS'Doctor', tipo_cita.nombre AS 'Especialidad'

FROM hijos

JOIN horario_paciente AS hr_pac 
    ON hijos.rut = hr_pac.hijo_id

JOIN horario_tramo_doctor AS hr_tr_doc 
    ON hr_pac.horario_tramo_doctor_id = hr_tr_doc.horario_tramo_doctor_id

JOIN horario_doctor AS hr_doc 
    ON hr_tr_doc.horario_doctor_id = hr_doc.horario_doctor_id

JOIN registro_doctores AS rgt_doc
    ON hr_doc.doctor_id = rgt_doc.doctor_id

JOIN tipo_cita
    ON rgt_doc.tipo_cita_id = tipo_cita.id

WHERE hijos.padre_id = padre_rut_id;
    
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_MODIFICAR_CELULAR` (IN `celular` VARCHAR(9), IN `nuevoCelular` VARCHAR(9))  NO SQL
BEGIN
UPDATE registro_tutor
SET movil = nuevoCelular
WHERE movil = celular;
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_MODIFICAR_CONTRASENA` (IN `rut` VARCHAR(10), IN `contrasenas` VARCHAR(50), IN `nuevaContrasenas` VARCHAR(50))  BEGIN
UPDATE registro_tutor
SET contrasena = nuevaContrasenas
WHERE contrasena = contrasenas and cedula = rut;
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_MODIFICAR_CORREO` (IN `email` VARCHAR(50), IN `nuevoEmail` VARCHAR(50))  NO SQL
BEGIN
UPDATE registro_tutor
SET correo = nuevoEmail
WHERE correo = email;

END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_OBTENER_DATOS_PADRES` (IN `rut` VARCHAR(10))  NO SQL
BEGIN
SELECT nombre, apellido, correo, movil FROM registro_tutor
WHERE cedula=rut;
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_OBTENER_DOCTOR_FECHA_TRAMO` (IN `fecha` DATE)  NO SQL
BEGIN

SELECT 
hr_paci.horario_paciente_id, 
hr_paci.hijo_id, 
hr_paci.horario_tramo_doctor_id, 
hr_paci.fecha,

hr_tra_doc.horario_tramo_doctor_id, 
TIME_FORMAT (hr_tra_doc.hora_inicio,'%h:%i') AS 'Hora Inicio',
TIME_FORMAT (hr_tra_doc.hora_fin, '%h:%i') AS 'Hora Fin',
hr_tra_doc.horario_doctor_id

FROM horario_paciente AS hr_paci

JOIN  horario_tramo_doctor AS hr_tra_doc 
ON hr_paci.horario_tramo_doctor_id = hr_tra_doc.horario_tramo_doctor_id

WHERE  hr_paci.fecha = fecha 
AND hr_tra_doc.horario_tramo_doctor_id = hr_paci.horario_tramo_doctor_id;

END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_OBTENER_FICHA_MEDICA_HIJO` (IN `rut_hijo` VARCHAR(10))  NO SQL
BEGIN
SELECT fch.rut, fch.nombre, fch.apellido, fch.fecha_cita ,fch.motivo ,fch.des_diagnostico, fch.receta, doc.nombre, doc.apellido as Doctor
FROM ficha as fch 
JOIN registro_doctores as doc ON fch.doctor_id = doc.doctor_id 
WHERE rut = rut_hijo;
END$$

CREATE DEFINER=`desacl`@`localhost` PROCEDURE `SP_VALIDACION_USUARIO` (IN `rut` VARCHAR(10), IN `pass` VARCHAR(50))  BEGIN
SELECT cedula, contrasena,movil FROM registro_tutor
WHERE contrasena=pass and cedula=rut;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha`
--

CREATE TABLE `ficha` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_sexo_id` int(11) NOT NULL,
  `rut` varchar(50) NOT NULL,
  `fecha_nac` varchar(50) NOT NULL,
  `fecha_cita` varchar(50) NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `des_diagnostico` varchar(50) NOT NULL,
  `receta` varchar(100) NOT NULL,
  `doctor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ficha`
--

INSERT INTO `ficha` (`id`, `nombre`, `apellido`, `tipo_sexo_id`, `rut`, `fecha_nac`, `fecha_cita`, `motivo`, `des_diagnostico`, `receta`, `doctor_id`) VALUES
(4, 'Pablo ', 'Tapia Cardenas', 2, '166864917', '09/07/2021', '09/07/2022', 'Fiebre alta', 'Resfrio Comun', 'Paracetamol en gotas', 2),
(5, 'Sebastian', 'Tapia Cardenas', 2, '202020231', '25/06/2020', '09/07/2022', 'Dolor de Oidos', 'Otitis Leve', 'Gotitas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hijos`
--

CREATE TABLE `hijos` (
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_sexo_id` int(11) NOT NULL,
  `rut` varchar(50) NOT NULL,
  `fecha_nac` varchar(50) NOT NULL,
  `alergico` varchar(30) NOT NULL,
  `peso` varchar(50) NOT NULL,
  `estatura` varchar(50) NOT NULL,
  `padre_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='creacion de ficha';

--
-- Volcado de datos para la tabla `hijos`
--

INSERT INTO `hijos` (`nombre`, `apellido`, `tipo_sexo_id`, `rut`, `fecha_nac`, `alergico`, `peso`, `estatura`, `padre_id`) VALUES
('Pablo', 'Tapia Cardenas', 2, '166864917', '09/07/2021', 'Platano Oriental', '40', '80', '188419097'),
('Sebastián', 'Tapia Cardenas', 2, '202020231', '25/06/2020', 'Dipirona', '7,8', '72,3', '188419097');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_doctor`
--

CREATE TABLE `horario_doctor` (
  `horario_doctor_id` int(10) UNSIGNED NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `hora_fin` int(11) NOT NULL,
  `hora_inicio` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `hora_dia_doctor` varchar(50) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=Aria DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horario_doctor`
--

INSERT INTO `horario_doctor` (`horario_doctor_id`, `doctor_id`, `hora_fin`, `hora_inicio`, `dia`, `hora_dia_doctor`, `fecha_creacion`) VALUES
(1, 2, 1700, 800, 1, '2_1', '2022-07-08 13:22:30'),
(2, 2, 1700, 800, 2, '2_2', '2022-07-08 13:22:34'),
(3, 1, 1700, 800, 1, '1_1', '2022-07-09 08:20:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_paciente`
--

CREATE TABLE `horario_paciente` (
  `horario_paciente_id` int(10) UNSIGNED NOT NULL,
  `hijo_id` varchar(11) NOT NULL,
  `horario_tramo_doctor_id` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horario_paciente`
--

INSERT INTO `horario_paciente` (`horario_paciente_id`, `hijo_id`, `horario_tramo_doctor_id`, `fecha`) VALUES
(35, '166864917', 6, '2022-07-11'),
(36, '166864917', 1, '2022-07-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_tramo_doctor`
--

CREATE TABLE `horario_tramo_doctor` (
  `horario_tramo_doctor_id` int(10) UNSIGNED NOT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `horario_doctor_id` int(11) NOT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horario_tramo_doctor`
--

INSERT INTO `horario_tramo_doctor` (`horario_tramo_doctor_id`, `hora_inicio`, `hora_fin`, `horario_doctor_id`) VALUES
(1, '08:00:00.000000', '08:30:00.000000', 1),
(2, '08:30:00.000000', '09:00:00.000000', 1),
(3, '09:00:00.000000', '09:30:00.000000', 1),
(4, '09:30:00.000000', '10:00:00.000000', 1),
(6, '10:00:00.000000', '10:30:00.000000', 1),
(7, '12:00:00.000000', '12:30:00.000000', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inicio_admi`
--

CREATE TABLE `inicio_admi` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inicio_admi`
--

INSERT INTO `inicio_admi` (`id`, `usuario`, `contraseña`) VALUES
(1, 'administrador@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inicio_asistente`
--

CREATE TABLE `inicio_asistente` (
  `id` int(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inicio_asistente`
--

INSERT INTO `inicio_asistente` (`id`, `usuario`, `contraseña`) VALUES
(1, 'usuario@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_citas`
--

CREATE TABLE `ordenes_citas` (
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `movil` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `fecha_cita` varchar(50) NOT NULL,
  `horario` varchar(50) NOT NULL,
  `jornada` varchar(50) NOT NULL,
  `tipo_cita_id` int(50) NOT NULL,
  `sexo` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ordenes_citas`
--

INSERT INTO `ordenes_citas` (`nombre`, `apellido`, `cedula`, `movil`, `correo`, `fecha_cita`, `horario`, `jornada`, `tipo_cita_id`, `sexo`) VALUES
('Pedro', 'Bedoya', '1192468426', '3219461644', 'Pedro321@gmail.com', '30-10-2020', '16:00', 'AM', 5, 'Masculino'),
('Mario', 'Fino', '1194623648', '321948633', 'Mario@gmail.com', '25-10-2024', '10:00', 'PM', 2, 'Masculino'),
('Manuel', 'Salazar', '1234563', '315678954', 'Manuel@gmail.com', '28-10-2020', '09:30', 'AM', 1, 'Masculino'),
('Juan', 'Valencia', '1765843', '31457687', 'JuanValencia@gmail.com', '10-10-2020', '09:07', 'AM', 1, 'Masculino'),
('Mariana', 'Ordoñes', '31194568492', '32194864977', 'Mariord@gmail.com', '31-10-2020', '10:50', 'PM', 5, 'Femenino'),
('Deiby', 'Rayo', '31659248', '3216498216', 'Rayo@gmail.com', '18-10-2025', '08:30', 'AM', 3, 'Masculino'),
('Patricia', 'Ocampo', '31946423618', '3119462015', 'Ocampo154@hotmail.com', '26-10-2020', '10:30', 'PM', 1, 'Femenino'),
('Juan', 'Lopez', '319486460', '3219462577', 'Lopez123@hotmail.com', '23-11-2017', '15:30', 'AM', 3, 'Masculino'),
('Paula', 'Zapata', '343563423', '315687942', 'Paulaxp9@gmail.com', '29-10-2020', '16:69', 'AM', 1, 'Femenino'),
('Manuel', 'Larrahondo', '3446343', '345678543', 'Cero@gmail.com', '29-10-2020', '9:15', 'AM', 2, 'Masculino'),
('Maria', 'Gallego', '3458764', '315798657', 'Maria@gmail.com', '29-10-2020', '15:00', 'PM', 1, 'Femenino'),
('Johan', 'Martinez', '3464356', '345678943', 'JohanXp8@gmail.com', '23-10-2020', '09:97', 'AM', 2, 'Masculino'),
('Pedro', 'Rodríguez', '34960482', '311964875', 'Pedro123@hotmail.com', '30-10-2020', '15:10', 'PM', 3, 'Masculino'),
('Carlos', 'Castro', '36589594', '34650932', 'CarlosXp9@gmail.com', '31-10-2020', '09:98', 'PM', 1, 'Femenino'),
('Luisa', 'Ordoñez', '54654334', '315789678', 'LuisaXp9@gmail.com', '30-10-2020', '15:09', 'AM', 2, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_doctores`
--

CREATE TABLE `registro_doctores` (
  `doctor_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_cita_id` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `movil` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `registro_doctores`
--

INSERT INTO `registro_doctores` (`doctor_id`, `nombre`, `apellido`, `tipo_cita_id`, `cedula`, `movil`, `correo`, `contraseña`) VALUES
(1, 'Cristian', 'Gomez', 2, '108462834', '921946756', 'SebastianOb123@gmail.com', '1234'),
(2, 'Maite', 'Figueroa', 2, '177374741', '958717142', 'mait.figueroa@duocuc.cl', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_tutor`
--

CREATE TABLE `registro_tutor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_sexo_id` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `movil` varchar(9) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `registro_tutor`
--

INSERT INTO `registro_tutor` (`id`, `nombre`, `apellido`, `tipo_sexo_id`, `cedula`, `movil`, `correo`, `contrasena`) VALUES
(5, 'Yenifer', 'Tapia', 1, '188419097', '99408111', 'yeni.tapia@duocuc.cl', '1111');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cita`
--

CREATE TABLE `tipo_cita` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_cita`
--

INSERT INTO `tipo_cita` (`id`, `nombre`) VALUES
(1, 'Odontologia'),
(2, 'Medico general '),
(3, 'Radiologia'),
(4, 'Cardiologia'),
(5, 'Psicologo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_jornada`
--

CREATE TABLE `tipo_jornada` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_jornada`
--

INSERT INTO `tipo_jornada` (`id`, `nombre`) VALUES
(1, 'A.M'),
(2, 'P.M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_sexo`
--

CREATE TABLE `tipo_sexo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_sexo`
--

INSERT INTO `tipo_sexo` (`id`, `nombre`) VALUES
(1, 'Femenino'),
(2, 'Masculino');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `rut` (`rut`),
  ADD KEY `tipo_sexo_id` (`tipo_sexo_id`);

--
-- Indices de la tabla `hijos`
--
ALTER TABLE `hijos`
  ADD PRIMARY KEY (`rut`),
  ADD KEY `padre_id` (`padre_id`);

--
-- Indices de la tabla `horario_doctor`
--
ALTER TABLE `horario_doctor`
  ADD PRIMARY KEY (`horario_doctor_id`);

--
-- Indices de la tabla `horario_paciente`
--
ALTER TABLE `horario_paciente`
  ADD PRIMARY KEY (`horario_paciente_id`);

--
-- Indices de la tabla `horario_tramo_doctor`
--
ALTER TABLE `horario_tramo_doctor`
  ADD PRIMARY KEY (`horario_tramo_doctor_id`);

--
-- Indices de la tabla `inicio_admi`
--
ALTER TABLE `inicio_admi`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inicio_asistente`
--
ALTER TABLE `inicio_asistente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes_citas`
--
ALTER TABLE `ordenes_citas`
  ADD UNIQUE KEY `ced` (`cedula`),
  ADD UNIQUE KEY `cel` (`movil`),
  ADD UNIQUE KEY `cor` (`correo`),
  ADD KEY `FK_tipo` (`tipo_cita_id`);

--
-- Indices de la tabla `registro_doctores`
--
ALTER TABLE `registro_doctores`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `FK_doctores` (`tipo_cita_id`);

--
-- Indices de la tabla `registro_tutor`
--
ALTER TABLE `registro_tutor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_paciente` (`tipo_sexo_id`);

--
-- Indices de la tabla `tipo_cita`
--
ALTER TABLE `tipo_cita`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_jornada`
--
ALTER TABLE `tipo_jornada`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_sexo`
--
ALTER TABLE `tipo_sexo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `horario_doctor`
--
ALTER TABLE `horario_doctor`
  MODIFY `horario_doctor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horario_paciente`
--
ALTER TABLE `horario_paciente`
  MODIFY `horario_paciente_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `horario_tramo_doctor`
--
ALTER TABLE `horario_tramo_doctor`
  MODIFY `horario_tramo_doctor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `inicio_admi`
--
ALTER TABLE `inicio_admi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inicio_asistente`
--
ALTER TABLE `inicio_asistente`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `registro_doctores`
--
ALTER TABLE `registro_doctores`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `registro_tutor`
--
ALTER TABLE `registro_tutor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_cita`
--
ALTER TABLE `tipo_cita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_jornada`
--
ALTER TABLE `tipo_jornada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_sexo`
--
ALTER TABLE `tipo_sexo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ordenes_citas`
--
ALTER TABLE `ordenes_citas`
  ADD CONSTRAINT `FK_tipo` FOREIGN KEY (`tipo_cita_id`) REFERENCES `tipo_cita` (`id`);

--
-- Filtros para la tabla `registro_doctores`
--
ALTER TABLE `registro_doctores`
  ADD CONSTRAINT `FK_doctores` FOREIGN KEY (`tipo_cita_id`) REFERENCES `tipo_cita` (`id`);

--
-- Filtros para la tabla `registro_tutor`
--
ALTER TABLE `registro_tutor`
  ADD CONSTRAINT `FK_paciente` FOREIGN KEY (`tipo_sexo_id`) REFERENCES `tipo_sexo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
