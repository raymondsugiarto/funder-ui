import type { FunderDto, FunderResponse } from 'src/components/funder/types/funder';

export interface ContractFormDto {
  id?: string;
  contractCode: string;
  funderId: string;
  disbursementAt: Date;
  dueDate: Date;
  destinationAccount: string;
  amount: number | null;
  duration: number | null;
  returnPercentage: number | null;
  attachFile: File | null;
  notes: string;
  funder?: FunderDto;
}
export interface ContractResponse {
  id: string;
  contractNumber: string;
  contractCode: string;
  funderId: string;
  disbursementAt: string;
  amount: number;
  dueDate: Date;
  destinationAccount: string;
  duration: number;
  returnPercentage: number;
  returnAmount: number;
  attachFile: string;
  notes: string;
  funder: FunderResponse;
}
