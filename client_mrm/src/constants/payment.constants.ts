export type PaymentOption = {
  label: string;
  value: string;
};

export const PAYMENT_METHODS: PaymentOption[] = [
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
  { label: "UPI", value: "upi" },
  { label: "Bank Transfer", value: "bank_transfer" },
];

export const PAYMENT_TYPE: PaymentOption[] = [
  { label: "Receivable", value: "receivable" },
  { label: "Payable", value: "payable" },
];

export type PaymentStatusOption = {
  label: string;
  value: string;
};

export const PAYMENT_STATUSES: PaymentStatusOption[] = [
  { label: "Unpaid", value: "unpaid" },
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
];
