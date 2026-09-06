// =====================================================
// HANGUL ORGANISM
// Cellular / Bacteria-like Particle Version
// =====================================================
//
// 기존 시스템
//   한글 → 초성/중성/종성 → JAMO → Physics Points → Springs
//
// 추가된 시스템
//   Physics Springs
//        ↓
//   Cellular Organism Particles
//        ↓
//   작은 원형 세포들이 획을 형성
//        ↓
//   각 세포가 미세하게 움직임
//        ↓
//   일부 세포는 가장자리에서 떨어져 나가는 느낌
//
// =====================================================


// =====================================================
// 1. SETTINGS
// =====================================================

const PAGE_MARGIN = 24;
const CONTROL_AREA_HEIGHT = 110;


// -----------------------------------------------------
// 기존 점 크기
// -----------------------------------------------------

const JOINT_SIZE = 18;
const MIDDLE_POINT_SIZE = 14;
const CONNECTOR_SIZE = 28;

const POINT_PICK_RADIUS = 20;


// =====================================================
// POINT PHYSICS
// =====================================================

const SPRING_STIFFNESS = 0.05;
const POINT_DAMPING = 0.86;
const MAX_POINT_SPEED = 20;


// =====================================================
// CELLULAR ORGANISM SETTINGS
// =====================================================

const CELL_BASE_SIZE = 13;

const CELL_MIN_SCALE = 0.55;
const CELL_MAX_SCALE = 1.45;

const CELL_SPACING = 8;

const ORGANISM_THICKNESS = 0.72;

const CELL_NOISE_SPEED = 0.008;
const CELL_NOISE_SCALE = 0.018;

const CELL_WOBBLE = 5.5;

const CELL_BLACK = 8;

const CELL_GRAY_MIN = 8;
const CELL_GRAY_MAX = 45;


// -----------------------------------------------------
// 가장자리에서 떨어져 나오는 작은 세포
// -----------------------------------------------------

const SATELLITE_PARTICLE_COUNT = 4;

const SATELLITE_MIN_SIZE = 2;
const SATELLITE_MAX_SIZE = 8;

const SATELLITE_DISTANCE = 55;


// -----------------------------------------------------
// 관절 주변 세포
// -----------------------------------------------------

const JOINT_CELL_RING_COUNT = 8;


// =====================================================
// MERGE / FUSION SETTINGS
// =====================================================

// 자모의 물리점끼리 이 거리 안으로 들어오면
// 접촉 후보가 된다.
const MERGE_START_DISTANCE = 78;

// 이 거리에서 가장 강한 접촉
const MERGE_FULL_DISTANCE = 22;

// 접합부 색이 영향을 주는 실제 세포 반경
const MERGE_COLOR_RADIUS = 42;


// -----------------------------------------------------
// SOAP / CELL FUSION
// -----------------------------------------------------

// 하나의 fused contour를 만드는 샘플 수
const SOAP_BUBBLE_STEPS = 48;

// 표면 광택
const SOAP_BUBBLE_GLOSS = 0.62;

// 표면 투명도
const SOAP_BUBBLE_ALPHA = 86;


// -----------------------------------------------------
// 실제 세포 융합
// -----------------------------------------------------

const FUSION_PARTICLE_RADIUS = 34;
const FUSION_NECK_STRENGTH = 1.35;

const MERGE_BUBBLE_COUNT = 0;


// =====================================================
// CROSS SPRING
// =====================================================

const MERGE_ATTRACTION_STRENGTH = 0.075;
const MERGE_ADHESION_STRENGTH = 0.035;

const MERGE_BOND_DISTANCE = 30;
const MERGE_MAX_BOND_STRETCH = 125;


// =====================================================
// CELL FUSION ANIMATION
// =====================================================

const CELL_FUSION_TRIGGER_DISTANCE = 34;

const CELL_FUSION_SPEED = 0.055;
const CELL_FUSION_RETURN_SPEED = 0.085;

const CELL_FUSION_PULL = 0.62;
const CELL_FUSION_SHRINK = 0.82;


// =====================================================
// PASTEL PALETTE
// =====================================================
//
// 중요한 규칙:
//
// 접합부 하나에는 아래 색 중 단 하나만 사용한다.
//
// 예:
// 접합부 A → 노랑
// 접합부 B → 민트
// 접합부 C → 핑크
//
// 한 접합부 안에서 여러 색을 섞지 않는다.
// =====================================================

const PASTEL_COLORS = [

  [244, 244, 170], // pale yellow

  [184, 222, 211], // pale mint

  [247, 201, 199], // pale coral

  [184, 225, 228], // pale cyan

  [229, 199, 216], // pale pink

  [216, 208, 224], // pale lavender

  [198, 218, 233], // pale blue

  [205, 211, 231]  // pale periwinkle

];


// =====================================================
// 2. JAMO DATA
// =====================================================

