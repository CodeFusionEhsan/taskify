export type LineItem = {
  description: string;
  quantity: number;
  rate: number;
  tax?: number;
  discount?: number;
};

export type InvoiceFormData = {
  companyName: string;
  companyAddress: string;
  companyPhone?: string;
  companyEmail: string;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  clientPhone?: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms?: string;
  items: LineItem[];
  globalTax?: number;
  globalDiscount?: number;
  shipping?: number;
  notes?: string;
  paymentDetails?: string;
  currency: string;
};
