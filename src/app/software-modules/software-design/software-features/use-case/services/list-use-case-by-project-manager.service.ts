import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SecurityService} from '../../../../../core/services/security.service';
import {environment} from '../../../../../../environments/environment';
import {UseCaseCommand} from '../../../../../core/domain/use-case-command';
import {PagedResultFruit} from '../../../../../core/domain/paged-result-fruit';
import {UseCaseFruit} from '../../../../../core/domain/use-case-fruit';
import {UseCaseSeedsCommand} from '../../../../../core/domain/use-case-seeds-command';
import {UseCaseFruitSeeds} from '../../../../../core/domain/use-case-fruit-seeds';
import {PaginationCommand} from '../../../../../core/domain/pagination-command';
import {JavaDate} from '../../../../../core/domain/java-date';
import {SelectEnum} from '../../../../../core/domain/select-enum';
import {SelectEntity} from '../../../../../core/domain/select-entity';

import {UseCase4ProjectManager} from '../domain/use-case4-project-manager';

@Injectable({
  providedIn: 'root'
})
export class ListUseCaseByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case/list-use-case-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ListUseCaseByProjectManagerPlant>):
    Observable<UseCaseFruit<ListUseCaseByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ListUseCaseByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ListUseCaseByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ListUseCaseByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ListUseCaseByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ListUseCaseByProjectManagerFruit {
  dataArray: Array<UseCase4ProjectManager>;
  pagedResultFruit: PagedResultFruit;
}

export class ListUseCaseByProjectManagerPlant {
  useCaseName: string;
  paginationCommand: PaginationCommand;

  constructor(useCaseName: string, paginationCommand: PaginationCommand) {
    this.useCaseName = useCaseName;
    this.paginationCommand = paginationCommand;
  }
}

export class ListUseCaseByProjectManagerFruitSeeds {
}

export class ListUseCaseByProjectManagerSeedsCommand {
  paginationCommand: PaginationCommand;

  constructor(paginationCommand: PaginationCommand) {
    this.paginationCommand = paginationCommand;
  }
}
