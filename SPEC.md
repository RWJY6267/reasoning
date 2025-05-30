# 偵探推理遊戲網站規格說明

## 專案概述
這是一個純前端的偵探推理遊戲網站，設計用於部署在 GitHub Pages 上。玩家可以扮演偵探，通過調查現場、詢問嫌疑人和分析證據來解決案件。

## 技術棧
- HTML5
- CSS3
- JavaScript (原生)
- SweetAlert2 (CDN 版本) - 用於美化提示框

## 當前功能
### 1. 遊戲核心系統
- [x] 案件背景展示
- [x] 進度追蹤系統
- [x] 證據收集系統
- [x] 嫌疑人訊問系統
- [x] 證據分析功能
- [x] 推理提交與驗證

### 2. 用戶界面
- [x] 響應式設計
- [x] 暗色主題
- [x] 互動式按鈕
- [x] 動態證據列表
- [x] 美化的提示框

### 3. 遊戲內容
- [x] 基礎案件：「神秘的博物館失竊案」
  - 包含 4 位嫌疑人
  - 包含 4 個可收集的證據
  - 完整的案件解答

## 待開發功能
### 1. 遊戲系統擴充
- [ ] 更多案件內容
- [ ] 難度分級系統
- [ ] 計時系統
- [ ] 分數統計
- [ ] 遊戲存檔功能

### 2. 界面優化
- [ ] 新增動畫效果
- [ ] 添加背景音效
- [ ] 證據圖片展示
- [ ] 角色立繪
- [ ] 遊戲設置面板

### 3. 遊戲內容擴充
- [ ] 多樣化的案件類型
- [ ] 分支劇情
- [ ] 成就系統
- [ ] 道具系統
- [ ] 筆記本功能

## 專案文件結構
```
reasoning/
├── index.html      # 主要HTML文件
├── style.css       # 樣式表
├── script.js       # 遊戲邏輯
└── SPEC.md         # 專案規格說明
```

## 開發指南
### 添加新案件
在 `script.js` 的 `cases` 數組中添加新的案件對象，格式如下：
```javascript
{
    id: Number,          // 案件編號
    title: String,       // 案件標題
    background: String,  // 案件背景描述
    suspects: [          // 嫌疑人列表
        {
            name: String,    // 嫌疑人姓名
            role: String,    // 身份
            alibi: String    // 不在場證明
        }
    ],
    evidences: [         // 證據列表
        {
            id: String,      // 證據編號
            name: String,    // 證據名稱
            description: String  // 證據描述
        }
    ],
    solution: String,    // 正確答案（嫌疑人姓名）
    solutionExplanation: String  // 案件解答說明
}
```

### 代碼風格指南
- 使用 camelCase 命名變數和函數
- 使用有意義的變數名稱
- 添加適當的註釋
- 保持代碼簡潔和模組化

## 注意事項
1. 保持純前端實現，避免使用需要後端的功能
2. 使用 CDN 版本的外部庫，以便於部署到 GitHub Pages
3. 確保所有互動元素都有適當的錯誤處理
4. 保持響應式設計，支援各種設備尺寸

## 未來展望
1. 實現本地存儲功能，保存遊戲進度
2. 添加多語言支持
3. 引入更多互動元素
4. 開發關卡編輯器
5. 添加社群分享功能

## 貢獻指南
1. Fork 專案
2. 創建新分支
3. 提交更改
4. 發起 Pull Request

## 版本歷程
- v1.0.0 (2025-05-26)
  - 初始版本
  - 實現基本遊戲功能
  - 完成第一個案件