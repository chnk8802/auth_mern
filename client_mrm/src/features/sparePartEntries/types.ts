export interface SparePartEntry {
  _id: string;
  sparePartEntryCode: string;
  repairJob?: string; 
  sourceType?: string; 
  sparePart?: string; 
  externalPartName?: string; 
  supplier?: string;
  unitCost?: number; 
  isPaid?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
