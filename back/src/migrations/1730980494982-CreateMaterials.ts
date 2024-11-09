import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMaterials1730980494982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materials',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'quantity', type: 'int', isNullable: false },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'service_id', type: 'int', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('materials');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('service_id') !== -1,
    );
    await queryRunner.dropForeignKey('materials', foreignKey);
    await queryRunner.dropTable('materials');
  }
}
