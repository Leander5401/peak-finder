import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  SvgIconTypeMap,
  CardMedia,
  CardContent,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import PentagonIcon from "@mui/icons-material/Pentagon";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useEffect, useState } from "react";
import GondolaIcon from "../assets/GondolaIcon.svg";
import SkiliftIcon from "../assets/SkiliftIcon.svg";
import surfaceLiftIcon from "../assets/surfaceLiftIcon.svg";
import LogoIcon from "../assets/logos/logo-black-cropped.svg";
import fischbach from "../assets/Fischbach.jpg";

const ListItemIconCentered = styled(ListItemIcon)({
  justifyContent: "center",
});

// This component displays an image associated with a destination.
function DestinationImage({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element {
  return <CardMedia image={img} title={name} sx={{ height: "400px" }} />;
}

// This component displays the name of a destination.
function DestinationName({ name }: { name: string }): JSX.Element {
  return <Typography variant="h2">{name}</Typography>;
}

// This component displays the country of a destination.
function DestinationCountry({ country }: { country: string }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Land" secondary={country} />
    </ListItem>
  );
}

// This component displays the height range of a destination.
function DestinationHeight({
  minHeight,
  maxHeight,
}: {
  minHeight: number;
  maxHeight: number;
}): JSX.Element {
  const heightDiff = maxHeight - minHeight;
  return (
    <ListItem>
      <ListItemText
        primary="Meter over havet"
        secondary={`${minHeight} m - ${maxHeight} m (${heightDiff} m)`}
      />
    </ListItem>
  );
}

// This component displays information about ski pass prices.
function DestinationPass({ passPrice }: { passPrice: number }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Dagspass voksen" secondary={`${passPrice} kr`} />
    </ListItem>
  );
}

// This component displays a list of destination information,
// including country and height, using the previously defined functions.
function DestinationInfo({
  country,
  minHeight,
  maxHeight,
  passPrice,
}: {
  country: string;
  minHeight: number;
  maxHeight: number;
  passPrice: number;
}): JSX.Element {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <DestinationCountry country={country} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DestinationHeight minHeight={minHeight} maxHeight={maxHeight} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DestinationPass passPrice={passPrice} />
      </Grid>
    </Grid>
  );
}

// This component displays the rating of a destination
function DestinationRating({
  rating,
  ratings,
}: {
  rating: number;
  ratings: number;
}): JSX.Element {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={1}
      sx={{
        margin: 0,
        paddingLeft: "5px",
        justifyContent: isSmallScreen ? "left" : "right",
      }}
    >
      <Typography sx={{ paddingRight: "5px" }}>{rating}</Typography>
      <Rating name="showRating" value={rating} precision={0.5} readOnly />
      <Typography sx={{ paddingLeft: "5px" }}>({ratings})</Typography>
    </Grid>
  );
}

function DestinationReviewButton({
  handleRatingDialogOpen,
}: {
  handleRatingDialogOpen: () => void;
}) {
  return (
    <Button onClick={handleRatingDialogOpen} variant="outlined">
      Vurder destinasjon
    </Button>
  );
}

