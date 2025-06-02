// 遊戲狀態
const gameState = {
    progress: 0,
    evidences: [],
    suspects: [],
    currentCase: null,
    isGameComplete: false
};

// 案件資料
const cases = [    {
        id: 1,
        title: "神秘的博物館失竊案",
        background: "市立博物館的鎮館之寶「藍月鑽石」在一個雨夜被盜。監視器顯示當晚有四個人在博物館內活動。竊賊似乎對博物館的安保系統非常熟悉，並且具有專業的珠寶知識。",
        suspects: [
            { name: "王保全", role: "博物館保全", alibi: "聲稱整晚都在監控室值班" },
            { name: "李教授", role: "珠寶專家", alibi: "稱在辦公室整理文件到深夜" },
            { name: "陳館長", role: "博物館館長", alibi: "參加了一個藝術品收購會議" },
            { name: "張維修", role: "維修工人", alibi: "在修理博物館的空調系統" }
        ],
        evidences: [
            { id: "E1", name: "破損的玻璃", description: "展示櫃的玻璃被專業的鑽石切割器精確切割，切口非常乾淨" },
            { id: "E2", name: "殘留指紋", description: "展示櫃上發現不完整的指紋，經過比對是一個戴著特殊材質手套的痕跡" },
            { id: "E3", name: "監視器畫面", description: "顯示在案發時間段有3分鐘的影像中斷，正好是從李教授辦公室附近的配電箱發生異常" },
            { id: "E4", name: "保全記錄", description: "值班記錄顯示保全的巡邏路線有異常，剛好錯過了珠寶展示區" },
            { id: "E5", name: "空調維修申請", description: "維修申請是在案發前一天突然提出的，但診斷顯示空調系統其實運作正常" }
        ],
        solution: "李教授",
        solutionWeapon: "鑽石切割器",
        solutionMotive: "巨額賭債",
        solutionMethod: "利用維修工人檢查空調系統製造混亂，同時破壞配電箱造成監視器短暫關閉，再用專業工具快速切割展示櫃竊取藍月鑽石",
        solutionExplanation: "李教授因為巨額賭債而鋌而走險。他利用自己珠寶專家的身份和對博物館的熟悉度，策劃了這起竊案。他偽造了空調維修申請製造混亂，並利用專業的鑽石切割器行竊。案發當晚，他先是故意破壞配電箱造成監視器短暫關閉，接著利用特殊手套避免留下指紋，精確切割展示櫃偷走藍月鑽石。他的專業背景不僅幫助他順利得手，還讓他能夠在黑市上轉售贓物。"
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
    const culprit = document.getElementById('culprit').value.trim();
    const weapon = document.getElementById('weapon').value.trim();
    const motive = document.getElementById('motive').value.trim();
    const method = document.getElementById('method').value.trim();
    const evidenceId = document.getElementById('evidence-explanation').value.trim().toUpperCase();
    
    // 檢查是否所有欄位都已填寫
    if (!culprit || !weapon || !motive || !method || !evidenceId) {
        Swal.fire({
            title: '請完整填寫推理內容',
            text: '所有欄位都需要填寫才能提交推理。',
            icon: 'warning'
        });
        return;
    }

    // 檢查證據代號格式
    if (!evidenceId.match(/^E[1-5]$/)) {
        Swal.fire({
            title: '證據代號格式錯誤',
            text: '請輸入正確的證據代號（E1-E5）',
            icon: 'warning'
        });
        return;
    }

    // 檢查各個推理要素是否正確
    const isCulpritCorrect = culprit === gameState.currentCase.solution;
    const isWeaponCorrect = weapon === gameState.currentCase.solutionWeapon;
    const isMotiveCorrect = motive === gameState.currentCase.solutionMotive;
    const hasKeyEvidence = gameState.evidences.some(e => e.id === evidenceId);
    
    // 計算推理的準確度
    const correctElements = [
        isCulpritCorrect ? 40 : 0,  // 兇手最重要
        isWeaponCorrect ? 20 : 0,   // 工具其次
        isMotiveCorrect ? 20 : 0,   // 動機
        hasKeyEvidence ? 20 : 0     // 關鍵證據
    ].reduce((a, b) => a + b, 0);

    if (isCulpritCorrect) {
        gameState.isGameComplete = true;
        let feedback = [];
        
        feedback.push(`兇手：${culprit} ${isCulpritCorrect ? '✅' : '❌'}`);
        feedback.push(`工具：${weapon} ${isWeaponCorrect ? '✅' : '❌'}`);
        feedback.push(`動機：${motive} ${isMotiveCorrect ? '✅' : '❌'}`);
        feedback.push(`關鍵證據：${evidenceId} ${hasKeyEvidence ? '✅' : '❌'}`);
        
        Swal.fire({
            title: `推理${correctElements === 100 ? '完全正確' : '大致正確'}！`,
            html: `
                <p>恭喜你找出了真兇！推理準確度：${correctElements}%</p>
                <p><strong>你的推理：</strong></p>
                <ul>
                    ${feedback.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <p><strong>正確答案：</strong></p>
                <ul>
                    <li>兇手：${gameState.currentCase.solution}</li>
                    <li>工具：${gameState.currentCase.solutionWeapon}</li>
                    <li>動機：${gameState.currentCase.solutionMotive}</li>
                </ul>
            `,
            icon: 'success'
        });
    } else {
        Swal.fire({
            title: '推理不正確',
            text: '再仔細思考一下案件的細節吧！特別是兇手的身份。',
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