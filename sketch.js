// =====================================================
// 1. SETTINGS
// 프로젝트 전체에서 공통으로 사용하는 조절값
// =====================================================

// 브라우저 가장자리와 캔버스 사이 여백
const PAGE_MARGIN = 24;

// 캔버스 아래 입력 UI가 들어갈 공간
const CONTROL_AREA_HEIGHT = 110;

// -----------------------------------------
// 점 크기 / 마우스 선택 범위
// -----------------------------------------

const JOINT_SIZE = 18;
const MIDDLE_POINT_SIZE = 14;
const CONNECTOR_SIZE = 28;

// 마우스로 점을 잡을 수 있는 범위
const POINT_PICK_RADIUS = 20;

// =====================================================
// POINT PHYSICS
// 점들이 연결되어 움직이는 느낌을 조절
// =====================================================

// 연결된 점들이 원래 간격을 유지하려는 힘
// 높이면: 더 빳빳하고 빨리 따라옴
// 낮추면: 더 늘어지고 말랑함
// 기존값: 0.08
const SPRING_STIFFNESS = 0.05;


// 움직임이 얼마나 오래 남는지 조절
// 1에 가까울수록: 흔들림이 오래 감
// 낮을수록: 빨리 멈춤
// 기존값: 0.86
const POINT_DAMPING = 0.86;


// 점이 너무 빠르게 튀는 것을 제한
// 높이면: 더 빠르고 거칠게 움직임
// 낮추면: 더 안정적으로 움직임
// 기존값: 25
const MAX_POINT_SPEED = 20;

// -----------------------------------------
// 반응형 캔버스 크기 계산
// -----------------------------------------

// 현재 브라우저 크기를 기준으로 캔버스 너비 계산
function getCanvasWidth() {
  return Math.max(300, windowWidth - PAGE_MARGIN * 2);
}

// 입력 UI 공간을 제외한 캔버스 높이 계산
function getCanvasHeight() {
  return Math.max(300, windowHeight - PAGE_MARGIN * 2 - CONTROL_AREA_HEIGHT);
}

// =====================================================
// 2. JAMO DATA
// 각 자모의 최소 관절(nodes), 선(edges), 결합점(connectors)
// =====================================================

