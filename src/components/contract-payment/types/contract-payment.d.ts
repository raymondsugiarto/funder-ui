export interface ContractPaymentDto {
  funderId: string;
  contractId: string;
  paymentAt: Date;
  paymentAmount: string;
  attachFile: File | null;
  notes: string;
}

export interface ContractPaymentResponse {
  id: string;
  contractId: string;
  paymentAt: string;
  paymentAmount: string;
  attachFile: File | null;
  notes: string;
}
