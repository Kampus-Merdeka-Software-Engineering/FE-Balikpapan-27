const baseURL = "https://be-balikpapan-27-production.up.railway.app";

const fetchTeam = async () => {
  const response = await fetch(`${baseURL}/team`);
  const data = await response.json();

  const teamContainer = document.getElementById("team-from-api");

  data.data.forEach((item) => {
    const newTeam = document.createElement("div");
    //newTeam.classList.add('team')
    newTeam.innerHTML = `<div class="box">
            <div class="top-bar"></div>
            <div class="nav">
              <i class="verify fas fa-check-circle"></i>
              <div class="logo-container">
                <img class="heart-logo" src="${item.logo_universitas}" alt="UNDIP Logo" />

              </div>
            </div>
  
            <div class="details">
              <img src="${item.foto}" alt="Foto ${item.nama}" />
              <strong>${item.nama}</strong>
              <p>${item.divisi}</p>
            </div>
  
            <div class="bton">
              <a href="${item.linkedin}"><i class="fab fa-linkedin"></i></a>
              <a href="${item.instagram}"><i class="fab fa-instagram"></i></a>
              <a href="${item.whatsapp}"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>`;

    teamContainer.appendChild(newTeam);
  });
};

fetchTeam();
