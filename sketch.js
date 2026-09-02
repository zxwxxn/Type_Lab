// =====================================================
// 1. SETTINGS
// 프로젝트 전체에서 공통으로 사용하는 조절값
// =====================================================

// 브라우저 가장자리와 캔버스 사이 여백
const PAGE_MARGIN = 24;

// 캔버스 아래 입력 UI 공간
const CONTROL_AREA_HEIGHT = 110;


// -----------------------------------------
// 점 크기 / 마우스 선택 범위
// -----------------------------------------

const JOINT_SIZE = 18;
const MIDDLE_POINT_SIZE = 14;
const CONNECTOR_SIZE = 28;

// 마우스로 점을 잡을 수 있는 범위
const POINT_PICK_RADIUS = 20;


// -----------------------------------------
// 점 물리
// -----------------------------------------

// 연결된 점이 원래 간격으로 돌아가려는 힘
// 높을수록 빳빳하고, 낮을수록 말랑함
const SPRING_STIFFNESS = 0.05;

// 움직임이 얼마나 오래 남는지
// 1에 가까울수록 흔들림이 오래 지속됨
const POINT_DAMPING = 0.86;

// 점이 너무 빠르게 튀는 것을 제한
const MAX_POINT_SPEED = 20;


// -----------------------------------------
// Connector 자석
// -----------------------------------------

// 이 거리 안에서 같은 음절의 connector가 서로 끌림
const MAGNET_RADIUS = 100;

// 자석 힘의 세기
const MAGNET_FORCE = 0.2;


// -----------------------------------------
// Connector 스냅
// -----------------------------------------

// 이 거리 안으로 들어오면 connector를 같은 위치에 맞춤
const SNAP_DISTANCE = 25;


// -----------------------------------------
// 디버그 표시
// -----------------------------------------

// 물리 뼈대를 화면에 보여줄지 여부
const SHOW_SKELETON = true;


// -----------------------------------------
// 반응형 캔버스 크기
// -----------------------------------------

// 브라우저 크기를 기준으로 캔버스 너비 계산
function getCanvasWidth() {
  return Math.max(300, windowWidth - PAGE_MARGIN * 2);
}

// 입력 UI 공간을 제외한 캔버스 높이 계산
function getCanvasHeight() {
  return Math.max(300, windowHeight - PAGE_MARGIN * 2 - CONTROL_AREA_HEIGHT);
}


// =====================================================
// 2. JAMO DATA
// 각 자모의 관절(nodes), 선(edges), 결합점(connectors)
// =====================================================

