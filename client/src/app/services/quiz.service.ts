import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuizModel} from '../models/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quiz: QuizModel;

  constructor(private http: HttpClient) {
  }

  async loadQuiz(url: string) {
    return this.http.get<QuizModel>(url).subscribe(data => {
      this.quiz = data as QuizModel;
    });
  }
}
