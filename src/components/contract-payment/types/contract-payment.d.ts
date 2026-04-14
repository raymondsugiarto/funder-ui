import type { ContractResponse } from 'src/components/contract/types/contract';
import type { FunderDto } from 'src/components/funder/types/funder';

export interface ContractPaymentDto {
  id: string;
  funderId: string;
  contractId: string;
  paymentAt: Date;
  paymentAmount: string;
  attachFile: File | null;
  notes: string;
  contract?: ContractResponse;
  funder?: FunderDto;
}

export interface ContractPaymentResponse {
  id: string;
  contractId: string;
  paymentAt: string;
  paymentAmount: string;
  attachFile: File | null;
  notes: string;
  contract: ContractResponse;
}
