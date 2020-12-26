export interface Question {
  id: number;
  question: string;
  choices: string[];
  createdAt: Date;
  votes: number[],
  userId: string,
  user: {
    id: string;
    name: string;
  }
}
