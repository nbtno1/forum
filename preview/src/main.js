import './style.css';

const PRESETS = {
  default: {
    name: 'Discourse Classic',
    primary: '#222222',
    secondary: '#ffffff',
    tertiary: '#0088cc',
    quaternary: '#e45735',
    header_background: '#ffffff',
    header_primary: '#333333',
    card_bg: '#ffffff',
    radius: '8px',
    font: "'Inter', sans-serif"
  },
  horizon: {
    name: 'Horizon Indigo',
    primary: '#1e1b4b',
    secondary: '#f8fafc',
    tertiary: '#6366f1',
    quaternary: '#ec4899',
    header_background: '#ffffff',
    header_primary: '#1e1b4b',
    card_bg: '#ffffff',
    radius: '12px',
    font: "'Outfit', sans-serif"
  },
  cyberpunk: {
    name: 'Midnight Neon',
    primary: '#f1f5f9',
    secondary: '#090d16',
    tertiary: '#06b6d4',
    quaternary: '#f43f5e',
    header_background: '#0f172a',
    header_primary: '#f8fafc',
    card_bg: '#131b2e',
    radius: '6px',
    font: "'JetBrains Mono', monospace"
  },
  emerald: {
    name: 'Emerald Forest',
    primary: '#132a13',
    secondary: '#f7fdf9',
    tertiary: '#10b981',
    quaternary: '#f59e0b',
    header_background: '#ffffff',
    header_primary: '#132a13',
    card_bg: '#ffffff',
    radius: '10px',
    font: "'Inter', sans-serif"
  }
};

let currentTheme = { ...PRESETS.horizon };
let activeTab = 'latest';
let activeCategory = 'all';
let searchQuery = '';

