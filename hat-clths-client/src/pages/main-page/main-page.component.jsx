import React, { useEffect, lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Tile from "../../components/tile/tile.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import Spinner from "../../components/spinner/spinner.component";

import { fetchTopProductsStart } from "../../redux/products/product.actions";

import {
  MainPageContainer,
  ParallaxBanner,
  ListsContainer,
  Row,
  H3Header,
  NewsletterContainer,
  NewsletterForm,
  FormRow,
} from "./main-page.styles";

import forHer from "../../assets/landing-page/for-her.webp";
import news from "../../assets/landing-page/news.webp";
import forHim from "../../assets/landing-page/for-him.webp";

import "./main-page.styles.css";

const TopProductsList = lazy(() =>
  import("../../components/top-products-list/top-products-list.container")
);

const MainPage = ({ fetchTopProducts }) => {
  const [newsletter, setNewsletter] = useState({
    email: "",
    agreement: false,
  });

  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  const changeHandler = (event) => {
    setNewsletter({
      ...newsletter,
      email: event.target.value,
    });
  };

  const checkboxHandler = (event) => {
    setNewsletter({
      ...newsletter,
      agreement: event.target.checked,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <MainPageContainer>
      {!isMobile && <ParallaxBanner>&nbsp;</ParallaxBanner>}
      <ListsContainer>
        {isMobile ? (
          <Row>
            <Tile width={45} unit="vw" link="/products/for-her">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${forHer})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position small-button">
                DLA NIEJ
              </CustomButton>
            </Tile>
            <Tile width={45} unit="vw" link="/products/for-him">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${forHim})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position small-button">
                DLA NIEGO
              </CustomButton>
            </Tile>
          </Row>
        ) : (
          <Row>
            <Tile width={20} unit="vw" link="/products">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${news})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position">NOWOŚCI</CustomButton>
            </Tile>
            <Tile width={20} unit="vw" link="/products/for-her">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${forHer})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position">
                DLA NIEJ
              </CustomButton>
            </Tile>
            <Tile width={20} unit="vw" link="/products/for-him">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${forHim})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position">
                DLA NIEGO
              </CustomButton>
            </Tile>
          </Row>
        )}
        {isMobile && (
          <Row>
            <Tile width={95} unit="vw" link="/products" height={45}>
              <div
                className="background-tile"
                style={{
                  backgroundImage: `url(${news})`,
                  backgroundPosition: "top",
                }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position">NOWOŚCI</CustomButton>
            </Tile>
          </Row>
        )}
        <H3Header>Polecane</H3Header>
        <Suspense fallback={<Spinner />}>
          <TopProductsList />
        </Suspense>
        <NewsletterContainer>
          <h3>
            Zapisz się do newslettera aby być na bieżąco ze wszystkimi
            nowościami
          </h3>
          <NewsletterForm onSubmit={submitHandler}>
            <FormRow>
              <FormInput
                handleChange={changeHandler}
                label="email"
                value={newsletter.email}
                name="email"
                style={{ minWidth: "250px" }}
              />
              <CustomButton type="submit">ZAPISZ SIĘ</CustomButton>
            </FormRow>
            <div className="row centered-div">
              <input
                type="checkbox"
                name="agreement"
                onChange={checkboxHandler}
                checked={newsletter.agreement}
                id="agreement"
              />
              <label htmlFor="agreement" style={{ padding: "5px" }}>
                Wyrażam zgodę na otrzymywanie newslettera
              </label>
            </div>
          </NewsletterForm>
        </NewsletterContainer>
      </ListsContainer>
    </MainPageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchTopProducts: () => dispatch(fetchTopProductsStart()),
});

export default connect(null, mapDispatchToProps)(MainPage);
