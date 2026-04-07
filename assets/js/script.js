// ================= NAVBAR =================
const links = document.querySelectorAll('.navbar ul li a');

links.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar ul').classList.remove('active');
  });
});

function toggleMenu() {
  const menu = document.querySelector('.navbar ul');
  menu.classList.toggle('active');
}
// SWIPER
new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
});



// ================= HITUNG TOTAL =================
function hitungTotal() {
  let total = 0;
  let items = document.querySelectorAll(".qty");

  items.forEach(item => {
    let harga = parseInt(item.dataset.harga) || 0;
    let jumlah = parseInt(item.value) || 0;

    total += harga * jumlah;
  });

  document.getElementById("total").innerText = "Rp" + total.toLocaleString();
}


// AUTO HITUNG
document.querySelectorAll(".qty").forEach(input => {
  input.addEventListener("input", hitungTotal);
});


// ================= PESAN WA + LOADING =================
function pesanWA() {
  let nama = document.getElementById("nama").value;
  let items = document.querySelectorAll(".qty");

  // VALIDASI NAMA
  if (nama.trim() === "") {
    alert("Nama harus diisi dulu ya!");
    return;
  }

  let pesan = `Halo, saya mau pesan:%0A`;
  pesan += `Nama: ${nama}%0A`;

  let total = 0;
  let adaPesanan = false;

  items.forEach(item => {
    let jumlah = parseInt(item.value) || 0;
    let harga = parseInt(item.dataset.harga) || 0;

    if (jumlah > 0) {
      let namaMenu = item.parentElement.querySelector("span").innerText;
      let subtotal = harga * jumlah;

      total += subtotal;
      adaPesanan = true;

      pesan += `${namaMenu} x${jumlah} = Rp${subtotal}%0A`;
    }
  });

  // VALIDASI PESANAN
  if (!adaPesanan) {
    alert("Pilih minimal 1 menu dulu!");
    return;
  }

  pesan += `Total: Rp${total}`;

  let noWa = "6282276345156";

  // ================= LOADING =================
  let loading = document.getElementById("loading");
  loading.style.display = "flex";

  setTimeout(() => {
    window.open(`https://wa.me/${noWa}?text=${pesan}`);

    loading.style.display = "none";
  }, 1500);
}