const TOPICS = [
  {
    id: 1,
    title: "Chào mừng bạn đến với diễn đàn Discourse tùy biến!",
    category: "Thông báo",
    catColor: "#e45735",
    tags: ["discourse", "welcome"],
    pinned: true,
    author: "Admin",
    replies: 18,
    views: "2.4k",
    likes: 42,
    time: "3 giờ trước",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 2,
    title: "Hướng dẫn tùy biến màu sắc và Header cho Theme Horizon",
    category: "Thiết kế & Themes",
    catColor: "#6366f1",
    tags: ["ui-theme", "scss"],
    pinned: false,
    author: "Designer",
    replies: 7,
    views: "890",
    likes: 19,
    time: "5 giờ trước",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 3,
    title: "Tổng hợp các plugin outlets quan trọng trên giao diện Discourse",
    category: "Lập trình",
    catColor: "#10b981",
    tags: ["ember", "javascript"],
    pinned: false,
    author: "DevPro",
    replies: 12,
    views: "1.2k",
    likes: 31,
    time: "1 ngày trước",
    avatars: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 4,
    title: "Thảo luận: Giao diện dạng card (Horizon) hay dạng bảng truyền thống?",
    category: "Góp ý",
    catColor: "#f59e0b",
    tags: ["ux", "discussion"],
    pinned: false,
    author: "Alex",
    replies: 34,
    views: "3.8k",
    likes: 56,
    time: "2 ngày trước",
    avatars: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&auto=format&fit=crop&q=60"
    ]
  }
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--tertiary', theme.tertiary);
  root.style.setProperty('--quaternary', theme.quaternary);
  root.style.setProperty('--header_background', theme.header_background);
  root.style.setProperty('--header_primary', theme.header_primary);
  root.style.setProperty('--card-bg', theme.card_bg);
  root.style.setProperty('--border-radius', theme.radius);
  root.style.setProperty('--font-family', theme.font);

  // Sync inputs
  const primaryInput = document.getElementById('input-primary');
  const tertiaryInput = document.getElementById('input-tertiary');
  const headerBgInput = document.getElementById('input-header-bg');
  const cardBgInput = document.getElementById('input-card-bg');
  const scssBox = document.getElementById('scss-preview');

  if (primaryInput) primaryInput.value = theme.primary;
  if (tertiaryInput) tertiaryInput.value = theme.tertiary;
  if (headerBgInput) headerBgInput.value = theme.header_background;
  if (cardBgInput) cardBgInput.value = theme.card_bg;

  if (scssBox) {
    scssBox.textContent = `// Discourse Custom SCSS Variables
$primary: ${theme.primary};
$secondary: ${theme.secondary};
$tertiary: ${theme.tertiary};
$quaternary: ${theme.quaternary};
$header_background: ${theme.header_background};
$header_primary: ${theme.header_primary};

// Horizon Theme Overrides
.d-header {
  background: $header_background;
}
.topic-card {
  border-radius: ${theme.radius};
}`;
  }
}

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="d-app">
      <!-- Header -->
      <header class="d-header">
        <div class="d-header-left">
          <a href="#" class="d-logo">
            <div class="d-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <span>Discourse</span>
          </a>
          <div class="d-header-search">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="global-search" placeholder="Tìm kiếm bài viết, thẻ, danh mục..." value="${searchQuery}"/>
            <span class="kbd-hint">/</span>
          </div>
        </div>
        <div class="d-header-right">
          <button class="btn-theme-customizer" id="btn-toggle-customizer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Tùy biến Giao diện
          </button>
          <button class="btn-icon" id="btn-toggle-darkmode" title="Đổi Chế độ Sáng/Tối">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" class="d-avatar" alt="User avatar" />
        </div>
      </header>

      <!-- Main Body -->
      <div class="d-body-wrapper">
        <!-- Sidebar -->
        <aside class="d-sidebar">
          <button class="btn-new-topic" id="btn-open-composer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tạo chủ đề mới
          </button>

          <div class="sidebar-section">
            <div class="sidebar-title">Menu chính</div>
            <a class="sidebar-link active" data-category="all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Mới nhất
            </a>
            <a class="sidebar-link" data-tab="top">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Nổi bật (Top)
            </a>
            <a class="sidebar-link" data-tab="bookmarks">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Đã lưu
            </a>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-title">Danh mục</div>
            <a class="sidebar-link" data-category="Thông báo">
              <span class="category-dot" style="background:#e45735"></span>
              Thông báo
            </a>
            <a class="sidebar-link" data-category="Thiết kế & Themes">
              <span class="category-dot" style="background:#6366f1"></span>
              Thiết kế & Themes
            </a>
            <a class="sidebar-link" data-category="Lập trình">
              <span class="category-dot" style="background:#10b981"></span>
              Lập trình
            </a>
            <a class="sidebar-link" data-category="Góp ý">
              <span class="category-dot" style="background:#f59e0b"></span>
              Góp ý
            </a>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="d-main-content">
          <div class="d-nav-pills">
            <ul class="nav-pills-list">
              <li><button class="nav-pill-btn ${activeTab === 'latest' ? 'active' : ''}" data-tab="latest">Mới nhất</button></li>
              <li><button class="nav-pill-btn ${activeTab === 'top' ? 'active' : ''}" data-tab="top">Nổi bật</button></li>
              <li><button class="nav-pill-btn ${activeTab === 'unread' ? 'active' : ''}" data-tab="unread">Chưa đọc</button></li>
              <li><button class="nav-pill-btn ${activeTab === 'categories' ? 'active' : ''}" data-tab="categories">Danh mục</button></li>
            </ul>
          </div>

          <div class="topic-list" id="topic-container">
            ${renderTopicList()}
          </div>
        </main>
      </div>

      <!-- Drawer: Live Customizer -->
      <div class="customizer-drawer" id="customizer-drawer">
        <div class="drawer-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            Bộ Tùy Biến Giao Diện
          </h3>
          <button class="btn-icon" id="btn-close-customizer">&times;</button>
        </div>
        <div class="drawer-body">
          <div class="control-group">
            <label class="control-label">Theme Mẫu Sẵn Có</label>
            <div class="preset-grid">
              ${Object.entries(PRESETS).map(([key, p]) => `
                <button class="preset-btn" data-preset="${key}">
                  <span class="preset-swatch" style="background: linear-gradient(135deg, ${p.tertiary}, ${p.quaternary})"></span>
                  ${p.name}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Màu Chủ Đạo (Tertiary / Link / Button)</label>
            <div class="color-picker-row">
              <input type="color" class="color-input" id="input-tertiary" value="${currentTheme.tertiary}" />
              <input type="text" class="color-hex" id="hex-tertiary" value="${currentTheme.tertiary}" readonly />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Màu Nền Header (Header Background)</label>
            <div class="color-picker-row">
              <input type="color" class="color-input" id="input-header-bg" value="${currentTheme.header_background}" />
              <input type="text" class="color-hex" id="hex-header-bg" value="${currentTheme.header_background}" readonly />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Màu Nền Thẻ Bài Viết (Card Background)</label>
            <div class="color-picker-row">
              <input type="color" class="color-input" id="input-card-bg" value="${currentTheme.card_bg}" />
              <input type="text" class="color-hex" id="hex-card-bg" value="${currentTheme.card_bg}" readonly />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Màu Chữ Chính (Primary Text)</label>
            <div class="color-picker-row">
              <input type="color" class="color-input" id="input-primary" value="${currentTheme.primary}" />
              <input type="text" class="color-hex" id="hex-primary" value="${currentTheme.primary}" readonly />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Độ Bo Góc Thẻ (Border Radius): <span id="radius-val">${currentTheme.radius}</span></label>
            <input type="range" id="input-radius" min="0" max="24" value="${parseInt(currentTheme.radius)}" />
          </div>

          <div class="control-group">
            <label class="control-label">Discourse SCSS Export</label>
            <div class="scss-export-box" id="scss-preview"></div>
          </div>

          <button class="btn-export" id="btn-copy-scss">Sao chép mã SCSS tùy biến</button>
        </div>
      </div>

      <!-- Composer Modal -->
      <div class="d-modal-backdrop" id="composer-modal">
        <div class="d-modal">
          <div class="modal-header">
            <h4>Tạo chủ đề mới trên diễn đàn</h4>
            <button class="btn-icon" id="btn-close-composer">&times;</button>
          </div>
          <div class="modal-body">
            <input type="text" class="input-topic-title" id="new-topic-title" placeholder="Tiêu đề chủ đề của bạn..." />
            <select class="input-topic-title" id="new-topic-cat">
              <option value="Thông báo">Thông báo</option>
              <option value="Thiết kế & Themes" selected>Thiết kế & Themes</option>
              <option value="Lập trình">Lập trình</option>
              <option value="Góp ý">Góp ý</option>
            </select>
            <textarea class="input-topic-body" id="new-topic-content" placeholder="Nội dung bài viết (hỗ trợ Markdown)..."></textarea>
            <button class="btn-new-topic" id="btn-submit-topic">Đăng bài viết</button>
          </div>
        </div>
      </div>
    </div>
  `;

  attachEvents();
  applyTheme(currentTheme);
}

function renderTopicList() {
  const filtered = TOPICS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    return `<div style="text-align:center; padding: 40px; color: var(--text-muted);">Không tìm thấy chủ đề phù hợp</div>`;
  }

  return filtered.map(t => `
    <div class="topic-card">
      <div class="topic-main">
        <div class="topic-title-row">
          ${t.pinned ? '<span class="topic-pin" title="Ghim">📌</span>' : ''}
          <a class="topic-title" href="#">${t.title}</a>
        </div>
        <div class="topic-meta">
          <span class="badge-category">
            <span class="category-dot" style="background:${t.catColor}"></span>
            ${t.category}
          </span>
          ${t.tags.map(tag => `<span class="discourse-tag">#${tag}</span>`).join('')}
          <span style="color: var(--text-muted); font-size: 0.75rem;">• ${t.time}</span>
        </div>
      </div>
      <div class="topic-stats">
        <div class="avatar-group">
          ${t.avatars.map(a => `<img src="${a}" alt="Participant" />`).join('')}
        </div>
        <div class="stat-item">
          <span class="stat-num">${t.replies}</span>
          <span class="stat-label">Trả lời</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">${t.views}</span>
          <span class="stat-label">Lượt xem</span>
        </div>
      </div>
    </div>
  `).join('');
}

function attachEvents() {
  const drawer = document.getElementById('customizer-drawer');
  const btnToggleDrawer = document.getElementById('btn-toggle-customizer');
  const btnCloseDrawer = document.getElementById('btn-close-customizer');
  const btnDarkMode = document.getElementById('btn-toggle-darkmode');
  const composer = document.getElementById('composer-modal');
  const btnOpenComposer = document.getElementById('btn-open-composer');
  const btnCloseComposer = document.getElementById('btn-close-composer');
  const btnSubmitTopic = document.getElementById('btn-submit-topic');
  const searchInput = document.getElementById('global-search');

  btnToggleDrawer.onclick = () => drawer.classList.toggle('open');
  btnCloseDrawer.onclick = () => drawer.classList.remove('open');

  btnDarkMode.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  btnOpenComposer.onclick = () => composer.classList.add('open');
  btnCloseComposer.onclick = () => composer.classList.remove('open');

  btnSubmitTopic.onclick = () => {
    const titleInput = document.getElementById('new-topic-title');
    const catInput = document.getElementById('new-topic-cat');
    if (!titleInput.value.trim()) return alert('Vui lòng nhập tiêu đề!');
    
    TOPICS.unshift({
      id: Date.now(),
      title: titleInput.value.trim(),
      category: catInput.value,
      catColor: "#6366f1",
      tags: ["new"],
      pinned: false,
      author: "Bạn",
      replies: 0,
      views: "1",
      likes: 0,
      time: "Vừa xong",
      avatars: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=60"]
    });
    composer.classList.remove('open');
    titleInput.value = '';
    document.getElementById('topic-container').innerHTML = renderTopicList();
  };

  searchInput.oninput = (e) => {
    searchQuery = e.target.value;
    document.getElementById('topic-container').innerHTML = renderTopicList();
  };

  // Nav pills
  document.querySelectorAll('.nav-pill-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('.nav-pill-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeTab = e.target.dataset.tab;
    };
  });

  // Sidebar category filter
  document.querySelectorAll('.sidebar-link[data-category]').forEach(link => {
    link.onclick = (e) => {
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeCategory = link.dataset.category;
      document.getElementById('topic-container').innerHTML = renderTopicList();
    };
  });

  // Customizer inputs
  document.getElementById('input-tertiary').oninput = (e) => {
    currentTheme.tertiary = e.target.value;
    document.getElementById('hex-tertiary').value = e.target.value;
    applyTheme(currentTheme);
  };

  document.getElementById('input-header-bg').oninput = (e) => {
    currentTheme.header_background = e.target.value;
    document.getElementById('hex-header-bg').value = e.target.value;
    applyTheme(currentTheme);
  };

  document.getElementById('input-card-bg').oninput = (e) => {
    currentTheme.card_bg = e.target.value;
    document.getElementById('hex-card-bg').value = e.target.value;
    applyTheme(currentTheme);
  };

  document.getElementById('input-primary').oninput = (e) => {
    currentTheme.primary = e.target.value;
    document.getElementById('hex-primary').value = e.target.value;
    applyTheme(currentTheme);
  };

  document.getElementById('input-radius').oninput = (e) => {
    currentTheme.radius = `${e.target.value}px`;
    document.getElementById('radius-val').textContent = currentTheme.radius;
    applyTheme(currentTheme);
  };

  // Presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.onclick = () => {
      const pKey = btn.dataset.preset;
      if (PRESETS[pKey]) {
        currentTheme = { ...PRESETS[pKey] };
        applyTheme(currentTheme);
      }
    };
  });

  document.getElementById('btn-copy-scss').onclick = () => {
    const scss = document.getElementById('scss-preview').textContent;
    navigator.clipboard.writeText(scss).then(() => {
      alert('Đã sao chép mã SCSS tùy biến vào bộ nhớ tạm!');
    });
  };
}

renderApp();
