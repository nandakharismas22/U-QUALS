-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1

-- Waktu pembuatan: 22 Jul 2025 pada 11.08

-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uquals`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `auditor_periode`
--

CREATE TABLE `auditor_periode` (
  `id_auditor_periode` int(11) NOT NULL,
  `id_role_pegawai` int(11) DEFAULT NULL,
  `id_periode` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `audit_bukti`
--

CREATE TABLE `audit_bukti` (
  `id_bukti` int(11) NOT NULL,
  `id_audit_detail` int(11) DEFAULT NULL,
  `file_bukti` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `audit_detail_auditor`
--

CREATE TABLE `audit_detail_auditor` (
  `id_audit_detail_auditor` int(11) NOT NULL,
  `id_audit_detail` int(11) DEFAULT NULL,
  `id_pegawai` int(11) DEFAULT NULL,
  `peran` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `audit_detail_prodi`
--

CREATE TABLE `audit_detail_prodi` (
  `id_audit_detail` int(11) NOT NULL,
  `id_plot_standar` int(11) DEFAULT NULL,
  `id_periode` int(11) DEFAULT NULL,
  `nilai` decimal(5,2) DEFAULT NULL,
  `status_pengajuan` varchar(50) DEFAULT NULL,
  `tanggal_pengajuan` date DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `fakultas`
--

CREATE TABLE `fakultas` (
  `id_fakultas` int(11) NOT NULL,
  `nama_fakultas` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `fakultas`
--

INSERT INTO `fakultas` (`id_fakultas`, `nama_fakultas`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'Fakultas Ilmu Komputer', NULL, '2025-06-16 00:42:54', NULL, '2025-06-16 00:42:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_audit`
--

