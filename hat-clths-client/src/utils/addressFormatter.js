export const formatAddress = (address) => {
  const {
    city,
    street,
    zipCode,
    houseNumber,
    flatNumber,
    phoneNumber,
    user: { name, email },
  } = address;

  const streetRow = `ul. ${street} ${houseNumber} ${
    flatNumber ? `, m. ${flatNumber}` : ""
  }`;

  return [name, email, streetRow, `${zipCode} ${city}`, phoneNumber];
};

export const formatInvoice = ({ nip, company }) => [company, `NIP: ${nip}`];
