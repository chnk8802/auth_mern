export type PaymentStatusOption = {
label: string,
value: string
}

export const PAYMENT_STATUSES: PaymentStatusOption[] = [
    {label: "Unpaid", value: "unpaid"},
    {label: "Paid", value: "paid"},
    {label: "Partial", value: "partial"},
]