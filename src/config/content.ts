import { IBoleto } from "../submit";

export interface IData extends IBoleto {
  parcela: string;
}

export const content = (data: IData) => {
  const instrution: {
    text: string, lineHeight: number, fontSize: number, bold?: boolean
  }[]
    =
    [{ text: "Instruções\n", lineHeight: 1.2, fontSize: 7 }]

  const instrutionSplit = data.instrution.split("\n");
  instrutionSplit.forEach(item => {
    instrution.push({
      text: item + "\n", fontSize: 9,
      bold: true,
      lineHeight: 1.2
    },)
  })


  return [
    {
      table: {
        widths: [200, 220, 105],
        dontBreakRows: false,
        body: [
          [
            {
              marginRight: 5,
              text: [
                {
                  text: 'Recebedor\n',
                  fontSize: 7,
                  margin: 50,
                  lineHeight: 1.2
                },
                { text: data.receiver, fontSize: 9, bold: true },
              ]
            },
            {
              colSpan: 2,
              text: [
                { text: 'Local de Pagamento\n', fontSize: 7, lineHeight: 1.2, },
                { text: data.locationPayment || 'Entre em contato com o recebedor', fontSize: 9, bold: true },

              ],
            },
            {}
          ],
          [
            {
              marginRight: 4,
              text: [
                { text: 'Produto / Serviço\n', fontSize: 7, lineHeight: 1.2 },
                { text: data.product, fontSize: 9, bold: true },
              ],
            },
            {
              colSpan: 2,
              text: [
                { text: 'Pagador\n', lineHeight: 1.2, fontSize: 7 },
                {
                  text: data.payer,
                  fontSize: 9,
                  bold: true
                },
              ],
            },
            {}
          ],
          [
            {
              marginRight: 5,
              text: [
                { text: 'Valor Pagamento\n', fontSize: 7, lineHeight: 1.2 },
                { text: data.value, fontSize: 9, bold: true },
              ],
            },
            {
              colSpan: 2,
              table: {
                keepWithHeaderRows: 0,
                widths: [50, 50, "auto"],
                body: [
                  [{
                    margin: [-5, -2, -5, -2],
                    border: [false, false, false, false],
                    text: [
                      { text: 'Valor Pagamento\n', fontSize: 7, lineHeight: 1.2 },
                      { text: data.value, fontSize: 9, bold: true },
                    ],
                  },
                  {
                    margin: [0, -2, -5, -2],
                    border: [true, false, false, false],
                    text: [
                      { text: 'Vencimento\n', fontSize: 7, lineHeight: 1.2 },
                      { text: data.date, fontSize: 9, bold: true },
                    ],
                  },
                  {
                    margin: [0, -2, -5, -2],
                    border: [true, false, false, false],
                    text: [
                      { text: 'Produto / Serviço\n', fontSize: 7, lineHeight: 1.2 },
                      { text: data.product, fontSize: 9, bold: true },
                    ],
                  },
                  ]
                ]
              }
            },
            {}
          ],
          [
            {
              border: [true, true, true, true],
              text: [
                {
                  text: "Data recebimento\n",
                  fontSize: 7,
                  lineHeight: 2.4,
                },
                {
                  text: "_____/_____/_____",
                  lineHeight: 1.8,
                },
                {
                  text: "\nAssinatura recebedor\n",
                  lineHeight: 2.4,
                  fontSize: 7
                },
                {
                  text: "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
                  lineHeight: 1.8,
                },
              ]
            },
            {
              text: instrution,
              border: [false, false, false, true],
            },
            {
              qr: data.pix,
              fit: '120',
              border: [false, false, true, true],
              alignment: "right",
              padding: 2
            },
          ],
        ],
      },
    },
    {
      table: {
        widths: [200, 320],
        body: [[
          {
            text: `Parcela ${data.parcela} de ${data.qtyInstallments}`,
            lineHeight: 1.2,
            alignment: "center",
            fontSize: 8,
            border: [false, false, false, false]
          },
          {
            text: `Parcela ${data.parcela} de ${data.qtyInstallments}`,
            lineHeight: 1.2,
            alignment: "center",
            fontSize: 8,
            border: [false, false, false, false]
          },
        ]]
      }
    },
    { text: "\n", lineHeight: 1.2 }
  ]
}