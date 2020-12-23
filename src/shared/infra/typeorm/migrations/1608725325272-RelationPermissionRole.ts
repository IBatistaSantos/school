import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationPermissionRole1608725325272
  implements MigrationInterface {
  name = 'RelationPermissionRole1608725325272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `UQ_48ce552495d14eae9b187bb6716` ON `permissions`',
    );
    await queryRunner.query(
      'CREATE TABLE `roles_permissions_permissions` (`rolesId` varchar(36) NOT NULL, `permissionsId` varchar(36) NOT NULL, INDEX `IDX_dc2b9d46195bb3ed28abbf7c9e` (`rolesId`), INDEX `IDX_fd4d5d4c7f7ff16c57549b72c6` (`permissionsId`), PRIMARY KEY (`rolesId`, `permissionsId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permissions_permissions` ADD CONSTRAINT `FK_dc2b9d46195bb3ed28abbf7c9e3` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permissions_permissions` ADD CONSTRAINT `FK_fd4d5d4c7f7ff16c57549b72c6f` FOREIGN KEY (`permissionsId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `roles_permissions_permissions` DROP FOREIGN KEY `FK_fd4d5d4c7f7ff16c57549b72c6f`',
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permissions_permissions` DROP FOREIGN KEY `FK_dc2b9d46195bb3ed28abbf7c9e3`',
    );
    await queryRunner.query('DROP TABLE `roles_permissions_permissions`');

    await queryRunner.query(
      'CREATE UNIQUE INDEX `UQ_48ce552495d14eae9b187bb6716` ON `permissions` (`name`)',
    );
  }
}
