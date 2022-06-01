import {Fragment, useState} from "react";
import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader, Rating,
  Stack
} from "@mui/material";
import useSWR from 'swr'

import provinces from '../data/provinces.json'
import cities from '../data/cities.json'
import areas from '../data/areas.json'
import RandomSelect from "../components/RandomSelect";
import styles from '../styles/Home.module.css';

const fetcher = url => fetch(url).then(r => r.json());

export default function Home() {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const {data: attractions} = useSWR(area ? '/api/attractions/' + area : null, fetcher);

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
      {attractions && (<List className={styles.imageList} subheader={<ListSubheader>Recommendations</ListSubheader>}>
        {attractions.pois.sort((a, b) => b.biz_ext.rating - a.biz_ext.rating).map(({id, name, photos, biz_ext}) => (
          <Fragment key={id}>
            <ListItem className={styles.listItem} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar className={styles.image} src={photos[0]?.url || 'fallback'} alt={name} variant="square"/>
              </ListItemAvatar>
              <div className={styles.description}>
                <div>{name}</div>
                <Stack direction="row" alignItems="center">
                  <Rating value={Number(biz_ext.rating)} size="small" precision={0.1} readOnly/>
                  <span className={styles.rating}>{biz_ext.rating}</span>
                </Stack>
              </div>
            </ListItem>
            <Divider variant="inset" component="li"/>
          </Fragment>
        ))}
      </List>)}
    </Container>
  )
}