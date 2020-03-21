import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchForm({ handleNext, setSearchTerm, searchTerm }) {
  const handleSearch = () => {
    setSearchTerm(searchTerm);
    handleNext();
  };

  const handleMouseDownSearch = e => e.preventDefault();

  const updateSearchTerm = e => setSearchTerm(e.target.value);

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
                disabled={searchTerm.length === 0}
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
