import {AuthenticatedRole} from './authenticated-role';

export class AuthenticatedUser {

  userId: number;

  firstName: string;

  lastName: string;

  authenticatedRoleList: Array<AuthenticatedRole>;
}