const JAMO = {

  // -----------------------------------------
  // 기본 자음
  // -----------------------------------------

  // ㄱ
  'ㄱ': {
    nodes: [
      { x: 120, y: 120 },
      { x: 280, y: 120 },
      { x: 280, y: 280 }
    ],
    edges: [
      [0, 1],
      [1, 2]
    ],
    connectors: [0, 2]
  },

  // ㄴ
  'ㄴ': {
    nodes: [
      { x: 120, y: 120 },
      { x: 120, y: 280 },
      { x: 280, y: 280 }
    ],
    edges: [
      [0, 1],
      [1, 2]
    ],
    connectors: [0, 2]
  },

  // ㄷ
  'ㄷ': {
    nodes: [
      { x: 120, y: 120 }, // 0 왼쪽 위
      { x: 280, y: 120 }, // 1 오른쪽 위
      { x: 120, y: 280 }, // 2 왼쪽 아래
      { x: 280, y: 280 }  // 3 오른쪽 아래
    ],
    edges: [
      [0, 1], // 위
      [0, 2], // 왼쪽
      [2, 3]  // 아래
    ],
    connectors: [1, 3]
  },

  // ㄹ
  'ㄹ': {
    nodes: [
      { x: 120, y: 100 },
      { x: 280, y: 100 },
      { x: 280, y: 180 },
      { x: 120, y: 180 },
      { x: 120, y: 280 },
      { x: 280, y: 280 }
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5]
    ],
    connectors: [0, 5]
  },

  // ㅁ
  'ㅁ': {
    nodes: [
      { x: 120, y: 120 },
      { x: 280, y: 120 },
      { x: 280, y: 280 },
      { x: 120, y: 280 }
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0]
    ],
    connectors: [0, 1, 2, 3]
  },

  // ㅂ
  'ㅂ': {
    nodes: [
      { x: 130, y: 100 }, // 0 왼쪽 위
      { x: 130, y: 200 }, // 1 왼쪽 가운데
      { x: 130, y: 300 }, // 2 왼쪽 아래
      { x: 270, y: 100 }, // 3 오른쪽 위
      { x: 270, y: 200 }, // 4 오른쪽 가운데
      { x: 270, y: 300 }  // 5 오른쪽 아래
    ],
    edges: [
      // 왼쪽 세로
      [0, 1],
      [1, 2],

      // 오른쪽 세로
      [3, 4],
      [4, 5],

      // 가로획
      [1, 4],
      [2, 5]
    ],
    connectors: [0, 2, 3, 5]
  },

  // ㅅ
  'ㅅ': {
    nodes: [
      { x: 200, y: 120 },
      { x: 120, y: 280 },
      { x: 280, y: 280 }
    ],
    edges: [
      [0, 1],
      [0, 2]
    ],
    connectors: [1, 2]
  },

  // ㅇ
  // 원형을 8개의 관절로 표현
  'ㅇ': {
    nodes: [
      { x: 200, y: 100 },
      { x: 270, y: 130 },
      { x: 300, y: 200 },
      { x: 270, y: 270 },
      { x: 200, y: 300 },
      { x: 130, y: 270 },
      { x: 100, y: 200 },
      { x: 130, y: 130 }
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0]
    ],
    connectors: [0, 2, 4, 6]
  },

  // ㅈ
  'ㅈ': {
    nodes: [
      { x: 120, y: 100 }, // 0 왼쪽 위
      { x: 200, y: 100 }, // 1 가운데 위
      { x: 280, y: 100 }, // 2 오른쪽 위
      { x: 120, y: 280 }, // 3 왼쪽 아래
      { x: 280, y: 280 }  // 4 오른쪽 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4]
    ],
    connectors: [0, 2, 3, 4]
  },

  // ㅊ
  'ㅊ': {
    nodes: [
      { x: 120, y: 140 }, // 0 왼쪽
      { x: 200, y: 140 }, // 1 중심
      { x: 280, y: 140 }, // 2 오른쪽
      { x: 200, y: 70 },  // 3 위쪽 끝
      { x: 120, y: 300 }, // 4 왼쪽 아래
      { x: 280, y: 300 }  // 5 오른쪽 아래
    ],
    edges: [
      // 위 가로획
      [0, 1],
      [1, 2],

      // 위쪽 추가 획
      [1, 3],

      // 아래 두 획
      [1, 4],
      [1, 5]
    ],
    connectors: [0, 2, 3, 4, 5]
  },

  // ㅋ
  'ㅋ': {
    nodes: [
      { x: 120, y: 100 },
      { x: 280, y: 100 },
      { x: 280, y: 200 },
      { x: 150, y: 200 },
      { x: 280, y: 300 }
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4]
    ],
    connectors: [0, 3, 4]
  },

  // ㅌ
  'ㅌ': {
    nodes: [
      { x: 120, y: 100 }, // 0 왼쪽 위
      { x: 280, y: 100 }, // 1 오른쪽 위
      { x: 120, y: 200 }, // 2 왼쪽 가운데
      { x: 280, y: 200 }, // 3 오른쪽 가운데
      { x: 120, y: 300 }, // 4 왼쪽 아래
      { x: 280, y: 300 }  // 5 오른쪽 아래
    ],
    edges: [
      // 위 가로
      [0, 1],

      // 왼쪽 세로
      [0, 2],
      [2, 4],

      // 가운데 가로
      [2, 3],

      // 아래 가로
      [4, 5]
    ],
    connectors: [1, 3, 5]
  },

  // ㅍ
  'ㅍ': {
    nodes: [
      // 위 가로획
      { x: 100, y: 130 }, // 0 왼쪽 끝
      { x: 150, y: 130 }, // 1 왼쪽 교차점
      { x: 250, y: 130 }, // 2 오른쪽 교차점
      { x: 300, y: 130 }, // 3 오른쪽 끝

      // 아래 가로획
      { x: 100, y: 270 }, // 4 왼쪽 끝
      { x: 150, y: 270 }, // 5 왼쪽 교차점
      { x: 250, y: 270 }, // 6 오른쪽 교차점
      { x: 300, y: 270 }  // 7 오른쪽 끝
    ],
    edges: [
      // 위 가로획
      [0, 1],
      [1, 2],
      [2, 3],

      // 아래 가로획
      [4, 5],
      [5, 6],
      [6, 7],

      // 세로획
      [1, 5],
      [2, 6]
    ],
    connectors: [0, 3, 4, 7]
  },

  // ㅎ
  'ㅎ': {
    nodes: [
      // 윗부분
      { x: 140, y: 110 }, // 0 왼쪽
      { x: 200, y: 110 }, // 1 중심
      { x: 260, y: 110 }, // 2 오른쪽
      { x: 200, y: 50 },  // 3 위쪽 꼭지

      // 아래 ㅇ
      { x: 200, y: 170 }, // 4 위
      { x: 270, y: 200 }, // 5 오른쪽 위
      { x: 300, y: 270 }, // 6 오른쪽
      { x: 270, y: 340 }, // 7 오른쪽 아래
      { x: 200, y: 370 }, // 8 아래
      { x: 130, y: 340 }, // 9 왼쪽 아래
      { x: 100, y: 270 }, // 10 왼쪽
      { x: 130, y: 200 }  // 11 왼쪽 위
    ],
    edges: [
      // 윗부분
      [0, 1],
      [1, 2],
      [1, 3],

      // 아래 ㅇ
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 4]
    ],
    connectors: [0, 2, 3, 4, 6, 8, 10]
  },

  // -----------------------------------------
  // 된소리
  // -----------------------------------------

  // ㄲ
  'ㄲ': {
    nodes: [
      // 왼쪽 ㄱ
      { x: 90, y: 120 },  // 0
      { x: 170, y: 120 }, // 1
      { x: 170, y: 280 }, // 2

      // 오른쪽 ㄱ
      { x: 210, y: 120 }, // 3
      { x: 290, y: 120 }, // 4
      { x: 290, y: 280 }  // 5
    ],
    edges: [
      // 왼쪽 ㄱ
      [0, 1],
      [1, 2],

      // 오른쪽 ㄱ
      [3, 4],
      [4, 5]
    ],
    connectors: [0, 2, 3, 5]
  },

  // ㄸ
  'ㄸ': {
    nodes: [
      // 왼쪽 ㄷ
      { x: 80, y: 120 },  // 0 왼쪽 위
      { x: 180, y: 120 }, // 1 오른쪽 위
      { x: 80, y: 280 },  // 2 왼쪽 아래
      { x: 180, y: 280 }, // 3 오른쪽 아래

      // 오른쪽 ㄷ
      { x: 220, y: 120 }, // 4 왼쪽 위
      { x: 320, y: 120 }, // 5 오른쪽 위
      { x: 220, y: 280 }, // 6 왼쪽 아래
      { x: 320, y: 280 }  // 7 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㄷ
      [0, 1],
      [0, 2],
      [2, 3],

      // 오른쪽 ㄷ
      [4, 5],
      [4, 6],
      [6, 7]
    ],
    connectors: [1, 3, 5, 7]
  },

  // ㅃ
  'ㅃ': {
    nodes: [
      // 왼쪽 ㅂ
      { x: 80, y: 100 },  // 0 왼쪽 위
      { x: 80, y: 200 },  // 1 왼쪽 가운데
      { x: 80, y: 300 },  // 2 왼쪽 아래
      { x: 170, y: 100 }, // 3 오른쪽 위
      { x: 170, y: 200 }, // 4 오른쪽 가운데
      { x: 170, y: 300 }, // 5 오른쪽 아래

      // 오른쪽 ㅂ
      { x: 230, y: 100 }, // 6 왼쪽 위
      { x: 230, y: 200 }, // 7 왼쪽 가운데
      { x: 230, y: 300 }, // 8 왼쪽 아래
      { x: 320, y: 100 }, // 9 오른쪽 위
      { x: 320, y: 200 }, // 10 오른쪽 가운데
      { x: 320, y: 300 }  // 11 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㅂ
      [0, 1],
      [1, 2],
      [3, 4],
      [4, 5],
      [1, 4],
      [2, 5],

      // 오른쪽 ㅂ
      [6, 7],
      [7, 8],
      [9, 10],
      [10, 11],
      [7, 10],
      [8, 11]
    ],
    connectors: [
      0, 2, 3, 5,
      6, 8, 9, 11
    ]
  },

  // ㅆ
  'ㅆ': {
    nodes: [
      // 왼쪽 ㅅ
      { x: 120, y: 100 }, // 0 위
      { x: 70, y: 280 },  // 1 왼쪽 아래
      { x: 170, y: 280 }, // 2 오른쪽 아래

      // 오른쪽 ㅅ
      { x: 280, y: 100 }, // 3 위
      { x: 230, y: 280 }, // 4 왼쪽 아래
      { x: 330, y: 280 }  // 5 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㅅ
      [0, 1],
      [0, 2],

      // 오른쪽 ㅅ
      [3, 4],
      [3, 5]
    ],
    connectors: [1, 2, 4, 5]
  },

  // ㅉ
  'ㅉ': {
    nodes: [
      // 왼쪽 ㅈ
      { x: 70, y: 100 },  // 0 왼쪽 위
      { x: 120, y: 100 }, // 1 중심
      { x: 170, y: 100 }, // 2 오른쪽 위
      { x: 70, y: 280 },  // 3 왼쪽 아래
      { x: 170, y: 280 }, // 4 오른쪽 아래

      // 오른쪽 ㅈ
      { x: 230, y: 100 }, // 5 왼쪽 위
      { x: 280, y: 100 }, // 6 중심
      { x: 330, y: 100 }, // 7 오른쪽 위
      { x: 230, y: 280 }, // 8 왼쪽 아래
      { x: 330, y: 280 }  // 9 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㅈ
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],

      // 오른쪽 ㅈ
      [5, 6],
      [6, 7],
      [6, 8],
      [6, 9]
    ],
    connectors: [
      0, 2, 3, 4,
      5, 7, 8, 9
    ]
  },

    // -----------------------------------------
  // 기본 모음
  // -----------------------------------------

  // ㅏ
  'ㅏ': {
    nodes: [
      { x: 180, y: 100 }, // 0 위
      { x: 180, y: 200 }, // 1 중심
      { x: 280, y: 200 }, // 2 오른쪽
      { x: 180, y: 300 }  // 3 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
  },

  // ㅑ
  'ㅑ': {
    nodes: [
      { x: 180, y: 100 }, // 0 위
      { x: 180, y: 160 }, // 1 위쪽 갈림점
      { x: 280, y: 160 }, // 2 오른쪽 위
      { x: 180, y: 240 }, // 3 아래쪽 갈림점
      { x: 280, y: 240 }, // 4 오른쪽 아래
      { x: 180, y: 300 }  // 5 아래
    ],
    edges: [
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4]
    ],
    connectors: [0, 2, 4, 5]
  },

  // ㅓ
  'ㅓ': {
    nodes: [
      { x: 220, y: 100 }, // 0 위
      { x: 220, y: 200 }, // 1 중심
      { x: 120, y: 200 }, // 2 왼쪽
      { x: 220, y: 300 }  // 3 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
  },

  // ㅕ
  'ㅕ': {
    nodes: [
      { x: 220, y: 100 }, // 0 위
      { x: 220, y: 160 }, // 1 위쪽 갈림점
      { x: 120, y: 160 }, // 2 왼쪽 위
      { x: 220, y: 240 }, // 3 아래쪽 갈림점
      { x: 120, y: 240 }, // 4 왼쪽 아래
      { x: 220, y: 300 }  // 5 아래
    ],
    edges: [
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4]
    ],
    connectors: [0, 2, 4, 5]
  },

  // ㅗ
  'ㅗ': {
    nodes: [
      { x: 100, y: 240 }, // 0 왼쪽
      { x: 200, y: 240 }, // 1 중심
      { x: 200, y: 120 }, // 2 위
      { x: 300, y: 240 }  // 3 오른쪽
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
  },

  // ㅛ
  'ㅛ': {
    nodes: [
      { x: 100, y: 240 }, // 0 왼쪽
      { x: 160, y: 240 }, // 1 왼쪽 갈림점
      { x: 160, y: 120 }, // 2 왼쪽 위
      { x: 240, y: 240 }, // 3 오른쪽 갈림점
      { x: 240, y: 120 }, // 4 오른쪽 위
      { x: 300, y: 240 }  // 5 오른쪽
    ],
    edges: [
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4]
    ],
    connectors: [0, 2, 4, 5]
  },

  // ㅜ
  'ㅜ': {
    nodes: [
      { x: 100, y: 160 }, // 0 왼쪽
      { x: 200, y: 160 }, // 1 중심
      { x: 200, y: 280 }, // 2 아래
      { x: 300, y: 160 }  // 3 오른쪽
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
  },

  // ㅠ
  'ㅠ': {
    nodes: [
      { x: 100, y: 160 }, // 0 왼쪽
      { x: 160, y: 160 }, // 1 왼쪽 갈림점
      { x: 160, y: 280 }, // 2 왼쪽 아래
      { x: 240, y: 160 }, // 3 오른쪽 갈림점
      { x: 240, y: 280 }, // 4 오른쪽 아래
      { x: 300, y: 160 }  // 5 오른쪽
    ],
    edges: [
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4]
    ],
    connectors: [0, 2, 4, 5]
  },

  // ㅡ
  'ㅡ': {
    nodes: [
      { x: 100, y: 200 }, // 0 왼쪽
      { x: 300, y: 200 }  // 1 오른쪽
    ],
    edges: [
      [0, 1]
    ],
    connectors: [0, 1]
  },

  // ㅣ
  'ㅣ': {
    nodes: [
      { x: 200, y: 100 }, // 0 위
      { x: 200, y: 300 }  // 1 아래
    ],
    edges: [
      [0, 1]
    ],
    connectors: [0, 1]
  },

  // -----------------------------------------
  // 복합 모음
  // -----------------------------------------

  // ㅐ = ㅏ + ㅣ
  'ㅐ': {
    nodes: [
      // 왼쪽 세로
      { x: 140, y: 100 }, // 0 왼쪽 위
      { x: 140, y: 200 }, // 1 왼쪽 중심
      { x: 140, y: 300 }, // 2 왼쪽 아래

      // 오른쪽 세로
      { x: 260, y: 100 }, // 3 오른쪽 위
      { x: 260, y: 200 }, // 4 오른쪽 중심
      { x: 260, y: 300 }  // 5 오른쪽 아래
    ],
    edges: [
      // 왼쪽 세로
      [0, 1],
      [1, 2],

      // 오른쪽 세로
      [3, 4],
      [4, 5],

      // 가운데 가로획
      [1, 4]
    ],
    connectors: [0, 2, 3, 5]
  },

  // ㅒ
  'ㅒ': {
    nodes: [
      // 왼쪽 세로
      { x: 140, y: 100 }, // 0 왼쪽 위
      { x: 140, y: 160 }, // 1 왼쪽 위 갈림점
      { x: 140, y: 240 }, // 2 왼쪽 아래 갈림점
      { x: 140, y: 300 }, // 3 왼쪽 아래

      // 오른쪽 세로
      { x: 260, y: 100 }, // 4 오른쪽 위
      { x: 260, y: 160 }, // 5 오른쪽 위 갈림점
      { x: 260, y: 240 }, // 6 오른쪽 아래 갈림점
      { x: 260, y: 300 }  // 7 오른쪽 아래
    ],
    edges: [
      // 왼쪽 세로
      [0, 1],
      [1, 2],
      [2, 3],

      // 오른쪽 세로
      [4, 5],
      [5, 6],
      [6, 7],

      // 두 가로획
      [1, 5],
      [2, 6]
    ],
    connectors: [0, 3, 4, 7]
  },

  // ㅔ
  'ㅔ': {
    nodes: [
      // ㅓ
      { x: 180, y: 100 }, // 0 위
      { x: 180, y: 200 }, // 1 중심
      { x: 100, y: 200 }, // 2 왼쪽 끝
      { x: 180, y: 300 }, // 3 아래

      // ㅣ
      { x: 260, y: 100 }, // 4 위
      { x: 260, y: 300 }  // 5 아래
    ],
    edges: [
      // ㅓ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 5]
    ],
    connectors: [0, 2, 3, 4, 5]
  },

  // ㅖ
  'ㅖ': {
    nodes: [
      // ㅕ
      { x: 180, y: 100 }, // 0 위
      { x: 180, y: 160 }, // 1 위 갈림점
      { x: 100, y: 160 }, // 2 왼쪽 위 끝
      { x: 180, y: 240 }, // 3 아래 갈림점
      { x: 100, y: 240 }, // 4 왼쪽 아래 끝
      { x: 180, y: 300 }, // 5 아래

      // ㅣ
      { x: 260, y: 100 }, // 6 위
      { x: 260, y: 300 }  // 7 아래
    ],
    edges: [
      // ㅕ
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4],

      // ㅣ
      [6, 7]
    ],
    connectors: [0, 2, 4, 5, 6, 7]
  },

  // ㅘ = ㅗ + ㅏ
  'ㅘ': {
    nodes: [
      // ㅗ
      { x: 60, y: 250 },  // 0 왼쪽
      { x: 130, y: 250 }, // 1 중심
      { x: 130, y: 130 }, // 2 위
      { x: 200, y: 250 }, // 3 오른쪽

      // ㅏ
      { x: 260, y: 100 }, // 4 위
      { x: 260, y: 200 }, // 5 중심
      { x: 330, y: 200 }, // 6 오른쪽
      { x: 260, y: 300 }  // 7 아래
    ],
    edges: [
      // ㅗ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅏ
      [4, 5],
      [5, 6],
      [5, 7]
    ],
    connectors: [0, 2, 3, 4, 6, 7]
  },

  // ㅙ = ㅗ + ㅐ
  'ㅙ': {
    nodes: [
      // ㅗ
      { x: 40, y: 250 },  // 0 왼쪽
      { x: 100, y: 250 }, // 1 중심
      { x: 100, y: 130 }, // 2 위
      { x: 160, y: 250 }, // 3 오른쪽

      // ㅐ
      { x: 220, y: 100 }, // 4 왼쪽 위
      { x: 220, y: 200 }, // 5 왼쪽 중심
      { x: 220, y: 300 }, // 6 왼쪽 아래
      { x: 300, y: 100 }, // 7 오른쪽 위
      { x: 300, y: 200 }, // 8 오른쪽 중심
      { x: 300, y: 300 }  // 9 오른쪽 아래
    ],
    edges: [
      // ㅗ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅐ
      [4, 5],
      [5, 6],
      [7, 8],
      [8, 9],
      [5, 8]
    ],
    connectors: [0, 2, 3, 4, 6, 7, 9]
  },

  // ㅚ = ㅗ + ㅣ
  'ㅚ': {
    nodes: [
      // ㅗ
      { x: 70, y: 250 },  // 0 왼쪽
      { x: 140, y: 250 }, // 1 중심
      { x: 140, y: 130 }, // 2 위
      { x: 210, y: 250 }, // 3 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 4 위
      { x: 280, y: 300 }  // 5 아래
    ],
    edges: [
      // ㅗ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 5]
    ],
    connectors: [0, 2, 3, 4, 5]
  },

  // ㅝ = ㅜ + ㅓ
  'ㅝ': {
    nodes: [
      // ㅜ
      { x: 60, y: 140 },  // 0 왼쪽
      { x: 130, y: 140 }, // 1 중심
      { x: 130, y: 260 }, // 2 아래
      { x: 200, y: 140 }, // 3 오른쪽

      // ㅓ
      { x: 280, y: 100 }, // 4 위
      { x: 280, y: 200 }, // 5 중심
      { x: 220, y: 200 }, // 6 왼쪽
      { x: 280, y: 300 }  // 7 아래
    ],
    edges: [
      // ㅜ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅓ
      [4, 5],
      [5, 6],
      [5, 7]
    ],
    connectors: [0, 2, 3, 4, 6, 7]
  },

  // ㅞ = ㅜ + ㅔ
  'ㅞ': {
    nodes: [
      // ㅜ
      { x: 40, y: 140 },  // 0 왼쪽
      { x: 100, y: 140 }, // 1 중심
      { x: 100, y: 260 }, // 2 아래
      { x: 160, y: 140 }, // 3 오른쪽

      // ㅓ
      { x: 230, y: 100 }, // 4 위
      { x: 230, y: 200 }, // 5 중심
      { x: 180, y: 200 }, // 6 왼쪽
      { x: 230, y: 300 }, // 7 아래

      // ㅣ
      { x: 300, y: 100 }, // 8 위
      { x: 300, y: 300 }  // 9 아래
    ],
    edges: [
      // ㅜ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅓ
      [4, 5],
      [5, 6],
      [5, 7],

      // ㅣ
      [8, 9]
    ],
    connectors: [0, 2, 3, 4, 6, 7, 8, 9]
  },

  // ㅟ = ㅜ + ㅣ
  'ㅟ': {
    nodes: [
      // ㅜ
      { x: 60, y: 140 },  // 0 왼쪽
      { x: 130, y: 140 }, // 1 중심
      { x: 130, y: 260 }, // 2 아래
      { x: 200, y: 140 }, // 3 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 4 위
      { x: 280, y: 300 }  // 5 아래
    ],
    edges: [
      // ㅜ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 5]
    ],
    connectors: [0, 2, 3, 4, 5]
  },

    // ㅢ = ㅡ + ㅣ
  'ㅢ': {
    nodes: [
      // ㅡ
      { x: 60, y: 200 },  // 0 왼쪽
      { x: 200, y: 200 }, // 1 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 2 위
      { x: 280, y: 300 }  // 3 아래
    ],
    edges: [
      // ㅡ
      [0, 1],

      // ㅣ
      [2, 3]
    ],
    connectors: [0, 1, 2, 3]
  }

};


