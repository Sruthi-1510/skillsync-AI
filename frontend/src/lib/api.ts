import axios from "axios";

// Provide the correct base URL. Since Vite is local, port 8000 is default for FastAPI.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("top_n", "5");

  const response = await apiClient.post("/match/top-companies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const generateRoadmap = async (missingSkills: string[], targetRole: string = "Software Engineer", timelineWeeks: number = 8) => {
  const payload = {
    missing_skills: missingSkills,
    target_role: targetRole,
    timeline_weeks: timelineWeeks,
  };
  const response = await apiClient.post("/roadmap/generate", payload);
  return response.data;
};

export const chatWithMessage = async (message: string) => {
  const response = await apiClient.post("/chat", { message });
  return response.data;
};
