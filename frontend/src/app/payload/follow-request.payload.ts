import {UserPayload} from './user.payload';

export class FollowRequestPayload {
  constructor(public follower: UserPayload, public following: UserPayload) {
  }
}
