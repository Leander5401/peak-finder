import { Box, Container, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logoLight from "../assets/light/logos/bigMainLogoDark.svg";
import logoDark from "../assets/dark/logos/bigMainLogoLight.svg";
import Browse from "../features/Browse/Browse";
import { resetFilter } from "../features/Filter/filterSlice";
import Searchbar from "../features/Searchbar/Searchbar";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import usePageTitle from "../hooks/usePageTitle";

function Logo(): JSX.Element {
  // Media query for mobile that increases size of logo
  const isMobile = useMediaQuery("(max-aspect-ratio: 3/4)");
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Box
      role="img"
      component="img"
      alt="Peak Finder logo"
      src={theme === "light" ? logoDark : logoLight}
      sx={{
        width: isMobile ? "80%" : "50%",
      }}
    />
  );
}

export default function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  usePageTitle("Hjem");

  useEffect(() => {
    dispatch(resetFilter());

    if (location.state && location.state.isRedirect) {
      // Focus the input element when redirected
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [dispatch, location.state]);

  useEffect(() => {
    sessionStorage.setItem("resultPageScrollY", "0");
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10rem",
      }}
    >
      <Logo />
      <Searchbar inputRef={inputRef} />
      <br />
      <Browse />
    </Container>
  );
}
