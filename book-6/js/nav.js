// 6권 네비게이션 - 연구자를 위한 데이터 설계
const chapters = [
    { id: 'index', title: '시리즈 소개', url: '../index.html' },
    // 1부: 연구와 데이터의 기초
    { id: 'chapter-1', title: '1장: 엑셀이 연구를 망치는 이유', url: 'chapter-1.html' },
    { id: 'chapter-2', title: '2장: 연구 설계의 기본 구조', url: 'chapter-2.html' },
    { id: 'chapter-3', title: '3장: 변수란 무엇인가', url: 'chapter-3.html' },
    { id: 'chapter-4', title: '4장: 변수의 역할별 분류', url: 'chapter-4.html' },
    // 2부: 변수 유형과 저장 원칙
    { id: 'chapter-5', title: '5장: 척도의 4가지 수준', url: 'chapter-5.html' },
    { id: 'chapter-6', title: '6장: 범주형 변수 완전정복', url: 'chapter-6.html' },
    { id: 'chapter-7', title: '7장: 연속형 변수 완전정복', url: 'chapter-7.html' },
    { id: 'chapter-8', title: '8장: 특수 변수 처리', url: 'chapter-8.html' },
    { id: 'chapter-9', title: '9장: 복합 변수와 척도', url: 'chapter-9.html' },
    // 3부: 연구 형태별 DB 설계
    { id: 'chapter-10', title: '10장: 횡단 연구', url: 'chapter-10.html' },
    { id: 'chapter-11', title: '11장: 종단 연구', url: 'chapter-11.html' },
    { id: 'chapter-12', title: '12장: 실험 연구', url: 'chapter-12.html' },
    { id: 'chapter-13', title: '13장: 설문 연구', url: 'chapter-13.html' },
    { id: 'chapter-14', title: '14장: 질적/혼합 연구', url: 'chapter-14.html' },
    // 4부: 기술통계와 추론통계
    { id: 'chapter-15', title: '15장: 기술통계의 모든 것', url: 'chapter-15.html' },
    { id: 'chapter-16', title: '16장: 집단 비교 분석', url: 'chapter-16.html' },
    { id: 'chapter-17', title: '17장: 관계 분석', url: 'chapter-17.html' },
    { id: 'chapter-18', title: '18장: 회귀분석', url: 'chapter-18.html' },
    // 5부: 실전 데이터 관리
    { id: 'chapter-19', title: '19장: 코드북과 메타데이터', url: 'chapter-19.html' },
    { id: 'chapter-20', title: '20장: 분석 도구 연동', url: 'chapter-20.html' }
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

        if (!isInChapters && ch.id !== 'index') {
            url = 'chapters/' + ch.url;
        }
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
