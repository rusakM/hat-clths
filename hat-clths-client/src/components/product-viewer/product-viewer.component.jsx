import React, { useState, lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";

import { selectOneProduct } from "../../redux/products/product.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { sendReviewStart } from "../../redux/products/product.actions";
import { addItem } from "../../redux/cart/cart.actions";
import {
  fetchRecommendationsStart,
  fetchGenderBasedRecommendationsStart,
  fetchSimilarProductsStart,
} from "../../redux/recommendations/recommendations.actions";

import CustomButton from "../custom-button/custom-button.component";
import ThumbnailsList from "../thumbnails-list/thumbnails-list.component";
import CustomSelect from "../custom-select/custom-select.component";
import Review from "../review/review.component";
import Stars from "../stars/stars.component";
import Popup from "../popup/popup.component";
import Spinner from "../spinner/spinner.component";
import { H3Header } from "../../pages/main-page/main-page.styles";

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

const RecommendationsList = lazy(() =>
  import("../recommendations-list/recommendations-list.container")
);

const GenderBasedRecommendationsList = lazy(() =>
  import("../recommendations-list/gender-based-recommendations-list.container")
);
const SimilarProductsList = lazy(() =>
  import("../recommendations-list/similar-products-list.container")
);

const ProductViewer = ({
  product,
  currentUser,
  sendReview,
  addItem,
  fetchRecommendationsStart,
  fetchGenderBasedRecommendationsStart,
  fetchSimilarProductsStart,
}) => {
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

  console.log(category);
  let defaultPhoto = null;
  let availableSizesList = [];

  if (photos && photos.length > 0) {
    photos.forEach((photo, index) => {
      if (photo === imageCover) {
        defaultPhoto = index;
      }
    });
  }

  useEffect(() => {
    if (_id) {
      fetchRecommendationsStart();
      fetchSimilarProductsStart(_id);
    }
  }, [fetchRecommendationsStart, fetchSimilarProductsStart, _id]);

  useEffect(() => {
    if (category && category.hasOwnProperty("gender")) {
      fetchGenderBasedRecommendationsStart(category.gender);
    }
  }, [category, fetchGenderBasedRecommendationsStart]);

  if (products && products.length > 0) {
    const sizesKeys = Object.values(PRODUCT_SIZES);
    for (const size of sizesKeys) {
      let temp = products.find((product) => product.size === size);
      if (temp) {
        availableSizesList.push({ name: temp.size, value: temp._id });
      }
    }
  }

  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const popupButtonClass = isMobile ? "small-button" : "";

  const [photoIndex, setPhotoIndex] = useState(defaultPhoto);
  const [selectedSize, setSize] = useState(
    availableSizesList.length > 0 ? availableSizesList[0].value : null
  );
  const [showedReviews, setShowedReviews] = useState(10);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [productAddedStatus, setProductAddedStatus] = useState(false);

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
    setProductAddedStatus(true);
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
          <H3Header>Specjalnie dla ciebie:</H3Header>
          <Suspense fallback={<Spinner />}>
            <RecommendationsList size={9} />
          </Suspense>
          {productAddedStatus && (
            <Popup>
              <h2>Dodano do koszyka</h2>
              <H3Header>Inni klienci wybrali również:</H3Header>
              <Suspense fallback={<Spinner />}>
                <SimilarProductsList length={5} />
              </Suspense>
              <div
                className="row space-around"
                style={{
                  paddingTop: "1em",
                }}
              >
                <CustomButton
                  onClick={() => setProductAddedStatus(false)}
                  className={popupButtonClass}
                >
                  Kupuj dalej
                </CustomButton>
                <Link to="/cart">
                  <CustomButton className={popupButtonClass}>
                    Koszyk
                  </CustomButton>
                </Link>
              </div>
            </Popup>
          )}
        </ProductContainer>
      </ProductPageInfoContainer>
      <H3Header>Uzupełnij look:</H3Header>
      <Suspense fallback={<Spinner />}>
        <GenderBasedRecommendationsList length={7} size={11.5} />
      </Suspense>

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
  fetchRecommendationsStart: () => dispatch(fetchRecommendationsStart()),
  fetchGenderBasedRecommendationsStart: (gender) =>
    dispatch(fetchGenderBasedRecommendationsStart(gender)),
  fetchSimilarProductsStart: (productId) =>
    dispatch(fetchSimilarProductsStart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewer);
