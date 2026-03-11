const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.classList.remove("transparent");
    } else {
        navbar.classList.add("transparent");
        navbar.classList.remove("scrolled");
    }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll("#navLinks a");

/* Klik salah satu menu → auto tutup */
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

/* Klik di luar menu → auto tutup */
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

/* Scroll → auto tutup */
window.addEventListener("scroll", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
});

// === DATA JUMLAH ===
const totalSiswa = 9;   // GANTI sesuai jumlah asli
const totalSiswi = 27;   // GANTI sesuai jumlah asli



// Animasi angka rolling
function animateNumber(id, target) {
    const element = document.getElementById(id);

    let randomDuration = 2000; // 2 detik angka random
    let finalDuration = 800;   // 0.8 detik naik ke angka asli
    let intervalTime = 40;

    element.style.color = "#ff8c00";
    
    // 1️⃣ FASE RANDOM
    const randomInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * (target + 20));
        element.textContent = randomNum;
    }, intervalTime);

    setTimeout(() => {
        clearInterval(randomInterval);

        // 2️⃣ FASE NAIK KE ANGKA ASLI
        let start = 0;
        let increment = target / (finalDuration / intervalTime);

        const finalInterval = setInterval(() => {
            start += increment;

            if (start >= target) {
                element.textContent = target;
                element.style.color = "#333";
                clearInterval(finalInterval);
            } else {
                element.textContent = Math.floor(start);
            }
        }, intervalTime);

    }, randomDuration);
}

// Jalankan setelah halaman load
window.addEventListener("load", () => {
    animateNumber("jumlahSiswa", totalSiswa);
    animateNumber("jumlahSiswi", totalSiswi);
    animateNumber("jumlahEvent", events.length); // otomatis dari data event
});

// --- DATA EVENT (TAMBAH DATA DISINI) ---
const events = [
    {
        // Ganti sesuai lokasi folder kamu
        img: "https://image2url.com/r2/default/images/1773216869430-c97ff598-35f9-4b1d-9f4d-e8a7e73443bc.jpeg", 
        title: "Sepekan",
        desc: "POKOK LOMBA."
    },
    {
        img: "https://image2url.com/r2/default/images/1773216955095-7cf1a1bb-f970-4397-b86b-2a6e9c2f628f.jpeg",
        title: "Mapel MTK",
        desc: "PUYENG ANYING."
    },
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


const dataStruktur = {
    role: "Ketua",
    name: "FIKAR",
    img: "image.png",
    children: [{
        role: "Wakil Ketua",
        name: "SENA",
        img: "image.png",
        children: [
            {
                role: "Bendahara 1", // Jalur Kiri
                name: "MBG",
                img: "cihuy.png",
                children: [{ role: "Bendahara 2", name: "Wendi", img: "image.png" }]
            },
            {
                role: "Sekretaris 1", // Jalur Kanan
                name: "Vemm",
                img: "b1.jpeg",
                children: [{ role: "Sekretaris 2", name: "Haqiqi", img: "image.png" }]
            }
        ]
    }]
};

function buildTree(node) {
    let html = `<li>
        <div class="node-content">
            <div class="node-circle">
                ${node.img ? `<img src="${node.img}">` : node.role[0]}
            </div>
            <p class="role">${node.role}</p>
            <p class="name">${node.name}</p>
        </div>`;
    
    if (node.children && node.children.length > 0) {
        html += "<ul>";
        node.children.forEach(child => {
            html += buildTree(child);
        });
        html += "</ul>";
    }
    return html + "</li>";
}

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("treeRoot");
    if (rootElement) {
        rootElement.innerHTML = `<ul>${buildTree(dataStruktur)}</ul>`;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll(".node-content").forEach((el, i) => {
                    setTimeout(() => el.classList.add("appear"), i * 150);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        observer.observe(rootElement);
    }
});


const track = document.getElementById('memberTrack');
const swipeArea = document.getElementById('memberSwipeArea');
let currentIdx = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Contoh Data
const dataMember = [
    { "nama": "ABELINDA SITI AZZAHRA", "absen": "01", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "ACHMAD MAULANA BAIHAQI", "absen": "02", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AHMAD FARDAN PRASETYA HUDI", "absen": "03", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AIDINA REGINA PRATITA", "absen": "04", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AIMADINI IRINE AMANTA", "absen": "05", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AJENG PRINANTA TUNGGA DEWI", "absen": "06", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "ALDAZ ZANITA WINUNAH", "absen": "07", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "ALMIRA DWI FITHRIYAH", "absen": "08", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AMIRA PUTRI JANEETA", "absen": "09", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "ASHILAH ZAHRA SISPRIANO PUTRI", "absen": "10", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AULIA KUNTUM DWI LESTARI", "absen": "11", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "AYUDIANA RAHMA JULIYANTI", "absen": "12", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "CICIM NASKAH PUNGSI NAWANGATI", "absen": "13", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "DESHELVA QUEENRESKI SUWARNO", "absen": "14", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "DEWI KIRANA WULANSARI", "absen": "15", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "ELVARETTA JOLINE SITARESMI PATTIWA", "absen": "16", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "FEBRIA NANDA DAVIN AKMAL", "absen": "17", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "HAFIZA SURURUL ATFA", "absen": "18", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "HIYASATA KUNU AMIRAH AFIFATUL MUBIN", "absen": "19", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "JASMINE UFAIROH", "absen": "20", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "MUHAMMAD BAGAS PUTRASON PRADA", "absen": "21", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "MUHAMMAD UWAISS UNO MALIKI", "absen": "22", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "NADHIIFA NUR 'AQILA ZAIN", "absen": "23", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "NADILA ISHARA PUTRI", "24": "24", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "NAURA GISTA RONA AZZAHRA", "absen": "25", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "NOVIM ADI PRASTYO", "absen": "26", "bio": "ihiiiii", "foto": "image.png" },
    { "nama": "NUR ZAHROTUL HIKMAH", "absen": "27", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "OKTAVIA ANYA AURELA NINGSIH", "absen": "28", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "OLIVIA RIZKY DJAZULI", "absen": "29", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "RACHEL MUTIA", "absen": "30", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "RINI MAILANI PUTRI", "absen": "31", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "SELLY AMANDA NUR HAFIDZAH", "absen": "32", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "SULTAN DZULFIKAR MUHAMMAD", "absen": "33", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "UMAR SAID", "absen": "34", "bio": "Loh onok bio ne emang e?.", "foto": "image.png" },
    { "nama": "VIOLETA APRILIA KOMARUDIN", "absen": "35", "bio": "no bio yet.", "foto": "image.png" },
    { "nama": "WENDI MORENO HALIM", "absen": "36", "bio": "no bio yet.", "foto": "image.png" }
];


function renderMembers() {
    track.innerHTML = dataMember.map((m, index) => `
        <div class="member-card">
            <div class="m-card-visual">
                <img src="${m.foto}" alt="${m.nama}">
            </div>
            <div class="m-card-info">
                <span class="absent">Absen ${m.absen}</span>
                <h3>${m.nama}</h3>
                <p>${m.bio}</p>
            </div>
        </div>
    `).join('');
    updateCarousel();
}

function updateCarousel() {
    const cards = document.querySelectorAll('.member-card');
    const containerWidth = swipeArea.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 15;

    // Hitung posisi agar simetris di tengah
    const offset = (containerWidth / 2) - (cardWidth / 2) - (currentIdx * (cardWidth + gap));
    
    track.style.transform = `translateX(${offset}px)`;
    
    cards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIdx);
    });
}

