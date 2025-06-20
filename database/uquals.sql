-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Jun 2025 pada 02.11
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
(1, 'Talia', 'talia@gmail.com', '123', 'Sistem Informasi', '2025-06-16 00:41:05', 'Aktif', NULL, NULL, '2025-06-16 00:41:05', NULL, '2025-06-16 12:35:12'),
(2, 'Nanda', 'nanda@gmail.com', '123', 'Sistem Informasi', '2025-06-16 00:46:59', 'Aktif', NULL, NULL, '2025-06-16 00:46:59', NULL, '2025-06-16 12:35:15'),
(3, 'Linda', 'linda@gmail.com', '123', 'Akutansi', '2025-06-16 01:32:24', 'Nonaktif', NULL, NULL, '2025-06-16 01:31:42', NULL, '2025-06-16 12:35:33'),
(4, 'Kania', 'kania@gmail.com', '$2b$10$BsijXhpPOW8NaladA.TAJ.ddVDJJcBe9K3fcvcEsyTn7FjeGbwp.C', 'Teknik Informatika', '2025-06-19 14:16:00', 'Aktif', NULL, NULL, '2025-06-16 05:44:14', NULL, '2025-06-19 14:16:15'),
(5, 'Hilwa', 'hilwa@gmail.com', '$2b$10$kQbBI9zzs7quFrSOkXLnKePv6wiDmG2vnUdD/yAp6Vb/1Pb3XCIEi', 'Teknik Industri', '2025-06-20 00:01:00', 'Aktif', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZWdhd2FpIjo1LCJuYW1hX3BlZ2F3YWkiOiJIaWx3YSIsImVtYWlsIjoiaGlsd2FAZ21haWwuY29tIiwicHJvZGkiOiJUZWtuaWsgSW5kdXN0cmkiLCJzdGF0dXMiOiJBa3RpZiIsImlhdCI6MTc1MDM3NzY2MCwiZXhwIjoxNzUwNDY0MDYwfQ.24tXnjq0BdpqPWAw6Qpf4ILkkswr-iu6f2DibCbymm8', NULL, '2025-06-16 07:02:43', NULL, '2025-06-20 00:01:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `periode_audit`
--

CREATE TABLE `periode_audit` (
  `id_periode` int(11) NOT NULL,
  `id_jenis_audit` int(11) DEFAULT NULL,
  `periode` varchar(100) DEFAULT NULL,
  `tgl_mulai` date DEFAULT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_by` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 1, 1, NULL, '2025-06-16 00:46:24', NULL, '2025-06-16 00:46:24');

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
  ADD KEY `id_jenis_audit` (`id_jenis_audit`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

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
  MODIFY `id_jenis_audit` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `periode_audit`
--
ALTER TABLE `periode_audit`
  MODIFY `id_periode` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_role_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `periode_audit_ibfk_1` FOREIGN KEY (`id_jenis_audit`) REFERENCES `jenis_audit` (`id_jenis_audit`),
  ADD CONSTRAINT `periode_audit_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `pegawai` (`id_pegawai`),
  ADD CONSTRAINT `periode_audit_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `pegawai` (`id_pegawai`);

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
