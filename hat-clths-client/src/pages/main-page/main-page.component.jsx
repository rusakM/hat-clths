import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Tile from "../../components/tile/tile.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";

import { fetchTopProductsStart } from "../../redux/products/product.actions";

import {
  MainPageContainer,
  ParallaxBanner,
  ListsContainer,
  Row,
} from "./main-page.styles";

import forHer from "../../assets/landing-page/for-her.webp";
import news from "../../assets/landing-page/news.webp";
import forHim from "../../assets/landing-page/for-him.webp";

import "./main-page.styles.css";

const TopProductsList = lazy(() =>
  import("../../components/top-products-list/top-products-list.container")
);

const MainPage = ({ fetchTopProducts }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  return (
    <MainPageContainer>
      {!isMobile && <ParallaxBanner>&nbsp;</ParallaxBanner>}
      <ListsContainer>
        {isMobile ? (
          <Row>
            <Tile width={45} unit="vw" link="/">
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
            <Tile width={45} unit="vw" link="/">
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
            <Tile width={20} unit="vw" link="/">
              <div
                className="background-tile"
                style={{ backgroundImage: `url(${news})` }}
              >
                &nbsp;
              </div>
              <CustomButton className="absolute-position small-button">
                NOWOŚCI
              </CustomButton>
            </Tile>
            <Tile width={20} unit="vw" link="/">
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
            <Tile width={20} unit="vw" link="/">
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
            <Tile width={92.5} unit="vw" link="/" height={45}>
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
        <h3>Polecane</h3>
        <Suspense fallback={<Spinner />}>
          <TopProductsList />
        </Suspense>
      </ListsContainer>
    </MainPageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchTopProducts: () => dispatch(fetchTopProductsStart()),
});

export default connect(null, mapDispatchToProps)(MainPage);
