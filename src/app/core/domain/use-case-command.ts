export class UseCaseCommand<T> {
  plant: T;
  locale: string;

  constructor(plant: T, locale: string) {
    this.plant = plant;
    this.locale = locale;
  }
}
