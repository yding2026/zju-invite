/* 浙大一日游邀请函 · 交互逻辑 */

// 2026：10/12 周一 → 18日/日…；11/1 周日
const DATES = [
  { id: "10-18", label: "18", week: "周日", month: "10月", note: "" },
  { id: "10-23", label: "23", week: "周五", month: "10月", note: "" },
  { id: "10-25", label: "25", week: "周日", month: "10月", note: "" },
  { id: "10-30", label: "30", week: "周五", month: "10月", note: "" },
  { id: "10-31", label: "31", week: "周六", month: "10月", note: "" },
  { id: "11-01", label: "1", week: "周日", month: "11月", note: "已确认有空" },
  {
    id: "other",
    label: "？",
    week: "待定",
    month: "其他",
    note: "想约别的日子，问侄女",
  },
];

const PRAISE = [
  "俞女士好眼光！",
  "这个选择太懂了～",
  "品味在线，佩服佩服",
  "一眼就挑到精华区",
  "安排得明明白白，优雅",
  "不愧是俞女士，点到心巴上",
];

// 午饭 / 晚饭完全相同；下午茶不含银泉
const RESTAURANTS = [
  {
    id: "qiushi",
    name: "潘方仁求实馆",
    short: "求实馆",
    desc: "新中式庭院 · 内部休闲风。又好吃又出片，下午茶与正餐都很合适。",
    tone: "sage",
    stars: 5,
    meals: ["lunch", "dinner", "tea"],
    badges: ["好吃", "拍照"],
    tags: ["庭院", "休闲"],
  },
  {
    id: "yinquan",
    name: "银泉二楼速选区",
    short: "银泉",
    desc: "甜品大宝库，还有美味烤鸭卷——午饭、晚饭加餐都友好（下午茶不安排这家）。",
    tone: "blush",
    stars: 5,
    meals: ["lunch", "dinner"],
    badges: ["好吃"],
    tags: ["甜品", "烤鸭卷"],
  },
  {
    id: "minzu",
    name: "民族餐厅",
    short: "民族",
    desc: "大学朴素食堂风，常遇外国同学。手抓饭很香。",
    tone: "amber",
    stars: 4,
    meals: ["lunch", "dinner", "tea"],
    badges: ["好吃"],
    tags: ["手抓饭", "国际范"],
  },
  {
    id: "xiaolehui",
    name: "小乐惠餐厅",
    short: "小乐惠",
    desc: "西北菜，酸辣口，相当于校外点菜饭店的体验。",
    tone: "rust",
    stars: 3,
    meals: ["lunch", "dinner", "tea"],
    badges: ["好吃"],
    tags: ["西北菜", "酸辣"],
  },
  {
    id: "dacanting",
    name: "大食堂三楼",
    short: "大食堂",
    desc: "浙江菜主场：鱼鲜、优雅烤鸭。",
    tone: "navy",
    stars: 0,
    meals: ["lunch", "dinner", "tea"],
    badges: ["好吃"],
    tags: ["浙菜", "烤鸭"],
  },
  {
    id: "maxway",
    name: "麦斯威咖啡厅",
    short: "麦斯威",
    desc: "有浙大校徽甜点的咖啡厅，适合坐坐聊聊天，甜点也能出片。",
    tone: "blue",
    stars: 0,
    // 三餐同一套主菜单；麦斯威也进三餐，保证午饭/下午茶/晚饭列表一致（仅银泉不进下午茶）
    meals: ["lunch", "dinner", "tea"],
    badges: ["好吃", "拍照"],
    tags: ["咖啡", "校徽甜点"],
  },
];

/** 三餐可见店名（调试/自检用） */
function mealMenu(meal) {
  return RESTAURANTS.filter((r) => r.meals.includes(meal)).map((r) => r.name);
}

