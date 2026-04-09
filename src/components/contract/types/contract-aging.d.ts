export interface ContractAgingFilter {
  funderId: string;
}

export interface ContractAgingResponse {
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
