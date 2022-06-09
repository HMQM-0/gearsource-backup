import { Grid } from "@mui/material";
import { BlockAlign, TextAlign, VerticalAlign } from "@temp/_nautical/types";
import * as React from "react";
import { MosaicTile } from "./components/MosaicTile";

import rect1 from "../HeroSlider/storyimages/example_01_1024.jpg";
import rect2 from "../HeroSlider/storyimages/example_02_1024.jpg";
// import square2 from "../PromoSlider/storyimages/example_01_690.jpg";
import square1 from "../PromoSlider/storyimages/example_06_690.jpg";
import "./scss/index.scss";

interface MosaicSectionProps {
  align?: string;
}

const MosaicSection: React.FC<MosaicSectionProps> = (props) => {
  return (
    <Grid container className="mosaic-container-p1">
      <Grid xs={6} className="mosaic-block-p1">
        <MosaicTile
          imageUrl={square1}
          blockAlign={BlockAlign.left}
          valueActionProps={{
            caption: {
              color: "#fff",
              text: "This is the life",
            },
            headline: {
              color: "#fff",
              text: "HEADLINE",
            },
            proposition: {
              color: "#fff",
              text: "Mosaic Tile Example",
            },
          }}
          verticalAlign={VerticalAlign.middle}
        />
      </Grid>
      <Grid xs={6} className="mosaic-block-p1">
        <MosaicTile
          imageUrl={rect1}
          blockAlign={BlockAlign.right}
          valueActionProps={{
            align: TextAlign.right,
            headline: {
              color: "#fff",
              text: "HEADLINE",
            },
            proposition: {
              color: "#fff",
              text: "Mosaic Tile Example",
            },
          }}
          verticalAlign={VerticalAlign.top}
        />
        <MosaicTile
          imageUrl={rect2}
          blockAlign={BlockAlign.right}
          valueActionProps={{
            align: TextAlign.right,
            headline: {
              color: "#fff",
              text: "HEADLINE",
            },
            proposition: {
              color: "#fff",
              text: "Mosaic Tile Example",
            },
          }}
          verticalAlign={VerticalAlign.top}
        />
      </Grid>
    </Grid>
  );
};

export default MosaicSection;
