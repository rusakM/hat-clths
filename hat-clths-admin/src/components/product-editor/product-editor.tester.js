export const testNewProduct = (formData) => {
  //validate name
  if (!formData.get("name")) {
    throw new Error("Nie podano nazwy produktu");
  }

  //validate price
  const price = parseFloat(formData.get("price"));
  if (!price) {
    throw new Error("Nie podano ceny produktu");
  }
  if (price < 0) {
    throw new Error("Podana cena jest nieprawidłowa");
  }

  //validate category
  if (!formData.get("category")) {
    throw new Error("Nie wybrano kategorii");
  }

  //validate sizes
  if (!formData.get("sizes")) {
    throw new Error("Nie wybrano rozmiarów produktu");
  }
};

export const testUpdatingProduct = (formData) => {
  //validate price
  const price = parseFloat(formData.get("price"));
  if (price < 0) {
    throw new Error("Podana cena jest nieprawidłowa");
  }
  const category = formData.get("category");
  if (category && category.length !== 24) {
    throw new Error("Nieprawidłowa kategoria produktu");
  }
};
