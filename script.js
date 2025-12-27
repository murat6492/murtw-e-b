console.log("JS DOSYASI BASARIYLA YUKLENDI!");
alert("JS Calisiyor!");
document.addEventListener("DOMContentLoaded", () => {
  console.log("Arama sistemi yüklendi");

  const input = document.getElementById("hisseInput");
  const button = document.getElementById("hisseAraBtn");

  button.addEventListener("click", () => {
    const hisse = input.value.trim().toUpperCase();
    if (!hisse) return;

    fetch("https://murat6492.github.io/my-fin-data/tumhisse.json")
      .then(r => r.json())
      .then(list => {
        console.log("JSON yüklendi, satır sayısı:", list.length);

        const row = list.find(x => x.Hisse === hisse);

        if (!row) {
          alert("Bu hisse bulunamadı: " + hisse);
          return;
        }

        console.log("Bulunan satır:", row);

        // DOM'A YAZ
        document.getElementById("hisse-kodu").textContent = row.Hisse;
        document.getElementById("hisse-fiyat").textContent = row["Son Fiyat (TL)"];
        document.getElementById("hisse-yuzde").textContent = row["Değişim (%)"] + "%";
      })
      .catch(err => {
        console.error("Hata:", err);
      });
  });
});
    
    /* ================================================= */
    /* 1. TEMA DEĞİŞTİRME İŞLEVİ */
    /* ================================================= */
    const temaBtn = document.getElementById('temaDegistir');
    const body = document.body;
    const storageKey = 'bistDataTema287'; 

    function loadTheme() {
        if (!temaBtn) return; 
        
        const savedTheme = localStorage.getItem(storageKey);
        
        if (savedTheme === 'light') {
            body.classList.remove('dark');
            temaBtn.textContent = '🌙'; 
        } else {
            body.classList.add('dark'); 
            temaBtn.textContent = '☀️'; 
        }
    }
    
    if (temaBtn) { 
        temaBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            if (body.classList.contains('dark')) {
                localStorage.setItem(storageKey, 'dark');
                temaBtn.textContent = '☀️';
            } else {
                localStorage.setItem(storageKey, 'light');
                temaBtn.textContent = '🌙';
            }
        });

        loadTheme();
    }
    
    /* ================================================= */
    /* 2. ANA SAYFA VE MENÜ GEÇİŞ İŞLEVİ */
    /* ================================================= */
    
    const solMenüLinkleri = document.querySelectorAll('.sol-menü a, .alt-menü a');
    const tumIcerikler = document.querySelectorAll('.content-box');
    

    // Yeni: HİSSE DETAY içerisindeki sekmeleri aktive eder
    function activateHisseTabs(internalTabName) {
        
        // 1. Tüm sekme başlıklarını inaktif yap
        const sekmeBasliklari = document.querySelectorAll('.sekme-menü .sekme-baslik');
        sekmeBasliklari.forEach(b => b.classList.remove('aktif'));
        
        // 2. Tüm sekme içeriklerini gizle (hisse detay içindekiler)
        const sekmeIcerikleri = document.querySelectorAll('#hisse-detay-icerik .sekme-icerik');
        sekmeIcerikleri.forEach(icerik => icerik.classList.add('gizli'));

        // 3. Hedef sekme başlığını ve içeriğini aktif et
        if (internalTabName) {
            const targetBaslik = document.querySelector(`.sekme-menü .sekme-baslik[data-sekme="${internalTabName}"]`);
            const targetIcerik = document.getElementById(internalTabName + '-icerik');
            
            if (targetBaslik) targetBaslik.classList.add('aktif');
            if (targetIcerik) targetIcerik.classList.remove('gizli');
            
        }
    }

    function changePage(targetId, internalTabName = 'ozet') { // Varsayılan sekme 'ozet'
        
        // 1. Tüm ana içerikleri gizle
        tumIcerikler.forEach(icerik => icerik.classList.add('gizli'));
        
        // 2. Hedef ana içeriği göster
        const targetContent = document.getElementById(targetId);
        if(targetContent) {
            targetContent.classList.remove('gizli');
            
            // Eğer BistData Analizi yükleniyorsa, grafikleri yeniden çiz
            if (targetId === 'hisse-detay-icerik' && internalTabName === 'bistdata-analiz') {
                setTimeout(renderAllCharts, 10); 
            }
        }

        // 3. Aktif menü linkini ayarla
        document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(link => link.classList.remove('aktif-sol-menü'));
        const activeLink = document.querySelector(`a[data-sekme-target="${targetId}"][data-sekme-internal="${internalTabName}"]`) || document.querySelector(`a[data-sekme-target="${targetId}"]:not([data-sekme-internal])`);

        if (activeLink) {
            activeLink.classList.add('aktif-sol-menü');
        }

        // 4. Eğer açılan sayfa hisse detay sayfası ise, iç sekmesini aktif et
        if (targetId === 'hisse-detay-icerik') {
            activateHisseTabs(internalTabName);
        }
    }

    solMenüLinkleri.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.sekmeTarget;
            const internalTabName = link.dataset.sekmeInternal; 

            if (targetId) {
                changePage(targetId, internalTabName);
            }
        });
    });

    // Başlangıçta anasayfayı göster
    changePage('anasayfa-icerik');


    /* ================================================= */
    /* 3. ALT MENÜ AÇMA/KAPAMA İŞLEVİ (Toggle) */
    /* ================================================= */

    document.querySelectorAll('.toggle-menu').forEach(span => {
        span.addEventListener('click', () => {
            const targetMenu = document.getElementById(span.dataset.target);
            if (targetMenu) {
                targetMenu.classList.toggle('gizli');
            }
        });
    });
    
    /* ================================================= */
    /* 4. HİSSE DETAY İÇİ SEKME İŞLEVİ (Özet, BistData Analizi vb.) */
    /* ================================================= */
    
    const sekmeBasliklari = document.querySelectorAll('.sekme-menü .sekme-baslik');
    

    sekmeBasliklari.forEach(baslik => {
        baslik.addEventListener('click', () => {
            const internalTabName = baslik.dataset.sekme; 
            activateHisseTabs(internalTabName);
            
            // Eğer BistData Analizi sekmesi açılıyorsa, grafikleri yeniden çiz
            if (internalTabName === 'bistdata-analiz') {
                setTimeout(renderAllCharts, 10);
            }
        });
    });
}); // DOMContentLoaded sonu

