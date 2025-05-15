import { IBoleto } from "../submit";

export interface IData extends IBoleto {
  parcela: string;
}

const canvas = [
  {
    type: 'rect',
    x: 0,
    y: 0,
    w: 310,
    h: 290,
    r: 5,
    dash: { length: 5 },
    // lineWidth: 10,
    lineColor: 'blue',
  },
  {
    type: 'rect',
    x: 1,
    y: 1,
    w: 308,
    h: 288,
    r: 4,
    lineColor: 'red',
    color: '#ffffe0',
  },
  {
    type: 'polyline',
    lineWidth: 3,
    closePath: true,
    points: [{ x: 10, y: 10 }, { x: 35, y: 40 }, { x: 100, y: 40 }, { x: 125, y: 10 }]
  },
  {
    type: 'polyline',
    lineWidth: 2,
    color: 'blue',
    lineColor: 'red',
    points: [{ x: 10, y: 110 }, { x: 35, y: 140 }, { x: 100, y: 140 }, { x: 125, y: 110 }, { x: 10, y: 110 }]
  },
  {
    type: 'line',
    x1: 40, y1: 60,
    x2: 260, y2: 60,
    lineWidth: 3
  },
  {
    type: 'line',
    x1: 40, y1: 80,
    x2: 260, y2: 80,
    lineWidth: 10,
    lineCap: 'round'
  },
  {
    type: 'line',
    x1: 40, y1: 100,
    x2: 260, y2: 100,
    lineWidth: 10,
    lineCap: 'square'
  },
  {
    type: 'ellipse',
    x: 150, y: 140,
    color: 'red',
    fillOpacity: 0.5,
    r1: 80, r2: 60
  },
  {
    type: 'rect',
    x: 150,
    y: 200,
    w: 150,
    h: 50,
  },
  {
    type: 'rect',
    x: 10, y: 200, w: 100, h: 10,
    linearGradient: ['red', 'blue']
  },
  {
    type: 'rect',
    x: 10, y: 215, w: 100, h: 10,
    linearGradient: ['red', 'green', 'blue']
  },
  {
    type: 'rect',
    x: 10, y: 230, w: 100, h: 10,
    linearGradient: ['red', 'yellow', 'green', 'blue']
  },
  {
    type: 'ellipse',
    x: 260, y: 140,
    r1: 30, r2: 20,
    linearGradient: ['red', 'green', 'blue', 'red'],
  },
  {
    type: 'rect',
    x: 10, y: 250, w: 50, h: 30,
    color: ['stripe45d', 'blue'],
  }
]

const layout = {
  vLineColor: '#000000',
  hLineColor: '#000000',
  hLineWidth: function () {
    return 0.1;
  },
  vLineWidth: function () {
    return 0.1;
  },

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
              border: [true, true, true, false],
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
                {
                  text: data.locationPayment || 'Entre em contato com o recebedor',
                  fontSize: 9,
                  bold: true
                },
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
                  text: "\n",
                  lineHeight: .25,
                },
                {
                  text: "Recebimento :  ",
                  fontSize: 9,
                  lineHeight: 2.4,
                },
                {
                  text: "_____/_____/_____\n",
                  fontSize: 12,
                },
                {
                  text: "Forma de pagamento\n",
                  lineHeight: 1.2,
                  fontSize: 7
                },
                {
                  text: "Espécie ",
                  lineHeight: 3.5,
                  bold: true,
                  fontSize: 8
                },
                {
                  text: "[]",
                  characterSpacing: 6,
                  lineHeight: 3.5,
                  fontSize: 8
                },
                {
                  text: "   Pix ",
                  lineHeight: 3.5,
                  bold: true,
                  fontSize: 8
                },
                {
                  text: "[]",
                  characterSpacing: 6,
                  lineHeight: 3.5,
                  fontSize: 8
                },
                {
                  text: "   Transferência ",
                  lineHeight: 3.5,
                  bold: true,
                  fontSize: 8
                },
                {
                  text: "[]",
                  characterSpacing: 6,
                  lineHeight: 3.5,
                  fontSize: 8
                },
                {
                  text: "   Outros ",
                  lineHeight: 3.5,
                  bold: true,
                  fontSize: 8
                },
                {
                  text: "[]",
                  characterSpacing: 6,
                  lineHeight: 3.5,
                  fontSize: 8
                },
                {
                  text: "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n",
                  lineHeight: 1.2,
                },
                {
                  text: "Assinatura recebedor\n",
                  lineHeight: 1.2,
                  fontSize: 7,

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
      layout
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
      },
      layout
    },

    { text: "\n", lineHeight: 1.2 }
  ]
}