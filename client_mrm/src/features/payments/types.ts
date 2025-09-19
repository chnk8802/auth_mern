export type Payment = {
  _id: string;
  paymentCode: string;
  paymentType: "customer" | "supplier"; 
  customer?: string; 
  supplier?: string; 
  paymentEntries: string[]; 
  totalAmount: number; 
  paymentMethod: "cash" | "card" | "bank_transfer" | "upi";
  createdAt: string;
  updatedAt: string;
  displayName: string;
};
