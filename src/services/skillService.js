import API from "./api";

export const analyzeSkills = async (skillsData) => {
  try {
    const response = await API.post("/skills/analyze", skillsData);
    return response.data;
  } catch (error) {
    console.error("Error sending skills:", error);
    throw error;
  }
};
