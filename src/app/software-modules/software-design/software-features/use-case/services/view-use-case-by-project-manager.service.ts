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
export class ViewUseCaseByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/use-case/view-use-case-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ViewUseCaseByProjectManagerPlant>):
    Observable<UseCaseFruit<ViewUseCaseByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ViewUseCaseByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ViewUseCaseByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ViewUseCaseByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ViewUseCaseByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ViewUseCaseByProjectManagerFruit {
  entity: UseCase4ProjectManager;
}

export class ViewUseCaseByProjectManagerPlant {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}

export class ViewUseCaseByProjectManagerFruitSeeds {
}

export class ViewUseCaseByProjectManagerSeedsCommand {

  constructor(  ) {
  }
}
