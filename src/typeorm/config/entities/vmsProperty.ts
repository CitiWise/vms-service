import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { transformer } from "../../../utils/helper/helper";

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
    name: "govt_property_address",
    type: "text",
    nullable: false,
  })
  govtPropertyAddress?: string;

  @Column({
    name: "applicant_id",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  applicantId?: string;

  @Column({
    name: "owner_id",
    length: 36,
    type: "varchar",
    nullable: false,
  })
  ownerId?: string;

//   Address(property);
  @Column({
    name: "property_address",
    type: "text",
    nullable: true,
  })
  propertyAddress?: string;

  @Column({
    name: "Satellite_image",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  satelliteImage?: string;

  @Column({
    name: "property_images",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  propertyImages?: string;

  @Column({
    name: "approved_plan_no",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  approvedPlanNo?: string;

  @Column({
    name: "final_cost_of_property",
    type: "int",
    nullable: true,
  })
  finalCostOfProperty?: string;

  @Column({
    name: "market_value",
    type: "int",
    nullable: true,
  })
  marketValue?: string;

  @Column({
    name: "government_valuation",
    type: "int",
    nullable: true,
  })
  governmentValuation?: string;

  @Column({
    name: "distress_sale_value",
    type: "int",
    nullable: true,
  })
  distressSaleValue?: string;

  @Column({
    name: "realizable_sale_value",
    type: "int",
    nullable: true,
  })
  realizableSaleValue?: string;

  @Column({
    name: "fair_market_valuation",
    type: "int",
    nullable: true,
  })
  fairMarketValuation?: string;

  @Column({
    name: "fair_market_value",
    type: "int",
    nullable: true,
  })
  fairMarketValue?: string;

  @Column({
    name: "rental_value_per_month",
    type: "int",
    nullable: true,
  })
  rentalValuePerMonth?: string;

  // Range of market rate of properties in the locality. (range)

  @Column({
    name: "applicable_rate_for_property",
    type: "int",
    nullable: true,
  })
  applicableRateForProperty?: string;

  @Column({
    name: "government_valuation_in_brief",
    type: "text",
    nullable: true,
  })
  governmentValuationInBrief?: string;

  @Column({
    name: "property_type",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  propertyType?: string;

  @Column({
    name: "current_use_of_the_property",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  currentUseOfTheProperty?: string;

  // Type of Ownership (......)
  @Column({
    name: "type_of_ownership",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  typeOfOwnership?: string;

  @Column({
    name: "land_area_by_applicant",
    type: "int",
    nullable: true,
  })
  landAreaByApplicant?: string;

  @Column({
    name: "land_area",
    type: "int",
    nullable: true,
  })
  landArea?: string;

  @Column({
    name: "land_area_unit",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  landAreaUnit?: string;

  @Column({
    name: "year_built",
    type: "int",
    nullable: true,
  })
  yearBuilt?: string;

  @Column({
    name: "residual_age-of_the_property",
    type: "int",
    nullable: true,
  })
  residualAgeOfTheProperty?: string;

  @Column({
    name: "other_descriptive_details",
    type: "text",
    nullable: true,
  })
  otherDescriptiveDetails?: string;

  @Column({
    name: "no_of_floor_in_the_building",
    type: "int",
    nullable: true,
  })
  noOfFloorInTheBuilding?: string;

  @Column({
    name: "no_of_basements",
    type: "int",
    nullable: true,
  })
  noOfBasements?: string;

  @Column({
    name: "floor_of_property_location",
    type: "int",
    nullable: true,
  })
  floorOfPropertyLocation?: string;

  @Column({
    name: "sanctioned_plans_of_the_property",
    type: "varchar",
    nullable: true,
  })
  sanctionedPlansOfTheProperty?: string;

  @Column({
    name: "construction_plan",
    type: "varchar",
    nullable: true,
  })
  constructionPlan?: string;

  @Column({
    name: "demolition_risk",
    type: "boolean",
    nullable: true,
  })
  demolitionRisk?: string;

  @Column({
    name: "structural_soundness_of_the_property",
    type: "boolean",
    nullable: true,
  })
  structuralSoundnessOfTheProperty?: string;

  @Column({
    name: "is_the_property_ready",
    type: "boolean",
    nullable: true,
  })
  isThePropertyReady?: string;

  @Column({
    name: "occupancy_status",
    type: "boolean",
    nullable: true,
  })
  occupancyStatus?: string;

  @Column({
    name: "stage_of_completion",
    type: "text",
    nullable: true,
  })
  stageOfCompletion?: string;

  @Column({
    name: "neighbourhood_classification",
    type: "text",
    nullable: true,
  })
  neighbourhoodClassification?: string;

  @Column({
    name: "type_of_locality",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  typeOfLocality?: string;

  @Column({
    name: "specification_of_boundaries ",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  specificationOfBoundaries?: string;

  @Column({
    name: "nearby_facilities",
    type: "text",
    nullable: true,
  })
  nearbyFacilities?: string;

  @Column({
    name: "encroachment_of_industry",
    type: "text",
    nullable: true,
  })
  encroachmentOfIndustry?: string;

  @Column({
    name: "adverse_features",
    type: "text",
    nullable: true,
  })
  adverseFeatures?: string;

  @Column({
    name: "finish_used",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  finishUsed?: string;

  @Column({
    name: "level_of_maintenance",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  level_of_maintenance?: string;

  // whether it is from the builder or society.
  @Column({
    name: "is_in_society",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  isInSociety?: string;

  @Column({
    name: "floor_wise_area",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  floorWiseArea?: string;

  // As per measurement (Actual, Document)
  @Column({
    name: "as_per_measurement",
    length: 36,
    type: "varchar",
    nullable: true,
  })
  asPerMeasurement?: string;
}
