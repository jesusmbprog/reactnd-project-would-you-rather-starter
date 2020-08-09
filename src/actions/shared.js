import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserAnswer, addUserQuestion, receiveUsers } from './users';
import { addQuestion, answerQuestion, receiveQuestions } from "./questions";

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
      dispatch(showLoading());
      return saveQuestion(question)
          .then((question) => {
              dispatch(addQuestion(question));
              dispatch(addUserQuestion(question));
              dispatch(hideLoading());
          })
  }
}

export function handleAnswerQuestion(answer) {
  return (dispatch) => {
      dispatch(showLoading());
      return saveQuestionAnswer(answer)
          .then(() => {
              dispatch(answerQuestion(answer));
              dispatch(addUserAnswer(answer));
              dispatch(hideLoading());
          });
  }
}
