export interface SparePart {
  _id: string;
  partCode: string;
  brand?: string;
  model?: string;
  partName?: string;
  partType?: string;
  costPrice?: number;
  stockQty: number;
  supplier?: string;
  createdAt: string;
  updatedAt: string;
}
