import { ChangeEvent } from "react"

export const Input = ({
  value,
  label,
  type,
  id,
  handleValue
}: {
  label: string,
  id: string
  type?: string
  value: string,
  handleValue: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        type={type || "text"}
        name={id}
        id={id}
        value={value}
        onChange={handleValue}
      />
    </div>
  )
}