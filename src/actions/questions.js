import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { addAnswerToUser } from './users'
import { addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then((question) => 
      {
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(question));
    }
      )
  }
}

function addAnswerToQuestion(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authedUser,
        qid,
        answer
    }
}


export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));

    return saveQuestionAnswer(authUser, qid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}

export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => dispatch(addAnswerToQuestion(authedUser, qid, answer)))
        .then(() => dispatch(addAnswerToUser(authedUser, qid, answer)))
    }

}


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
