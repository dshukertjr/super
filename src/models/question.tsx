export interface Question {
  question: string;
  choices: string[];
  createdAt: Date;
  votes: number[],
  user: { name: string }
}
