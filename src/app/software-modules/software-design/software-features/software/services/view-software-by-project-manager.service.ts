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
export class ViewSoftwareByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/software/view-software-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ViewSoftwareByProjectManagerPlant>):
    Observable<UseCaseFruit<ViewSoftwareByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ViewSoftwareByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ViewSoftwareByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ViewSoftwareByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ViewSoftwareByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ViewSoftwareByProjectManagerFruit {
  entity: Software4ProjectManager;
}

export class ViewSoftwareByProjectManagerPlant {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}

export class ViewSoftwareByProjectManagerFruitSeeds {
}

export class ViewSoftwareByProjectManagerSeedsCommand {

  constructor(  ) {
  }
}
