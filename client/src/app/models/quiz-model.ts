export interface QuizModel {
  response_code: number;
  results: Result[];
}

export interface Result {
  category: Category;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum Category {
  EntertainmentFilm = 'Entertainment: Film',
}

export enum Difficulty {
  Easy = 'easy',
  Hard = 'hard',
  Medium = 'medium',
}

export enum Type {
  Multiple = 'multiple',
}
