export interface DashboardResponse {
  // Total Seluruh Dana
  totalAmount: number;
  // Data Pokok Yang Sudah Cair
  totalAmountDisbursed: number;

  // Total Seluruh Return
  totalReturnAmount: number;

  // Total Return Yang Sudah Diterima
  totalReturnAmountReceived: number;

  // Total Return Yang Belum Diterima
  totalReturnAmountPending: number;
}
