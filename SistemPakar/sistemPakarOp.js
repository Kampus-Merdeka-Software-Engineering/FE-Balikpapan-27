// Variabel untuk menyimpan gejala yang dipilih
const selectedSymptoms = [];

// JavaScript untuk menghitung probabilitas
function hitungProbabilitas() {
  // Deklarasi list untuk perhitungan AiVj tiap penyakit
  const hasilabortus = [];
  const hasilekstrauteri = [];
  const hasilsolusio = [];
  const hasilpreekslampsia = [];
  const hasilrupture = [];

  // Deklarasi data training tiap penyakit
  const Abortus = ["G9", "G10", "G12", "G14"];
  const Ekstrauteri = ["G1", "G2", "G3", "G9", "G11", "G15"];
  const Solusio = ["G13", "G14", "G15", "G19", "G20", "G21", "G22"];
  const Preekslampsia = ["G4", "G5", "G6", "G7", "G8", "G9", "G23"];
  const Rupture = ["G2", "G9", "G16", "G17", "G18", "G20", "G23", "G24", "G25"];

  // n=1; m=25 (jumlah gejala); p=0.2 (suatu penyakit/banyaknya penyakit)
  const n = 1;
  const m = 25;
  const p = 0.2;

  // Fungsi menghitung AiVj untuk setiap penyakit
  function nc(Nama_Penyakit, AiVj) {
    for (const i of Nama_Penyakit) {
      let nc = 0; // Inisialisasi nc dengan nilai 0
      if (selectedSymptoms.includes(i)) {
        nc = 1; // Jika gejala ada, atur nc menjadi 1
      }
      AiVj.push(parseFloat(((nc + m * p) / (n + m)).toFixed(10))); // Hitung probabilitas dan tambahkan ke array
    }
  }

  // Panggil fungsi nc untuk menghitung AiVj setiap penyakit
  nc(Abortus, hasilabortus);
  nc(Ekstrauteri, hasilekstrauteri);
  nc(Solusio, hasilsolusio);
  nc(Preekslampsia, hasilpreekslampsia);
  nc(Rupture, hasilrupture);

  // Fungsi untuk menghitung hasil probabilitas
  function hitung(x) {
    let t = 0.2;
    for (const i of x) {
      t *= i;
    }
    return parseFloat(t.toFixed(10));
  }

  // Perhitungan nilai probabilitas untuk tiap penyakit
  const v = {
    Abortus: hitung(hasilabortus),
    Ekstrauteri: hitung(hasilekstrauteri),
    Solusio: hitung(hasilsolusio),
    Preekslampsia: hitung(hasilpreekslampsia),
    Rupture: hitung(hasilrupture),
  };

  // Menemukan hasil diagnosis tertinggi
  let maxDiagnoses = [];
  let maxProbability = -1;

  for (const penyakit in v) {
    if (v[penyakit] > maxProbability) {
      maxProbability = v[penyakit];
      maxDiagnoses = [penyakit];
    } else if (v[penyakit] === maxProbability) {
      maxDiagnoses.push(penyakit);
    }
  }

  // Setelah loop selesai, urutkan maxDiagnoses berdasarkan probabilitas tertinggi
  maxDiagnoses.sort((a, b) => v[b] - v[a]);

  // Menampilkan hasil probabilitas tertinggi
  const resultContainer = document.getElementById("resultContainer");
  const diagnosisResult = document.getElementById("diagnosisResult");
  const aboutSection = document.getElementById("aboutSection");
  const aboutText = document.getElementById("aboutText");
  const faktorPenyakit = document.getElementById("faktorPenyakit");
  const faktorPenyakitText = document.getElementById("faktorPenyakitText");

  if (maxDiagnoses.length > 0) {
    let resultText = "Hasil Diagnosis adalah:<br>";
    for (const diagnosis of maxDiagnoses) {
      resultText += `${diagnosis}: ${maxProbability}<br>`;
    }
    diagnosisResult.innerHTML = resultText;
    resultContainer.style.display = "block";

    // Tambahkan teks about dan faktor sesuai dengan hasil diagnosis tertinggi
    aboutSection.style.display = "block";
    aboutText.innerHTML = getAboutText(maxDiagnoses[0]);
    faktorPenyakit.style.display = "block";
    faktorPenyakitText.innerHTML = getfaktorPenyakit(maxDiagnoses[0]);
  }
}

