import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Asn} from './dto/asn';
import {Entry} from './entry.entity';

@Entity()
export class Ip
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    isDone: boolean;

    @Column()
    isValid: boolean;

    @ManyToOne(type => Entry, entry => entry.ips)
    entry: Entry;

    @Column({type: 'simple-json'})
    @Reflect.metadata('design:type', Asn)
    asn: Asn;
}
