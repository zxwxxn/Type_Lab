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

const JOINT_SIZE = 5;
const MIDDLE_POINT_SIZE = 3;
const CONNECTOR_SIZE = 10;

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

// =====================================================
// =====================================================
// GENERATED GRAPHIC POINTS
// 그래픽 파일을 사용하지 않고, 기본 뼈대 주변에
// 참고 이미지처럼 불규칙한 크기/위치/밀도의 점을 생성한다.
// =====================================================
const GENERATED_GRAPHIC_ENABLED = true;
const GENERATED_POINT_DENSITY = 0.82;      // 높을수록 촘촘
const GENERATED_POINT_MIN = 180;            // 자음당 최소 점 수
const GENERATED_POINT_MAX = 650;            // 자음당 최대 점 수
const GENERATED_POINT_SPREAD = 10;          // 뼈대 주변 기본 퍼짐
const GENERATED_POINT_CLUSTER_SPREAD = 24;  // 드문 큰 군집의 퍼짐
const GENERATED_POINT_CLUSTER_RATE = 0.16;  // 군집점 비율
const GENERATED_POINT_MIN_SIZE = 1.1;
const GENERATED_POINT_MAX_SIZE = 6.8;
const GENERATED_POINT_MIN_ALPHA = 115;
const GENERATED_POINT_MAX_ALPHA = 235;
const GENERATED_BONE_STRENGTH = 0.10;
const GENERATED_SHAPE_STRENGTH = 0.010;
const GENERATED_DAMPING = 0.86;
const GENERATED_MOUSE_RADIUS = 150;
const GENERATED_MOUSE_STRENGTH = 0.34;

// 생성 직후 점들이 하나씩 자라나는 효과
const GRAPHIC_GROWTH_ENABLED = true;
const GRAPHIC_GROWTH_DURATION = 5000;
const GRAPHIC_GROWTH_RANDOM_DELAY = 0.85;
const GRAPHIC_GROWTH_SPAWN_RADIUS_MIN = 4;
const GRAPHIC_GROWTH_SPAWN_RADIUS_MAX = 22;
const GRAPHIC_GROWTH_SPEED = 0.055;

// 자음마다 하나의 점 배열을 갖는다.
// key = jamo instance, value = generated graphic points
let generatedGraphicClouds = new Map();

function isConsonantJamo(type) {
  return CHOSEONG.includes(type);
}

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

let jamoInstances = [];

// 지금 마우스로 잡고 있는 물리점
// 값이 없을 때는 null
let draggedPoint = null;

let pointCountSlider;
let textInput;
let generateButton;


// =====================================================
// 5. SETUP
// 페이지가 시작될 때 한 번만 실행
// =====================================================

function setup() {

  // 브라우저 크기에 맞춰 캔버스를 만든다.
  canvas =
    createCanvas(
      getCanvasWidth(),
      getCanvasHeight()
    );

  // 화면 가장자리에서 일정한 여백을 둔다.
  canvas.position(
    PAGE_MARGIN,
    PAGE_MARGIN
  );


  // 각 edge 사이에 추가할 물리점 개수
  pointCountSlider =
    createSlider(
      0,
      10,
      2,
      1
    );

  // Point Count가 바뀌면
  // 현재 글자를 새 물리구조로 다시 만든다.
  pointCountSlider.changed(
    generateJamosFromInput
  );


  // 한글 입력창
  textInput =
    createInput('가');

  textInput.size(130);


  // 생성 버튼
  generateButton =
    createButton('생성');

  generateButton.mousePressed(
    generateJamosFromInput
  );


  // UI 위치 정리
  positionControls();


  // 처음 한 번 자모 생성
  generateJamosFromInput();

}

