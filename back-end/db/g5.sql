-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2026 at 04:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g5`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `parent_id`, `image_url`, `is_visible`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Clothing', NULL, 'All clothing items including shirts, pants, dresses and accessories 1', NULL, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop', 1, 1, '2026-03-24 14:23:36', '2026-04-08 14:46:59'),
(2, 'Electronics', NULL, 'Electronic devices, gadgets and tech accessories', NULL, 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop', 1, 2, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(3, 'Home & Garden', NULL, 'Home improvement, furniture, and garden supplies', NULL, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop', 1, 3, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(4, 'Sports & Fitness', NULL, 'Sports equipment, fitness gear, and athletic wear', NULL, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop', 1, 4, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(5, 'Underware', NULL, 'Casual and formal t-shirts for all occasions', 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop', 1, 1, '2026-03-24 14:23:36', '2026-05-12 14:29:00'),
(8, 'Smartphones', NULL, 'Latest smartphones and mobile devices', 2, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop', 1, 1, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(9, 'Laptops', NULL, 'Computers and laptops for work and gaming', 2, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop', 1, 2, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(10, 'Running Shoes', NULL, 'Professional running and athletic footwear', 4, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop', 1, 1, '2026-03-24 14:23:36', '2026-03-24 14:23:36'),
(11, 'TV 1', NULL, 'All TV items including', NULL, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop', 1, 1, '2026-04-01 14:17:49', '2026-05-12 14:26:51'),
(12, 'T-shirt', NULL, 'N/A', 1, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop', 1, 1, '2026-04-01 14:32:38', '2026-04-06 15:01:52'),
(13, 'pants', NULL, 'N/A', 1, 'https://media.wired.com/photos/611c5312798f0e2c853b702f/4:3/w_1375,h_1031,c_limit/Gear-Cargo-Pants-are-Back-1302952122.jpg', 1, 0, '2026-04-06 14:33:42', '2026-04-06 14:33:42'),
(14, 'pants 02', NULL, 'N/A', 1, 'N/A', 0, 0, '2026-04-07 14:52:01', '2026-04-07 14:57:46'),
(15, 'Under pant', NULL, 'N/A', 13, 'https://cdn.britannica.com/74/190774-050-52CE5745/jeans-denim-pants-clothing.jpg', 1, 0, '2026-04-08 14:48:00', '2026-04-29 13:34:12');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` int(2) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `first_name`, `last_name`, `email`, `password`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'piseth', 'seng', 'piseth@gmail.com', '$2b$10$gJa645sSU2TXhzUGWB4DduiWXogNUYiLDg0uG0srjzSxTjK3H/EXm', 1, '2026-04-27 14:09:38', '2026-04-27 14:09:38');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `category_id`, `brand`, `base_price`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'shoe', 'shoe', 'new', 10, NULL, 100.00, 1, '2026-04-21 14:32:56', '2026-04-21 14:32:56'),
(3, 'Mac M5', 'mac-m5', NULL, 9, NULL, 2000.00, 1, '2026-04-23 14:19:08', '2026-04-23 14:19:08'),
(4, 'M4', 'm4', 'ម៉ាស៊ីនស្អាតដូចថ្មី សមត្ថភាពខ្លាំង សម្រាប់អ្នកចង់បាន MacBook ដើម្បីធ្វើការរូបភាព វីដេអូ និង Multitask ខ្លាំងៗ!\n\nលក្ខណៈពិសេស៖\n⚡️ Core i9 (2.6GHz, 8-Core)\n⚡️ RAM 32GB DDR4 – បើកកម្មវិធីជាមួយគ្នា ឥតស្ទាក់\n⚡️ SSD 512GB – បញ្ចូលលឿនបំផុត\n⚡️ VGA: Radeon Pro 5500M 4GB + Intel UHD\n⚡️ Retina Display 3K – ស្អាតនឹងភ្នែក\n⚡️ Battery Health 99% – ថ្មីស្ទើរតែមិនប្រើ\n⚡️ Touch Bar + macOS Monterey\n⚡️ មាន Original Charger', 9, NULL, 1200.00, 1, '2026-05-13 14:50:49', '2026-05-13 14:50:49');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `size`, `color`, `quantity`, `price`, `sku`, `created_at`, `updated_at`) VALUES
(2, 3, '14', 'gray', 2, 1500.00, '02-gray', '2026-04-23 14:55:32', '2026-04-23 14:55:32'),
(3, 1, 'm', 'red', 2, 30.00, '01-red-m', '2026-04-27 14:11:21', '2026-04-27 14:11:21'),
(5, 3, '16', 'gray', 2, 2000.00, '01-gray-16', '2026-04-28 14:20:25', '2026-04-28 14:20:25'),
(6, 4, '14', 'white', 2, 1150.00, NULL, '2026-05-13 14:51:25', '2026-05-13 14:51:25'),
(7, 3, '16', 'black', 2, 1200.00, NULL, '2026-05-18 14:06:38', '2026-05-18 14:06:38');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_images`
--

CREATE TABLE `product_variant_images` (
  `id` bigint(20) NOT NULL,
  `variant_id` bigint(20) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_variant_images`
--

INSERT INTO `product_variant_images` (`id`, `variant_id`, `image_url`, `alt_text`, `is_primary`, `display_order`, `created_at`) VALUES
(2, 5, '/uploads/images-1777387656073-8573382.jpeg', NULL, 1, 0, '2026-04-28 14:47:36'),
(3, 5, '/uploads/images-1777387656076-825215970.jpg', NULL, 0, 1, '2026-04-28 14:47:36'),
(5, 2, '/uploads/images-1778598423799-509133483.jpg', NULL, 1, 0, '2026-05-12 15:07:03'),
(6, 2, '/uploads/images-1778682767415-192666146.jpg', NULL, 1, 0, '2026-05-13 14:32:47'),
(7, 3, '/uploads/images-1778683642028-384477260.jpg', NULL, 1, 0, '2026-05-13 14:47:22'),
(8, 6, '/uploads/images-1778683906017-897339208.jpg', NULL, 1, 0, '2026-05-13 14:51:46'),
(9, 6, '/uploads/images-1778683948054-958819085.jpg', NULL, 1, 0, '2026-05-13 14:52:28'),
(10, 7, '/uploads/images-1779113216313-501732086.jpg', NULL, 1, 0, '2026-05-18 14:06:56');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint(20) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `status` enum('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_items`
--

CREATE TABLE `purchase_items` (
  `id` bigint(20) NOT NULL,
  `purchase_id` bigint(20) NOT NULL,
  `variant_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(12,2) GENERATED ALWAYS AS (`quantity` * `unit_price`) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` int(2) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test1@gmail.com', '$2b$10$V2pS/69mmrnYFOGiNC7j4OfkZtSUjqLp44NZVYPaS/sbrHEeITEKO', 1, '2026-05-06 14:08:55', '2026-05-04 15:14:22'),
(2, 'heng', 'heng@gmail.com', '$2b$10$k9K2KjR9rAjL05RSl0AwI.b3MEVrvXIWUx8dzoNSYlD7eMHIiwoFm', 1, '2026-04-27 14:05:34', '2026-04-27 14:05:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD UNIQUE KEY `unique_variant` (`product_id`,`size`,`color`);

--
-- Indexes for table `product_variant_images`
--
ALTER TABLE `product_variant_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_id` (`purchase_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_variant_images`
--
ALTER TABLE `product_variant_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variant_images`
--
ALTER TABLE `product_variant_images`
  ADD CONSTRAINT `product_variant_images_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD CONSTRAINT `purchase_items_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchase_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
