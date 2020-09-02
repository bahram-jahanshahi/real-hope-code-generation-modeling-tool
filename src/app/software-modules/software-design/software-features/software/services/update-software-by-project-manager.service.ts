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
export class UpdateSoftwareByProjectManagerService {
  baseUrl = environment.baseUrl + '/app/admin/project-manager/software/update-software-by-project-manager';

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  cultivate(plant: UseCaseCommand<UpdateSoftwareByProjectManagerPlant>):
    Observable<UseCaseFruit<UpdateSoftwareByProjectManagerFruit>> {
    const url = this.baseUrl + '/cultivate';
    return this.httpClient
      .post<UseCaseFruit<UpdateSoftwareByProjectManagerFruit>>(
        url,
        plant,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }

  prepare(seedsCommand: UseCaseSeedsCommand<UpdateSoftwareByProjectManagerSeedsCommand>):
    Observable<UseCaseFruitSeeds<UpdateSoftwareByProjectManagerFruitSeeds>> {
    const url = this.baseUrl + '/prepare';
    return this.httpClient
      .post<UseCaseFruitSeeds<UpdateSoftwareByProjectManagerFruitSeeds>>(
        url,
        seedsCommand,
        this.securityService.getSecuredJsonHttpOptions()
      );
  }
}

export class UpdateSoftwareByProjectManagerFruit {
  isSuccessful: boolean;
}

export class UpdateSoftwareByProjectManagerPlant {
  id: number;
  softwareName: string;
  softwareTitle: string;
  springBootProjectPath: string;
  springBootProjectMainPackage: string;
  springBootJavaSrcPath: string;

  constructor(id: number, softwareName: string, softwareTitle: string, springBootProjectPath: string, springBootProjectMainPackage: string, springBootJavaSrcPath: string  ) {
    this.id = id;
    this.softwareName = softwareName;
    this.softwareTitle = softwareTitle;
    this.springBootProjectPath = springBootProjectPath;
    this.springBootProjectMainPackage = springBootProjectMainPackage;
    this.springBootJavaSrcPath = springBootJavaSrcPath;
  }
}

export class UpdateSoftwareByProjectManagerFruitSeeds {
  id: number;
  softwareName: string;
  softwareTitle: string;
  springBootProjectPath: string;
  springBootProjectMainPackage: string;
  springBootJavaSrcPath: string;
}

export class UpdateSoftwareByProjectManagerSeedsCommand {
  id: number;

  constructor(id: number  ) {
    this.id = id;
  }
}
