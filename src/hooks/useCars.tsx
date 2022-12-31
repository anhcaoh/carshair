import {useEffect, useState} from 'react';

export interface ICar {
  // for used within app e.g. IFakeCar > ICar
  id: number;
  vin: string;
  make: string;
  color: string;
  model: string;
  year: number;
  price: string;
}
export interface IFakeCar {
  // from api fetched
  id: number;
  car_vin: string;
  car: string;
  car_color: string;
  car_model: string;
  car_model_year: number;
  price: string;
}
export const defaultCars = [
  {
    id: 381,
    car_vin: '5GTMNGEE8A8713093',
    car: 'bmw',
    car_color: 'red',
    car_model: 'x3',
    car_model_year: 2017,
    price: '$2987.01',
  },
];
const useCars = (): [IFakeCar[], boolean, any] => {
  const [cars, setCars] = useState<IFakeCar[]>(defaultCars);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://myfakeapi.com/api/cars/')
      .then(response => response.json())
      .then(results => setCars(results.cars.splice(0, 100)))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return [cars, loading, error];
};
export default useCars;
