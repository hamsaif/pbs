/*
  Warnings:

  - A unique constraint covering the columns `[nama_filter]` on the table `Kategori` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kategori_nama_filter_key" ON "Kategori"("nama_filter");
