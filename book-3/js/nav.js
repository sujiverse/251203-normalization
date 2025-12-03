// 물리치료사를 위한 데이터베이스 - 네비게이션

// 챕터 목록 정의
const chapters = [
    { id: 'index', title: '0장: 이 책의 사용법', url: '../index.html' },
    { id: 'chapter-1', title: '1장: 힐링손 물리치료센터', url: 'chapter-1.html' },
    { id: 'chapter-2', title: '2장: 개발 환경 세팅', url: 'chapter-2.html' },
    { id: 'chapter-3', title: '3장: 데이터베이스 & 테이블 생성', url: 'chapter-3.html' },
    { id: 'chapter-4', title: '4장: 제약조건', url: 'chapter-4.html' },
    { id: 'chapter-5', title: '5장: 샘플 데이터 입력', url: 'chapter-5.html' },
    { id: 'chapter-6', title: '6장: 기본 CRUD', url: 'chapter-6.html' },
    { id: 'chapter-7', title: '7장: 테이블 확장', url: 'chapter-7.html' },
    { id: 'chapter-8', title: '8장: Metabase 설치', url: 'chapter-8.html' },
    { id: 'chapter-9', title: '9장: 첫 대시보드', url: 'chapter-9.html' },
    { id: 'chapter-10', title: '10장: 집계 함수 & GROUP BY', url: 'chapter-10.html' },
    { id: 'chapter-11', title: '11장: 테이블 조인', url: 'chapter-11.html' },
    { id: 'chapter-12', title: '12장: 매출 대시보드', url: 'chapter-12.html' },
    { id: 'chapter-13', title: '13장: 운영 대시보드', url: 'chapter-13.html' },
    { id: 'chapter-14', title: '14장: 치료사 실적 대시보드', url: 'chapter-14.html' },
    { id: 'chapter-15', title: '15장: 완성 & 활용', url: 'chapter-15.html' },
    { id: 'appendix-a', title: '부록 A: 전체 SQL 스크립트', url: 'appendix-a.html' },
    { id: 'appendix-b', title: '부록 B: Metabase 쿼리 모음', url: 'appendix-b.html' },
    { id: 'appendix-c', title: '부록 C: 용어 사전', url: 'appendix-c.html' }
];

// 현재 페이지 확인
function getCurrentPageId() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    if (filename === 'index.html' || filename === '' || path.endsWith('/')) {
        return 'index';
    }
    return filename.replace('.html', '');
}

// 네비게이션 목록 생성
function buildNavList() {
    const navList = document.getElementById('navList');
    if (!navList) return;

    const currentPageId = getCurrentPageId();
    const isInChaptersFolder = window.location.pathname.includes('/chapters/');

    chapters.forEach(chapter => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.className = 'nav-item' + (chapter.id === currentPageId ? ' active' : '');
        a.textContent = chapter.title;

        // URL 경로 조정
        if (isInChaptersFolder) {
            a.href = chapter.url;
        } else {
            // index.html에서는 chapters/ 폴더 경로 추가
            if (chapter.id === 'index') {
                a.href = 'index.html';
            } else {
                a.href = 'chapters/' + chapter.url.replace('../', '').replace('chapters/', '');
            }
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}

// 모바일 메뉴 토글
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

// 이전/다음 버튼 설정
function setupNavButtons() {
    const currentPageId = getCurrentPageId();
    const currentIndex = chapters.findIndex(ch => ch.id === currentPageId);
    const isInChaptersFolder = window.location.pathname.includes('/chapters/');

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNum = document.getElementById('pageNum');

    if (pageNum) {
        pageNum.textContent = `${currentIndex + 1} / ${chapters.length}`;
    }

    if (prevBtn) {
        if (currentIndex > 0) {
            const prevChapter = chapters[currentIndex - 1];
            let prevUrl = prevChapter.url;
            if (!isInChaptersFolder && prevChapter.id !== 'index') {
                prevUrl = 'chapters/' + prevUrl.replace('../', '');
            } else if (isInChaptersFolder && prevChapter.id === 'index') {
                prevUrl = '../index.html';
            }
            prevBtn.onclick = () => window.location.href = prevUrl;
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }
    }

    if (nextBtn) {
        if (currentIndex < chapters.length - 1) {
            const nextChapter = chapters[currentIndex + 1];
            let nextUrl = nextChapter.url;
            if (!isInChaptersFolder && nextChapter.id !== 'index') {
                nextUrl = 'chapters/' + nextUrl.replace('../', '');
            }
            nextBtn.onclick = () => window.location.href = nextUrl;
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    buildNavList();
    setupNavButtons();
});