// =====================================================
// 3. HANGUL DATA
// 완성형 한글을 초성 / 중성 / 종성으로 분해하기 위한 표
// =====================================================

// 초성
const CHOSEONG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
  "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

// 중성
const JUNGSEONG = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
];

// 종성
const JONGSEONG = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
  "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];



// =====================================================
// 4. STATE
// 실행 중 계속 바뀌는 값
// =====================================================

// 캔버스
let canvas;

// 생성된 자모 개체
let jamoInstances = [];

// 현재 마우스로 잡고 있는 물리점
// 잡고 있지 않으면 null
let draggedPoint = null;

// 조작 UI
let pointCountSlider;
let textInput;
let generateButton;


// =====================================================
// 5. SETUP
// 페이지가 시작될 때 한 번만 실행
// =====================================================

function setup() {
  // 브라우저 크기에 맞춰 캔버스 생성
  canvas = createCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.position(PAGE_MARGIN, PAGE_MARGIN);

  // 각 edge 사이에 추가할 물리점 개수
  pointCountSlider = createSlider(0, 10, 2, 1);

  // Point Count 변경 시 현재 글자를 새 물리구조로 다시 생성
  pointCountSlider.changed(generateJamosFromInput);

  // 한글 입력창
  textInput = createInput("가");
  textInput.size(130);

  // Enter 키도 생성 버튼과 같은 기능
  textInput.elt.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      generateJamosFromInput();
    }
  });

  // 생성 버튼
  generateButton = createButton("생성");
  generateButton.mousePressed(generateJamosFromInput);

  // UI 배치
  positionControls();

  // 처음 한 번 자모 생성
  generateJamosFromInput();
}