// 캔버스 아래 가운데에
// 슬라이더 / 입력창 / 생성 버튼을 배치한다.
function positionControls() {

  const centerX =
    PAGE_MARGIN + width / 2;

  const controlTop =
    PAGE_MARGIN + height;


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
// MAGNETIC JOINTS
// 서로 다른 글자의 관절(connector)이 가까워지면 자석처럼 끌어당기고,
// 충분히 가까워지면 실제로 달라붙은 것처럼 유지한다.
// =====================================================

const MAGNETIC_ENABLED = true;

// 이 거리 안으로 들어오면 서로 끌어당기기 시작한다.
const MAGNETIC_RADIUS = 85;

// 이 거리 안까지 가까워지면 "찰싹" 붙는다.
const MAGNETIC_SNAP_DISTANCE = 22;

// 붙은 뒤 유지되는 실제 관절 사이의 거리.
// 0이면 두 관절이 완전히 겹친다.
const MAGNETIC_BOND_DISTANCE = 7;

// 가까워질수록 강해지는 흡인력
const MAGNETIC_STRENGTH = 0.075;

// 붙은 뒤 서로 같은 위치를 유지하려는 힘
const MAGNETIC_BOND_STRENGTH = 0.22;

// 붙어 있는 상태에서 이 거리 이상 벌어지면 자석 연결을 끊는다.
const MAGNETIC_BREAK_DISTANCE = 115;

// -----------------------------------------------------
// 붙은 관절 주변 그래픽 점의 반응
// 관절이 실제로 magnetic bond 상태일 때만 발동한다.
// -----------------------------------------------------
const BONDED_GRAPHIC_EFFECT_RADIUS = 88;
const BONDED_GRAPHIC_SIZE_MULTIPLIER = 3.0;

// -----------------------------------------------------
// 관절 주변 "세포 응집" 효과
// -----------------------------------------------------
// 관절이 붙으면 주변 점들이 단순히 관절을 따라오는 것이 아니라,
// 서로 가까운 점끼리도 조금씩 당겨져 작은 덩어리처럼 뭉친다.
const BONDED_GRAPHIC_PULL_STRENGTH = 3;
const BONDED_GRAPHIC_PULL_MAX = 3.8;

// 관절 주변 점들의 서로 끌어당기는 범위
const BONDED_GRAPHIC_COHESION_RADIUS = 42;

// 가까운 점끼리 너무 겹쳐서 한 점처럼 되는 것을 막는 최소 간격
const BONDED_GRAPHIC_MIN_DISTANCE = 5;

// 주변 점끼리 뭉치는 힘
const BONDED_GRAPHIC_COHESION_STRENGTH = 0.018;

// 한 점당 검사할 이웃 수. 점이 많아도 성능을 크게 해치지 않도록 제한한다.
const BONDED_GRAPHIC_NEIGHBOR_LIMIT = 6;

// =====================================================
// 그래픽 색상 설정
// =====================================================
// 여기만 수정하면 ㄱ / ㅅ / ㄴ 그래픽의 색을 각각 바꿀 수 있다.
//
// base   = 평소 그래픽 색
// bonded = 관절에 가까워졌을 때 색
//
// 만약 항상 같은 색으로 보이게 하고 싶다면
// base와 bonded를 같은 RGB 값으로 맞추면 된다.
//
// 예) 빨강: { r: 220, g: 70, b: 70 }
//     파랑: { r: 70,  g: 120, b: 230 }
//     보라: { r: 160, g: 90,  b: 220 }
// =====================================================
const GRAPHIC_COLORS = {
  ㄱ: { base: {r:0,g:0,b:0}, bonded: {r:205,g:82,b:128} },
  ㄲ: { base: {r:0,g:0,b:0}, bonded: {r:205,g:82,b:128} },
  ㄴ: { base: {r:0,g:0,b:0}, bonded: {r:150,g:90,b:220} },
  ㄷ: { base: {r:0,g:0,b:0}, bonded: {r:220,g:110,b:80} },
  ㄸ: { base: {r:0,g:0,b:0}, bonded: {r:220,g:110,b:80} },
  ㄹ: { base: {r:0,g:0,b:0}, bonded: {r:215,g:150,b:70} },
  ㅁ: { base: {r:0,g:0,b:0}, bonded: {r:80,g:175,b:130} },
  ㅂ: { base: {r:0,g:0,b:0}, bonded: {r:65,g:175,b:190} },
  ㅃ: { base: {r:0,g:0,b:0}, bonded: {r:65,g:175,b:190} },
  ㅅ: { base: {r:0,g:0,b:0}, bonded: {r:82,g:130,b:220} },
  ㅆ: { base: {r:0,g:0,b:0}, bonded: {r:82,g:130,b:220} },
  ㅇ: { base: {r:0,g:0,b:0}, bonded: {r:100,g:155,b:225} },
  ㅈ: { base: {r:0,g:0,b:0}, bonded: {r:90,g:115,b:225} },
  ㅉ: { base: {r:0,g:0,b:0}, bonded: {r:90,g:115,b:225} },
  ㅊ: { base: {r:0,g:0,b:0}, bonded: {r:115,g:100,b:220} },
  ㅋ: { base: {r:0,g:0,b:0}, bonded: {r:185,g:90,b:190} },
  ㅌ: { base: {r:0,g:0,b:0}, bonded: {r:200,g:80,b:160} },
  ㅍ: { base: {r:0,g:0,b:0}, bonded: {r:180,g:100,b:205} },
  ㅎ: { base: {r:0,g:0,b:0}, bonded: {r:130,g:90,b:210} },
};

function getGraphicColor(graphicType, influence) {
  const colors = GRAPHIC_COLORS[graphicType] || GRAPHIC_COLORS.ㄱ;
  const t = constrain(influence, 0, 1);

  return {
    r: Math.round(colors.base.r + (colors.bonded.r - colors.base.r) * t),
    g: Math.round(colors.base.g + (colors.bonded.g - colors.base.g) * t),
    b: Math.round(colors.base.b + (colors.bonded.b - colors.base.b) * t),
  };
}

// 현재 붙어 있는 관절 쌍
let magneticBonds = [];

// 관절 하나를 다른 관절과 한 번만 연결하도록 한다.
function getMagneticPointKey(instanceIndex, pointIndex) {
  return instanceIndex + ":" + pointIndex;
}

function isMagneticPointOccupied(instanceIndex, pointIndex) {
  const key = getMagneticPointKey(instanceIndex, pointIndex);

  return magneticBonds.some(
    (bond) =>
      getMagneticPointKey(bond.a.instanceIndex, bond.a.pointIndex) === key ||
      getMagneticPointKey(bond.b.instanceIndex, bond.b.pointIndex) === key
  );
}

// 자석 연결이 풀린 뒤 stale bond를 정리한다.
function cleanupMagneticBonds() {
  magneticBonds = magneticBonds.filter((bond) => {
    const aInstance = jamoInstances[bond.a.instanceIndex];
    const bInstance = jamoInstances[bond.b.instanceIndex];

    if (!aInstance || !bInstance) return false;

    const a = aInstance.physicsPoints[bond.a.pointIndex];
    const b = bInstance.physicsPoints[bond.b.pointIndex];

    if (!a || !b) return false;

    const distance = Math.hypot(b.x - a.x, b.y - a.y);

    // 사용자가 하나를 강하게 끌어당겨 멀리 떼면 다시 분리된다.
    if (distance > MAGNETIC_BREAK_DISTANCE) {
      return false;
    }

    return true;
  });
}

// 가까운 connector끼리 새 magnetic bond를 만든다.
function findNewMagneticBonds() {
  if (!MAGNETIC_ENABLED) return;

  for (let aInstanceIndex = 0; aInstanceIndex < jamoInstances.length; aInstanceIndex++) {
    const aInstance = jamoInstances[aInstanceIndex];

    for (const aPointIndex of aInstance.connectorPointIndices) {
      // 이미 다른 관절에 붙어 있다면 새로운 연결을 만들지 않는다.
      if (isMagneticPointOccupied(aInstanceIndex, aPointIndex)) continue;

      const a = aInstance.physicsPoints[aPointIndex];

      let closest = null;
      let closestDistance = MAGNETIC_SNAP_DISTANCE;

      for (
        let bInstanceIndex = aInstanceIndex + 1;
        bInstanceIndex < jamoInstances.length;
        bInstanceIndex++
      ) {
        const bInstance = jamoInstances[bInstanceIndex];

        for (const bPointIndex of bInstance.connectorPointIndices) {
          if (isMagneticPointOccupied(bInstanceIndex, bPointIndex)) continue;

          const b = bInstance.physicsPoints[bPointIndex];
          const distance = Math.hypot(b.x - a.x, b.y - a.y);

          if (distance <= closestDistance) {
            closestDistance = distance;

            closest = {
              instanceIndex: bInstanceIndex,
              pointIndex: bPointIndex,
            };
          }
        }
      }

      if (closest !== null) {
        magneticBonds.push({
          a: {
            instanceIndex: aInstanceIndex,
            pointIndex: aPointIndex,
          },
          b: closest,
        });
      }
    }
  }
}

// 자석의 힘을 실제 물리점에 적용한다.
// -----------------------------------------------------
// magnetic bond에 연결된 관절 주변인지 계산
// 같은 자모의 그래픽 점만 영향을 받도록 한다.
// 반환값: 0(영향 없음) ~ 1(관절에 가장 가까움)
// -----------------------------------------------------
function getBondedGraphicEffect(instanceIndex, x, y) {
  if (!MAGNETIC_ENABLED || magneticBonds.length === 0) {
    return { influence: 0, jointX: x, jointY: y };
  }
  if (instanceIndex < 0) {
    return { influence: 0, jointX: x, jointY: y };
  }

  let strongest = 0;
  let strongestJointX = x;
  let strongestJointY = y;

  for (const bond of magneticBonds) {
    let jointPointIndex = -1;

    if (bond.a.instanceIndex === instanceIndex) {
      jointPointIndex = bond.a.pointIndex;
    } else if (bond.b.instanceIndex === instanceIndex) {
      jointPointIndex = bond.b.pointIndex;
    } else {
      continue;
    }

    const instance = jamoInstances[instanceIndex];
    const joint = instance && instance.physicsPoints[jointPointIndex];
    if (!joint) continue;

    const distance = Math.hypot(x - joint.x, y - joint.y);
    if (distance >= BONDED_GRAPHIC_EFFECT_RADIUS) continue;

    // 관절에 가까울수록 부드럽게 1에 접근한다.
    let influence = 1 - distance / BONDED_GRAPHIC_EFFECT_RADIUS;
    influence = influence * influence * (3 - 2 * influence);

    if (influence > strongest) {
      strongest = influence;
      strongestJointX = joint.x;
      strongestJointY = joint.y;
    }
  }

  return {
    influence: strongest,
    jointX: strongestJointX,
    jointY: strongestJointY,
  };
}

function getBondedGraphicActivation(instanceIndex, x, y) {
  return getBondedGraphicEffect(instanceIndex, x, y).influence;
}

function getGraphicPointStyle(point, instanceIndex, graphicType = "ㄱ") {
  const influence = getBondedGraphicActivation(
    instanceIndex,
    point.x,
    point.y
  );

  // 붙은 관절에 가까울수록 최대 3배까지 커진다.
  const size = point.size * (1 + influence * (BONDED_GRAPHIC_SIZE_MULTIPLIER - 1));

  // 그래픽 종류별로 base → bonded 색으로 부드럽게 전환한다.
  const color = getGraphicColor(graphicType, influence);

  return {
    size,
    r: color.r,
    g: color.g,
    b: color.b,
    influence,
  };
}

// 붙은 관절 주변의 점을 관절 쪽으로 아주 조금 끌어당긴다.
// 점들이 한꺼번에 뭉치지 않고 생물 조직처럼 서서히 모이도록 속도를 제한한다.
function applyBondedGraphicPull(point, instanceIndex) {
  const effect = getBondedGraphicEffect(instanceIndex, point.x, point.y);
  if (effect.influence <= 0) return;

  const dx = effect.jointX - point.x;
  const dy = effect.jointY - point.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 0.001) return;

  const force = BONDED_GRAPHIC_PULL_STRENGTH * effect.influence;
  point.vx += (dx / distance) * force;
  point.vy += (dy / distance) * force;

  // 너무 빠르게 한곳으로 압축되지 않도록 별도의 속도 제한을 둔다.
  const speed = Math.hypot(point.vx, point.vy);
  if (speed > BONDED_GRAPHIC_PULL_MAX) {
    const scale = BONDED_GRAPHIC_PULL_MAX / speed;
    point.vx *= scale;
    point.vy *= scale;
  }
}


