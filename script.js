// DATABASE KULINER MALANG (LENGKAP DENGAN LINK GOOGLE MAPS LOKASI OUTLET)
let foodData = [
    {
        id: 1,
        title: "Mie Gacoan Cabang Malang Raya 🍜",
        author: "Arema Foodie",
        desc: "Kuliner mi pedas manis & gurih khas Mie Gacoan dengan aneka dimsum renyah.",
        category: "Nasional",
        gmapsUrl: "https://maps.google.com/maps?q=Mie+Gacoan+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://3dmdb.com/previews/13037200.jpg",
        comments: [
            { user: "Siti Foodie", text: "Mie Iblis level 3 favorit banget!" },
            { user: "Budi", text: "Pangsit gorengnya kriuk dan melimpah." }
        ]
    },
    {
        id: 2,
        title: "Ayam Richeese Factory 🍗",
        author: "Richeese Lover",
        desc: "Fire Chicken dengan saus BBQ pedas berlevel plus siraman dip saus keju khas.",
        category: "Nasional",
        gmapsUrl: "https://maps.google.com/maps?q=Richeese+Factory+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://s1-id.alongwalker.co/wp-content/uploads/2024/08/image-menu-richeese-factory-terbaru-2024-lengkap-dengan-harganya-c2149ea27b9c2b61ab42a9d433cbedbd.jpg",
        comments: [
            { user: "Andi", text: "Level 4 selalu bikin ketagihan!" }
        ]
    },
    {
        id: 3,
        title: "D'Kichi Fried Chicken 🍗",
        author: "Arema Foodie",
        desc: "Ayam goreng tepung renyah berharga terjangkau dengan rempah-rempah yang meresap.",
        category: "Nasional",
        gmapsUrl: "https://maps.google.com/maps?q=D'Kichi+Fried+Chicken+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://cms.wadahin.com/uploads/1762317340_9a9e79baa1f0cb04f4ba.jpeg",
        comments: []
    },
    {
        id: 4,
        title: "Rawon Rampal Malang 🍲",
        author: "Arema Foodie",
        desc: "Nasi rawon kuah kluwek hitam otentik legendaris di Malang sejak 1957.",
        category: "tradisional",
        gmapsUrl: "https://maps.google.com/maps?q=Rawon+Rampal+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://media.indozone.id/crop/images/2025/07/03/hbyySwEB63QdgBQYrwufzLnktXNBZHubIARdbr0B.jpg",
        comments: []
    },
    {
        id: 5,
        title: "Pos Ketan Legenda 1967 🍡",
        author: "Budi Santoso",
        desc: "Jajanan ketan tradisional hangat dengan aneka pilihan topping melimpah.",
        category: "streetfood",
        gmapsUrl: "https://maps.google.com/maps?q=Pos+Ketan+Legenda+1967+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://senyumworldhotel.com/wp-content/uploads/2024/09/legendaris-di-batu-gurih-pulen-pos-ketan-legenda-sudah-ada-sejak-1967-9-6-1024x710.jpeg",
        comments: []
    },
    {
        id: 6,
        title: "Es Dawet Tradisional 🥛",
        author: "Siti Foodie",
        desc: "Es dawet beras manis gurih dengan santan kelapa murni dan gula aren manis pas.",
        category: "minuman_tradisional",
        gmapsUrl: "https://maps.google.com/maps?q=Es+Dawet+Khas+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        comments: []
    }
];

let selectedCategory = 'semua';
let currentTab = 'beranda';
let activeModalOutletId = null;
let cameraStream = null;

// User Data
let currentUserFullName = 'Budi Santoso';
let currentUsername = 'budis';
let currentUserEmail = 'budi@gmail.com';
let profileImageSrc = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

// 1. AUTHENTICATION
function toggleAuthMode(mode) {
    document.getElementById('loginCard').style.display = mode === 'register' ? 'none' : 'block';
    document.getElementById('registerCard').style.display = mode === 'register' ? 'block' : 'none';
}

function handleLogin(e) {
    e.preventDefault();
    currentUserFullName = document.getElementById('loginName').value;
    currentUsername = document.getElementById('loginUsername').value;
    currentUserEmail = document.getElementById('loginEmail').value;
    enterDashboard();
}

