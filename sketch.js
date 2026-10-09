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

// 호버했을 때 표시되는 관절점 UI
const HOVER_JOINT_SIZE = 8;
const HOVER_CONNECTOR_SIZE = 14;


// -----------------------------------------
// 뼈대 점 간격
// -----------------------------------------

// 현재 JAMO DATA의 기준 간격
const BASE_POINT_SPACING = 40;

// 코드에서 조절할 뼈대 간격
const POINT_SPACING = 40;

// 자모 좌표의 중심
const JAMO_CENTER = 200;

// -----------------------------------------
// 글자 배치
// -----------------------------------------

// 음절 프레임 사이의 자간
const SYLLABLE_GAP = 10;

// 글자 전체의 세로 위치
// +값 = 아래 / -값 = 위
const SYLLABLE_Y_OFFSET = 40;


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
const MAGNET_RADIUS = 30;

// 자석 힘의 세기
const MAGNET_FORCE = 0.3;


// -----------------------------------------
// Connector 스냅
// -----------------------------------------

// 이 거리 안으로 들어오면 connector를 같은 위치에 맞춤
const SNAP_DISTANCE = 20;


// -----------------------------------------
// 스킨 관리
// -----------------------------------------

const SKINS = {
  DOT: "dot",
  BLOB: "blob",
  GRADIENT: "gradient"
};

// 현재 사용할 스킨
let ACTIVE_SKIN = SKINS.BLOB;


// -----------------------------------------
// 눈 설정
// 여기 값들만 바꾸면 눈 전체 조절 가능
// -----------------------------------------

// 눈 개수
const EYE_MIN_COUNT = 1;
const EYE_MAX_COUNT = 3;

// 눈 크기
const EYE_MIN_SIZE = 10;
const EYE_MAX_SIZE = 22;

// 뼈대 선 위에서 눈이 생길 위치 범위
// 0 = 선 시작 / 1 = 선 끝
const EYE_T_MIN = 0.2;
const EYE_T_MAX = 0.9;

// 뼈대에서 떨어지는 거리
const EYE_DISTANCE_MIN = 2;
const EYE_DISTANCE_MAX = 20;

// 눈끼리 최소 간격
const EYE_MIN_GAP = 5;

// 겹치지 않는 위치를 찾는 최대 횟수
const EYE_PLACEMENT_ATTEMPTS = 50;

// 생성 후 눈이 나타나는 시간
const EYE_DELAY_MIN = 600;
const EYE_DELAY_MAX = 1800;

// 눈이 자라는 시간
const EYE_GROW_DURATION = 500;

// 흰자 대비 눈동자 크기
const EYE_PUPIL_RATIO = 0.55;

// 눈 테두리 색
const EYE_STROKE_COLOR = "#000000";

// -----------------------------------------
// 눈동자 움직임
// -----------------------------------------

// 눈동자가 움직일 수 있는 최대 거리
const EYE_PUPIL_MOVE_RATIO = 0.22;

// 마우스에 반응하는 범위
const EYE_PUPIL_FOLLOW_RANGE = 350;

// 눈마다 마우스를 따라가는 속도 범위
const EYE_PUPIL_EASING_MIN = 0.06;
const EYE_PUPIL_EASING_MAX = 0.2;

// -----------------------------------------
// 눈 깜빡임
// -----------------------------------------

// 깜빡이는 간격
const EYE_BLINK_INTERVAL_MIN = 6000;
const EYE_BLINK_INTERVAL_MAX = 10000;

// 검은 원이 보이는 시간
const EYE_BLINK_HOLD_DURATION = 200;

// -----------------------------------------
// DOT 스킨
// -----------------------------------------

// 뼈대 한 구간에 생성할 스킨 점 개수
const SKIN_DOT_MIN = 5;
const SKIN_DOT_MAX = 10;

// 스킨 점 크기 범위
const SKIN_DOT_SIZE_MIN =7;
const SKIN_DOT_SIZE_MAX = 25;

// 뼈대 중심에서 퍼질 수 있는 거리
const SKIN_SPREAD = 15;

// -----------------------------------------
// GRADIENT 스킨
// -----------------------------------------

// 점 크기 범위
const GRADIENT_DOT_SIZE_MIN = 18;
const GRADIENT_DOT_SIZE_MAX = 70;

// 점 개수 비율
// 1에 가까울수록 많고, 낮을수록 드문드문해짐
const GRADIENT_DOT_DENSITY = 0.35;

// 그라데이션 색상
const GRADIENT_CENTER_COLOR = "#ff00cc";
const GRADIENT_MID_COLOR = "#cc00ff";
const GRADIENT_EDGE_COLOR = "#85f1fd";

// 중심 진하기
const GRADIENT_CENTER_ALPHA = 1;

// 중심색이 유지되는 범위
// 0 = 아주 좁음 / 1 = 아주 넓음
const GRADIENT_CENTER_POSITION = 0.25;

// 중간색이 들어가는 위치
// 0 = 중심, 1 = 가장자리
const GRADIENT_MID_POSITION = 0.5;

// 중간색 진하기
const GRADIENT_MID_ALPHA = 0.65;

// 가장자리 색이 나타나는 위치
// MID_POSITION보다 반드시 큰 값이어야 함
const GRADIENT_EDGE_POSITION = 0.8;

// 가장자리 색 진하기
// 이후 원 끝에서 0으로 자연스럽게 사라짐
const GRADIENT_EDGE_ALPHA = 0.2;

// -----------------------------------------
// BLOB 스킨
// -----------------------------------------

// BLOB 몸통의 기본 두께
const BLOB_THICKNESS = 36;

// 덩어리들이 서로 녹아붙는 정도
const BLOB_BLUR = 3;

// BLOB을 이루는 덩어리 크기 범위
const BLOB_SIZE_MIN = 30;
const BLOB_SIZE_MAX = 52;

// BLOB 유닛 전체 크기 배율 범위
const BLOB_UNIT_SCALE_MIN = 0.84;
const BLOB_UNIT_SCALE_MAX = 1.4;

// 뼈대를 따라 BLOB 덩어리가 배치되는 간격
const BLOB_SAMPLE_GAP = 40;

// BLOB 유닛을 이루는 점의 크기 범위
const BLOB_UNIT_POINT_MIN = 8;
const BLOB_UNIT_POINT_MAX = 14;

// 중심점에서 바깥점까지의 거리 범위
const BLOB_UNIT_DISTANCE_MIN = 12;
const BLOB_UNIT_DISTANCE_MAX = 22;

// 바깥점 3개의 각도를 불규칙하게 만드는 정도
const BLOB_UNIT_ANGLE_JITTER = 0.45;


// -----------------------------------------
// 디버그 표시
// -----------------------------------------

// 물리 뼈대를 화면에 보여줄지 여부
const SHOW_SKELETON = false;

// 프레임 가이드를 화면에 보여줄지 여부
let SHOW_FRAMES = false;

// 방출 작업 영역 가이드를 화면에 보여줄지 여부
const SHOW_CULTURE_AREA = false;

// -----------------------------------------
// 반응형 캔버스 크기
// -----------------------------------------

// 브라우저 크기를 기준으로 캔버스 너비 계산
function getCanvasWidth() {
  return windowWidth;
}

// 브라우저 크기를 기준으로 캔버스 높이 계산
function getCanvasHeight() {
  return windowHeight;
}

// 배양 영역의 세로 중심 위치
// 캔버스가 전체 화면이 되어도 기존 배양 위치는 유지
function getCultureCenterY() {
  const previousCanvasHeight =
    Math.max(
      300,
      windowHeight - PAGE_MARGIN * 2 - CONTROL_AREA_HEIGHT
    );

  return (
    PAGE_MARGIN +
    previousCanvasHeight / 2 +
    SYLLABLE_Y_OFFSET
  );
}


// =====================================================
// 2. JAMO DATA
// 각 자모의 관절(nodes), 선(edges), 결합점(connectors)
// =====================================================

// -----------------------------------------
// 자모 grid 좌표
// -----------------------------------------

// JAMO의 node 좌표는 px가 아니라 정수 grid 단위로 사용

