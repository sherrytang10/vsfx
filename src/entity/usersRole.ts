import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Users } from './users';
@Entity('users_role')
export class UsersRole {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar', { length: 12 })
    name: string;
    @Column('int', { default: 1, comment: '1可用，0禁用' })
    disabled: number;
}