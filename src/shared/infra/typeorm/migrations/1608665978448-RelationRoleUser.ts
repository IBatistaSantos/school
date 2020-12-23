import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationRoleUser1608665978448
  implements MigrationInterface {
  name = 'RelationRoleUser1608665978448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `UQ_648e3f5447f725579d7d4ffdfb7` ON `roles`',
    );
    await queryRunner.query(
      'DROP INDEX `UQ_954a4b53f7bc859b195a27e1a77` ON `users`',
    );
    await queryRunner.query(
      'CREATE TABLE `users_roles_roles` (`usersId` varchar(36) NOT NULL, `rolesId` varchar(36) NOT NULL, INDEX `IDX_df951a64f09865171d2d7a502b` (`usersId`), INDEX `IDX_b2f0366aa9349789527e0c36d9` (`rolesId`), PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `users_roles_roles` ADD CONSTRAINT `FK_df951a64f09865171d2d7a502b1` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `users_roles_roles` ADD CONSTRAINT `FK_b2f0366aa9349789527e0c36d97` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users_roles_roles` DROP FOREIGN KEY `FK_b2f0366aa9349789527e0c36d97`',
    );
    await queryRunner.query(
      'ALTER TABLE `users_roles_roles` DROP FOREIGN KEY `FK_df951a64f09865171d2d7a502b1`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_b2f0366aa9349789527e0c36d9` ON `users_roles_roles`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_df951a64f09865171d2d7a502b` ON `users_roles_roles`',
    );
    await queryRunner.query('DROP TABLE `users_roles_roles`');

    await queryRunner.query(
      'CREATE UNIQUE INDEX `UQ_954a4b53f7bc859b195a27e1a77` ON `users` (`CPF`)',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `UQ_648e3f5447f725579d7d4ffdfb7` ON `roles` (`name`)',
    );
  }
}