// -----------------------------------------------------
// 관절 주변 점들의 "세포 응집"
// -----------------------------------------------------
// 관절 쪽으로 모이는 힘 + 서로 가까운 점끼리의 약한 응집력을 함께 사용한다.
// 너무 가까워지면 약한 반발력을 넣어 한 점으로 완전히 겹치지 않게 한다.
function applyBondedGraphicCohesion(points, instanceIndex, currentPoint) {
  const effect = getBondedGraphicEffect(
    instanceIndex,
    currentPoint.x,
    currentPoint.y
  );

  if (effect.influence <= 0) return;

  // 1. 관절 주변일수록 원래 그래픽으로 돌아가려는 힘을 약하게 해서
  //    관절 주변이 실제로 압축될 수 있게 한다.
  const clusterInfluence = effect.influence;

  // 2. 서로 가까운 점들을 조금씩 같은 방향으로 끌어당긴다.
  //    전체 900개를 전부 비교하지 않고 일정 간격의 후보만 검사한다.
  let neighborCount = 0;
  let cohesionX = 0;
  let cohesionY = 0;

  const count = points.length;
  if (count > 1) {
    // 점의 배열 순서가 무작위이므로 여러 간격을 사용해
    // 공간적으로 다양한 후보를 확인한다.
    const offsets = [1, 7, 19, 43, 89, 137, 211, 307];

    for (const offset of offsets) {
      if (neighborCount >= BONDED_GRAPHIC_NEIGHBOR_LIMIT) break;

      const other =
        points[(points.indexOf(currentPoint) + offset) % count];

      if (!other || other === currentPoint) continue;

      const dx = other.x - currentPoint.x;
      const dy = other.y - currentPoint.y;
      const distance = Math.hypot(dx, dy);

      if (
        distance > BONDED_GRAPHIC_COHESION_RADIUS ||
        distance < 0.001
      ) {
        continue;
      }

      // 너무 가까우면 반발, 적당히 가까우면 응집.
      if (distance < BONDED_GRAPHIC_MIN_DISTANCE) {
        const repulsion =
          (1 - distance / BONDED_GRAPHIC_MIN_DISTANCE) *
          0.045 *
          clusterInfluence;

        currentPoint.vx -= (dx / distance) * repulsion;
        currentPoint.vy -= (dy / distance) * repulsion;
      } else {
        const localInfluence =
          (1 - distance / BONDED_GRAPHIC_COHESION_RADIUS) *
          clusterInfluence;

        cohesionX += (dx / distance) * localInfluence;
        cohesionY += (dy / distance) * localInfluence;
        neighborCount++;
      }
    }
  }

  if (neighborCount > 0) {
    currentPoint.vx +=
      (cohesionX / neighborCount) * BONDED_GRAPHIC_COHESION_STRENGTH;

    currentPoint.vy +=
      (cohesionY / neighborCount) * BONDED_GRAPHIC_COHESION_STRENGTH;
  }

  // 3. 마지막으로 관절 중심으로 조금 더 압축한다.
  //    기존 applyBondedGraphicPull보다 강하지만 천천히 누적되도록 한다.
  const dx = effect.jointX - currentPoint.x;
  const dy = effect.jointY - currentPoint.y;
  const distance = Math.hypot(dx, dy);

  if (distance > 0.001) {
    const radialForce =
      BONDED_GRAPHIC_PULL_STRENGTH *
      clusterInfluence *
      (0.35 + 0.65 * clusterInfluence);

    currentPoint.vx += (dx / distance) * radialForce;
    currentPoint.vy += (dy / distance) * radialForce;
  }
}

