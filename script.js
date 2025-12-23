console.log("script.js yüklendi");

// ===============================
// SOL MENÜ – SAYFA GEÇİŞLERİ
// ===============================
document.querySelectorAll("[data-sekme-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const hedef = link.dataset.sekmeTarget;
    console.log("Sol menü tıklandı:", hedef);

    document.querySelectorAll(".content-box").forEach(box => {
      box.classList.add("gizli");
    });

    const hedefEl = document.getElementById(hedef);
    if (hedefEl) {
      hedefEl.classList.remove("gizli");
    } else {
      console.warn("Bulunamayan içerik:", hedef);
    }
  });
});

// ===============================
// ORTA SEKMELER (Özet / Analiz / Değerleme)
// ===============================
document.querySelectorAll(".sekme-baslik").forEach(sekme => {
  sekme.addEventListener("click", () => {
    const hedef = sekme.dataset.sekme;
    console.log("Sekme tıklandı:", hedef);

    document.querySelectorAll(".sekme-baslik").forEach(s =>
      s.classList.remove("aktif")
    );
    sekme.classList.add("aktif");

    document.querySelectorAll(".sekme-icerik").forEach(icerik =>
      icerik.classList.add("gizli")
    );

    const hedefIcerik = document.getElementById(hedef + "-icerik");
    if (hedefIcerik) {
      hedefIcerik.classList.remove("gizli");
    } else {
      console.warn("Sekme içeriği yok:", hedef);
    }
  });
});

console.log("Sekme sistemi yüklendi");

console.log("📊 BistData grafik scripti yüklendi");

// Chart instance’ları (yeniden çizim için)
let chartSatis, chartFavok, chartNetKar;

async function loadBistDataCharts() {
  const url =
    "https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/ASELS%20(TRY)__gelir_tablosu__çeyreklik_.json";

  const res = await fetch(url);
  const json = await res.json();

  // 🔹 JSON yapısına göre ayıklama
  const periods = json.map(row => row["Dönem"]);
  const satislar = json.map(row => row["Satışlar"]);
  const favok = json.map(row => row["FAVÖK"]);
  const netKar = json.map(row => row["Net Kar"]);

  // 🔹 Grafikler
  chartSatis = drawLineChart(
    "chart2-satis",
    "Satışlar",
    periods,
    satislar
  );

  chartFavok = drawLineChart(
    "chart2-favok",
    "FAVÖK",
    periods,
    favok
  );

  chartNetKar = drawLineChart(
    "chart2-netkar",
    "Net Kar",
    periods,
    netKar
  );

  console.log("✅ BistData grafikleri çizildi");
}

// Genel grafik fonksiyonu
function drawLineChart(canvasId, label, labels, data) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

document.querySelectorAll(".sekme-baslik").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.sekme === "bistdata-analiz") {
      loadBistDataCharts();
    }
  });
});

