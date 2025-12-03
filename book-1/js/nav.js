// 1권 네비게이션
const chapters = [
    { id: 'index', title: '0권: 시리즈 소개', url: '../index.html' },
    { id: 'chapter-1', title: '1권: DB 기초 개념', url: 'chapter-1.html' },
    { id: 'chapter-2', title: '2권: 왜 정규화가 필요한가', url: 'chapter-2.html' },
    { id: 'chapter-3', title: '3권: 제1정규형 (1NF)', url: 'chapter-3.html' },
    { id: 'chapter-4', title: '4권: 제2정규형 (2NF)', url: 'chapter-4.html' },
    { id: 'chapter-5', title: '5권: 제3정규형 (3NF)', url: 'chapter-5.html' },
    { id: 'chapter-6', title: '6권: SQL 기초', url: 'chapter-6.html' },
    { id: 'chapter-7', title: '7권: 실전 DB 설계', url: 'chapter-7.html' },
    { id: 'chapter-8', title: '8권: 보너스 실무 팁', url: 'chapter-8.html' },
    { id: 'chapter-9', title: '9권: 관계 체인과 중간 테이블', url: 'chapter-9.html' },
    { id: 'chapter-10', title: '10권: 통계와 인센티브 계산', url: 'chapter-10.html' },
    { id: 'chapter-11', title: '11권: DB 영어 용어집', url: 'chapter-11.html' },
    { id: 'chapter-12', title: '12권: MySQL 세팅 가이드', url: 'chapter-12.html' }
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
