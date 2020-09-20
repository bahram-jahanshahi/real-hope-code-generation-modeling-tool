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
export class ViewSampleBByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/sample-b/view-sample-b-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<ViewSampleBByProjectManagerPlant>):
    Observable<UseCaseFruit<ViewSampleBByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<ViewSampleBByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<ViewSampleBByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<ViewSampleBByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<ViewSampleBByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class ViewSampleBByProjectManagerFruit {
  entity: SampleB4ProjectManager;
}

export class ViewSampleBByProjectManagerPlant {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}

export class ViewSampleBByProjectManagerFruitSeeds {
}

export class ViewSampleBByProjectManagerSeedsCommand {

  constructor(  ) {
  }
}
