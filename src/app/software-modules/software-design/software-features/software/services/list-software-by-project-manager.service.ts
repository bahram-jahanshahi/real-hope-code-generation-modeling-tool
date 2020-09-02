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

import {Software4ProjectManager} from '../domain/software4-project-manager';

@Injectable({
  providedIn: 'root'
})
export class ListSoftwareByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/software/list-software-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ListSoftwareByProjectManagerPlant>):
    Observable<UseCaseFruit<ListSoftwareByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ListSoftwareByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ListSoftwareByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ListSoftwareByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ListSoftwareByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ListSoftwareByProjectManagerFruit {
  dataArray: Array<Software4ProjectManager>;
  pagedResultFruit: PagedResultFruit;
}

export class ListSoftwareByProjectManagerPlant {
  softwareName: string;
  softwareTitle: string;
  paginationCommand: PaginationCommand;

  constructor(softwareName: string, softwareTitle: string, paginationCommand: PaginationCommand) {
    this.softwareName = softwareName;
    this.softwareTitle = softwareTitle;
    this.paginationCommand = paginationCommand;
  }
}

export class ListSoftwareByProjectManagerFruitSeeds {
}

export class ListSoftwareByProjectManagerSeedsCommand {
  paginationCommand: PaginationCommand;

  constructor(paginationCommand: PaginationCommand) {
    this.paginationCommand = paginationCommand;
  }
}