/* ================================================= */
/* 5. MODERN GRAFİKLER (Chart.js ile) */
/* ================================================= */

function createGradient(ctx, colorStart, colorEnd) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 260); 
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
}

function renderBarChart(canvasId, labels, data, colorStart, colorEnd) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;
    
    // Eğer grafik zaten çizilmişse, onu yok et (yeniden çizim için)
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const gradient = createGradient(ctx, colorStart, colorEnd);

    // Yeni grafik oluştur
    // eslint-disable-next-line no-new
    canvas.chart = new Chart(ctx, { // Grafiği canvas objesine kaydet
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '',
                data,
                backgroundColor: gradient,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#161625',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#33334f',
                    borderWidth: 1,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0a0c0' }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    ticks: { display: false }
                }
            }
        }
    });
}

// YENİ EKLENEN KOD: Çizgi Grafik Fonksiyonu (Değerleri Olduğu Gibi Gösterir)
function renderLineChart(canvasId, labels, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    const ctx = canvas.getContext('2d');

    canvas.chart = new Chart(ctx, { 
        type: 'line', 
        data: {
            labels,
            datasets: [{
                label: 'Oran Değerleri',
                data,
                borderColor: color,
                backgroundColor: color + '30',
                pointRadius: 6,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: color,
                borderWidth: 3,
                tension: 0.4, 
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const rawValue = context.parsed.y;
                            return ' ' + rawValue.toFixed(4); 
                        }
                    },
                    backgroundColor: '#161625',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#33334f',
                    borderWidth: 1,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0a0c0' }
                },
                y: {
                    grid: { color: 'rgba(54, 162, 235, 0.1)' },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2); 
                        }
                    }
                }
            }
        }
    });
}
// Çizgi Grafik Fonksiyonu Sonu


// Grafik Verileri (Tüm 18 Çubuk Grafik için Ortak Veri ve Etiketler)
const labels2 = ['2023-3','2023-6','2023-9','2023-12','2024-3'];
const data2 = [14.401, 18.067, 32.067, 73.593, 15.139];

// YENİ EKLENEN KOD: Çizgi Grafik Verileri
const labelsOranlar = ['2023-3','2023-6','2023-9','2023-12','2024-3'];
const dataCariOran = [1.50, 1.45, 1.60, 1.55, 1.70]; 
const dataLikidite = [1.05, 1.00, 1.15, 1.10, 1.20]; 
const dataNakit = [0.45, 0.40, 0.50, 0.55, 0.60]; 
const dataHazirDegerler = [0.55, 0.50, 0.60, 0.65, 0.70];
const dataEkonomikRantabilite = [0.12, 0.15, 0.18, 0.14, 0.20];
const dataMaliRantabilite = [0.2, 0.5, 0.8, 0.4, 0.2];

