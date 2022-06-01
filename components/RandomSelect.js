import {FormControl, IconButton, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import styles from "../styles/RandomSelect.module.css";
import CasinoIcon from "@mui/icons-material/Casino";

export default function RandomSelect({id, title, value, onChange, options}) {
  const disabled = options.length === 0;
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="select-province">{title}</InputLabel>
        <Select
          value={value}
          labelId={'label-' + id}
          label={title}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(region => (
            <MenuItem key={region.code} value={region.code}>{region.name}</MenuItem>))}
        </Select>
      </FormControl>
      <IconButton className={styles.iconButton} disabled={disabled} onClick={() => {
        onChange(options[Math.floor(Math.random() * options.length)].code)
      }}>
        <CasinoIcon color="primary"/>
      </IconButton>
    </Stack>
  );
}