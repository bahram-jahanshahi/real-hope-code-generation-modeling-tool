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
export class ViewUseCaseDataAttributeByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case-data-attribute/view-use-case-data-attribute-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ViewUseCaseDataAttributeByProjectManagerPlant>):
    Observable<UseCaseFruit<ViewUseCaseDataAttributeByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ViewUseCaseDataAttributeByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ViewUseCaseDataAttributeByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ViewUseCaseDataAttributeByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ViewUseCaseDataAttributeByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ViewUseCaseDataAttributeByProjectManagerFruit {
  entity: UseCaseDataAttribute4ProjectManager;
}

export class ViewUseCaseDataAttributeByProjectManagerPlant {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}

export class ViewUseCaseDataAttributeByProjectManagerFruitSeeds {
}

export class ViewUseCaseDataAttributeByProjectManagerSeedsCommand {

  constructor(  ) {
  }
}
