import { DateUnitOptions } from 'quasar';

export interface RangeDateDto {
  from: Date;
  to: Date;
}

export interface QSingularRangeDate {
  year: number;
  month: number;
  day: number;
}

export interface RangeDateProps {
  maxDateDiff?: number;
  maxDateDiffUnit?: `${DateUnitOptions}s`;
}
