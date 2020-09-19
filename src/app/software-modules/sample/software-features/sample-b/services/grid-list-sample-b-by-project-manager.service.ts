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

import {SampleB4ProjectManager} from '../domain/sample-b4-project-manager';

@Injectable({
  providedIn: 'root'
})
export class GridListSampleBByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/sample-b/grid-list-sample-b-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<GridListSampleBByProjectManagerPlant>):
    Observable<UseCaseFruit<GridListSampleBByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<GridListSampleBByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<GridListSampleBByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<GridListSampleBByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<GridListSampleBByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class GridListSampleBByProjectManagerFruit {
  dataArray: Array<SampleB4ProjectManager>;
  pagedResultFruit: PagedResultFruit;
}

export class GridListSampleBByProjectManagerPlant {
  id: number;
  name: string;
  active: boolean;
  createDate: JavaDate;
  value: number;
  sampleStatusEnum: SelectEnum;
  sampleA: SelectEntity;
  paginationCommand: PaginationCommand;

  constructor(id: number, name: string, active: boolean, createDate: JavaDate, value: number, sampleStatus: SelectEnum, sampleA: SelectEntity, paginationCommand: PaginationCommand) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.createDate = createDate;
    this.value = value;
    this.sampleStatusEnum = sampleStatus;
    this.sampleA = sampleA;
    this.paginationCommand = paginationCommand;
  }
}

export class GridListSampleBByProjectManagerFruitSeeds {
}

export class GridListSampleBByProjectManagerSeedsCommand {
  paginationCommand: PaginationCommand;

  constructor(paginationCommand: PaginationCommand) {
    this.paginationCommand = paginationCommand;
  }
}
