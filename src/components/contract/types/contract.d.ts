export interface ContractFormDto {
  searchDate: Date;
  nominal: number | null;
  tenor: number | null;
  returnPercentPerMonth: number | null;
  attachFile: File | null;
  description: string;
}

export interface ContractResponse {
  id: string;
  searchDate: string;
  nominal: number;
  tenor: number;
  returnPercentPerMonth: number;
  attachFile: string;
  description: string;
}
