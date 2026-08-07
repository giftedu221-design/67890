// 화면 이동과 안전 정보 카드를 담당하는 파일입니다.
document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const homeButton = document.getElementById('homeButton');
  const safetyCards = document.getElementById('safetyCards');
  let currentBeach = '해운대';

  // 해수욕장마다 조금씩 다른 예시 데이터를 준비했습니다.
  const beachData = {
    해운대: { overall: ['caution', '주의하며 물놀이 가능', '이안류 안내 방송에 귀 기울여 주세요.'], cards: [['JELLY','해파리 출몰','safe','안전','발견 신고 없음'],['RIP','이안류 위험도','caution','주의','해안가 접근 주의'],['DEEP','수심 위험도','caution','주의','깊은 곳 진입 금지'],['WAVE','파도 높이','safe','0.6 m','잔잔한 편입니다'],['TEMP','수온','safe','25.8 ℃','쾌적한 수온'],['SUN','날씨','safe','맑음','자외선 차단 필수'],['SWIM','수영 가능 여부','caution','주의','안전 구역 내 가능']] },
    광안리: { overall: ['safe', '안전하게 물놀이 가능', '현재 해상 상태가 비교적 안정적입니다.'], cards: [['JELLY','해파리 출몰','safe','안전','발견 신고 없음'],['RIP','이안류 위험도','safe','안전','특이사항 없음'],['DEEP','수심 위험도','caution','주의','부표 밖 진입 금지'],['WAVE','파도 높이','safe','0.4 m','잔잔합니다'],['TEMP','수온','safe','26.1 ℃','쾌적한 수온'],['SKY','날씨','safe','구름 조금','산책하기 좋아요'],['SWIM','수영 가능 여부','safe','가능','안전 구역 내 가능']] },
    송정: { overall: ['caution', '주의하며 물놀이 가능', '파도가 다소 높아 서핑 초보자는 주의하세요.'], cards: [['JELLY','해파리 출몰','caution','주의','소량 관측'],['RIP','이안류 위험도','safe','안전','특이사항 없음'],['DEEP','수심 위험도','caution','주의','수심 변화 구간'],['WAVE','파도 높이','caution','1.1 m','파도에 주의'],['TEMP','수온','safe','25.3 ℃','쾌적한 수온'],['SUN','날씨','safe','맑음','바람이 조금 불어요'],['SWIM','수영 가능 여부','caution','주의','안전요원 지시에 따르기']] },
    다대포: { overall: ['danger', '물놀이를 삼가 주세요', '강한 바람과 높은 파도로 위험합니다.'], cards: [['JELLY','해파리 출몰','safe','안전','발견 신고 없음'],['RIP','이안류 위험도','danger','위험','강한 이안류 관측'],['DEEP','수심 위험도','caution','주의','급격한 수심 변화'],['WAVE','파도 높이','danger','1.8 m','높은 파도'],['TEMP','수온','safe','24.9 ℃','보통 수온'],['WIND','날씨','caution','강한 바람','돌풍 주의'],['SWIM','수영 가능 여부','danger','불가','입수 금지']] }
  };
  const riskName = {safe:'안전',caution:'주의',danger:'위험'};
  function renderSafety() {
    const data = beachData[currentBeach]; const [risk, title, desc] = data.overall;
    document.getElementById('overallDot').className = `status-dot ${risk}`;
    document.getElementById('overallText').textContent = `${currentBeach} · ${title}`;
    document.getElementById('overallDesc').textContent = desc;
    safetyCards.innerHTML = data.cards.map(([icon,title,level,value,hint]) => `<article class="safety-card"><span class="card-icon">${icon}</span><h3>${title}</h3><span class="risk-pill"><i class="status-dot ${level}"></i>${['safe','caution','danger'].includes(level)?riskName[level]:''}</span><div class="card-value">${value}</div><p class="card-hint">${hint}</p></article>`).join('');
  }
  function go(pageId) { window.SeaGames.stop(); if (pageId === 'games') window.SeaGames.backToChoices(); pages.forEach(page => page.classList.toggle('active', page.id === pageId)); window.scrollTo({top:0,behavior:'smooth'}); }
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
  homeButton.addEventListener('click', () => go('home'));
  document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => { currentBeach=tab.dataset.beach; document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===tab)); renderSafety(); }));
  document.querySelectorAll('[data-game]').forEach(button => button.addEventListener('click', () => window.SeaGames.choose(button.dataset.course)));
  const gamesPage = document.getElementById('games');
  document.querySelectorAll('.course-card').forEach(card => card.addEventListener('mouseenter', () => { gamesPage.style.setProperty('--selected-course-photo', `url("${card.dataset.photo}")`); gamesPage.classList.add('course-preview'); }));
  document.getElementById('gameChoice').addEventListener('mouseleave', () => gamesPage.classList.remove('course-preview'));
  document.getElementById('restartButton').addEventListener('click', () => window.SeaGames.start());
  document.getElementById('backToChoices').addEventListener('click', () => window.SeaGames.backToChoices());
  renderSafety(); window.SeaGames.init();
});
