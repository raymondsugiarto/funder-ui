export interface FunderDto {
  id: string;
  name: string;
  phoneNumber: string;
  password: string;
  funderIdParent?: string;
}

export interface FunderResponse {
  id: string;
  name: string;
  phoneNumber: string;
  funderIdParent?: string;
}
