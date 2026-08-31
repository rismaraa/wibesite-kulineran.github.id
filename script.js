// DATABASE KULINER MALANG (LENGKAP DENGAN GOOGLE MAPS)
let foodData = [
    {
        id: 1,
        title: "Mie Gacoan Malang 🍜",
        author: "foodie",
        desc: "Kuliner mi pedas manis & gurih khas Mie Gacoan dengan aneka dimsum renyah.",
        category: "internasional",
        gmapsUrl: "https://maps.google.com/maps?q=Mie+Gacoan+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        comments: [
            { user: "Siti Foodie", text: "Mie Iblis level 3 favorit banget!" },
            { user: "nisa", text: "Pangsit gorengnya kriuk dan melimpah." }
        ]
    },
    {
        id: 2,
        title: "Ayam Richeese Factory 🍗",
        author: "Richeese Lover",
        desc: "Fire Chicken dengan saus BBQ pedas berlevel plus siraman dip saus keju khas.",
        category: "internasional",
        gmapsUrl: "https://maps.google.com/maps?q=Richeese+Factory+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
        comments: [
            { user: "Andi", text: "Level 4 selalu bikin ketagihan!" }
        ]
    },
    {
        id: 3,
        title: "Rawon Rampal Malang 🍲",
        author: "foodie",
        desc: "Nasi rawon kuah kluwek hitam otentik legendaris di Malang sejak 1957.",
        category: "tradisional",
        gmapsUrl: "https://maps.google.com/maps?q=Rawon+Rampal+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        comments: []
    },
    {
        id: 4,
        title: "Pos Ketan Legenda 1967 🍡",
        author: "foodie",
        desc: "Jajanan ketan tradisional hangat dengan aneka pilihan topping melimpah.",
        category: "streetfood",
        gmapsUrl: "https://maps.google.com/maps?q=Pos+Ketan+Legenda+1967+Malang&t=&z=13&ie=UTF8&iwloc=&output=embed",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
        comments: []
    }
];

let selectedCategory = 'semua';
let activeModalOutletId = null;
let cameraStream = null;

let currentUserFullName = 'Dewi Sartika';
let currentUsername = 'dewis';
let currentUserEmail = 'dewi@gmail.com';
let profileImageSrc = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

// TOGGLE SIDEBAR MOBILE (ANIMASI BERGESER SLIDE)
function toggleSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function closeSidebarMobile() {
    if (window.innerWidth <= 1023) {
        const sidebar = document.getElementById('mainSidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
}

// AUTHENTICATION
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

// NAVIGASI TAB
function switchTab(tabName, element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');

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

// FITUR UPLOAD GAMBAR DARI GALERI UNTUK POSTINGAN
function handlePostGalleryUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('postImage').value = imageUrl;
            document.getElementById('postImagePreview').src = imageUrl;
            document.getElementById('postImagePreviewContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// FITUR KAMERA
async function startPostCamera() {
    const video = document.getElementById('postCameraVideo');
    const snapBtn = document.getElementById('snapPostBtn');

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        video.srcObject = cameraStream;
        video.style.display = 'block';
        snapBtn.style.display = 'inline-block';
    } catch (err) {
        alert("Tidak dapat mengakses kamera. Pastikan izin kamera diperbolehkan.");
    }
}

function takePostSnapshot() {
    const video = document.getElementById('postCameraVideo');
    const canvas = document.getElementById('postCameraCanvas');

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImageUrl = canvas.toDataURL('image/png');
    document.getElementById('postImage').value = capturedImageUrl;
    document.getElementById('postImagePreview').src = capturedImageUrl;
    document.getElementById('postImagePreviewContainer').style.display = 'block';

    stopPostCamera();
    alert("Foto makanan berhasil diambil!");
}

function stopPostCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    document.getElementById('postCameraVideo').style.display = 'none';
    document.getElementById('snapPostBtn').style.display = 'none';
}

function openCreateModal() { document.getElementById('createModal').style.display = 'flex'; }
function closeCreateModal() {
    stopPostCamera();
    document.getElementById('postImagePreviewContainer').style.display = 'none';
    closeModal('createModal');
}

// UPLOAD FOTO PROFIL DARI GALERI
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

// DETAIL OUTLET & GOOGLE MAPS
function openDetailModal(id) {
    activeModalOutletId = id;
    const item = foodData.find(f => f.id === id);
    if (!item) return;

    document.getElementById('modalImg').src = item.image;
    document.getElementById('modalTitle').innerText = item.title;
    
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

// FILTER & FEED
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
                    <div style="margin-top:auto; padding-top:10px;">
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

function saveSettings(e) {
    e.preventDefault();
    currentUserFullName = document.getElementById('settingName').value;
    currentUserEmail = document.getElementById('settingEmail').value;
    alert("Pengaturan akun berhasil disimpan!");
    enterDashboard();
}