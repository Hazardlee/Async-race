export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersWithCars extends Winner {
  name: string;
  color: string;
}

export interface RaceWinner {
  id: number;
  name: string;
  time: number;
}
