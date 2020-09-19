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
export class UpdateUseCaseByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case/update-use-case-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<UpdateUseCaseByProjectManagerPlant>):
    Observable<UseCaseFruit<UpdateUseCaseByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<UpdateUseCaseByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<UpdateUseCaseByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<UpdateUseCaseByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<UpdateUseCaseByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class UpdateUseCaseByProjectManagerFruit {
  newUseCaseId: number;
}

export class UpdateUseCaseByProjectManagerPlant {
  id: number;
  name: string;
  title: string;
  faTitle: string;
  description: string;
  userInterfaceTypeEnum: SelectEnum;
  softwareFeature: SelectEntity;
  softwareApplicationPanel: SelectEntity;
  softwareRole: SelectEntity;
  dataEntity: SelectEntity;
  generationEnable: boolean;
  crudCodeGeneration: SelectEntity;

  constructor(id: number, name: string, title: string, faTitle: string, description: string, userInterfaceType: SelectEnum, softwareFeature: SelectEntity, softwareApplicationPanel: SelectEntity, softwareRole: SelectEntity, dataEntity: SelectEntity, generationEnable: boolean, crudCodeGeneration: SelectEntity  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.faTitle = faTitle;
    this.description = description;
    this.userInterfaceTypeEnum = userInterfaceType;
    this.softwareFeature = softwareFeature;
    this.softwareApplicationPanel = softwareApplicationPanel;
    this.softwareRole = softwareRole;
    this.dataEntity = dataEntity;
    this.generationEnable = generationEnable;
    this.crudCodeGeneration = crudCodeGeneration;
  }
}

export class UpdateUseCaseByProjectManagerFruitSeeds {
  id: number;
  name: string;
  title: string;
  faTitle: string;
  description: string;
  userInterfaceTypeEnum: SelectEnum;
  userInterfaceTypeEnumArray: Array<SelectEnum>;
  softwareFeature: SelectEntity;
  softwareFeatureArray: Array<SelectEntity>;
  softwareApplicationPanel: SelectEntity;
  softwareApplicationPanelArray: Array<SelectEntity>;
  softwareRole: SelectEntity;
  softwareRoleArray: Array<SelectEntity>;
  dataEntity: SelectEntity;
  dataEntityArray: Array<SelectEntity>;
  generationEnable: boolean;
  crudCodeGeneration: SelectEntity;
  crudCodeGenerationArray: Array<SelectEntity>;
}

export class UpdateUseCaseByProjectManagerSeedsCommand {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}
