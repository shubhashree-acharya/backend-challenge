import { DataSource } from 'typeorm';
import { NODES_LIST } from '../data/nodes.seeders';
import { PROPERTIES_LIST } from '../data/properties.seeders';

export async function seedData(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const nodesList = NODES_LIST;
    for (const node of nodesList) {
      let parentId = node.parentId ? node.parentId : null;

      // Insert node using raw SQL
      await queryRunner.query(
        `INSERT IGNORE INTO nodes (id,name,mpath, parentId) VALUES (?, ?, ?, ?)`,
        [node.id, node.name, node.mpath, node.parentId],
      );
    }

    const propertiesList = PROPERTIES_LIST;
    for (const property of propertiesList) {
      // Insert property using raw SQL
      await queryRunner.query(
        'INSERT IGNORE INTO properties (id,`key`, `value`, `nodeId`) VALUES (?,?, ?, ?)',
        [property.id, property.key, property.value, property.nodeId],
      );
    }

    await queryRunner.commitTransaction();
    console.log('Seeding completed!');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error seeding data:', error);
  } finally {
    await queryRunner.release();
  }
}
