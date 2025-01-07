export function logout() {
  // Clear authentication tokens or session data
  localStorage.removeItem("authToken");

  // Optionally, you can clear other user-related data
  // localStorage.removeItem("userData");
} 