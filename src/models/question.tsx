export interface Question {
  id: string;
  question: string;
  choices: string[];
  createdAt: Date;
  votes: number[],
  user: {
    id: string;
    name: string;
  }
}
