import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesModule } from './modules/nodes/nodes.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from "./config/database.config";
console.log(dbConfiguration)
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfiguration()),
    NodesModule,
    PropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
