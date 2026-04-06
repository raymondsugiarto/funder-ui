export interface ContractFormDto {
  contractCode: string;
  funderId: string;
  disbursementAt: Date;
  amount: number | null;
  duration: number | null;
  returnPercentage: number | null;
  attachFile: File | null;
  notes: string;
}
export interface ContractResponse {
  id: string;
  contractNumber: string;
  contractCode: string;
  funderId: string;
  disbursementAt: string;
  amount: number;
  duration: number;
  returnPercentage: number;
  returnAmount: number;
  attachFile: string;
  notes: string;
}
