import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { transformer } from "../../../utils/helper/helper";
import { VMSAddress } from "./vmsAddress";

export class VMSProperty {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    name: "created_at",
    transformer: transformer,
  })
  createdAt: any;

  @UpdateDateColumn({
    name: "updated_at",
    transformer: transformer,
  })
  updatedAt: any;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date | null;

  @Column({
    name: "applicant_id",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  applicantId?: string;

  @Column({
    name: "lender_id",
    length: 36,
    type: "varchar",
    nullable: false,
  })
  lenderId?: string;

  @Column({
    name: "valuer_id",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  valuerId?: string;

  @Column({
    name: "propery_id",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  properyId?: string;

  @Column({
    name: "status",
    type: "varchar",
    length: 36,
    nullable: false,
  })
  status?: string;

  @Column({
    name: "date_of_valuation",
    type: "varchar",
    length: 36,
    nullable: true,
  })
  dateOfValuation?: string;

  @Column({
    name: "subject",
    type: "text",
    nullable: true,
  })
  subject?: string;


  @Column({
    name: "address_id",
    length: 36,
    type: "varchar",
    nullable: false,
  })
  addressId?: string;
  @OneToOne(() => VMSAddress, {
    createForeignKeyConstraints: false
})
@JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
customerAddress: VMSAddress;

@Column({
    name: "valuationReportUrl",
    type: "varchar",
    length: 200,
    nullable: true,
  })
  valuationReportUrl?: string;



}
