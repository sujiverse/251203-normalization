// 4권 네비게이션 데이터
const chapters = [
    { id: 'index', title: '이 책의 사용법', file: '../index.html' },
    { id: 'ch1', title: '1장: 우리가 만들 것 미리보기', file: 'chapter-1.html' },
    { id: 'ch2', title: '2장: 웹앱 구조 이해', file: 'chapter-2.html' },
    { id: 'ch3', title: '3장: 개발 환경 세팅', file: 'chapter-3.html' },
    { id: 'ch4', title: '4장: Flask 시작하기', file: 'chapter-4.html' },
    { id: 'ch5', title: '5장: 라우팅과 URL', file: 'chapter-5.html' },
    { id: 'ch6', title: '6장: JSON 응답 만들기', file: 'chapter-6.html' },
    { id: 'ch7', title: '7장: MySQL 연결', file: 'chapter-7.html' },
    { id: 'ch8', title: '8장: 환자 목록 API', file: 'chapter-8.html' },
    { id: 'ch9', title: '9장: 예약 조회 API', file: 'chapter-9.html' },
    { id: 'ch10', title: '10장: 예약 CRUD API', file: 'chapter-10.html' },
    { id: 'ch11', title: '11장: HTML 구조 잡기', file: 'chapter-11.html' },
    { id: 'ch12', title: '12장: CSS로 꾸미기', file: 'chapter-12.html' },
    { id: 'ch13', title: '13장: JavaScript 핵심', file: 'chapter-13.html' },
    { id: 'ch14', title: '14장: API 호출하기', file: 'chapter-14.html' },
    { id: 'ch15', title: '15장: Luckysheet 설치', file: 'chapter-15.html' },
    { id: 'ch16', title: '16장: 기본 시트 만들기', file: 'chapter-16.html' },
    { id: 'ch17', title: '17장: 셀 스타일 커스터마이징', file: 'chapter-17.html' },
    { id: 'ch18', title: '18장: 열/행 고정 설정', file: 'chapter-18.html' },
    { id: 'ch19', title: '19장: DB → Luckysheet 표시', file: 'chapter-19.html' },
    { id: 'ch20', title: '20장: 셀 편집 감지', file: 'chapter-20.html' },
    { id: 'ch21', title: '21장: 편집 → DB 저장', file: 'chapter-21.html' },
    { id: 'ch22', title: '22장: 실시간 동기화', file: 'chapter-22.html' },
    { id: 'ch23', title: '23장: 예약 현황 시트', file: 'chapter-23.html' },
    { id: 'ch24', title: '24장: 환자 관리 시트', file: 'chapter-24.html' },
    { id: 'ch25', title: '25장: 매출 현황 시트', file: 'chapter-25.html' },
    { id: 'ch26', title: '26장: 로그인 기능', file: 'chapter-26.html' },
    { id: 'ch27', title: '27장: 로컬 네트워크 배포', file: 'chapter-27.html' },
    { id: 'ch28', title: '28장: 보안 체크리스트', file: 'chapter-28.html' },
    { id: 'ch29', title: '29장: 완성! 운영 가이드', file: 'chapter-29.html' }
];

// 현재 페이지 확인
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename || 'index.html';
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
            // chapters 폴더 안에서: ../index.html 또는 chapter-x.html
            href = ch.file;
        } else {
            // index.html에서: index.html 또는 chapters/chapter-x.html
            if (ch.file === '../index.html') {
                href = 'index.html';
            } else {
                href = 'chapters/' + ch.file;
            }
        }
        return `<li><a href="${href}" class="nav-item ${isActive ? 'active' : ''}">${ch.title}</a></li>`;
    }).join('');
}

// 페이지 번호 업데이트
function updatePageNum() {
    const currentPage = getCurrentPage();
    const pageNumEl = document.getElementById('pageNum');

    if (pageNumEl) {
        const currentIdx = chapters.findIndex(ch =>
            ch.file === currentPage ||
            ch.file === '../index.html' && (currentPage === 'index.html' || currentPage === '')
        );
        pageNumEl.textContent = `${currentIdx + 1} / ${chapters.length}`;
    }
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
    updatePageNum();
    setupNavButtons();
});
