import {
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getCountries from "../../api/getCountries";
import CountriesResponse from "../../interfaces/CountriesResponse";

function createSelect({
  countries,
  handleMenuItemClick,
  sok,
}: {
  countries: string[];
  handleMenuItemClick(country: string): void;
  sok: string;
}): JSX.Element {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      {sok === "" && (
        <InputLabel id="browseSelectLabel" sx={{}}>
          Land
        </InputLabel>
      )}
      <Select
        labelId="browseSelectLabel"
        label="Land"
        defaultValue=""
        data-testid="browseSelect"
      >
        {countries.map((country) => (
          <MenuItem
            key={encodeURIComponent(country)}
            value={country}
            onClick={() => handleMenuItemClick(country)}
          >
            {country}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Utforsk basert på land</FormHelperText>
    </FormControl>
  );
}

export default function Browse(): JSX.Element {
  const navigate = useNavigate();
  const sok = useSelector((state: any) => state.search.searchTerm);

  // State for the selected country
  const { isPending, isError, data, error } = useQuery<CountriesResponse>({
    queryKey: ["Countries"],
    queryFn: () => getCountries(),
    staleTime: Infinity,
  });

  const handleMenuItemClick = (country: string) => {
    navigate(`/results/${encodeURIComponent(country)}`);
  };

  if (isPending) {
    return createSelect({ countries: [], handleMenuItemClick, sok });
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const countries: string[] = data.getCountries;
  // Sort list alphabetically
  countries.sort((a, b) => a.localeCompare(b));

  if (!countries) {
    return createSelect({ countries: [], handleMenuItemClick, sok });
  }

  return createSelect({ countries, handleMenuItemClick, sok });
}
