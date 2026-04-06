import type { ContractFormDto } from './types/contract';

export const contractFormDto: ContractFormDto = {
  contractCode: '',
  funderId: '',
  disbursementAt: new Date(),
  amount: 0,
  duration: 0,
  returnPercentage: 0,
  attachFile: null,
  notes: '',
};