const JAMO = {

  // -----------------------------------------
  // 기본 자음
  // -----------------------------------------

    // -----------------------------------------
  // 기본 자음
  // -----------------------------------------

  // ㄱ
  'ㄱ': {
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 왼쪽 위
      { x: 2, y: 0 }, // 오른쪽 위
      { x: 2, y: 2 }  // 오른쪽 아래
    ],
    edges: [[0, 1], [1, 2]],
    connectors: [0, 2]
  },

  // ㄴ
  'ㄴ': {
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 왼쪽 위
      { x: 0, y: 2 }, // 왼쪽 아래
      { x: 2, y: 2 }  // 오른쪽 아래
    ],
    edges: [[0, 1], [1, 2]],
    connectors: [0, 2]
  },

  // ㄷ
  'ㄷ': {
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 왼쪽 위
      { x: 2, y: 0 }, // 1 오른쪽 위
      { x: 0, y: 2 }, // 2 왼쪽 아래
      { x: 2, y: 2 }  // 3 오른쪽 아래
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
    grid: true,
    nodes: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 }
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
    grid: true,
    nodes: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 }
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
    grid: true,
    nodes: [
      { x: 0, y: -0.3 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: -0.3 },
      { x: 2, y: 1 },
      { x: 2, y: 2 }
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
    grid: true,
    nodes: [
      { x: 1, y: 0.5 },   // 위쪽 끝
      { x: 1, y: 1.3 }, // 갈라지는 중심
      { x: 0, y: 2.3 }, // 왼쪽 아래
      { x: 2, y: 2.3 }  // 오른쪽 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],
    connectors: [0, 2, 3]
  },

  // ㅇ
  'ㅇ': {
    grid: true,
    nodes: [
      { x: 1.5, y: 0 },   // 위
      { x: 3, y: 1.5 },   // 오른쪽
      { x: 1.5, y: 3 },   // 아래
      { x: 0, y: 1.5 }    // 왼쪽
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0]
    ],
    connectors: [0, 1, 2, 3]
  },

  // ㅈ
  'ㅈ': {
    grid: true,
    nodes: [
      { x: -0.3, y: 0.5 }, // 0 가로획 왼쪽
      { x: 1, y: 0.5 }, // 1 가로획 중심
      { x: 2.3, y: 0.5 }, // 2 가로획 오른쪽
      { x: 1, y: 1.3 }, // 3 갈라지는 중심
      { x: 0, y: 2.3 }, // 4 왼쪽 아래
      { x: 2, y: 2.3 }  // 5 오른쪽 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [3, 5]
    ],
    connectors: [0, 2, 4, 5]
  },

  // ㅊ
  'ㅊ': {
    grid: true,
    nodes: [
      { x: -0.3, y: 0.5 }, // 0 가로획 왼쪽
      { x: 1, y: 0.5 }, // 1 가로획 중심
      { x: 2.3, y: 0.5 }, // 2 가로획 오른쪽
      { x: 1, y: -0.7 }, // 3 맨 위쪽 끝
      { x: 1, y: 1.3 }, // 4 갈라지는 중심
      { x: 0, y: 2.3 }, // 5 왼쪽 아래
      { x: 2, y: 2.3 }  // 6 오른쪽 아래
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [4, 5],
      [4, 6]
    ],
    connectors: [0, 2, 3, 5, 6]
  },

  // ㅋ
  'ㅋ': {
    grid: true,
    nodes: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 1 },
      { x: 2, y: 2 }
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
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 왼쪽 위
      { x: 2, y: 0 }, // 1 오른쪽 위
      { x: 0, y: 1 }, // 2 왼쪽 가운데
      { x: 2, y: 1 }, // 3 오른쪽 가운데
      { x: 0, y: 2 }, // 4 왼쪽 아래
      { x: 2, y: 2 }  // 5 오른쪽 아래
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
    grid: true,
    nodes: [
      // 위 가로획
      { x: -0.4, y: 0 },   // 0 왼쪽 끝
      { x: 0.5, y: 0 }, // 1 왼쪽 교차점
      { x: 1.5, y: 0 }, // 2 오른쪽 교차점
      { x: 2.4, y: 0 },   // 3 오른쪽 끝

      // 아래 가로획
      { x: -0.4, y: 2 },   // 4 왼쪽 끝
      { x: 0.5, y: 2 }, // 5 왼쪽 교차점
      { x: 1.5, y: 2 }, // 6 오른쪽 교차점
      { x: 2.4, y: 2 }    // 7 오른쪽 끝
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
    grid: true,

    nodes: [
      // 윗부분
      { x: -0.3, y: -0.8 }, // 0 가로획 왼쪽
      { x: 1, y: -0.8 }, // 1 가로획 중심
      { x: 2.3, y: -0.8 }, // 2 가로획 오른쪽
      { x: 1, y: -2 },   // 3 맨 위쪽 끝

      // 아래 ㅇ (관절 4개)
      { x: 1, y: 0 }, // 4 위
      { x: 2.3, y: 1 }, // 5 오른쪽
      { x: 1, y: 1.7 }, // 6 아래
      { x: -0.3, y: 1 }  // 7 왼쪽
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
      [7, 4]
    ],

    connectors: [0, 2, 3, 4, 5, 6, 7]
  },


  // -----------------------------------------
  // 된소리
  // -----------------------------------------

  // ㄲ
  'ㄲ': {
    grid: true,
    nodes: [
      // 왼쪽 ㄱ
      { x: 0, y: 0 },   // 0
      { x: 1, y: 0 },   // 1
      { x: 1, y: 2 },   // 2

      // 오른쪽 ㄱ
      { x: 1.5, y: 0 }, // 3
      { x: 2.5, y: 0 }, // 4
      { x: 2.5, y: 2 }  // 5
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
    grid: true,
    nodes: [
      // 왼쪽 ㄷ
      { x: 0, y: 0 },     // 0 왼쪽 위
      { x: 1.25, y: 0 },  // 1 오른쪽 위
      { x: 0, y: 2 },     // 2 왼쪽 아래
      { x: 1.25, y: 2 },  // 3 오른쪽 아래

      // 오른쪽 ㄷ
      { x: 1.75, y: 0 },  // 4 왼쪽 위
      { x: 3, y: 0 },     // 5 오른쪽 위
      { x: 1.75, y: 2 },  // 6 왼쪽 아래
      { x: 3, y: 2 }      // 7 오른쪽 아래
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
    grid: true,
    nodes: [
      // 왼쪽 ㅂ
      { x: 0, y: 0 },     // 0 왼쪽 위
      { x: 0, y: 1.25 },  // 1 왼쪽 가운데
      { x: 0, y: 2.5 },   // 2 왼쪽 아래
      { x: 1, y: 0 },     // 3 오른쪽 위
      { x: 1, y: 1.25 },  // 4 오른쪽 가운데
      { x: 1, y: 2.5 },   // 5 오른쪽 아래

      // 오른쪽 ㅂ
      { x: 2, y: 0 },     // 6 왼쪽 위
      { x: 2, y: 1.25 },  // 7 왼쪽 가운데
      { x: 2, y: 2.5 },   // 8 왼쪽 아래
      { x: 3, y: 0 },     // 9 오른쪽 위
      { x: 3, y: 1.25 },  // 10 오른쪽 가운데
      { x: 3, y: 2.5 }    // 11 오른쪽 아래
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
    grid: true,
    nodes: [
      // 왼쪽 ㅅ
      { x: 0.6, y: 0.5 }, // 0 위쪽 끝
      { x: 0.6, y: 1.3 }, // 1 갈라지는 중심
      { x: 0, y: 2.3 },   // 2 왼쪽 아래
      { x: 1.2, y: 2.3 }, // 3 오른쪽 아래

      // 오른쪽 ㅅ
      { x: 2.2, y: 0.5 }, // 4 위쪽 끝
      { x: 2.2, y: 1.3 }, // 5 갈라지는 중심
      { x: 1.6, y: 2.3 }, // 6 왼쪽 아래
      { x: 2.8, y: 2.3 }  // 7 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㅅ
      [0, 1],
      [1, 2],
      [1, 3],

      // 오른쪽 ㅅ
      [4, 5],
      [5, 6],
      [5, 7]
    ],
    connectors: [0, 2, 3, 4, 6, 7]
  },

  // ㅉ
  'ㅉ': {
    grid: true,
    nodes: [
      // 왼쪽 ㅈ
      { x: 0, y: 0.5 },   // 0 가로획 왼쪽
      { x: 0.6, y: 0.5 }, // 1 가로획 중심
      { x: 1.2, y: 0.5 }, // 2 가로획 오른쪽
      { x: 0.6, y: 1.3 }, // 3 갈라지는 중심
      { x: 0, y: 2.3 },   // 4 왼쪽 아래
      { x: 1.2, y: 2.3 }, // 5 오른쪽 아래

      // 오른쪽 ㅈ
      { x: 1.6, y: 0.5 }, // 6 가로획 왼쪽
      { x: 2.2, y: 0.5 }, // 7 가로획 중심
      { x: 2.8, y: 0.5 }, // 8 가로획 오른쪽
      { x: 2.2, y: 1.3 }, // 9 갈라지는 중심
      { x: 1.6, y: 2.3 }, // 10 왼쪽 아래
      { x: 2.8, y: 2.3 }  // 11 오른쪽 아래
    ],
    edges: [
      // 왼쪽 ㅈ
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [3, 5],

      // 오른쪽 ㅈ
      [6, 7],
      [7, 8],
      [7, 9],
      [9, 10],
      [9, 11]
    ],
    connectors: [0, 2, 4, 5, 6, 8, 10, 11]
  },


  // -----------------------------------------
  // 기본 모음
  // -----------------------------------------

  // ㅏ
  'ㅏ': {
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 위
      { x: 0, y: 2 }, // 1 중심
      { x: 2, y: 2 }, // 2 오른쪽
      { x: 0, y: 4 }  // 3 아래
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
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 위
      { x: 0, y: 1 }, // 1 위쪽 갈림점
      { x: 2, y: 1 }, // 2 오른쪽 위
      { x: 0, y: 3 }, // 3 아래쪽 갈림점
      { x: 2, y: 3 }, // 4 오른쪽 아래
      { x: 0, y: 4 }  // 5 아래
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
    grid: true,
    nodes: [
      { x: 2, y: 0 }, // 0 위
      { x: 2, y: 2 }, // 1 중심
      { x: 0, y: 2 }, // 2 왼쪽
      { x: 2, y: 4 }  // 3 아래
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
    grid: true,
    nodes: [
      { x: 2, y: 0 }, // 0 위
      { x: 2, y: 1 }, // 1 위쪽 갈림점
      { x: 0, y: 1 }, // 2 왼쪽 위
      { x: 2, y: 3 }, // 3 아래쪽 갈림점
      { x: 0, y: 3 }, // 4 왼쪽 아래
      { x: 2, y: 4 }  // 5 아래
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
    grid: true,
    nodes: [
      { x: 0, y: 1.5 }, // 0 왼쪽
      { x: 2, y: 1.5 }, // 1 중심
      { x: 2, y: 0 }, // 2 위
      { x: 4, y: 1.5 }  // 3 오른쪽
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
    grid: true,
    nodes: [
      { x: 0, y: 2 }, // 0 왼쪽
      { x: 1, y: 2 }, // 1 왼쪽 갈림점
      { x: 1, y: 0 }, // 2 왼쪽 위
      { x: 3, y: 2 }, // 3 오른쪽 갈림점
      { x: 3, y: 0 }, // 4 오른쪽 위
      { x: 4, y: 2 }  // 5 오른쪽
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
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 왼쪽
      { x: 2, y: 0 }, // 1 중심
      { x: 2, y: 1.5 }, // 2 아래
      { x: 4, y: 0 }  // 3 오른쪽
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
    grid: true,
    nodes: [
      { x: -0.5, y: 0 }, // 0 왼쪽
      { x: 1, y: 0 }, // 1 왼쪽 갈림점
      { x: 1, y: 2 }, // 2 왼쪽 아래
      { x: 3, y: 0 }, // 3 오른쪽 갈림점
      { x: 3, y: 2 }, // 4 오른쪽 아래
      { x: 4.5, y: 0 }  // 5 오른쪽
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
    grid: true,
    nodes: [
      { x: 0, y: 0 }, // 0 왼쪽
      { x: 4, y: 0 }  // 1 오른쪽
    ],
    edges: [[0, 1]],
    connectors: [0, 1]
  },

  // ㅣ
  'ㅣ': {
    grid: true,

    nodes: [
      { x: 0, y: 0 }, // 0 위
      { x: 0, y: 2 }, // 1 중심
      { x: 0, y: 4 }  // 2 아래
    ],

    edges: [
      [0, 1],
      [1, 2]
    ],

    connectors: [0, 2]
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
      { x: 240, y: 100 }, // 3 오른쪽 위
      { x: 240, y: 200 }, // 4 오른쪽 중심
      { x: 240, y: 300 }  // 5 오른쪽 아래
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
      { x: 240, y: 100 }, // 4 오른쪽 위
      { x: 240, y: 160 }, // 5 오른쪽 위 갈림점
      { x: 240, y: 240 }, // 6 오른쪽 아래 갈림점
      { x: 240, y: 300 }  // 7 오른쪽 아래
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
      { x: 240, y: 100 }, // 4 위
      { x: 240, y: 200 }, // 5 중심
      { x: 240, y: 300 }  // 6 아래
    ],

    edges: [
      // ㅓ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 5],
      [5, 6]
    ],

    connectors: [0, 2, 3, 4, 6]
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
      { x: 240, y: 100 }, // 6 위
      { x: 240, y: 300 }, // 7 아래
      { x: 240, y: 200 }  // 8 중심
    ],

    edges: [
      // ㅕ
      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4],

      // ㅣ
      [6, 8],
      [8, 7]
    ],

    connectors: [0, 2, 4, 5, 6, 7]
  },

  // ㅘ = ㅗ + ㅏ
  'ㅘ': {
    nodes: [
      // ㅗ
      { x: 60, y: 200 },  // 0 왼쪽
      { x: 130, y: 200 }, // 1 중심
      { x: 130, y: 130 }, // 2 위
      { x: 200, y: 200 }, // 3 오른쪽

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
      { x: 40, y: 200 },  // 0 왼쪽
      { x: 100, y: 200 }, // 1 중심
      { x: 100, y: 130 }, // 2 위
      { x: 160, y: 200 }, // 3 오른쪽

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
      { x: 70,  y: 200 }, // 0 왼쪽
      { x: 140, y: 200 }, // 1 중심
      { x: 140, y: 130 }, // 2 위
      { x: 210, y: 200 }, // 3 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 4 위
      { x: 280, y: 300 }, // 5 아래
      { x: 280, y: 200 }  // 6 중심
    ],

    edges: [
      // ㅗ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 6],
      [6, 5]
    ],

    connectors: [0, 2, 3, 4, 5]
  },

  // ㅝ = ㅜ + ㅓ
  'ㅝ': {
    nodes: [
      // ㅜ
      { x: 60, y: 140 },  // 0 왼쪽
      { x: 130, y: 140 }, // 1 중심
      { x: 130, y: 200 }, // 2 아래
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
      { x: 40,  y: 140 }, // 0 왼쪽
      { x: 100, y: 140 }, // 1 중심
      { x: 100, y: 200 }, // 2 아래
      { x: 160, y: 140 }, // 3 오른쪽

      // ㅓ
      { x: 230, y: 100 }, // 4 위
      { x: 230, y: 200 }, // 5 중심
      { x: 180, y: 200 }, // 6 왼쪽
      { x: 230, y: 300 }, // 7 아래

      // ㅣ
      { x: 300, y: 100 }, // 8 위
      { x: 300, y: 300 }, // 9 아래
      { x: 300, y: 200 }  // 10 중심
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
      [8, 10],
      [10, 9]
    ],

    connectors: [0, 2, 3, 4, 6, 7, 8, 9]
  },

  // ㅟ = ㅜ + ㅣ
  'ㅟ': {
    nodes: [
      // ㅜ
      { x: 60,  y: 140 }, // 0 왼쪽
      { x: 130, y: 140 }, // 1 중심
      { x: 130, y: 260 }, // 2 아래
      { x: 200, y: 140 }, // 3 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 4 위
      { x: 280, y: 300 }, // 5 아래
      { x: 280, y: 200 }  // 6 중심
    ],

    edges: [
      // ㅜ
      [0, 1],
      [1, 2],
      [1, 3],

      // ㅣ
      [4, 6],
      [6, 5]
    ],

    connectors: [0, 2, 3, 4, 5]
  },

  // ㅢ = ㅡ + ㅣ
  'ㅢ': {
    nodes: [
      // ㅡ
      { x: 60,  y: 200 }, // 0 왼쪽
      { x: 200, y: 200 }, // 1 오른쪽

      // ㅣ
      { x: 280, y: 100 }, // 2 위
      { x: 280, y: 300 }, // 3 아래
      { x: 280, y: 200 }  // 4 중심
    ],

    edges: [
      // ㅡ
      [0, 1],

      // ㅣ
      [2, 4],
      [4, 3]
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

// -----------------------------------------
// 가로 + 세로 복합모음 구조
// -----------------------------------------

// 복합모음 안에서
// 가로형 중성 프레임과 세로형 중성 프레임에 들어갈 node를 구분
const COMPOUND_VOWEL_PARTS = {
  "ㅘ": {
    horizontal: [0, 1, 2, 3], // ㅗ
    vertical: [4, 5, 6, 7]    // ㅏ
  },

  "ㅙ": {
    horizontal: [0, 1, 2, 3],       // ㅗ
    vertical: [4, 5, 6, 7, 8, 9]    // ㅐ
  },

  "ㅚ": {
    horizontal: [0, 1, 2, 3], // ㅗ
    vertical: [4, 5, 6]        // ㅣ
  },

  "ㅝ": {
    horizontal: [0, 1, 2, 3], // ㅜ
    vertical: [4, 5, 6, 7]    // ㅓ
  },

  "ㅞ": {
    horizontal: [0, 1, 2, 3],          // ㅜ
    vertical: [4, 5, 6, 7, 8, 9, 10]  // ㅔ
  },

  "ㅟ": {
    horizontal: [0, 1, 2, 3], // ㅜ
    vertical: [4, 5, 6]        // ㅣ
  },

  "ㅢ": {
    horizontal: [0, 1],    // ㅡ
    vertical: [2, 3, 4]    // ㅣ
  }
};



// =====================================================
// 4. STATE
// 실행 중 계속 바뀌는 값
// =====================================================

// 캔버스
let canvas;

// BLOB 스킨을 그리는 별도 그래픽 레이어
let blobLayer;

// GRADIENT 스킨에 반복해서 사용할 원형 그라데이션 이미지
let gradientDotTexture;

// 생성된 자모 개체
let jamoInstances = [];

// 풀어준 개체들
let releasedOrganisms = [];

// 방출 전환 시작 시간
// null이면 방출 중이 아님
let releaseTransitionStartedAt = null;

// 방출 전환 화면의 DOT 미리보기 데이터
let releasePreviewDots = [];

// 방출 전환 화면의 눈 미리보기 데이터
let releasePreviewEye = null;

// 방출 전환 화면 DOT 미리보기용 작은 뼈대
const RELEASE_PREVIEW_POINTS = [
  { x: 60, y: 45 },
  { x: 38, y: 30 },
  { x: 82, y: 32 },
  { x: 60, y: 68 }
];

const RELEASE_PREVIEW_SPRINGS = [
  { a: 0, b: 1 },
  { a: 0, b: 2 },
  { a: 0, b: 3 }
];

// 인벤토리에 저장된 개체들
let inventoryItems = [];

// 브라우저에 인벤토리를 저장할 IndexedDB
let inventoryDatabasePromise = null;

// 방출 개체를 마지막으로 저장한 시간
let lastReleasedSaveAt = 0;

// 현재 마우스가 올라가 있는 자모
// 없으면 null
let hoveredJamoIndex = null;

// 현재 마우스로 잡고 있는 물리점
// 잡고 있지 않으면 null
let draggedPoint = null;

// 조작 UI
let pointCountSlider;
let zoomSlider;
let textInput;
let generateButton;
let typeButton;

// 현재 화면 줌 배율
let viewZoom = 1;

// 현재 생성된 개체의 스킨 색
let currentSkinColor;

// 현재 배양 중인 개체의 나이
let organismBornAt = null;
let organismAge = 0;
let organismAgeRunning = false;

// -----------------------------------------
// 풀어준 개체 설정
// -----------------------------------------

// 방출 전환 최대 대기시간
const RELEASE_TRANSITION_MAX_DURATION = 5000;

// 방출 직후 작업 영역에서 벗어날 때 확보할 거리
const RELEASE_ESCAPE_GAP = 100;

// 방출 직후 바깥쪽으로 방향을 유도하는 정도
const RELEASE_ESCAPE_STEER = 0.15;

// 방출 직후 이동 속도 배율
const RELEASE_ESCAPE_SPEED = 3;

// 화면에 돌아다닐 수 있는 최대 개체 수
const MAX_RELEASED_ORGANISMS = 20;

// 인벤토리에 저장할 수 있는 최대 개체 수
const MAX_INVENTORY_ITEMS = 30;

// 풀어준 개체끼리 띄울 최소 간격
const RELEASED_MIN_GAP = 20;

// 너무 가까워졌을 때 서로 밀어내는 힘
const RELEASED_SEPARATION_FORCE = 0.08;

// 풀어준 개체가 계속 이동하려는 힘
const RELEASED_MOVE_FORCE_MIN = 0.08;
const RELEASED_MOVE_FORCE_MAX = 0.12;

// 개체가 활동하는 전체 공간 크기
// 3 = 현재 화면 가로·세로의 각각 3배
const RELEASED_WORLD_SCALE = 5;

// 가장자리에서 안쪽으로 밀어주는 힘 배율
const RELEASED_EDGE_FORCE = 4;

// 새 이동 방향을 선택하는 시간 범위
const RELEASED_DIRECTION_INTERVAL_MIN = 1000;
const RELEASED_DIRECTION_INTERVAL_MAX = 3000;

// 새 방향으로 부드럽게 회전하는 정도
const RELEASED_DIRECTION_EASING = 0.04;

// 이동 방향을 따라 몸의 축이 회전하는 속도
const RELEASED_BODY_TURN_EASING = 0.02;

// 풀어준 개체의 유기적인 뼈대 움직임
const RELEASED_MOVE_SCALE = 0.25;
const RELEASED_WAVE_SPEED = 0.045;
const RELEASED_WAVE_SPACING = 55;
const RELEASED_CONTRACT_RATIO = 0.06;
const RELEASED_BEND_FORCE = 0.012;


// =====================================================
// 5. SETUP
// 페이지가 시작될 때 한 번만 실행
// =====================================================

function setup() {
  // 브라우저 크기에 맞춰 캔버스 생성
  canvas = createCanvas(getCanvasWidth(), getCanvasHeight());

  // BLOB 스킨 작업용 그래픽 레이어 생성
  blobLayer = createGraphics(width, height);

  // GRADIENT 스킨용 원형 그라데이션 이미지를 한 번만 생성
  gradientDotTexture = createGraphics(128, 128);

  const gradientContext =
    gradientDotTexture.drawingContext;

  const gradient =
    gradientContext.createRadialGradient(
      64,
      64,
      0,
      64,
      64,
      64
    );

  const centerColor = color(GRADIENT_CENTER_COLOR);
  centerColor.setAlpha(GRADIENT_CENTER_ALPHA * 255);

  const midColor = color(GRADIENT_MID_COLOR);
  midColor.setAlpha(GRADIENT_MID_ALPHA * 255);

  const edgeColor = color(GRADIENT_EDGE_COLOR);
  edgeColor.setAlpha(GRADIENT_EDGE_ALPHA * 255);

  const transparentEdgeColor = color(GRADIENT_EDGE_COLOR);
  transparentEdgeColor.setAlpha(0);

  // 중심색은 정중앙에서 시작
  gradient.addColorStop(
    0,
    centerColor.toString()
  );

  // 중심색이 일정 범위까지 유지되도록 설정
  gradient.addColorStop(
    GRADIENT_CENTER_POSITION,
    centerColor.toString()
  );

  // 그 이후 중간색으로 자연스럽게 연결
  gradient.addColorStop(
    GRADIENT_MID_POSITION,
    midColor.toString()
  );

  // 가장자리 색은 안쪽에서 보이고
  // 설정한 위치부터 바깥으로 부드럽게 사라짐
  gradient.addColorStop(
    GRADIENT_EDGE_POSITION,
    edgeColor.toString()
  );

  // 원의 끝에서는 완전히 투명하게 사라짐
  gradient.addColorStop(
    1,
    transparentEdgeColor.toString()
  );

  // 그라데이션을 원 안에만 그리기
  // 텍스처의 사각형 영역이 보이지 않도록 함
  gradientContext.fillStyle = gradient;
  gradientContext.beginPath();
  gradientContext.arc(
    64,
    64,
    64,
    0,
    Math.PI * 2
  );
  gradientContext.fill();

  // 캔버스를 브라우저 왼쪽 위부터 전체 화면에 배치
  canvas.position(0, 0);

  // Zoom 슬라이더
  zoomSlider =
    document.getElementById("zoom-slider");

  viewZoom =
    2 - Number(zoomSlider.value) / 100

  zoomSlider.addEventListener("input", function() {
    viewZoom =
      2 - Number(zoomSlider.value) / 100;
  });

  // 각 edge 사이에 추가할 물리점 개수 (가장 오른쪽이 기본 pointcount)
  pointCountSlider = createSlider(0, 8, 1, 2);
  pointCountSlider.parent("point-control");

  // Point Count 변경 시 현재 글자를 새 물리구조로 다시 생성
  pointCountSlider.changed(generateJamosFromInput);

  // 한글 입력창
  textInput = createInput("");
  textInput.parent("text-control");
  textInput.attribute("placeholder", "최대 10마리까지 배양 가능합니다.");

  // Enter 키도 생성 버튼과 같은 기능
  textInput.elt.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      generateJamosFromInput();
    }
  });

  // 생성 버튼
  generateButton = createButton("생성");
  generateButton.parent("text-control");
  generateButton.mousePressed(generateJamosFromInput);

  // 타입 변경 버튼
  typeButton = createButton("타입");
  typeButton.parent("text-control");
  typeButton.mousePressed(changeSkinRandomly);

    // Inventory 열기 / 닫기
  const inventoryControl = document.querySelector(".inventory-control");
  const inventoryToggle = document.getElementById("inventory-toggle");

  inventoryToggle.addEventListener("click", function() {
    inventoryControl.classList.toggle("open");
  });

  // 시작 화면 닫기
  const introScreen = document.getElementById("intro-screen");
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", function() {
    introScreen.classList.add("hidden");
  });

  // 풀어주기 버튼
  document.getElementById("release-button").addEventListener("click", releaseOrganism);

  // 브라우저에 저장된 인벤토리 불러오기
  loadInventoryItems();

  // 브라우저에 저장된 방출 개체 불러오기
  loadReleasedOrganisms();
}

// -----------------------------------------
// 타입 버튼
// 저장된 스킨 중 하나를 랜덤으로 선택
// -----------------------------------------

function changeSkinRandomly() {
  const skinList = Object.values(SKINS);

  // 현재 스킨은 제외
  const otherSkins = skinList.filter(
    skin => skin !== ACTIVE_SKIN
  );

  // 다른 스킨 중 하나를 랜덤으로 선택
  if (otherSkins.length > 0) {
    ACTIVE_SKIN = random(otherSkins);
  }
}

// -----------------------------------------
// 배양 조작 잠금 / 해제
// 방출 중에는 입력과 버튼 사용을 잠시 막음
// -----------------------------------------

function setCultureControlsDisabled(disabled) {
  textInput.elt.disabled = disabled;
  generateButton.elt.disabled = disabled;
  typeButton.elt.disabled = disabled;
}

// -----------------------------------------
// 방출 전환 상태 업데이트
// 최대 대기시간이 지나면 배양 조작을 다시 활성화
// -----------------------------------------

function updateReleaseTransition() {
  if (releaseTransitionStartedAt === null) {
    return;
  }

  const elapsed =
    millis() - releaseTransitionStartedAt;

  if (elapsed >= RELEASE_TRANSITION_MAX_DURATION) {
    releaseTransitionStartedAt = null;

    // 방출 전환 화면 숨기기
    document.getElementById("release-transition").hidden = true;

    setCultureControlsDisabled(false);
  }
}

// -----------------------------------------
// 인벤토리 저장공간 열기
// 같은 브라우저에서 다시 접속해도 유지
// -----------------------------------------

function openInventoryDatabase() {
  if (inventoryDatabasePromise) {
    return inventoryDatabasePromise;
  }

  inventoryDatabasePromise = new Promise((resolve, reject) => {
    const request =
      indexedDB.open("typeLabInventory", 1);

    request.onupgradeneeded = function() {
      const database = request.result;

      if (!database.objectStoreNames.contains("inventory")) {
        database.createObjectStore("inventory");
      }
    };

    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function() {
      reject(request.error);
    };
  });

  return inventoryDatabasePromise;
}

// -----------------------------------------
// 인벤토리 저장
// 현재 인벤토리 전체를 브라우저에 저장
// -----------------------------------------

async function saveInventoryItems() {
  const database =
    await openInventoryDatabase();

  const transaction =
    database.transaction(
      "inventory",
      "readwrite"
    );

  const store =
    transaction.objectStore("inventory");

  store.put(
    inventoryItems,
    "items"
  );
}

// -----------------------------------------
// 방출된 개체 저장
// 새로고침 후에도 배경 개체를 유지
// -----------------------------------------

async function saveReleasedOrganisms() {
  const database =
    await openInventoryDatabase();

  const transaction =
    database.transaction(
      "inventory",
      "readwrite"
    );

  const store =
    transaction.objectStore("inventory");

  const releasedData =
    releasedOrganisms.map((organism) => ({
      jamos: organism.jamos,

      lockedConnectorPairs:
        organism.lockedConnectorPairs,

      skin: organism.skin,

      releasedAt:
        organism.releasedAt,

      isEscaping:
        organism.isEscaping,

      moveAngle:
        organism.moveAngle,

      previousMoveAngle:
        organism.previousMoveAngle,

      bodyRotation:
        organism.bodyRotation,

      targetBodyRotation:
        organism.targetBodyRotation,

      targetMoveAngle:
        organism.targetMoveAngle,

      moveForce:
        organism.moveForce
    }));

  store.put(
    releasedData,
    "releasedOrganisms"
  );
}

// -----------------------------------------
// 인벤토리 불러오기
// 브라우저에 저장된 개체를 다시 가져옴
// -----------------------------------------

async function loadInventoryItems() {
  const database =
    await openInventoryDatabase();

  const transaction =
    database.transaction(
      "inventory",
      "readonly"
    );

  const store =
    transaction.objectStore("inventory");

  const request =
    store.get("items");

  request.onsuccess = function() {
    inventoryItems =
      request.result ?? [];

    renderInventoryItems();
  };
}

// -----------------------------------------
// 방출된 개체 불러오기
// 새로고침 후 저장된 위치에서 다시 움직임
// -----------------------------------------

async function loadReleasedOrganisms() {
  const database =
    await openInventoryDatabase();

  const transaction =
    database.transaction(
      "inventory",
      "readonly"
    );

  const store =
    transaction.objectStore("inventory");

  const request =
    store.get("releasedOrganisms");

  request.onsuccess = function() {
    const savedOrganisms =
      request.result ?? [];

    const now =
      millis();

    for (const organism of savedOrganisms) {
      // 방향 전환 시간만 현재 시간 기준으로 다시 시작
      organism.nextDirectionChangeAt =
        now +
        random(
          RELEASED_DIRECTION_INTERVAL_MIN,
          RELEASED_DIRECTION_INTERVAL_MAX
        );

      organism.previousMoveAngle =
        organism.moveAngle;

      for (const jamo of organism.jamos) {
        // DOT는 이미 성장한 상태로 복원
        for (const dot of jamo.skinDots ?? []) {
          dot.startTime =
            now - dot.growthDuration;
        }

        // GRADIENT도 이미 성장한 상태로 복원
        for (const dot of jamo.gradientDots ?? []) {
          dot.startTime =
            now - dot.growthDuration;
        }

        // 눈도 이미 성장한 상태로 복원
        for (const eye of jamo.eyes ?? []) {
          eye.startTime =
            now - EYE_GROW_DURATION;

          eye.blinkStartTime =
            -1;

          eye.nextBlinkTime =
            now +
            random(
              EYE_BLINK_INTERVAL_MIN,
              EYE_BLINK_INTERVAL_MAX
            );
        }
      }
    }

    releasedOrganisms =
      savedOrganisms;
  };
}

// -----------------------------------------
// 인벤토리 목록 표시
// 저장된 개체 수만큼 항목을 생성
// -----------------------------------------

function renderInventoryItems() {
  const inventoryList =
    document.querySelector(".inventory-list");

  inventoryList.innerHTML = "";

  for (const item of inventoryItems) {
    const inventoryItem =
      document.createElement("div");

    inventoryItem.className =
      "inventory-item";

    const previewImage =
      document.createElement("img");

    previewImage.className =
      "inventory-preview";

    previewImage.src =
      item.snapshot;

    inventoryItem.appendChild(previewImage);

    inventoryList.appendChild(inventoryItem);
  }
}

// -----------------------------------------
// 인벤토리 스냅샷
// 현재 배양 중인 개체만 캡처
// -----------------------------------------

function captureInventorySnapshot() {
  const savedScreen = get();
  const savedReleasedOrganisms = releasedOrganisms;

  // 방출 개체는 캡처에서 제외
  releasedOrganisms = [];

  background(255);

  // 현재 스킨 그리기
  drawLayerSkinByType(ACTIVE_SKIN);

  for (const instance of jamoInstances) {
    drawSkinByType(instance, ACTIVE_SKIN);
    drawEyes(instance);
  }

  const area = getCultureArea();

  const snapshot = get(
    area.minX,
    area.minY - 80,
    area.maxX - area.minX,
    area.maxY - area.minY
  );

  // 원래 화면과 방출 개체 복구
  releasedOrganisms = savedReleasedOrganisms;
  image(savedScreen, 0, 0);

  return snapshot.canvas.toDataURL("image/png");
}

// =====================================================
// 풀어주기
// 현재 배양 중인 개체를 방출 목록에 저장
// =====================================================

function releaseOrganism() {
  // 현재 개체가 없으면 아무것도 하지 않음
  if (jamoInstances.length === 0) {
    return;
  }

  // 현재 배양 중인 개체 모습을 인벤토리에 저장
  const snapshot = captureInventorySnapshot();

  inventoryItems.push({
    snapshot,
    skin: ACTIVE_SKIN,
    savedAt: Date.now()
  });

  // 최대 저장 개수를 넘으면 가장 오래된 항목 제거
  if (inventoryItems.length > MAX_INVENTORY_ITEMS) {
    inventoryItems.shift();
  }

  // 현재 인벤토리를 브라우저에 저장
  saveInventoryItems();

  renderInventoryItems();

  // 방출 전환 시작
  releaseTransitionStartedAt = millis();
  setCultureControlsDisabled(true);

  // 방출 전환 화면 표시
  document.getElementById("release-transition").hidden = false;

  // 실제 DOT 스킨 생성 방식으로 미리보기 점 생성
  releasePreviewDots = createSkinDots(
    RELEASE_PREVIEW_SPRINGS
  );

  // 실제 눈 생성 방식으로 미리보기 눈 1개 생성
  const previewEyes = createEyes(
    RELEASE_PREVIEW_POINTS,
    RELEASE_PREVIEW_SPRINGS
  );

releasePreviewEye =
  previewEyes.length > 0
    ? previewEyes[0]
    : null;

  const initialMoveAngle =
    random(TWO_PI);

  // 현재 개체 저장
  const releasedOrganism = {
    jamos: jamoInstances,

    lockedConnectorPairs:
      getSnappedConnectorPairs(jamoInstances),

    skin: ACTIVE_SKIN,
    color: currentSkinColor,
    releasedAt: millis(),

    // 배양 영역에서 빠져나가는 중인지
    isEscaping: true,

    // 현재 이동 방향
    moveAngle: initialMoveAngle,

    // 직전 프레임의 이동 방향
    previousMoveAngle: initialMoveAngle,

    // 몸이 현재까지 실제로 회전한 양
    bodyRotation: 0,

    // 이동 방향 변화에 따라 몸이 돌아가야 할 목표 회전량
    targetBodyRotation: 0,

    // 앞으로 향할 목표 방향
    targetMoveAngle: initialMoveAngle,

    // 다음 방향을 새로 선택할 시간
    nextDirectionChangeAt:
      millis() +
      random(
        RELEASED_DIRECTION_INTERVAL_MIN,
        RELEASED_DIRECTION_INTERVAL_MAX
      ),

    // 개체마다 조금씩 다른 이동 힘
    moveForce: random(
      RELEASED_MOVE_FORCE_MIN,
      RELEASED_MOVE_FORCE_MAX
    )
  };

    releasedOrganisms.push(releasedOrganism);

    // 최대 개수를 넘으면 가장 오래된 개체 제거
    if (releasedOrganisms.length > MAX_RELEASED_ORGANISMS) {
      releasedOrganisms.shift();
    }

    // 방출 직후 현재 개체 목록 바로 저장
    saveReleasedOrganisms();
    lastReleasedSaveAt = millis();

    // 현재 배양 중인 개체 비우기
    jamoInstances = [];

    // 편집 상태 초기화
    draggedPoint = null;
    hoveredJamoIndex = -1;

    // 풀어주기 버튼 숨기기
    document.getElementById("release-button").style.display = "none";

    console.log("풀어준 개체:", releasedOrganism);
  }


// =====================================================
// 6. DRAW
// 매 프레임 물리를 계산하고 화면을 다시 그림
// =====================================================


// 각 네모를 독립적으로 조절
// x: 음절 중심을 기준으로 한 가로 위치
// y: 음절 중심을 기준으로 한 세로 위치
// w: 너비 / h: 높이

const frames = [
  // 세로형 모임꼴
  { name: "초성",         x: -165, y: -180, w: 140, h: 140 },
  { name: "중성(세로)",   x: 45,   y: -200, w: 120, h: 200 },
  { name: "중성(가로)",   x: -155, y: -30,  w: 160, h: 80 },
  { name: "종성(세로형)", x: -45,  y: 50,   w: 140, h: 140 },

  // 가로형 모임꼴
  { name: "가로형 초성", x: -70, y: -190, w: 140, h: 140 },
  { name: "가로형 중성", x: -80, y: -50,  w: 160, h: 80 },
  { name: "가로형 종성", x: -70, y: 50,   w: 140, h: 140 }
];

  // -----------------------------------------
  // 글자 조립용 프레임 설계도
  // -----------------------------------------

  const FRAME_BLUEPRINTS = {
    vertical: {
      initial: frames[0],
      medialVertical: frames[1],
      medialHorizontal: frames[2],
      final: frames[3]
    },

    horizontal: {
      initial: frames[4],
      medialHorizontal: frames[5],
      final: frames[6]
    }
  };

  // -----------------------------------------
  // 배양 작업 영역
  // 생성되는 글자가 사용하는 중앙 영역
  // -----------------------------------------

  function getCultureArea() {
    // 배양 영역 중심 위치
    const offsetX = 0;
    const offsetY = 20;

    const centerX = width / 2 + offsetX;
    const centerY = getCultureCenterY() + offsetY;

    // 배양 영역 크기
    const radiusX = 500;
    const radiusY = 280;

    return {
      centerX,
      centerY,
      radiusX,
      radiusY,

      // 인벤토리 캡처용 범위
      minX: centerX - radiusX,
      maxX: centerX + radiusX,
      minY: centerY - radiusY,
      maxY: centerY + radiusY
    };
  }
    

  // -----------------------------------------
  // 스킨 관리자
  // -----------------------------------------

  function drawSkinByType(instance, skinType) {
    // DOT 스킨
    if (skinType === SKINS.DOT) {
      drawSkin(instance);
    }

    // GRADIENT 스킨
    if (skinType === SKINS.GRADIENT) {
      drawGradientSkin(instance);
    }
  }

  // BLOB 스킨은 별도 레이어에 그리기
  function drawLayerSkinByType(skinType) {
    // 풀어준 BLOB 개체가 있는지 확인
    const hasReleasedBlob = releasedOrganisms.some(
      organism => organism.skin === SKINS.BLOB
    );

    // 현재 배양 중인 개체가 BLOB인지 확인
    const hasCurrentBlob =
      skinType === SKINS.BLOB &&
      jamoInstances.length > 0;

    // 화면에 그릴 BLOB이 하나도 없으면 종료
    if (!hasReleasedBlob && !hasCurrentBlob) {
      return;
    }

    updateBlobLayer(skinType);

    // 다른 스킨을 가리지 않도록 겹쳐서 표시
    push();
    blendMode(MULTIPLY);
    image(blobLayer, 0, 0);
    pop();
  }

    // 풀어준 개체의 눈 그리기
    function drawReleasedEyes() {
      for (const organism of releasedOrganisms) {
        for (const instance of organism.jamos) {
          drawEyes(instance);
        }
      }
  }

  function draw() {
    background(255);

  // 방출 작업 영역 확인용 가이드
  if (SHOW_CULTURE_AREA) {
    const cultureArea = getCultureArea();

    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);

    ellipse(
      cultureArea.centerX,
      cultureArea.centerY,
      cultureArea.radiusX * 2,
      cultureArea.radiusY * 2
    );

    pop();
  }

  // 방출 전환 상태 업데이트
  updateReleaseTransition();

  // 방출 중 DOT 미리보기 업데이트
  drawReleasePreview();

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

  // 현재 마우스가 올라가 있는 자모 확인
  updateHoveredJamo();

  // Zoom
  // 화면 중심을 기준으로 개체 영역만 확대 / 축소
  const zoomCenterX = width / 2;
  const zoomCenterY = getCultureCenterY();

  push();

  translate(
    zoomCenterX,
    zoomCenterY
  );

  scale(viewZoom);

  translate(
    -zoomCenterX,
    -zoomCenterY
  );

  // -----------------------------------------
  // 풀어준 개체 물리 계산 + 그리기
  // 현재 배양 중인 개체보다 뒤에 표시
  // -----------------------------------------

    for (const organism of releasedOrganisms) {
    // 풀어준 개체도 기존 자모 물리 계속 계산
    for (const instance of organism.jamos) {
      updateJamoPhysics(instance, -1);
    }

    // 풀어줄 때 저장한 connector 결합 유지
    applyLockedConnectorPairs(organism);

    // 개체 전체에 이동 힘 적용
    applyReleasedMovementForce(organism);

    // 화면에 그리기
    for (const instance of organism.jamos) {
      drawSkinByType(instance, organism.skin);

      if (SHOW_SKELETON) {
        drawJamo(instance);
      }
    }
  }

  // 풀어준 개체끼리 겹치지 않도록 밀어내기
  applyReleasedSeparation();

  // 방출 개체의 현재 위치를 3초마다 저장
  if (
    releasedOrganisms.length > 0 &&
    millis() - lastReleasedSaveAt >= 3000
  ) {
    saveReleasedOrganisms();
    lastReleasedSaveAt = millis();
  }

  // BLOB 스킨이면 별도 레이어를 생성해 화면에 표시
  drawLayerSkinByType(ACTIVE_SKIN);
  // 풀어준 개체의 눈을 스킨 위에 표시
  drawReleasedEyes();

  // 모든 자모 그리기
  for (let i = 0; i < jamoInstances.length; i++) {
    const instance = jamoInstances[i];

    // 선택된 스킨만 표시
    drawSkinByType(instance, ACTIVE_SKIN);

    if (SHOW_SKELETON) {
      drawJamo(instance);
    }

    // 눈
    drawEyes(instance);

    // 호버한 자모에만 관절점 표시
    if (i === hoveredJamoIndex) {
      drawJamoHandles(instance);
    }
  }

  // =====================================================
  // FRAME GUIDE
  // 초성·중성·종성 배치 테스트
  // =====================================================

  // 네모의 이름 표시하기
  if (SHOW_FRAMES) {
    push();
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textSize(12);

    const inputText = textInput.value().trim();
    const syllableCenters = getSyllableCenters(inputText);

    // 입력된 각 음절이 실제 사용하는 프레임만 표시
    for (let syllableId = 0; syllableId < inputText.length; syllableId++) {
      const character = inputText[syllableId];
      const decomposedJamos = decomposeHangulSyllable(character);

      // 중성 종류에 따라 이 음절이 사용할 모임꼴 결정
      const horizontalVowels = [
        "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"
      ];

      const layout =
        horizontalVowels.includes(decomposedJamos[1])
          ? "horizontal"
          : "vertical";

      // 실제 음절 배치와 같은 화면 중심 위치 사용
      const syllableCenterX = syllableCenters[syllableId];
      const syllableCenterY =
        getCultureCenterY();

      // 현재 음절이 사용하는 프레임만 선택
      const frameIndices =
        layout === "horizontal"
          ? [4, 5, 6]
          : [0, 1, 2, 3];

      for (const frameIndex of frameIndices) {
        const frame = frames[frameIndex];

        noFill();
        stroke(0, 200, 200);
        strokeWeight(2);

        rect(
          syllableCenterX + frame.x,
          syllableCenterY + frame.y,
          frame.w,
          frame.h
        );

        noStroke();
        fill(0, 160, 160);

        text(
          frame.name,
          syllableCenterX + frame.x + frame.w / 2,
          syllableCenterY + frame.y + frame.h / 2
        );
      }
    }

    pop();
  }

    pop();
}



// =====================================================
// 7. JAMO DRAWING + PHYSICS
// 자모의 물리 구조를 만들고 움직임과 화면 표시를 처리
// =====================================================


// -----------------------------------------
// 스킨 그리기
// -----------------------------------------

function drawSkin(instance) {
  noStroke();
  fill(0, 220);   // 두번째 숫자는 Alpha 값

  for (const dot of instance.skinDots) {
    const spring = instance.physicsSprings[dot.springIndex];

    const pointA = instance.physicsPoints[spring.a];
    const pointB = instance.physicsPoints[spring.b];

    // 현재 뼈대 선의 방향
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const length = Math.max(0.0001, Math.hypot(dx, dy));

    // 뼈대에 수직인 방향
    const normalX = -dy / length;
    const normalY = dx / length;

    // 현재 뼈대를 기준으로 스킨 점 위치 계산
    const x =
      lerp(pointA.x, pointB.x, dot.t) +
      normalX * dot.offset;

    const y =
      lerp(pointA.y, pointB.y, dot.t) +
      normalY * dot.offset;

    // 각 점의 성장 진행도
    const growth = constrain(
      (millis() - dot.startTime) / dot.growthDuration,
      0,
      1
    );

    // 살짝 부풀었다가 원래 크기로 돌아오도록 성장
    const overshoot = 3;

    const easedGrowth =
      1 +
      (overshoot + 1) * Math.pow(growth - 1, 3) +
      overshoot * Math.pow(growth - 1, 2);

    // 성장 완료 후 일정 시간마다 두 번 보잉 반응
    const now = millis();
    let boingScale = 1;

    if (growth >= 1 && dot.boingStartTime === -1 && now >= dot.nextBoingTime) {
      dot.boingStartTime = now;
    }

    if (dot.boingStartTime !== -1) {
      const progress = (now - dot.boingStartTime) / 600;

      if (progress < 1) {
        // 두 번 튀면서 점차 약해지는 탄성
        boingScale = 1 +
          Math.sin(progress * TWO_PI * 2) * 0.01 * (1 - progress);
      } else {
        dot.boingStartTime = -1;
        dot.nextBoingTime = now + random(2000, 5000);
      }
    }

    circle(x, y, dot.size * easedGrowth * boingScale);
  }
}


// =====================================================
// EYES
// 자소 뼈대에 붙어 자라는 눈
// =====================================================


// -----------------------------------------
// 1. 눈 생성
// 개수 / 위치 / 크기 / 등장 시간 결정
// -----------------------------------------

// 자소 하나에 서로 겹치지 않는 눈 1~3개 생성
function createEyes(points, springs) {
  const eyes = [];
  const placedEyes = [];

  if (springs.length === 0) {
    return eyes;
  }

  // 이번 자소에 생길 눈 개수
  const eyeCount = floor(
    random(EYE_MIN_COUNT, EYE_MAX_COUNT + 1)
  );

  for (let i = 0; i < eyeCount; i++) {
    // 눈끼리 겹치면 다른 위치를 다시 찾음
    for (
      let attempt = 0;
      attempt < EYE_PLACEMENT_ATTEMPTS;
      attempt++
    ) {
      // -----------------------------------------
      // 눈의 랜덤 특성
      // -----------------------------------------

      const startTime =
      millis() +
      random(
        EYE_DELAY_MIN,
        EYE_DELAY_MAX
      );

      const eye = {
        // 어느 뼈대 선에 붙을지
        springIndex: floor(random(springs.length)),

        // 그 선의 어느 위치를 기준으로 할지
        t: random(EYE_T_MIN, EYE_T_MAX),

        // 뼈대에서 얼마나 떨어질지
        offsetDistance: random(
          EYE_DISTANCE_MIN,
          EYE_DISTANCE_MAX
        ),

        // 뼈대 주변 어느 방향으로 떨어질지
        offsetAngle: random(TWO_PI),

        // 눈 크기
        size: random(
          EYE_MIN_SIZE,
          EYE_MAX_SIZE
        ),

        // 눈마다 마우스를 따라보는 정도
        followStrength: random(0.4, 1),

        // 눈마다 마우스를 따라가는 속도
        followEasing: random(
          EYE_PUPIL_EASING_MIN,
          EYE_PUPIL_EASING_MAX
        ),

        // 현재 눈동자 위치
        pupilOffsetX: 0,
        pupilOffsetY: 0,

        // 눈이 나타나기 시작하는 시간
        startTime,

        // 깜빡임 상태
        blinkStartTime: -1,

        // 눈이 완전히 자란 뒤 첫 깜빡임 시간
        nextBlinkTime:
          startTime +
          EYE_GROW_DURATION +
          random(
            EYE_BLINK_INTERVAL_MIN,
            EYE_BLINK_INTERVAL_MAX
          ),
      };

      // 현재 눈의 실제 위치 계산
      const position = getEyePosition(
        points,
        springs,
        eye
      );

      // -----------------------------------------
      // 눈끼리 겹치는지 확인
      // -----------------------------------------

      const overlaps = placedEyes.some(
        (otherEye) => {
          const distance = Math.hypot(
            position.x - otherEye.x,
            position.y - otherEye.y
          );

          const minimumDistance =
            eye.size / 2 +
            otherEye.size / 2 +
            EYE_MIN_GAP;

          return distance < minimumDistance;
        }
      );

      // 겹치면 다른 위치 다시 찾기
      if (overlaps) {
        continue;
      }

      // 겹치지 않으면 눈 확정
      eyes.push(eye);

      // 다음 눈의 겹침 검사에 사용할 위치 저장
      placedEyes.push({
        x: position.x,
        y: position.y,
        size: eye.size,
      });

      break;
    }
  }


  return eyes;
}


// -----------------------------------------
// 2. 눈 위치 계산
// 움직이는 뼈대를 기준으로 현재 위치 계산
// -----------------------------------------

function getEyePosition(points, springs, eye) {
  const spring = springs[eye.springIndex];

  if (!spring) {
    return { x: 0, y: 0 };
  }

  const pointA = points[spring.a];
  const pointB = points[spring.b];

  // 현재 뼈대 선의 방향
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;

  const length = Math.max(
    0.0001,
    Math.hypot(dx, dy)
  );

  // 뼈대를 따라가는 방향
  const tangentX = dx / length;
  const tangentY = dy / length;

  // 뼈대에 수직인 방향
  const normalX = -dy / length;
  const normalY = dx / length;

  // 뼈대 주변 360도 중 어느 방향으로 떨어질지
  const offsetAlong =
    Math.cos(eye.offsetAngle) *
    eye.offsetDistance;

  const offsetNormal =
    Math.sin(eye.offsetAngle) *
    eye.offsetDistance;

  // 뼈대 위 기준 위치
  const baseX =
    lerp(pointA.x, pointB.x, eye.t);

  const baseY =
    lerp(pointA.y, pointB.y, eye.t);

  return {
    x:
      baseX +
      tangentX * offsetAlong +
      normalX * offsetNormal,

    y:
      baseY +
      tangentY * offsetAlong +
      normalY * offsetNormal,
  };
}


// -----------------------------------------
// 3. 눈 그리기
// 성장 애니메이션 + 흰자 + 눈동자
// -----------------------------------------

function drawEyes(instance) {
  if (!instance.eyes) {
    return;
  }

  for (const eye of instance.eyes) {
    const now = millis();

    // 아직 나타날 시간이 아니면 그리지 않음
    if (now < eye.startTime) {
      continue;
    }

    // 현재 뼈대를 기준으로 눈 위치 계산
    const position = getEyePosition(
      instance.physicsPoints,
      instance.physicsSprings,
      eye
    );

    // -----------------------------------------
    // 성장
    // -----------------------------------------

    const growth = constrain(
      (now - eye.startTime) /
        EYE_GROW_DURATION,
      0,
      1
    );

    const easedGrowth =
      1 - Math.pow(1 - growth, 3);

    const eyeSize =
      eye.size * easedGrowth;

    // -----------------------------------------
    // 깜빡임
    // 검은 원이 잠깐 나타났다 사라짐
    // -----------------------------------------

    let isBlinking = false;

    // 깜빡임 시작
    if (
      eye.blinkStartTime === -1 &&
      now >= eye.nextBlinkTime
    ) {
      eye.blinkStartTime = now;
    }

    // 깜빡이는 중
    if (eye.blinkStartTime !== -1) {
      const elapsed =
        now - eye.blinkStartTime;

      if (elapsed < EYE_BLINK_HOLD_DURATION) {
        isBlinking = true;
      } else {
        // 깜빡임 종료
        eye.blinkStartTime = -1;

        // 다음 깜빡임 시간 랜덤 설정
        eye.nextBlinkTime =
          now +
          random(
            EYE_BLINK_INTERVAL_MIN,
            EYE_BLINK_INTERVAL_MAX
          );
      }
    }

    // -----------------------------------------
    // 그리기
    // -----------------------------------------

    push();

    // 흰자
    fill(255);
    stroke(EYE_STROKE_COLOR);
    strokeWeight(1);

    circle(
      position.x,
      position.y,
      eyeSize
    );

    // -----------------------------------------
    // 눈동자
    // 눈마다 다른 정도와 속도로 마우스를 따라봄
    // -----------------------------------------

    const mouseDx =
      mouseX - position.x;

    const mouseDy =
      mouseY - position.y;

    const mouseDistance =
      Math.hypot(mouseDx, mouseDy);

    let targetOffsetX = 0;
    let targetOffsetY = 0;

    // 마우스가 반응 범위 안에 있을 때
    if (
      mouseDistance > 0 &&
      mouseDistance < EYE_PUPIL_FOLLOW_RANGE
    ) {
      // 마우스가 가까울수록 강하게 반응
      const proximity =
        1 -
        mouseDistance /
          EYE_PUPIL_FOLLOW_RANGE;

      const maxPupilOffset =
        eyeSize *
        EYE_PUPIL_MOVE_RATIO *
        eye.followStrength *
        proximity;

      targetOffsetX =
        (mouseDx / mouseDistance) *
        maxPupilOffset;

      targetOffsetY =
        (mouseDy / mouseDistance) *
        maxPupilOffset;
    }

    // 목표 위치를 부드럽게 따라감
    eye.pupilOffsetX = lerp(
      eye.pupilOffsetX,
      targetOffsetX,
      eye.followEasing
    );

    eye.pupilOffsetY = lerp(
      eye.pupilOffsetY,
      targetOffsetY,
      eye.followEasing
    );

    // 눈동자 그리기
    noStroke();
    fill(0);

    circle(
      position.x + eye.pupilOffsetX,
      position.y + eye.pupilOffsetY,
      eyeSize * EYE_PUPIL_RATIO
    );

    // 깜빡일 때 눈 전체가 잠깐 검은 원으로 변함
    if (isBlinking) {
      noStroke();
      fill(0);

      circle(
        position.x,
        position.y,
        eyeSize
      );
    }

    pop();
  }
}


// -----------------------------------------
// 호버 관절점
// -----------------------------------------

function drawJamoHandles(instance) {
  const connectorIndices = new Set(instance.connectorPointIndices);

  for (let i = 0; i < instance.physicsPoints.length; i++) {
    const point = instance.physicsPoints[i];

    if (!point.isJoint) {
      continue;
    }

    // connector는 바깥 원으로 구분
    if (connectorIndices.has(i)) {
      noFill();
      stroke(0);
      strokeWeight(1);
      circle(point.x, point.y, HOVER_CONNECTOR_SIZE);
    }

    // 기본 관절점
    fill(255);
    stroke(0);
    strokeWeight(1);
    circle(point.x, point.y, HOVER_JOINT_SIZE);
  }
}

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

    const targetLength =
      spring.targetLength ?? spring.restLength;

    const stretch = currentLength - targetLength;
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
// 풀어준 개체의 충돌 범위 계산
// 개체 전체를 하나의 원으로 단순하게 처리
// -----------------------------------------

function getReleasedCollisionCircle(organism) {
  const points = [];

  for (const jamo of organism.jamos) {
    points.push(...jamo.physicsPoints);
  }

  if (points.length === 0) {
    return null;
  }

  const minX =
    Math.min(...points.map(point => point.x));

  const maxX =
    Math.max(...points.map(point => point.x));

  const minY =
    Math.min(...points.map(point => point.y));

  const maxY =
    Math.max(...points.map(point => point.y));

  // 개체가 차지하는 실제 범위의 가운데
  const centerX =
    (minX + maxX) / 2;

  const centerY =
    (minY + maxY) / 2;

  // 중심에서 가장 먼 뼈대점까지의 거리
  let radius = 0;

  for (const point of points) {
    radius =
      Math.max(
        radius,
        Math.hypot(
          point.x - centerX,
          point.y - centerY
        )
      );
  }

  // 스킨이 뼈대 바깥으로 퍼지는 범위
  let skinMargin = 0;

  if (organism.skin === SKINS.DOT) {
    skinMargin =
      SKIN_SPREAD +
      18 +
      SKIN_DOT_SIZE_MAX / 2 +
      6;
  }

  if (organism.skin === SKINS.GRADIENT) {
    skinMargin =
      SKIN_SPREAD +
      18 +
      GRADIENT_DOT_SIZE_MAX / 2 +
      6;
  }

  if (organism.skin === SKINS.BLOB) {
    skinMargin =
      BLOB_UNIT_DISTANCE_MAX *
      BLOB_UNIT_SCALE_MAX *
      1.8 +
      BLOB_UNIT_POINT_MAX *
      BLOB_UNIT_SCALE_MAX *
      0.6 +
      BLOB_BLUR;
  }

  radius += skinMargin;

  return {
    centerX,
    centerY,
    radius
  };
}

// -----------------------------------------
// 풀어준 개체끼리 겹치지 않도록 밀어내기
// -----------------------------------------

function applyReleasedSeparation() {
  for (let i = 0; i < releasedOrganisms.length; i++) {
    for (let j = i + 1; j < releasedOrganisms.length; j++) {
      const organismA = releasedOrganisms[i];
      const organismB = releasedOrganisms[j];

      const circleA =
        getReleasedCollisionCircle(organismA);

      const circleB =
        getReleasedCollisionCircle(organismB);

      if (!circleA || !circleB) {
        continue;
      }

      const dx =
        circleB.centerX - circleA.centerX;

      const dy =
        circleB.centerY - circleA.centerY;

      const distance =
        Math.hypot(dx, dy);

      const minDistance =
        circleA.radius +
        circleB.radius +
        RELEASED_MIN_GAP;

      if (distance >= minDistance) {
        continue;
      }

      let directionX;
      let directionY;

      if (distance < 0.001) {
        const randomAngle =
          random(TWO_PI);

        directionX =
          Math.cos(randomAngle);

        directionY =
          Math.sin(randomAngle);
      } else {
        directionX =
          dx / distance;

        directionY =
          dy / distance;
      }

      const pushStrength =
        (1 - distance / minDistance) *
        RELEASED_SEPARATION_FORCE;

      const pushX =
        directionX *
        pushStrength;

      const pushY =
        directionY *
        pushStrength;

      for (const jamo of organismA.jamos) {
        for (const point of jamo.physicsPoints) {
          point.vx -= pushX;
          point.vy -= pushY;
        }
      }

      for (const jamo of organismB.jamos) {
        for (const point of jamo.physicsPoints) {
          point.vx += pushX;
          point.vy += pushY;
        }
      }
    }
  }
}


// -----------------------------------------
// 풀어준 개체 이동
// 기존 물리점에 작은 이동 힘만 추가
// -----------------------------------------

function applyReleasedMovementForce(organism) {
  const points = [];

  // 개체 하나를 이루는 모든 물리점 모으기
  for (const jamo of organism.jamos) {
    points.push(...jamo.physicsPoints);
  }

  if (points.length === 0) {
    return;
  }

  // 현재 개체가 차지하는 화면 범위
  const minX = Math.min(
    ...points.map(point => point.x)
  );

  const maxX = Math.max(
    ...points.map(point => point.x)
  );

  const minY = Math.min(
    ...points.map(point => point.y)
  );

  const maxY = Math.max(
    ...points.map(point => point.y)
  );


  // -----------------------------------------
// 이동 방향 변경
// 1~3초마다 새로운 목표 방향을 선택
// -----------------------------------------

if (organism.isEscaping) {
  const cultureArea = getCultureArea();

// 방출 개체가 타원형 배양 영역에서 완전히 벗어났는지 확인
const isOutsideCultureArea =
  points.every(point => {
    const normalizedX =
      (point.x - cultureArea.centerX) /
      cultureArea.radiusX;

    const normalizedY =
      (point.y - cultureArea.centerY) /
      cultureArea.radiusY;

    return (
      normalizedX * normalizedX +
      normalizedY * normalizedY >
      1
    );
  });

  if (isOutsideCultureArea) {
    organism.isEscaping = false;
  }
}

if (millis() >= organism.nextDirectionChangeAt) {
  if (organism.isEscaping) {
    const cultureArea = getCultureArea();

    const organismCenterX = (minX + maxX) / 2;
    const organismCenterY = (minY + maxY) / 2;

    const outwardAngle =
      Math.atan2(
        organismCenterY - cultureArea.centerY,
        organismCenterX - cultureArea.centerX
      );

    // 바깥쪽을 향하되 조금씩 다른 방향으로 이동
    organism.targetMoveAngle =
      outwardAngle +
      random(-PI / 3, PI / 3);
      
    // 이전 방향의 관성을 조금 줄여
    // 새 방향으로 실제 이동 경로도 꺾이게 함
    for (const point of points) {
      point.vx *= 0.65;
      point.vy *= 0.65;
    }

    // 방출 중에는 비교적 짧은 간격으로 방향 변경
    organism.nextDirectionChangeAt =
      millis() +
      random(800, 1500);
  } else {
    // 영역 밖에서는 기존 자유 이동
    organism.targetMoveAngle =
      random(TWO_PI);

    organism.nextDirectionChangeAt =
      millis() +
      random(
        RELEASED_DIRECTION_INTERVAL_MIN,
        RELEASED_DIRECTION_INTERVAL_MAX
      );
  }
}

// 목표 방향으로 갑자기 꺾지 않고 부드럽게 회전
const angleDifference =
  Math.atan2(
    Math.sin(
      organism.targetMoveAngle -
      organism.moveAngle
    ),
    Math.cos(
      organism.targetMoveAngle -
      organism.moveAngle
    )
  );

organism.moveAngle +=
  angleDifference *
  (
    organism.isEscaping
      ? RELEASE_ESCAPE_STEER
      : RELEASED_DIRECTION_EASING
  );


  // 편집 공간 안에서는 조금 더 빠르게 이동
  const moveSpeedMultiplier =
    organism.isEscaping
      ? RELEASE_ESCAPE_SPEED
      : 1;

  // 기본 이동 방향
  let forceX =
    Math.cos(organism.moveAngle) *
    organism.moveForce *
    RELEASED_MOVE_SCALE *
    moveSpeedMultiplier;

  let forceY =
    Math.sin(organism.moveAngle) *
    organism.moveForce *
    RELEASED_MOVE_SCALE *
    moveSpeedMultiplier;

    

  // -----------------------------------------
  // 넓은 활동 공간의 경계
  // 화면 밖에서도 개체가 계속 이동할 수 있도록 설정
  // -----------------------------------------

  const worldMarginX =
    width * (RELEASED_WORLD_SCALE - 1) / 2;

  const worldMarginY =
    height * (RELEASED_WORLD_SCALE - 1) / 2;

  // 활동 공간 왼쪽 경계
  if (minX < -worldMarginX) {
    forceX +=
      organism.moveForce *
      RELEASED_EDGE_FORCE;
  }

  // 활동 공간 오른쪽 경계
  if (maxX > width + worldMarginX) {
    forceX -=
      organism.moveForce *
      RELEASED_EDGE_FORCE;
  }

  // 활동 공간 위쪽 경계
  if (minY < -worldMarginY) {
    forceY +=
      organism.moveForce *
      RELEASED_EDGE_FORCE;
  }

  // 활동 공간 아래쪽 경계
  if (maxY > height + worldMarginY) {
    forceY -=
      organism.moveForce *
      RELEASED_EDGE_FORCE;
  }

  // 실제 적용된 방향을 다음 이동 방향으로 저장
  organism.moveAngle =
    Math.atan2(forceY, forceX);

  // -----------------------------------------
  // 이동 방향 변화만큼 몸의 축 회전
  // 전체 이동은 유지하고 내부 뼈대만 따라 회전
  // -----------------------------------------

  const moveAngleDifference =
    Math.atan2(
      Math.sin(
        organism.moveAngle -
        organism.previousMoveAngle
      ),
      Math.cos(
        organism.moveAngle -
        organism.previousMoveAngle
      )
    );

  // 이동 방향이 바뀐 만큼 목표 회전량 누적
  organism.targetBodyRotation +=
    moveAngleDifference * 0.3;

  // 몸은 목표 회전보다 조금 늦게 따라감
  const bodyTurn =
    (organism.targetBodyRotation -
      organism.bodyRotation) *
    RELEASED_BODY_TURN_EASING;

  // 개체 전체 중심
  const bodyCenterX =
    points.reduce(
      (sum, point) => sum + point.x,
      0
    ) / points.length;

  const bodyCenterY =
    points.reduce(
      (sum, point) => sum + point.y,
      0
    ) / points.length;

  // 개체 전체의 평균 이동 속도
  const averageVelocityX =
    points.reduce(
      (sum, point) => sum + point.vx,
      0
    ) / points.length;

  const averageVelocityY =
    points.reduce(
      (sum, point) => sum + point.vy,
      0
    ) / points.length;

  const turnCos =
    Math.cos(bodyTurn);

  const turnSin =
    Math.sin(bodyTurn);

  for (const point of points) {
    const dx =
      point.x - bodyCenterX;

    const dy =
      point.y - bodyCenterY;

    // 뼈대 위치 회전
    point.x =
      bodyCenterX +
      dx * turnCos -
      dy * turnSin;

    point.y =
      bodyCenterY +
      dx * turnSin +
      dy * turnCos;

    // 전체 이동 속도는 그대로 두고
    // 내부 꾸물거림만 몸과 함께 회전
    const internalVelocityX =
      point.vx - averageVelocityX;

    const internalVelocityY =
      point.vy - averageVelocityY;

    point.vx =
      averageVelocityX +
      internalVelocityX * turnCos -
      internalVelocityY * turnSin;

    point.vy =
      averageVelocityY +
      internalVelocityX * turnSin +
      internalVelocityY * turnCos;
  }

  organism.bodyRotation +=
    bodyTurn;

  organism.previousMoveAngle =
    organism.moveAngle;

  // -----------------------------------------
  // 약한 전체 이동
  // 미끄러짐은 줄이고 이동 방향만 만들어 줌
  // -----------------------------------------

  for (const point of points) {
    point.vx += forceX;
    point.vy += forceY;
  }

  // -----------------------------------------
  // 뼈대 수축 + 굽힘
  // 이동 방향을 따라 수축 파동이 지나가고
  // 각 스프링이 조금씩 휘면서 꾸물거리도록 함
  // -----------------------------------------

  const waveDirectionX =
    Math.cos(organism.moveAngle);

  const waveDirectionY =
    Math.sin(organism.moveAngle);

  for (const jamo of organism.jamos) {
    for (const spring of jamo.physicsSprings) {
      const pointA =
        jamo.physicsPoints[spring.a];

      const pointB =
        jamo.physicsPoints[spring.b];

      const dx = pointB.x - pointA.x;
      const dy = pointB.y - pointA.y;
      const length = Math.hypot(dx, dy);

      if (length === 0) {
        continue;
      }

      // 현재 스프링의 가운데 위치
      const middleX =
        (pointA.x + pointB.x) / 2;

      const middleY =
        (pointA.y + pointB.y) / 2;

      // 이동 방향을 기준으로 현재 위치를 계산
      // 배열 순서가 아니라 실제 공간 위치를 사용함
      const wavePosition =
        middleX * waveDirectionX +
        middleY * waveDirectionY;

      const phase =
        frameCount * RELEASED_WAVE_SPEED -
        wavePosition / RELEASED_WAVE_SPACING +
        organism.releasedAt * 0.002;

      // -----------------------------------------
      // 수축
      // 원래 길이보다 잠깐 짧아졌다가 다시 돌아옴
      // -----------------------------------------

      const contraction =
        (Math.sin(phase) + 1) *
        0.5 *
        RELEASED_CONTRACT_RATIO;

      spring.targetLength =
        spring.restLength *
        (1 - contraction);

      // -----------------------------------------
      // 굽힘
      // 스프링 양끝에 반대 방향 힘을 주어
      // 중심을 밀지 않고 뼈대 자체를 구부림
      // -----------------------------------------

      const normalX = -dy / length;
      const normalY = dx / length;

      const bendForce =
        Math.sin(phase + HALF_PI) *
        RELEASED_BEND_FORCE;

      pointA.vx += normalX * bendForce;
      pointA.vy += normalY * bendForce;

      pointB.vx -= normalX * bendForce;
      pointB.vy -= normalY * bendForce;
    }
  }
}


// -----------------------------------------
// 격자 기반 자모 좌표 변환
// -----------------------------------------

function getJamoBaseNodes(jamoType) {
  const jamo = JAMO[jamoType];

  // 아직 격자 방식으로 바꾸지 않은 자모
  if (!jamo.grid) {
    return jamo.nodes;
  }

  // 격자상 자모의 중심 계산
  const xs = jamo.nodes.map(node => node.x);
  const ys = jamo.nodes.map(node => node.y);

  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
  const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;

  // 격자 좌표를 기존 좌표계로 변환
  return jamo.nodes.map(node => ({
    x: JAMO_CENTER + (node.x - centerX) * BASE_POINT_SPACING,
    y: JAMO_CENTER + (node.y - centerY) * BASE_POINT_SPACING
  }));
}

// -----------------------------------------
// 물리 구조 생성
// -----------------------------------------

// JAMO의 nodes와 Point Count를 실제 물리점과 스프링으로 변환
  function createPhysicsStructure(
    jamoType,
    offsetX,
    offsetY,
    pointCount,
    nodeOffsets = null
  ) {
    const jamo = JAMO[jamoType];

    const spacingScale = POINT_SPACING / BASE_POINT_SPACING;

    const nodes = getJamoBaseNodes(jamoType).map((node, nodeIndex) => {
      const nodeOffset = nodeOffsets?.[nodeIndex] || { x: 0, y: 0 };

      return {
        x: JAMO_CENTER + (node.x - JAMO_CENTER) * spacingScale + nodeOffset.x,
        y: JAMO_CENTER + (node.y - JAMO_CENTER) * spacingScale + nodeOffset.y
      };
    });

    const physicsPoints = [];
    const physicsSprings = [];

  // 기본 관절 생성
    const jointPointIndices = nodes.map((node, nodeIndex) => {    const pointIndex = physicsPoints.length;

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

    const startNode = nodes[startNodeIndex];
    const endNode = nodes[endNodeIndex];

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
// 8. SKINS
// 자모 뼈대 위에 표시되는 스킨 생성 및 그리기
// =====================================================


// -----------------------------------------
// DOT SKIN
// -----------------------------------------

  // -----------------------------------------
  // 스킨 점 생성
  // -----------------------------------------

    function createSkinDots(
      physicsSprings,
      sizeMin = SKIN_DOT_SIZE_MIN,
      sizeMax = SKIN_DOT_SIZE_MAX
    ) {
      const skinDots = [];

      for (let springIndex = 0; springIndex < physicsSprings.length; springIndex++) {
        // 뼈대 선마다 점 개수를 조금씩 다르게 생성
        const dotCount = floor(
          random(SKIN_DOT_MIN, SKIN_DOT_MAX + 1)
        );

        // 점들이 모일 기준 오프셋을 랜덤하게 설정
        const clusterOffset = random(-SKIN_SPREAD * 0.5, SKIN_SPREAD * 0.5);

        for (let i = 0; i < dotCount; i++) {
          // 일부는 뭉치고 나머지는 획 전체에 불규칙하게 배치
          const clustered = random() < 0.3;

          // 기본 위치를 유지하면서 일부 점만 주변으로 더 크게 흔들기
          const baseT = (i + 0.5) / dotCount;

          let t = constrain(
            baseT + (clustered
              ? random(-0.7, 0.7) / dotCount
              : random(-0.2, 0.2) / dotCount),
            0,
            1
          );

          // 일부 점은 작은 부산물로 생성
          const satellite = random() < 0.25;

          let offset = clustered
            ? clusterOffset + random(-5, 5)
            : random(-SKIN_SPREAD, SKIN_SPREAD);

          // 부산물은 뼈대에서 조금 떨어진 곳에 배치
          if (satellite) {
            const direction = random() < 0.5 ? -1 : 1;
            offset = direction * random(SKIN_SPREAD + 8, SKIN_SPREAD + 18);
          }

          const size = satellite
          ? random() < 0.4
            ? random(sizeMin * 0.3, sizeMin * 0.5)
            : random(sizeMin * 0.55, sizeMax * 0.55)
          : random(sizeMin, sizeMax);

          skinDots.push({
            springIndex,
            t,
            offset,
            size,

            // 점마다 조금씩 다른 시간에 나타나도록 설정
            startTime: millis() + random(0, 500),

            // 점마다 자라는 속도에 차이를 줌
            growthDuration: random(300, 700),

          });
        }
      }

      return skinDots;
    }

  
  // -----------------------------------------
  // DOT 애니메이션
  // -----------------------------------------

  let dotNextBoingTime = 0;
  let dotBoingStartTime = -1;

  // 모든 DOT가 동시에 두 번 튀고 일정 시간 대기
  function getDotBoingScale() {
    const now = millis();

    // 첫 보잉까지 대기
    if (dotNextBoingTime === 0) {
      dotNextBoingTime = now + 7000;
    }

    // 대기 시간이 끝나면 보잉 시작
    if (dotBoingStartTime === -1 && now >= dotNextBoingTime) {
      dotBoingStartTime = now;
    }

    // 대기 중에는 원래 크기 유지
    if (dotBoingStartTime === -1) {
      return 1;
    }

    const progress = (now - dotBoingStartTime) / 600;

    // 보잉이 끝나면 3~6초 대기
    if (progress >= 1) {
      dotBoingStartTime = -1;
      dotNextBoingTime = now + random(3000, 6000);
      return 1;
    }

    // 모든 DOT가 동시에 두 번 튀는 효과
    return 1 + Math.sin(progress * TWO_PI * 2) * 0.1 * (1 - progress);
  }

  // 점마다 다른 방향과 속도로 부드럽게 움직임
  function getDotMotion(dot) {
    const time = millis() * 0.0003;
    const seed = dot.startTime * 0.1;

    return {
      x: map(noise(seed, time), 0, 1, -6, 6),
      y: map(noise(seed + 100, time * 1.17), 0, 1, -6, 6),
    };
  }

  // DOT가 처음 생성될 때 부풀어 오르는 성장 애니메이션
  function getDotGrowthScale(dot) {
    // 각 점의 성장 진행도
    const growth = constrain(
      (millis() - dot.startTime) / dot.growthDuration,
      0,
      1
    );

    // 살짝 부풀었다가 원래 크기로 돌아오도록 성장
    const overshoot = 3;

    const easedGrowth =
      1 +
      (overshoot + 1) * Math.pow(growth - 1, 3) +
      overshoot * Math.pow(growth - 1, 2);

    return easedGrowth;
  }


  // -----------------------------------------
  // DOT 화면 표시용 데이터 계산
  // 실제 DOT와 방출 미리보기가 함께 사용
  // -----------------------------------------

  function getDotRenderData(
    physicsPoints,
    physicsSprings,
    skinDots
  ) {
    const boingScale = getDotBoingScale();
    const renderDots = [];

    for (const dot of skinDots) {
      const spring =
        physicsSprings[dot.springIndex];

      const pointA =
        physicsPoints[spring.a];

      const pointB =
        physicsPoints[spring.b];

      // 현재 뼈대 선의 방향
      const dx = pointB.x - pointA.x;
      const dy = pointB.y - pointA.y;

      const length =
        Math.max(0.0001, Math.hypot(dx, dy));

      // 뼈대에 수직인 방향
      const normalX = -dy / length;
      const normalY = dx / length;

      // 실제 DOT와 같은 꾸물거림
      const motion = getDotMotion(dot);

      const x =
        lerp(pointA.x, pointB.x, dot.t) +
        normalX * dot.offset +
        motion.x;

      const y =
        lerp(pointA.y, pointB.y, dot.t) +
        normalY * dot.offset +
        motion.y;

      // 실제 DOT와 같은 성장 애니메이션
      const growthScale =
        getDotGrowthScale(dot);

      renderDots.push({
        x,
        y,
        size:
          dot.size *
          growthScale *
          boingScale
      });
    }

    return renderDots;
  }

  
// -----------------------------------------
// 스킨 그리기
// -----------------------------------------

function drawSkin(instance) {
  noStroke();

  // DOT 색상
  const dotColor = color("#59ac00");

  // DOT 투명도
  // 0 = 완전 투명 / 255 = 완전 불투명
  dotColor.setAlpha(210);

  fill(dotColor);

  // 실제 DOT와 방출 미리보기가 함께 사용하는 화면 표시 데이터
  const renderDots = getDotRenderData(
    instance.physicsPoints,
    instance.physicsSprings,
    instance.skinDots
  );

  // 계산된 DOT 그리기
  for (const dot of renderDots) {
    circle(
      dot.x,
      dot.y,
      dot.size
    );
  }
}


  // -----------------------------------------
  // GRADIENT SKIN
  // 미리 만든 그라데이션 이미지를 각 점 위치에 반복해서 표시
  // -----------------------------------------

  function drawGradientSkin(instance) {
    const renderDots = getDotRenderData(
      instance.physicsPoints,
      instance.physicsSprings,
      instance.gradientDots
    );

    push();
    imageMode(CENTER);

    for (const dot of renderDots) {
      image(
        gradientDotTexture,
        dot.x,
        dot.y,
        dot.size,
        dot.size
      );
    }

    pop();
  }


  // -----------------------------------------
  // 방출 전환 화면 DOT 미리보기 그리기
  // 실제 DOT 스킨과 같은 렌더 데이터를 사용
  // -----------------------------------------

  function drawReleasePreview() {
    const releaseTransition =
      document.getElementById("release-transition");

    const previewCanvas =
      document.getElementById("release-preview-canvas");

    // 방출창이 닫혀 있거나 미리보기 데이터가 없으면 그리지 않음
    if (
      !releaseTransition ||
      releaseTransition.hidden ||
      !previewCanvas ||
      releasePreviewDots.length === 0
    ) {
      return;
    }

    const context =
      previewCanvas.getContext("2d");

    // 이전 프레임 지우기
    context.clearRect(
      0,
      0,
      previewCanvas.width,
      previewCanvas.height
    );

    // 실제 DOT 스킨과 동일한 계산 사용
    const renderDots = getDotRenderData(
      RELEASE_PREVIEW_POINTS,
      RELEASE_PREVIEW_SPRINGS,
      releasePreviewDots
    );

    // DOT 그리기
    context.fillStyle = "rgba(0, 0, 0, 0.86)";

    for (const dot of renderDots) {
      context.beginPath();

      context.arc(
        dot.x,
        dot.y,
        dot.size / 2,
        0,
        Math.PI * 2
      );

      context.fill();
    }


        // 미리보기 눈 1개
    if (releasePreviewEye) {
      const eyePosition = getEyePosition(
        RELEASE_PREVIEW_POINTS,
        RELEASE_PREVIEW_SPRINGS,
        releasePreviewEye
      );

      const eyeSize = releasePreviewEye.size;

      // 흰자
      context.beginPath();
      context.arc(
        eyePosition.x,
        eyePosition.y,
        eyeSize / 2,
        0,
        Math.PI * 2
      );
      context.fillStyle = "#fff";
      context.fill();
      context.strokeStyle = "#000";
      context.lineWidth = 1;
      context.stroke();

      // 눈동자
      context.beginPath();
      context.arc(
        eyePosition.x,
        eyePosition.y,
        eyeSize * EYE_PUPIL_RATIO / 2,
        0,
        Math.PI * 2
      );
      context.fillStyle = "#000";
      context.fill();
    }
  }


// -----------------------------------------
// BLOB SKIN
// -----------------------------------------


// 중심점 1개와 바깥점 3개로 BLOB 유닛 데이터를 생성
function createBlobUnitData() {
  const unitScale = random(BLOB_UNIT_SCALE_MIN, BLOB_UNIT_SCALE_MAX);

  const center = {
    x: 0,
    y: 0,
    size: random(BLOB_UNIT_POINT_MIN, BLOB_UNIT_POINT_MAX) * unitScale * 0.9 ,
  };

  const outerPoints = [];
  const startAngle = random(TWO_PI);

  for (let i = 0; i < 3; i++) {
    const angle =
      startAngle +
      i * (TWO_PI / 3) +
      random(-BLOB_UNIT_ANGLE_JITTER, BLOB_UNIT_ANGLE_JITTER);

    const distance =
      random(BLOB_UNIT_DISTANCE_MIN, BLOB_UNIT_DISTANCE_MAX) * unitScale;

    outerPoints.push({
    x: cos(angle) * distance,
    y: sin(angle) * distance,
    size: random(BLOB_UNIT_POINT_MIN, BLOB_UNIT_POINT_MAX) * unitScale,

    // 끝점마다 서로 다른 움직임을 갖도록 설정
    motionSeed: random(1000),
  });
  }

  return {
    center,
    outerPoints,
  };
}


// -----------------------------------------
// BLOB 애니메이션
// -----------------------------------------

// 끝점마다 독립적으로 뻗었다 오므라드는 움직임
function getBlobTipMotion(point) {
  const time = millis() * 0.0003;
  const stretch = map(
    noise(point.motionSeed, time),
    0, 1, 0.4, 1.8
  );

  return {
    x: point.x * stretch,
    y: point.y * stretch,
  };
}


// 중심점과 바깥점 3개를 이어 BLOB 유닛 하나를 그림
function drawBlobUnit(x, y, unit) {
  blobLayer.stroke(0);
  blobLayer.strokeCap(ROUND);
  blobLayer.fill(0);

  // 각 끝점의 움직이는 위치 계산
  const movingOuterPoints = unit.outerPoints.map((point) => {
    const motion = getBlobTipMotion(point);

    return {
      x: motion.x,
      y: motion.y,
      size: point.size,
    };
  });

  // 중심점과 바깥점 연결
  for (const point of movingOuterPoints) {
    blobLayer.strokeWeight(
      Math.min(unit.center.size, point.size) * 0.7
    );

    blobLayer.line(
      x + unit.center.x,
      y + unit.center.y,
      x + point.x,
      y + point.y
    );
  }

  // 중심점
  blobLayer.noStroke();
  blobLayer.circle(
    x + unit.center.x,
    y + unit.center.y,
    unit.center.size * 1.2
  );

  // 바깥점 3개
  for (const point of movingOuterPoints) {
    blobLayer.circle(
      x + point.x,
      y + point.y,
      point.size * 1.15
    );
  }
}


  // 뼈대를 따라 일정한 간격으로 BLOB 유닛을 생성
  function createBlobSamples(physicsPoints, physicsSprings) {
    const blobSamples = [];

    for (let springIndex = 0; springIndex < physicsSprings.length; springIndex++) {
      const spring = physicsSprings[springIndex];
      const pointA = physicsPoints[spring.a];
      const pointB = physicsPoints[spring.b];

      const springLength = dist(
        pointA.x,
        pointA.y,
        pointB.x,
        pointB.y
      );

      let created = false;

      // 뼈대 선의 양 끝에 몰리지 않도록 반 간격부터 시작
      for (
        let distance = BLOB_SAMPLE_GAP / 2;
        distance < springLength;
        distance += BLOB_SAMPLE_GAP
      ) {
        blobSamples.push({
          springIndex,
          t: distance / springLength,
          unit: createBlobUnitData(),
        });

        created = true;
      }

      // 너무 짧은 뼈대에도 최소 한 개는 생성
      if (!created) {
        blobSamples.push({
          springIndex,
          t: 0.5,
          unit: createBlobUnitData(),
        });
      }
    }

    return blobSamples;
  }

// 물리 뼈대를 BLOB의 기본 몸통으로 그림
function drawBlobBase(instance) {
  for (const sample of instance.blobSamples) {
    const spring = instance.physicsSprings[sample.springIndex];
    const pointA = instance.physicsPoints[spring.a];
    const pointB = instance.physicsPoints[spring.b];

    const x = lerp(pointA.x, pointB.x, sample.t);
    const y = lerp(pointA.y, pointB.y, sample.t);

    drawBlobUnit(x, y, sample.unit);
  }
}

  // BLOB 레이어를 초기화하고 하나의 실루엣으로 합침
  function updateBlobLayer(skinType) {
    blobLayer.background(255);

    // 풀어준 BLOB 개체는 현재 타입과 관계없이 항상 그리기
    for (const organism of releasedOrganisms) {
      if (organism.skin !== SKINS.BLOB) {
        continue;
      }

      for (const instance of organism.jamos) {
        drawBlobBase(instance);
      }
    }

    // 현재 배양 중인 개체는
    // 현재 타입이 BLOB일 때만 그리기
    if (skinType === SKINS.BLOB) {
      for (const instance of jamoInstances) {
        drawBlobBase(instance);
      }
    }

    // 가까운 몸통들이 서로 퍼져 붙도록 만듦
    blobLayer.filter(BLUR, BLOB_BLUR);

    // 흐려진 경계를 다시 선명한 실루엣으로 정리
    blobLayer.filter(THRESHOLD, 0.5);
  }


// =====================================================
// 9. CONNECTOR
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

// -----------------------------------------
// 풀어주기 전 결합 상태 저장
// 현재 붙어 있는 connector 쌍을 찾음
// -----------------------------------------

function getSnappedConnectorPairs(jamos) {
  const pairs = [];

  for (let i = 0; i < jamos.length; i++) {
    const a = jamos[i];

    for (let j = i + 1; j < jamos.length; j++) {
      const b = jamos[j];

      // 같은 음절의 자모끼리만 확인
      if (a.syllableId !== b.syllableId) {
        continue;
      }

      for (const aPointIndex of a.connectorPointIndices) {
        for (const bPointIndex of b.connectorPointIndices) {
          const pointA = a.physicsPoints[aPointIndex];
          const pointB = b.physicsPoints[bPointIndex];

          // 현재 실제로 붙어 있는 connector만 저장
          if (
            pointA.x === pointB.x &&
            pointA.y === pointB.y
          ) {
            pairs.push({
              aJamoIndex: i,
              aPointIndex,
              bJamoIndex: j,
              bPointIndex
            });
          }
        }
      }
    }
  }

  return pairs;
}

// -----------------------------------------
// 풀어준 개체의 결합 유지
// 저장된 connector 쌍을 계속 같은 위치에 고정
// -----------------------------------------

function applyLockedConnectorPairs(organism) {
  for (const pair of organism.lockedConnectorPairs) {
    const jamoA = organism.jamos[pair.aJamoIndex];
    const jamoB = organism.jamos[pair.bJamoIndex];

    const pointA =
      jamoA.physicsPoints[pair.aPointIndex];

    const pointB =
      jamoB.physicsPoints[pair.bPointIndex];

    // 두 connector의 중간 위치
    const lockedX =
      (pointA.x + pointB.x) / 2;

    const lockedY =
      (pointA.y + pointB.y) / 2;

    // 두 점의 움직임도 하나로 맞춤
    const lockedVx =
      (pointA.vx + pointB.vx) / 2;

    const lockedVy =
      (pointA.vy + pointB.vy) / 2;

    pointA.x = lockedX;
    pointA.y = lockedY;
    pointB.x = lockedX;
    pointB.y = lockedY;

    pointA.vx = lockedVx;
    pointA.vy = lockedVy;
    pointB.vx = lockedVx;
    pointB.vy = lockedVy;
  }
}


// =====================================================
//10. INTERACTION
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
// 자모 호버 감지
// -----------------------------------------

function updateHoveredJamo() {
  hoveredJamoIndex = null;
  const hoverRadius = SKIN_SPREAD + SKIN_DOT_SIZE_MAX / 2;

  for (let i = jamoInstances.length - 1; i >= 0; i--) {
    const instance = jamoInstances[i];

    for (const spring of instance.physicsSprings) {
      const a = instance.physicsPoints[spring.a];
      const b = instance.physicsPoints[spring.b];

      if (getDistanceToSegment(mouseX, mouseY, a.x, a.y, b.x, b.y) <= hoverRadius) {
        hoveredJamoIndex = i;
        return;
      }
    }
  }
}

function getDistanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return Math.hypot(px - x1, py - y1);
  }

  const t = constrain(
    ((px - x1) * dx + (py - y1) * dy) / lengthSquared,
    0,
    1
  );

  return Math.hypot(
    px - (x1 + dx * t),
    py - (y1 + dy * t)
  );
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
// 11. HANGUL INPUT
// 입력된 글자를 분해하고 자모 개체를 생성
// =====================================================


// -----------------------------------------
// 자모의 실제 크기와 경계 좌표 계산
// -----------------------------------------

function getJamoBounds(jamoType) {
  const nodes = getJamoBaseNodes(jamoType);

  return {
    minX: Math.min(...nodes.map(node => node.x)),
    maxX: Math.max(...nodes.map(node => node.x)),
    minY: Math.min(...nodes.map(node => node.y)),
    maxY: Math.max(...nodes.map(node => node.y))
  };
}

// -----------------------------------------
// 입력된 음절들의 가로 중심 위치 계산
// -----------------------------------------

function getSyllableCenters(inputText) {
  const syllableWidths = [];

  for (let syllableId = 0; syllableId < inputText.length; syllableId++) {
    const character = inputText[syllableId];
    const decomposedJamos = decomposeHangulSyllable(character);

    const horizontalVowels = [
      "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"
    ];

    const layout =
      horizontalVowels.includes(decomposedJamos[1])
        ? "horizontal"
        : "vertical";

    const layoutFrames =
      layout === "horizontal"
        ? [frames[4], frames[5], frames[6]]
        : [frames[0], frames[1], frames[2], frames[3]];

    const minX = Math.min(
      ...layoutFrames.map((frame) => frame.x)
    );

    const maxX = Math.max(
      ...layoutFrames.map((frame) => frame.x + frame.w)
    );

    syllableWidths.push(maxX - minX);
  }

  const totalWidth =
    syllableWidths.reduce((sum, syllableWidth) => {
      return sum + syllableWidth;
    }, 0) +
    Math.max(0, syllableWidths.length - 1) * SYLLABLE_GAP;

  const syllableCenters = [];
  let currentX = width / 2 - totalWidth / 2;

  for (let syllableId = 0; syllableId < syllableWidths.length; syllableId++) {
    const syllableWidth = syllableWidths[syllableId];

    syllableCenters.push(
      currentX + syllableWidth / 2
    );

    currentX += syllableWidth + SYLLABLE_GAP;
  }

  return syllableCenters;
}

  // -----------------------------------------
  // 복합모음 파트별 위치 보정
  // -----------------------------------------

  function getCompoundVowelNodeOffsets(
    jamoType,
    instanceX,
    instanceY,
    syllableCenterX,
    syllableCenterY
  ) {
    const parts = COMPOUND_VOWEL_PARTS[jamoType];

    if (!parts) {
      return null;
    }

    const scale = POINT_SPACING / BASE_POINT_SPACING;

    const nodes = getJamoBaseNodes(jamoType).map((node) => ({
      x: JAMO_CENTER + (node.x - JAMO_CENTER) * scale,
      y: JAMO_CENTER + (node.y - JAMO_CENTER) * scale
    }));

    const nodeOffsets = nodes.map(() => ({ x: 0, y: 0 }));

    // 가로 파트는 왼쪽 모임꼴의 중성(가로) 프레임 중심에 배치
    const horizontalNodes = parts.horizontal.map((index) => nodes[index]);
    const horizontalCenterX =
      (Math.min(...horizontalNodes.map((node) => node.x)) +
        Math.max(...horizontalNodes.map((node) => node.x))) / 2;
    const horizontalCenterY =
      (Math.min(...horizontalNodes.map((node) => node.y)) +
        Math.max(...horizontalNodes.map((node) => node.y))) / 2;

    const horizontalOffsetX =
      syllableCenterX + frames[2].x + frames[2].w / 2 -
      (instanceX + horizontalCenterX);

    const horizontalOffsetY =
      syllableCenterY + frames[2].y + frames[2].h / 2 -
      (instanceY + horizontalCenterY);

    for (const nodeIndex of parts.horizontal) {
      nodeOffsets[nodeIndex] = {
        x: horizontalOffsetX,
        y: horizontalOffsetY
      };
    }

    // 세로 파트는 기존 세로형 중성과 같은 기준으로 배치
    const verticalNodes = parts.vertical.map((index) => nodes[index]);
    const verticalCenterY =
      (Math.min(...verticalNodes.map((node) => node.y)) +
        Math.max(...verticalNodes.map((node) => node.y))) / 2;

    const verticalStemX = nodes[parts.vertical[0]].x;

    const verticalOffsetX =
      syllableCenterX + frames[1].x + frames[1].w / 2 -
      POINT_SPACING - (instanceX + verticalStemX);

    const verticalOffsetY =
      syllableCenterY + frames[1].y + frames[1].h / 2 -
      (instanceY + verticalCenterY);

    for (const nodeIndex of parts.vertical) {
      nodeOffsets[nodeIndex] = {
        x: verticalOffsetX,
        y: verticalOffsetY
      };
    }

    return nodeOffsets;
  }


function generateJamosFromInput() {
  const inputText = textInput.value().trim();
  const pointCount = pointCountSlider.value();

  // 이번에 생성되는 개체의 스킨 색
  currentSkinColor = color(
    random(60, 220),
    random(60, 220),
    random(60, 220)
  );

  // 기존 자모와 드래그 상태 초기화
  jamoInstances = [];
  draggedPoint = null;

  // 새로 생성하기 전 풀어주기 버튼 숨김
  document.getElementById("release-button").style.display = "none";
  const generatedJamos = [];

  // 각 글자를 초성 / 중성 / 종성으로 분해
  for (let syllableId = 0; syllableId < inputText.length; syllableId++) {
    const character = inputText[syllableId];
    const decomposedJamos = decomposeHangulSyllable(character);

    // 중성 종류에 따라 이 음절이 사용할 모임꼴 결정
    const horizontalVowels = [
      "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"
    ];

    const layout =
      horizontalVowels.includes(decomposedJamos[1])
        ? "horizontal"
        : "vertical";

        console.log(character, decomposedJamos, layout);

    // JAMO 데이터에 정의된 자모만 생성
    for (let j = 0; j < decomposedJamos.length; j++) {
      const jamoType = decomposedJamos[j];

      if (JAMO[jamoType]) {
        generatedJamos.push({
          type: jamoType,
          syllableId,
          role: ["initial", "medial", "final"][j],
          layout
        });
      }
    }
  }


  const syllableCenters = getSyllableCenters(inputText);

  // -----------------------------------------
  // 자모 배치
  // -----------------------------------------

  // 각 자모를 해당 프레임의 중심에 배치
  for (let i = 0; i < generatedJamos.length; i++) {
    const jamo = generatedJamos[i];

  // -----------------------------------------
  // 현재 음절의 화면 중심 위치
  // -----------------------------------------

  const syllableCenterX =
    syllableCenters[jamo.syllableId];

  const syllableCenterY =
    getCultureCenterY();

    // 자모 역할과 음절 모임꼴에 따라 프레임 선택
    let frame;

    if (jamo.layout === "horizontal") {
      if (jamo.role === "initial") {
        frame = frames[4]; // 가로형 초성
      } else if (jamo.role === "medial") {
        frame = frames[5]; // 가로형 중성
      } else if (jamo.role === "final") {
        frame = frames[6]; // 가로형 종성
      }
    } else {
      if (jamo.role === "initial") {
        frame = frames[0]; // 초성
      } else if (jamo.role === "medial") {
        frame = frames[1]; // 중성(세로)
      } else if (jamo.role === "final") {
        frame = frames[3]; // 종성(세로형)
      }
    }

    // 실제 자모의 중심 계산
    const bounds = getJamoBounds(jamo.type);
    const scale = POINT_SPACING / BASE_POINT_SPACING;

    const centerX = JAMO_CENTER +
      ((bounds.minX + bounds.maxX) / 2 - JAMO_CENTER) * scale;

    const centerY = JAMO_CENTER +
      ((bounds.minY + bounds.maxY) / 2 - JAMO_CENTER) * scale;

    // 자모를 현재 음절의 중심 기준 프레임 위치에 배치
    let instanceX =
      syllableCenterX + frame.x + frame.w / 2 - centerX;

    const instanceY =
      syllableCenterY + frame.y + frame.h / 2 - centerY;

    // 세로형 모음은 세로획의 가로 위치를 통일
    const verticalVowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅣ"];

    if (jamo.role === "medial" && verticalVowels.includes(jamo.type)) {
    // 첫 번째 노드의 가로 위치 = 세로획 위치
    const stemX = getJamoBaseNodes(jamo.type)[0].x;
    const scaledStemX = JAMO_CENTER + (stemX - JAMO_CENTER) * scale;

    // ㅏ의 기존 세로획 위치를 기준으로 정렬
    instanceX =
      syllableCenterX + frame.x + frame.w / 2 -
      POINT_SPACING - scaledStemX;
    }

    // 복합모음이면 가로 파트와 세로 파트의 위치를 따로 보정
    const nodeOffsets =
      jamo.role === "medial" && COMPOUND_VOWEL_PARTS[jamo.type]
        ? getCompoundVowelNodeOffsets(
            jamo.type,
            instanceX,
            instanceY,
            syllableCenterX,
            syllableCenterY
          )
        : null;

    console.log(jamo.type, nodeOffsets);

    const physics = createPhysicsStructure(
      jamo.type,
      instanceX,
      instanceY,
      pointCount,
      nodeOffsets
    );

    const skinDots = createSkinDots(
      physics.physicsSprings
    );

    // GRADIENT 스킨용 점을 별도로 생성
    // DOT보다 조금 더 드문드문하게 보이도록 일부만 남김
    const gradientDots = createSkinDots(
      physics.physicsSprings,
      GRADIENT_DOT_SIZE_MIN,
      GRADIENT_DOT_SIZE_MAX
    ).filter(() => random() < GRADIENT_DOT_DENSITY);

    // 이 자소에 붙을 눈 생성
    const eyes = createEyes(
      physics.physicsPoints,
      physics.physicsSprings
    );

    // BLOB 스킨용 덩어리 위치와 크기를 한 번 생성
    const blobSamples = createBlobSamples(
      physics.physicsPoints,
      physics.physicsSprings
    );

    jamoInstances.push({
      type: jamo.type,
      syllableId: jamo.syllableId,
      physicsPoints: physics.physicsPoints,
      physicsSprings: physics.physicsSprings,
      connectorPointIndices: physics.connectorPointIndices,
      skinDots,
      gradientDots,
      blobSamples,
      eyes,
    });
  }

  // 실제로 생성된 개체가 있을 때만 풀어주기 버튼 표시
  if (jamoInstances.length > 0) {
    document.getElementById("release-button").style.display = "flex";
  }
}


// =====================================================
// 12. HANGUL DECOMPOSITION
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
// 13. RESPONSIVE CANVAS
// 창 크기가 바뀌면 캔버스와 UI 위치를 다시 계산
// =====================================================

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.position(0, 0);
}