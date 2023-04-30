import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EValuationStatus } from "../../utils/constants/enums";
import { transformer } from "../../utils/helper/helper";
import { VMSAddress } from "./vmsAddress";

@Entity("vms_valuation")
export class VMSValuation {
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
    name: "reference_number",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  referenceNumber?: string;

  @Column({
    name: "survey_number",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  surveyNumber?: string;

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
    type: "enum",
    enum: Object.values(EValuationStatus),
    default: EValuationStatus.WAITING_FOR_PAYMENT,
    nullable: false,
  })
  status?: EValuationStatus;

  @Column({
    name: "date_of_valuation",
    type: "varchar",
    length: 36,
    nullable: true,
  })
  dateOfValuation?: string;

  @Column({
    name: "remarks",
    type: "text",
    nullable: true,
  })
  remarks?: string;

  @Column({
    name: "address_id",
    length: 36,
    type: "varchar",
    nullable: false,
  })
  addressId?: string;

  @Column({
    name: "amount",
    type: "double",
    nullable: false,
    default: 5000,
  })
  amount?: number;

  @OneToOne(() => VMSAddress, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
  propertyAddress: VMSAddress;

  @Column({
    name: "valuationReportUrl",
    type: "varchar",
    length: 200,
    nullable: true,
  })
  valuationReportUrl?: string;
}