CREATE TABLE `jenis_audit` (
  `id_jenis_audit` int(11) NOT NULL,
  `nama_jenis` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jenis_audit`
--

INSERT INTO `jenis_audit` (`id_jenis_audit`, `nama_jenis`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'Tahunan', 1, '2025-06-26 05:06:27', NULL, '2025-06-26 23:16:52'),
(2, 'TW1', 1, '2025-06-26 16:16:38', NULL, '2025-06-26 16:16:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `komponen_standar`
--

CREATE TABLE `komponen_standar` (
  `id_komponen` int(11) NOT NULL,
  `id_standar` int(11) DEFAULT NULL,
  `nama_komponen` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan_audit_prodi`
--

CREATE TABLE `laporan_audit_prodi` (
  `id_lap_audit_prodi` int(11) NOT NULL,
  `id_periode` int(11) DEFAULT NULL,
  `id_prodi` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawai`
--

CREATE TABLE `pegawai` (
  `id_pegawai` int(11) NOT NULL,
  `nama_pegawai` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prodi` varchar(255) DEFAULT NULL,
  `terakhir_login` datetime DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pegawai`
--

INSERT INTO `pegawai` (`id_pegawai`, `nama_pegawai`, `email`, `password`, `prodi`, `terakhir_login`, `status`, `refresh_token`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'Talia Aprianti', 'talia2@gmail.com', '$2b$10$yBICwkXPlj2ygb.lTeSRBepRIBG3DGb8GZg9577X9/HMlVd49b4YO', 'Sistem Informasi', '2025-07-21 00:20:00', 'Aktif', NULL, NULL, '2025-06-16 00:41:05', NULL, '2025-07-21 00:20:45'),
(2, 'Nanda Kharisma', 'nandaaa@gmail.com', '$2b$10$yBICwkXPlj2ygb.lTeSRBepRIBG3DGb8GZg9577X9/HMlVd49b4YO', 'Sistem Informasi', '2025-07-20 13:55:00', 'Aktif', NULL, NULL, '2025-07-01 01:55:14', NULL, '2025-07-20 14:06:50'),
(6, 'Linda', 'linda@gmail.com', '$2b$10$.0JWbxVnvuvbEcBYyQoECOTtEIPt8JPqKTe0fHVcDfEKaAEP/IfnG', 'Teknik Kimia', '2025-07-22 02:44:00', 'Aktif', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZWdhd2FpIjo2LCJuYW1hX3BlZ2F3YWkiOiJMaW5kYSIsImVtYWlsIjoibGluZGFAZ21haWwuY29tIiwicHJvZGkiOiJUZWtuaWsgS2ltaWEiLCJzdGF0dXMiOiJBa3RpZiIsInJvbGUiOm51bGwsImlhdCI6MTc1MzE1MjI2NSwiZXhwIjoxNzUzMjM4NjY1fQ.MVNorHlhZWzVuL15VOmwUUrwWBGWT2nJ65O77ePBatc', NULL, '2025-06-20 05:31:40', NULL, '2025-07-22 02:44:25');


-- --------------------------------------------------------

--
-- Struktur dari tabel `periode_audit`
--

CREATE TABLE `periode_audit` (
  `id_periode` int(11) NOT NULL,
  `id_jenis_audit` int(11) DEFAULT NULL,
  `periode` varchar(255) DEFAULT NULL,
  `tgl_mulai` date DEFAULT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `status` enum('Aktif','Selesai') DEFAULT 'Aktif',
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `periode_audit`
--

INSERT INTO `periode_audit` (`id_periode`, `id_jenis_audit`, `periode`, `tgl_mulai`, `tgl_selesai`, `status`, `created_at`, `created_by`, `modified_by`, `modified_at`) VALUES
(1, 1, 'Periode 2024/2025', '2025-06-01', '2025-07-31', 'Aktif', NULL, NULL, NULL, NULL),
(2, 1, 'Periode 2023/2024', '2025-06-01', '2025-07-31', 'Aktif', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `plot_standar`
--

CREATE TABLE `plot_standar` (
  `id_plot_standar` int(11) NOT NULL,
  `id_sub_komponen` int(11) DEFAULT NULL,
  `id_jenis_audit` int(11) DEFAULT NULL,
  `indikator_plot` text DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prodi`
--

CREATE TABLE `prodi` (
  `id_prodi` int(11) NOT NULL,
  `id_fakultas` int(11) DEFAULT NULL,
  `nama_prodi` varchar(100) DEFAULT NULL,
  `kelompok_prodi` varchar(50) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `prodi`
--

INSERT INTO `prodi` (`id_prodi`, `id_fakultas`, `nama_prodi`, `kelompok_prodi`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 1, 'Sistem Informasi', 'Sains dan Teknologi', NULL, '2025-06-16 00:43:29', NULL, '2025-06-16 00:43:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nama_role` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id_role`, `nama_role`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'Admin LPMPP', NULL, '2025-06-16 00:44:14', NULL, '2025-06-16 00:44:14'),
(2, 'Tim GKM', NULL, '2025-06-16 00:45:20', NULL, '2025-06-16 00:45:20'),
(3, 'Auditor', NULL, '2025-06-16 00:45:20', NULL, '2025-06-16 00:45:20'),
(4, 'Korprodi', NULL, '2025-06-16 00:46:00', NULL, '2025-06-16 00:46:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_pegawai`
--

CREATE TABLE `role_pegawai` (
  `id_role_pegawai` int(11) NOT NULL,
  `id_pegawai` int(11) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `role_pegawai`
--

INSERT INTO `role_pegawai` (`id_role_pegawai`, `id_pegawai`, `id_role`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 1, 1, NULL, '2025-07-06 21:27:59', NULL, '2025-07-20 21:07:08'),
(2, 6, 1, NULL, '2025-06-25 19:22:38', NULL, '2025-07-20 10:26:10'),
(3, 2, 2, NULL, '2025-07-07 11:14:12', NULL, '2025-07-07 11:14:12'),
(4, 2, 4, NULL, '2025-07-07 11:06:38', NULL, '2025-07-07 11:06:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `standar`
--

CREATE TABLE `standar` (
  `id_standar` int(11) NOT NULL,
  `nama_standar` varchar(100) DEFAULT NULL,
  `versi` varchar(20) DEFAULT NULL,
  `tahun_rilis` int(11) DEFAULT NULL,
  `file_pdf` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_komponen`
--

CREATE TABLE `sub_komponen` (
  `id_sub_komponen` int(11) NOT NULL,
  `id_komponen` int(11) DEFAULT NULL,
  `nama_kegiatan` varchar(100) DEFAULT NULL,
  `target_standar` text DEFAULT NULL,
  `indikator` text DEFAULT NULL,
  `sumber_standar` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `auditor_periode`
--
ALTER TABLE `auditor_periode`
  ADD PRIMARY KEY (`id_auditor_periode`),
  ADD KEY `id_role_pegawai` (`id_role_pegawai`),
  ADD KEY `id_periode` (`id_periode`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `audit_bukti`
--
ALTER TABLE `audit_bukti`
  ADD PRIMARY KEY (`id_bukti`),
  ADD KEY `id_audit_detail` (`id_audit_detail`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `audit_detail_auditor`
--
ALTER TABLE `audit_detail_auditor`
  ADD PRIMARY KEY (`id_audit_detail_auditor`),
  ADD KEY `id_audit_detail` (`id_audit_detail`),
  ADD KEY `id_pegawai` (`id_pegawai`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `audit_detail_prodi`
--
ALTER TABLE `audit_detail_prodi`
  ADD PRIMARY KEY (`id_audit_detail`),
  ADD KEY `id_plot_standar` (`id_plot_standar`),
  ADD KEY `id_periode` (`id_periode`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `fakultas`
--
ALTER TABLE `fakultas`
  ADD PRIMARY KEY (`id_fakultas`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `jenis_audit`
--
ALTER TABLE `jenis_audit`
  ADD PRIMARY KEY (`id_jenis_audit`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `komponen_standar`
--
ALTER TABLE `komponen_standar`
  ADD PRIMARY KEY (`id_komponen`),
  ADD KEY `id_standar` (`id_standar`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `laporan_audit_prodi`
--
ALTER TABLE `laporan_audit_prodi`
  ADD PRIMARY KEY (`id_lap_audit_prodi`),
  ADD KEY `id_periode` (`id_periode`),
  ADD KEY `id_prodi` (`id_prodi`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indeks untuk tabel `periode_audit`
--
ALTER TABLE `periode_audit`
  ADD PRIMARY KEY (`id_periode`),
  ADD KEY `id_jenis_audit` (`id_jenis_audit`);

--
-- Indeks untuk tabel `plot_standar`
--
ALTER TABLE `plot_standar`
  ADD PRIMARY KEY (`id_plot_standar`),
  ADD KEY `id_sub_komponen` (`id_sub_komponen`),
  ADD KEY `id_jenis_audit` (`id_jenis_audit`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`id_prodi`),
  ADD KEY `id_fakultas` (`id_fakultas`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `role_pegawai`
--
ALTER TABLE `role_pegawai`
  ADD PRIMARY KEY (`id_role_pegawai`),
  ADD KEY `id_pegawai` (`id_pegawai`),
  ADD KEY `id_role` (`id_role`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `standar`
--
ALTER TABLE `standar`
  ADD PRIMARY KEY (`id_standar`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indeks untuk tabel `sub_komponen`
--
ALTER TABLE `sub_komponen`
  ADD PRIMARY KEY (`id_sub_komponen`),
  ADD KEY `id_komponen` (`id_komponen`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `auditor_periode`
--
ALTER TABLE `auditor_periode`
  MODIFY `id_auditor_periode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `audit_bukti`
--
ALTER TABLE `audit_bukti`
  MODIFY `id_bukti` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `audit_detail_auditor`
--
ALTER TABLE `audit_detail_auditor`
  MODIFY `id_audit_detail_auditor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `audit_detail_prodi`
--
ALTER TABLE `audit_detail_prodi`
  MODIFY `id_audit_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `fakultas`
--
ALTER TABLE `fakultas`
  MODIFY `id_fakultas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `jenis_audit`
--
ALTER TABLE `jenis_audit`
  MODIFY `id_jenis_audit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `komponen_standar`
--
ALTER TABLE `komponen_standar`
  MODIFY `id_komponen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `laporan_audit_prodi`
--
ALTER TABLE `laporan_audit_prodi`
  MODIFY `id_lap_audit_prodi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `periode_audit`
--
ALTER TABLE `periode_audit`
  MODIFY `id_periode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `plot_standar`
--
ALTER TABLE `plot_standar`
  MODIFY `id_plot_standar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `prodi`
--
ALTER TABLE `prodi`
  MODIFY `id_prodi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `role_pegawai`
--
ALTER TABLE `role_pegawai`
  MODIFY `id_role_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `standar`
--
ALTER TABLE `standar`
  MODIFY `id_standar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sub_komponen`
--
ALTER TABLE `sub_komponen`
  MODIFY `id_sub_komponen` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `auditor_periode`
--
ALTER TABLE `auditor_periode`
  ADD CONSTRAINT `auditor_periode_ibfk_1` FOREIGN KEY (`id_role_pegawai`) REFERENCES `role_pegawai` (`id_role_pegawai`),
  ADD CONSTRAINT `auditor_periode_ibfk_2` FOREIGN KEY (`id_periode`) REFERENCES `periode_audit` (`id_periode`),
  ADD CONSTRAINT `auditor_periode_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `auditor_periode_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `audit_bukti`
--
ALTER TABLE `audit_bukti`
  ADD CONSTRAINT `audit_bukti_ibfk_1` FOREIGN KEY (`id_audit_detail`) REFERENCES `audit_detail_prodi` (`id_audit_detail`),
  ADD CONSTRAINT `audit_bukti_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `audit_bukti_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `audit_detail_auditor`
--
ALTER TABLE `audit_detail_auditor`
  ADD CONSTRAINT `audit_detail_auditor_ibfk_1` FOREIGN KEY (`id_audit_detail`) REFERENCES `audit_detail_prodi` (`id_audit_detail`),
  ADD CONSTRAINT `audit_detail_auditor_ibfk_2` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `audit_detail_auditor_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `audit_detail_auditor_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `audit_detail_prodi`
--
ALTER TABLE `audit_detail_prodi`
  ADD CONSTRAINT `audit_detail_prodi_ibfk_1` FOREIGN KEY (`id_plot_standar`) REFERENCES `plot_standar` (`id_plot_standar`),
  ADD CONSTRAINT `audit_detail_prodi_ibfk_2` FOREIGN KEY (`id_periode`) REFERENCES `periode_audit` (`id_periode`),
  ADD CONSTRAINT `audit_detail_prodi_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `audit_detail_prodi_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `fakultas`
--
ALTER TABLE `fakultas`
  ADD CONSTRAINT `fakultas_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `fakultas_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `jenis_audit`
--
ALTER TABLE `jenis_audit`
  ADD CONSTRAINT `jenis_audit_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `jenis_audit_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `komponen_standar`
--
ALTER TABLE `komponen_standar`
  ADD CONSTRAINT `komponen_standar_ibfk_1` FOREIGN KEY (`id_standar`) REFERENCES `standar` (`id_standar`),
  ADD CONSTRAINT `komponen_standar_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `komponen_standar_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `laporan_audit_prodi`
--
ALTER TABLE `laporan_audit_prodi`
  ADD CONSTRAINT `laporan_audit_prodi_ibfk_1` FOREIGN KEY (`id_periode`) REFERENCES `periode_audit` (`id_periode`),
  ADD CONSTRAINT `laporan_audit_prodi_ibfk_2` FOREIGN KEY (`id_prodi`) REFERENCES `prodi` (`id_prodi`),
  ADD CONSTRAINT `laporan_audit_prodi_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `laporan_audit_prodi_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `periode_audit`
--
ALTER TABLE `periode_audit`
  ADD CONSTRAINT `periode_audit_ibfk_1` FOREIGN KEY (`id_jenis_audit`) REFERENCES `jenis_audit` (`id_jenis_audit`);

--
-- Ketidakleluasaan untuk tabel `plot_standar`
--
ALTER TABLE `plot_standar`
  ADD CONSTRAINT `plot_standar_ibfk_1` FOREIGN KEY (`id_sub_komponen`) REFERENCES `sub_komponen` (`id_sub_komponen`),
  ADD CONSTRAINT `plot_standar_ibfk_2` FOREIGN KEY (`id_jenis_audit`) REFERENCES `jenis_audit` (`id_jenis_audit`),
  ADD CONSTRAINT `plot_standar_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `plot_standar_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `prodi`
--
ALTER TABLE `prodi`
  ADD CONSTRAINT `prodi_ibfk_1` FOREIGN KEY (`id_fakultas`) REFERENCES `fakultas` (`id_fakultas`),
  ADD CONSTRAINT `prodi_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `prodi_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `role_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `role_pegawai`
--
ALTER TABLE `role_pegawai`
  ADD CONSTRAINT `role_pegawai_ibfk_1` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `role_pegawai_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  ADD CONSTRAINT `role_pegawai_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `role_pegawai_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `standar`
--
ALTER TABLE `standar`
  ADD CONSTRAINT `standar_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `standar_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

--
-- Ketidakleluasaan untuk tabel `sub_komponen`
--
ALTER TABLE `sub_komponen`
  ADD CONSTRAINT `sub_komponen_ibfk_1` FOREIGN KEY (`id_komponen`) REFERENCES `komponen_standar` (`id_komponen`),
  ADD CONSTRAINT `sub_komponen_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `sub_komponen_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
