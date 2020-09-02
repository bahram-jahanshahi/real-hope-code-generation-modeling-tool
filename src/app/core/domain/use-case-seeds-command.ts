export class UseCaseSeedsCommand<T> {
  seedsCommand: T;
  locale: string;

  constructor(seedsCommand: T, locale: string) {
    this.seedsCommand = seedsCommand;
    this.locale = locale;
  }
}