// Fungsi untuk mendapatkan teks "About" berdasarkan diagnosis
function getAboutText(diagnosis) {
  switch (diagnosis) {
    case "Abortus":
      return "Abortus terjadi bila usia kehamilan janin kurang dari 20 minggu atau beratnya kurang dari 500 gram, maka dianggap abortus. Arti ini diambil sebelum janin mampu bertahan hidup di luar kandungan. Abortus dapat terjadi secara spontan atau provocatus. Abortus spontan merupakan abortus yang terjadi karena dengan sendirinya secara tidak disengaja (keguguran), sedangkan abortus provocatus merupakan abortus yang terjadi karena disengaja (digugurkan).";
    case "Ekstrauteri":
      return "Ekstrauteri adalah istilah yang digunakan untuk menggambarkan adaptasi bayi baru lahir ke lingkungan di luar rahim";
    case "Solusio":
      return "Solusio plasenta adalah pelepasan plasenta dari tempat implantasi normalnya di rahim sebelum kelahiran dan merupakan salah satu penyebab perdarahan ibu hamil pada trimester ketiga yang terkait dengan kematian ibu dan janin.";
    case "Preekslampsia":
      return "Preeklampsia adalah penyakit dengan tanda-tanda hipertensi, edema, dan proteinuria yang timbul karena kehamilan. Penyakit ini umumnya terjadi dalam triwulan ketiga kehamilan, tetapi dapat terjadi sebelumnya, misalnya pada molahidatidosa.";
    case "Rupture":
      return "Ruptur uteri adalah robeknya dinding uterus pada saat kehamilan atau persalinan pada saat umur kehamilan lebih dari 28 minggu.";
    default:
      return "";
  }
}
// Fungsi untuk mendapatkan teks "faktor" berdasarkan diagnosis
function getfaktorPenyakit(diagnosis) {
  switch (diagnosis) {
    case "Abortus":
      return "Kelainan anatomi uterus seperti Leiomyoma yang besar dan multipel atau adanya sinekia uterus (Ashermann Syndrome) dapat meningkatkan risiko abortus.";
    case "Ekstrauteri":
      return "Ekstrauteri adalah istilah yang digunakan untuk menggambarkan adaptasi bayi baru lahir ke lingkungan di luar rahim";
    case "Solusio":
      return "Solusio plasenta adalah pelepasan plasenta dari tempat implantasi normalnya di rahim sebelum kelahiran dan merupakan salah satu penyebab perdarahan ibu hamil pada trimester ketiga yang terkait dengan kematian ibu dan janin.";
    case "Preekslampsia":
      return "Preeklampsia adalah penyakit dengan tanda-tanda hipertensi, edema, dan proteinuria yang timbul karena kehamilan. Penyakit ini umumnya terjadi dalam triwulan ketiga kehamilan, tetapi dapat terjadi sebelumnya, misalnya pada molahidatidosa.";
    case "Rupture":
      return "Ruptur uteri adalah robeknya dinding uterus pada saat kehamilan atau persalinan pada saat umur kehamilan lebih dari 28 minggu.";
    default:
      return "";
  }
}

// event listener untuk tombol Clear
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  // Setel ulang gejala yang dipilih
  selectedSymptoms.length = 0;

  // Hapus kelas "clicked" dari semua tombol gejala
  symptomButtons.forEach((button) => {
    button.classList.remove("clicked");
  });

  const resultContainer = document.getElementById("resultContainer");
  const diagnosisResult = document.getElementById("diagnosisResult");
  const aboutSection = document.getElementById("aboutSection");
  const aboutText = document.getElementById("aboutText");
  const faktorPenyakit = document.getElementById("faktorPenyakit");
  const faktorPenyakitText = document.getElementById("faktorPenyakitText");

  diagnosisResult.innerHTML = "";
  aboutSection.style.display = "none";
  aboutText.innerHTML = "";
  faktorPenyakit.style.display = "none";
  faktorPenyakitText.innerHTML = "";

  // Refresh halaman
  location.reload();
});

const symptomButtons = document.querySelectorAll(".gejala,.submit,.clear");
symptomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("clicked");

    const symptomValue = button.getAttribute("data-value");
    if (selectedSymptoms.includes(symptomValue)) {
      const index = selectedSymptoms.indexOf(symptomValue);
      if (index !== -1) {
        selectedSymptoms.splice(index, 1);
      }
    } else {
      selectedSymptoms.push(symptomValue);
    }
  });
});

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", hitungProbabilitas);

const diagnosisForm = document.getElementById("diagnosisForm");
diagnosisForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;

  const diagnosisResult = document.getElementById("diagnosisResult").innerHTML;
  const aboutText = document.getElementById("aboutText").innerHTML;
  const faktorPenyakitText = document.getElementById("faktorPenyakitText").innerHTML;

  const emailData = {
    name: userName,
    email: userEmail,
    diagnosisResult: diagnosisResult,
    aboutText: aboutText,
    faktorPenyakitText: faktorPenyakitText,
  };

  console.log(emailData);

  alert("Hasil probabilitas telah dikirim. Terima kasih!");
});