function updateMagneticJoints() {
  if (!MAGNETIC_ENABLED || jamoInstances.length < 2) return;

  cleanupMagneticBonds();
  findNewMagneticBonds();

  // ---------------------------------------------------
  // 1. 아직 붙지 않은 가까운 관절끼리 서로 끌어당김
  // ---------------------------------------------------
  for (let aInstanceIndex = 0; aInstanceIndex < jamoInstances.length; aInstanceIndex++) {
    const aInstance = jamoInstances[aInstanceIndex];

    for (const aPointIndex of aInstance.connectorPointIndices) {
      const a = aInstance.physicsPoints[aPointIndex];

      for (
        let bInstanceIndex = aInstanceIndex + 1;
        bInstanceIndex < jamoInstances.length;
        bInstanceIndex++
      ) {
        const bInstance = jamoInstances[bInstanceIndex];

        for (const bPointIndex of bInstance.connectorPointIndices) {
          const b = bInstance.physicsPoints[bPointIndex];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);

          if (distance <= 0 || distance > MAGNETIC_RADIUS) continue;

          // 이미 붙어 있는 쌍은 아래 bond 물리에서 처리한다.
          const alreadyBonded = magneticBonds.some(
            (bond) =>
              (bond.a.instanceIndex === aInstanceIndex &&
                bond.a.pointIndex === aPointIndex &&
                bond.b.instanceIndex === bInstanceIndex &&
                bond.b.pointIndex === bPointIndex) ||
              (bond.a.instanceIndex === bInstanceIndex &&
                bond.a.pointIndex === bPointIndex &&
                bond.b.instanceIndex === aInstanceIndex &&
                bond.b.pointIndex === aPointIndex)
          );

          if (alreadyBonded) continue;

          // 멀리 있을 때는 약하게, 가까워질수록 강하게 끌어당긴다.
          const normalizedDistance =
            1 - distance / MAGNETIC_RADIUS;

          const attraction =
            normalizedDistance * normalizedDistance * MAGNETIC_STRENGTH;

          const forceX = (dx / distance) * attraction;
          const forceY = (dy / distance) * attraction;

          // 잡고 있는 관절은 mouse 위치가 우선이므로
          // 그 반대편 관절에 더 강하게 힘을 전달한다.
          const aDragged =
            draggedPoint &&
            draggedPoint.instanceIndex === aInstanceIndex &&
            draggedPoint.pointIndex === aPointIndex;

          const bDragged =
            draggedPoint &&
            draggedPoint.instanceIndex === bInstanceIndex &&
            draggedPoint.pointIndex === bPointIndex;

          if (!aDragged) {
            a.vx += forceX;
            a.vy += forceY;
          }

          if (!bDragged) {
            b.vx -= forceX;
            b.vy -= forceY;
          }
        }
      }
    }
  }

  // ---------------------------------------------------
  // 2. "찰싹" 붙은 관절은 bond 거리까지 강하게 유지
  // ---------------------------------------------------
  for (const bond of magneticBonds) {
    const aInstance = jamoInstances[bond.a.instanceIndex];
    const bInstance = jamoInstances[bond.b.instanceIndex];

    if (!aInstance || !bInstance) continue;

    const a = aInstance.physicsPoints[bond.a.pointIndex];
    const b = bInstance.physicsPoints[bond.b.pointIndex];

    if (!a || !b) continue;

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);

    if (distance <= 0.001) continue;

    const directionX = dx / distance;
    const directionY = dy / distance;

    const error = distance - MAGNETIC_BOND_DISTANCE;

    const forceX =
      directionX * error * MAGNETIC_BOND_STRENGTH;
    const forceY =
      directionY * error * MAGNETIC_BOND_STRENGTH;

    const aDragged =
      draggedPoint &&
      draggedPoint.instanceIndex === bond.a.instanceIndex &&
      draggedPoint.pointIndex === bond.a.pointIndex;

    const bDragged =
      draggedPoint &&
      draggedPoint.instanceIndex === bond.b.instanceIndex &&
      draggedPoint.pointIndex === bond.b.pointIndex;

    if (!aDragged) {
      a.vx += forceX;
      a.vy += forceY;
    }

    if (!bDragged) {
      b.vx -= forceX;
      b.vy -= forceY;
    }
  }
}