const JAMO = {

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

      // 두 가로획
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
  // 현재 선 기반 시스템이라 원을 8개의 관절로 표현
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
      // ㅈ의 위 가로획
      [0, 1],
      [1, 2],

      // 중심에서 위로 올라오는 추가 획
      [1, 3],

      // 아래 갈라지는 두 획
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

      // 두 세로획
      [1, 5],
      [2, 6]
    ],

  connectors: [0, 3, 4, 7]
},

  // ㅎ
  'ㅎ': {
    nodes: [
      // ㅊ과 같은 윗부분
      { x: 140, y: 110 }, // 0 왼쪽
      { x: 200, y: 110 }, // 1 중심
      { x: 260, y: 110 }, // 2 오른쪽
      { x: 200, y: 50 },  // 3 위쪽 꼭지


      // 기존 ㅇ의 8관절 구조를 그대로 아래로 이동
      { x: 200, y: 170 }, // 4  위
      { x: 270, y: 200 }, // 5  오른쪽 위
      { x: 300, y: 270 }, // 6  오른쪽
      { x: 270, y: 340 }, // 7  오른쪽 아래
      { x: 200, y: 370 }, // 8  아래
      { x: 130, y: 340 }, // 9  왼쪽 아래
      { x: 100, y: 270 }, // 10 왼쪽
      { x: 130, y: 200 }  // 11 왼쪽 위
    ],

    edges: [
      // ㅊ과 같은 윗부분
      [0, 1],
      [1, 2],
      [1, 3],


      // ㅇ
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 4]
    ],

    connectors: [
      // 윗부분
      0, 2, 3,

      // ㅇ의 기존 connector 위치와 동일
      4, 6, 8, 10
    ]
  },


  // ㅏ
  'ㅏ': {
    nodes: [
      { x: 180, y: 100 },
      { x: 180, y: 200 },
      { x: 280, y: 200 },
      { x: 180, y: 300 }
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
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
      { x: 80,  y: 120 }, // 0 왼쪽 위
      { x: 180, y: 120 }, // 1 오른쪽 위
      { x: 80,  y: 280 }, // 2 왼쪽 아래
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
      { x: 80,  y: 100 }, // 0 왼쪽 위
      { x: 80,  y: 200 }, // 1 왼쪽 가운데
      { x: 80,  y: 300 }, // 2 왼쪽 아래

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
      { x: 70,  y: 280 }, // 1 왼쪽 아래
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
      { x: 70,  y: 100 }, // 0 왼쪽 위
      { x: 120, y: 100 }, // 1 중심
      { x: 170, y: 100 }, // 2 오른쪽 위
      { x: 70,  y: 280 }, // 3 왼쪽 아래
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


  // =====================================================
  // 기본 모음
  // =====================================================

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
  // 확장 / 복합 모음
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

      // 오른쪽 ㅣ
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

      // 오른쪽 ㅣ
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
};




// =====================================================
// 3. HANGUL DATA
// 완성형 한글을 초성 / 중성 / 종성으로 분해하기 위한 표
// =====================================================

const CHOSEONG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNGSEONG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONGSEONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// =====================================================
// 4. STATE
// 실행 중 계속 바뀌는 값
// =====================================================

// =====================================================
// 4. STATE
// =====================================================

// 현재 화면의 글자
let jamoInstances = [];

// 이전에 생성된 글자
// 현재 글자가 생성되면 이 배열로 이동한다.
let backgroundJamoInstances = [];

// 마우스로 잡고 있는 점
let draggedPoint = null;

// UI
let pointCountSlider;
let textInput;
let generateButton;

// 마지막으로 생성된 입력값
let lastInputText = "";

// 한글 IME 상태
let isComposing = false;

// 입력 지연 타이머
let inputGenerateTimer = null;


// =====================================================
// 5. SETUP
// =====================================================

function setup() {

  // ---------------------------------------------------
  // 캔버스 생성
  // ---------------------------------------------------

  canvas =
    createCanvas(
      getCanvasWidth(),
      getCanvasHeight()
    );

  canvas.position(
    PAGE_MARGIN,
    PAGE_MARGIN
  );


  // ---------------------------------------------------
  // Point Count
  // ---------------------------------------------------

  pointCountSlider =
    createSlider(
      0,
      10,
      2,
      1
    );


  pointCountSlider.changed(
    () => {

      // Point Count 변경 시에는
      // 기존 글자를 배경으로 보내지 않는다.
      generateJamosFromInput(
        false
      );

    }
  );


  // ---------------------------------------------------
  // 한글 입력창
  // ---------------------------------------------------

  textInput =
    createInput("가");

  textInput.size(130);


  // ---------------------------------------------------
  // 생성 버튼
  // ---------------------------------------------------

  generateButton =
    createButton("생성");


  generateButton.mousePressed(
    () => {

      generateJamosFromInput(
        true
      );

    }
  );


  // ===================================================
  // 한글 입력 감지
  // ===================================================

  // 한글 조합 시작
  textInput.elt.addEventListener(
    "compositionstart",
    () => {

      isComposing = true;

    }
  );


  // 한글 조합 완료
  textInput.elt.addEventListener(
    "compositionend",
    () => {

      isComposing = false;

      scheduleInputGeneration();

    }
  );


  // 일반 입력
  textInput.elt.addEventListener(
    "input",
    () => {

      if (isComposing) {
        return;
      }

      scheduleInputGeneration();

    }
  );


  // ---------------------------------------------------
  // UI 배치
  // ---------------------------------------------------

  positionControls();


  // ---------------------------------------------------
  // 처음 시작할 때 "가" 생성
  // ---------------------------------------------------

  generateJamosFromInput(
    false
  );
}


// =====================================================
// 입력이 변경되었을 때
// =====================================================

function scheduleInputGeneration() {

  clearTimeout(
    inputGenerateTimer
  );


  inputGenerateTimer =
    setTimeout(
      () => {

        const currentText =
          textInput.value().trim();


        if (
          currentText.length === 0
        ) {

          return;

        }


        // 현재 입력 전체가
        // 이전 입력과 같으면 아무것도 하지 않음
        if (
          currentText ===
          lastInputText
        ) {

          return;

        }


        // ------------------------------------------------
        // 핵심
        //
        // 새로 입력된 마지막 한 글자만 생성한다.
        //
        // 예:
        //
        // 가
        // ↓
        // 가 생성
        //
        // 가나다
        // ↓
        // 가 → 배경
        // 나 → 배경
        // 다 → 현재
        // ------------------------------------------------

        const newCharacter =
          currentText[
            currentText.length - 1
          ];


        generateSingleCharacter(
          newCharacter,
          true
        );

      },
      180
    );
}


// =====================================================
// UI POSITION
// =====================================================

function positionControls() {

  const centerX =
    PAGE_MARGIN +
    width / 2;


  const controlTop =
    PAGE_MARGIN +
    height;


  pointCountSlider.position(
    centerX - 90,
    controlTop + 18
  );


  textInput.position(
    centerX - 105,
    controlTop + 52
  );


  generateButton.position(
    centerX + 45,
    controlTop + 52
  );
}

// =====================================================
// 6. DRAW
// 매 프레임 물리를 계산하고 화면을 다시 그림
// =====================================================

function draw() {

  background(255);


  // -----------------------------------------
  // 이전 글자
  // -----------------------------------------

  // =====================================================
// BACKGROUND MOTION
// =====================================================

// =====================================================
// BACKGROUND MOTION
// =====================================================

function updateBackgroundJamos() {

  const time =
    millis() * 0.001;


  for (
    const instance
    of backgroundJamoInstances
  ) {

    // -----------------------------------------
    // 아주 느린 전체 이동
    // -----------------------------------------

    instance.driftX +=
      instance.driftVX;

    instance.driftY +=
      instance.driftVY;


    // -----------------------------------------
    // 방향이 아주 천천히 변화
    // → 직선 운동처럼 보이지 않게
    // -----------------------------------------

    instance.driftVX +=
      sin(
        time * 0.15 +
        instance.motionSeed
      ) *
      0.00025;


    instance.driftVY +=
      cos(
        time * 0.13 +
        instance.motionSeed
      ) *
      0.00025;


    instance.driftVX =
      constrain(
        instance.driftVX,
        -0.25,
        0.25
      );


    instance.driftVY =
      constrain(
        instance.driftVY,
        -0.20,
        0.20
      );


    // -----------------------------------------
    // 각각의 물리점이 조금씩 꿈틀거림
    // -----------------------------------------

    for (
      let i = 0;
      i < instance.physicsPoints.length;
      i++
    ) {

      const point =
        instance.physicsPoints[i];


      const base =
        instance.backgroundBasePositions[i];


      if (!base) {
        continue;
      }


      // 서로 다른 점이 서로 다른 타이밍으로 움직임
      const waveX =
        sin(
          time *
          instance.wiggleSpeed +

          i *
          0.55 +

          instance.motionSeed
        );


      const waveY =
        cos(
          time *
          instance.wiggleSpeed *
          0.8 +

          i *
          0.37 +

          instance.motionSeed
        );


      point.x =
        base.x +
        instance.driftX +
        waveX *
        instance.wiggleAmount;


      point.y =
        base.y +
        instance.driftY +
        waveY *
        instance.wiggleAmount;

    }
  }


  // -----------------------------------------
  // 화면 밖으로 완전히 나간 글자는 삭제
  //
  // 화면 가장자리에서 충돌하지 않는다.
  // -----------------------------------------

  const margin =
    300;


  backgroundJamoInstances =
    backgroundJamoInstances.filter(
      instance => {

        const x =
          instance.centerX +
          instance.driftX;


        const y =
          instance.centerY +
          instance.driftY;


        return !(
          x < -margin ||
          x > width + margin ||
          y < -margin ||
          y > height + margin
        );

      }
    );
}

// =====================================================
// BACKGROUND DRAW
// =====================================================

function drawBackgroundJamo(
  instance
) {

  drawingContext.globalAlpha =
    instance.backgroundOpacity;


  drawJamo(
    instance
  );


  drawingContext.globalAlpha =
    1.0;
}

// =====================================================
// 7. JAMO DRAWING
// 글자의 기존 뼈대는 그대로 유지하고
// 그 위에 3가지 서로 다른 세균 질감을 입힌다.
//
// textureStyle
// 0 = RED   : 가늘고 길게 뻗은 세균 섬유
// 1 = YELLOW: 부드럽게 뭉친 세균 군집
// 2 = BLUE  : 모루/철사처럼 털이 빽빽하게 붙은 세균
// =====================================================

function drawJamo(instance) {

  if (instance.textureStyle === 0) {

    drawRedBacteria(instance);

  } else if (instance.textureStyle === 1) {

    drawYellowBacteria(instance);

  } else {

    drawBlueBacteria(instance);

  }
}



// =====================================================
// 🔴 RED
// =====================================================

function drawRedBacteria(instance) {

  const points =
    instance.physicsPoints;


  // ---------------------------------------------------
  // 1. 글자의 뼈대를 따라가는 기본 세균 줄기
  // ---------------------------------------------------

  for (const spring of instance.physicsSprings) {

    const a =
      points[spring.a];

    const b =
      points[spring.b];


    const dx =
      b.x - a.x;

    const dy =
      b.y - a.y;


    const length =
      Math.hypot(dx, dy);


    if (length === 0) continue;


    // 아주 약한 붉은 주변 번짐
    stroke(
      190,
      30,
      30,
      30
    );

    strokeWeight(6);

    line(
      a.x,
      a.y,
      b.x,
      b.y
    );


    // 실제 가느다란 세균 줄기
    stroke(
      175,
      25,
      25,
      210
    );

    strokeWeight(2.2);

    line(
      a.x,
      a.y,
      b.x,
      b.y
    );


    // -------------------------------------------------
    // 2. 줄기 주변에 작은 세균 돌기
    // -------------------------------------------------

    const count =
      Math.max(
        2,
        Math.floor(length / 24)
      );


    for (
      let i = 1;
      i < count;
      i++
    ) {

      const t =
        i / count;


      const x =
        a.x + dx * t;

      const y =
        a.y + dy * t;


      const nx =
        -dy / length;

      const ny =
        dx / length;


      const side =
        noise(
          x * 0.03,
          y * 0.03
        ) > 0.5
          ? 1
          : -1;


      const branchLength =
        6 +
        noise(
          y * 0.02,
          x * 0.02
        ) * 8;


      // 가는 가지
      stroke(
        205,
        45,
        40,
        145
      );

      strokeWeight(0.9);


      line(
        x,
        y,

        x +
        nx *
        branchLength *
        side,

        y +
        ny *
        branchLength *
        side
      );


      // 작은 결절
      noStroke();

      fill(
        185,
        30,
        30,
        180
      );

      circle(
        x,
        y,
        5 +
        noise(x, y) * 4
      );
    }
  }


  // ---------------------------------------------------
  // 3. 관절은 조금 더 밀도 있게
  // ---------------------------------------------------

  for (const point of points) {

    if (!point.isJoint) continue;


    noStroke();


    fill(
      190,
      30,
      30,
      30
    );

    circle(
      point.x,
      point.y,
      32
    );


    fill(
      175,
      25,
      25,
      210
    );

    circle(
      point.x,
      point.y,
      13
    );


    fill(
      235,
      75,
      65,
      100
    );

    circle(
      point.x - 2,
      point.y - 2,
      4
    );
  }
}



// =====================================================
// 🟡 YELLOW
// =====================================================

function drawYellowBacteria(instance) {

  const points =
    instance.physicsPoints;


  for (const spring of instance.physicsSprings) {

    const a =
      points[spring.a];

    const b =
      points[spring.b];


    const dx =
      b.x - a.x;

    const dy =
      b.y - a.y;


    const length =
      Math.hypot(dx, dy);


    if (length === 0) continue;


    // -------------------------------------------------
    // 선을 직접 그리지 않고
    // 선 위에 작은 둥근 입자들을 겹친다.
    // -------------------------------------------------

    const count =
      Math.max(
        5,
        Math.ceil(length / 10)
      );


    for (
      let i = 0;
      i <= count;
      i++
    ) {

      const t =
        i / count;


      const x =
        a.x + dx * t;

      const y =
        a.y + dy * t;


      // ------------------------------------------------
      // 크기를 너무 불규칙하게 하지 않는다.
      // → 부드럽고 귀여운 군집 느낌
      // ------------------------------------------------

      const n =
        noise(
          x * 0.035 +
          instance.syllableId * 17,

          y * 0.035
        );


      const size =
        7 +
        n * 8;


      noStroke();


      // ------------------------------------------------
      // 아주 약한 외곽 확산
      // ------------------------------------------------

      fill(
        240,
        190,
        35,
        12
      );

      circle(
        x,
        y,
        size * 2.8
      );


      // ------------------------------------------------
      // 부드러운 중간층
      // ------------------------------------------------

      fill(
        235,
        180,
        30,
        45
      );

      circle(
        x,
        y,
        size * 1.8
      );


      // ------------------------------------------------
      // 실제 작은 세균 입자
      // ------------------------------------------------

      fill(
        224,
        170,
        25,
        180
      );

      circle(
        x,
        y,
        size
      );


      // ------------------------------------------------
      // 아주 작은 밝은 부분
      // ------------------------------------------------

      fill(
        255,
        215,
        75,
        90
      );

      circle(
        x - size * 0.2,
        y - size * 0.2,
        size * 0.28
      );
    }
  }


  // ---------------------------------------------------
  // 관절은 여러 입자가 뭉친 것처럼 처리
  // ---------------------------------------------------

  for (const point of points) {

    if (!point.isJoint) continue;


    noStroke();


    // 넓은 부드러운 영역
    fill(
      240,
      185,
      30,
      20
    );

    circle(
      point.x,
      point.y,
      40
    );


    // 작은 입자 여러 개
    for (
      let i = 0;
      i < 5;
      i++
    ) {

      const angle =
        TWO_PI * i / 5;


      const radius =
        4 +
        noise(
          point.x + i,
          point.y
        ) * 5;


      fill(
        225,
        170,
        25,
        190
      );


      circle(
        point.x +
        cos(angle) *
        radius,

        point.y +
        sin(angle) *
        radius,

        8 +
        noise(i, point.x) * 5
      );
    }


    // 중앙 입자
    fill(
      230,
      175,
      25,
      200
    );

    circle(
      point.x,
      point.y,
      11
    );
  }
}



// =====================================================
// 🔵 BLUE
// =====================================================

function drawBlueBacteria(instance) {

  const points =
    instance.physicsPoints;


  // ---------------------------------------------------
  // 1. 글자의 뼈대
  // ---------------------------------------------------

  for (const spring of instance.physicsSprings) {

    const a =
      points[spring.a];

    const b =
      points[spring.b];


    const dx =
      b.x - a.x;

    const dy =
      b.y - a.y;


    const length =
      Math.hypot(dx, dy);


    if (length === 0) continue;


    const nx =
      -dy / length;

    const ny =
      dx / length;


    // -------------------------------------------------
    // 안쪽의 굵은 파란 철사
    // -------------------------------------------------

    stroke(
      20,
      90,
      175,
      230
    );

    strokeWeight(5);


    line(
      a.x,
      a.y,
      b.x,
      b.y
    );


    // -------------------------------------------------
    // 철사 위의 밝은 중심
    // -------------------------------------------------

    stroke(
      45,
      125,
      210,
      210
    );

    strokeWeight(2);


    line(
      a.x,
      a.y,
      b.x,
      b.y
    );


    // -------------------------------------------------
    // 2. 모루처럼 빽빽한 털
    // -------------------------------------------------

    // 털 사이의 간격
    const furStep =
      6;


    const furCount =
      Math.ceil(
        length /
        furStep
      );


    for (
      let i = 0;
      i <= furCount;
      i++
    ) {

      const t =
        i / furCount;


      const x =
        a.x + dx * t;

      const y =
        a.y + dy * t;


      // ---------------------------------------------
      // 털 길이도 아주 조금씩 변화
      // ---------------------------------------------

      const n =
        noise(
          x * 0.045 +
          instance.syllableId * 20,

          y * 0.045
        );


      const furLength =
        5 +
        n * 9;


      // ---------------------------------------------
      // 양쪽으로 털이 난다.
      // ---------------------------------------------

      // 왼쪽 털
      stroke(
        40,
        130,
        215,
        175
      );

      strokeWeight(1);


      line(
        x,
        y,

        x +
        nx * furLength,

        y +
        ny * furLength
      );


      // 오른쪽 털
      stroke(
        35,
        115,
        200,
        150
      );


      line(
        x,
        y,

        x -
        nx * furLength,

        y -
        ny * furLength
      );


      // ---------------------------------------------
      // 털 끝에 아주 작은 세균 입자
      // ---------------------------------------------

      noStroke();

      fill(
        55,
        145,
        225,
        130
      );


      circle(
        x +
        nx * furLength,

        y +
        ny * furLength,

        2.5
      );


      circle(
        x -
        nx * furLength,

        y -
        ny * furLength,

        2.5
      );
    }
  }


  // ---------------------------------------------------
  // 3. 글자 전체에 작은 파란 세균 결절을 추가
  // ---------------------------------------------------

  for (const point of points) {

    const size =
      point.isJoint
        ? 11
        : 5;


    noStroke();


    // 주변 털의 밀도
    fill(
      35,
      120,
      210,
      35
    );

    circle(
      point.x,
      point.y,
      size * 3
    );


    // 작은 세균
    fill(
      35,
      120,
      210,
      180
    );

    circle(
      point.x,
      point.y,
      size
    );
  }
}

// 연결된 점들이 원래 간격(restLength)을 유지하도록 스프링 힘을 계산
function updateJamoPhysics(instance, instanceIndex) {
  const points = instance.physicsPoints;
  const springs = instance.physicsSprings;

  // 1) 각 스프링이 늘어나거나 줄어든 만큼
  // 양쪽 점을 당기거나 밀어낸다.
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

  // 2) 속도를 줄이면서 실제 위치를 이동한다.
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = points[pointIndex];

    // 마우스로 잡고 있는 점은 물리 계산 대신 마우스 위치에 고정한다.
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

    // 너무 빠르게 튀는 것을 방지
    if (speed > MAX_POINT_SPEED) {
      point.vx = (point.vx / speed) * MAX_POINT_SPEED;
      point.vy = (point.vy / speed) * MAX_POINT_SPEED;
    }

    point.x += point.vx;
    point.y += point.vy;
  }
}

// JAMO의 최소 nodes와 Point Count를
// 실제 물리점 + 스프링 구조로 바꾼다.
function createPhysicsStructure(jamoType, offsetX, offsetY, pointCount) {
  const jamo = JAMO[jamoType];

  const physicsPoints = [];
  const physicsSprings = [];

  // 원래 최소 관절을 먼저 실제 물리점으로 만든다.
  // connector가 어느 관절인지 추적하기 위해 인덱스를 기억한다.
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

  // 각 원래 edge 사이에 Point Count만큼 실제 물리점을 추가한다.
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
        pointIndex,
      );

      previousPointIndex = pointIndex;
    }

    // 마지막 중간점과 끝 관절 연결
    addPhysicsSpring(
      physicsPoints,
      physicsSprings,
      previousPointIndex,
      jointPointIndices[endNodeIndex],
    );
  }

  // connector는 기존 최소 관절을 그대로 사용한다.
  const connectorPointIndices = jamo.connectors.map(
    (nodeIndex) => jointPointIndices[nodeIndex],
  );

  return {
    physicsPoints,
    physicsSprings,
    connectorPointIndices,
  };
}

