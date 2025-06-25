'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import type { InvoiceFormData, LineItem } from '@/types/invoice';

import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

export default function InvoiceFormPage() {
  const [formData, setFormData] = useState<InvoiceFormData>({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientPhone: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    paymentTerms: '',
    items: [
      { description: '', quantity: 1, rate: 0, tax: undefined, discount: undefined }
    ],
    globalTax: undefined,
    globalDiscount: undefined,
    shipping: undefined,
    notes: '',
    paymentDetails: '',
    currency: 'USD',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'globalTax' || name === 'globalDiscount' || name === 'shipping'
          ? value === '' ? undefined : Number(value)
          : value,
    }));
  };

  const handleItemChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === 'description' ||
      name === 'quantity' ||
      name === 'rate' ||
      name === 'tax' ||
      name === 'discount'
    ) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        [name]: name === 'description'
          ? value
          : value === '' ? undefined : Number(value),
      };
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, rate: 0, tax: undefined, discount: undefined }
      ]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Download PDF after receiving from API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        alert('Failed to generate invoice PDF.');
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${formData.invoiceNumber || 'generated'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      window.location.reload()
    } catch (error) {
      alert('Error generating invoice PDF.');
    }
  };

  return (
    <div className={`${jost.className} min-h-screen bg-gray-50 text-gray-900 w-full`}>
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 text-center sm:px-12 md:px-24 lg:px-32">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-500">
          Generate invoices easily with Taskify Invoice Generator
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Create professional invoices quickly and effortlessly.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business & Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Company</h2>
              <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <input type="text" name="companyAddress" placeholder="Address" value={formData.companyAddress} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <input type="tel" name="companyPhone" placeholder="Phone (optional)" value={formData.companyPhone} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="email" name="companyEmail" placeholder="Email" value={formData.companyEmail} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Client Details</h2>
              <input type="text" name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <input type="email" name="clientEmail" placeholder="Client Email" value={formData.clientEmail} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <input type="text" name="clientAddress" placeholder="Client Address (optional)" value={formData.clientAddress} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="tel" name="clientPhone" placeholder="Client Phone (optional)" value={formData.clientPhone} onChange={handleChange} className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          {/* Invoice Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={formData.invoiceNumber} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            <input type="date" onKeyDown={() => { return false}} name="issueDate" placeholder="Issue Date" value={formData.issueDate} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            <input onKeyDown={() => { return false}} type="date" name="dueDate" placeholder="Due Date" value={formData.dueDate} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>

          <input type="text" name="paymentTerms" placeholder="Payment Terms (e.g. Net 30, optional)" value={formData.paymentTerms} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          {/* Line Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Line Items</h2>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2" required />
                <input type="number" name="quantity" min={1} placeholder="Qty (e.g. 2)" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                <input type="number" name="rate" min={0} step={0.01} placeholder="Rate (e.g. 100.00)" value={item.rate} onChange={(e) => handleItemChange(index, e)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                <input type="number" name="tax" min={0} max={100} step={0.01} placeholder="Tax % (e.g. 18)" value={item.tax ?? ''} onChange={(e) => handleItemChange(index, e)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="number" name="discount" min={0} max={100} step={0.01} placeholder="Discount % (e.g. 10)" value={item.discount ?? ''} onChange={(e) => handleItemChange(index, e)} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800 font-semibold">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Item</button>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input type="number" name="globalTax" min={0} max={100} step={0.01} placeholder="Global Tax % (e.g. 18)" value={formData.globalTax ?? ''} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="number" name="globalDiscount" min={0} max={100} step={0.01} placeholder="Global Discount % (e.g. 10)" value={formData.globalDiscount ?? ''} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="number" name="shipping" min={0} step={0.01} placeholder="Shipping Fee (e.g. 50.00)" value={formData.shipping ?? ''} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select name="currency" value={formData.currency} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Notes & Payment Details */}
          <textarea name="notes" placeholder="Notes (optional)" value={formData.notes} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={3}></textarea>
          <textarea name="paymentDetails" placeholder="Payment Details (optional)" value={formData.paymentDetails} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={3}></textarea>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Submit Invoice</button>
        </form>
      </section>
    </div>
  );
}