const JAMO = {

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


  'ㄷ': {

    nodes: [
      { x: 120, y: 120 },
      { x: 280, y: 120 },
      { x: 120, y: 280 },
      { x: 280, y: 280 }
    ],

    edges: [
      [0, 1],
      [0, 2],
      [2, 3]
    ],

    connectors: [1, 3]

  },


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


  'ㅂ': {

    nodes: [
      { x: 130, y: 100 },
      { x: 130, y: 200 },
      { x: 130, y: 300 },

      { x: 270, y: 100 },
      { x: 270, y: 200 },
      { x: 270, y: 300 }
    ],

    edges: [
      [0, 1],
      [1, 2],

      [3, 4],
      [4, 5],

      [1, 4],
      [2, 5]
    ],

    connectors: [0, 2, 3, 5]

  },


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


  'ㅈ': {

    nodes: [
      { x: 120, y: 100 },
      { x: 200, y: 100 },
      { x: 280, y: 100 },

      { x: 120, y: 280 },
      { x: 280, y: 280 }
    ],

    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4]
    ],

    connectors: [0, 2, 3, 4]

  },


  'ㅊ': {

    nodes: [
      { x: 120, y: 140 },
      { x: 200, y: 140 },
      { x: 280, y: 140 },

      { x: 200, y: 70 },

      { x: 120, y: 300 },
      { x: 280, y: 300 }
    ],

    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],

    connectors: [0, 2, 3, 4, 5]

  },


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


  'ㅌ': {

    nodes: [
      { x: 120, y: 100 },
      { x: 280, y: 100 },

      { x: 120, y: 200 },
      { x: 280, y: 200 },

      { x: 120, y: 300 },
      { x: 280, y: 300 }
    ],

    edges: [
      [0, 1],

      [0, 2],
      [2, 4],

      [2, 3],

      [4, 5]
    ],

    connectors: [1, 3, 5]

  },


  'ㅍ': {

    nodes: [

      { x: 100, y: 130 },
      { x: 150, y: 130 },
      { x: 250, y: 130 },
      { x: 300, y: 130 },

      { x: 100, y: 270 },
      { x: 150, y: 270 },
      { x: 250, y: 270 },
      { x: 300, y: 270 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [2, 3],

      [4, 5],
      [5, 6],
      [6, 7],

      [1, 5],
      [2, 6]

    ],

    connectors: [0, 3, 4, 7]

  },


  'ㅎ': {

    nodes: [

      { x: 140, y: 110 },
      { x: 200, y: 110 },
      { x: 260, y: 110 },
      { x: 200, y: 50 },

      { x: 200, y: 170 },
      { x: 270, y: 200 },
      { x: 300, y: 270 },
      { x: 270, y: 340 },
      { x: 200, y: 370 },
      { x: 130, y: 340 },
      { x: 100, y: 270 },
      { x: 130, y: 200 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [1, 3],

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
      0,
      2,
      3,
      4,
      6,
      8,
      10
    ]

  },


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


  'ㄲ': {

    nodes: [

      { x: 90, y: 120 },
      { x: 170, y: 120 },
      { x: 170, y: 280 },

      { x: 210, y: 120 },
      { x: 290, y: 120 },
      { x: 290, y: 280 }

    ],

    edges: [

      [0, 1],
      [1, 2],

      [3, 4],
      [4, 5]

    ],

    connectors: [0, 2, 3, 5]

  },


  'ㄸ': {

    nodes: [

      { x: 80, y: 120 },
      { x: 180, y: 120 },
      { x: 80, y: 280 },
      { x: 180, y: 280 },

      { x: 220, y: 120 },
      { x: 320, y: 120 },
      { x: 220, y: 280 },
      { x: 320, y: 280 }

    ],

    edges: [

      [0, 1],
      [0, 2],
      [2, 3],

      [4, 5],
      [4, 6],
      [6, 7]

    ],

    connectors: [1, 3, 5, 7]

  },


  'ㅃ': {

    nodes: [

      { x: 80, y: 100 },
      { x: 80, y: 200 },
      { x: 80, y: 300 },

      { x: 170, y: 100 },
      { x: 170, y: 200 },
      { x: 170, y: 300 },

      { x: 230, y: 100 },
      { x: 230, y: 200 },
      { x: 230, y: 300 },

      { x: 320, y: 100 },
      { x: 320, y: 200 },
      { x: 320, y: 300 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [3, 4],
      [4, 5],
      [1, 4],
      [2, 5],

      [6, 7],
      [7, 8],
      [9, 10],
      [10, 11],
      [7, 10],
      [8, 11]

    ],

    connectors: [
      0,
      2,
      3,
      5,
      6,
      8,
      9,
      11
    ]

  },


  'ㅆ': {

    nodes: [
      { x: 120, y: 100 },
      { x: 70, y: 280 },
      { x: 170, y: 280 },

      { x: 280, y: 100 },
      { x: 230, y: 280 },
      { x: 330, y: 280 }
    ],

    edges: [
      [0, 1],
      [0, 2],

      [3, 4],
      [3, 5]
    ],

    connectors: [1, 2, 4, 5]

  },


  'ㅉ': {

    nodes: [

      { x: 70, y: 100 },
      { x: 120, y: 100 },
      { x: 170, y: 100 },
      { x: 70, y: 280 },
      { x: 170, y: 280 },

      { x: 230, y: 100 },
      { x: 280, y: 100 },
      { x: 330, y: 100 },
      { x: 230, y: 280 },
      { x: 330, y: 280 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],

      [5, 6],
      [6, 7],
      [6, 8],
      [6, 9]

    ],

    connectors: [
      0,
      2,
      3,
      4,
      5,
      7,
      8,
      9
    ]

  },


  'ㅑ': {

    nodes: [
      { x: 180, y: 100 },
      { x: 180, y: 160 },
      { x: 280, y: 160 },
      { x: 180, y: 240 },
      { x: 280, y: 240 },
      { x: 180, y: 300 }
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


  'ㅓ': {

    nodes: [
      { x: 220, y: 100 },
      { x: 220, y: 200 },
      { x: 120, y: 200 },
      { x: 220, y: 300 }
    ],

    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],

    connectors: [0, 2, 3]

  },


  'ㅕ': {

    nodes: [
      { x: 220, y: 100 },
      { x: 220, y: 160 },
      { x: 120, y: 160 },
      { x: 220, y: 240 },
      { x: 120, y: 240 },
      { x: 220, y: 300 }
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


  'ㅗ': {

    nodes: [
      { x: 100, y: 240 },
      { x: 200, y: 240 },
      { x: 200, y: 120 },
      { x: 300, y: 240 }
    ],

    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],

    connectors: [0, 2, 3]

  },


  'ㅛ': {

    nodes: [
      { x: 100, y: 240 },
      { x: 160, y: 240 },
      { x: 160, y: 120 },
      { x: 240, y: 240 },
      { x: 240, y: 120 },
      { x: 300, y: 240 }
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


  'ㅜ': {

    nodes: [
      { x: 100, y: 160 },
      { x: 200, y: 160 },
      { x: 200, y: 280 },
      { x: 300, y: 160 }
    ],

    edges: [
      [0, 1],
      [1, 2],
      [1, 3]
    ],

    connectors: [0, 2, 3]

  },


  'ㅠ': {

    nodes: [
      { x: 100, y: 160 },
      { x: 160, y: 160 },
      { x: 160, y: 280 },
      { x: 240, y: 160 },
      { x: 240, y: 280 },
      { x: 300, y: 160 }
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


  'ㅡ': {

    nodes: [
      { x: 100, y: 200 },
      { x: 300, y: 200 }
    ],

    edges: [
      [0, 1]
    ],

    connectors: [0, 1]

  },


  'ㅣ': {

    nodes: [
      { x: 200, y: 100 },
      { x: 200, y: 300 }
    ],

    edges: [
      [0, 1]
    ],

    connectors: [0, 1]

  },


  'ㅐ': {

    nodes: [

      { x: 140, y: 100 },
      { x: 140, y: 200 },
      { x: 140, y: 300 },

      { x: 260, y: 100 },
      { x: 260, y: 200 },
      { x: 260, y: 300 }

    ],

    edges: [

      [0, 1],
      [1, 2],

      [3, 4],
      [4, 5],

      [1, 4]

    ],

    connectors: [0, 2, 3, 5]

  },


  'ㅒ': {

    nodes: [

      { x: 140, y: 100 },
      { x: 140, y: 160 },
      { x: 140, y: 240 },
      { x: 140, y: 300 },

      { x: 260, y: 100 },
      { x: 260, y: 160 },
      { x: 260, y: 240 },
      { x: 260, y: 300 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [2, 3],

      [4, 5],
      [5, 6],
      [6, 7],

      [1, 5],
      [2, 6]

    ],

    connectors: [0, 3, 4, 7]

  },


  'ㅔ': {

    nodes: [

      { x: 180, y: 100 },
      { x: 180, y: 200 },
      { x: 100, y: 200 },
      { x: 180, y: 300 },

      { x: 260, y: 100 },
      { x: 260, y: 300 }

    ],

    edges: [

      [0, 1],
      [1, 2],
      [1, 3],

      [4, 5]

    ],

    connectors: [0, 2, 3, 4, 5]

  },


  'ㅖ': {

    nodes: [

      { x: 180, y: 100 },
      { x: 180, y: 160 },
      { x: 100, y: 160 },
      { x: 180, y: 240 },
      { x: 100, y: 240 },
      { x: 180, y: 300 },

      { x: 260, y: 100 },
      { x: 260, y: 300 }

    ],

    edges: [

      [0, 1],
      [1, 3],
      [3, 5],
      [1, 2],
      [3, 4],

      [6, 7]

    ],

    connectors: [0, 2, 4, 5, 6, 7]

  }

};


// =====================================================
// 3. HANGUL DATA
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
  "ㅎ"

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
  "ㅣ"

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
  "ㅎ"

];


// =====================================================
// 4. STATE
// =====================================================

let canvas;

let jamoInstances = [];

let draggedPoint = null;

let draggedJamo = null;

let mergeContacts = [];

let fusionBonds = [];

let cellFusionStates = new Map();

let mergedParticleKeys = new Set();

let pointCountSlider;

let textInput;

let generateButton;

let releaseButton;

let isReleased = false;

let releaseBatchCount = 0;


// =====================================================
// 5. SETUP
// =====================================================

function setup() {

  randomSeed(20260829);
  noiseSeed(20260829);

  canvas = createCanvas(
    getCanvasWidth(),
    getCanvasHeight()
  );

  canvas.position(
    PAGE_MARGIN,
    PAGE_MARGIN
  );


  pointCountSlider = createSlider(
    0,
    10,
    2,
    1
  );

  pointCountSlider.changed(
    generateJamosFromInput
  );


  textInput = createInput("가");

  textInput.size(130);


  generateButton = createButton("생성");

  generateButton.mousePressed(
    generateJamosFromInput
  );

  releaseButton = createButton("풀어주기");

  releaseButton.mousePressed(
    releaseCurrentJamos
  );


  positionControls();

  generateJamosFromInput();
}

// 이 부분을 **삭제**하세요 (파일 끝 근처)

// =====================================================
// GENERATE JAMOS FROM INPUT
// =====================================================

function generateJamosFromInput() {
  const inputText = textInput.value().trim();

  jamoInstances = isReleased
    ? jamoInstances.filter(instance => instance.isReleased)
    : [];

  if (!inputText) {
    return;
  }

  const validChars = [...inputText].filter(char =>
    decomposeHangul(char)
  );

  const characterWidth = 520;
  const characterGap = 350;

  const totalWidth =
    characterWidth +
    (validChars.length - 1) * characterGap;

  const xOffset =
    (getCanvasWidth() - totalWidth) / 2 - 120;

    const yOffset =
    (getCanvasHeight() - 400) / 2;

  validChars.forEach((char, index) => {
    const jamoData = decomposeHangul(char);
    const currentX =
      xOffset + index * characterGap;

    const choStructure = createPhysicsStructure(
      jamoData.cho,
      currentX,
      yOffset,
      pointCountSlider.value()
    );

    const jungStructure = createPhysicsStructure(
      jamoData.jung,
      currentX + 200,
      yOffset,
      pointCountSlider.value()
    );

    const combinedPoints = [
      ...choStructure.physicsPoints,
      ...jungStructure.physicsPoints
    ];

    const combinedSprings = [
      ...choStructure.physicsSprings,
      ...jungStructure.physicsSprings.map(s => ({
        a: s.a + choStructure.physicsPoints.length,
        b: s.b + choStructure.physicsPoints.length,
        restLength: s.restLength
      }))
    ];

    const combinedConnectors = [
      ...choStructure.connectorPointIndices,
      ...jungStructure.connectorPointIndices.map(
        index => index + choStructure.physicsPoints.length
      )
    ];

    const organisms = createOrganismParticles(
      combinedPoints,
      combinedSprings,
      combinedConnectors
    );

    jamoInstances.push({
      jamoData,
      isReleased: false,
      physicsPoints: combinedPoints,
      physicsSprings: combinedSprings,
      connectorPointIndices: combinedConnectors,
      organismParticles: organisms.particles,
      organismSatellites: organisms.satellites
    });
  });
}

function moveInstance(instance, offsetX, offsetY) {
  for (const point of instance.physicsPoints) {
    point.x += offsetX;
    point.y += offsetY;
  }
}

function getInstanceBounds(instance) {
  const points = instance.physicsPoints;

  return points.reduce(
    (bounds, point) => ({
      minX: Math.min(bounds.minX, point.x),
      maxX: Math.max(bounds.maxX, point.x),
      minY: Math.min(bounds.minY, point.y),
      maxY: Math.max(bounds.maxY, point.y)
    }),
    {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity
    }
  );
}

function releaseCurrentJamos() {
  const activeInstances =
    jamoInstances.filter(instance => !instance.isReleased);

  if (activeInstances.length === 0) {
    return;
  }

  const compositionBounds = activeInstances.reduce(
    (bounds, instance) => {
      const instanceBounds = getInstanceBounds(instance);

      return {
        minX: Math.min(bounds.minX, instanceBounds.minX),
        maxX: Math.max(bounds.maxX, instanceBounds.maxX),
        minY: Math.min(bounds.minY, instanceBounds.minY),
        maxY: Math.max(bounds.maxY, instanceBounds.maxY)
      };
    },
    {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity
    }
  );

  const compositionWidth =
    compositionBounds.maxX - compositionBounds.minX;
  const compositionHeight =
    compositionBounds.maxY - compositionBounds.minY;
  const compositionCenterX =
    (compositionBounds.minX + compositionBounds.maxX) / 2;
  const compositionCenterY =
    (compositionBounds.minY + compositionBounds.maxY) / 2;
  const batchIndex = releaseBatchCount++;
  const targetCenterX = constrain(
    width * (batchIndex % 2 === 0 ? 0.22 : 0.78),
    compositionWidth / 2 + 24,
    width - compositionWidth / 2 - 24
  );
  const targetCenterY = constrain(
    height * (batchIndex % 4 < 2 ? 0.2 : 0.8),
    compositionHeight / 2 + 24,
    height - compositionHeight / 2 - 24
  );
  const offsetX = targetCenterX - compositionCenterX;
  const offsetY = targetCenterY - compositionCenterY;
  const releasePhase = random(TWO_PI);

  activeInstances.forEach(instance => {
    moveInstance(instance, offsetX, offsetY);

    instance.isReleased = true;
    instance.releasePhase = releasePhase;
    instance.releaseLastX = 0;
    instance.releaseLastY = 0;
  });

  if (!isReleased) {
    isReleased = true;
    canvas.addClass("released-canvas");
    resizeCanvas(
      windowWidth,
      windowHeight
    );
    positionControls();
  }

  mergedParticleKeys.clear();
  cellFusionStates.clear();
  mergeContacts = [];
  fusionBonds = [];
}

function updateReleasedMotion(instance) {
  const time = frameCount * 0.008 + instance.releasePhase;
  const offsetX = sin(time) * 28;
  const offsetY = cos(time * 0.82) * 22;

  moveInstance(
    instance,
    offsetX - instance.releaseLastX,
    offsetY - instance.releaseLastY
  );

  instance.releaseLastX = offsetX;
  instance.releaseLastY = offsetY;
}

// =====================================================
// 6. DRAW
// =====================================================

function draw() {

  background(255);


  // ---------------------------------------------------
  // 1. 자모 physics
  // ---------------------------------------------------

  for (
    let i = 0;
    i < jamoInstances.length;
    i++
  ) {

    if (jamoInstances[i].isReleased) {
      updateReleasedMotion(jamoInstances[i]);
    } else {
      updateJamoPhysics(
        jamoInstances[i],
        i
      );
    }
  }


  // ---------------------------------------------------
  // 2. organism particles
  // ---------------------------------------------------

  for (
    const instance of jamoInstances
  ) {

    updateOrganismParticles(
      instance
    );
  }


  // ---------------------------------------------------
  // 3. merge detection
  // ---------------------------------------------------

  updateMergeContacts();

  updateCellFusionStates();


  // ---------------------------------------------------
  // 4. 먼저 융합된 세포를 그린다.
  // ---------------------------------------------------

  drawMergedCells();


  // ---------------------------------------------------
  // 5. 나머지 일반 세포
  // ---------------------------------------------------

  for (
    let i = 0;
    i < jamoInstances.length;
    i++
  ) {

    drawOrganism(
      jamoInstances[i],
      i
    );
  }


  updatePointCursor();
}


// =====================================================
// 7. ORGANISM PARTICLE SYSTEM
// =====================================================

function createOrganismParticles(
  physicsPoints,
  physicsSprings,
  connectorPointIndices
) {

  const particles = [];


  // ---------------------------------------------------
  // spring을 따라 세포 생성
  // ---------------------------------------------------

  for (
    let springIndex = 0;
    springIndex < physicsSprings.length;
    springIndex++
  ) {

    const spring =
      physicsSprings[springIndex];

    const pointA =
      physicsPoints[spring.a];

    const pointB =
      physicsPoints[spring.b];

    const length =
      Math.max(
        1,
        spring.restLength
      );

    const count =
      Math.max(
        2,
        Math.ceil(
          length /
          CELL_SPACING
        )
      );


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const baseT =
        i /
        count;

      const t =
        constrain(
          baseT +
          random(
            -0.35 / count,
            0.35 / count
          ),
          0.02,
          0.98
        );


      const dx =
        pointB.x -
        pointA.x;

      const dy =
        pointB.y -
        pointA.y;

      const lengthNow =
        Math.max(
          0.0001,
          Math.hypot(
            dx,
            dy
          )
        );


      const normalX =
        -dy /
        lengthNow;

      const normalY =
        dx /
        lengthNow;


      const offset =
        random(
          -CELL_BASE_SIZE *
          ORGANISM_THICKNESS,

          CELL_BASE_SIZE *
          ORGANISM_THICKNESS
        );


      const size =
        CELL_BASE_SIZE *
        random(
          CELL_MIN_SCALE,
          CELL_MAX_SCALE
        );


      particles.push({

        type: "spring",

        springIndex,

        t,

        offset,

        size,

        seed:
          random(1000),

        phase:
          random(TWO_PI),

        speed:
          random(
            0.5,
            1.35
          ),

        wobble:
          random(
            0.5,
            1.4
          ),

        gray:
          random(
            CELL_GRAY_MIN,
            CELL_GRAY_MAX
          ),

        x: 0,
        y: 0,

        rotation:
          random(TWO_PI),

        satellite:
          random() < 0.055

      });
    }
  }


  // ---------------------------------------------------
  // 관절 세포
  // ---------------------------------------------------

  for (
    const pointIndex of connectorPointIndices
  ) {

    const point =
      physicsPoints[pointIndex];


    for (
      let i = 0;
      i < JOINT_CELL_RING_COUNT;
      i++
    ) {

      const angle =
        TWO_PI *
        i /
        JOINT_CELL_RING_COUNT +
        random(
          -0.25,
          0.25
        );


      const radius =
        random(
          CELL_BASE_SIZE * 0.15,
          CELL_BASE_SIZE * 1.35
        );


      particles.push({

        type: "joint",

        pointIndex,

        t: 0,

        offset: 0,

        size:
          CELL_BASE_SIZE *
          random(
            0.65,
            1.35
          ),

        seed:
          random(1000),

        phase:
          random(TWO_PI),

        speed:
          random(
            0.5,
            1.25
          ),

        wobble:
          random(
            0.6,
            1.3
          ),

        gray:
          random(
            CELL_GRAY_MIN,
            CELL_GRAY_MAX
          ),

        x:
          point.x +
          cos(angle) *
          radius,

        y:
          point.y +
          sin(angle) *
          radius,

        baseAngle:
          angle,

        baseRadius:
          radius,

        rotation:
          random(TWO_PI),

        satellite:
          false

      });
    }
  }


  // ---------------------------------------------------
  // satellite
  // ---------------------------------------------------

  const satellites = [];


  for (
    let i = 0;
    i < SATELLITE_PARTICLE_COUNT;
    i++
  ) {

    if (
      physicsSprings.length === 0
    ) {
      continue;
    }

    const springIndex =
      floor(
        random(
          physicsSprings.length
        )
      );


    const spring =
      physicsSprings[
        springIndex
      ];


    const pointA =
      physicsPoints[
        spring.a
      ];

    const pointB =
      physicsPoints[
        spring.b
      ];


    const t =
      random(
        0.05,
        0.95
      );


    const x =
      lerp(
        pointA.x,
        pointB.x,
        t
      );


    const y =
      lerp(
        pointA.y,
        pointB.y,
        t
      );


    const angle =
      random(TWO_PI);


    satellites.push({

      type:
        "satellite",

      springIndex,

      t,

      size:
        random(
          SATELLITE_MIN_SIZE,
          SATELLITE_MAX_SIZE
        ),

      seed:
        random(1000),

      phase:
        random(TWO_PI),

      distance:
        random(
          15,
          SATELLITE_DISTANCE
        ),

      angle,

      drift:
        random(
          0.4,
          1.25
        ),

      x,
      y

    });
  }


  return {

    particles,

    satellites

  };
}


// =====================================================
// PARTICLE UPDATE
// =====================================================

function updateOrganismParticles(
  instance
) {

  const points =
    instance.physicsPoints;

  const springs =
    instance.physicsSprings;


  // ---------------------------------------------------
  // 일반 spring 세포
  // ---------------------------------------------------

  for (
    const particle of
    instance.organismParticles
  ) {

    if (
      particle.type === "spring"
    ) {

      const spring =
        springs[
          particle.springIndex
        ];


      const pointA =
        points[
          spring.a
        ];

      const pointB =
        points[
          spring.b
        ];


      const dx =
        pointB.x -
        pointA.x;

      const dy =
        pointB.y -
        pointA.y;


      const length =
        Math.max(
          0.0001,
          Math.hypot(
            dx,
            dy
          )
        );


      const normalX =
        -dy /
        length;

      const normalY =
        dx /
        length;


      // spring 위의 작은 이동
      const movement =
        noise(
          particle.seed,
          frameCount *
          CELL_NOISE_SPEED *
          particle.speed
        );


      const tOffset =
        map(
          movement,
          0,
          1,
          -0.035,
          0.035
        );


      const t =
        constrain(
          particle.t +
          tOffset,
          0,
          1
        );


      // 획 주변의 미세한 움직임
      const wobbleNoise =
        noise(
          particle.seed + 100,
          frameCount *
          CELL_NOISE_SPEED
        );


      const wobble =
        map(
          wobbleNoise,
          0,
          1,
          -CELL_WOBBLE,
          CELL_WOBBLE
        ) *
        particle.wobble;


      const currentOffset =
        particle.offset +
        wobble;


      particle.x =
        lerp(
          pointA.x,
          pointB.x,
          t
        ) +
        normalX *
        currentOffset;


      particle.y =
        lerp(
          pointA.y,
          pointB.y,
          t
        ) +
        normalY *
        currentOffset;


      particle.rotation +=
        0.002 *
        particle.speed;


      if (
        particle.satellite
      ) {

        const satelliteNoise =
          noise(
            particle.seed + 500,
            frameCount * 0.01
          );


        const extra =
          map(
            satelliteNoise,
            0,
            1,
            -12,
            12
          );


        particle.x +=
          normalX *
          extra;

        particle.y +=
          normalY *
          extra;
      }

    }


    // -------------------------------------------------
    // 관절 세포
    // -------------------------------------------------

    else if (
      particle.type === "joint"
    ) {

      const point =
        points[
          particle.pointIndex
        ];


      const movement =
        noise(
          particle.seed,
          frameCount *
          CELL_NOISE_SPEED
        );


      const radius =
        particle.baseRadius +
        map(
          movement,
          0,
          1,
          -3,
          3
        );


      const angle =
        particle.baseAngle +
        map(
          noise(
            particle.seed + 100,
            frameCount * 0.006
          ),
          0,
          1,
          -0.12,
          0.12
        );


      particle.x =
        point.x +
        cos(angle) *
        radius;


      particle.y =
        point.y +
        sin(angle) *
        radius;
    }
  }


  // ---------------------------------------------------
  // satellite update
  // ---------------------------------------------------

  for (
    const satellite
    of instance.organismSatellites
  ) {

    const spring =
      springs[
        satellite.springIndex
      ];


    const pointA =
      points[
        spring.a
      ];

    const pointB =
      points[
        spring.b
      ];


    const baseX =
      lerp(
        pointA.x,
        pointB.x,
        satellite.t
      );


    const baseY =
      lerp(
        pointA.y,
        pointB.y,
        satellite.t
      );


    const time =
      frameCount *
      0.006 *
      satellite.drift;


    const distance =
      satellite.distance +
      sin(
        time +
        satellite.phase
      ) *
      6;


    const angle =
      satellite.angle +
      sin(
        time * 0.7 +
        satellite.seed
      ) *
      0.35;


    satellite.x =
      baseX +
      cos(angle) *
      distance;


    satellite.y =
      baseY +
      sin(angle) *
      distance;
  }
}


// =====================================================
// ORGANISM DRAW
// =====================================================

function drawOrganism(
  instance,
  instanceIndex
) {

  noStroke();


  // ---------------------------------------------------
  // 일반 세포
  // ---------------------------------------------------

  for (
    let particleIndex = 0;
    particleIndex <
    instance.organismParticles.length;
    particleIndex++
  ) {

    const particle =
      instance.organismParticles[
        particleIndex
      ];


    // 융합된 두 세포는 이미
    // drawMergedCells()에서 하나로 그려졌기 때문에
    // 여기서는 다시 그리지 않는다.
    const key =
      instanceIndex +
      ":" +
      particleIndex;


    if (
      mergedParticleKeys.has(key)
    ) {

      continue;
    }


    drawCell(
      particle
    );
  }


  // ---------------------------------------------------
  // 떨어지는 satellite
  // ---------------------------------------------------

  for (
    const satellite
    of instance.organismSatellites
  ) {

    drawSatellite(
      satellite
    );
  }
}


// =====================================================
// CELL DRAW
// =====================================================

function drawCell(
  particle
) {

  const fusion =
    getCellFusionState(
      particle
    );


  let drawX =
    particle.x;

  let drawY =
    particle.y;

  let drawSize =
    particle.size;

  let cellColor =
    null;


  if (
    fusion !== null
  ) {

    cellColor =
      PASTEL_COLORS[
        fusion.colorIndex
      ];


    // 접합 중심을 향해
    // 아주 살짝 수축
    const pull =
      0.08 +
      fusion.influence *
      0.24;


    drawX =
      lerp(
        particle.x,
        fusion.x,
        pull
      );


    drawY =
      lerp(
        particle.y,
        fusion.y,
        pull
      );


    drawSize *=
      1 +
      fusion.influence *
      0.04;
  }


  // ---------------------------------------------------
  // 색 계산
  // ---------------------------------------------------

  const darkness =
    constrain(
      particle.gray,
      0,
      255
    );


  if (
    cellColor !== null
  ) {

    const colorAmount =
      Math.pow(
        constrain(
          fusion.influence,
          0,
          1
        ),
        0.72
      );


    const baseGray =
      constrain(
        CELL_BLACK +
        darkness *
        0.35,
        0,
        255
      );


    const r =
      lerp(
        baseGray,
        cellColor[0],
        colorAmount
      );


    const g =
      lerp(
        baseGray,
        cellColor[1],
        colorAmount
      );


    const b =
      lerp(
        baseGray,
        cellColor[2],
        colorAmount
      );


    fill(
      r,
      g,
      b,
      242
    );

  } else {

    fill(
      CELL_BLACK +
      darkness *
      0.35
    );
  }


  // ---------------------------------------------------
  // 세포 본체
  // ---------------------------------------------------

  push();

  translate(
    drawX,
    drawY
  );

  rotate(
    particle.rotation
  );


  ellipse(
    0,
    0,
    drawSize,
    drawSize *
    randomStable(
      particle.seed,
      0.88,
      1.12
    )
  );


  pop();


  // ---------------------------------------------------
  // 작은 satellite cell
  // ---------------------------------------------------

  const satelliteNoise =
    noise(
      particle.seed + 200
    );


  if (
    satelliteNoise > 0.45
  ) {

    const angle =
      particle.phase +
      particle.seed;


    const childSize =
      drawSize *
      map(
        satelliteNoise,
        0.45,
        1,
        0.18,
        0.48
      );


    if (
      cellColor !== null
    ) {

      const childAmount =
        Math.pow(
          constrain(
            fusion.influence,
            0,
            1
          ),
          0.72
        );


      fill(

        lerp(
          CELL_BLACK,
          cellColor[0],
          childAmount
        ),

        lerp(
          CELL_BLACK,
          cellColor[1],
          childAmount
        ),

        lerp(
          CELL_BLACK,
          cellColor[2],
          childAmount
        ),

        242

      );

    } else {

      fill(
        CELL_BLACK
      );
    }


    ellipse(

      drawX +
      cos(angle) *
      drawSize *
      0.42,

      drawY +
      sin(angle) *
      drawSize *
      0.42,

      childSize,
      childSize

    );
  }
}


// =====================================================
// CELL FUSION STATE
// =====================================================

function getCellFusionState(
  particle
) {

  let best =
    null;

  let bestScore =
    0;


  for (
    const contact
    of mergeContacts
  ) {

    const dx =
      particle.x -
      contact.x;

    const dy =
      particle.y -
      contact.y;


    const distance =
      Math.hypot(
        dx,
        dy
      );


    const radius =
      MERGE_COLOR_RADIUS *
      (
        0.72 +
        contact.strength *
        0.28
      );


    if (
      distance >
      radius
    ) {

      continue;
    }


    const normalized =
      constrain(
        1 -
        distance /
        radius,
        0,
        1
      );


    const smooth =
      normalized *
      normalized *
      (
        3 -
        2 *
        normalized
      );


    const influence =
      smooth *
      contact.strength;


    if (
      influence >
      bestScore
    ) {

      bestScore =
        influence;


      best = {

        x:
          contact.x,

        y:
          contact.y,

        influence,

        colorIndex:
          contact.colorIndex

      };
    }
  }


  return best;
}


// =====================================================
// SATELLITE DRAW
// =====================================================

function drawSatellite(
  satellite
) {

  fill(
    CELL_BLACK
  );


  const pulse =
    map(
      noise(
        satellite.seed,
        frameCount * 0.008
      ),
      0,
      1,
      0.75,
      1.2
    );


  ellipse(

    satellite.x,
    satellite.y,

    satellite.size *
    pulse,

    satellite.size *
    pulse

  );
}


// =====================================================
// STABLE RANDOM
// =====================================================

function randomStable(
  seed,
  minValue,
  maxValue
) {

  const x =
    Math.sin(
      seed *
      12.9898
    ) *
    43758.5453;


  const normalized =
    x -
    Math.floor(x);


  return lerp(
    minValue,
    maxValue,
    normalized
  );
}


// =====================================================
// 8. POINT PHYSICS
// =====================================================

function updateJamoPhysics(
  instance,
  instanceIndex
) {

  const points =
    instance.physicsPoints;

  const springs =
    instance.physicsSprings;


  // ---------------------------------------------------
  // spring force
  // ---------------------------------------------------

  for (
    const spring of springs
  ) {

    const pointA =
      points[
        spring.a
      ];

    const pointB =
      points[
        spring.b
      ];


    const deltaX =
      pointB.x -
      pointA.x;

    const deltaY =
      pointB.y -
      pointA.y;


    const currentLength =
      Math.hypot(
        deltaX,
        deltaY
      );


    if (
      currentLength === 0
    ) {

      continue;
    }


    const stretch =
      currentLength -
      spring.restLength;


    const force =
      stretch *
      SPRING_STIFFNESS;


    const forceX =
      deltaX /
      currentLength *
      force;


    const forceY =
      deltaY /
      currentLength *
      force;


    pointA.vx +=
      forceX;

    pointA.vy +=
      forceY;


    pointB.vx -=
      forceX;

    pointB.vy -=
      forceY;
  }


  // ---------------------------------------------------
  // move
  // ---------------------------------------------------

  for (
    let pointIndex = 0;
    pointIndex < points.length;
    pointIndex++
  ) {

    const point =
      points[
        pointIndex
      ];


    // 마우스로 잡은 점만 직접 이동
    if (

      draggedJamo !== null &&

      draggedJamo.instanceIndex ===
      instanceIndex &&

      draggedJamo.pointIndex ===
      pointIndex

    ) {

      point.x =
        mouseX;

      point.y =
        mouseY;

      point.vx =
        0;

      point.vy =
        0;

      continue;
    }


    point.vx *=
      POINT_DAMPING;

    point.vy *=
      POINT_DAMPING;


    const speed =
      Math.hypot(
        point.vx,
        point.vy
      );


    if (
      speed >
      MAX_POINT_SPEED
    ) {

      point.vx =
        point.vx /
        speed *
        MAX_POINT_SPEED;

      point.vy =
        point.vy /
        speed *
        MAX_POINT_SPEED;
    }


    point.x +=
      point.vx;

    point.y +=
      point.vy;
  }
}


// =====================================================
// 9. PHYSICS STRUCTURE
// =====================================================

function createPhysicsStructure(
  jamoType,
  offsetX,
  offsetY,
  pointCount
) {

  const jamo =
    JAMO[
      jamoType
    ];


  const physicsPoints =
    [];

  const physicsSprings =
    [];


  // ---------------------------------------------------
  // joints
  // ---------------------------------------------------

  const jointPointIndices =
    jamo.nodes.map(

      (
        node,
        nodeIndex
      ) => {

        const pointIndex =
          physicsPoints.length;


        physicsPoints.push({

          x:
            node.x +
            offsetX,

          y:
            node.y +
            offsetY,

          vx: 0,
          vy: 0,

          isJoint: true,

          sourceNodeIndex:
            nodeIndex

        });


        return pointIndex;
      }

    );


  // ---------------------------------------------------
  // edge middle points
  // ---------------------------------------------------

  for (
    const edge
    of jamo.edges
  ) {

    const startNodeIndex =
      edge[0];

    const endNodeIndex =
      edge[1];


    const startNode =
      jamo.nodes[
        startNodeIndex
      ];

    const endNode =
      jamo.nodes[
        endNodeIndex
      ];


    let previousPointIndex =
      jointPointIndices[
        startNodeIndex
      ];


    for (
      let i = 1;
      i <= pointCount;
      i++
    ) {

      const t =
        i /
        (
          pointCount +
          1
        );


      const pointIndex =
        physicsPoints.length;


      physicsPoints.push({

        x:
          startNode.x +
          (
            endNode.x -
            startNode.x
          ) *
          t +
          offsetX,

        y:
          startNode.y +
          (
            endNode.y -
            startNode.y
          ) *
          t +
          offsetY,

        vx: 0,
        vy: 0,

        isJoint: false,

        sourceNodeIndex:
          null

      });


      addPhysicsSpring(

        physicsPoints,

        physicsSprings,

        previousPointIndex,

        pointIndex

      );


      previousPointIndex =
        pointIndex;
    }


    addPhysicsSpring(

      physicsPoints,

      physicsSprings,

      previousPointIndex,

      jointPointIndices[
        endNodeIndex
      ]

    );
  }


  // ---------------------------------------------------
  // connector
  // ---------------------------------------------------

  const connectorPointIndices =
    jamo.connectors.map(

      nodeIndex =>
        jointPointIndices[
          nodeIndex
        ]

    );


  return {

    physicsPoints,

    physicsSprings,

    connectorPointIndices

  };
}


// =====================================================
// SPRING
// =====================================================

function addPhysicsSpring(
  points,
  springs,
  pointIndexA,
  pointIndexB
) {

  const pointA =
    points[
      pointIndexA
    ];

  const pointB =
    points[
      pointIndexB
    ];


  springs.push({

    a:
      pointIndexA,

    b:
      pointIndexB,

    restLength:
      Math.hypot(

        pointB.x -
        pointA.x,

        pointB.y -
        pointA.y

      )

  });
}


// =====================================================
// 10. INTERACTION
// =====================================================

function getClosestPointToMouse() {

  let closestPoint =
    null;

  let closestDistance =
    POINT_PICK_RADIUS;


  for (
    let instanceIndex =
      jamoInstances.length - 1;

    instanceIndex >= 0;

    instanceIndex--
  ) {

    const points =
      jamoInstances[
        instanceIndex
      ].physicsPoints;


    for (
      let pointIndex = 0;
      pointIndex < points.length;
      pointIndex++
    ) {

      const point =
        points[
          pointIndex
        ];


      const distance =
        Math.hypot(

          mouseX -
          point.x,

          mouseY -
          point.y

        );


      if (
        distance <
        closestDistance
      ) {

        closestDistance =
          distance;


        closestPoint = {

          instanceIndex,

          pointIndex

        };
      }
    }
  }


  return closestPoint;
}


// =====================================================
// CURSOR
// =====================================================

function updatePointCursor() {

  const closestPoint =
    getClosestPointToMouse();


  if (
    closestPoint !== null
  ) {

    cursor(
      HAND
    );

  } else {

    cursor(
      ARROW
    );
  }
}


// =====================================================
// MOUSE PRESS
// =====================================================

function mousePressed() {

  const closestPoint =
    getClosestPointToMouse();


  draggedPoint =
    closestPoint;

  draggedJamo =
    null;


  if (
    closestPoint === null
  ) {

    return;
  }


  const instance =
    jamoInstances[
      closestPoint.instanceIndex
    ];


  const point =
    instance.physicsPoints[
      closestPoint.pointIndex
    ];


  draggedJamo = {

    instanceIndex:
      closestPoint.instanceIndex,

    pointIndex:
      closestPoint.pointIndex,

    grabOffsetX:
      mouseX -
      point.x,

    grabOffsetY:
      mouseY -
      point.y

  };


  point.vx =
    0;

  point.vy =
    0;
}


// =====================================================
// MOUSE DRAG
// =====================================================

function mouseDragged() {

  if (
    draggedJamo === null
  ) {

    return;
  }


  const instance =
    jamoInstances[
      draggedJamo.instanceIndex
    ];


  const point =
    instance.physicsPoints[
      draggedJamo.pointIndex
    ];


  if (
    !point
  ) {

    return;
  }


  point.x =
    mouseX -
    draggedJamo.grabOffsetX;


  point.y =
    mouseY -
    draggedJamo.grabOffsetY;


  point.vx =
    0;

  point.vy =
    0;
}


// =====================================================
// MOUSE RELEASE
// =====================================================

function mouseReleased() {

  if (
    draggedJamo !== null
  ) {

    const instance =
      jamoInstances[
        draggedJamo.instanceIndex
      ];


    const point =
      instance &&
      instance.physicsPoints[
        draggedJamo.pointIndex
      ];


    if (
      point
    ) {

      point.vx =
        constrain(

          mouseX -
          pmouseX,

          -MAX_POINT_SPEED,
          MAX_POINT_SPEED

        );


      point.vy =
        constrain(

          mouseY -
          pmouseY,

          -MAX_POINT_SPEED,
          MAX_POINT_SPEED

        );
    }
  }


  draggedPoint =
    null;

  draggedJamo =
    null;
}


// =====================================================
// 10-A. MERGE / CONTACT DETECTION
// =====================================================

function updateMergeContacts() {

  mergeContacts =
    [];


  for (
    let i = 0;
    i < jamoInstances.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < jamoInstances.length;
      j++
    ) {

      const instanceA =
        jamoInstances[i];

      if (instanceA.isReleased) {
        continue;
      }

      const instanceB =
        jamoInstances[j];

      if (instanceB.isReleased) {
        continue;
      }


      const contactPairs =
        findContactPairs(

          instanceA,
          instanceB,

          MERGE_START_DISTANCE

        );


      if (
        contactPairs.length === 0
      ) {

        continue;
      }


      const selectedPairs =
        selectSpatialContactPairs(

          contactPairs,

          7,

          18

        );


      for (
        let contactIndex = 0;
        contactIndex <
        selectedPairs.length;
        contactIndex++
      ) {

        const closest =
          selectedPairs[
            contactIndex
          ];


        const strength =
          constrain(

            map(

              closest.distance,

              MERGE_START_DISTANCE,

              MERGE_FULL_DISTANCE,

              0,
              1

            ),

            0,
            1

          );


        // ------------------------------------------------
        // 핵심:
        // 접합부마다 독립적인 색
        // ------------------------------------------------

        const colorIndex =
          getJunctionColorIndex(

            i,
            j,

            closest.x,
            closest.y,

            contactIndex

          );


        mergeContacts.push({

          instanceA:
            i,

          instanceB:
            j,

          x:
            closest.x,

          y:
            closest.y,

          distance:
            closest.distance,

          strength,

          pointAIndex:
            closest.pointAIndex,

          pointBIndex:
            closest.pointBIndex,

          colorIndex,

          seed:
            1000 +
            i * 91 +
            j * 137 +
            contactIndex * 53

        });


        // ------------------------------------------------
        // 실제 physics point attraction
        // ------------------------------------------------

        applyMergeAttraction(

          instanceA,

          closest.pointAIndex,

          instanceB,

          closest.pointBIndex,

          strength

        );


        // ------------------------------------------------
        // cross spring
        // ------------------------------------------------

        const existingBond =
          fusionBonds.some(

            bond =>

              bond.instanceA === i &&

              bond.instanceB === j &&

              bond.pointAIndex ===
              closest.pointAIndex &&

              bond.pointBIndex ===
              closest.pointBIndex

          );


        if (

          closest.distance <=
          MERGE_BOND_DISTANCE &&

          !existingBond

        ) {

          fusionBonds.push({

            instanceA:
              i,

            instanceB:
              j,

            pointAIndex:
              closest.pointAIndex,

            pointBIndex:
              closest.pointBIndex,

            restLength:
              Math.min(

                closest.distance,

                MERGE_BOND_DISTANCE

              ),

            strength:
              1

          });
        }
      }
    }
  }


  // ---------------------------------------------------
  // 기존 cross spring 계산
  // ---------------------------------------------------

  for (
    const bond
    of fusionBonds
  ) {

    if (

      bond.instanceA >=
      jamoInstances.length ||

      bond.instanceB >=
      jamoInstances.length

    ) {

      continue;
    }


    const instanceA =
      jamoInstances[
        bond.instanceA
      ];

    const instanceB =
      jamoInstances[
        bond.instanceB
      ];


    const pointA =
      instanceA.physicsPoints[
        bond.pointAIndex
      ];


    const pointB =
      instanceB.physicsPoints[
        bond.pointBIndex
      ];


    if (
      !pointA ||
      !pointB
    ) {

      bond.break =
        true;

      continue;
    }


    const dx =
      pointB.x -
      pointA.x;


    const dy =
      pointB.y -
      pointA.y;


    const distance =
      Math.max(

        0.0001,

        Math.hypot(
          dx,
          dy
        )

      );


    if (
      distance >
      MERGE_MAX_BOND_STRETCH
    ) {

      bond.break =
        true;

      continue;
    }


    const stretch =
      distance -
      bond.restLength;


    const force =
      stretch *
      MERGE_ADHESION_STRENGTH;


    const fx =
      dx /
      distance *
      force;


    const fy =
      dy /
      distance *
      force;


    pointA.vx +=
      fx;

    pointA.vy +=
      fy;


    pointB.vx -=
      fx;

    pointB.vy -=
      fy;


    if (
      distance <
      MERGE_BOND_DISTANCE
    ) {

      const contract =
        (
          distance -
          bond.restLength
        ) *
        0.018;


      pointA.vx +=
        dx /
        distance *
        contract;


      pointA.vy +=
        dy /
        distance *
        contract;


      pointB.vx -=
        dx /
        distance *
        contract;


      pointB.vy -=
        dy /
        distance *
        contract;
    }
  }


  fusionBonds =
    fusionBonds.filter(
      bond =>
        !bond.break
    );
}


// =====================================================
// JUNCTION COLOR
// =====================================================
//
// 매우 중요:
//
// 같은 두 자모가 여러 위치에서 만나도
// 접합부 각각이 다른 색을 가질 수 있다.
//
// 위치 + 자모 pair + contact index를 hash해서
// 색을 결정한다.
// =====================================================

function getJunctionColorIndex(

  instanceA,
  instanceB,

  x,
  y,

  contactIndex

) {

  const qx =
    Math.round(
      x / 32
    );


  const qy =
    Math.round(
      y / 32
    );


  const hash =
    Math.abs(

      instanceA *
      92821 +

      instanceB *
      68917 +

      qx *
      31337 +

      qy *
      1009 +

      contactIndex *
      97

    );


  return (
    hash %
    PASTEL_COLORS.length
  );
}


// =====================================================
// CONTACT PAIRS
// =====================================================

function findContactPairs(

  instanceA,
  instanceB,
  maxDistance

) {

  const pointsA =
    instanceA.physicsPoints;

  const pointsB =
    instanceB.physicsPoints;


  const pairs =
    [];


  const maxDistanceSquared =
    maxDistance *
    maxDistance;


  for (
    let a = 0;
    a < pointsA.length;
    a++
  ) {

    const pointA =
      pointsA[a];


    for (
      let b = 0;
      b < pointsB.length;
      b++
    ) {

      const pointB =
        pointsB[b];


      const dx =
        pointB.x -
        pointA.x;


      const dy =
        pointB.y -
        pointA.y;


      const distanceSquared =
        dx * dx +
        dy * dy;


      if (
        distanceSquared >
        maxDistanceSquared
      ) {

        continue;
      }


      const distance =
        Math.sqrt(
          distanceSquared
        );


      pairs.push({

        x:
          (
            pointA.x +
            pointB.x
          ) *
          0.5,

        y:
          (
            pointA.y +
            pointB.y
          ) *
          0.5,

        distance,

        pointAIndex:
          a,

        pointBIndex:
          b

      });
    }
  }


  pairs.sort(

    (a, b) =>
      a.distance -
      b.distance

  );


  return pairs;
}


// =====================================================
// SELECT CONTACTS
// =====================================================

function selectSpatialContactPairs(

  pairs,
  maxCount,
  minimumSpacing

) {

  const selected =
    [];


  const minimumSpacingSquared =
    minimumSpacing *
    minimumSpacing;


  for (
    const pair of pairs
  ) {

    let tooClose =
      false;


    for (
      const chosen
      of selected
    ) {

      const dx =
        pair.x -
        chosen.x;


      const dy =
        pair.y -
        chosen.y;


      if (

        dx * dx +
        dy * dy <
        minimumSpacingSquared

      ) {

        tooClose =
          true;

        break;
      }
    }


    if (
      tooClose
    ) {

      continue;
    }


    selected.push(
      pair
    );


    if (
      selected.length >=
      maxCount
    ) {

      break;
    }
  }


  return selected;
}


// =====================================================
// MERGE ATTRACTION
// =====================================================

function applyMergeAttraction(

  instanceA,
  pointAIndex,

  instanceB,
  pointBIndex,

  strength

) {

  const pointA =
    instanceA.physicsPoints[
      pointAIndex
    ];


  const pointB =
    instanceB.physicsPoints[
      pointBIndex
    ];


  if (
    !pointA ||
    !pointB
  ) {

    return;
  }


  const dx =
    pointB.x -
    pointA.x;


  const dy =
    pointB.y -
    pointA.y;


  const distance =
    Math.max(

      0.0001,

      Math.hypot(
        dx,
        dy
      )

    );


  const force =
    strength *
    MERGE_ATTRACTION_STRENGTH;


  const fx =
    dx /
    distance *
    force;


  const fy =
    dy /
    distance *
    force;


  pointA.vx +=
    fx;

  pointA.vy +=
    fy;


  pointB.vx -=
    fx;

  pointB.vy -=
    fy;
}


// =====================================================
// 10-B. REAL CELL-TO-CELL FUSION
// =====================================================
//
// 핵심:
//
// 기존:
//   A
//   B
//   ↓
//   A 위에 B를 그림
//
// 변경:
//   A       B
//    \     /
//     \___/
//       ↓
//      AB
//
// 즉 두 개의 원을 단순히 겹치는 것이 아니라
// 두 세포를 렌더링 단계에서 숨기고
// 하나의 continuous contour로 만든다.
// =====================================================

function updateCellFusionStates() {

  const seen =
    new Set();


  for (
    const contact
    of mergeContacts
  ) {

    if (
      contact.distance >
      CELL_FUSION_TRIGGER_DISTANCE
    ) {

      continue;
    }


    const instanceA =
      jamoInstances[
        contact.instanceA
      ];


    const instanceB =
      jamoInstances[
        contact.instanceB
      ];


    if (
      !instanceA ||
      !instanceB
    ) {

      continue;
    }


    const particleAIndex =
      findNearestOrganismParticle(

        instanceA,

        contact.x,
        contact.y

      );


    const particleBIndex =
      findNearestOrganismParticle(

        instanceB,

        contact.x,
        contact.y

      );


    if (

      particleAIndex < 0 ||
      particleBIndex < 0

    ) {

      continue;
    }


    const key =
      makeFusionKey(

        contact.instanceA,
        particleAIndex,

        contact.instanceB,
        particleBIndex

      );


    seen.add(
      key
    );


    let state =
      cellFusionStates.get(
        key
      );


    if (
      !state
    ) {

      state = {

        key,

        instanceA:
          contact.instanceA,

        particleAIndex,

        instanceB:
          contact.instanceB,

        particleBIndex,

        colorIndex:
          contact.colorIndex,

        progress:
          0,

        lastSeen:
          frameCount,

        x:
          contact.x,

        y:
          contact.y,

        seed:
          contact.seed

      };


      cellFusionStates.set(
        key,
        state
      );
    }


    const proximity =
      constrain(

        1 -
        contact.distance /
        CELL_FUSION_TRIGGER_DISTANCE,

        0,
        1

      );


    state.progress =
      constrain(

        state.progress +

        CELL_FUSION_SPEED *
        (
          0.30 +
          proximity *
          1.15
        ),

        0,
        1

      );


    state.lastSeen =
      frameCount;


    // -------------------------------------------------
    // 중요:
    // 이미 부여된 접합부 색을 유지하되
    // 실제 접촉 위치에 따라 해당 접합부가 결정된다.
    // -------------------------------------------------

    state.colorIndex =
      contact.colorIndex;


    state.x =
      lerp(
        state.x,
        contact.x,
        0.35
      );


    state.y =
      lerp(
        state.y,
        contact.y,
        0.35
      );


    state.seed =
      contact.seed;
  }


  // ---------------------------------------------------
  // 접촉이 끊어지면 다시 원래 세포로 돌아간다.
  // ---------------------------------------------------

  for (
    const [
      key,
      state
    ]
    of cellFusionStates
  ) {

    if (
      !seen.has(key)
    ) {

      state.progress =
        constrain(

          state.progress -
          CELL_FUSION_RETURN_SPEED,

          0,
          1

        );
    }


    if (
      state.progress <=
      0.001
    ) {

      cellFusionStates.delete(
        key
      );
    }
  }
}


// =====================================================
// FUSION KEY
// =====================================================

function makeFusionKey(

  instanceA,
  particleAIndex,

  instanceB,
  particleBIndex

) {

  const left =
    instanceA +
    ":" +
    particleAIndex;


  const right =
    instanceB +
    ":" +
    particleBIndex;


  return left < right

    ? left +
      "|" +
      right

    : right +
      "|" +
      left;
}


// =====================================================
// FIND NEAREST PARTICLE
// =====================================================

function findNearestOrganismParticle(

  instance,
  x,
  y

) {

  let bestIndex =
    -1;


  let bestDistance =
    Infinity;


  for (
    let i = 0;
    i <
    instance.organismParticles.length;
    i++
  ) {

    const particle =
      instance.organismParticles[
        i
      ];


    const distance =
      Math.hypot(

        particle.x -
        x,

        particle.y -
        y

      );


    if (
      distance <
      bestDistance
    ) {

      bestDistance =
        distance;

      bestIndex =
        i;
    }
  }


  return bestIndex;
}


// =====================================================
// DRAW MERGED CELLS
// =====================================================
//
// 여기서 정말 중요한 것:
//
// mergedParticleKeys에 들어간 원래 A/B는
// drawOrganism에서 다시 그려지지 않는다.
//
// 따라서:
//
// A + B
//
// 를 두 번 그리는 것이 아니라:
//
// AB
//
// 하나만 그린다.
// =====================================================

function drawMergedCells() {

  mergedParticleKeys.clear();


  for (
    const state
    of cellFusionStates.values()
  ) {

    if (
      state.progress <=
      0.001
    ) {

      continue;
    }


    const instanceA =
      jamoInstances[
        state.instanceA
      ];


    const instanceB =
      jamoInstances[
        state.instanceB
      ];


    if (
      !instanceA ||
      !instanceB
    ) {

      continue;
    }


    const particleA =
      instanceA.organismParticles[
        state.particleAIndex
      ];


    const particleB =
      instanceB.organismParticles[
        state.particleBIndex
      ];


    if (
      !particleA ||
      !particleB
    ) {

      continue;
    }


    const p =
      smoothstep01(
        state.progress
      );


    const pastel =
      PASTEL_COLORS[
        state.colorIndex
      ];


    // -------------------------------------------------
    // 두 세포의 면적을 보존
    // -------------------------------------------------

    const areaA =
      Math.max(

        0.1,

        particleA.size *
        particleA.size

      );


    const areaB =
      Math.max(

        0.1,

        particleB.size *
        particleB.size

      );


    const total =
      areaA +
      areaB;


    const targetX =
      (
        particleA.x *
        areaA +

        particleB.x *
        areaB

      ) /
      total;


    const targetY =
      (
        particleA.y *
        areaA +

        particleB.y *
        areaB

      ) /
      total;


    // -------------------------------------------------
    // 서로의 중심으로 수렴
    // -------------------------------------------------

    const pull =
      smoothstep01(

        constrain(
          p * 1.18,
          0,
          1
        )

      ) *
      0.84;


    const ax =
      lerp(
        particleA.x,
        targetX,
        pull
      );


    const ay =
      lerp(
        particleA.y,
        targetY,
        pull
      );


    const bx =
      lerp(
        particleB.x,
        targetX,
        pull
      );


    const by =
      lerp(
        particleB.y,
        targetY,
        pull
      );


    const rA =
      particleA.size *
      0.5;


    const rB =
      particleB.size *
      0.5;


    // -------------------------------------------------
    // 하나의 contour
    // -------------------------------------------------

    drawFusedCellContour(

      ax,
      ay,

      bx,
      by,

      rA,
      rB,

      p,

      pastel,

      state.seed

    );


    // -------------------------------------------------
    // 원래 두 세포를 렌더링에서 제외
    // -------------------------------------------------

    mergedParticleKeys.add(

      state.instanceA +
      ":" +
      state.particleAIndex

    );


    mergedParticleKeys.add(

      state.instanceB +
      ":" +
      state.particleBIndex

    );
  }
}


// =====================================================
// ONE CONTINUOUS FUSED CELL
// =====================================================
//
// 두 원의 외곽을 각각 그린 뒤 겹치는 것이 아니라
// scalar field를 계산해서 "하나의 경계"를 찾는다.
//
// 따라서 내부에 A/B 경계가 남지 않는다.
// =====================================================

function drawFusedCellContour(

  ax,
  ay,

  bx,
  by,

  rA,
  rB,

  progress,

  pastel,

  seed

) {

  const dx =
    bx -
    ax;


  const dy =
    by -
    ay;


  const distance =
    Math.max(

      0.001,

      Math.hypot(
        dx,
        dy
      )

    );


  const centerX =
    (
      ax +
      bx
    ) *
    0.5;


  const centerY =
    (
      ay +
      by
    ) *
    0.5;


  // ---------------------------------------------------
  // merge amount
  // ---------------------------------------------------

  const merge =
    smoothstep01(

      constrain(

        (
          progress -
          0.12
        ) /
        0.88,

        0,
        1

      )

    );


  // ---------------------------------------------------
  // 면적 보존
  // ---------------------------------------------------

  const finalRadius =
    Math.sqrt(

      rA *
      rA +

      rB *
      rB

    );


  // ---------------------------------------------------
  // 두 lobe
  // ---------------------------------------------------

  const lobeA =
    lerp(

      rA,

      finalRadius *
      0.72,

      merge

    );


  const lobeB =
    lerp(

      rB,

      finalRadius *
      0.72,

      merge

    );


  const ctx =
    drawingContext;


  ctx.save();


  const points =
    [];


  // ---------------------------------------------------
  // 하나의 contour 계산
  // ---------------------------------------------------

  for (
    let i = 0;
    i < SOAP_BUBBLE_STEPS;
    i++
  ) {

    const theta =
      TWO_PI *
      i /
      SOAP_BUBBLE_STEPS;


    const dirX =
      Math.cos(
        theta
      );


    const dirY =
      Math.sin(
        theta
      );


    let lo =
      0;


    let hi =
      finalRadius *
      1.48 +
      distance *
      0.35;


    // -------------------------------------------------
    // neck이 점점 넓어진다.
    // -------------------------------------------------

    const threshold =
      lerp(

        1.12,

        0.84,

        merge

      );


    // binary search
    for (
      let k = 0;
      k < 9;
      k++
    ) {

      const rr =
        (
          lo +
          hi
        ) *
        0.5;


      const px =
        centerX +
        dirX *
        rr;


      const py =
        centerY +
        dirY *
        rr;


      const dA =
        Math.max(

          0.75,

          Math.hypot(

            px -
            ax,

            py -
            ay

          )

        );


      const dB =
        Math.max(

          0.75,

          Math.hypot(

            px -
            bx,

            py -
            by

          )

        );


      // ------------------------------------------------
      // metaball-style scalar field
      // ------------------------------------------------

      const field =

        Math.pow(
          lobeA /
          dA,
          2
        ) +

        Math.pow(
          lobeB /
          dB,
          2
        ) +

        merge *
        0.08 *
        Math.exp(

          -

          Math.pow(

            Math.min(
              dA,
              dB
            ) /
            Math.max(
              finalRadius,
              1
            ),

            2

          )

        );


      if (
        field >
        threshold
      ) {

        lo =
          rr;

      } else {

        hi =
          rr;
      }
    }


    const rr =
      (
        lo +
        hi
      ) *
      0.5;


    // -------------------------------------------------
    // 유기적인 미세 흔들림
    // -------------------------------------------------

    const jitter =

      (

        noise(

          seed +
          i *
          0.17,

          frameCount *
          0.004

        ) -

        0.5

      ) *

      finalRadius *
      0.045 *

      (
        0.35 +
        merge *
        0.65
      );


    points.push({

      x:
        centerX +
        dirX *
        (
          rr +
          jitter
        ),

      y:
        centerY +
        dirY *
        (
          rr +
          jitter
        )

    });
  }


    // ===================================================
  // SOAP FILM RENDERING
  // ===================================================

  noStroke();
  
  const r = constrain(pastel[0], 0, 255);
  const g = constrain(pastel[1], 0, 255);
  const b = constrain(pastel[2], 0, 255);
  
  fill(r, g, b, SOAP_BUBBLE_ALPHA);

  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);

  // ---------------------------------------------------
  // 광택 효과 (선택사항)
  // ---------------------------------------------------
  
  stroke(255, 255, 255, SOAP_BUBBLE_GLOSS * 2);
  strokeWeight(0.8);
  noFill();
  
  beginShape();
  for (let i = 0; i < points.length / 3; i++) {
    const point = points[i];
    vertex(point.x, point.y);
  }
  endShape();

  ctx.restore();
}

  // =====================================================
// MISSING FUNCTIONS
// =====================================================

function getCanvasWidth() {
  return windowWidth - PAGE_MARGIN * 2;
}

function getCanvasHeight() {
  return Math.max(
    400,
    windowHeight -
      PAGE_MARGIN * 2 -
      CONTROL_AREA_HEIGHT
  );
}

function smoothstep01(t) {
  const clamped = constrain(t, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}


// =====================================================
// RESPONSIVE CONTROL POSITION
// =====================================================

function positionControls() {
  const controlTop =
    windowHeight - 55;

  const groupWidth = 310;

  const startX =
    PAGE_MARGIN +
    (getCanvasWidth() - groupWidth) / 2;

  pointCountSlider.size(100);

  pointCountSlider.position(
    startX,
    controlTop
  );

  textInput.position(
    startX + 125,
    controlTop
  );

  generateButton.position(
    startX + 265,
    controlTop
  );

  releaseButton.position(
    startX + 315,
    controlTop
  );
}

// =====================================================
// DECOMPOSE HANGUL
// =====================================================

function decomposeHangul(char) {
  const code = char.charCodeAt(0);
  
  if (code < 0xAC00 || code > 0xD7A3) {
    return null;
  }
  
  const temp = code - 0xAC00;
  const jong = temp % 28;
  const jung = Math.floor((temp / 28) % 21);
  const cho = Math.floor(temp / 28 / 21);
  
  return {
    cho: CHOSEONG[cho] || "ㄱ",
    jung: JUNGSEONG[jung] || "ㅏ",
    jong: JONGSEONG[jong] || ""
  };
}

// =====================================================
// WINDOW RESIZE
// =====================================================

function windowResized() {
  if (isReleased) {
    resizeCanvas(
      windowWidth,
      windowHeight
    );
  } else {
    resizeCanvas(
      getCanvasWidth(),
      getCanvasHeight()
    );
  }

  if (!isReleased) {
    generateJamosFromInput();
  }
  positionControls();
}