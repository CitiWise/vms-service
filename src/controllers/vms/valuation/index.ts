import { logger } from "../../../utils/logger";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { VMSAddress, VMSValuation } from "../../../typeorm/entities";
import { DBConnection } from "../../../typeorm/dbCreateConnection";
import { EValuationStatus } from "../../../utils/constants/enums";

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
  async createValuationRequest(request, response) {
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

  async getValuationRequest(request, response) {}
}
export const ValuationController = new ValuationControllerRoot();
