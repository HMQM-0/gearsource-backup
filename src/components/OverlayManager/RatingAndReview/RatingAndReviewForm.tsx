import "./scss/index.scss";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { useIntl, IntlShape } from "react-intl";
import { commonMessages } from "@temp/intl";
import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { SubmitRatingAndReview } from "./gqlTypes/SubmitRatingAndReview";
import { TypedRatingAndReviewMutation } from "./mutations";
import Rating from "@mui/material/Rating";
import { OverlayContext } from "../../../components/Overlay/context";
import TextArea from "@temp/components/TextArea";

const showSuccessNotification = (
  data: SubmitRatingAndReview,
  hide: () => void,
  alert: AlertManager,
  intl: IntlShape
) => {
  const successful = maybe(() => !data.submitRatingAndReview.errors.length);
  if (successful) {
    hide();
    alert.show(
      {
        title: intl.formatMessage({
          defaultMessage: "Your Rating and Review has been submitted.",
        }),
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const RatingAndReviewForm: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const alert = useAlert();
  const intl = useIntl();
  const { hide } = React.useContext(OverlayContext);

  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(null);
  const [noRatingSelected, setNoRatingSelected] = React.useState(null);

  return (
    <TypedRatingAndReviewMutation
      onCompleted={(data) => showSuccessNotification(data, hide, alert, intl)}
    >
      {(submitRatingAndReview, { loading, data }) => {
        return (
          <div style={{ padding: "25px" }}>
            <Form
              errors={maybe(() => data.submitRatingAndReview.errors, [])}
              onSubmit={(event, { headline, publicName, emailAddress }) => {
                event.preventDefault();
                if (!rating) {
                  setNoRatingSelected(true);
                  return;
                }
                setNoRatingSelected(false);
                submitRatingAndReview({
                  variables: {
                    headline,
                    publicName,
                    emailAddress,
                    rating,
                    review,
                    productId,
                  },
                });
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Overall rating
                </div>
                <div style={{ display: "flex", alignContent: "center" }}>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    // @ts-ignore
                    onChange={(e) => setRating(e.target.value)}
                  />
                  {noRatingSelected && (
                    <span
                      style={{
                        margin: "3px 0 0 5px",
                        color: "#fe6e76",
                        fontSize: "0.75rem",
                      }}
                    >
                      Please select rating.
                    </span>
                  )}
                </div>
              </div>
              <TextField
                name="publicName"
                label={"Choose your public name"}
                helpText="  This is how you'll appear to other customers."
                type="text"
                required
              />
              <TextField
                name="emailAddress"
                label={"Enter your email address"}
                helpText="  This will not be shared publicly."
                type="text"
                required
              />
              <TextField
                name="headline"
                label={"Add a headline"}
                helpText="  What's most important to know?"
                type="text"
                required
              />
              <TextArea
                name="review"
                label={"Add a written review"}
                helpText="  What did you like or dislike? What did you use this product for?"
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="login__content__button">
                <Button
                  testingContext="submitRegisterFormButton"
                  type="submit"
                  {...(loading && { disabled: true })}
                >
                  {loading
                    ? intl.formatMessage(commonMessages.loading)
                    : intl.formatMessage({ defaultMessage: "Submit" })}
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </TypedRatingAndReviewMutation>
  );
};

export default RatingAndReviewForm;