// -----------------------------------------
// UI 위치
// -----------------------------------------

// 슬라이더 / 입력창 / 생성 버튼을 캔버스 아래 가운데에 배치
function positionControls() {
  const centerX = PAGE_MARGIN + width / 2;
  const controlTop = PAGE_MARGIN + height;

  pointCountSlider.position(centerX - 90, controlTop + 18);
  textInput.position(centerX - 105, controlTop + 52);
  generateButton.position(centerX + 45, controlTop + 52);
}

// =====================================================
// 6. DRAW
// 매 프레임 물리를 계산하고 화면을 다시 그림
// =====================================================

function draw() {
  background(255);

  // 마우스 커서와 connector 반응 계산
  updatePointCursor();
  applyConnectorMagnetism();

  // 모든 자모의 물리 계산
  for (let i = 0; i < jamoInstances.length; i++) {
    const instance = jamoInstances[i];
    updateJamoPhysics(instance, i);
  }

  // 물리 계산 후 connector 스냅
  applyConnectorSnap();

  // 모든 자모 그리기
  for (const instance of jamoInstances) {
    drawJamo(instance);
  }

  // 현재 Point Count 표시
  fill(0);
  noStroke();
  text("Point Count: " + pointCountSlider.value(), 10, 390);
}


// =====================================================
// 7. JAMO DRAWING + PHYSICS
// 자모의 물리 구조를 만들고 움직임과 화면 표시를 처리
// =====================================================


