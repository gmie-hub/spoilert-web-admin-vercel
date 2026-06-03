export interface BannedUserPerson {
  id: number;
  name: string;
  avatar?: string;
}

export interface BannedUser {
  id: number;
  user: BannedUserPerson;
  timeframe: string;
  /** ISO date string */
  banStartDate: string;
  /** ISO date string */
  banEndDate: string;
  reason: string;
}
