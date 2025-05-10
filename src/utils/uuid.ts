

export const uuid41 = (length = 24) => {
  let code = ""
  for (let i = 0; i < length; i++) {
    code += (Math.random() * 16).toString(16)
      .replace(/N/g, () => ((Math.random() * 4) | 0 + 8).toString(16))
  }

  return code

  // return (
  //   code
  //     .replace(/x/g, () => ((Math.random() * 16) | 0).toString(16))
  //     .replace(/N/g, () => ((Math.random() * 4) | 0 + 8).toString(16))
  // );
}