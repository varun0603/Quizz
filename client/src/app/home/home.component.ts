import {Component, OnInit, ViewChild} from '@angular/core';
import {QuizService} from '../services/quiz.service';
import {QuizModel, Result} from '../models/quiz-model';
import {CategoryModel, TriviaCategory} from '../models/category-model';
import {HttpClient} from '@angular/common/http';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: QuizModel;
  questions: Result[];
  allQuestions: Result[];
  play = false;
  categoryModel: CategoryModel;
  categories: TriviaCategory[];
  selected: string;
  counter = 0;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  level: string;
  levels: string[] = ['easy', 'medium', 'hard'];

  constructor(private quiz: QuizService,
              private snack: MatSnackBar,
              private http: HttpClient) {
    console.log();
  }

  ngOnInit() {

    this.http.get<CategoryModel>('../../assets/quiz_category.json').subscribe(value => {
      this.categories = value.trivia_categories as TriviaCategory[];
    });
  }


  nextPage() {
    const lastIndex = this.allQuestions.indexOf(this.questions[this.questions.length - 1]);
    this.questions = this.allQuestions.slice(lastIndex, lastIndex + 3);
  }

  shuffle(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  async start() {
    const cat: TriviaCategory = this.categories.find(value => value.name === this.selected);
    this.http.get<QuizModel>(`https://opentdb.com/api.php?amount=10&difficulty=${this.level}&category=${cat.id}&type=multiple`).subscribe(value => {
      this.allQuestions = value.results.map(qus => {
        qus.incorrect_answers.push(qus.correct_answer);
        qus.incorrect_answers = this.shuffle(qus.incorrect_answers);
        return qus;
      });
      this.questions = this.allQuestions.slice(0, 3);
    });
    this.play = true;
  }

  async next(op: string, q: Result) {
    console.log(this.stepper.selected);
    const res = q.correct_answer === op;
    this.stepper.selected._showError = res;
    console.log(q, op);
    if (res === false) {
      this.snack.open('Write Answer is ', q.correct_answer);
      await new Promise((f) => {
        setTimeout(() => {
          f.bind(null);
        }, 3000);
      });
      this.snack.dismiss();
      this.stepper.next();
      return;
    }

    this.snack.open(res ? 'Correct' : 'Wrong Answer', '', {
      duration: 2000,
      horizontalPosition: 'end',
      politeness: res ? 'polite' : 'assertive'
    });
    this.stepper.next();
  }
}
