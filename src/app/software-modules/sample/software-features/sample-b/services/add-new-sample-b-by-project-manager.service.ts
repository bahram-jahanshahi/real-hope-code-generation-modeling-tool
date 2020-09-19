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
export class AddNewSampleBByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/sample-b/add-new-sample-b-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<AddNewSampleBByProjectManagerPlant>):
    Observable<UseCaseFruit<AddNewSampleBByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<AddNewSampleBByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<AddNewSampleBByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<AddNewSampleBByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<AddNewSampleBByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class AddNewSampleBByProjectManagerFruit {
  id: number;
}

export class AddNewSampleBByProjectManagerPlant {
  id: number;
  name: string;
  active: boolean;
  createDate: JavaDate;
  value: number;
  sampleStatusEnum: SelectEnum;
  sampleA: SelectEntity;

  constructor(id: number, name: string, active: boolean, createDate: JavaDate, value: number, sampleStatus: SelectEnum, sampleA: SelectEntity  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.createDate = createDate;
    this.value = value;
    this.sampleStatusEnum = sampleStatus;
    this.sampleA = sampleA;
  }
}

export class AddNewSampleBByProjectManagerFruitSeeds {
  id: number;
  name: string;
  active: boolean;
  createDate: JavaDate;
  value: number;
  sampleStatusEnum: SelectEnum;
  sampleStatusEnumArray: Array<SelectEnum>;
  sampleA: SelectEntity;
  sampleAArray: Array<SelectEntity>;
}

export class AddNewSampleBByProjectManagerSeedsCommand {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}