// This component displays a Dialog to add a review
// It sends the value to the Destination funciton
function DestinationGiveReview({
  isOpen,
  handleClose,
  handleGiveRating,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleGiveRating: (rating: number) => void;
}): JSX.Element {
  const [newRating, setNewRating] = useState(0);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Gi en vurdering</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Rating
          name="newRating"
          value={newRating}
          onChange={(_event, value: number | null) => {
            if (value != null) {
              setNewRating(value);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button
          onClick={() => {
            handleGiveRating(newRating);
          }}
        >
          Send inn
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// This component displays a total of the pistes/lifts availible
function DestinationTotal({
  totalType,
  totalNumber,
}: {
  totalType: string;
  totalNumber: number;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIconCentered>
        <DragHandleIcon sx={{ color: "Black" }} />
      </ListItemIconCentered>
      <ListItemText
        primary="Totalt"
        secondary={`${totalNumber} ${
          totalType.toLowerCase() === "piste" ? "km" : ""
        }`}
      />
    </ListItem>
  );
}

// This component displays information about destination's piste.
function DestinationPiste({
  pisteType,
  pisteDistance,
  PisteIcon,
  iconColor,
}: {
  pisteType: string;
  pisteDistance: number;
  PisteIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  iconColor: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIconCentered>
        <PisteIcon sx={{ color: iconColor }} />
      </ListItemIconCentered>
      <ListItemText primary={pisteType} secondary={`${pisteDistance} km`} />
    </ListItem>
  );
}

// This component displays a list of pistes
// of different difficulty levels (beginner, intermediate, difficult)
// using the previously defined DestinationPiste function.
function DestinationPistes({
  beginner,
  intermediate,
  advanced,
}: {
  beginner: number;
  intermediate: number;
  advanced: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Skibakker
      </Typography>
      <List>
        <DestinationPiste
          pisteType="Nybegynner"
          pisteDistance={beginner}
          PisteIcon={CircleIcon}
          iconColor="Blue"
        />
        <DestinationPiste
          pisteType="Middels"
          pisteDistance={intermediate}
          PisteIcon={SquareIcon}
          iconColor="Red"
        />
        <DestinationPiste
          pisteType="Vanskelig"
          pisteDistance={advanced}
          PisteIcon={PentagonIcon}
          iconColor="Black"
        />
        <DestinationTotal
          totalType="Piste"
          totalNumber={beginner + intermediate + advanced}
        />
      </List>
    </>
  );
}

// This component displays information about the ski lifts.
function DestinationLift({
  liftType,
  liftAmount,
  liftIcon,
}: {
  liftType: string;
  liftAmount: number;
  liftIcon: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIconCentered>
        <Box component="img" src={liftIcon} sx={{ maxWidth: "50px" }} />
      </ListItemIconCentered>
      <ListItemText
        primary={liftType}
        secondary={liftAmount}
        sx={{ paddingLeft: "5px" }}
      />
    </ListItem>
  );
}

// This component displays a list of different types of ski lifts
// (e.g., gondolas, chairlifts and surfaces lifts)
// using the previously defined DestinationLift function.
function DestinationLifts({
  gondolas,
  chairlifts,
  surfaceLifts,
}: {
  gondolas: number;
  chairlifts: number;
  surfaceLifts: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Skiheiser
      </Typography>
      <List>
        <DestinationLift
          liftType="Gondoler"
          liftAmount={gondolas}
          liftIcon={GondolaIcon}
        />
        <DestinationLift
          liftType="Stolheiser"
          liftAmount={chairlifts}
          liftIcon={SkiliftIcon}
        />
        <DestinationLift
          liftType="Ankerheiser"
          liftAmount={surfaceLifts}
          liftIcon={surfaceLiftIcon}
        />
        <DestinationTotal
          totalType="Lifts"
          totalNumber={gondolas + chairlifts + surfaceLifts}
        />
      </List>
    </>
  );
}

// This component displays information about a specific extra for the destination
function DestinationExtra({
  text,
  boolean,
  Icon,
}: {
  text: string;
  boolean: boolean;
  Icon:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      })
    | string;
}): JSX.Element {
  const tekst = boolean ? "Ja" : "Nei";
  let icon;
  if (typeof Icon === "string") {
    icon = <Box component="img" src={LogoIcon} sx={{ maxWidth: "40px" }} />;
  } else {
    icon = <Icon sx={{ minWidth: "40px" }} />;
  }
  return (
    <ListItem>
      {icon}
      <ListItemText
        primary={text}
        secondary={tekst}
        sx={{ paddingLeft: "5px" }}
      />
    </ListItem>
  );
}

// This component displays if the destination has a snow park, night ski or is certified
function DestinationExtras({
  snowPark,
  nightSki,
  certified,
}: {
  snowPark: boolean;
  nightSki: boolean;
  certified: boolean;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4">Ekstra</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <DestinationExtra
            text="Har park"
            boolean={snowPark}
            Icon={SnowboardingIcon}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DestinationExtra
            text="Har kveldskjøring"
            boolean={nightSki}
            Icon={NightlightIcon}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <DestinationExtra
            text="Peak Finder sertifisert"
            boolean={certified}
            Icon={LogoIcon}
          />
        </Grid>
      </Grid>
    </>
  );
}

// This is the main component exported from the module.
// It uses the previously defined functions to display
// information about the destination, including
// images, name, country, height, ski tracks, ski lifts, ski pass prices, and user reviews.
export default function Destination({
  destinationName,
}: {
  destinationName: string;
}) {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const handleRatingDialogOpen = () => {
    setIsRatingDialogOpen(true);
  };

  const handleRatingDialogClose = () => {
    setIsRatingDialogOpen(false);
  };

  const handleGiveRating = (newValue: number) => {
    setNewRating(newValue);
    handleRatingDialogClose();
  };

  // Is going to be used to send the newRating to the backend
  // when a user submits a review
  useEffect(() => {}, [newRating]);

  return (
    <>
      <Card raised>
        <DestinationImage name={destinationName} img={fischbach} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DestinationName name={destinationName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DestinationRating rating={3.4} ratings={53} />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent sx={{ paddingTop: "0px", paddingLeft: "20px" }}>
          <DestinationInfo
            country="Norge"
            minHeight={1000}
            maxHeight={3300}
            passPrice={50}
          />
          <Grid container spacing={2} sx={{ paddingTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <DestinationPistes beginner={8} intermediate={7} advanced={6} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DestinationLifts gondolas={2} chairlifts={6} surfaceLifts={10} />
            </Grid>
          </Grid>
          <DestinationExtras snowPark nightSki={false} certified />
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", paddingTop: "20px" }}
          >
            <DestinationReviewButton
              handleRatingDialogOpen={handleRatingDialogOpen}
            />
          </Grid>
        </CardContent>
      </Card>
      <DestinationGiveReview
        isOpen={isRatingDialogOpen}
        handleClose={handleRatingDialogClose}
        handleGiveRating={handleGiveRating}
      />
    </>
  );
}
