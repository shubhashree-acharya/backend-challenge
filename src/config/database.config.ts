import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";


export default (): TypeOrmModuleOptions => {
    return {
        type: 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: +(process.env.DATABASE_PORT || 3306),
        username: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || '',
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: true,
    }
}