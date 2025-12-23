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

      // 🔥 BistData Analizi sekmesi açıldıysa grafik yükle
      if (hedef === "bistdata-analiz") {
        loadBistDataCharts();
      }

    } else {
      console.warn("Sekme içeriği yok:", hedef);
    }
  });
});

console.log("Sekme sistemi yüklendi");


// ===================================================
// 🔥 BİSTDATA ANALİZİ – GERÇEK VERİLERLE GRAFİKLER
// (SADECE EKLENDİ, ÜSTE DOKUNULMADI)
// ===================================================

let chartSatis, chartFavok, chartNetKar;
let chartsLoaded = false;

async function loadBistDataCharts() {
  if (chartsLoaded) return; // tekrar çizmesin
  chartsLoaded = true;

  console.log("📊 BistData grafikleri yükleniyor...");

  const url =
    "https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/ASELS%20(TRY)__gelir_tablosu__çeyreklik_.json";

  try {
    const res = await fetch(url);
    const json = await res.json();

    // JSON alanları (gerekirse birlikte revize ederiz)
    const labels = json.map(r => r["Dönem"]);
    const satislar = json.map(r => r["Satışlar"]);
    const favok = json.map(r => r["FAVÖK"]);
    const netKar = json.map(r => r["Net Kar"]);

    drawLineChart("chart2-satis", "Satışlar", labels, satislar);
    drawLineChart("chart2-favok", "FAVÖK", labels, favok);
    drawLineChart("chart2-netkar", "Net Kar", labels, netKar);

    console.log("✅ BistData grafikleri çizildi");

  } catch (err) {
    console.error("❌ Grafik verisi alınamadı:", err);
  }
}

function drawLineChart(canvasId, label, labels, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn("Canvas bulunamadı:", canvasId);
    return;
  }

  const ctx = canvas.getContext("2d");

  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }]
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
