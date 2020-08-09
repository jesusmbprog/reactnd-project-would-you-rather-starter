export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function setAuthedUser (id = null) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function addUserQuestion(question) {
  return {
      type: ADD_USER_QUESTION,
      question,
  }
}

export function addUserAnswer(answer) {
  return {
      type: ADD_USER_ANSWER,
      answer,
  }
}