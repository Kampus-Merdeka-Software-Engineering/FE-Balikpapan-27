document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.getElementById("likeBtn");
  const likeCountElement = document.getElementById("likeCount");

  // Mengecek apakah pengguna sudah melakukan klik sebelumnya
  const isLiked = localStorage.getItem("isLiked") === "true";
  let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;

  // Mengatur status awal tombol dan hitungan like
  updateLikeStatus();

  // Menangani klik tombol "like"
  likeBtn.addEventListener("click", function () {
    if (!isLiked) {
      // Jika belum disukai, tambahkan like dan perbarui status
      likeCount++;
      updateLikeStatus();

      // Simpan status dan hitungan like di localStorage
      localStorage.setItem("isLiked", "true");
      localStorage.setItem("likeCount", likeCount.toString());
    }
  });

  // Fungsi untuk mengatur status awal tombol dan hitungan like
  function updateLikeStatus() {
    likeBtn.innerHTML = isLiked ? "&#128077;" : "&#128077;"; // Gunakan emotikon jempol
    likeBtn.style.color = isLiked ? "#ff6347" : "#999"; // Warna tombol saat disukai
    likeCountElement.textContent = likeCount.toString(); // Update hitungan like
  }
});