// RENK PALETİ TANIMLARI
const Renkler = {
    GELIR: '#007bff', // Mavi (Satışlar, Kar vb.)
    VARLIK: '#28a745', // Yeşil (Varlıklar)
    BORC: '#dc3545',   // Kırmızı (Yükümlülükler/Borçlar)
    OZET: '#007bff',   // Mor (Oranlar)
    ORAN: '#8a2be2',   // YENİ EKLENDİ: Oranlar için Mor renk
};

// TÜM GRAFİKLERİ ÇİZEN ANA FONKSİYON
function renderAllCharts() {
    
    // 1. SATIR: Satışlar - FAVÖK - Net Kar (Gelir Tablosu Kalemleri)
    renderBarChart('chart2-satis', labels2, data2, Renkler.GELIR, Renkler.GELIR);
    renderBarChart('chart2-favok', labels2, data2, Renkler.GELIR, Renkler.GELIR);
    renderBarChart('chart2-netkar', labels2, data2, Renkler.GELIR, Renkler.GELIR);
    
    // 2. SATIR: Brüt Kar - EFK - HBK (Kar ve Oranlar)
    renderBarChart('chart2-brutkar', labels2, data2, Renkler.GELIR, Renkler.GELIR);
    renderBarChart('chart2-efk', labels2, data2, Renkler.GELIR, Renkler.GELIR);
    renderBarChart('chart2-hbk', labels2, data2, Renkler.GELIR, Renkler.GELIR);

    // 3. SATIR: Özkaynaklar - Duran Varlıklar - Dönen Varlıklar (Varlıklar)
    renderBarChart('chart2-ozkaynaklar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-duran-varliklar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-donen-varliklar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);

    // 4. SATIR: Nakit ve Nakit Benzerleri - Stoklar - Ticari Alacaklar (Varlıklar - Likidite)
    renderBarChart('chart2-nakit', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-stoklar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-ticari-alacaklar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);

    // 5. SATIR: Finansal Yatırımlar - Maddi Duran Varlılar - Maddi Olmayan Duran Varlıklar (Varlıklar - Likidite)
    renderBarChart('chart2-finyat', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-maddurvar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);
    renderBarChart('chart2-madolmdurvar', labels2, data2, Renkler.VARLIK, Renkler.VARLIK);

    // 6. SATIR: Toplam Yükümlülükler - KVY - UVY (Yükümlülükler)
    renderBarChart('chart2-toplam-yukumlulukler', labels2, data2, Renkler.BORC, Renkler.BORC);
    renderBarChart('chart2-kvy', labels2, data2, Renkler.BORC, Renkler.BORC);
    renderBarChart('chart2-uvy', labels2, data2, Renkler.BORC, Renkler.BORC);
    
    // 7. SATIR: Finansal Borçlar - Ticari Borçlar - Net Borç (Borçlar)
    renderBarChart('chart2-finansal-borclar', labels2, data2, Renkler.BORC, Renkler.BORC);
    renderBarChart('chart2-ticari-borclar', labels2, data2, Renkler.BORC, Renkler.BORC);
    renderBarChart('chart2-net-borc', labels2, data2, Renkler.BORC, Renkler.BORC);

    // 8., 9. ve diğer tekrarlayan çağrıları kaldırdım, sadece ilk 7 satırı korudum.
    // Eğer bu çağrılar önemliyse, onları geri ekleyebilirsiniz.
    
    
    // YENİ EKLENEN KOD: ÇİZGİ GRAFİK ÇAĞRILARI (ORANLAR)
    renderLineChart('chart10-cari-oran', labelsOranlar, dataCariOran, Renkler.ORAN);
    renderLineChart('chart10-likidite', labelsOranlar, dataLikidite, Renkler.ORAN);
    renderLineChart('chart10-nakit', labelsOranlar, dataNakit, Renkler.ORAN);
    renderLineChart('chart10-hazir-degerler', labelsOranlar, dataHazirDegerler, Renkler.ORAN);
    renderLineChart('chart10-ekonomik-rantabilite', labelsOranlar, dataEkonomikRantabilite, Renkler.ORAN);
    renderLineChart('chart10-mali-rantabilite', labelsOranlar, dataMaliRantabilite, Renkler.ORAN);
    // YENİ ÇAĞRILAR SONU
}

 // --- JAVASCRIPT SONU ---
    
    // Tablo satırlarına hover efekti eklemek için basit bir script.
// VE YENİ BİLGİ BUTONU İŞLEVİ.
document.addEventListener('DOMContentLoaded', function() {
    // Tablo Satırı Hover İşlevi
    const rows = document.querySelectorAll('.financial-table tbody tr');

    rows.forEach(row => {
        // Sadece veri içeren satırlara efekt uygula
        if(row.cells.length > 1) {
            row.addEventListener('mouseenter', () => {
                row.style.outline = "2px solid #333";
            });
            row.addEventListener('mouseleave', () => {
                row.style.outline = "none";
            });
        }
    });
});

// =======================
//  ARAMA SİSTEMİ
// =======================

// =======================
//  ARAMA SİSTEMİ (GÜVENLİ)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Arama sistemi yüklendi");

  const searchInput = document.querySelector('.arama-kutusu input');
  const searchButton = document.querySelector('.arama-kutusu button');

  if (!searchInput || !searchButton) {
    console.error("Arama kutusu elemanları bulunamadı");
    return;
  }

  searchButton.addEventListener('click', () => {
    const hisse = searchInput.value.trim().toUpperCase();
    if (!hisse) return;

    const fileName = encodeURIComponent(`${hisse} (TRY)__bilanço.json`);
    const url = `https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/${fileName}`;

    console.log("JSON URL:", url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Dosya bulunamadı");
        return res.json();
      })
      .then(data => {
        console.log("JSON geldi:", data.length);
      })
      .catch(err => {
        console.error("Fetch hatası:", err.message);
      });
  });
});

