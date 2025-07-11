export type PaymentStatusOption = {
label: string,
value: string
}

export const PaymentStatus: PaymentStatusOption[] = [
    {label: "Unpaid", value: "unpaid"},
    {label: "Paid", value: "paid"},
    {label: "Partial", value: "partial"},
]