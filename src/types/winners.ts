export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersWithCars extends Winner {
  name: string,
  color: string
}