function handleRegister(e) {
    e.preventDefault();
    currentUserFullName = document.getElementById('regFullName').value;
    currentUsername = document.getElementById('regUsername').value;
    currentUserEmail = document.getElementById('regEmail').value;
    enterDashboard();
}

function enterDashboard() {
    document.getElementById('displayUsername').innerText = currentUserFullName;
    document.getElementById('displayHandle').innerText = `@${currentUsername}`;
    document.getElementById('profileName').innerText = currentUserFullName;

    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('dashboard-page').style.display = 'grid';

    filterData();
}

function handleLogout() {
    document.getElementById('dashboard-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'flex';
}

// 2. NAVIGASI TAB UTAMA
function toggleQuickMenu() {
    const quickMenu = document.getElementById('quickMenu');
    if (!quickMenu) return;
    quickMenu.classList.toggle('open');
}

function closeQuickMenu() {
    const quickMenu = document.getElementById('quickMenu');
    if (quickMenu) quickMenu.classList.remove('open');
}

function switchTab(tabName, element) {
    document.querySelectorAll('.quick-menu-item').forEach(item => {
        item.classList.remove('active');
    });

    if (element && element.classList.contains('quick-menu-item')) {
        element.classList.add('active');
    }

    const mainNav = document.querySelector('.nav-item--main');
    if (mainNav) {
        mainNav.classList.toggle('active', tabName === 'beranda');
    }

    currentTab = tabName;

    document.getElementById('main-feed-section').style.display = tabName === 'beranda' ? 'block' : 'none';
    document.getElementById('chat-section').style.display = tabName === 'pesan' ? 'block' : 'none';
    document.getElementById('notif-section').style.display = tabName === 'notifikasi' ? 'block' : 'none';
    document.getElementById('profile-section').style.display = tabName === 'profil' ? 'block' : 'none';
    document.getElementById('settings-section').style.display = tabName === 'pengaturan' ? 'block' : 'none';

    if (tabName === 'profil') renderUserProfile();
    if (tabName === 'pengaturan') {
        document.getElementById('settingName').value = currentUserFullName;
        document.getElementById('settingEmail').value = currentUserEmail;
    }
}

document.addEventListener('click', function(event) {
    const quickMenu = document.getElementById('quickMenu');
    const menuButton = document.querySelector('.nav-hamburger');

    if (!quickMenu || !menuButton) return;

    const clickedInsideMenu = quickMenu.contains(event.target);
    const clickedHamburger = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedHamburger) {
        closeQuickMenu();
    }
});

// 3. FITUR UNTUK UPLOAD GAMBAR DARI GALERI PADA POSTINGAN
function handlePostGalleryUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('postImage').value = imageUrl;
            
            // Tampilkan Preview
            document.getElementById('postImagePreview').src = imageUrl;
            document.getElementById('postImagePreviewContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// 4. FITUR KAMERA PAMER MAKANAN DARI POSTINGAN
async function startPostCamera() {
    const video = document.getElementById('postCameraVideo');
    const snapBtn = document.getElementById('snapPostBtn');

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        video.srcObject = cameraStream;
        video.style.display = 'block';
        snapBtn.style.display = 'inline-block';
    } catch (err) {
        alert("Tidak dapat mengakses kamera. Pastikan izin kamera telah diperbolehkan di browser kamu.");
    }
}

function takePostSnapshot() {
    const video = document.getElementById('postCameraVideo');
    const canvas = document.getElementById('postCameraCanvas');
    const postImageInput = document.getElementById('postImage');

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImageUrl = canvas.toDataURL('image/png');
    postImageInput.value = capturedImageUrl;

    // Tampilkan Preview
    document.getElementById('postImagePreview').src = capturedImageUrl;
    document.getElementById('postImagePreviewContainer').style.display = 'block';

    stopPostCamera();
    alert("Foto makanan kamu berhasil diambil!");
}

function stopPostCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    document.getElementById('postCameraVideo').style.display = 'none';
    document.getElementById('snapPostBtn').style.display = 'none';
}

function openCreateModal() {
    document.getElementById('createModal').style.display = 'flex';
}

function closeCreateModal() {
    stopPostCamera();
    document.getElementById('postImagePreviewContainer').style.display = 'none';
    closeModal('createModal');
}

// 5. UPLOAD FOTO PROFIL DARI GALERI
function uploadProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImageSrc = e.target.result;
            document.getElementById('profileImageDisplay').src = profileImageSrc;
            document.getElementById('sidebarAvatar').src = profileImageSrc;
            alert("Foto profil berhasil diperbarui!");
        };
        reader.readAsDataURL(file);
    }
}

