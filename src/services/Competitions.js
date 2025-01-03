import axios from "axios"
const baseUrl = "http://localhost:8080/api/competitions"

const fetchCompetitions = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const fetchQuestions = (competitionId) => {
  return axios.get(`${baseUrl}/${competitionId}/questions`)
}

const addQuestionToCompetition = (competitionId, newQuestion) => {
  return axios.post(`${baseUrl}/${competitionId}/questions`, newQuestion)
}

export default {
  fetchCompetitions,
  create,
  fetchQuestions,
  addQuestionToCompetition,
}