// =====================================================
// 6. DRAW
// 매 프레임 물리를 계산하고 화면을 다시 그림
// =====================================================

function draw() {
  background(255);

  for (let i = 0; i < jamoInstances.length; i++) {
    const instance = jamoInstances[i];
    updateJamoPhysics(instance, i);
  }

  // 글자의 connector 관절끼리 가까워졌는지 검사하고
  // 자석처럼 끌어당기거나 붙어 있도록 만든다.
  updateMagneticJoints();

  updateGeneratedGraphicPoints();

  for (let i = 0; i < jamoInstances.length; i++) {
    drawJamo(jamoInstances[i]);
  }

  drawGeneratedGraphicPoints();

  updatePointCursor();

  fill(0);
  noStroke();
  text("Point Count: " + pointCountSlider.value(), 10, 390);

}

// =====================================================
// 7. JAMO DRAWING + PHYSICS
// Point Count로 만든 모든 점을 실제 물리점으로 사용
// =====================================================

// 현재 물리점과 스프링 위치를 이용해 자모를 그림
function drawJamo(instance) {
  // 점과 점 사이의 스프링을 선으로 표시
  stroke(180);
  strokeWeight(1.2);

  for (const spring of instance.physicsSprings) {
    const pointA = instance.physicsPoints[spring.a];
    const pointB = instance.physicsPoints[spring.b];

    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }

  // 최소 관절은 검은 점, Point Count로 추가된 점은 흰 점
  for (const point of instance.physicsPoints) {
    if (point.isJoint) {
      fill(180);
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

      // 실제 관절만 잡을 수 있다.
      if (point.isJoint && distance <= POINT_PICK_RADIUS) {
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
      if (!point.isJoint) continue;

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

function generateJamosFromInput() {
  const inputText = textInput.value().trim();
  const pointCount = pointCountSlider.value();

  jamoInstances = [];
  draggedPoint = null;
  magneticBonds = [];
  generatedGraphicClouds = new Map();

  const generatedJamos = [];

  for (let syllableId = 0; syllableId < inputText.length; syllableId++) {
    const character = inputText[syllableId];
    const decomposedJamos = decomposeHangulSyllable(character);

    for (const jamoType of decomposedJamos) {
      if (JAMO[jamoType]) {
        generatedJamos.push({
          type: jamoType,
          syllableId,
        });
      }
    }
  }

  const gap = 220;
  const startOffsetX =
    width / 2 -
    200 -
    ((generatedJamos.length - 1) * gap) / 2;

  for (let i = 0; i < generatedJamos.length; i++) {
    const jamoType = generatedJamos[i].type;
    const instanceX = startOffsetX + i * gap;
    const instanceY = height / 2 - 200;

    const physics = createPhysicsStructure(
      jamoType,
      instanceX,
      instanceY,
      pointCount,
    );

    const instance = {
      type: jamoType,
      syllableId: generatedJamos[i].syllableId,
      physicsPoints: physics.physicsPoints,
      physicsSprings: physics.physicsSprings,
      connectorPointIndices: physics.connectorPointIndices,
      isGraphicSkeleton: false,
    };

    jamoInstances.push(instance);

    // 모든 자음은 기본 JAMO 뼈대를 그대로 사용하고,
    // 그 위에 불규칙한 점 구름만 올린다.
    if (GENERATED_GRAPHIC_ENABLED && isConsonantJamo(jamoType)) {
      generatedGraphicClouds.set(
        instance,
        createGeneratedGraphicPointCloud(instance)
      );
    }
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
// =====================================================
// GENERATED POINT CLOUD
// 기본 뼈대의 각 edge를 따라 참고 이미지와 같은
// 불규칙한 세포형 점을 절차적으로 생성한다.
// =====================================================

function smoothstep01(t) {
  t = constrain(t, 0, 1);
  return t * t * (3 - 2 * t);
}

function randomGaussian() {
  // Box-Muller. 평균 0, 표준편차 1에 가까운 분포.
  let u = 0, v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TWO_PI * v);
}

function pointToSegmentInfo(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 < 0.0001) {
    return { distance: Math.hypot(px - ax, py - ay), t: 0 };
  }
  const t = constrain(((px - ax) * dx + (py - ay) * dy) / len2, 0, 1);
  const qx = ax + dx * t;
  const qy = ay + dy * t;
  return { distance: Math.hypot(px - qx, py - qy), t };
}

function getGeneratedPointTarget(point, instance) {
  if (point.edgeIndex < 0) return { x: point.baseX, y: point.baseY };

  const spring = instance.physicsSprings[point.edgeIndex];
  if (!spring) return { x: point.baseX, y: point.baseY };

  const a = instance.physicsPoints[spring.a];
  const b = instance.physicsPoints[spring.b];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.001) return { x: point.baseX, y: point.baseY };

  const dirX = dx / len;
  const dirY = dy / len;
  const normalX = -dirY;
  const normalY = dirX;

  return {
    x: a.x + dirX * point.edgeT * len + normalX * point.normalOffset,
    y: a.y + dirY * point.edgeT * len + normalY * point.normalOffset,
  };
}

function createGeneratedGraphicPointCloud(instance) {
  const points = [];
  const springs = instance.physicsSprings;
  let totalLength = 0;

  for (const spring of springs) {
    const a = instance.physicsPoints[spring.a];
    const b = instance.physicsPoints[spring.b];
    totalLength += Math.hypot(b.x - a.x, b.y - a.y);
  }

  const targetCount = constrain(
    Math.round(totalLength * GENERATED_POINT_DENSITY),
    GENERATED_POINT_MIN,
    GENERATED_POINT_MAX
  );

  // edge 길이에 비례해 점을 배분하되, 매번 약간 랜덤하게 만든다.
  const edgeCounts = springs.map((spring) => {
    const a = instance.physicsPoints[spring.a];
    const b = instance.physicsPoints[spring.b];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    return Math.max(4, Math.round(targetCount * (len / Math.max(totalLength, 1))));
  });

  while (edgeCounts.reduce((a, b) => a + b, 0) > targetCount) {
    const i = floor(random(edgeCounts.length));
    if (edgeCounts[i] > 4) edgeCounts[i]--;
  }
  while (edgeCounts.reduce((a, b) => a + b, 0) < targetCount) {
    edgeCounts[floor(random(edgeCounts.length))]++;
  }

  for (let edgeIndex = 0; edgeIndex < springs.length; edgeIndex++) {
    const spring = springs[edgeIndex];
    const a = instance.physicsPoints[spring.a];
    const b = instance.physicsPoints[spring.b];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    if (len < 0.001) continue;

    const dirX = dx / len;
    const dirY = dy / len;
    const normalX = -dirY;
    const normalY = dirX;

    for (let i = 0; i < edgeCounts[edgeIndex]; i++) {
      // 균일한 줄이 아니라 덩어리가 생기도록 t도 약간 흔든다.
      let t = (i + random(0.08, 0.92)) / edgeCounts[edgeIndex];
      t = constrain(t + randomGaussian() * 0.018, 0, 1);

      // 대부분은 뼈대 가까이, 일부는 넓게 퍼지는 군집점.
      const clustered = random() < GENERATED_POINT_CLUSTER_RATE;
      const spread = clustered
        ? randomGaussian() * GENERATED_POINT_CLUSTER_SPREAD
        : randomGaussian() * GENERATED_POINT_SPREAD;

      const alongJitter = randomGaussian() * Math.min(5, len * 0.025);
      const x = a.x + dirX * (t * len + alongJitter) + normalX * spread;
      const y = a.y + dirY * (t * len + alongJitter) + normalY * spread;

      const sizeBias = clustered ? random(2.2, 1) : random(0.75, 1.15);
      const size = constrain(
        randomGaussian() * 0.75 + random(1.4, 3.1) * sizeBias,
        GENERATED_POINT_MIN_SIZE,
        GENERATED_POINT_MAX_SIZE
      );

      const alpha = random(GENERATED_POINT_MIN_ALPHA, GENERATED_POINT_MAX_ALPHA);

      points.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size,
        baseSize: size,
        alpha,
        edgeIndex,
        edgeT: t,
        normalOffset: spread,
        growthStart: random(0, GRAPHIC_GROWTH_RANDOM_DELAY),
        growthJitterX: randomGaussian() * random(2, 8),
        growthJitterY: randomGaussian() * random(2, 8),
        growthPhase: random(TWO_PI),
      });
    }
  }

  initializeGeneratedGrowth(points);
  return points;
}

function initializeGeneratedGrowth(points) {
  const start = millis();
  for (const point of points) {
    point.createdAt = start;
    const angle = random(TWO_PI);
    const radius = random(
      GENERATED_POINT_CLUSTER_RATE > 0 ? GRAPHIC_GROWTH_SPAWN_RADIUS_MIN : 3,
      GRAPHIC_GROWTH_SPAWN_RADIUS_MAX
    );
    point.x = point.baseX + Math.cos(angle) * radius + point.growthJitterX;
    point.y = point.baseY + Math.sin(angle) * radius + point.growthJitterY;
  }
}

function updateGeneratedGrowth(point) {
  if (!GRAPHIC_GROWTH_ENABLED) return false;

  const elapsed = millis() - point.createdAt;
  const startDelay = GRAPHIC_GROWTH_DURATION * point.growthStart;
  if (elapsed < startDelay) return true;

  const localT = constrain(
    (elapsed - startDelay) /
      Math.max(1, GRAPHIC_GROWTH_DURATION - startDelay),
    0,
    1
  );

  const eased = smoothstep01(localT);
  const targetX = point.baseX;
  const targetY = point.baseY;

  point.vx += (targetX - point.x) * (GRAPHIC_GROWTH_SPEED + eased * 0.025);
  point.vy += (targetY - point.y) * (GRAPHIC_GROWTH_SPEED + eased * 0.025);

  if (localT >= 1) {
    return false;
  }
  return true;
}

function getGeneratedGrowthVisibility(point) {
  if (!GRAPHIC_GROWTH_ENABLED) return 1;
  const elapsed = millis() - point.createdAt;
  const startDelay = GRAPHIC_GROWTH_DURATION * point.growthStart;
  if (elapsed < startDelay) return 0;
  const localT = constrain(
    (elapsed - startDelay) /
      Math.max(1, GRAPHIC_GROWTH_DURATION - startDelay),
    0,
    1
  );
  return smoothstep01(localT);
}

function updateGeneratedGraphicPoints() {
  if (generatedGraphicClouds.size === 0) return;

  for (const [instance, points] of generatedGraphicClouds.entries()) {
    const instanceIndex = jamoInstances.indexOf(instance);
    if (instanceIndex < 0) continue;

    for (const point of points) {
      const growing = updateGeneratedGrowth(point);

      if (!growing) {
        const target = getGeneratedPointTarget(point, instance);
        point.vx += (target.x - point.x) * GENERATED_BONE_STRENGTH;
        point.vy += (target.y - point.y) * GENERATED_BONE_STRENGTH;

        // 기본 뼈대에 붙어 있으려는 아주 약한 복원력.
        point.vx += (point.baseX - point.x) * GENERATED_SHAPE_STRENGTH;
        point.vy += (point.baseY - point.y) * GENERATED_SHAPE_STRENGTH;
      }

      // 관절을 끌면 가까운 그래픽 점부터 강하게 따라온다.
      if (draggedPoint !== null) {
        const draggedInstance = jamoInstances[draggedPoint.instanceIndex];
        if (draggedInstance) {
          const dragged = draggedInstance.physicsPoints[draggedPoint.pointIndex];
          const distance = Math.hypot(point.x - dragged.x, point.y - dragged.y);
          if (distance < GENERATED_MOUSE_RADIUS) {
            let influence = 1 - distance / GENERATED_MOUSE_RADIUS;
            influence *= influence;
            const mouseVX = mouseX - pmouseX;
            const mouseVY = mouseY - pmouseY;
            point.vx += mouseVX * GENERATED_MOUSE_STRENGTH * influence;
            point.vy += mouseVY * GENERATED_MOUSE_STRENGTH * influence;
          }
        }
      }

      // magnetic bond가 생기면 기존 그래픽과 똑같이
      // 관절 주변 점 응집/끌림 효과를 적용한다.
      applyBondedGraphicCohesion(points, instanceIndex, point);

      point.vx *= GENERATED_DAMPING;
      point.vy *= GENERATED_DAMPING;

      const speed = Math.hypot(point.vx, point.vy);
      if (speed > MAX_POINT_SPEED) {
        point.vx = (point.vx / speed) * MAX_POINT_SPEED;
        point.vy = (point.vy / speed) * MAX_POINT_SPEED;
      }

      point.x += point.vx;
      point.y += point.vy;
    }
  }
}

function drawGeneratedGraphicPoints() {
  for (const [instance, points] of generatedGraphicClouds.entries()) {
    const instanceIndex = jamoInstances.indexOf(instance);
    if (instanceIndex < 0) continue;

    noStroke();

    for (const point of points) {
      const style = getGraphicPointStyle(
        point,
        instanceIndex,
        instance.type
      );

      const visibility = getGeneratedGrowthVisibility(point);
      const pulse =
        1 + Math.sin(frameCount * 0.025 + point.growthPhase) * 0.025;

      fill(
        style.r,
        style.g,
        style.b,
        point.alpha * visibility
      );
      circle(
        point.x,
        point.y,
        style.size * pulse * visibility
      );
    }
  }
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