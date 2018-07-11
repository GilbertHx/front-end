import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {
    Router,
    Route 
    } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import history from './utils/history'
import { AUTH_USER, GET_CURRENT_USER } from './actions/types';

import WithNavBar from './containers/WithNavBar';
import WithFooter from './containers/WithFooter';
import TopBar from './containers/LessonsTopBar';
import RequireAuth from './components/auth/require_auth';
import RequireAuthAdmin from './components/Admin/require_auth_admin';

import LoginPage from "./containers/LoginPage";
import Logout from './components/auth/Logout';
import SignupPage from './containers/SignupPage';

import App from './components/App';
import Units from './components/Units';
import UnitAssessment from './components/UnitAssessment';
import AssessmentsEssays from './components/AssessmentsEssays';
import Essay from './components/Essay';

import LessonsList from './components/LessonsList';
import Lesson from './components/Lesson';
import Exam from './components/Exam';

import AdminNav from './components/Admin/WithAdminNav';
import Dashboard from './components/Admin/Dashboard';
import AdminUnits from './components/Admin/AdminUnits';
import AdminSections from './components/Admin/AdminSections';
import AdminLessons from './components/Admin/AdminLessons';
import AdminQuizzes from './components/Admin/Quiz/AdminQuizzes';


import AdminAssessment from './components/Admin/Assessment/AdminAssessment';
import AdminAssessmentQuestion from './components/Admin/Assessment/AdminAssessmentQuestion';
import AdminAssessmentQuestionResponse from './components/Admin/Assessment/AdminAssessmentQuestionResponse';

import AdminExam from './components/Admin/Exam/AdminExam';
import AdminQuestion from './components/Admin/Exam/AdminQuestion';
import AdminQuestionResponse from './components/Admin/Exam/AdminQuestionResponse';

import AdminUsers from './components/Admin/AdminUsers';
import AdminProfile from './components/Admin/AdminProfile';
import AdminEssay from './components/Admin/AdminEssay';
import EditUnit from './components/Admin/EditUnit';
import EditSection from './components/Admin/EditSection';
import EditLesson from './components/Admin/EditLesson';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
// import AdminCourses from './components/Admin/AdminCourses'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  )
)

const token = localStorage.getItem('token');
const is_staff = localStorage.getItem('is_staff');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

if (is_staff) {
    if (is_staff === 'true') {
        store.dispatch({ 
            type: GET_CURRENT_USER,
            payload: {
                data: {
                'is_staff': true
                }
            }
        });
    } else {
        store.dispatch({ 
            type: GET_CURRENT_USER,
            payload: {
                data: {
                'is_staff': false
                }
            }
        });
    }
    
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={WithFooter(WithNavBar(App))} />
                <Route path="/login" component={WithNavBar(LoginPage)} />
                <Route path="/logout" component={WithNavBar(Logout)} />
                <Route path="/signup" component={WithNavBar(SignupPage)} />

                <Route path="/admin/dashboard" component={AdminNav(RequireAuthAdmin(Dashboard))} />
                <Route path="/admin/units" component={AdminNav(RequireAuthAdmin(AdminUnits))} />
                <Route path="/admin/unit/:id/edit" component={AdminNav(RequireAuthAdmin(EditUnit))} />
                <Route exact path="/admin/sections" component={AdminNav(RequireAuthAdmin(AdminSections))} />
                <Route path="/admin/sections/:id/edit" component={AdminNav(RequireAuthAdmin(EditSection))} />
                <Route path="/admin/lessons" component={AdminNav(RequireAuthAdmin(AdminLessons))} />
                <Route path="/admin/lesson/:id/edit" component={AdminNav(RequireAuthAdmin(EditLesson))} />
                <Route path="/admin/quizzes" component={AdminNav(RequireAuthAdmin(AdminQuizzes))} />
                <Route exact path="/admin/assessments" component={AdminNav(RequireAuthAdmin(AdminAssessment))} />
                <Route path="/admin/assessments/:id/question/new" component={AdminNav(RequireAuthAdmin(AdminAssessmentQuestion))} />
                <Route path="/admin/assessments/question/:id/answer" component={AdminNav(RequireAuthAdmin(AdminAssessmentQuestionResponse))} />

                <Route exact path="/admin/exams" component={AdminNav(RequireAuthAdmin(AdminExam))} />
                <Route path="/admin/exams/:id/question/new" component={AdminNav(RequireAuthAdmin(AdminQuestion))} />
                <Route path="/admin/exams/question/:id/answer" component={AdminNav(RequireAuthAdmin(AdminQuestionResponse))} />

                <Route path="/admin/users" component={AdminNav(RequireAuthAdmin(AdminUsers))} />
                <Route exact path="/admin/profile/:id" component={AdminNav(RequireAuthAdmin(AdminProfile))} />
                <Route exact path="/admin/profile/essay/:id" component={AdminNav(RequireAuthAdmin(AdminEssay))} />

                <Route exact path="/units" component={WithFooter(WithNavBar(RequireAuth(Units)))} />
                <Route exact path="/unit/:id/assessment" component={WithFooter(WithNavBar(RequireAuth(UnitAssessment)))} />
                <Route exact path="/unit/:id/assessment/essays" component={WithFooter(WithNavBar(RequireAuth(AssessmentsEssays)))} />
                <Route exact path="/unit/assessment/essay/:id/rate" component={WithFooter(WithNavBar(RequireAuth(Essay)))}/>

                <Route exact path="/lessons/all/:id" component={TopBar(RequireAuth(LessonsList))}/>
                <Route exact path="/lesson/:session_id/:id" component={RequireAuth(Lesson)}/>
                <Route exact path="/exam" component={WithFooter(WithNavBar(RequireAuth(Exam)))}/>
                <Route exact path="/profile/:id" component={WithFooter(WithNavBar(RequireAuth(Profile)))}/>
                <Route exact path="/profile/:id/edit" component={WithFooter(WithNavBar(RequireAuth(EditProfile)))}/>
                <Route exact path="/profile/:id/essay" component={WithFooter(WithNavBar(RequireAuth(AdminEssay)))} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();