// -----------------------------------------
// 자모 그리기
// -----------------------------------------

// 현재 물리점과 스프링 위치를 이용해 자모를 그림
function drawJamo(instance) {
  // 점 사이의 스프링
  stroke(0);
  strokeWeight(2);

  for (const spring of instance.physicsSprings) {
    const pointA = instance.physicsPoints[spring.a];
    const pointB = instance.physicsPoints[spring.b];

    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }

  // 관절은 검은 점, 추가된 물리점은 흰 점
  for (const point of instance.physicsPoints) {
    if (point.isJoint) {
      fill(0);
      noStroke();
      circle(point.x, point.y, JOINT_SIZE);
    } else {
      fill(255);
      stroke(0);
      strokeWeight(1);
      circle(point.x, point.y, MIDDLE_POINT_SIZE);
    }
  }

  // connector 확인용 원
  for (const pointIndex of instance.connectorPointIndices) {
    const point = instance.physicsPoints[pointIndex];

    noFill();
    stroke(0);
    strokeWeight(1);
    circle(point.x, point.y, CONNECTOR_SIZE);
  }
}


// -----------------------------------------
// 물리 계산
// -----------------------------------------

// 연결된 점이 원래 간격을 유지하도록 스프링 힘을 계산
function updateJamoPhysics(instance, instanceIndex) {
  const points = instance.physicsPoints;
  const springs = instance.physicsSprings;

  // 스프링이 늘어나거나 줄어든 만큼 양쪽 점에 힘 적용
  for (const spring of springs) {
    const pointA = points[spring.a];
    const pointB = points[spring.b];

    const deltaX = pointB.x - pointA.x;
    const deltaY = pointB.y - pointA.y;
    const currentLength = Math.hypot(deltaX, deltaY);

    if (currentLength === 0) {
      continue;
    }

    const stretch = currentLength - spring.restLength;
    const force = stretch * SPRING_STIFFNESS;

    const forceX = (deltaX / currentLength) * force;
    const forceY = (deltaY / currentLength) * force;

    pointA.vx += forceX;
    pointA.vy += forceY;

    pointB.vx -= forceX;
    pointB.vy -= forceY;
  }

  // 속도를 줄이면서 실제 위치 이동
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = points[pointIndex];

    // 잡고 있는 점은 마우스 위치에 고정
    if (
      draggedPoint !== null &&
      draggedPoint.instanceIndex === instanceIndex &&
      draggedPoint.pointIndex === pointIndex
    ) {
      point.x = mouseX;
      point.y = mouseY;
      point.vx = 0;
      point.vy = 0;
      continue;
    }

    point.vx *= POINT_DAMPING;
    point.vy *= POINT_DAMPING;

    const speed = Math.hypot(point.vx, point.vy);

    // 너무 빠르게 튀는 것을 제한
    if (speed > MAX_POINT_SPEED) {
      point.vx = (point.vx / speed) * MAX_POINT_SPEED;
      point.vy = (point.vy / speed) * MAX_POINT_SPEED;
    }

    point.x += point.vx;
    point.y += point.vy;
  }
}


