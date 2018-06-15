import {IsNotEmpty, IsString} from 'class-validator';

export class CreateAsnReadModel {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly text: string;
}