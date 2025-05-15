import { ChangeEvent, useState } from "react";
import { Input } from "./components/input";
import { download } from "./submit";
import { mascaraMoeda } from "./utils/inputMoeda";
import { ReactComponent as IconExit } from "./x-circle-fill.svg"

function App() {
  const [showErrorModal, setShowErrorModal] = useState("")
  const [data, setData] = useState({
    receiver: "",
    product: "",
    value: "R$ 0,00",
    locationPayment: "",
    payer: "",
    date: "",
    pix: "",
    city: "",
    instrution: "Pague com pix escaneando o qr code, confira o valor e confirme o pagamento",
    qtyInstallments: ""
  })

  const handleData = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let error = false
    // eslint-disable-next-line array-callback-return
    const keys = Object.keys(data) as Array<keyof typeof data>;

    for (let i = 0, length = keys.length; i < length; i++) {
      if (keys[i] === "locationPayment" || keys[i] === "instrution") {
        continue;
      }
      if (+ data.value.replace(/\D/g, "") === 0) {
        setShowErrorModal(() => "Informe o valor das parcelas!");
        error = true;
        break;
      }
      if (!data.date) {
        setShowErrorModal(() => "Informe a data da primeira parcela!");
        error = true;
        break;
      }
      if (!data[keys[i]]) {
        setShowErrorModal(() => "Falta alguma informação importante!");
        error = true;
        break;
      }
    }
    if (!error) download(data);
  }

  return (
    <div className="App flex-center">
      <main className="">
        <div className="header">
          <h1>CARNÊ AVULSO</h1>
          <div className="icon">
            <img src={`${process.env.PUBLIC_URL}/carne.png`} alt="" />
          </div>
        </div>

        <form className="form" onSubmit={submit}>
          <Input
            value={data.receiver}
            onChange={handleData}
            label="Recebedor"
            id="receiver"
            placeholder="Informe o nome de quem vai receber"
          />
          <Input
            value={data.city}
            onChange={handleData}
            label="Cidade do Recebedor"
            id="city"
            placeholder="Informe a cidade de quem vai receber"
          />
          <Input
            value={data.locationPayment}
            onChange={handleData}
            label="Local de pagamento"
            id="locationPayment"
            placeholder="Informe um local para pagamento"
          />
          <Input
            value={data.product}
            onChange={handleData}
            label="Produto / Serviço"
            id="product"
            placeholder="Indentifique o produto ou serviço prestado"
          />
          <Input
            value={data.value}
            onChange={({ target }) => {
              setData((prev) => ({ ...prev, value: mascaraMoeda(target.value) }))
            }}
            label="Valor"
            id="valor"
          />
          <Input
            value={data.pix}
            onChange={handleData}
            label="Chave Pix"
            id="pix"
            placeholder="Informe a chave pix de recebimento"
          />
          <Input
            value={data.payer}
            onChange={handleData}
            label="Pagador"
            id="payer"
            placeholder="Informe o nome de quem vai pagar"
          />
          <div>
            <Input
              value={data.qtyInstallments}
              onChange={handleData}
              label="Quantidade de Parcelas"
              id="qtyInstallments"
              type="number"
              placeholder="Informe a quantidade de parcelas"
            />
            <Input
              value={data.date}
              onChange={handleData}
              label="Primeira Parcela"
              id="date"
              type="date"
            />
          </div>

          <div className="form-control">
            <label htmlFor="">Instruções</label>
            <textarea
              name="instrution"
              id="instrution"
              onChange={({ target }) => setData((prev) => ({ ...prev, [target.name]: target.value }))}
              value={data.instrution}
              placeholder="Informe as instruções para ajudar no pagamento"
            ></textarea>
          </div>
          <button>Criar Boleto</button>
        </form>
      </main>

      <div
        onClick={() => setShowErrorModal("")}
        style={{ display: showErrorModal ? "flex" : "none" }}
        className="modal flex-center"
      >
        <div>
          <div className="flex-center">
            <IconExit />
          </div>
          <div className="modal-content">{showErrorModal}</div>
        </div>
      </div>

    </div>
  );
}

export default App;
