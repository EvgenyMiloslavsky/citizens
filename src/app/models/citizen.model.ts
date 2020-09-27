export class Citizen {
  id?: string;
  name: string;
  surName: string;
  sex: string;
  dateOfBirth: string;
  phoneNumber: number;
  marriage: string;
  criminalRecords?: string;
  citizenShip: string[];
  photo?: string;

  public constructor(init?: Partial<Citizen>) {
    Object.assign(this, init);
  }
}
