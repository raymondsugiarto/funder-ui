import type { ContractPaymentDto } from './types/contract-payment';

export const contractPaymentDto: ContractPaymentDto = {
  id: '',
  funderId: '',
  contractId: '',
  paymentAt: new Date(),
  paymentAmount: '',
  attachFile: null,
  notes: '',
};
