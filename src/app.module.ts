import { Module } from '@nestjs/common';
import {AsnModule} from './asn/asn.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

@Module({
  imports: [
      AsnModule,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'db',
          port: null,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          debug: true,
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
