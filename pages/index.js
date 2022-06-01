import {useState} from "react";
import {Container, Stack} from "@mui/material";

import provinces from '../data/provinces.json'
import cities from '../data/cities.json'
import areas from '../data/areas.json'
import RandomSelect from "../components/RandomSelect";
import styles from '../styles/Home.module.css';

export default function Home() {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  return (
    <Container>
      <h1>
        Gimme a Direction!
      </h1>
      <Stack spacing={4} className={styles.selects}>
        <RandomSelect id="province" title="省/直辖市" value={province} onChange={setProvince} options={provinces}/>
        <RandomSelect id="city" title="市" value={city} onChange={setCity}
                      options={cities.filter(city => city.provinceCode === province)}/>
        <RandomSelect id="area" title="区/县" value={area} onChange={setArea}
                      options={areas.filter(area => area.cityCode === city)}/>
      </Stack>
    </Container>
  )
}