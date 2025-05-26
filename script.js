// 遊戲狀態
const gameState = {
    progress: 0,
    evidences: [],
    suspects: [],
    currentCase: null,
    isGameComplete: false
};

// 案件資料
const cases = [
    {
        id: 1,
        title: "神秘的博物館失竊案",
        background: "市立博物館的鎮館之寶「藍月鑽石」在一個雨夜被盜。監視器顯示當晚有四個人在博物館內活動。",
        suspects: [
            { name: "王保全", role: "博物館保全", alibi: "聲稱整晚都在監控室值班" },
            { name: "李教授", role: "珠寶專家", alibi: "稱在辦公室整理文件到深夜" },
            { name: "陳館長", role: "博物館館長", alibi: "參加了一個藝術品收購會議" },
            { name: "張維修", role: "維修工人", alibi: "在修理博物館的空調系統" }
        ],
        evidences: [
            { id: "E1", name: "破損的玻璃", description: "展示櫃的玻璃被專業工具切割" },
            { id: "E2", name: "殘留指紋", description: "展示櫃上發現不完整的指紋" },
            { id: "E3", name: "監視器畫面", description: "顯示在案發時間段有短暫的影像中斷" },
            { id: "E4", name: "保全記錄", description: "值班記錄顯示有異常的巡邏路線" }
        ],
        solution: "李教授",
        solutionExplanation: "李教授利用其專業知識和對博物館的熟悉度，在維修工人檢查空調時製造混亂，並利用其珠寶專家的身份接近展示櫃。監視器的異常恰好發生在他的辦公室附近。"
    }
];

// 初始化遊戲
function initGame() {
    gameState.currentCase = cases[0];
    updateStoryContent();
    updateProgress();
}

// 更新案件背景
function updateStoryContent() {
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = `
        <h3>${gameState.currentCase.title}</h3>
        <p>${gameState.currentCase.background}</p>
    `;
}

// 調查現場
function investigateScene() {
    if (gameState.isGameComplete) return;
    
    const randomEvidence = gameState.currentCase.evidences[
        Math.floor(Math.random() * gameState.currentCase.evidences.length)
    ];
    
    if (!gameState.evidences.find(e => e.id === randomEvidence.id)) {
        gameState.evidences.push(randomEvidence);
        updateEvidenceList();
        increaseProgress(25);
        
        Swal.fire({
            title: '發現新證據！',
            text: `${randomEvidence.name}：${randomEvidence.description}`,
            icon: 'success',
            confirmButtonText: '繼續調查'
        });
    } else {
        Swal.fire({
            title: '這個區域已經調查過了',
            text: '試試調查其他地方或詢問嫌疑人。',
            icon: 'info'
        });
    }
}

// 詢問嫌疑人
function interrogateSuspects() {
    if (gameState.isGameComplete) return;
    
    const suspect = gameState.currentCase.suspects[
        Math.floor(Math.random() * gameState.currentCase.suspects.length)
    ];
    
    if (!gameState.suspects.includes(suspect.name)) {
        gameState.suspects.push(suspect.name);
        increaseProgress(25);
        
        Swal.fire({
            title: `詢問 ${suspect.name}`,
            html: `
                <p><strong>身份：</strong>${suspect.role}</p>
                <p><strong>不在場證明：</strong>${suspect.alibi}</p>
            `,
            icon: 'info'
        });
    } else {
        Swal.fire({
            title: '已經詢問過這個嫌疑人',
            text: '試試詢問其他嫌疑人或調查現場。',
            icon: 'info'
        });
    }
}

// 分析證據
function analyzeEvidence() {
    if (gameState.isGameComplete) return;
    
    if (gameState.evidences.length === 0) {
        Swal.fire({
            title: '沒有證據可以分析',
            text: '先去現場調查收集一些證據吧！',
            icon: 'warning'
        });
        return;
    }

    const evidenceList = gameState.evidences
        .map(e => `${e.name}：${e.description}`)
        .join('\n');

    Swal.fire({
        title: '證據分析報告',
        text: evidenceList,
        icon: 'info'
    });
}

// 提交推理
function submitDeduction() {
    const deductionText = document.getElementById('deduction-text').value.trim();
    
    if (!deductionText) {
        Swal.fire({
            title: '請輸入你的推理',
            text: '基於收集到的證據，寫下你的推理結論。',
            icon: 'warning'
        });
        return;
    }

    const culpritPattern = new RegExp(gameState.currentCase.solution);
    const isCorrect = culpritPattern.test(deductionText);

    if (isCorrect) {
        gameState.isGameComplete = true;
        Swal.fire({
            title: '推理正確！',
            html: `
                <p>恭喜你破解了這個案件！</p>
                <p><strong>真相：</strong>${gameState.currentCase.solutionExplanation}</p>
            `,
            icon: 'success'
        });
    } else {
        Swal.fire({
            title: '推理不正確',
            text: '再仔細思考一下案件的細節吧！',
            icon: 'error'
        });
    }
}

// 更新證據列表
function updateEvidenceList() {
    const evidenceList = document.getElementById('evidence-list');
    evidenceList.innerHTML = gameState.evidences
        .map(evidence => `
            <div class="evidence-item">
                <h3>${evidence.name}</h3>
                <p>${evidence.description}</p>
            </div>
        `)
        .join('');
}

// 更新進度
function updateProgress() {
    document.getElementById('progress').textContent = gameState.progress;
}

// 增加進度
function increaseProgress(amount) {
    gameState.progress = Math.min(100, gameState.progress + amount);
    updateProgress();
}

// 遊戲開始
window.onload = initGame;