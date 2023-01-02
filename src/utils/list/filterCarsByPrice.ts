import {IFakeCar} from '../../hooks/useCars';

const filterCarsByPrice = (maxPrice: number, fakeCars: IFakeCar[]) => {
  const _maybeCarsByPrice = fakeCars.filter((car: IFakeCar) => {
    const carPriceNumber = car.price.substring(1);
    return parseInt(carPriceNumber, 10) <= maxPrice;
  });
  return _maybeCarsByPrice;
};
export default filterCarsByPrice;
