import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
@Entity('test')
export class Test {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('enum', { enum: ['男', '女'] })
    sex: number;
    disabled: number;
    @Column('timestamp', { comment: '修改时间' })
    updateDate: Date;
    @Column('datetime', { comment: '创建时间时间' })
    createDate: Date;
}