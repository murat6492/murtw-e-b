// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sol Menü - Sekme Geçişleri
    const solMenuLinkler = document.querySelectorAll('.sol-menü a, .alt-menü a');
    const tumIcerikler = document.querySelectorAll('.content-box');

    solMenuLinkler.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Tüm içerikleri gizle
            tumIcerikler.forEach(icerik => {
                icerik.classList.add('gizli');
            });

            // Aktif sınıfını kaldır
            document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(a => {
                a.classList.remove('aktif-sol-menü');
            });

            // Tıklanan hedefi göster
            const targetId = link.getAttribute('data-sekme-target');
            const targetIcerik = document.getElementById(targetId);
            if (targetIcerik) {
                targetIcerik.classList.remove('gizli');
            }

            // Aktif menüye sınıf ekle
            link.classList.add('aktif-sol-menü');
        });
    });

    // 2. Hisse İnceleme Sayfasındaki Sekmeler (Özet, BistData vs.)
    const sekmeBasliklar = document.querySelectorAll('.sekme-menü .sekme-baslik');
    const sekmeIcerikler = document.querySelectorAll('#hisse-inceleme-sayfa .sekme-icerik');

    sekmeBasliklar.forEach(baslik => {
        baslik.addEventListener('click', () => {
            const hedefSekme = baslik.getAttribute('data-sekme');

            // Tüm içerikleri gizle ve aktif sınıfı kaldır
            sekmeIcerikler.forEach(ic => ic.classList.add('gizli'));
            sekmeBasliklar.forEach(b => b.classList.remove('aktif'));

            // Hedefi göster
            const hedefIcerik = document.getElementById(hedefSekme + '-sekme-icerik');
            if (hedefIcerik) {
                hedefIcerik.classList.remove('gizli');
            }

            baslik.classList.add('aktif');
        });
    });

    // 3. Tema Değiştirme Butonu (Karanlık / Aydınlık)
    const temaButon = document.getElementById('temaDegistir');
    temaButon.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');

        // Buton ikonunu değiştir
        if (document.body.classList.contains('dark')) {
            temaButon.textContent = '☀️';
        } else {
            temaButon.textContent = '🌙';
        }
    });

    // Varsayılan tema kontrolü (eğer light class yoksa dark kalır)
    if (!document.body.classList.contains('light')) {
        document.body.classList.add('dark');
        temaButon.textContent = '☀️';
    }

    // 4. Arama Kutusu (Basit simülasyon - gerçek veri yok ama hisse incelemeye yönlendirir)
    const hisseInput = document.getElementById('hisseInput');
    const hisseAraBtn = document.getElementById('hisseAraBtn');

    const aramaYap = () => {
        const kod = hisseInput.value.trim().toUpperCase();
        if (kod) {
            // Örnek: ASELS yazınca Hisse İnceleme sayfasına gider
            if (kod === 'ASELS' || kod === 'asels') {
                // Hisse başlığını güncelle
                document.querySelector('.hisse-kodu').textContent = kod;
                document.querySelector('.hisse-ad').textContent = `${kod} Şirket Adı Burada Görünecek`;

                // Hisse İnceleme sayfasını aç
                tumIcerikler.forEach(icerik => icerik.classList.add('gizli'));
                document.getElementById('hisse-inceleme-sayfa').classList.remove('gizli');

                // Sol menüden Hisse İnceleme'yi aktif et
                document.querySelectorAll('.sol-menü a, .alt-menü a').forEach(a => a.classList.remove('aktif-sol-menü'));
                document.querySelector('a[data-sekme-target="hisse-inceleme-sayfa"]').classList.add('aktif-sol-menü');

                hisseInput.value = '';
            } else {
                alert(`"${kod}" kodu bulunamadı. Örnek kullanım: ASELS`);
            }
        }
    };

    hisseAraBtn.addEventListener('click', aramaYap);
    hisseInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aramaYap();
        }
    });

    // 5. Bilgi Butonları (ℹ️) - Toggle ile bilgi notu göster/gizle
    const infoButonlar = document.querySelectorAll('.info-btn');
    infoButonlar.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-info-target');
            const not = document.getElementById(targetId);
            if (not) {
                not.classList.toggle('gizli');
            }
        });
    });

    // Sayfa yüklendiğinde varsayılan olarak Anasayfa aktif olsun
    document.querySelector('a[data-sekme-target="anasayfa-icerik"]').classList.add('aktif-sol-menü');
});