const PLAY_PLACES = [
  {
    id: "souvenir",
    name: "纪念品店",
    short: "纪念品",
    desc: "衣服、文具、挂件，带一件浙大气息回家。",
    tone: "navy",
    badges: [],
    tags: ["伴手礼"],
  },
  {
    id: "library",
    name: "图书馆",
    short: "图书馆",
    desc: "只有像姑姑姑父小宝这样的学生家属可进哦～其他游客不可进。小宝或许进不去，但夜景门口拍照超出片。",
    tone: "sage",
    img: "assets/photo-library.jpg",
    badges: ["拍照"],
    tags: ["夜景", "家属可进"],
  },
  {
    id: "lake",
    name: "启真湖 + 月牙楼",
    short: "启真湖",
    desc: "湖光楼影，黑天鹅与草坪；月牙楼旁还可与竺可桢雕像合影。",
    tone: "lake",
    badges: ["拍照"],
    tags: ["湖景", "雕像"],
  },
  {
    id: "stars",
    name: "灿若星辰灯",
    short: "灿若星辰",
    desc: "月牙楼旁夜景装置，星星灯球高高亮着，拍照很有仪式感。",
    tone: "blue",
    img: "assets/photo-stars.jpg",
    badges: ["拍照"],
    tags: ["夜景", "月牙楼旁"],
  },
  {
    id: "qiushi-hall",
    name: "求是大讲堂",
    short: "大讲堂",
    desc: "紫金港地标，飞檐翘角，夜景金光更震撼——打卡拍照首选。",
    tone: "amber",
    img: "assets/photo-qiushi-hall.jpg",
    badges: ["拍照"],
    tags: ["地标", "夜景"],
  },
  {
    id: "lover-slope",
    name: "情人坡大草坪",
    short: "情人坡",
    desc: "开阔大草坪，晴天光线温柔，随手拍都出圈。",
    tone: "sage",
    badges: ["拍照"],
    tags: ["晴天出片", "草坪"],
  },
  {
    id: "south-gate",
    name: "南大门",
    short: "南大门",
    desc: "主校门最气派，校门草坪与余杭塘河对岸全景都适合开场打卡。",
    tone: "navy",
    badges: ["拍照"],
    tags: ["校门", "开场机位"],
  },
  {
    id: "nanhua",
    name: "南华园",
    short: "南华园",
    desc: "迁建入校的明末民居园林，亭廊池水、清幽好逛，游客相对少。",
    tone: "sage",
    badges: ["拍照"],
    tags: ["园林", "清幽"],
  },
  {
    id: "museum",
    name: "艺术与考古博物馆",
    short: "艺博馆",
    desc: "校内国家一级博物馆，展览品质高；周二至周日开放，周一闭馆，建议单独预约。",
    tone: "blush",
    badges: [],
    tags: ["展览", "需预约"],
  },
  {
    id: "anzhong",
    name: "安中大楼",
    short: "安中楼",
    desc: "建工学院标志建筑，砖红色立面在晨昏光线里很有欧式街景感。",
    tone: "rust",
    badges: ["拍照"],
    tags: ["建筑", "晨昏"],
  },
];

function praise(name) {
  const line = PRAISE[Math.floor(Math.random() * PRAISE.length)];
  showCelebrateModal({
    emoji: "✨👏",
    title: line,
    body: `「${name}」入选日程！俞女士这一选，品味直接拉满～`,
  });
}

/** 与满 3 地点彩蛋同一套弹窗 + 撒花 */
function showCelebrateModal({ emoji, title, body }) {
  burstConfetti();
  const modal = document.getElementById("eggModal");
  document.getElementById("eggEmoji").textContent = emoji;
  document.getElementById("eggTitle").textContent = title;
  document.getElementById("eggBody").textContent = body;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("eggClose").onclick = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  };
}

function badgeHtml(badges = []) {
  return badges
    .map((b) => {
      const cls = b === "好吃" ? "pill--food" : b === "拍照" ? "pill--photo" : "pill--soft";
      return `<span class="pill ${cls}">${b}</span>`;
    })
    .join("");
}

const MEAL_LABEL = {
  lunch: "午饭",
  tea: "下午茶",
  dinner: "晚饭",
};

const state = {
  dateId: null,
  meals: {
    // 默认先不选「要不要吃」，引导先开开关再点餐厅
    lunch: { want: false, placeId: null },
    tea: { want: false, placeId: null },
    dinner: { want: false, placeId: null },
  },
  playIds: [],
  eggShown: false,
};

document.addEventListener("DOMContentLoaded", () => {
  spawnLeaves();
  renderDates();
  renderFoodGrids();
  renderPlayPool();
  bindMealToggles();
  bindDropzone();
  bindFinale();
  restoreState();
  refreshSchedule();
  // 备注实时记住
  document.getElementById("extraNotes").addEventListener("input", persistState);
  document.getElementById("arriveTime").addEventListener("change", persistState);
  document.getElementById("leaveTime").addEventListener("change", persistState);
});

