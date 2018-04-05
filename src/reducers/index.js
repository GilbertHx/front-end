import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import units_reducer from './units_reducer';
import sessions_reducer from './sessions_reducer';
import lessons_reducer from './lessons_reducer';
import lessons_completed_reducer from './lessons_completed_reducer';
import users_reducer from './users_reducer';
import quizzes_reducer from './quizzes_reducer'
import exams_reducer from './exams_reducer';
import exam_question_reducer from './exam_question_reducer';
import exam_question_answers_reducers from './exam_question_answers_reducers';
import quizzes_completed_reducer from './quizzes_completed_reducer';
import assessments_reducer from './assessments_reducer';
import assessment_questions_reducer from './assessment_questions_reducer';
import assessment_question_answers_reducers from './assessment_question_answers_reducers';
import exam_marks_reducer from './exam_marks_reducer';
import assessment_marks_reducer from './assessment_marks_reducer';
import profile_reducer from './profile_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    units: units_reducer,
    sessions: sessions_reducer,
    lessons: lessons_reducer,
    completed: lessons_completed_reducer,
    users: users_reducer,
    user: profile_reducer,
    quizzes: quizzes_reducer,
    exams: exams_reducer,
    questions: exam_question_reducer,
    questionResponses: exam_question_answers_reducers,
    completedQuiz: quizzes_completed_reducer,
    assessments: assessments_reducer,
    assessmentQuestions: assessment_questions_reducer,
    assessmentQuestionResponses: assessment_question_answers_reducers,
    examMarks: exam_marks_reducer,
    assessmentMarks: assessment_marks_reducer,
  });

export default rootReducer;