// -----------------------------------------
// 물리 구조 생성
// -----------------------------------------

// JAMO의 nodes와 Point Count를 실제 물리점과 스프링으로 변환
function createPhysicsStructure(jamoType, offsetX, offsetY, pointCount) {
  const jamo = JAMO[jamoType];

  const physicsPoints = [];
  const physicsSprings = [];

  // 기본 관절 생성
  const jointPointIndices = jamo.nodes.map((node, nodeIndex) => {
    const pointIndex = physicsPoints.length;

    physicsPoints.push({
      x: node.x + offsetX,
      y: node.y + offsetY,
      vx: 0,
      vy: 0,
      isJoint: true,
      sourceNodeIndex: nodeIndex,
    });

    return pointIndex;
  });

  // 각 edge 사이에 Point Count만큼 물리점 추가
  for (const edge of jamo.edges) {
    const startNodeIndex = edge[0];
    const endNodeIndex = edge[1];

    const startNode = jamo.nodes[startNodeIndex];
    const endNode = jamo.nodes[endNodeIndex];

    let previousPointIndex = jointPointIndices[startNodeIndex];

    for (let i = 1; i <= pointCount; i++) {
      const t = i / (pointCount + 1);
      const pointIndex = physicsPoints.length;

      physicsPoints.push({
        x: startNode.x + (endNode.x - startNode.x) * t + offsetX,
        y: startNode.y + (endNode.y - startNode.y) * t + offsetY,
        vx: 0,
        vy: 0,
        isJoint: false,
        sourceNodeIndex: null,
      });

      addPhysicsSpring(
        physicsPoints,
        physicsSprings,
        previousPointIndex,
        pointIndex
      );

      previousPointIndex = pointIndex;
    }

    // 마지막 중간점과 끝 관절 연결
    addPhysicsSpring(
      physicsPoints,
      physicsSprings,
      previousPointIndex,
      jointPointIndices[endNodeIndex]
    );
  }

  // connector는 기존 관절 위치를 사용
  const connectorPointIndices = jamo.connectors.map(
    (nodeIndex) => jointPointIndices[nodeIndex]
  );

  return {
    physicsPoints,
    physicsSprings,
    connectorPointIndices,
  };
}


