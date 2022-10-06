import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams, Link } from "react-router-dom";

import Spinner from "../../components/spinner/spinner.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { unsubscribeStart } from "../../redux/newsletter/newsletter.actions";
import { selectIsFetchingData } from "../../redux/newsletter/newsletter.selectors";

const Unsubscribe = ({ isLoading, unsubscribeStart }) => {
  const { id } = useParams();

  useEffect(() => {
    unsubscribeStart(id);
  }, [unsubscribeStart, id]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="column">
          <p>Pomyślnie wypisano z newslettera</p>
          <Link to="/">
            <CustomButton style={{ marginTop: "1em" }}>
              Strona główna
            </CustomButton>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingData,
});

const mapDispatchToProps = (dispatch) => ({
  unsubscribeStart: (id) => dispatch(unsubscribeStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe);