// 두 물리점을 연결하고
// 처음 거리를 스프링의 원래 길이(restLength)로 저장한다.
function addPhysicsSpring(points, springs, pointIndexA, pointIndexB) {
  const pointA = points[pointIndexA];
  const pointB = points[pointIndexB];

  springs.push({
    a: pointIndexA,
    b: pointIndexB,

    restLength: Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y),
  });
}

// =====================================================
// 8. INTERACTION
// 자모 전체가 아니라 물리점 하나를 직접 잡아서 끌어당김
// =====================================================

// 모든 물리점을 확인해서
// 마우스가 점 위에 있으면 손 모양 커서로 바꾼다.
function updatePointCursor() {

  let isOverPoint = false;

  for (const instance of jamoInstances) {

    for (const point of instance.physicsPoints) {

      const distance = Math.hypot(
        mouseX - point.x,
        mouseY - point.y
      );

      // 검은 관절점 / 흰 중간점 모두 같은 방식으로 검사
      if (distance <= POINT_PICK_RADIUS) {
        isOverPoint = true;
        break;
      }
    }

    if (isOverPoint) {
      break;
    }
  }


  if (isOverPoint) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
// 마우스와 가장 가까운 물리점 하나를 선택

function mousePressed() {
  let closestPoint = null;
  let closestDistance = POINT_PICK_RADIUS;

  // 뒤에 그려진 자모부터 검사한다.
  for (
    let instanceIndex = jamoInstances.length - 1;
    instanceIndex >= 0;
    instanceIndex--
  ) {
    const points = jamoInstances[instanceIndex].physicsPoints;

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      const point = points[pointIndex];

      const distance = Math.hypot(mouseX - point.x, mouseY - point.y);

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

// 잡은 점만 마우스 위치로 옮긴다.
// 나머지 점들은 직접 움직이지 않고 스프링 힘으로 따라온다.
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

// 마우스를 놓으면 그 점도 다시 일반 물리점으로 돌아간다.
function mouseReleased() {
  draggedPoint = null;
}

// =====================================================
// 9. HANGUL INPUT
// 입력된 글자를 분해하고 물리 자모 인스턴스를 생성
// =====================================================

// =====================================================
// 9. HANGUL INPUT
// =====================================================

function generateJamosFromInput(
  moveCurrentToBackground = true
) {

  const inputText =
    textInput.value().trim();


  if (
    inputText.length === 0
  ) {

    return;

  }


  // ---------------------------------------------------
  // 입력된 문자열의 마지막 글자
  // ---------------------------------------------------

  const character =
    inputText[
      inputText.length - 1
    ];


  generateSingleCharacter(
    character,
    moveCurrentToBackground
  );
}


// =====================================================
// 실제 한 글자를 생성
// =====================================================

function generateSingleCharacter(
  character,
  moveCurrentToBackground = true
) {

  const characterCode =
    character.charCodeAt(0);


  // 완성형 한글이 아니면 생성하지 않음
  if (
    characterCode < 0xAC00 ||
    characterCode > 0xD7A3
  ) {

    return;

  }


  // ---------------------------------------------------
  // 기존 글자를 배경으로 이동
  // ---------------------------------------------------

  if (
    moveCurrentToBackground &&
    jamoInstances.length > 0
  ) {

    archiveCurrentJamos();

  }


  // 현재 글자 비우기
  jamoInstances = [];

  draggedPoint = null;


  // ---------------------------------------------------
  // 현재 입력값 기록
  // ---------------------------------------------------

  lastInputText =
    textInput.value().trim();


  // ---------------------------------------------------
  // 완성형 한글을 자모로 분해
  // ---------------------------------------------------

  const decomposedJamos =
    decomposeHangulSyllable(
      character
    );


  if (
    decomposedJamos.length === 0
  ) {

    return;

  }


  // ---------------------------------------------------
  // 현재 글자의 색/질감
  //
  // 0 = 빨강
  // 1 = 노랑
  // 2 = 파랑
  //
  // 배경으로 이동한 글자의 개수를 이용해서
  // 순서를 결정한다.
  // ---------------------------------------------------

  const textureStyle =
    backgroundJamoInstances.length % 3;


  // ---------------------------------------------------
  // 자모 배치
  // ---------------------------------------------------

  const gap =
    220;


  const startOffsetX =
    width / 2 -
    200 -
    (
      (
        decomposedJamos.length - 1
      ) *
      gap
    ) / 2;


  for (
    let i = 0;
    i < decomposedJamos.length;
    i++
  ) {

    const jamoType =
      decomposedJamos[i];


    if (
      !JAMO[jamoType]
    ) {

      continue;

    }


    const instanceX =
      startOffsetX +
      i * gap;


    const instanceY =
      height / 2 -
      200;


    // 기존 글자 뼈대 생성
    const physics =
      createPhysicsStructure(

        jamoType,

        instanceX,

        instanceY,

        pointCountSlider.value()

      );


    // -------------------------------------------------
    // 현재 자모
    // -------------------------------------------------

    jamoInstances.push({

      type:
        jamoType,


      syllableId:
        backgroundJamoInstances.length,


      textureStyle:
        textureStyle,


      physicsPoints:
        physics.physicsPoints,


      physicsSprings:
        physics.physicsSprings,


      connectorPointIndices:
        physics.connectorPointIndices

    });

  }
}

// =====================================================
// 한 글자 생성
//
// 현재 글자가 있다면:
//
// 현재 글자
//      ↓
// backgroundJamoInstances
//
// 그리고 새로운 글자를 중앙에 생성한다.
// =====================================================

function generateSingleCharacter(
  character,
  moveCurrentToBackground = true
) {

  // -----------------------------------------
  // 한글인지 확인
  // -----------------------------------------

  const characterCode =
    character.charCodeAt(0);


  if (
    characterCode < 0xAC00 ||
    characterCode > 0xD7A3
  ) {

    return;
  }


  // -----------------------------------------
  // 기존 현재 글자를 배경으로 이동
  // -----------------------------------------

  if (
    moveCurrentToBackground &&
    jamoInstances.length > 0
  ) {

    archiveCurrentJamos();

  }


  // -----------------------------------------
  // 현재 글자는 비운다.
  // -----------------------------------------

  jamoInstances = [];

  draggedPoint = null;


  // -----------------------------------------
  // 현재 글자 기록
  // -----------------------------------------

  lastGeneratedCharacter =
    character;


  // -----------------------------------------
  // 완성형 한글 → 자모
  // -----------------------------------------

  const decomposedJamos =
    decomposeHangulSyllable(
      character
    );


  // -----------------------------------------
  // 현재 글자의 색/질감
  //
  // 지금까지 정한 규칙:
  //
  // 첫 번째 글자 = 빨강
  // 두 번째 글자 = 노랑
  // 세 번째 글자 = 파랑
  //
  // 이후 반복
  // -----------------------------------------

  const syllableNumber =
    backgroundJamoInstances.length;


  const textureStyle =
    syllableNumber % 3;


  // -----------------------------------------
  // 자모 생성
  // -----------------------------------------

  const gap =
    220;


  const startX =
    width / 2 -
    (
      (
        decomposedJamos.length - 1
      ) *
      gap
    ) / 2;


  for (
    let i = 0;
    i < decomposedJamos.length;
    i++
  ) {

    const jamoType =
      decomposedJamos[i];


    if (
      !JAMO[jamoType]
    ) {

      continue;
    }


    const physics =
      createPhysicsStructure(

        jamoType,

        startX +
        i * gap,

        height / 2 -
        200,

        pointCountSlider.value()

      );


    jamoInstances.push({

      type:
        jamoType,


      syllableId:
        syllableNumber,


      textureStyle:
        textureStyle,


      physicsPoints:
        physics.physicsPoints,


      physicsSprings:
        physics.physicsSprings,


      connectorPointIndices:
        physics.connectorPointIndices

    });
  }
}

// =====================================================
// ARCHIVE CURRENT JAMO
//
// 현재 글자를 지우는 대신
// "배경 생물"로 전환한다.
// =====================================================

// =====================================================
// 현재 글자를 배경 생물로 전환
// =====================================================

function archiveCurrentJamos() {

  for (
    let i = 0;
    i < jamoInstances.length;
    i++
  ) {

    const instance =
      jamoInstances[i];


    // -----------------------------------------
    // 현재 물리점 위치 저장
    // -----------------------------------------

    instance.backgroundBasePositions =
      instance.physicsPoints.map(
        point => ({

          x: point.x,
          y: point.y

        })
      );


    // -----------------------------------------
    // 중심 위치
    // -----------------------------------------

    let centerX = 0;
    let centerY = 0;


    for (
      const point
      of instance.physicsPoints
    ) {

      centerX += point.x;
      centerY += point.y;

    }


    if (
      instance.physicsPoints.length > 0
    ) {

      centerX /=
        instance.physicsPoints.length;

      centerY /=
        instance.physicsPoints.length;

    }


    instance.centerX =
      centerX;

    instance.centerY =
      centerY;


    // -----------------------------------------
    // 부유 방향
    //
    // 화면 안에서 벽에 튕기지 않는다.
    // -----------------------------------------

    const angle =
      random(
        0,
        TWO_PI
      );


    const speed =
      random(
        0.08,
        0.18
      );


    instance.driftX = 0;
    instance.driftY = 0;


    instance.driftVX =
      cos(angle) *
      speed;


    instance.driftVY =
      sin(angle) *
      speed;


    // -----------------------------------------
    // 아주 느린 꿈틀거림
    // -----------------------------------------

    instance.motionSeed =
      random(10000);


    instance.wiggleSpeed =
      random(
        0.12,
        0.22
      );


    instance.wiggleAmount =
      random(
        0.8,
        1.8
      );


    // -----------------------------------------
    // 배경 투명도
    // -----------------------------------------

    instance.backgroundOpacity =
      random(
        0.12,
        0.20
      );


    // -----------------------------------------
    // 생성된 시간을 저장
    // -----------------------------------------

    instance.backgroundTime =
      millis();


    // -----------------------------------------
    // 배경 배열로 이동
    // -----------------------------------------

    backgroundJamoInstances.push(
      instance
    );

  }
}

// =====================================================
// 10. HANGUL DECOMPOSITION
// 완성형 한글 한 글자를 초성 / 중성 / 종성으로 분해
// =====================================================

function decomposeHangulSyllable(character) {
  const characterCode = character.charCodeAt(0);

  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;

  // 완성형 한글 범위가 아니면 사용하지 않는다.
  if (characterCode < HANGUL_START || characterCode > HANGUL_END) {
    return [];
  }

  const syllableIndex = characterCode - HANGUL_START;

  // 한글 유니코드 배열 규칙을 이용해
  // 초성 / 중성 / 종성 번호를 계산한다.
  const choseongIndex = Math.floor(syllableIndex / 588);

  const jungseongIndex = Math.floor((syllableIndex % 588) / 28);

  const jongseongIndex = syllableIndex % 28;

  const decomposedResult = [CHOSEONG[choseongIndex], JUNGSEONG[jungseongIndex]];

  // 받침이 없는 글자는 JONGSEONG[0]이 빈 문자열이다.
  if (JONGSEONG[jongseongIndex] !== "") {
    decomposedResult.push(JONGSEONG[jongseongIndex]);
  }

  return decomposedResult;
}


// =====================================================
// 11. RESPONSIVE CANVAS
// 창 크기가 바뀌면 캔버스와 UI 위치를 다시 계산
// =====================================================

function windowResized() {

  resizeCanvas(
    getCanvasWidth(),
    getCanvasHeight()
  );

  canvas.position(
    PAGE_MARGIN,
    PAGE_MARGIN
  );

  positionControls();
}
}