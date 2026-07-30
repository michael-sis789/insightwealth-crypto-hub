export const editorialPolicy = {
  label: "Editorial Policy",
  title: "編輯政策與內容標準",
  description: "洞見財富 Crypto Hub 的內容目標，是用清楚、有來源、可重複檢查的方式，回答長期BTC投資者每天真正需要知道的問題。",
  sections: [
    {
      heading: "我們的內容目的",
      paragraphs: [
        "InsightWealth.live 不是加密貨幣百科，也不是短線喊單網站。網站的核心任務，是把分散的BTC價格、ETF資金流、Fear & Greed、鏈上估值、合約槓桿與每日新聞，整理成長期投資者可以理解的決策框架。",
        "每一篇文章與每一個工具，都必須回到同一個問題：今天長期BTC投資者應該知道什麼？如果一段內容只是在追熱門關鍵字、重複別人的新聞、或製造焦慮，它就不符合本站的方向。"
      ]
    },
    {
      heading: "原創性與分析標準",
      paragraphs: [
        "我們不把公開新聞重新改寫成看似原創的文章。當內容引用外部資料時，必須加入自己的分析框架，例如它對BTC、ETH、ETF需求、DCA節奏、風險管理或市場情緒的影響。",
        "工具頁不能只放一個計算器。它需要說明計算邏輯、適用情境、限制、資料來源與常見誤解。這是為了讓讀者離開頁面時真正理解一個問題，而不是只看到一個數字。"
      ]
    },
    {
      heading: "資料來源與更新",
      paragraphs: [
        "網站優先使用公開、可驗證、低成本且穩定的資料來源，包括 CoinGecko、Alternative.me、Binance public futures API、Federal Reserve、BEA、BGeometrics、手動ETF資料表與本地JSON快取。",
        "我們不會把延遲資料包裝成即時資料。ETF Flow、MVRV、NUPL、Puell Multiple與部分事件日曆資料會清楚標示來源、日期與更新頻率。若資料不可用，頁面應顯示暫不可用、Coming Soon 或 Stale data，而不是填入假數字。"
      ]
    },
    {
      heading: "風險與語氣",
      paragraphs: [
        "本站不承諾收益、不鼓勵 all-in、不製造恐慌，也不使用誇張標題誘導交易。Bull Score、DCA Opinion、Daily Crypto Brief 與所有計算器，都只是教育用途的市場觀察工具。",
        "加密資產波動大，任何單一指標都可能錯誤。洞見財富的長期原則是：投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。"
      ]
    }
  ],
  faq: [
    { q: "洞見財富是否提供財務建議？", a: "不提供。本站內容只供教育與資訊用途，不是買入、賣出或持有任何資產的建議。" },
    { q: "網站是否使用AI或自動化？", a: "網站使用自動化更新市場資料、快取JSON與生成每日結構化簡報，但所有重要頁面都需要保留來源、限制與風險說明。" },
    { q: "為什麼部分資料不是即時？", a: "因為ETF資金流與部分鏈上資料沒有可靠免費即時API。本站寧可標示每日更新，也不顯示假即時數字。" },
    { q: "內容如何避免低價值？", a: "每頁都必須提供原創解釋、資料來源、使用情境、限制、FAQ與相關工具，而不是只堆關鍵字或重複新聞。" }
  ]
};

export const methodology = {
  label: "Methodology",
  title: "資料方法論與更新流程",
  description: "本頁說明 Insight Wealth 如何收集、快取、標示與更新市場資料，讓讀者知道每個數字能信到什麼程度、適合用在哪個時間尺度。",
  sections: [
    {
      heading: "核心資料架構",
      paragraphs: [
        "網站使用本地JSON快取與伺服器端快取，避免每位訪客都直接呼叫外部API。這樣可以降低API限制、提升速度，也讓搜尋引擎更穩定地讀取頁面內容。",
        "BTC即時價格、24h變化與市值優先使用 CoinGecko；若失敗，回退至 Binance public ticker。Fear & Greed 使用 Alternative.me。Funding Rate 使用 Binance USD-M Futures endpoint。"
      ]
    },
    {
      heading: "鏈上資料",
      paragraphs: [
        "MVRV、NUPL、Puell Multiple 與 Realized Price 目前使用 BGeometrics 或人工確認資料。這些資料適合週期判斷，不適合短線交易，所以頁面會顯示日期、來源與 Updated daily / manually verified 標籤。",
        "如果資料超過合理期限或來源不可用，系統應保留舊資料的日期或顯示 Stale data，而不是用模擬資料取代。這是金融內容最基本的誠實。"
      ]
    },
    {
      heading: "事件日曆",
      paragraphs: [
        "Crypto Calendar 每天會移除過期事件，並更新可自動取得的宏觀資料。FOMC日期來自 Federal Reserve，PCE/Personal Income 來自 BEA，CPI目前使用BLS日程作為維護性清單。",
        "加密專屬事件，例如監管評論期、Token Unlock、ETF週度檢查與網路升級，會保留人工確認項目。這些項目必須有清楚解釋，避免把模糊傳聞放進日曆。"
      ]
    },
    {
      heading: "每日7點更新",
      paragraphs: [
        "GitHub Actions 會在每天馬來西亞時間 07:00 執行資料更新流程：更新BTC歷史價格、鏈上資料、ETF日期、事件日曆、市場快取、Bull Score、Daily Brief 與 YouTube 最新影片。",
        "更新完成後會執行 lint 與 build，若有資料變更則提交到 GitHub。Netlify 只負責從 GitHub 自動部署；不再使用 Netlify CLI production deploy。"
      ]
    }
  ],
  faq: [
    { q: "網站會為每位訪客呼叫外部API嗎？", a: "不會。DCA計算器讀本地歷史價格JSON，市場資料使用快取，避免API限制與慢載入。" },
    { q: "Bull Score如何更新？", a: "Bull Score根據最新市場快取、Fear & Greed、Funding、ETF JSON與鏈上JSON重新計算。" },
    { q: "資料錯誤怎麼回報？", a: "可以寄信到 hello@insightwealth.live，請附上頁面網址、錯誤數字與你看到的來源。" },
    { q: "為什麼不使用更多指標？", a: "網站目標是每日決策儀表盤，不是百科。優先顯示BTC Price、Fear & Greed、ETF Flow、Bull Score與DCA Opinion。" }
  ]
};

