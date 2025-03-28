-- CreateTable
CREATE TABLE `automovel` (
    `placa` VARCHAR(191) NOT NULL,
    `proprietario` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NULL,
    `ano` INTEGER NULL,
    `telefone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`placa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estadia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `entrada` DATETIME(3) NOT NULL,
    `saida` DATETIME(3) NULL,
    `valorhora` DOUBLE NOT NULL,
    `valortotal` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estadia` ADD CONSTRAINT `estadia_placa_fkey` FOREIGN KEY (`placa`) REFERENCES `automovel`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;
