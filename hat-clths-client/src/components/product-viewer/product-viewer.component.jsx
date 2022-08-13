import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { createStructuredSelector } from "reselect";

import { selectOneProduct } from "../../redux/products/product.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { sendReviewStart } from "../../redux/products/product.actions";
import { addItem } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button.component";
import ThumbnailsList from "../thumbnails-list/thumbnails-list.component";
import CustomSelect from "../custom-select/custom-select.component";
import Review from "../review/review.component";
import Stars from "../stars/stars.component";

import formatPrice from "../../utils/formatPrice";
import calculateAverageRating from "./calculateAverage";
import createProductToCart from "./createProductToCart";
import PRODUCT_SIZES from "../../utils/productSizes";

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
  ReviewForm,
  ReviewField,
} from "./product-viewer.styles";

import "./product-viewer.styles.css";

const ProductViewer = ({ product, currentUser, sendReview, addItem }) => {
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
    const sizesKeys = Object.values(PRODUCT_SIZES);
    for (const size of sizesKeys) {
      let temp = products.find((product) => product.size === size);
      if (temp) {
        availableSizesList.push({ name: temp.size, value: temp._id });
      }
    }
  }

  const [photoIndex, setPhotoIndex] = useState(defaultPhoto);
  const [selectedSize, setSize] = useState(
    availableSizesList.length > 0 ? availableSizesList[0].value : null
  );
  const [showedReviews, setShowedReviews] = useState(10);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const selectCoverPhoto = (index) => {
    setPhotoIndex(index);
  };

  const selectSize = (event) => {
    setSize(event.target.value);
  };

  const incrementReviews = () => {
    setShowedReviews(showedReviews + 10);
  };

  const reviewHandler = (event) => {
    setReviewText(event.target.value);
  };

  const ratingHandler = (rating) => {
    setReviewRating(rating);
  };

  const resetReview = () => {
    setReviewText("");
    setReviewRating(0);
  };

  const sendReviewTrigger = () => {
    sendReview({ review: reviewText, rating: reviewRating }, _id);
    resetReview();
  };

  const addToCart = () => {
    addItem(createProductToCart(product, selectedSize));
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
            <CustomButton className="cart-button" onClick={addToCart}>
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
        {currentUser && (
          <ReviewForm>
            <p>
              Twoja ocena:&nbsp;
              <h3>
                <Stars rating={reviewRating} changeHandler={ratingHandler} />
              </h3>
            </p>
            <ReviewField
              value={reviewText}
              onChange={reviewHandler}
            ></ReviewField>
            <CustomButton onClick={sendReviewTrigger}>
              Dodaj opinię
            </CustomButton>
          </ReviewForm>
        )}
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, i) =>
            i < showedReviews ? (
              <Review review={review} key={review._id} />
            ) : null
          )}
        {reviews && reviews.length > showedReviews && (
          <CustomButton onClick={incrementReviews}>
            Poprzednie opinie
          </CustomButton>
        )}
      </ReviewsContainer>
    </ProductPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectOneProduct,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  sendReview: (reviewData, productId) =>
    dispatch(sendReviewStart(reviewData, productId)),
  addItem: (productData) => dispatch(addItem(productData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewer);