export const authorPage = {
  label: "Author",
  title: "作者與研究團隊",
  description: "洞見財富由獨立研究與內容製作流程維護，專注於Bitcoin、Crypto、AI、長期投資與資料驅動分析。",
  sections: [
    {
      heading: "關於洞見財富",
      paragraphs: [
        "洞見財富是一個獨立研究平台，支持同名 YouTube 頻道與 InsightWealth.live。內容重點不是追逐每一個市場噪音，而是幫助長期BTC投資者建立可重複的資料閱讀流程。",
        "我們關注Bitcoin、Crypto、AI、長期投資與資料驅動分析。網站內容不代表任何交易所、基金公司或代幣項目的官方意見。"
      ]
    },
    {
      heading: "研究流程",
      paragraphs: [
        "每日內容先從市場資料開始：BTC價格、Fear & Greed、ETF Flow、Funding、MVRV、NUPL、Puell與重要宏觀事件。接著才判斷今天的市場敘事與DCA觀點。",
        "影片內容會被轉換成網站可搜尋的文字簡報與工具入口。這讓觀眾不只看完一支影片，也能回來檢查資料來源、使用計算器、閱讀相關解釋。"
      ]
    },
    {
      heading: "利益與限制",
      paragraphs: [
        "洞見財富可能透過 YouTube、AdSense 或其他內容收入維持營運，但內容不接受以隱藏方式推廣高風險投機產品。若未來出現贊助或合作，頁面應清楚標示。",
        "我們不是註冊投資顧問，不能根據個人財務狀況提供投資建議。所有讀者都應自行研究，並根據自己的現金流、風險承受能力與投資期限決策。"
      ]
    }
  ],
  faq: [
    { q: "誰在維護這個網站？", a: "洞見財富獨立研究與內容製作流程維護 InsightWealth.live，聯絡信箱是 hello@insightwealth.live。" },
    { q: "作者是否提供個人投資建議？", a: "不提供。網站只做教育與資料整理，不針對個人情況給出買賣建議。" },
    { q: "如何查看每日影片？", a: "可以前往 YouTube 頻道 @9insightwealth，網站首頁與每日簡報也會嵌入最新影片。" },
    { q: "資料若有錯誤會修正嗎？", a: "會。若發現資料錯誤或過期，請透過聯絡頁回報，我們會以來源和日期為準修正。" }
  ]
};

export const sourceDirectory = {
  label: "Sources",
  title: "資料來源目錄",
  description: "本頁列出 InsightWealth.live 常用資料來源、用途、更新頻率與限制，方便讀者檢查每個指標的可信度。",
  sections: [
    {
      heading: "市場價格與情緒",
      paragraphs: [
        "CoinGecko 用於BTC現貨價格、24h變化、7d變化與市值。若 CoinGecko 暫時不可用，系統會回退到 Binance public ticker，但市值與7日變化可能暫不可用。",
        "Alternative.me Fear & Greed Index 用於市場情緒觀察。它是每日指標，不適合當成短線交易訊號，但可以幫助長期投資者辨識恐慌與追高風險。"
      ]
    },
    {
      heading: "合約與鏈上資料",
      paragraphs: [
        "Binance USD-M Futures funding rate 用於觀察合約市場多空槓桿溫度。Funding並不能直接預測價格，但能提示短線擁擠風險。",
        "BGeometrics 用於MVRV、NUPL、Puell Multiple與Realized Price。這些是週期背景資料，更新頻率以每日或手動確認為主。"
      ]
    },
    {
      heading: "ETF與事件",
      paragraphs: [
        "Bitcoin ETF Flow 目前使用手動JSON整理，參考ETF發行商、Farside-style公開表格與每日資料來源。它是日線資料，不是秒級即時數據。",
        "Crypto Calendar 使用 Federal Reserve FOMC calendar、BEA news schedule、BLS CPI schedule與人工確認的加密事件。過期事件會在每日更新中移除。"
      ]
    },
    {
      heading: "網站資料檔案",
      paragraphs: [
        "本地資料主要保存在 /data，包括 btc-daily-prices.json、daily-brief.json、events.json、etf-flow.json、onchain-indicators.json 與 cache/*.json。",
        "這些JSON檔案讓網站速度更穩定，也避免訪客流量直接打到免費API。讀者看到的數字，應同時搭配來源、更新時間與資料限制理解。"
      ]
    }
  ],
  faq: [
    { q: "是否所有資料都是即時？", a: "不是。價格與Funding較接近即時，Fear & Greed、ETF、鏈上與事件資料多為每日或人工確認。" },
    { q: "ETF Flow為什麼是手動JSON？", a: "因為缺少穩定免費官方API。手動JSON能避免假即時，也方便明確標示日期與來源。" },
    { q: "資料來源會更換嗎？", a: "會。如果找到更穩定、合規、低成本的來源，網站會更新資料層並保留來源標籤。" },
    { q: "讀者應如何使用這些資料？", a: "把它們當成風險管理與市場理解工具，不要當成保證收益或短線買賣指令。" }
  ]
};
