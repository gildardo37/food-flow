export const getFieldName = (index: number, idx?: number) => {
  const name = `options[${index}].data`;
  if (idx === undefined || idx === null) {
    return name;
  }
  return `${name}.[${idx}]`;
};
