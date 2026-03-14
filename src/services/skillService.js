import axios from "axios";

const API_URL = "http://localhost:8081/api/skills/analyze";

export const analyzeSkills = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error analyzing skills:", error);
    throw error;
  }
};
