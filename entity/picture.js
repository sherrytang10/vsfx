import { Table, Column, PrimaryGeneratedColumn } from '../lib/@common';
@Table('picture')
export class Picture {
    @PrimaryGeneratedColumn()
    id;
    @Column()
    imgUrl;
    @Column()
    alt;
}