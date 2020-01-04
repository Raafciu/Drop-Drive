import {Note} from './note';
import {ReportStatusEnum} from '../../enums/reportStatusEnum';

export class Report {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  status: ReportStatusEnum;
  prority: number;
  expirationDateTime: Date;
  notes: Set<Note>;
  clientReported: string;
}
