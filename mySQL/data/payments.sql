SET FOREIGN_KEY_CHECKS = 0;

-- Data for table payments
INSERT INTO `payments` (`id`, `invoice_id`, `amount`, `method`, `reference`, `notes`, `created_by`, `created_at`) VALUES ('47e7aa6f-ad9d-4270-92bd-0069891b424c', '5dbaa8bb-4602-46d2-9036-a28614baf19e', 787.5, 'upi', 'REF-INV-002', 'Full payment received', NULL, '2025-10-25T12:41:35.241812+00:00');
INSERT INTO `payments` (`id`, `invoice_id`, `amount`, `method`, `reference`, `notes`, `created_by`, `created_at`) VALUES ('578ea87d-6d2d-4676-841f-f0feaf6c323d', '7606895a-4e78-4a30-810e-ff8ab1355616', 472.5, 'cash', 'REF-INV-001', 'Full payment received', NULL, '2025-10-23T12:41:35.241812+00:00');
INSERT INTO `payments` (`id`, `invoice_id`, `amount`, `method`, `reference`, `notes`, `created_by`, `created_at`) VALUES ('4e0074dd-f7fc-4565-be38-7f3edca74392', '865a4ce0-c893-4858-b1dd-edd90fa89f99', 200, 'card', 'REF-INV-003-PARTIAL', 'Partial payment - advance', NULL, '2025-10-27T13:41:35.241812+00:00');

SET FOREIGN_KEY_CHECKS = 1;
