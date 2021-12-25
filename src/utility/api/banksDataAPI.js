import { BASE_URL } from '../../constants/apiEndpoints';

export async function getAllBanksData(city) {
  const url = BASE_URL + `?city=${city}`;
  return await fetch(url).then((data) => data.json());
}