// --- LOGIKA SWIPE & DRAG ---
function handleStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function handleEnd(e) {
    if (!isDragging) return;
    const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Sensitivitas geser
        if (diff > 0 && currentIdx < dataMember.length - 1) currentIdx++;
        if (diff < 0 && currentIdx > 0) currentIdx--;
    }
    
    isDragging = false;
    updateCarousel();
}

// Listener untuk HP (Touch)
swipeArea.addEventListener('touchstart', handleStart);
swipeArea.addEventListener('touchend', handleEnd);

// Listener untuk Mouse (PC)
swipeArea.addEventListener('mousedown', handleStart);
swipeArea.addEventListener('mouseup', handleEnd);
swipeArea.addEventListener('mouseleave', handleEnd);

// Jalankan awal
renderMembers();
window.addEventListener('resize', updateCarousel);

// --- LOGIKA AUTO SWIPE ---
let autoSwipeTimer = setInterval(nextSlide, 2500); // 1000ms = 1 detik

function nextSlide() {
    if (currentIdx < dataMember.length - 1) {
        currentIdx++;
    } else {
        currentIdx = 0; // Balik lagi ke awal kalau sudah sampai ujung
    }
    updateCarousel();
}

// --- OPTIONAL: Berhenti swipe saat user menyentuh/klik (User Experience) ---
swipeArea.addEventListener('mouseenter', () => {
    clearInterval(autoSwipeTimer); // Berhenti saat mouse di atas carousel
});

swipeArea.addEventListener('mouseleave', () => {
    autoSwipeTimer = setInterval(nextSlide, 2500); // Jalan lagi saat mouse pergi
});

swipeArea.addEventListener('touchstart', () => {
    clearInterval(autoSwipeTimer); // Berhenti saat disentuh di HP
});

swipeArea.addEventListener('touchend', () => {
    autoSwipeTimer = setInterval(nextSlide, 2500); // Jalan lagi setelah dilepas
});
