import { logger } from "../../../utils/logger";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from 'express';
import { VMSAddress, VMSValuation } from "../../../typeorm/entities";
import { DBConnection } from "../../../typeorm/dbCreateConnection";
import { EValuationStatus } from "../../../utils/constants/enums";
import { In } from "typeorm";
import { getValuationQuery } from "../../../utils/helper/helper";

export class ValuationControllerRoot {
  private static instance: ValuationControllerRoot;
  static get(): ValuationControllerRoot {
    if (!ValuationControllerRoot.instance) {
      return new ValuationControllerRoot();
    }

    return ValuationControllerRoot.instance;
  }
  /**
   * generate a valuation request (from lender)
   * @param request
   * @param response
   * @returns
   */
  async createValuationRequest(request:Request, response:Response) {
    const valuationRequestBody: any = request.body.data;

    if (!valuationRequestBody) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "valuation data not available" });
    }
    try {
      const { VMSDataSource } = DBConnection;
      const applicantAddressId = uuidv4();
      let applicantAddress: Partial<VMSAddress> = (({
        firstName,
        lastName,
        phone,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      }) => {
        return {
          id: applicantAddressId,
          firstName,
          lastName,
          phone,
          email,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
        };
      })(valuationRequestBody);
      const ss = await VMSDataSource.getRepository(VMSAddress).save(
        applicantAddress
      );

      const valuation: Partial<VMSValuation> = (({
        referenceNumber,
        surveyNumber,
        remarks,
      }) => {
        return {
          lenderId: _.get(request, "user.id"),
          referenceNumber,
          surveyNumber,
          remarks,
          addressId: applicantAddressId,
          status: EValuationStatus.WAITING_FOR_PAYMENT,
        };
      })(valuationRequestBody);
      await VMSDataSource.getRepository(VMSValuation).save(valuation);
      return response
        .status(StatusCodes.OK)
        .send({ status: true, message: "Valuation Request Generated" });
    } catch (error: any) {
      logger.error(`createValuation - VMS ${error}`);
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
/**
 * find valuations
 * @param request 
 * @param response 
 * @returns 
 */
  async getValuationRequest(request:Request, response:Response) {
    try {

      
      if (!request.body.where) {
        // where is a required field
        throw new Error("where is required in request body");
      }

      console.log(request.body.where)

      if (typeof request.body.where !== "object") {
        throw new Error("where is invalid ");
      }

      const {VMSDataSource} = DBConnection;
      const [valuations, count] = await VMSDataSource.getRepository(VMSValuation).findAndCount({
        where: {
          lenderId : "b9244141-32d8-4c1b-91e1-60e7512536eb"
        },
        relations: ['propertyAddress']
      })

      // const findRequest = {
      //   where: {
      //     startDate: request.body.where.startDate,
      //     endDate: request.body.where.endDate,
      //   },
      // };

      // const entityField =
      //   _.get(request, "user.userType") === "lender" ? "lenderId" : "valuerId";

      // findRequest.where["lenderId"] = "b9244141-32d8-4c1b-91e1-60e7512536eb";

      // findRequest[`userType`] = _.get(request, "user.userType");
      // findRequest[`userId`] = _.get(request, "user.id");

      // const { status, searchOptionType, searchValue } = request.body.where;

      // if (status) {
      //   findRequest.where[`status`] = In(String(status).split(","));
      // }

      // const { pagination, sortBy } = request.body;

      // findRequest[`pagination`] = pagination;
      // findRequest[`sortBy`] = sortBy;

      // if (searchValue) {
      //   findRequest.where[`searchValue`] = searchValue;
      //   findRequest.where[`searchOptionType`] = searchOptionType;
      // }
      // console.log(1);
      // const { query } = getValuationQuery(findRequest);

      // const [valuations, count] = query.getManyAndCount();
      console.log(valuations);
      return response.status(StatusCodes.OK).send({
        status: true,
        valuations,
        count,
      });
    } catch (error: any) {
      logger.error(`findValuations - VMS ${error}`);
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}
export const ValuationController = new ValuationControllerRoot();
