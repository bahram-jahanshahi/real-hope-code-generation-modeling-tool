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

import {UseCaseDataAttribute4ProjectManager} from '../domain/use-case-data-attribute4-project-manager';

@Injectable({
  providedIn: 'root'
})
export class ListUseCaseDataAttributeByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case-data-attribute/list-use-case-data-attribute-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ListUseCaseDataAttributeByProjectManagerPlant>):
    Observable<UseCaseFruit<ListUseCaseDataAttributeByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ListUseCaseDataAttributeByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ListUseCaseDataAttributeByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ListUseCaseDataAttributeByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ListUseCaseDataAttributeByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ListUseCaseDataAttributeByProjectManagerFruit {
  dataArray: Array<UseCaseDataAttribute4ProjectManager>;
  pagedResultFruit: PagedResultFruit;
}

export class ListUseCaseDataAttributeByProjectManagerPlant {
  useCaseDataAttributeName: string;
  paginationCommand: PaginationCommand;

  constructor(useCaseDataAttributeName: string, paginationCommand: PaginationCommand) {
    this.useCaseDataAttributeName = useCaseDataAttributeName;
    this.paginationCommand = paginationCommand;
  }
}

export class ListUseCaseDataAttributeByProjectManagerFruitSeeds {
}

export class ListUseCaseDataAttributeByProjectManagerSeedsCommand {
  paginationCommand: PaginationCommand;

  constructor(paginationCommand: PaginationCommand) {
    this.paginationCommand = paginationCommand;
  }
}
