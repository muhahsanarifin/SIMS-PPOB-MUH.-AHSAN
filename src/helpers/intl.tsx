export const rupiah = (nominal: any, onCondition: any) => {
  const option = {
    style: "currency",
    currency: "IDR",
  };
  const currency = new Intl.NumberFormat("id-ID", option).format(nominal);

  return onCondition ? `+ ${currency}` : `- ${currency}`;
};

export const date = (date: any) => {
  return `${new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)} ${new Intl.DateTimeFormat("id-ID", {
    timeStyle: "long",
  }).format(date)} `;
};
