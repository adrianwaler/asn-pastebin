import {ICommand} from '@nestjs/cqrs';

export class CreateEntryCommand implements ICommand
{
    constructor(
        public readonly id,
        public readonly title,
        public readonly text,
    ) {}
}
