import {Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Ip} from './ip.entity';

@Entity()
export class Entry
{
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    slug: string;

    @Column()
    isParsed: boolean = false;

    @OneToMany(type => Ip, ip => ip.entry)
    ips: Ip[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    public isFinished(): boolean
    {
        return this.isParsed && this.ips.every(ip => ip.isDone);
    }
}
