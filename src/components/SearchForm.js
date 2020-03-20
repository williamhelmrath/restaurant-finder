import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

let searchTerm = "";

export default function SearchForm({ handleNext, setSearchTerm }) {
  const handleSearch = () => {
    setSearchTerm(searchTerm);
    handleNext();
  };

  const handleMouseDownSearch = event => event.preventDefault();

  const updateSearchTerm = e => {
    searchTerm = e.target.value;
    console.log(searchTerm);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search">Location</InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type="text"
          autoFocus={true}
          onChange={e => updateSearchTerm(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                disabled={searchTerm.length > 1}
                onClick={handleSearch}
                onMouseDown={handleMouseDownSearch}
              >
                <SearchIcon></SearchIcon>
              </IconButton>
            </InputAdornment>
          }
          labelWidth={65}
        />
      </FormControl>
    </div>
  );
}
