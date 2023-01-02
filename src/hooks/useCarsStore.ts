import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IFakeCar} from './useCars';

export interface ICartState<ItemType> {
  cars: ItemType[];
  addToStore: (car: ItemType) => void;
  addCarsToStore: (cars: ItemType[]) => void;
  removeAllFromStore: () => void;
}
const useCarsStore = create<ICartState<IFakeCar>>()(
  devtools(
    persist(
      (set, get) => ({
        cars: [],
        addToStore: (car: IFakeCar) => set({cars: [...get().cars, car]}),
        addCarsToStore: (cars: IFakeCar[]) => set({cars}),
        removeAllFromStore: () => set({cars: []}),
      }),
      {
        name: 'cars-storage',
        getStorage: () => AsyncStorage,
      },
    ),
  ),
);
export default useCarsStore;
