export const rupiah = (nominal: any, onCondition: any) => {
  const option = {
    style: "currency",
    currency: "IDR",
  };
  const currency = new Intl.NumberFormat("id-ID", option).format(nominal);

  return onCondition ? `+ ${currency}` : `- ${currency}`;
};

// Rupiah with no condition 
export const rupiahWithNC = (nominal: any) => {
  const option = {
    style: "currency",
    currency: "IDR",
  };
  return new Intl.NumberFormat("id-ID", option).format(nominal);

};

export const numberFormat = (nominal: any) => {
  return new Intl.NumberFormat("IDR").format(nominal);
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