// -----------------------------------------
// 스프링 생성
// -----------------------------------------

// 두 물리점을 연결하고 처음 거리를 원래 길이로 저장
function addPhysicsSpring(points, springs, pointIndexA, pointIndexB) {
  const pointA = points[pointIndexA];
  const pointB = points[pointIndexB];

  springs.push({
    a: pointIndexA,
    b: pointIndexB,
    restLength: Math.hypot(
      pointB.x - pointA.x,
      pointB.y - pointA.y
    ),
  });
}


// =====================================================
// 8. CONNECTOR
// 같은 음절의 자모 결합점끼리 자석 반응과 스냅을 처리
// =====================================================


// -----------------------------------------
// 자석 반응
// -----------------------------------------

// 가까운 connector끼리 서로 끌어당김
function applyConnectorMagnetism() {
  // 모든 자모 조합 비교
  for (let i = 0; i < jamoInstances.length; i++) {
    const a = jamoInstances[i];

    for (let j = i + 1; j < jamoInstances.length; j++) {
      const b = jamoInstances[j];

      // 다른 음절에서 나온 자모끼리는 반응하지 않음
      if (a.syllableId !== b.syllableId) {
        continue;
      }

      // 두 자모의 모든 connector 조합 확인
      for (const aIndex of a.connectorPointIndices) {
        for (const bIndex of b.connectorPointIndices) {
          const pointA = a.physicsPoints[aIndex];
          const pointB = b.physicsPoints[bIndex];

          const dx = pointB.x - pointA.x;
          const dy = pointB.y - pointA.y;
          const distance = Math.hypot(dx, dy);

          // 자석 범위 밖이면 반응하지 않음
          if (distance === 0 || distance > MAGNET_RADIUS) {
            continue;
          }

          // 가까울수록 자석 힘이 강해짐
          const strength =
            (1 - distance / MAGNET_RADIUS) * MAGNET_FORCE;

          const nx = dx / distance;
          const ny = dy / distance;

          // 서로 반대 방향으로 같은 힘 적용
          pointA.vx += nx * strength;
          pointA.vy += ny * strength;

          pointB.vx -= nx * strength;
          pointB.vy -= ny * strength;
        }
      }
    }
  }
}


// -----------------------------------------
// 스냅
// -----------------------------------------

// 가까운 connector 쌍을 같은 위치로 맞춤
function applyConnectorSnap() {
  // 서로 다른 자모 두 개씩 비교
  for (let i = 0; i < jamoInstances.length; i++) {
    const a = jamoInstances[i];

    for (let j = i + 1; j < jamoInstances.length; j++) {
      const b = jamoInstances[j];

      // 다른 음절끼리는 스냅하지 않음
      if (a.syllableId !== b.syllableId) {
        continue;
      }

      const candidates = [];

      // 스냅 거리 안에 있는 모든 connector 조합 찾기
      for (const aIndex of a.connectorPointIndices) {
        const pointA = a.physicsPoints[aIndex];

        for (const bIndex of b.connectorPointIndices) {
          const pointB = b.physicsPoints[bIndex];

          const distance = Math.hypot(
            pointB.x - pointA.x,
            pointB.y - pointA.y
          );

          if (distance <= SNAP_DISTANCE) {
            candidates.push({
              aIndex,
              bIndex,
              distance,
            });
          }
        }
      }

      // 가까운 쌍부터 처리
      candidates.sort(
        (first, second) => first.distance - second.distance
      );

      for (const candidate of candidates) {
        const pointA = a.physicsPoints[candidate.aIndex];
        const pointB = b.physicsPoints[candidate.bIndex];

        // 두 connector의 가운데 위치
        const snapX = (pointA.x + pointB.x) / 2;
        const snapY = (pointA.y + pointB.y) / 2;

        // 같은 위치로 스냅
        pointA.x = snapX;
        pointA.y = snapY;
        pointB.x = snapX;
        pointB.y = snapY;

        // 흔들림 제거
        pointA.vx = 0;
        pointA.vy = 0;
        pointB.vx = 0;
        pointB.vy = 0;
      }
    }
  }
}


// =====================================================
// 9. INTERACTION
// 물리점을 마우스로 선택하고 드래그
// =====================================================


