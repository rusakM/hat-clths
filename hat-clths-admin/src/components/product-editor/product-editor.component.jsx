import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createStructuredSelector } from "reselect";

import { selectOneProduct } from "../../redux/products/product.selectors";
import { selectCategories } from "../../redux/category/category.selectors";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import CustomSelect from "../custom-select/custom-select.component";
//import Popup from "../../components/popup/popup.component";

import {
  ProductPageContainer,
  ProductPagePhotosContainer,
  BackButtonRow,
  PhotosContainer,
  ThumbnailsContainer,
  Thumbnail,
  ImageCoverContainer,
  Image,
  EditorContainer,
  EditorForm,
  SizesContainer,
  SizesList,
  DescriptionContainer,
  Description,
} from "./product-editor.styles";

const ProductEditor = ({ product, categories }) => {
  if (!product) {
    product = {};
  }
  const { name, price, description, imageCover, photos, products, category } =
    product;

  const categoriesList =
    categories.length > 0 &&
    categories.map(({ id, name, gender }) => ({
      value: id,
      name: `${gender ? "M: " : "K: "}${name}`,
    }));

  const sizes = (products && products.map(({ size }) => size)) || [];

  // state
  const [productData, setProductData] = useState({
    name: name ? name : "",
    price: price ? price : 0,
    category:
      category && category.id
        ? category.id
        : categories && categories.length > 0
        ? categories[0].id
        : "",
    sizes,
    description: description ? description : "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const createFormData = () => {
    const form = new FormData();
    if (name !== productData.name) {
      form.append("name", productData.name);
    }
    if (price !== productData.price) {
      form.append("price", productData.price);
    }
    if (description !== productData.description) {
      form.append("description", productData.description);
    }
    if (category !== productData.category) {
      form.append("category", productData.category);
    }

    return form;
  };

  const addSize = (event) => {
    event.preventDefault();
  };

  return (
    <ProductPageContainer>
      <ProductPagePhotosContainer>
        <BackButtonRow>
          <Link to="/products">
            <h4>
              <span>
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
              &nbsp;
              {category && category.name ? category.name : "Kategorie"}
            </h4>
          </Link>
        </BackButtonRow>
        <PhotosContainer>
          <ThumbnailsContainer>
            {photos &&
              photos.map((photo) => (
                <Thumbnail
                  key={photo}
                  style={{
                    backgroundImage: `url("/uploads/products/${photo}")`,
                  }}
                />
              ))}
          </ThumbnailsContainer>
          <ImageCoverContainer>
            {imageCover && (
              <Image
                style={{
                  backgroundImage: `url("/uploads/products/${imageCover}")`,
                }}
              />
            )}
            <CustomButton style={{ marginTop: "1em" }}>
              Dodaj zdjęcia
            </CustomButton>
          </ImageCoverContainer>
        </PhotosContainer>
      </ProductPagePhotosContainer>
      <EditorContainer>
        <BackButtonRow style={{ justifyContent: "space-around" }}>
          <CustomButton
            onClick={() => {
              const formData = createFormData();

              for (const val of formData.values()) {
                console.log(val);
              }
            }}
          >
            Zapisz
          </CustomButton>
          <CustomButton>Deaktywacja produktu</CustomButton>
        </BackButtonRow>
        <EditorForm>
          <label>Kateogria: </label>
          <CustomSelect
            options={categoriesList}
            changeHandler={changeHandler}
            name="category"
            value={productData.category}
          />
          <FormInput
            name="name"
            value={productData.name}
            label="Nazwa produktu"
            type="text"
            onChange={changeHandler}
          />
          <FormInput
            name="price"
            value={productData.price}
            label="Cena"
            type="number"
            min="0"
            step="0.1"
            onChange={changeHandler}
          />
          <SizesContainer>
            <SizesList>
              {sizes.length > 0 &&
                sizes.map((size) => (
                  <p>
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp;{size}
                  </p>
                ))}
            </SizesList>
            <CustomButton onClick={addSize}>Doddaj rozmiar</CustomButton>
          </SizesContainer>
          <DescriptionContainer>
            <p>Opis produktu:</p>
            <Description
              defaultValue={description || ""}
              onChange={changeHandler}
              name="description"
            ></Description>
          </DescriptionContainer>
        </EditorForm>
      </EditorContainer>
    </ProductPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectOneProduct,
  categories: selectCategories,
});

export default connect(mapStateToProps)(ProductEditor);
