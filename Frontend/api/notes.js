// Frontend API calls - no mongoose import needed
const API_BASE = "/api";

export const createNote = async (noteData) => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
  return response.json();
};

export const getNotes = async () => {
  const response = await fetch(`${API_BASE}/notes`);
  return response.json();
};
