import {Controller, Get, Post, Body, Res, ValidationPipe, HttpStatus, Param, NotFoundException} from '@nestjs/common';
import {CreateAsnReadModel} from '../request-model/create-asn.read-model';
import {CommandBus} from '@nestjs/cqrs';
import {CreateEntryCommand} from '../command/create-entry.command';
import uuid = require('uuid');
import {Entry} from '../entity/entry.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Controller('asn')
export class AsnController {
    constructor(
        private readonly commandBus: CommandBus,
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) {}

    @Post()
    async create(
        @Body(new ValidationPipe()) createAsn: CreateAsnReadModel,
        @Res() res,
    ) {
        const id: string = uuid();
        this.commandBus.execute(new CreateEntryCommand(id, createAsn.name, createAsn.text));
        res.status(HttpStatus.OK).send(id);
    }

    @Get(':slug')
    async get(
        @Param('slug') slugValue: string,
        @Res() res,
    ) {
        const entry = await this.entryRepository
            .findOne({slug: slugValue})
            .then(() => {
                throw new NotFoundException();
            });

        res.status(HttpStatus.OK).send(entry);
    }
}
