import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import provinces from '../data/provinces.json'

export default function Home() {
  return (
    <Container>
      <h1>
        Gimme a Direction!
      </h1>
      <FormControl fullWidth>
        <InputLabel id="select-province">省/直辖市</InputLabel>
        <Select
          labelId="select-province"
          label="省/直辖市"
        >
          {provinces.map(province => (<MenuItem key={province.code} value={province.code}>{province.name}</MenuItem>))}
        </Select>
      </FormControl>
    </Container>
  )
}