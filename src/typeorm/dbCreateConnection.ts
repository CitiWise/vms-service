import { DataSource, DataSourceOptions } from "typeorm";
import { logger } from "../utils/logger";
import ormconfig from "./config/ormConfig";

export class DBConnection {
  static VMSDataSource;
  static config: any;

  static async init(config) {
    this.VMSDataSource = new DataSource(config);

    if (!this.VMSDataSource.isInitialized) {
      await this.VMSDataSource.initialize();
      logger.info("New Datasource VMSDataSource made");
    }
  }
}
