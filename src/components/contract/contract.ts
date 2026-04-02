import type { ContractFormDto } from './types/contract';

export const contractFormDto: ContractFormDto = {
  searchDate: new Date(),
  nominal: null,
  tenor: null,
  returnPercentPerMonth: null,
  attachFile: null,
  description: '',
};
