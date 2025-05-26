import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { QrCodePix } from "qrcode-pix";
import { content } from "./config/content";
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { tableLayouts } from "./config/stylePdf";
const { vfs } = vfsFonts;
pdfMake.vfs = vfs;

export interface IBoleto {
  receiver: string;
  product: string;
  value: string;
  locationPayment: string;
  payer: string;
  date: string;
  pix: string;
  city: string;
  instrution: string;
  qtyInstallments: string;
}

pdfMake.tableLayouts = tableLayouts

function pageBreakBefore(
  currentNode: { pageNumbers: string | any[]; },
) {
  if (Object.hasOwnProperty.call(currentNode, 'table')) {
    if (currentNode.pageNumbers.length > 1) {
      return true;
    }
  }
  return false;
}

export const download = (data: IBoleto) => {
  const {
    city,
    date: venc,
    instrution,
    locationPayment,
    payer,
    pix,
    product,
    qtyInstallments,
    receiver,
    value,
  } = data

  const date = new Date(venc + "T00:00");
  const dayVenc = date.getDate() > 30 ? 30 : date.getDate();
  let monthVenc = date.getMonth();
  let yearVenc = date.getFullYear()
  const installmentsContent: any[] = [];

  const valor = Number(value.replace(/\./g, "").replace(",", ".").replace(/R\$/, "").trim());

  for (let i = 0; i < +qtyInstallments; i++) {
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1 + i, 0).getDate();
    const dateCur = new Date(
      yearVenc,
      monthVenc,
      lastDate > dayVenc ? dayVenc : lastDate
    );

    if (++monthVenc > 11) {
      monthVenc = 0
      yearVenc++
    }

    const qrCodePix = QrCodePix({
      version: '01',
      key: pix,
      name: receiver,
      city: city,
      transactionId: `${i + 1}de${qtyInstallments}${product.replace(/\s/g, "")}`.substring(0, 25),
      message: `Parcela ${i + 1} de ${qtyInstallments} - ${product}`,
      value: valor
    })
    const rawPixStr = qrCodePix.payload();
    installmentsContent.push(content({
      receiver,
      product,
      value,
      locationPayment,
      payer,
      date: `${String(dateCur.getDate()).padStart(2, "0")}/${String(dateCur.getMonth() + 1).padStart(2, "0")}/${dateCur.getFullYear()}`,
      pix: rawPixStr,
      instrution,
      parcela: String(i + 1),
      qtyInstallments,
      city
    }))
  }

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [34, 8, 8, 8],
    pageSize: "A4",
    content: installmentsContent,
    pageBreakBefore,
    defaultStyle: {
      color: "#1d1d1d"
    }
  }

  pdfMake.createPdf(docDefinition).download("boleto-" + data.product.replace(/\s/g, "-"));
  return
}
