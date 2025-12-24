// script.js - DÜZELTİLMİŞ VE TEST EDİLMİŞ VERSİYON

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sol Menü Sekme Geçişleri
    const solMenuLinkler = document.querySelectorAll('.sol-menü a, .alt-menü a');
    const tumIcerikler = document.querySelectorAll('.content-box');

    solMenuLinkler.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('data-sekme-target');
            if (!targetId) return;

            // Tüm içerikleri gizle
            tumIcerikler.forEach(icerik => icerik.classList.add('gizli'));

            // Tıklanan içeriği göster
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('gizli');
            }

            // Aktif menüyü güncelle
            document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(a => {
                a.classList.remove('aktif-sol-menü');
            });
            link.classList.add('aktif-sol-menü');
        });
    });

    // 2. Hisse İnceleme İçindeki Sekmeler (Özet, BistData, Finansal, Değerleme)
    const sekmeBasliklar = document.querySelectorAll('.sekme-menü .sekme-baslik');

    sekmeBasliklar.forEach(baslik => {
        baslik.addEventListener('click', () => {
            const sekmeAdi = baslik.getAttribute('data-sekme');

            // Tüm sekme içeriklerini gizle
            document.querySelectorAll('#hisse-inceleme-sayfa .sekme-icerik').forEach(ic => {
                ic.classList.add('gizli');
            });

            // Tüm başlıkların aktif sınıfını kaldır
            sekmeBasliklar.forEach(b => b.classList.remove('aktif'));

            // Hedef içeriği göster
            const hedefIcerik = document.getElementById(sekmeAdi + '-sekme-icerik');
            if (hedefIcerik) {
                hedefIcerik.classList.remove('gizli');
            }

            // Tıklanan başlığa aktif sınıfı ekle
            baslik.classList.add('aktif');
        });
    });

    // 3. Tema Değiştirme
    const temaButon = document.getElementById('temaDegistir');
    if (temaButon) {
        temaButon.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            document.body.classList.toggle('light');

            if (document.body.classList.contains('dark')) {
                temaButon.textContent = '☀️';
            } else {
                temaButon.textContent = '🌙';
            }
        });
    }

    // Varsayılan tema: dark
    if (!document.body.classList.contains('light') && !document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
        if (temaButon) temaButon.textContent = '☀️';
    }

    // 4. Arama Kutusu (ASELS yazınca hisse sayfasına gider)
    const hisseInput = document.getElementById('hisseInput');
    const hisseAraBtn = document.getElementById('hisseAraBtn');

    const aramaYap = () => {
        let kod = hisseInput.value.trim().toUpperCase();
        if (!kod) return;

        // Demo: Sadece ASELS çalışsın
        if (kod === 'ASELS') {
            // Hisse başlığını güncelle
            const hisseKoduEl = document.querySelector('.hisse-kodu');
            const hisseAdEl = document.querySelector('.hisse-ad');
            if (hisseKoduEl) hisseKoduEl.textContent = 'ASELS';
            if (hisseAdEl) hisseAdEl.textContent = 'ASELSAN Elektronik Sanayi ve Ticaret A.Ş.';

            // Hisse İnceleme sayfasını aç
            tumIcerikler.forEach(icerik => icerik.classList.add('gizli'));
            const hisseSayfa = document.getElementById('hisse-inceleme-sayfa');
            if (hisseSayfa) hisseSayfa.classList.remove('gizli');

            // Sol menüde Hisse İnceleme'yi aktif et
            document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(a => a.classList.remove('aktif-sol-menü'));
            const hisseLink = document.querySelector('a[data-sekme-target="hisse-inceleme-sayfa"]');
            if (hisseLink) hisseLink.classList.add('aktif-sol-menü');

            hisseInput.value = '';
        } else {
            alert(`"${kod}" hissesi bulunamadı. Denemek için: ASELS`);
        }
    };

    if (hisseAraBtn) hisseAraBtn.addEventListener('click', aramaYap);
    if (hisseInput) {
        hisseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') aramaYap();
        });
    }

    // 5. Bilgi Butonları (ℹ️)
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-info-target');
            const not = document.getElementById(target);
            if (not) not.classList.toggle('gizli');
        });
    });

    // Sayfa açıldığında Anasayfa aktif olsun
    const anasayfaLink = document.querySelector('a[data-sekme-target="anasayfa-icerik"]');
    if (anasayfaLink) anasayfaLink.classList.add('aktif-sol-menü');
});