const STORAGE_KEY = "zju-invite-draft-v3";

function persistState() {
  const payload = {
    dateId: state.dateId,
    meals: state.meals,
    playIds: state.playIds,
    eggShown: state.eggShown,
    arrive: document.getElementById("arriveTime").value,
    leave: document.getElementById("leaveTime").value,
    notes: document.getElementById("extraNotes").value,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (_) {
    /* 隐私模式忽略 */
  }
}

function restoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.dateId) {
      state.dateId = data.dateId;
      document.querySelectorAll(".date-card").forEach((c) => {
        const on = c.dataset.id === data.dateId;
        c.classList.toggle("is-selected", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
      });
    }
    if (data.meals) {
      state.meals = data.meals;
      ["lunch", "tea", "dinner"].forEach((meal) => {
        const map = { lunch: "wantLunch", tea: "wantTea", dinner: "wantDinner" };
        const input = document.getElementById(map[meal]);
        input.checked = !!state.meals[meal].want;
        document
          .querySelector(`.meal-block[data-meal="${meal}"]`)
          .classList.toggle("is-off", !input.checked);
        syncFoodSelection(meal);
      });
    }
    if (Array.isArray(data.playIds)) state.playIds = data.playIds;
    if (data.eggShown) state.eggShown = true;
    if (data.arrive) document.getElementById("arriveTime").value = data.arrive;
    if (data.leave) document.getElementById("leaveTime").value = data.leave;
    if (data.notes) document.getElementById("extraNotes").value = data.notes;
  } catch (_) {
    /* ignore */
  }
}

