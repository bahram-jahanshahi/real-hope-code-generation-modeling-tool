import {AuthenticatedSalesAgent} from './authenticated-sales-agent';
import {AuthenticatedPrivilege} from './authenticated-privilege';

export class AuthenticatedRole {

  name: string;

  userRoleName: string;

  authenticatedPrivilegeList: Array<AuthenticatedPrivilege>;

  authenticatedSalesAgent: AuthenticatedSalesAgent;
}
