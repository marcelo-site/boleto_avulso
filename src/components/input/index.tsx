import { ComponentProps } from "react"

interface IInput extends ComponentProps<"input"> {
  label: string
}

export const Input = ({ label, type, id, ...rest }: IInput) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        type={type || "text"}
        name={id}
        id={id}
      />
    </div>
  )
}