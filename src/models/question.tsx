export interface Question {
  id: number;
  question: string;
  choices: string[];
  createdAt: Date;
  votes: number[],
  user: {
    id: string;
    name: string;
  }
}
