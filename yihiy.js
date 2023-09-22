const counters = document.querySelectorAll(".purecounter");
counters.forEach((counter) => {
  const startValue = parseInt(counter.getAttribute("data-purecounter-start"));
  const endValue = parseInt(counter.getAttribute("data-purecounter-end"));
  const duration = 2000; // Durasi animasi dalam milidetik
  const step = (Math.abs(endValue - startValue) / duration) * 10; // Langkah per frame

  let currentValue = startValue;
  const updateCounter = () => {
    if (currentValue < endValue) {
      currentValue += step;
      counter.textContent = Math.round(currentValue);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = endValue;
    }
  };

  updateCounter();
});

function diagnose() {
  var gejalaCheckboxes = document.getElementsByName("gejala");
  var gejala = [];

  for (var i = 0; i < gejalaCheckboxes.length; i++) {
    if (gejalaCheckboxes[i].checked) {
      gejala.push(gejalaCheckboxes[i].value);
    }
  }

  var hasilabortus = [];
  var hasilekstrauteri = [];
  var hasilsolusio = [];
  var hasilpreekslampsia = [];
  var hasilrupture = [];

  var Abortus = ["G9", "G10", "G12", "G14"];
  var Ekstrauteri = ["G1", "G2", "G3", "G9", "G11", "G15"];
  var Solusio = ["G13", "G14", "G15", "G19", "G20", "G21", "G22"];
  var Preekslampsia = ["G4", "G5", "G6", "G7", "G8", "G9", "G23"];
  var Rupture = ["G2", "G9", "G16", "G17", "G18", "G20", "G23", "G24", "G25"];

  for (var i = 0; i < gejala.length; i++) {
    if (Abortus.includes(gejala[i])) {
      hasilabortus.push((1 + gejala.length * 0.2) / (1 + 25 * 0.2));
    } else {
      hasilabortus.push((0 + gejala.length * 0.2) / (1 + 25 * 0.2));
    }

    if (Ekstrauteri.includes(gejala[i])) {
      hasilekstrauteri.push((1 + gejala.length * 0.2) / (1 + 25 * 0.2));
    } else {
      hasilekstrauteri.push((0 + gejala.length * 0.2) / (1 + 25 * 0.2));
    }

    if (Solusio.includes(gejala[i])) {
      hasilsolusio.push((1 + gejala.length * 0.2) / (1 + 25 * 0.2));
    } else {
      hasilsolusio.push((0 + gejala.length * 0.2) / (1 + 25 * 0.2));
    }

    if (Preekslampsia.includes(gejala[i])) {
      hasilpreekslampsia.push((1 + gejala.length * 0.2) / (1 + 25 * 0.2));
    } else {
      hasilpreekslampsia.push((0 + gejala.length * 0.2) / (1 + 25 * 0.2));
    }

    if (Rupture.includes(gejala[i])) {
      hasilrupture.push((1 + gejala.length * 0.2) / (1 + 25 * 0.2));
    } else {
      hasilrupture.push((0 + gejala.length * 0.2) / (1 + 25 * 0.2));
    }
  }

  function hitungNilaiProbabilitas(hasil) {
    var nilaiProbabilitas = 0.2;
    for (var i = 0; i < hasil.length; i++) {
      nilaiProbabilitas *= hasil[i];
    }
    return nilaiProbabilitas;
  }

  var nilaiProbabilitasAbortus = hitungNilaiProbabilitas(hasilabortus);
  var nilaiProbabilitasEkstrauteri = hitungNilaiProbabilitas(hasilekstrauteri);
  var nilaiProbabilitasSolusio = hitungNilaiProbabilitas(hasilsolusio);
  var nilaiProbabilitasPreekslampsia = hitungNilaiProbabilitas(hasilpreekslampsia);
  var nilaiProbabilitasRupture = hitungNilaiProbabilitas(hasilrupture);

  var penyakit = {
    Abortus: nilaiProbabilitasAbortus,
    "Hamil ekstrauteri ektopik terganggu": nilaiProbabilitasEkstrauteri,
    "Solusio plasenta": nilaiProbabilitasSolusio,
    "Preekslampsia berat": nilaiProbabilitasPreekslampsia,
    "Rupture uteri": nilaiProbabilitasRupture,
  };

  var penyakitTerdiagnosis = Object.keys(penyakit).reduce(function (a, b) {
    return penyakit[a] > penyakit[b] ? a : b;
  });

  document.getElementById("hasilDiagnosa").innerHTML = "Hasil diagnosa adalah: " + penyakitTerdiagnosis + " dengan nilai " + penyakit[penyakitTerdiagnosis].toFixed(10);

  // tambahin info, menglelah
  var informasiPenyakit = {
    Abortus: "Informasi tentang penyakit Abortus...",
    "Hamil ekstrauteri ektopik terganggu": "Informasi tentang penyakit Hamil ekstrauteri ektopik terganggu...",
    "Solusio plasenta": "Informasi tentang penyakit Solusio plasenta...",
    "Preekslampsia berat": "Informasi tentang penyakit Preekslampsia berat...",
    "Rupture uteri": "Informasi tentang penyakit Rupture uteri...",
  };

  document.getElementById("informasiPenyakit").innerHTML = "Informasi Penyakit: " + informasiPenyakit[penyakitTerdiagnosis];
}
// buat bersihin checkbox
function clearCheckboxes() {
  var checkboxes = document.getElementsByName("gejala");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  document.getElementById("hasilDiagnosa").textContent = "";
  document.getElementById("informasiPenyakit").textContent = "";
}
