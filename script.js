// script.js - TAMAMEN DÜZELTİLMİŞ VE ÇALIŞAN VERSİYON

document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js yüklendi");

    // =================================================
    // 1. TEMA DEĞİŞTİRME
    // =================================================
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

    // =================================================
    // 2. MENÜ DARALT/GENİŞLET (Mobil + Masaüstü)
    // =================================================
    const solSutun = document.querySelector('.sol-sutun');
    const toggleBtn = document.getElementById('menuToggleBtn');

    if (toggleBtn && solSutun) {
        // Sayfa yüklendiğinde son durumu yükle
        if (localStorage.getItem('menuDaraltilmis') === 'true') {
            solSutun.classList.add('daraltilmis');
            toggleBtn.querySelector('i').style.transform = 'rotate(180deg)';
        }

        toggleBtn.addEventListener('click', () => {
            solSutun.classList.toggle('daraltilmis');
            const dar = solSutun.classList.contains('daraltilmis');
            localStorage.setItem('menuDaraltilmis', dar);
            toggleBtn.querySelector('i').style.transform = dar ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    // =================================================
    // 3. ANA MENÜ VE SAYFA GEÇİŞLERİ
    // =================================================
    const solMenuLinkleri = document.querySelectorAll('.sol-menü a, .alt-menü a');
    const tumIcerikler = document.querySelectorAll('.content-box');

    function activateHisseTabs(internalTabName = 'ozet') {
        const sekmeBasliklari = document.querySelectorAll('.sekme-menü .sekme-baslik');
        sekmeBasliklari.forEach(b => b.classList.remove('aktif'));

        const sekmeIcerikleri = document.querySelectorAll('#hisse-detay-icerik .sekme-icerik');
        sekmeIcerikleri.forEach(ic => ic.classList.add('gizli'));

        if (internalTabName) {
            const targetBaslik = document.querySelector(`.sekme-menü .sekme-baslik[data-sekme="${internalTabName}"]`);
            const targetIcerik = document.getElementById(internalTabName + '-icerik');

            if (targetBaslik) targetBaslik.classList.add('aktif');
            if (targetIcerik) targetIcerik.classList.remove('gizli');
        }
    }

    function changePage(targetId, internalTabName = 'ozet') {
        tumIcerikler.forEach(icerik => icerik.classList.add('gizli'));

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('gizli');

            if (targetId === 'hisse-detay-icerik') {
                activateHisseTabs(internalTabName);
                if (internalTabName === 'bistdata-analiz') {
                    setTimeout(renderAllCharts, 100);
                }
            }
        }

        // Aktif menü vurgusu
        document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(link => link.classList.remove('aktif-sol-menü'));
        const activeLink = document.querySelector(`a[data-sekme-target="${targetId}"][data-sekme-internal="${internalTabName}"]`) ||
                           document.querySelector(`a[data-sekme-target="${targetId}"]:not([data-sekme-internal])`);
        if (activeLink) activeLink.classList.add('aktif-sol-menü');
    }

    solMenuLinkleri.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.sekmeTarget;
            const internalTabName = link.dataset.sekmeInternal || 'ozet';
            if (targetId) changePage(targetId, internalTabName);
        });
    });

    // Açılır alt menüler (Finansal Veriler gibi)
    document.querySelectorAll('.toggle-menu').forEach(span => {
        span.addEventListener('click', () => {
            const targetMenu = document.getElementById(span.dataset.target);
            if (targetMenu) {
                targetMenu.classList.toggle('gizli');
                span.classList.toggle('active');
            }
        });
    });

    // Hisse detay içi sekmeler
    document.querySelectorAll('.sekme-menü .sekme-baslik').forEach(baslik => {
        baslik.addEventListener('click', () => {
            const internalTabName = baslik.dataset.sekme;
            activateHisseTabs(internalTabName);
            if (internalTabName === 'bistdata-analiz') {
                setTimeout(renderAllCharts, 100);
            }
        });
    });

    // Sayfa ilk yüklendiğinde anasayfa
    changePage('anasayfa-icerik');

    // =================================================
    // 4. BİLGİ BUTONLARI (ℹ️)
    // =================================================
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.infoTarget;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.toggle('gizli');
            }
        });
    });

    // =================================================
    // 5. GRAFİKLER (Chart.js)
    // =================================================
    function createGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 260);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    }

    function renderBarChart(canvasId, labels, data, colorStart, colorEnd) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Chart === 'undefined') return;

        if (canvas.chart) canvas.chart.destroy();

        const ctx = canvas.getContext('2d');
        const gradient = createGradient(ctx, colorStart + 'aa', colorEnd + '44');

        canvas.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: gradient,
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#a0a0c0' } },
                    y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { display: false } }
                }
            }
        });
    }

    function renderLineChart(canvasId, labels, data, color) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Chart === 'undefined') return;

        if (canvas.chart) canvas.chart.destroy();

        const ctx = canvas.getContext('2d');
        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
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
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#a0a0c0' } },
                    y: { grid: { color: 'rgba(54,162,235,0.1)' } }
                }
            }
        });
    }

    const labels2 = ['2023-3', '2023-6', '2023-9', '2023-12', '2024-3'];
    const data2 = [14.401, 18.067, 32.067, 73.593, 15.139];

    const labelsOranlar = ['2023-3', '2023-6', '2023-9', '2023-12', '2024-3'];
    const dataCariOran = [1.50, 1.45, 1.60, 1.55, 1.70];
    const dataLikidite = [1.05, 1.00, 1.15, 1.10, 1.20];
    const dataNakit = [0.45, 0.40, 0.50, 0.55, 0.60];
    const dataHazirDegerler = [0.55, 0.50, 0.60, 0.65, 0.70];
    const dataEkonomikRantabilite = [0.12, 0.15, 0.18, 0.14, 0.20];
    const dataMaliRantabilite = [0.2, 0.5, 0.8, 0.4, 0.2];

    const Renkler = {
        GELIR: '#26c3c9',
        VARLIK: '#28a745',
        BORC: '#dc3545',
        ORAN: '#8a2be2'
    };

    window.renderAllCharts = function() {
        // Tüm çubuk grafikler
        const chartIds = [
            'chart2-satis', 'chart2-favok', 'chart2-netkar',
            'chart2-brutkar', 'chart2-efk', 'chart2-hbk',
            'chart2-ozkaynaklar', 'chart2-duran-varliklar', 'chart2-donen-varliklar',
            'chart2-nakit', 'chart2-stoklar', 'chart2-ticari-alacaklar',
            'chart2-finyat', 'chart2-maddurvar', 'chart2-madolmdurvar',
            'chart2-toplam-yukumlulukler', 'chart2-kvy', 'chart2-uvy',
            'chart2-finansal-borclar', 'chart2-ticari-borclar', 'chart2-net-borc'
        ];

        chartIds.forEach(id => {
            let renk = Renkler.GELIR;
            if (id.includes('ozkaynaklar') || id.includes('varliklar') || id.includes('nakit') || id.includes('stoklar') || id.includes('alacaklar') || id.includes('finyat') || id.includes('durvar')) {
                renk = Renkler.VARLIK;
            } else if (id.includes('borc') || id.includes('yukumluluk') || id.includes('kvy') || id.includes('uvy')) {
                renk = Renkler.BORC;
            }
            renderBarChart(id, labels2, data2, renk, renk);
        });

        // Çizgi grafikler
        renderLineChart('chart10-cari-oran', labelsOranlar, dataCariOran, Renkler.ORAN);
        renderLineChart('chart10-likidite', labelsOranlar, dataLikidite, Renkler.ORAN);
        renderLineChart('chart10-nakit', labelsOranlar, dataNakit, Renkler.ORAN);
        renderLineChart('chart10-hazir-degerler', labelsOranlar, dataHazirDegerler, Renkler.ORAN);
        renderLineChart('chart10-ekonomik-rantabilite', labelsOranlar, dataEkonomikRantabilite, Renkler.ORAN);
        renderLineChart('chart10-mali-rantabilite', labelsOranlar, dataMaliRantabilite, Renkler.ORAN);
    };

    // =================================================
    // 6. ARAMA VE HİSSE YÜKLEME
    // =================================================
    const hisseInput = document.getElementById("hisseInput");
    const aramaForm = document.querySelector(".arama-kutusu");

    async function hisseYukle(hisseKodu) {
        const kod = hisseKodu.toUpperCase().trim();
        if (!kod) return;

        const url = `https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/${kod}%20(TRY)__bilan%C3%A7o.json`;
        console.log("JSON yükleniyor:", url);

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Veri bulunamadı");
            const data = await res.json();
            console.log("Veri alındı:", data);

            changePage('hisse-detay-icerik', 'ozet');

            // Hisse kodunu başlıkta göster
            const kodEl = document.querySelector(".hisse-kodu");
            if (kodEl) kodEl.textContent = kod;

            hisseInput.value = '';
        } catch (err) {
            console.error(err);
            alert(`${kod} için veri bulunamadı.`);
        }
    }

    if (aramaForm) {
        aramaForm.addEventListener("submit", e => {
            e.preventDefault();
            hisseYukle(hisseInput.value);
        });
    }

    // Tablo hover efekti
    document.querySelectorAll('.financial-table tbody tr').forEach(row => {
        if (row.cells.length > 1) {
            row.addEventListener('mouseenter', () => row.style.backgroundColor = '#f0f0f0');
            row.addEventListener('mouseleave', () => row.style.backgroundColor = '');
        }
    });
});
