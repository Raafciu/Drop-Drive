import {ReportStatusEnum} from './reportStatusEnum';
import {Note} from './note';

export class Report {
  id: string;
  name: string;
  description: string;
  status: ReportStatusEnum;
  prority: number;
  expirationDateTime: Date;
  notes: Set<Note>;
}
