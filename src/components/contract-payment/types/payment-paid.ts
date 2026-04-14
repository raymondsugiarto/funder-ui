import type { RangeDateDto } from 'src/types/range-date';

export interface PaymentPaidFilter {
  funderId: string;
  paymentAtRange: RangeDateDto;
}

export interface PaymentPaidResponse {
  id: string;
  contractNumber: string;
  contractCode: string;
  funderId: string;
  disbursementAt: string;
  amount: number;
  duration: number;
  dueDate: number;
  returnPercentage: number;
  returnAmount: number;
  attachFile: string;
  notes: string;
}
