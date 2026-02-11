// ✅ 홍보영상 적용 (https://youtu.be/jmBuSL6t8hI)
const YOUTUBE_ID = "jmBuSL6t8hI";

// 지거퀘더 묵상 이미지
// 지금은 샘플로 두었고, 실제로는 로컬 파일로 바꾸면 가장 안정적입니다.
// 예) ./images/01.png 같은 방식
const MEDITATION_IMAGES = [
  { title: "누레네 사람 시몬", src: "./images/01.png" },
  { title: "최후를 맞으시기 직전 예수의 시선이 머문 곳", src: "./images/02.png" },
  { title: "예수께서 무덤에 묻히시다", src: "./images/03.png" },
  { title: "무덤가의 막달라 마리아", src: "./images/04.png" },
  { title: "감람산에서", src: "./images/05.png" },
  { title: "부인하는 베드로", src: "./images/06.png" },
  { title: "판결", src: "./images/07.png" }
];

// ===== 유틸 =====
const qs = (sel, el = document) => el.querySelector(sel);

// ===== 유튜브 임베드 =====
(function initYouTube(){
  const frame = qs("#youtubeEmbed");
  if (!frame) return;

  const id = frame.getAttribute("data-youtube-id") || YOUTUBE_ID;
  frame.innerHTML = `
    <iframe
      width="100%" height="100%"
      src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}"
      title="홍보영상"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
})();

// ===== 갤러리 렌더 + 모달 =====
(function initGallery(){
  const gallery = qs("#gallery");
  if (!gallery) return;

  gallery.innerHTML = "";
  MEDITATION_IMAGES.forEach((img) => {
    const div = document.createElement("div");
    div.className = "thumb";
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `${img.title} 확대 보기`);
    div.innerHTML = `<img src="${img.src}" alt="${img.title}" loading="lazy" />`;

    const open = () => openModal(img.title, img.src);
    div.addEventListener("click", open);
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });

    gallery.appendChild(div);
  });
})();

const modal = qs("#imgModal");
const modalImg = qs("#modalImg");
const modalTitle = qs("#modalTitle");
const closeModalBtn = qs("#closeModalBtn");
const modalBackdrop = qs("#modalBackdrop");

function openModal(title, src){
  if (!modal || !modalImg || !modalTitle) return;
  modalTitle.textContent = title || "";
  modalImg.src = src;
  modalImg.alt = title || "이미지";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // ✅ 배경 스크롤은 잠그되(의도), 모달 내부에서 스크롤 가능하도록 CSS로 해결
  document.body.style.overflow = "hidden";
}

function closeModal(){
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