function spawnLeaves() {
  const wrap = document.querySelector(".leaves");
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("span");
    el.className = "leaf";
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${8 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 6}s`;
    el.style.opacity = String(0.25 + Math.random() * 0.35);
    el.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
    wrap.appendChild(el);
  }
}

function swatch(tone, shortName, img) {
  if (img) {
    return `<div class="swatch swatch--photo" aria-hidden="true"><img src="${img}" alt="" /></div>`;
  }
  return `<div class="swatch swatch--${tone}" aria-hidden="true"><span>${shortName}</span></div>`;
}

/* ---------- 日期 ---------- */
function renderDates() {
  const grid = document.getElementById("dateGrid");
  grid.innerHTML = DATES.map(
    (d) => `
    <button type="button" class="date-card" role="option" data-id="${d.id}" aria-selected="false">
      <div class="date-card__day">${d.month}${d.label}</div>
      <div class="date-card__week">${d.week}</div>
      ${d.note ? `<span class="date-card__tag">${d.note}</span>` : ""}
    </button>`
  ).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".date-card");
    if (!card) return;
    state.dateId = card.dataset.id;
    grid.querySelectorAll(".date-card").forEach((c) => {
      const on = c === card;
      c.classList.toggle("is-selected", on);
      c.setAttribute("aria-selected", on ? "true" : "false");
    });
    persistState();
    showToast(`已选 ${formatDate(state.dateId)}，时间还可以再调～`);
  });
}

function formatDate(id) {
  const d = DATES.find((x) => x.id === id);
  if (!d) return "日期待定";
  if (d.id === "other") return "其他日期（待与侄女确认）";
  return `2026年${d.month}${d.label}日（${d.week}）`;
}

function starsHtml(n) {
  if (!n) return "";
  return `<div class="stars" aria-label="${n}星推荐">${"★".repeat(n)}${"☆".repeat(5 - n)}</div>`;
}

/* ---------- 吃喝 ---------- */
function renderFoodGrids() {
  ["lunch", "tea", "dinner"].forEach((meal) => {
    const grid = document.getElementById(`${meal}Grid`);
    const list = RESTAURANTS.filter((r) => r.meals.includes(meal));
    grid.innerHTML = list
      .map(
        (r) => `
      <button type="button" class="food-card" data-meal="${meal}" data-id="${r.id}">
        <span class="food-card__check">✓</span>
        ${swatch(r.tone, r.short)}
        <div class="food-card__body">
          <div class="food-card__badges">${badgeHtml(r.badges)}</div>
          <p class="food-card__name">${r.name}</p>
          ${starsHtml(r.stars)}
          <p class="food-card__desc">${r.desc}</p>
          <div class="food-card__tags">${r.tags
            .map((t) => `<span class="tag">${t}</span>`)
            .join("")}</div>
        </div>
      </button>`
      )
      .join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".food-card");
      if (!card || !state.meals[meal].want) return;
      const id = card.dataset.id;
      const selected = state.meals[meal].placeId !== id;
      state.meals[meal].placeId = selected ? id : null;
      syncFoodSelection(meal);
      refreshSchedule();
      persistState();
      if (selected) {
        const r = RESTAURANTS.find((x) => x.id === id);
        praise(r.name);
      }
    });
  });
}

function syncFoodSelection(meal) {
  const grid = document.getElementById(`${meal}Grid`);
  grid.querySelectorAll(".food-card").forEach((c) => {
    c.classList.toggle("is-selected", c.dataset.id === state.meals[meal].placeId);
  });
}

function bindMealToggles() {
  const map = {
    wantLunch: "lunch",
    wantTea: "tea",
    wantDinner: "dinner",
  };
  Object.entries(map).forEach(([inputId, meal]) => {
    const input = document.getElementById(inputId);
    const block = document.querySelector(`.meal-block[data-meal="${meal}"]`);
    const apply = () => {
      state.meals[meal].want = input.checked;
      block.classList.toggle("is-off", !input.checked);
      if (!input.checked) {
        state.meals[meal].placeId = null;
        syncFoodSelection(meal);
      }
      refreshSchedule();
      persistState();
    };
    input.addEventListener("change", apply);
    apply();
  });
}

/* ---------- 玩乐拖拽 ---------- */
function renderPlayPool() {
  const pool = document.getElementById("playPool");
  pool.innerHTML = PLAY_PLACES.map(
    (p) => `
    <div class="play-card" draggable="true" data-id="${p.id}" id="pool-${p.id}">
      ${swatch(p.tone, p.short, p.img)}
      <div>
        <div class="food-card__badges">${badgeHtml(p.badges)}</div>
        <p class="play-card__name">${p.name}</p>
        <p class="play-card__desc">${p.desc}</p>
        <div class="food-card__tags">${(p.tags || [])
          .map((t) => `<span class="tag">${t}</span>`)
          .join("")}</div>
      </div>
      <button type="button" class="btn btn--sm btn--ghost play-add" data-id="${p.id}">加入</button>
    </div>`
  ).join("");

  pool.querySelectorAll(".play-card").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      // 点按钮时不触发拖拽
      if (e.target.closest(".play-add")) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", card.dataset.id);
      e.dataTransfer.effectAllowed = "copy";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });

  pool.addEventListener("click", (e) => {
    const btn = e.target.closest(".play-add");
    if (!btn) return;
    e.stopPropagation();
    addPlay(btn.dataset.id);
  });
}

function bindDropzone() {
  const zone = document.getElementById("dropzone");

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("is-over");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("is-over"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("is-over");
    const reorderId = e.dataTransfer.getData("application/x-reorder");
    if (reorderId) return; // 交给排序逻辑
    const id = e.dataTransfer.getData("text/plain");
    if (id) addPlay(id);
  });

  zone.addEventListener("dragstart", (e) => {
    const slot = e.target.closest(".slot--play");
    if (!slot) return;
    e.dataTransfer.setData("application/x-reorder", slot.dataset.id);
    e.dataTransfer.effectAllowed = "move";
  });

  zone.addEventListener("dragover", (e) => {
    const over = e.target.closest(".slot--play");
    if (!over) return;
    e.preventDefault();
  });

  zone.addEventListener("drop", (e) => {
    const target = e.target.closest(".slot--play");
    const fromId = e.dataTransfer.getData("application/x-reorder");
    if (!target || !fromId) return;
    e.preventDefault();
    e.stopPropagation();
    const toId = target.dataset.id;
    if (fromId === toId) return;
    const from = state.playIds.indexOf(fromId);
    const to = state.playIds.indexOf(toId);
    if (from < 0 || to < 0) return;
    state.playIds.splice(from, 1);
    state.playIds.splice(to, 0, fromId);
    refreshSchedule();
  });

  zone.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-play]");
    if (!btn) return;
    removePlay(btn.dataset.removePlay);
  });
}

function addPlay(id) {
  if (!PLAY_PLACES.some((p) => p.id === id)) return;
  if (state.playIds.includes(id)) {
    showToast("这个地方已经在日程里啦");
    return;
  }
  state.playIds.push(id);
  refreshSchedule();
  persistState();
  const p = PLAY_PLACES.find((x) => x.id === id);
  // 满 3 个用专属彩蛋，否则用同款「夸眼光」弹窗
  if (!maybeEgg()) praise(p.name);
}

function removePlay(id) {
  state.playIds = state.playIds.filter((x) => x !== id);
  refreshSchedule();
  persistState();
}

function maybeEgg() {
  if (state.eggShown || state.playIds.length < 3) return false;
  state.eggShown = true;
  persistState();
  showCelebrateModal({
    emoji: "🍂🎉",
    title: "日程渐渐丰满啦！",
    body: "已经选了 3 个玩乐地点，俞女士眼光真好～继续加点吃喝，这一天会更圆满。",
  });
  return true;
}

function burstConfetti() {
  const colors = ["#003f88", "#3d8b7a", "#c45c26", "#2f6fad", "#e8a04a"];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = colors[i % colors.length];
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

/* ---------- 日程表 ---------- */
function refreshSchedule() {
  const zone = document.getElementById("dropzone");
  document.getElementById("playCount").textContent = `${state.playIds.length} 个地点`;

  PLAY_PLACES.forEach((p) => {
    const card = document.getElementById(`pool-${p.id}`);
    if (card) card.classList.toggle("is-used", state.playIds.includes(p.id));
  });

  const items = buildTimeline();
  if (!items.length) {
    zone.innerHTML = "";
    return;
  }

  zone.innerHTML = items
    .map((item) => {
      if (item.type === "meal") {
        const r = RESTAURANTS.find((x) => x.id === item.placeId);
        return `
        <div class="slot slot--meal">
          ${swatch(r.tone, r.short)}
          <div>
            <p class="slot__label">${MEAL_LABEL[item.meal]} · ${(r.badges || []).join(" ")}</p>
            <p class="slot__title">${r.name}</p>
            <p class="slot__sub">${r.tags.join(" · ")}</p>
          </div>
          <span></span>
        </div>`;
      }
      const p = PLAY_PLACES.find((x) => x.id === item.placeId);
      return `
      <div class="slot slot--play" draggable="true" data-id="${p.id}">
        ${swatch(p.tone, p.short, p.img)}
        <div>
          <p class="slot__label">玩乐 · ${(p.badges || []).join(" ") || "逛逛"}</p>
          <p class="slot__title">${p.name}</p>
          <p class="slot__sub">可拖动调整顺序</p>
        </div>
        <button type="button" class="slot__remove" data-remove-play="${p.id}" aria-label="移除">×</button>
      </div>`;
    })
    .join("");
}

/** 玩乐穿插在三餐之间 */
function buildTimeline() {
  const plays = state.playIds.map((id) => ({ type: "play", placeId: id }));
  const meals = [];
  ["lunch", "tea", "dinner"].forEach((meal) => {
    const m = state.meals[meal];
    if (m.want && m.placeId) meals.push({ type: "meal", meal, placeId: m.placeId });
  });

  if (!plays.length && !meals.length) return [];

  const lunch = meals.find((m) => m.meal === "lunch");
  const tea = meals.find((m) => m.meal === "tea");
  const dinner = meals.find((m) => m.meal === "dinner");

  const n = plays.length;
  const a = Math.ceil(n / 3);
  const b = Math.ceil((n - a) / 2);
  const chunk1 = plays.slice(0, a);
  const chunk2 = plays.slice(a, a + b);
  const chunk3 = plays.slice(a + b);

  const out = [];
  out.push(...chunk1);
  if (lunch) out.push(lunch);
  out.push(...chunk2);
  if (tea) out.push(tea);
  out.push(...chunk3);
  if (dinner) out.push(dinner);
  return out;
}

/* ---------- 生成与导出 ---------- */
function bindFinale() {
  document.getElementById("btnGenerate").addEventListener("click", generateResult);
  document.getElementById("btnSaveImg").addEventListener("click", saveAsImage);
  document.getElementById("btnCopyMd").addEventListener("click", copyMarkdown);
  document.getElementById("btnDownloadMd").addEventListener("click", downloadMarkdown);
}

function generateResult() {
  const timeline = buildTimeline();
  if (!state.dateId) {
    showToast("先选一个日期吧～");
    document.getElementById("dates").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (!timeline.length) {
    showToast("至少选一家店或拖一个玩乐地点进来哦");
    return;
  }

  for (const meal of ["lunch", "tea", "dinner"]) {
    if (state.meals[meal].want && !state.meals[meal].placeId) {
      showToast(`勾了${MEAL_LABEL[meal]}，还没选哪一家呢`);
      document.getElementById("food").scrollIntoView({ behavior: "smooth" });
      return;
    }
  }

  const arrive = document.getElementById("arriveTime").value;
  const leave = document.getElementById("leaveTime").value;
  const notes = document.getElementById("extraNotes").value.trim();

  const metaParts = [formatDate(state.dateId)];
  if (arrive) metaParts.push(`约 ${arrive} 到校`);
  if (leave) metaParts.push(`约 ${leave} 结束`);
  else metaParts.push("结束时间随心");

  document.getElementById("resultMeta").textContent = metaParts.join(" · ");

  let playIndex = 0;
  document.getElementById("resultList").innerHTML = timeline
    .map((item) => {
      if (item.type === "meal") {
        const r = RESTAURANTS.find((x) => x.id === item.placeId);
        return `<li><strong>${MEAL_LABEL[item.meal]}</strong> · ${r.name}<br/><span class="result-desc">${r.desc}</span></li>`;
      }
      playIndex += 1;
      const p = PLAY_PLACES.find((x) => x.id === item.placeId);
      return `<li><strong>玩乐 ${playIndex}</strong> · ${p.name}<br/><span class="result-desc">${p.desc}</span></li>`;
    })
    .join("");

  document.getElementById("resultNotes").textContent = notes
    ? `备注：${notes}`
    : "";

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("日程表生成好啦！记得发还给侄女～");
  burstConfetti();
}

function buildMarkdown() {
  const arrive = document.getElementById("arriveTime").value;
  const leave = document.getElementById("leaveTime").value;
  const notes = document.getElementById("extraNotes").value.trim();
  const timeline = buildTimeline();

  let md = `# 俞女士一家 · 浙大一日游日程\n\n`;
  md += `- **日期**：${formatDate(state.dateId)}\n`;
  md += `- **到校**：${arrive || "待定"}\n`;
  md += `- **结束**：${leave || "待定"}\n\n`;
  md += `## 行程安排\n\n`;
  timeline.forEach((item, i) => {
    if (item.type === "meal") {
      const r = RESTAURANTS.find((x) => x.id === item.placeId);
      md += `${i + 1}. **${MEAL_LABEL[item.meal]}** — ${r.name}\n   - ${r.desc}\n`;
    } else {
      const p = PLAY_PLACES.find((x) => x.id === item.placeId);
      md += `${i + 1}. **玩乐** — ${p.name}\n   - ${p.desc}\n`;
    }
  });
  if (notes) md += `\n## 备注\n\n${notes}\n`;
  md += `\n---\n请把这份日程发还给侄女确认，紫金港见！\n`;
  return md;
}

async function copyMarkdown() {
  const md = buildMarkdown();
  try {
    await navigator.clipboard.writeText(md);
    showToast("Markdown 已复制，可以粘贴发微信～");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = md;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Markdown 已复制");
  }
}

function downloadMarkdown() {
  const md = buildMarkdown();
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `浙大一日游日程-${state.dateId || "待定"}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("已下载 Markdown 文件");
}

async function saveAsImage() {
  const card = document.getElementById("postcard");
  if (typeof html2canvas !== "function") {
    showToast("图片库加载中，请稍后再试，或先用 Markdown");
    return;
  }
  showToast("正在生成图片…");
  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: "#f3f9f6",
      useCORS: true,
    });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `浙大一日游日程-${state.dateId || "待定"}.png`;
    a.click();
    showToast("图片已保存，发给侄女吧！");
  } catch (err) {
    console.error(err);
    showToast("图片生成失败，请改用复制 Markdown");
  }
}

let toastTimer;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 2600);
}
