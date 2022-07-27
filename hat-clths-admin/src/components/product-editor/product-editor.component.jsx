import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { createStructuredSelector } from "reselect";

import { selectOneProduct } from "../../redux/products/product.selectors";
import { selectCategories } from "../../redux/category/category.selectors";
import {
  createProductStart,
  updateProductStart,
} from "../../redux/products/product.actions";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import CustomSelect from "../custom-select/custom-select.component";
import productSizes from "../../utils/productSizes";
import compareArrays from "../../utils/compareArrays";
import { testNewProduct, testUpdatingProduct } from "./product-editor.tester";
import Thumbnail from "../thumbnail/thumbnail.component";
//import Popup from "../../components/popup/popup.component";

import {
  ProductPageContainer,
  ProductPagePhotosContainer,
  BackButtonRow,
  PhotosContainer,
  ThumbnailsContainer,
  ImageCoverContainer,
  Image,
  EditorContainer,
  EditorForm,
  SizesContainer,
  DescriptionContainer,
  Description,
} from "./product-editor.styles";

import "./product-editor.styles.css";

const ProductEditor = ({
  product,
  categories,
  isNew,
  createProduct,
  updateProduct,
}) => {
  const fileRef = useRef(null);
  if (!product) {
    product = {};
  }
  const {
    _id,
    name,
    price,
    description,
    imageCover,
    photos,
    products,
    category,
  } = product;

  let defaultPhoto = null;

  if (photos && photos.length > 0) {
    photos.forEach((photo, index) => {
      if (photo === imageCover) {
        defaultPhoto = index;
      }
    });
  }

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
    imageCover: defaultPhoto ? defaultPhoto : 0,
    photos: photos ? photos : ["default.webp"],
    photosToUpload: [],
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileInput = (event) => {
    const { files } = event.target;
    const { photos, imageCover } = productData;

    if (files.length > 0) {
      if (photos.length === 1 && photos[0] === "default.webp") {
        setProductData({
          ...productData,
          photos: [],
          photosToUpload: [...files],
        });
      } else {
        setProductData({
          ...productData,
          photosToUpload: [...files],
        });
      }
    } else {
      setProductData({
        ...productData,
        imageCover: imageCover > photos.length ? 0 : imageCover,
        photos: photos.length === 0 ? ["default.webp"] : photos,
        photosToUpload: [],
      });
    }
  };

  const openFileDialog = () => fileRef.current.click();

  const removeFromFileInput = (event) => {
    event.stopPropagation();
    fileRef.current.value = null;
    setProductData({
      ...productData,
      photosToUpload: [],
      photos: isNew ? ["default.webp"] : productData.photos,
    });
  };

  const createFormData = () => {
    const form = new FormData();
    if (name !== productData.name && productData.name) {
      form.append("name", productData.name);
    }
    if (price !== productData.price && productData.price) {
      form.append("price", productData.price);
    }
    if (description !== productData.description && productData.description) {
      form.append("description", productData.description);
    }
    if (
      !category ||
      (category.id !== productData.category && productData.category)
    ) {
      form.append("category", productData.category);
    }
    if (
      !compareArrays(sizes, productData.sizes) &&
      productData.sizes.join(",")
    ) {
      form.append("sizes", productData.sizes.join(","));
    }

    if (productData.photos[productData.imageCover] !== "default.webp") {
      let imgCover;
      if (isNew) {
        imgCover = productData.imageCover;
      } else {
        imgCover = productData.photos[productData.imageCover];
      }
      if (imgCover !== imageCover) {
        form.append("imageCover", imgCover);
      }
    }

    if (fileRef.current.files.length > 0) {
      for (const file of fileRef.current.files) {
        form.append("pictures", file);
      }
    }

    return form;
  };

  const getPhotoFromBuffer = (num) =>
    URL.createObjectURL(fileRef.current.files[num]);

  const toggleSize = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;
    const sizes = [...productData.sizes];
    let sizeIndex = sizes.indexOf(value);

    if (sizeIndex === -1) {
      sizes.push(value);
    } else {
      sizes.splice(sizeIndex, 1);
    }
    setProductData({
      ...productData,
      sizes,
    });
  };

  const selectCoverPhoto = (index) => {
    setProductData({
      ...productData,
      imageCover: index,
    });
  };

  const saveProduct = () => {
    try {
      const form = createFormData();
      if (isNew) {
        testNewProduct(form);
        createProduct(form);
      } else {
        testUpdatingProduct(form);
        updateProduct(form, _id);
      }
    } catch (error) {
      console.log(error);
    }
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
            {productData.photos.length > 0 &&
              productData.photos.map((photo, index) => (
                <Thumbnail
                  key={photo}
                  style={{
                    backgroundImage: `url("/uploads/products/${photo}")`,
                  }}
                  className={
                    photo === productData.photos[productData.imageCover]
                      ? "bold-border"
                      : ""
                  }
                  onClick={() => selectCoverPhoto(index)}
                />
              ))}
            {fileRef &&
              productData.photosToUpload.length > 0 &&
              [...fileRef.current.files].map((file, index) => (
                <Thumbnail
                  key={index}
                  style={{
                    backgroundImage: `url("${getPhotoFromBuffer(index)}")`,
                  }}
                  className={
                    index === productData.imageCover - productData.photos.length
                      ? "bold-border"
                      : ""
                  }
                  onClick={() =>
                    selectCoverPhoto(index + productData.photos.length)
                  }
                  remove={removeFromFileInput}
                />
              ))}
          </ThumbnailsContainer>
          <ImageCoverContainer>
            <Image
              style={{
                backgroundImage: `url("${
                  productData.imageCover < productData.photos.length
                    ? `/uploads/products/${
                        productData.photos[productData.imageCover]
                      }`
                    : getPhotoFromBuffer(
                        productData.imageCover - productData.photos.length
                      )
                }")`,
              }}
            />
            <CustomButton style={{ marginTop: "1em" }} onClick={openFileDialog}>
              Dodaj zdjęcia
            </CustomButton>
            <input
              type="file"
              name="photos"
              ref={fileRef}
              onChange={handleFileInput}
              hidden
              multiple
            />
          </ImageCoverContainer>
        </PhotosContainer>
      </ProductPagePhotosContainer>
      <EditorContainer>
        <BackButtonRow style={{ justifyContent: "space-around" }}>
          <CustomButton onClick={() => saveProduct()}>Zapisz</CustomButton>
          <CustomButton>Deaktywacja produktu</CustomButton>
        </BackButtonRow>
        <EditorForm>
          <label>Kategoria: </label>
          <CustomSelect
            options={categoriesList}
            changeHandler={changeHandler}
            name="category"
            value={productData.category}
            required
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
            {Object.keys(productSizes).map((size) => {
              const sizeIsUsed = productData.sizes.find((s) => s === size);
              return (
                <CustomButton
                  className={
                    sizeIsUsed ? "size-button" : "deactivated-size-button"
                  }
                  onClick={toggleSize}
                >
                  {size}
                </CustomButton>
              );
            })}
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

const mapDispatchToProps = (dispatch) => ({
  createProduct: (productData) => dispatch(createProductStart(productData)),
  updateProduct: (productData, productId) =>
    dispatch(updateProductStart(productData, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditor);
