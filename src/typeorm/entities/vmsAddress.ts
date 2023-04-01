import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('vms_address')
export class VMSAddress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @Column({
        name: 'first_name',
        length: 250,
        type: 'varchar',
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        length: 250,
        type: 'varchar',
        nullable: true
    })
    lastName?: string;

    @Column({
        name: 'email',
        length: 250,
        type: 'varchar',
        nullable: true
    })
    email?: string;

    @Column({
        name: 'phone',
        length: 50,
        type: 'varchar',
        nullable: true
    })
    phone?: string;

    @Column({
        name: 'address_type',
        length: 50,
        type: 'varchar',
        nullable: true
    })
    addressType?: string;

    @Column({
        name: 'address_line_1',
        type: 'text',
        nullable: false
    })
    addressLine1: string;

    @Column({
        name: 'address_line_2',
        type: 'text',
        nullable: true
    })
    addressLine2?: string;

    @Column({
        name: 'landmark',
        type: 'text',
        nullable: true
    })
    landmark?: string;

    @Column({
        name: 'city',
        length: 100,
        nullable: false
    })
    city: string;

    @Column({
        name: 'state',
        length: 100,
        nullable: false,
        type: 'varchar'
    })
    state: string;

    @Column({
        name: 'pincode',
        length: 10,
        nullable: false,
        type: 'varchar'
    })
    pincode: string;

    @Column({
        name: 'country',
        length: 100,
        nullable: false,
        type: 'varchar'
    })
    country: string;
}
