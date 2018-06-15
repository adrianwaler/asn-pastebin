import {Entry} from '../entity/entry.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class EntryFactory {

    public create(id: string, title: string, text: string): Entry
    {
        const entry: Entry = new Entry();
        entry.id = id;
        entry.text = text;
        entry.title = title;
        entry.slug = Math.random().toString(36).substring(2);

        return entry;
    }
}
