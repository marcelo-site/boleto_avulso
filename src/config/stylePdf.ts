import { CustomTableLayout } from "pdfmake/interfaces";

export const tableLayouts: {
  [name: string]: CustomTableLayout;
} = {
  exampleLayout: {
    hLineWidth: function (i, node) {
      // if (i === 0 || i === node.table.body.length) {
      //   return 0;
      // }

      return (i === node.table.headerRows) ? 0.1 : 0.1;
    },
    vLineWidth: function () {
      return 0.1;
    }
  }
};