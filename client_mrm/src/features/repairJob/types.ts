import type { Customer } from "../customers/types";
import type { User } from "../users/types";

export type PaymentDetails = {
    paymentStatus: "unpaid" | "paid" | "partial";
    amountReceived?: number | null;
    amountDue?: number | null;
};

export type RepairJob = {
    _id: string;
    repairJobCode: string;
    repairStatus: "pending" | "in_progress" | "completed" | "picked" | string;
    customer: Customer;
    deviceModel?: string;
    deviceIMEI?: string;
    issueDescription?: string;
    repairType: "Hardware" | "Software" | string;
    technician?: User;
    deviceComponents?: string[];
    spareParts: (string | SparePartEntry)[];
    repairCost?: number | null;
    discount?: number | null;
    totalSparePartsCost?: number | null;
    totalReceivable?: number | null;
    profit?: number | null;
    paymentDetails?: PaymentDetails;
    notes?: string;
    pickedAt?: string;
    createdAt: string;
    updatedAt: string;
};

export type SparePartEntry = {
    _id: string;
    name: string;
    unitCost: number;
};
