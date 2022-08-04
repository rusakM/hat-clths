import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { createStructuredSelector } from "reselect";

import { selectOneProduct } from "../../redux/products/product.selectors";

import CustomButton from "../custom-button/custom-button.component";
import ThumbnailsList from "../thumbnails-list/thumbnails-list.component";
import CustomSelect from "../custom-select/custom-select.component";
import Review from "../review/review.component";

import formatPrice from "../../utils/formatPrice";
import calculateAverageRating from "./calculateAverage";

import {
  ProductPageContainer,
  ProductPageInfoContainer,
  ProductPagePhotosContainer,
  BackButtonRow,
  PhotosContainer,
  ImageCoverContainer,
  Image,
  ProductContainer,
  ProductName,
  SizesContainer,
  DescriptionContainer,
  ReviewsContainer,
} from "./product-viewer.styles";

import "./product-viewer.styles.css";

const ProductViewer = ({ product }) => {
  if (!product) {
    product = {};
  }
  const {
    name,
    price,
    description,
    imageCover,
    photos,
    products,
    category,
    reviews,
  } = product;

  let defaultPhoto = null;
  let availableSizesList = [];

  if (photos && photos.length > 0) {
    photos.forEach((photo, index) => {
      if (photo === imageCover) {
        defaultPhoto = index;
      }
    });
  }

  if (products && products.length > 0) {
    availableSizesList = products.map(({ _id, size }) => ({
      name: size,
      value: _id,
    }));
  }

  console.log(availableSizesList);

  const [photoIndex, setPhotoIndex] = useState(defaultPhoto);
  const [selectedSize, setSize] = useState(null);

  const sizes = (products && products.map(({ size }) => size)) || [];
  console.log(sizes);

  const selectCoverPhoto = (index) => {
    setPhotoIndex(index);
  };

  const selectSize = (event) => {
    setSize(event.target.value);
  };

  return (
    <ProductPageContainer>
      <ProductPageInfoContainer>
        <ProductPagePhotosContainer>
          <BackButtonRow>
            <Link to={`/products/${category ? category.slug : ""}`}>
              <h4>
                <span>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                &nbsp;
                {category && category.name ? category.name : "Kategorie"}
              </h4>
            </Link>
          </BackButtonRow>
          {photos && (
            <PhotosContainer>
              <ThumbnailsList
                photos={photos}
                selectedIndex={photoIndex}
                select={selectCoverPhoto}
              />
              <ImageCoverContainer>
                <Image
                  style={{
                    backgroundImage: `url("/uploads/products/${photos[photoIndex]}")`,
                  }}
                />
              </ImageCoverContainer>
            </PhotosContainer>
          )}
        </ProductPagePhotosContainer>
        <ProductContainer>
          {name && <ProductName>{name}</ProductName>}
          {price && <ProductName>{formatPrice(price)}</ProductName>}
          <SizesContainer>
            <div>
              <label htmlFor="select-size">Wybierz rozmiar:</label>
              <CustomSelect
                options={availableSizesList}
                changeHandler={selectSize}
                value={selectedSize}
                id="select-size"
              />
            </div>
            <CustomButton className="cart-button">
              Dodaj do koszyka
            </CustomButton>
          </SizesContainer>
          <DescriptionContainer>
            <p>{description && description}</p>
          </DescriptionContainer>
        </ProductContainer>
      </ProductPageInfoContainer>
      <ReviewsContainer>
        <ProductName>Opinie klientów:</ProductName>
        {reviews &&
          (reviews.length === 0 ? (
            <p>Nie dodano jeszcze żadnej opinii</p>
          ) : (
            <h4>{`Średnia ocen: ${calculateAverageRating(
              reviews
            )}/5, liczba ocen: ${reviews.length}`}</h4>
          ))}
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review) => <Review review={review} key={review._id} />)}
      </ReviewsContainer>
    </ProductPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectOneProduct,
});

export default connect(mapStateToProps)(ProductViewer);
