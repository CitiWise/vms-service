import moment from "moment";
import { Between, In, Like, SelectQueryBuilder } from "typeorm";
import _ from "lodash";
import { DBConnection } from "../../typeorm/dbCreateConnection";
import { VMSValuation } from "../../typeorm/entities";
import { EValuationSortByOptions } from "../../types/valuation";
import { logger } from "../logger";
const convertIstToUtc = (date, createNewIfFalsy = false) => {
  if (date) {
    return new Date(moment(date).subtract(5.5, "hours").valueOf());
  }
  if (createNewIfFalsy) {
    return new Date(moment().subtract(5.5, "hours").valueOf());
  }
  return date;
};
const convertUtcToIst = (date, createNewIfFalsy = false) => {
  if (date) {
    return new Date(moment(date).add(5.5, "hours").valueOf());
  }
  if (createNewIfFalsy) {
    return new Date(moment().add(5.5, "hours").valueOf());
  }

  return date;
};
export const transformer = {
  // called when using save or find operator
  to: (value) => {
    if (
      typeof value === "undefined" ||
      value instanceof Date ||
      typeof value === "string"
    ) {
      return convertIstToUtc(value, true);
    }

    if (typeof value === "object") {
      const val = value?._value;
      if (Array.isArray(val)) {
        // val will be of an array of date object
        // change all date to utc before saving in db
        val.forEach((t, index) => {
          val[index] = convertIstToUtc(t);
        });

        return value;
      }

      if (typeof val === "string" || val instanceof Date) {
        value._value = convertIstToUtc(val);
        return value;
      }
    }

    logger.warn(`this is unhandled case ${JSON.stringify(value)}`);
    return value;
  },

  // called when retriving data to format it
  from: (value: Date | null | undefined): Date | null | undefined => {
    return convertUtcToIst(value);
  },
};
interface IOrderReqQueryResponse {
  query: SelectQueryBuilder<VMSValuation>;
}
/**
 * create a query with complex where, pagination, sortBy etc.
 * @param req 
 * @returns 
 */
export function getValuationQuery(req){
  try {
    const { VMSDataSource } = DBConnection;
    const VMSValuationRepository = () =>
      VMSDataSource.getRepository(VMSValuation);
    /**
     * We need to fetch applicantPhone and applicantName because it needs to passed
     * seperately to queryBuilder as they are not attributes of VMSValuation but are attributes
     * of propertyAddress which is fetched using leftJoin
     */
    let { searchValue } = req.where;
    const { searchOptionType } = req.where;
    // to know if we don't need to add searchOptionType into valuationRequestBody
    let addOptionsToOrderRequest: boolean = true;
    const applicantPhone =
      searchOptionType === "applicantPhone" ? req.where.searchValue : null;
    const applicantName =
      searchOptionType === "applicantName" ? req.where.searchValue : null;

    // we do not want values related to pincode and state to be passed further
    if (applicantPhone || applicantName) {
      delete req.where.searchOptionType;
      delete req.where.searchValue;
      addOptionsToOrderRequest = false;
    }

    // default return 1 month worth of orders
    let start = new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toISOString();
    let end = new Date().toISOString();

    if (req.where.startDate && req.where.endDate) {
      // parse date string to make query
      const { startDate, endDate } = req.where;

      // added 5.5 hrs to incorporate date range
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = moment(endDate)
        .add(5.5, "hours")
        .endOf("day")
        .toISOString();

      start = formattedStartDate;
      end = formattedEndDate;

      

      req.where.createdAt =
        startDate && endDate
          ? Between(formattedStartDate, formattedEndDate)
          : formattedStartDate;
    } else {
      // req.where.createdAt = Between(start, end);
    }
    delete req.where.startDate;
    delete req.where.endDate;
    logger.info(`!!!!userType!!!!! ${req.userType}`);
    logger.info(`!!!!userId!!!!! ${req.userId}`);

    const { status } = req.where;

    if (addOptionsToOrderRequest) {
      if (searchOptionType) {
        if (searchValue) {
          searchValue = searchValue.replace(/\s/g, "");
          // if there is no ',' we will apply LIKE else we will apply IN
          req.where[searchOptionType] =
            searchValue.indexOf(",") === -1
              ? Like(`%${searchValue}%`)
              : In(searchValue.split(","));

          delete req.where.searchValue;
        }
        delete req.where.searchOptionType;
      }
    }

    const valuationRequestBody = {
      where: { ...req.where, ...(status?.length && { status: In(status) }) },
      sortBy: req.sortBy || {},
      pagination: req.pagination || {
        records: 10,
        pageNumber: 1,
      },
    };

    // convert request body pagination to typeorm query parameters
    const pagination = {
      // number of records
      take: valuationRequestBody.pagination.records,
      // paginate index
      skip:
        valuationRequestBody.pagination.records *
        (valuationRequestBody.pagination.pageNumber - 1),
    };

    const sort = {};

    if (!EValuationSortByOptions[valuationRequestBody.sortBy.order]) {
      throw new Error(
        `Sorting on ${valuationRequestBody.sortBy.order} not allowed`
      );
    }

    if (valuationRequestBody.sortBy.by && valuationRequestBody.sortBy.order) {
      const orderByField = String(valuationRequestBody.sortBy.order);
      const by = String(valuationRequestBody.sortBy.by);

      sort[`VMSValuation.${EValuationSortByOptions[orderByField]}`] = by;
    }

    const query = VMSValuationRepository()
      .createQueryBuilder("VMSValuation")
      .leftJoinAndSelect("VMSValuation.propertyAddress", "propertyAddress");

    query.where(valuationRequestBody.where);

    if (applicantPhone || applicantName) {
      let fieldName = applicantPhone ? applicantPhone : applicantName;

      // if last element is ',' we need to remove it from last
      if (fieldName.slice(-1) === ",") {
        fieldName = fieldName.slice(0, -1);
      }

      fieldName = fieldName.replace(/\s/g, "");
      const columnName = applicantPhone ? "phone" : "name";

      if (fieldName.indexOf(",") === -1) {
        query.andWhere(`propertyAddress.${columnName} LIKE :field `, {
          field: `%${fieldName}%`,
        });
      } else {
        const searchSubStr = String(fieldName).split(",");
        query.andWhere(`propertyAddress.${columnName} IN (:inString)`, {
          inString: searchSubStr,
        });
      }
    }

    const take = Number(pagination.take);
    if (!isNaN(take)) {
      query.take(take);
    }
    const skip = Number(pagination.skip);
    if (!isNaN(skip)) {
      query.skip(skip);
    }
    if (!_.isEmpty(sort)) {
      query.orderBy({ ...sort });
    }

    query.withDeleted();
    return { query };
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
