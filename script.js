// --- DATA EVENT (TAMBAH DATA DISINI) ---
const events = [
    {
        img: "WhatsApp Image 2026-02-05 at 11.47.55.jpeg",
        title: "Class Meeting",
        desc: "Pertandingan futsal antar kelas yang seru dan penuh semangat!"
    },
    {
        img: "https://image2url.com/r2/default/images/1772343308335-dbe58524-2126-46dd-93a4-52d37b00d7c1.jpg",
        title: "Pentas Seni",
        desc: "Tampilkan bakat terbaik kelas kita di panggung utama."
    },
    {
        img: "https://images.unsplash.com/photo-1541872720-d7c2e1966a33?q=80&w=600",
        title: "Studi Banding",
        desc: "Kunjungan ke sekolah unggulan untuk menambah wawasan."
    }
];
// ----------------------------------------

const frameSlider = document.getElementById('frameSlider');
const bgSlider = document.getElementById('bgSlider');
const titleEl = document.getElementById('eventTitle');
const descEl = document.getElementById('eventDesc');

// 1. Inisialisasi: Masukkan gambar ke DOM
function initEvents() {
    let frameHTML = '';
    let bgHTML = '';
    
    events.forEach(ev => {
        frameHTML += `<img src="${ev.img}" alt="${ev.title}">`;
        bgHTML += `<img src="${ev.img}" alt="${ev.title}">`;
    });
    
    frameSlider.innerHTML = frameHTML;
    bgSlider.innerHTML = bgHTML;
    
    // Set teks awal
    titleEl.textContent = events[0].title;
    descEl.textContent = events[0].desc;
}

let idx = 0;

// 2. Fungsi untuk mengupdate event
function updateEvent() {
    idx = (idx + 1) % events.length;

    // 1. Geser Bingkai Utama
    frameSlider.style.transform = `translateY(-${idx * 100}%)`;
    
    // 2. Geser Background (Sinkron)
    bgSlider.style.transform = `translateY(-${idx * 100}%)`;

    // 3. Update Teks dengan Efek Fade
    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;
    
    setTimeout(() => {
        titleEl.textContent = events[idx].title;
        descEl.textContent = events[idx].desc;
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
    }, 400); // Waktu jeda untuk fade out
}

// Jalankan inisialisasi
initEvents();

// Jalankan otomatis setiap 5 detik
setInterval(updateEvent, 5000);