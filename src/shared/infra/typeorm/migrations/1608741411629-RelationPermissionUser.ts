import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationPermissionUser1608741411629
  implements MigrationInterface {
  name = 'RelationPermissionUser1608741411629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users_permissions_permissions` (`usersId` varchar(36) NOT NULL, `permissionsId` varchar(36) NOT NULL, INDEX `IDX_b70d6dbde0e342b2afd199490c` (`usersId`), INDEX `IDX_f417b3a2e38339487716aa0742` (`permissionsId`), PRIMARY KEY (`usersId`, `permissionsId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `users_permissions_permissions` ADD CONSTRAINT `FK_b70d6dbde0e342b2afd199490cc` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `users_permissions_permissions` ADD CONSTRAINT `FK_f417b3a2e38339487716aa0742a` FOREIGN KEY (`permissionsId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users_permissions_permissions` DROP FOREIGN KEY `FK_f417b3a2e38339487716aa0742a`',
    );
    await queryRunner.query(
      'ALTER TABLE `users_permissions_permissions` DROP FOREIGN KEY `FK_b70d6dbde0e342b2afd199490cc`',
    );
    await queryRunner.query('DROP TABLE `users_permissions_permissions`');
  }
}
