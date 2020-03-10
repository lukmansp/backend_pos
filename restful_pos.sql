-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2020 at 10:43 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restful_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`) VALUES
(1, 'Smartphone'),
(2, 'Pc'),
(3, 'Smartwatch'),
(4, 'Camera');

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `id` int(11) NOT NULL,
  `id_product` varchar(255) NOT NULL,
  `user` varchar(15) NOT NULL,
  `quantity` int(15) NOT NULL,
  `price` int(20) NOT NULL,
  `total` int(15) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`id`, `id_product`, `user`, `quantity`, `price`, `total`, `created_at`, `updated_at`) VALUES
(6, '64b683ca-2843-48c6-8dd9-f51540a629d4', 'sm asus', 1, 9090, 9090, '2020-03-09 16:57:34', '2020-03-09 16:57:34'),
(7, '3a27a201-6a4a-402b-8d0e-214d855ad276', 'oppo phone', 2, 1212, 2424, '2020-03-09 22:00:55', '2020-03-09 22:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(250) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `image`, `price`, `stock`, `category_id`, `created_at`, `updated_at`) VALUES
('07bd1e64-52fc-4911-bc2d-bd760b655117', 'vivo', 'vivo phone', 'http://localhost:9009/uploads/image-asus rog.png', 2000000, 4, 0, '2020-03-07 07:12:48', '2020-03-07 07:12:48'),
('1eaa6290-6861-4e48-b96a-c1b096e37c2c', 'acer aspire 4752', 'gaming pc', 'http://localhost:9009/uploads/image-asus rog pc.png', 3000, 50, 0, '2020-03-05 08:20:40', '2020-03-05 08:20:40'),
('3a27a201-6a4a-402b-8d0e-214d855ad276', 'oppo phone', 'oppo', 'http://localhost:9009/uploads/image-oppo.png', 1212, 10, 1, '2020-03-01 09:59:59', '2020-03-05 02:19:14'),
('59962af4-cee3-40bd-9bd2-9fe06b1a0515', 'Pc Ryzen', 'Pc gaming', 'http://localhost:9009/uploads/image-ryzen.png', 121, 10, 2, '2020-03-02 21:36:46', '2020-03-05 02:19:56'),
('5d6ef214-fc11-41eb-9fc2-9a475ec791d4', 'pc macbook', 'macbook for everyone', 'http://localhost:9009/uploads/image-asus rog pc.png', 2000, 21, 0, '2020-03-09 12:38:21', '2020-03-09 12:38:21'),
('64b683ca-2843-48c6-8dd9-f51540a629d4', 'sm asus', 'asus phone ', 'http://localhost:9009/uploads/image-asus rog.png', 9090, 90, 1, '2020-03-01 09:58:00', '2020-03-01 09:58:00'),
('6b46f112-e7ae-404e-9e88-aae664a12c60', 'asus', 'is a chines phone', 'http://localhost:9009/uploads/image-asus rog pc.png', 23000, 12, 1, '2020-03-04 20:20:18', '2020-03-04 20:20:18'),
('81f3eceb-2461-404c-a0b2-6ec358589504', 'cannon cam', 'cannon camera', 'http://localhost:9009/uploads/image-cam cannon.png', 1200, 12, 4, '2020-03-02 21:33:17', '2020-03-05 02:20:33'),
('8328567c-67d8-4b05-ab52-94ffaeb0d74a', 'asusw', 'is a chines phone', 'http://localhost:9009/uploads/image-asus rog.png', 23000, 12, 1, '2020-03-04 19:18:31', '2020-03-04 19:18:31'),
('8f1c3a95-01a2-48e7-92b6-283545cfe019', 'asus', 'is a chines phone', 'http://localhost:9009/uploads/image-asus rog.png', 23000, 12, 1, '2020-03-04 19:22:11', '2020-03-04 19:22:11'),
('a04864e2-90e9-4305-b472-c6ef316df781', 'ROG', 'adalah game', 'http://localhost:9009/uploads/image-asus rog pc.png', 12300, 121, 1, '2020-03-04 19:26:49', '2020-03-04 19:26:49'),
('a225825b-b4c7-4f92-b4e4-9607463d3933', 'asus', 'is a chines phone', 'http://localhost:9009/uploads/image-asus rog.png', 23000, 12, 1, '2020-03-04 19:24:25', '2020-03-04 19:24:25'),
('b9afc4ee-8743-4792-ae19-dea686765adb', 'Vivo', 'vivo phone', 'http://localhost:9009/uploads/image-asus rog.png', 20000, 20, 0, '2020-03-05 08:19:26', '2020-03-05 08:19:26'),
('d729f113-9b00-486d-accb-ce5f64151447', 'vivo ', 'vivo phone', 'http://localhost:9009/uploads/image-sm xiaomi blackshark.png', 9000, 34, 0, '2020-03-08 07:40:44', '2020-03-08 07:40:44'),
('e552410f-9a6d-46c6-a8a9-edab7ffbb842', 'asus', 'is a chines phone', 'http://localhost:9009/uploads/image-asus rog.png', 23000, 12, 1, '2020-03-04 19:37:10', '2020-03-04 19:37:10'),
('e6fb3b22-865e-4534-83f3-0d17771f8c2a', 'wewqe', 'wqeqwe', 'http://localhost:9009/uploads/image-aaapr.png', 121, 21, 1, '2020-03-02 21:38:29', '2020-03-02 21:38:29'),
('f889b36c-b871-4a91-9f45-d2f5f06bbeff', 'sm vivo', 'vivo phone', 'http://localhost:9009/uploads/image-sm xiaomi blackshark.png', 2000, 12, 1, '2020-03-01 09:55:17', '2020-03-01 09:55:17');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `salt` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `otoritas_id` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `salt`, `password`, `otoritas_id`, `created_at`, `updated_at`) VALUES
(8, 'penta', 'lsppenta@gmail.com', 'd842d0e8671312782d', '8fdc35ffbf1466e98d4f24c3f7589b55ec97a011c05977678886747df40a45272fcd56f36083437e33cc139ff5640d22549de8b69bc3603998b4f44a3a930be7', 2, '2020-02-20 01:34:56', '2020-02-20 01:34:56'),
(10, 'Lukmans', 'lukman@gmail.com', '462d8b42e4e8229231', '9fa26a9d26c6c3fd07822d791765dc3b574f402913d582b36d33e6b3416b0d6cc6bd16ed647fa76cdb49ab46d7bd8632d9e9bc95a8c1bf5184afeff4b1313b94', 2, '2020-03-04 01:36:03', '2020-03-04 01:36:03'),
(11, 'Lukmans', 'lukman@gmail.com', '800850829c16e61bb0', '064b9b52681a4ecf4f368d488f79c8befde5576c1017dc2ebbeed21ef150c91137504fee72ca6f4f7ee4a263a706956257412f77b087f9254ab0f69d318d8d52', 2, '2020-03-04 01:36:21', '2020-03-04 01:36:21'),
(12, 'Lukmans', 'lukman@gmail.com', 'ea17efaa61644e974c', '561dbcc71df4a007eb81e83243925b5ada74ad55af34047a780b9d07b73291547dc5a1a4cec3cdb63b9edd4b0e0de41316dbcc80d02c89f844791ef474614d88', 2, '2020-03-04 01:36:21', '2020-03-04 01:36:21'),
(14, 'Lukmans', 'lukman@gmail.com', '53dc50b3068243d0e3', '361132a1437d40bcc05f0bb9e3ff16b3f697ccb2da3981852c30c146b6de9a091937a49dcded4c682bcc8d284b4744fa46668ce980bbf7e0aeaba2d475c6b127', 2, '2020-03-04 01:36:22', '2020-03-04 01:36:22'),
(15, 'pevita', 'pevita@gmail.com', '0df0defa82c4744c39', '899e2a2ac6677995a032d10f855a53ae805e7190cb6801ad096052b362983fb5b0e3f651a2afb0c9db0fcf79ab149d49cd62aa3c7b1712c36680f47907ca1d18', 1, '2020-03-04 11:24:56', '2020-03-04 01:37:40'),
(19, 'anggun', 'anggun@gmail.com', '4c2a83c6c243aaf63f', '5ca778dee37447a89e523c5df5d5f2de2a305a97e8c0adbffc2db26f51f743d1917c3c9b16094fb4968b55f60e9761fb19f55d4625392d3c731067755cd25809', 2, '2020-03-05 02:59:04', '2020-03-05 02:59:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
