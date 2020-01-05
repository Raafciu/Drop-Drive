import {ReportStatusEnum} from '../../enums/reportStatusEnum';

export class Report {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  status: ReportStatusEnum;
  prority: number;
  expirationDateTime: string;
  clientReported: string;
}
