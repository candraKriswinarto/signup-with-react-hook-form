import { FormControl, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const SelectFields = ({ label, name, control, errors }) => {
  const [listCountry, setListCountry] = useState([]);
  const countryNames = listCountry.map(item => item.name.common).sort();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => setListCountry(data))
  }, []);


  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...addErrorIntoField(errors[name])} {...field} required select label={label} variant="filled">
            <MenuItem value=''><em>None</em></MenuItem>
            {countryNames.map(country => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}

    </FormControl>
  )
}

export default SelectFields