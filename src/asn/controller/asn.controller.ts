import {Controller, Get, Post, Body, Res, ValidationPipe, HttpStatus} from '@nestjs/common';
import {CreateAsnReadModel} from '../request-model/create-asn.read-model';
import {CommandBus} from '@nestjs/cqrs';
import {CreateEntryCommand} from '../command/create-entry.command';
import uuid = require('uuid');

@Controller('asn')
export class AsnController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async create(
        @Body(new ValidationPipe()) createAsn: CreateAsnReadModel,
        @Res() res,
    ) {
        const id: string = uuid();
        this.commandBus.execute(new CreateEntryCommand(id, createAsn.name, createAsn.text));
        res.status(HttpStatus.OK).send(id);
    }
}
