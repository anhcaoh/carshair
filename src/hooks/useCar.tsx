import {useEffect, useState} from 'react';
import useCars, {defaultCars, IFakeCar} from './useCars';
export interface IUseCar {
  id: number;
  vin: string;
}
const useCar = ({id, vin}: IUseCar): IFakeCar => {
  const [cars] = useCars();
  const [car, setCar] = useState<IFakeCar>(defaultCars[0]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<any>(null);

  useEffect(() => {
    const _car = cars?.filter(
      ({id: car_id, car_vin}) => car_id === id && car_vin === vin,
    );
    _car?.length && setCar(_car[0]);
  }, [id, vin, cars]);

  return car;
};
export default useCar;
