import { Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import hemsedalImage from "../assets/hemsedal.jpg";

function addResult(destinationCardProps: DestinationCardProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <DestinationCard destinationCardProps={destinationCardProps} />
    </Grid>
  );
}

// This funciton creates bread crumbs used for navigation between pages
function ResultsBreadCrumbs(): JSX.Element {
  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="Navigasjon">
        <Link underline="hover" color="inherit" href="/">
          Hjem
        </Link>
        <Typography color="text.primary">Resultater</Typography>
      </Breadcrumbs>
    </Grid>
  );
}

export default function Result(): JSX.Element {
  // Mock values
  const mockDestinationCardProps: DestinationCardProps = {
    name: "Saalbach-Hinterglem-Leogang-Fieberbrunn",
    imageSrc: hemsedalImage,
    imageAlt: "Bilde av Saalbach-Hinterglem-Leogang-Fieberbrunn",
    lowestPoint: 1030,
    highestPoint: 2479,
    beginner: 130,
    intermediate: 220,
    advanced: 80,
    lifts: 15,
  };
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container spacing={4}>
        <ResultsBreadCrumbs />
        {/* Temporary since we cannot implement this without backend */}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
      </Grid>
    </Container>
  );
}
