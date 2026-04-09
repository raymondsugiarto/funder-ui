export interface HistoryFunderFilter {
  funderId: string;
}

export interface HistoryFunderResponse {
  id: string;
  contractNumber: string;
  contractCode: string;
  funderId: string;
  disbursementAt: string;
  amount: number;
  duration: number;
  dueDate: Date;
  returnPercentage: number;
  returnAmount: number;
  attachFile: string;
  notes: string;
  contractPayments?: HistoryFunderPaymentResponse[];
}

export interface HistoryFunderPaymentResponse {
  id: string;
  paymentAt: string;
  paymentAmount: number;
  notes: string;
}