// 6. RENDER PROFIL
function renderUserProfile() {
    document.getElementById('profileFullName').innerText = currentUserFullName;
    document.getElementById('profileUsername').innerText = `@${currentUsername}`;
    document.getElementById('profileEmail').innerText = currentUserEmail;

    const myPosts = foodData.filter(item => item.author === currentUserFullName);
    document.getElementById('userPostCount').innerText = myPosts.length;

    const container = document.getElementById('userPostsContainer');
    container.innerHTML = '';
    myPosts.forEach(item => {
        container.innerHTML += `
            <div class="food-card">
                <img src="${item.image}" onclick="openDetailModal(${item.id})">
                <div class="food-card-body">
                    <h4 class="food-card-title">${item.title}</h4>
                    <p class="food-card-desc">${item.desc}</p>
                </div>
            </div>
        `;
    });
}

// 7. DETAIL OUTLET, GOOGLE MAPS, & KOMENTAR
function openDetailModal(id) {
    activeModalOutletId = id;
    const item = foodData.find(f => f.id === id);
    if (!item) return;

    document.getElementById('modalImg').src = item.image;
    document.getElementById('modalTitle').innerText = item.title;
    
    // Set Google Maps Link Iframe
    if (item.gmapsUrl) {
        document.getElementById('gmapsIframe').src = item.gmapsUrl;
    }

    renderComments();
    document.getElementById('detailModal').style.display = 'flex';
}

function submitComment() {
    const commentText = document.getElementById('commentInput').value;
    if (!commentText.trim()) return;

    const item = foodData.find(f => f.id === activeModalOutletId);
    if (item) {
        if (!item.comments) item.comments = [];
        item.comments.push({ user: currentUserFullName, text: commentText });
        document.getElementById('commentInput').value = '';
        renderComments();
    }
}

function renderComments() {
    const item = foodData.find(f => f.id === activeModalOutletId);
    const container = document.getElementById('modalCommentsList');
    container.innerHTML = '<h5>Ulasan Komentar:</h5>';

    if (!item.comments || item.comments.length === 0) {
        container.innerHTML += `<p style="font-size:12px; color:var(--text-muted); margin-top:5px;">Belum ada komentar ulasan.</p>`;
        return;
    }

    item.comments.forEach(c => {
        container.innerHTML += `
            <div style="background:#f9fafb; padding:8px; border-radius:6px; margin-top:6px; font-size:12px;">
                <strong>${c.user}:</strong> ${c.text}
            </div>
        `;
    });
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// 8. FILTER & FEED
function selectCategory(el, cat) {
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    selectedCategory = cat;
    filterData();
}

function filterData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = foodData.filter(item => {
        const matchCat = selectedCategory === 'semua' || item.category === selectedCategory;
        const matchSearch = item.title.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword);
        return matchCat && matchSearch;
    });

    renderFeed(filtered);
}

function renderFeed(items) {
    const container = document.getElementById('feedContainer');
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
        container.innerHTML += `
            <div class="food-card">
                <img src="${item.image}" onclick="openDetailModal(${item.id})">
                <div class="food-card-body">
                    <h4 class="food-card-title" onclick="openDetailModal(${item.id})">${item.title}</h4>
                    <p class="food-card-desc">${item.desc}</p>
                    <div class="food-card-footer">
                        <span style="font-size:11px; color:var(--primary); cursor:pointer;" onclick="openDetailModal(${item.id})">
                            💬 Komentar (${item.comments ? item.comments.length : 0})
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
}

function handleCreatePost(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const image = document.getElementById('postImage').value;
    const desc = document.getElementById('postDesc').value;

    foodData.unshift({
        id: Date.now(),
        title: title,
        author: currentUserFullName,
        category: category,
        gmapsUrl: `https://maps.google.com/maps?q=${encodeURIComponent(title)}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
        image: image,
        desc: desc,
        comments: []
    });

    closeCreateModal();
    filterData();
}

function saveSettings(e) {
    e.preventDefault();
    currentUserFullName = document.getElementById('settingName').value;
    currentUserEmail = document.getElementById('settingEmail').value;
    alert("Pengaturan akun berhasil disimpan!");
    enterDashboard();
}