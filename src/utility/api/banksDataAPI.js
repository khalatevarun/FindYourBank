import { BASE_URL } from '../../constants/apiEndpoints';
import { myLocalStorage } from '../localStorageWrapper';

export async function getAllBanksData(city) {
  if (myLocalStorage.getItem(city)) {
    return JSON.parse(myLocalStorage.getItem(city));
  } else {
    const url = BASE_URL + `?city=${city}`;
    return await fetch(url).then((result) => result.json());
  }
}
