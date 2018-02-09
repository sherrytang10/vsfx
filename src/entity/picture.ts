import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity('picture')
export class Picture {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column('varchar', { length: 255 })
    imgUrl: string;
    @Column('varchar', { length: 30 })
    alt: string;
}