// =======================
// FİYAT YÜKLEME (tumhisse.json)
// =======================
function loadPrice(hisse) {
  const url ="https://murat6492.github.io/my-fin-data/tumhisse.json";
  console.log("Fiyat JSON çağrılıyor:", url);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("tumhisse.json bulunamadı");
      return res.json();
    })
    .then(list => {
      console.log("Tüm hisseler yüklendi:", list.length);

      const row = list.find(x => x.Hisse === hisse);

      if (!row) {
        console.warn("Fiyat bulunamadı:", hisse);
        return;
      }

      console.log("FİYAT BULUNDU:", row);

      // 👇 HTML'DEKİ ID'LER
      const kodEl = document.getElementById("hisse-kodu");
      const fiyatEl = document.getElementById("hisse-fiyat");
      const yuzdeEl = document.getElementById("hisse-yuzde");

      if (!kodEl || !fiyatEl || !yuzdeEl) {
        console.error("Fiyat alanları DOM'da yok");
        return;
      }

      kodEl.textContent = row.Hisse;
      fiyatEl.textContent = row["Son Fiyat (TL)"];
      yuzdeEl.textContent = row["Değişim (%)"];

      console.log("FİYAT EKRANA YAZILDI ✔");
    })
    .catch(err => {
      console.error("Fiyat yükleme hatası:", err.message);
    });
}
function loadPrice(hisse) {
  fetch("https://murat6492.github.io/my-fin-data/tumhisse.json")
    .then(r => r.json())
    .then(list => {
      const row = list.find(x => x.Hisse === hisse);
      if (!row) {
        alert("Hisse bulunamadı: " + hisse);
        return;
      }

      document.getElementById("hisse-kodu").textContent = row.Hisse;
      document.getElementById("hisse-fiyat").textContent = row["Son Fiyat (TL)"];
      document.getElementById("hisse-yuzde").textContent =
        row["Değişim (%)"] > 0
          ? "+" + row["Değişim (%)"]
          : row["Değişim (%)"];
    })
    .catch(err => {
      console.error("Fiyat verisi alınamadı", err);
    });
}
function loadPrice(hisse) {
  fetch("https://murat6492.github.io/my-fin-data/tumhisse.json")
    .then(r => r.json())
    .then(list => {
      const row = list.find(x => x.Hisse === hisse);
      if (!row) {
        alert("Hisse bulunamadı: " + hisse);
        return;
      }

      document.getElementById("hisse-kodu").textContent = row.Hisse;
      document.getElementById("hisse-fiyat").textContent = row["Son Fiyat (TL)"];
      document.getElementById("hisse-yuzde").textContent =
        row["Değişim (%)"] > 0
          ? "+" + row["Değişim (%)"]
          : row["Değişim (%)"];
    })
    .catch(err => {
      console.error("Fiyat verisi alınamadı", err);
    });
}
searchButton.addEventListener("click", () => {
  const hisse = searchInput.value.trim().toUpperCase();
  if (!hisse) return;

  loadPrice(hisse);
});


