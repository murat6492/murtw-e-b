console.log("Sekme sistemi yüklendi");

const sekmeler = document.querySelectorAll(".sekme-baslik");
const icerikler = document.querySelectorAll(".sekme-icerik");

sekmeler.forEach(sekme => {
  sekme.addEventListener("click", () => {
    const hedef = sekme.dataset.sekme;
    console.log("Sekme tıklandı:", hedef);

    // başlıkları temizle
    sekmeler.forEach(s => s.classList.remove("aktif"));
    sekme.classList.add("aktif");

    // içerikleri gizle
    icerikler.forEach(i => i.classList.add("gizli"));

    // hedef içeriği aç
    const hedefIcerik = document.getElementById(hedef + "-icerik");
    if (hedefIcerik) {
      hedefIcerik.classList.remove("gizli");
    } else {
      console.warn("Sekme içeriği bulunamadı:", hedef);
    }
  });
});

// ===============================
// İLK YÜKLEMEDE ANASAYFA AÇ
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const anasayfa = document.getElementById("anasayfa-icerik");
  if (anasayfa) {
    document.querySelectorAll(".content-box").forEach(box =>
      box.classList.add("gizli")
    );
    anasayfa.classList.remove("gizli");
    console.log("Anasayfa açıldı");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("İlk yükleme kontrolü");

  const anasayfa = document.getElementById("anasayfa-icerik");
  if (!anasayfa) return;

  // hepsini gizle
  document.querySelectorAll(".content-box").forEach(box => {
    box.classList.add("gizli");
  });

  // anasayfayı aç
  anasayfa.classList.remove("gizli");
});

