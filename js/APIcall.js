const baseURL = "https://be-balikpapan-27-production.up.railway.app";

const fetchDoctor = async () => {
  const response = await fetch(`${baseURL}/doctor`);
  const data = await response.json();

  const doctorContainer = document.getElementById("doctor-from-api");

  data.data.forEach((item) => {
    const newDoctor = document.createElement("article");
    //newDoctor.classList.add('doctor')
    newDoctor.innerHTML = `<div class="specialist__image">
                <img src="${item.foto}" alt="Spcecialist One"/>
            </div>
            <div class="specialist__details">
                <h4>${item.nama}</h4>
                <small>${item.spesialis}</small>
            </div>
            <div class="specialist__social">
                <a href="linkedin.com/in/novitanggraini/" target="_blank"><i class="bx bxl-linkedin"></i></a>
                <a href="https://twitter.com" target="_blank"><i class="bx bxl-twitter"></i></a>
                <a href="https://facebook.com" target="_blank"><i class="bx bxl-facebook"></i></a>
                <a href="https://www.instagram.com/fixvita" target="_blank"><i class="bx bxl-instagram"></i></a>
            </div>
            <a href="https://api.whatsapp.com/send?phone=+6289690744106" class="specialist__whatsapp" target="_blank"><i class="bx bxl-whatsapp"></i></a>`;

    doctorContainer.appendChild(newDoctor);
  });
};

fetchDoctor();

const sendAppointment = async () => {
    let nama = document.getElementById("input-appointment-name")
    let telp = document.getElementById("input-appointment-phone")
    let tanggal = document.getElementById("input-appointment-date")
    let dokter = document.getElementById("input-appointment-doctor")
    let pesan = document.getElementById("input-appointment-message")

  try {
    const tanggalISO = new Date(tanggal.value).toISOString();
    const sendAppointment = await fetch(`${baseURL}/appointment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: nama.value,
        telp: telp.value,
        tanggal: tanggalISO,
        dokter: dokter.value,
        pesan: pesan.value,
      }),
    });

    if (sendAppointment.ok) {
      alert("Successfully create an appointment!");
      nama.value = "";
      telp.value = "";
      tanggal.value = "";
      dokter.value = "";
      pesan.value = "";
    } else {
      console.error("Gagal mengirim data:", sendAppointment.statusText);
    }
  } catch (error) {
    console.error("Gagal mengirim data:", error);
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendAppointment();
});
