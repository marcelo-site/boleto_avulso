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
    instrution: "",
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
    <div className="App">
      <main>
        <div className="header">
          <h1>BOLETO AVULSO</h1>
          <div className="icon">
            <img src={`${process.env.PUBLIC_URL}/boleto.png`} alt="" />
          </div>
        </div>

        <form action="" className="form" onSubmit={submit}>
          <Input
            value={data.receiver}
            handleValue={handleData}
            label="Recebedor"
            id="receiver"
          />
          <Input
            value={data.city}
            handleValue={handleData}
            label="Cidade do Recebedor"
            id="city"
          />
          <Input
            value={data.locationPayment}
            handleValue={handleData}
            label="Local de pagamento"
            id="locationPayment"
          />
          <Input
            value={data.product}
            handleValue={handleData}
            label="Produto/Serviço"
            id="product"
          />
          <Input
            value={data.value}
            handleValue={({ target }) => {
              setData((prev) => ({ ...prev, value: mascaraMoeda(target.value) }))
            }}
            label="Valor"
            id="valor"
          />

          <Input
            value={data.payer}
            handleValue={handleData}
            label="Pagador"
            id="payer"
          />
          <Input
            value={data.date}
            handleValue={handleData}
            label="Primeira Parcela"
            id="date"
            type="date"
          />
          <Input
            value={data.pix}
            handleValue={handleData}
            label="Chave Pix"
            id="pix"
          />

          <Input
            value={data.qtyInstallments}
            handleValue={handleData}
            label="Quantidade de Parcelas"
            id="qtyInstallments"
          />
          <div className="form-control">
            <label htmlFor="">Instruções</label>
            <textarea
              name="instrution"
              id="instrution"
              onChange={({ target }) => setData((prev) => ({ ...prev, [target.name]: target.value }))}
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
