import {Module, OnModuleInit} from '@nestjs/common';
import {CreateEntryCommandHandler} from './command-handler/create-entry.command-handler';
import {CommandBus, CQRSModule} from '@nestjs/cqrs';
import {ModuleRef} from '@nestjs/core';
import {AsnController} from './controller/asn.controller';
import {Entry} from './entity/entry.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Ip} from './entity/ip.entity';
import {EntryFactory} from './factory/entry.factory';

export const CommandHandlers = [CreateEntryCommandHandler];

@Module({
    imports: [CQRSModule, TypeOrmModule.forFeature([Entry, Ip])],
    controllers: [AsnController],
    providers: [
        ...CommandHandlers,
        EntryFactory,
    ],
})
export class AsnModule implements OnModuleInit {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
    ) {}

    onModuleInit(): any {
        this.command$.setModuleRef(this.moduleRef);

        this.command$.register(CommandHandlers);
    }
}
