import { Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('int', { default: 1, comment: '1可用，0禁用' })
    disabled: number;
    @Column('timestamp', { comment: '修改时间' })
    updateDate: Date;
    @Column('datetime', { comment: '创建时间时间' })
    createDate: Date;
}