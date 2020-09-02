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
export class DeleteSoftwareByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/software/delete-software-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<DeleteSoftwareByProjectManagerPlant>):
    Observable<UseCaseFruit<DeleteSoftwareByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<DeleteSoftwareByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<DeleteSoftwareByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<DeleteSoftwareByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<DeleteSoftwareByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class DeleteSoftwareByProjectManagerFruit {
  isSuccessful: boolean;
}

export class DeleteSoftwareByProjectManagerPlant {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}

export class DeleteSoftwareByProjectManagerFruitSeeds {
  entity: Software4ProjectManager;
}

export class DeleteSoftwareByProjectManagerSeedsCommand {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}
