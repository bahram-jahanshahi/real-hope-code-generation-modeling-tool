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
export class AddNewUseCaseDataAttributeByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case-data-attribute/add-new-use-case-data-attribute-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<AddNewUseCaseDataAttributeByProjectManagerPlant>):
    Observable<UseCaseFruit<AddNewUseCaseDataAttributeByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<AddNewUseCaseDataAttributeByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<AddNewUseCaseDataAttributeByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<AddNewUseCaseDataAttributeByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<AddNewUseCaseDataAttributeByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class AddNewUseCaseDataAttributeByProjectManagerFruit {
  isSuccessful: boolean;
}

export class AddNewUseCaseDataAttributeByProjectManagerPlant {
  id: number;
  name: string;
  title: string;
  faTitle: string;
  description: string;
  uiRow: number;
  uiColumn: number;
  useCaseUsageEnumEnum: SelectEnum;
  attributeQuantityEnum: SelectEnum;
  attributeCategoryEnum: SelectEnum;
  primitiveAttributeTypeEnum: SelectEnum;
  setterOfUpdatePath: string;
  getterOfUpdatePath: string;
  nullable: boolean;
  required: boolean;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  errorTip: string;
  domainEntityAttributeType: SelectEntity;
  dataEntityAttributeType: SelectEntity;
  useCaseData: SelectEntity;
  fruitSeedsAttribute: SelectEntity;
  dataEnum: SelectEntity;

  constructor(id: number, name: string, title: string, faTitle: string, description: string, uiRow: number, uiColumn: number, useCaseUsageEnum: SelectEnum, attributeQuantity: SelectEnum, attributeCategory: SelectEnum, primitiveAttributeType: SelectEnum, setterOfUpdatePath: string, getterOfUpdatePath: string, nullable: boolean, required: boolean, minLength: number, maxLength: number, min: number, max: number, errorTip: string, domainEntityAttributeType: SelectEntity, dataEntityAttributeType: SelectEntity, useCaseData: SelectEntity, fruitSeedsAttribute: SelectEntity, dataEnum: SelectEntity  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.faTitle = faTitle;
    this.description = description;
    this.uiRow = uiRow;
    this.uiColumn = uiColumn;
    this.useCaseUsageEnumEnum = useCaseUsageEnum;
    this.attributeQuantityEnum = attributeQuantity;
    this.attributeCategoryEnum = attributeCategory;
    this.primitiveAttributeTypeEnum = primitiveAttributeType;
    this.setterOfUpdatePath = setterOfUpdatePath;
    this.getterOfUpdatePath = getterOfUpdatePath;
    this.nullable = nullable;
    this.required = required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.min = min;
    this.max = max;
    this.errorTip = errorTip;
    this.domainEntityAttributeType = domainEntityAttributeType;
    this.dataEntityAttributeType = dataEntityAttributeType;
    this.useCaseData = useCaseData;
    this.fruitSeedsAttribute = fruitSeedsAttribute;
    this.dataEnum = dataEnum;
  }
}

export class AddNewUseCaseDataAttributeByProjectManagerFruitSeeds {
  id: number;
  name: string;
  title: string;
  faTitle: string;
  description: string;
  uiRow: number;
  uiColumn: number;
  useCaseUsageEnumEnum: SelectEnum;
  useCaseUsageEnumEnumArray: Array<SelectEnum>;
  attributeQuantityEnum: SelectEnum;
  attributeQuantityEnumArray: Array<SelectEnum>;
  attributeCategoryEnum: SelectEnum;
  attributeCategoryEnumArray: Array<SelectEnum>;
  primitiveAttributeTypeEnum: SelectEnum;
  primitiveAttributeTypeEnumArray: Array<SelectEnum>;
  setterOfUpdatePath: string;
  getterOfUpdatePath: string;
  nullable: boolean;
  required: boolean;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  errorTip: string;
  domainEntityAttributeType: SelectEntity;
  domainEntityAttributeTypeArray: Array<SelectEntity>;
  dataEntityAttributeType: SelectEntity;
  dataEntityAttributeTypeArray: Array<SelectEntity>;
  useCaseData: SelectEntity;
  useCaseDataArray: Array<SelectEntity>;
  fruitSeedsAttribute: SelectEntity;
  fruitSeedsAttributeArray: Array<SelectEntity>;
  dataEnum: SelectEntity;
  dataEnumArray: Array<SelectEntity>;
}

export class AddNewUseCaseDataAttributeByProjectManagerSeedsCommand {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}
