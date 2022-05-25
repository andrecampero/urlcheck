-- --------------------------------------------------------
-- Servidor:                     192.185.217.184
-- Versão do servidor:           5.6.41-84.1 - Percona Server (GPL), Release 84.1, Revision b308619
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela adsgru10_validador_url.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `url` varchar(191) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `item_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela adsgru10_validador_url.menu: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `name`, `url`, `icon`, `item_order`) VALUES
	(1, 'Validador URL', NULL, 'flaticon-list-3', 1);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Copiando estrutura para tabela adsgru10_validador_url.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela adsgru10_validador_url.migrations: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Copiando estrutura para tabela adsgru10_validador_url.submenu
CREATE TABLE IF NOT EXISTS `submenu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `item_order` int(11) DEFAULT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `item_order` (`item_order`) USING BTREE,
  KEY `menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela adsgru10_validador_url.submenu: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `submenu` DISABLE KEYS */;
INSERT INTO `submenu` (`id`, `name`, `url`, `item_order`, `menu_id`) VALUES
	(1, 'Urls', 'protocols', 1, 1),
	(2, 'Registrar', 'create.lot.protocol', 2, 1);
/*!40000 ALTER TABLE `submenu` ENABLE KEYS */;

-- Copiando estrutura para tabela adsgru10_validador_url.tb_perfil
CREATE TABLE IF NOT EXISTS `tb_perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `permissao` text,
  `admin` int(11) DEFAULT NULL,
  `relacionado` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela adsgru10_validador_url.tb_perfil: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_perfil` DISABLE KEYS */;
INSERT INTO `tb_perfil` (`id`, `nome`, `tipo`, `permissao`, `admin`, `relacionado`, `deleted_at`) VALUES
	(1, 'Admin', 'Admin', '{"1":["41","42","44","45"],"2":["5","6","17"],"3":["12","13","14"],"4":["1","2","3","4","11"],"5":["15","16"],"6":["22"],"7":["20","21"],"9":["7","8"]}', 1, NULL, NULL);
/*!40000 ALTER TABLE `tb_perfil` ENABLE KEYS */;

-- Copiando estrutura para tabela adsgru10_validador_url.tb_track
CREATE TABLE IF NOT EXISTS `tb_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_track` varchar(250) DEFAULT NULL,
  `status_code` varchar(150) DEFAULT NULL,
  `response_code` longtext,
  `urlcheckedAt` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `url_track` (`url_track`),
  KEY `urlcheckedAt` (`urlcheckedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela adsgru10_validador_url.tb_track: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_track` DISABLE KEYS */;
INSERT INTO `tb_track` (`id`, `url_track`, `status_code`, `response_code`, `urlcheckedAt`, `createdBy`, `createdAt`) VALUES
	(1, 'https://www.w3schools.com/', '200', 'OK', '2022-05-25 16:56:01', 1, '2022-05-24 18:06:40'),
	(2, 'https://eloquentcode.com/', '200', 'OK', '2022-05-25 16:56:01', 1, '2022-05-25 14:17:01'),
	(3, 'https://stackoverflow.com/', '200', 'OK', '2022-05-25 16:56:02', 1, '2022-05-25 15:40:35'),
	(4, 'https://gestta-prod.s3.amazonaws.com/', '403', 'Forbidden', '2022-05-25 16:56:03', 1, '2022-05-25 15:52:48'),
	(5, 'https://dev.mysql.com/', '200', 'OK', '2022-05-25 16:56:03', 1, '2022-05-25 16:01:31');
/*!40000 ALTER TABLE `tb_track` ENABLE KEYS */;

-- Copiando estrutura para tabela adsgru10_validador_url.tb_usuario
CREATE TABLE IF NOT EXISTS `tb_usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `perfil` int(2) NOT NULL DEFAULT '5',
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9jv637xbp8bllorm7lqp9bitu` (`perfil`),
  KEY `email` (`email`),
  CONSTRAINT `FK_9jv637xbp8bllorm7lqp9bitu` FOREIGN KEY (`perfil`) REFERENCES `tb_perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela adsgru10_validador_url.tb_usuario: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` (`id`, `perfil`, `email`, `senha`, `nome`) VALUES
	(1, 1, 'admin@url.com.br', '$2y$10$zeHFED7vJMttQ7iNQ8P.COTTkfsmd8lIQBVXcDk57szjpVftXPAne', 'Admin');
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
