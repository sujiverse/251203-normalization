// 2권 네비게이션
const chapters = [
    { id: 'index', title: '0권: 이 책의 사용법', url: '../index.html' },
    { id: 'chapter-1', title: '1권: 매일 쓰는 기본 조회', url: 'chapter-1.html' },
    { id: 'chapter-2', title: '2권: 환자 관리 실무', url: 'chapter-2.html' },
    { id: 'chapter-3', title: '3권: 해피콜 & 리텐션', url: 'chapter-3.html' },
    { id: 'chapter-4', title: '4권: 치료사 실적 관리', url: 'chapter-4.html' },
    { id: 'chapter-5', title: '5권: 인센티브 & 급여 정산', url: 'chapter-5.html' },
    { id: 'chapter-6', title: '6권: 매출 & 수납 관리', url: 'chapter-6.html' },
    { id: 'chapter-7', title: '7권: 정기 리포트 만들기', url: 'chapter-7.html' },
    { id: 'chapter-8', title: '8권: 데이터 품질 관리', url: 'chapter-8.html' },
    { id: 'chapter-9', title: '9권: 고급 분석 쿼리', url: 'chapter-9.html' },
    { id: 'chapter-10', title: '10권: DBeaver 활용', url: 'chapter-10.html' },
    { id: 'chapter-11', title: '11권: 백업과 안전 관리', url: 'chapter-11.html' },
    { id: 'appendix', title: '부록: 쿼리 레시피북', url: 'appendix.html' }
];

function getCurrentPageId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename === '' || filename === 'index' ? 'index' : filename;
}

function renderNav() {
    const navList = document.getElementById('navList');
    const currentId = getCurrentPageId();
    const isInChapters = window.location.pathname.includes('/chapters/');

    navList.innerHTML = chapters.map(ch => {
        const isActive = ch.id === currentId;
        let url = ch.url;

        // index.html에서는 chapters/ 경로 추가
        if (!isInChapters && ch.id !== 'index') {
            url = 'chapters/' + ch.url;
        }
        // chapters 폴더 내에서 index로 갈 때
        if (isInChapters && ch.id === 'index') {
            url = '../index.html';
        }

        return `<a href="${url}" class="nav-item ${isActive ? 'active' : ''}">${ch.title}</a>`;
    }).join('');
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', renderNav);
