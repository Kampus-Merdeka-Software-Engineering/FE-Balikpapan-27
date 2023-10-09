const API_URL = "https://be-balikpapan-27-production.up.railway.app/";

async function fetchLogo() {
  try {
    const response = await fetch(`${API_URL}/team`);
    const data = await response.json();
    if (data.logoUnit) {
      document.getElementById("novitalogo").src = data.logoUnit;
    } else {
      console.error("not found!");
    }
  } catch (error) {
    console.error("Error", error);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  fetchLogo();
});
