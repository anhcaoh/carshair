import {IFakeCar} from '../../hooks/useCars';

const filterCars = (anyText: string, fakeCars: IFakeCar[]) => {
  const _maybeCarVIN: IFakeCar[] = [];
  const _maybeCarMake: IFakeCar[] = [];
  const _maybeCarModel: IFakeCar[] = [];
  const _maybeCarYear: IFakeCar[] = [];
  const _maybeCarColor: IFakeCar[] = [];
  const _maybeCarPrice: IFakeCar[] = [];

  fakeCars.forEach((car: IFakeCar) => {
    const _text = anyText.toLowerCase();
    car.car_vin.toLowerCase().includes(_text) && _maybeCarVIN.push(car);
    car.car.toLowerCase().includes(_text) && _maybeCarMake.push(car);
    car.car_model.toLowerCase().includes(_text) && _maybeCarModel.push(car);
    car.car_model_year.toString() === _text && _maybeCarYear.push(car);
    car.car_color.toLowerCase() === _text && _maybeCarColor.push(car);
    car.price.substring(1).includes(_text) && _maybeCarPrice.push(car);
  });
  return [
    _maybeCarVIN,
    _maybeCarMake,
    _maybeCarModel,
    _maybeCarYear,
    _maybeCarColor,
    _maybeCarPrice,
  ].flat();
};
export default filterCars;