// -----------------------------------------
// 마우스 커서
// -----------------------------------------

// 마우스가 물리점 위에 있으면 손 모양 커서로 변경
function updatePointCursor() {
  let isOverPoint = false;

  for (const instance of jamoInstances) {
    for (const point of instance.physicsPoints) {
      const distance = Math.hypot(
        mouseX - point.x,
        mouseY - point.y
      );

      if (distance <= POINT_PICK_RADIUS) {
        isOverPoint = true;
        break;
      }
    }

    if (isOverPoint) {
      break;
    }
  }

  cursor(isOverPoint ? HAND : ARROW);
}


// -----------------------------------------
// 점 선택
// -----------------------------------------

// 마우스와 가장 가까운 물리점 하나를 선택
function mousePressed() {
  let closestPoint = null;
  let closestDistance = POINT_PICK_RADIUS;

  // 뒤에 그려진 자모부터 검사
  for (
    let instanceIndex = jamoInstances.length - 1;
    instanceIndex >= 0;
    instanceIndex--
  ) {
    const points = jamoInstances[instanceIndex].physicsPoints;

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      const point = points[pointIndex];
      const distance = Math.hypot(
        mouseX - point.x,
        mouseY - point.y
      );

      if (distance < closestDistance) {
        closestDistance = distance;

        closestPoint = {
          instanceIndex,
          pointIndex,
        };
      }
    }
  }

  draggedPoint = closestPoint;

  if (draggedPoint !== null) {
    const point =
      jamoInstances[draggedPoint.instanceIndex].physicsPoints[
        draggedPoint.pointIndex
      ];

    point.vx = 0;
    point.vy = 0;
  }
}


// -----------------------------------------
// 드래그
// -----------------------------------------

// 선택한 점만 마우스 위치로 이동
// 나머지 점은 스프링 힘으로 따라옴
function mouseDragged() {
  if (draggedPoint === null) {
    return;
  }

  const point =
    jamoInstances[draggedPoint.instanceIndex].physicsPoints[
      draggedPoint.pointIndex
    ];

  point.x = mouseX;
  point.y = mouseY;
  point.vx = 0;
  point.vy = 0;
}


// -----------------------------------------
// 드래그 종료
// -----------------------------------------

// 마우스를 놓으면 다시 일반 물리점으로 돌아감
function mouseReleased() {
  draggedPoint = null;
}


// =====================================================
// 10. HANGUL INPUT
// 입력된 글자를 분해하고 자모 개체를 생성
// =====================================================

function generateJamosFromInput() {
  const inputText = textInput.value().trim();
  const pointCount = pointCountSlider.value();

  // 기존 자모와 드래그 상태 초기화
  jamoInstances = [];
  draggedPoint = null;

  const generatedJamos = [];

  // 각 글자를 초성 / 중성 / 종성으로 분해
  for (let syllableId = 0; syllableId < inputText.length; syllableId++) {
    const character = inputText[syllableId];
    const decomposedJamos = decomposeHangulSyllable(character);

    // JAMO 데이터에 정의된 자모만 생성
    for (const jamoType of decomposedJamos) {
      if (JAMO[jamoType]) {
        generatedJamos.push({
          type: jamoType,
          syllableId,
        });
      }
    }
  }

  // -----------------------------------------
  // 자모 배치
  // -----------------------------------------

  // 여러 자모가 화면 중앙에 오도록 가로로 배치
  const gap = 220;
  const startOffsetX =
    width / 2 - 200 - ((generatedJamos.length - 1) * gap) / 2;

  for (let i = 0; i < generatedJamos.length; i++) {
    const jamo = generatedJamos[i];

    const instanceX = startOffsetX + i * gap;
    const instanceY = height / 2 - 200;

    const physics = createPhysicsStructure(
      jamo.type,
      instanceX,
      instanceY,
      pointCount
    );

    jamoInstances.push({
      type: jamo.type,
      syllableId: jamo.syllableId,
      physicsPoints: physics.physicsPoints,
      physicsSprings: physics.physicsSprings,
      connectorPointIndices: physics.connectorPointIndices,
    });
  }
}


// =====================================================
// 11. HANGUL DECOMPOSITION
// 완성형 한글 한 글자를 초성 / 중성 / 종성으로 분해
// =====================================================

function decomposeHangulSyllable(character) {
  // 낱자 자모를 직접 입력한 경우 그대로 사용
  if (JAMO[character]) {
    return [character];
  }

  const characterCode = character.charCodeAt(0);

  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;

  // 완성형 한글 범위가 아니면 사용하지 않음
  if (characterCode < HANGUL_START || characterCode > HANGUL_END) {
    return [];
  }

  const syllableIndex = characterCode - HANGUL_START;

  // 한글 유니코드 규칙으로 초성 / 중성 / 종성 번호 계산
  const choseongIndex = Math.floor(syllableIndex / 588);
  const jungseongIndex = Math.floor((syllableIndex % 588) / 28);
  const jongseongIndex = syllableIndex % 28;

  const decomposedResult = [
    CHOSEONG[choseongIndex],
    JUNGSEONG[jungseongIndex],
  ];

  // 받침이 있으면 종성 추가
  if (JONGSEONG[jongseongIndex] !== "") {
    decomposedResult.push(JONGSEONG[jongseongIndex]);
  }

  return decomposedResult;
}


// =====================================================
// 12. RESPONSIVE CANVAS
// 창 크기가 바뀌면 캔버스와 UI 위치를 다시 계산
// =====================================================

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.position(PAGE_MARGIN, PAGE_MARGIN);

  positionControls();
}