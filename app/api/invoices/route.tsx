import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { InvoiceDocument } from '@/components/InvoiceDocument'; // ✅ value import
import type { InvoiceFormData } from '@/types/invoice'; // ✅ type import

export async function POST(req: NextRequest) {
  try {
    const invoice: InvoiceFormData = await req.json();

    // Generate PDF stream
    const pdfStream = await renderToStream(<InvoiceDocument invoice={invoice} />);
    const chunks: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      chunks.push(chunk as Uint8Array);
    }
    const pdfBuffer = Buffer.concat(chunks); // ✅ Only one argument

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice_${invoice.invoiceNumber || 'generated'}.pdf`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate invoice PDF.' }, { status: 500 });
  }
}
