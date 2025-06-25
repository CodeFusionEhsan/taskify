import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { InvoiceFormData } from '@/types/invoice';

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  table: { flexDirection: 'column', width: 'auto', marginBottom: 10, borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000', },
  row: { flexDirection: 'row' },
  cell: { flex: 1, padding: 4, border: '1pt solid #eee' },
  bold: { fontWeight: 'bold' },
});

export const InvoiceDocument = ({ invoice }: { invoice: InvoiceFormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>From:</Text>
        <Text>{invoice.companyName}</Text>
        <Text>{invoice.companyAddress}</Text>
        {invoice.companyPhone && <Text>{invoice.companyPhone}</Text>}
        <Text>{invoice.companyEmail}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>To:</Text>
        <Text>{invoice.clientName}</Text>
        {invoice.clientAddress && <Text>{invoice.clientAddress}</Text>}
        {invoice.clientPhone && <Text>{invoice.clientPhone}</Text>}
        <Text>{invoice.clientEmail}</Text>
      </View>
      <View style={styles.section}>
        <Text>Invoice #: {invoice.invoiceNumber}</Text>
        <Text>Issue Date: {invoice.issueDate}</Text>
        <Text>Due Date: {invoice.dueDate}</Text>
        {invoice.paymentTerms && <Text>Payment Terms: {invoice.paymentTerms}</Text>}
      </View>
      <View style={styles.table}>
        <View style={[styles.row, styles.bold]}>
          <Text style={styles.cell}>Description</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>Tax %</Text>
          <Text style={styles.cell}>Discount %</Text>
          <Text style={styles.cell}>Amount</Text>
        </View>
        {invoice.items.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text style={styles.cell}>{item.description}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>{item.rate.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.tax !== undefined ? item.tax : '-'}</Text>
            <Text style={styles.cell}>{item.discount !== undefined ? item.discount : '-'}</Text>
            <Text style={styles.cell}>
              {(
                item.quantity * item.rate *
                (1 + ((item.tax ?? 0) / 100)) *
                (1 - ((item.discount ?? 0) / 100))
              ).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text>
          Subtotal: {invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0).toFixed(2)} {invoice.currency}
        </Text>
        {invoice.globalTax !== undefined && <Text>Global Tax: {invoice.globalTax}%</Text>}
        {invoice.globalDiscount !== undefined && <Text>Global Discount: {invoice.globalDiscount}%</Text>}
        {invoice.shipping !== undefined && <Text>Shipping: {invoice.shipping.toFixed(2)} {invoice.currency}</Text>}
        <Text style={styles.bold}>
          Total: {(() => {
            let subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
            let tax = invoice.globalTax !== undefined ? subtotal * (invoice.globalTax / 100) : 0;
            let discount = invoice.globalDiscount !== undefined ? subtotal * (invoice.globalDiscount / 100) : 0;
            let shipping = invoice.shipping ?? 0;
            return (subtotal + tax - discount + shipping).toFixed(2) + ' ' + invoice.currency;
          })()}
        </Text>
      </View>
      {invoice.notes && (
        <View style={styles.section}>
          <Text style={styles.bold}>Notes:</Text>
          <Text>{invoice.notes}</Text>
        </View>
      )}
      {invoice.paymentDetails && (
        <View style={styles.section}>
          <Text style={styles.bold}>Payment Details:</Text>
          <Text>{invoice.paymentDetails}</Text>
        </View>
      )}
    </Page>
  </Document>
);

