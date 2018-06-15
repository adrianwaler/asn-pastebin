import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {CreateEntryCommand} from '../command/create-entry.command';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Entry} from '../entity/entry.entity';
import {EntryFactory} from '../factory/entry.factory';

@CommandHandler(CreateEntryCommand)
export class CreateEntryCommandHandler implements ICommandHandler<CreateEntryCommand>
{
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
        private readonly factory: EntryFactory,
    ) {}

    execute(command: CreateEntryCommand, resolve: (value?) => void): any {
        const entry: Entry = this.factory.create(command.id, command.title, command.title);
        this.entryRepository.save(entry);
    }
}
