import axios from "axios";

const ATTRACTIONS_CODE = '110000';

export default async function handler(req, res) {
  const {area} = req.query;
  const params = new URLSearchParams({key: process.env.AMAP_KEY});
  params.append('types', ATTRACTIONS_CODE);
  params.append('city', area);
  params.append('extensions', 'all');
  params.append('children', '1');

  const response = await axios.get('https://restapi.amap.com/v3/place/text', {params});

  res.status(response.status).json(response.data);
}