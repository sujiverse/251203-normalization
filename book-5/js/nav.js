// 5권 챕터 목록
const chapters = [
    { title: '시작하기', file: '../index.html' },
    { title: '1장: 보안이 왜 중요한가', file: 'chapter-1.html' },
    { title: '2장: SQL 인젝션 공격', file: 'chapter-2.html' },
    { title: '3장: SQL 인젝션 방어', file: 'chapter-3.html' },
    { title: '4장: XSS 공격과 방어', file: 'chapter-4.html' },
    { title: '5장: CSRF 공격과 방어', file: 'chapter-5.html' },
    { title: '6장: 인증과 세션 관리', file: 'chapter-6.html' },
    { title: '7장: 비밀번호 안전하게 저장', file: 'chapter-7.html' },
    { title: '8장: DB 사용자 권한 관리', file: 'chapter-8.html' },
    { title: '9장: DB 접근 제어', file: 'chapter-9.html' },
    { title: '10장: 민감 데이터 암호화', file: 'chapter-10.html' },
    { title: '11장: WAS 서버 보안 설정', file: 'chapter-11.html' },
    { title: '12장: HTTPS 적용하기', file: 'chapter-12.html' },
    { title: '13장: 로깅과 모니터링', file: 'chapter-13.html' },
    { title: '14장: 백업과 복구', file: 'chapter-14.html' },
    { title: '15장: 보안 체크리스트', file: 'chapter-15.html' }
];

// 현재 페이지 파일명
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    return filename || 'index.html';
}

// 경로 계산 헬퍼
function getHref(file) {
    const isInChaptersFolder = window.location.pathname.includes('/chapters/');
    if (isInChaptersFolder) {
        return file;
    } else {
        if (file === '../index.html') {
            return 'index.html';
        } else {
            return 'chapters/' + file;
        }
    }
}

// 네비게이션 렌더링
function renderNav() {
    const navList = document.getElementById('navList');
    const currentPage = getCurrentPage();
    const isInChaptersFolder = window.location.pathname.includes('/chapters/');

    navList.innerHTML = chapters.map((ch, idx) => {
        const isActive = (currentPage === ch.file) ||
                        (currentPage === 'index.html' && ch.file === '../index.html') ||
                        (currentPage === '' && ch.file === '../index.html');

        let href = ch.file;
        if (isInChaptersFolder) {
            href = ch.file;
        } else {
            if (ch.file === '../index.html') {
                href = 'index.html';
            } else {
                href = 'chapters/' + ch.file;
            }
        }
        return `<li><a href="${href}" class="nav-item ${isActive ? 'active' : ''}">${ch.title}</a></li>`;
    }).join('');
}

// 이전/다음 버튼 설정
function setupNavButtons() {
    const currentPage = getCurrentPage();
    const currentIdx = chapters.findIndex(ch =>
        ch.file === currentPage ||
        (ch.file === '../index.html' && (currentPage === 'index.html' || currentPage === ''))
    );

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        if (currentIdx > 0) {
            const prevChapter = chapters[currentIdx - 1];
            prevBtn.onclick = () => window.location.href = getHref(prevChapter.file);
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }
    }

    if (nextBtn) {
        if (currentIdx < chapters.length - 1) {
            const nextChapter = chapters[currentIdx + 1];
            nextBtn.onclick = () => window.location.href = getHref(nextChapter.file);
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
}

// 페이지 번호 표시
function showPageNum() {
    const currentPage = getCurrentPage();
    const currentIdx = chapters.findIndex(ch =>
        ch.file === currentPage ||
        (ch.file === '../index.html' && (currentPage === 'index.html' || currentPage === ''))
    );
    const pageNum = document.getElementById('pageNum');
    if (pageNum && currentIdx >= 0) {
        pageNum.textContent = `${currentIdx} / ${chapters.length - 1}`;
    }
}

// 모바일 메뉴 토글
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    setupNavButtons();
    showPageNum();
});
