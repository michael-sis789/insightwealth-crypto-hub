export type Locale = "zh" | "en";

export type SeoPage = {
  slug: string;
  legacyHref?: string;
  zh: SeoCopy;
  en: SeoCopy;
};

export type SeoCopy = {
  title: string;
  description: string;
  h1: string;
  summary: string;
  lastUpdated: string;
  dataSources: string[];
  keyTakeaways: string[];
  sections: Array<{ heading: string; body: string[] }>;
  faq: Array<{ q: string; a: string }>;
};

export type NewsArticle = {
  slug: string;
  date: string;
  videoUrl?: string;
  zh: NewsCopy;
  en: NewsCopy;
};

export type NewsCopy = {
  title: string;
  description: string;
  h1: string;
  summary: string;
  keyPoints: string[];
  marketImpact: string;
  btcImpact: string;
  ethImpact: string;
  riskWarning: string;
  dcaOpinion: string;
  faq: Array<{ q: string; a: string }>;
};

const zhShared = [
  "使用這個頁面時，請先把它當成每日決策檢查表，而不是短線喊單工具。長期BTC投資者最需要的是可重複的框架：先看價格與趨勢，再看情緒、ETF資金流、鏈上估值與槓桿是否互相確認。如果不同指標互相矛盾，就應該降低結論強度，而不是硬把市場解讀成單一方向。",
  "洞見財富的原則是只顯示有來源的資料。能透過公開API取得的資料會使用快取更新；無法可靠即時取得的資料，例如部分鏈上指標與ETF資金流，會標示最後更新日期、來源與更新頻率。這樣做的目的，是避免把延遲資料包裝成即時訊號，讓讀者知道每個數字適合用在哪一種時間尺度。",
  "任何工具都不能取代風險管理。比特幣波動大，單日價格、單一新聞、單一指標都可能誤導投資者。更穩健的流程，是先定義自己的資金期限、現金流、最大可承受回撤與定投規則，再用本頁資料檢查是否需要調整節奏。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。"
];

const enShared = [
  "Use this page as a daily decision checklist, not a short-term signal service. Long-term Bitcoin investors need a repeatable framework: start with price and trend, then check whether sentiment, ETF flow, on-chain valuation and leverage confirm the same message. If the indicators disagree, the conclusion should be weaker, not louder.",
  "Insight Wealth only displays data with a source. Data available from public APIs is cached and refreshed; data that is not reliably real time, such as some on-chain indicators and ETF flow tables, is labelled with source, last updated date and update frequency. The point is to avoid presenting delayed data as live trading information.",
  "No tool replaces risk management. Bitcoin is volatile, and a single price move, headline or indicator can mislead investors. A better process is to define time horizon, cash flow, maximum drawdown tolerance and DCA rules first, then use this page to decide whether the pace should change. Investing depends on discipline, not luck."
];

const zhDeepSections = [
  {
    heading: "每日閱讀流程",
    body: [
      "第一步是確認今天的核心市場狀態，而不是急著找買點。先看BTC Price與24h變化，理解市場短線溫度；再看7日趨勢，避免被單日波動誤導；接著看Fear & Greed，判斷散戶情緒是否過度恐慌或過度興奮；最後看ETF Flow與Bull Score，確認資金需求與綜合模型是否支持同一方向。",
      "第二步是把資料分成不同時間尺度。價格、Funding Rate與清算資料偏短線；ETF Flow適合日線與週線；MVRV、NUPL與Puell Multiple偏長周期。很多投資錯誤來自把長周期指標拿來做短線交易，或把短線價格波動當成長期趨勢改變。把時間尺度分清楚，才能避免過度反應。",
      "第三步是回到自己的計畫。網站提供的是市場資訊，不是個人化指令。若你的DCA計畫原本是每月投入固定金額，單日新聞通常不應改變整個策略；若你已經設定了資產配置上限，牛市高分也不應讓你突破風險邊界。工具的價值，是幫你檢查紀律，而不是替你製造衝動。"
    ]
  },
  {
    heading: "資料可靠性與更新頻率",
    body: [
      "加密資料常見問題是來源分散、口徑不同、更新時間不同。現貨價格可以接近即時，但ETF Flow通常要等交易日結束後整理；鏈上估值資料可能需要第三方模型計算；某些免費API也可能因限制、維護或請求過多而暫時失敗。因此本網站會把資料來源與最後更新時間放在每張卡片上，讓讀者知道目前看到的是即時、快取、每日更新，還是人工確認資料。",
      "如果資料不可用，正確做法是顯示不可用，而不是用舊數字假裝即時。這一點對SEO與使用者信任都很重要。投資者寧可看到清楚的資料限制，也不應被錯誤的新鮮感誤導。尤其是MVRV、NUPL、Puell Multiple這類週期指標，即使不是每分鐘更新，也仍然有價值；重點是不能把它們包裝成秒級訊號。",
      "本站採用本地JSON快取與伺服器端快取，是為了讓網站速度更快、避免免費API被每位訪客重複呼叫，也降低資料供應商限制造成的失敗率。對使用者來說，這代表頁面載入更穩定；對搜尋引擎來說，也代表內容可以被更可靠地抓取。"
    ]
  },
  {
    heading: "如何與DCA策略結合",
    body: [
      "DCA不是無腦買入，而是有規則地分散時間風險。當市場恐慌、估值不高、ETF資金流開始改善時，長期投資者可以考慮把預留資金拆成多次投入；當市場極度貪婪、價格短期急漲、槓桿過熱時，則可以維持原本投入或暫停追加。這種調整不是預測頂底，而是讓資金節奏更符合風險環境。",
      "好的DCA策略應該先定義失敗情境。例如，如果BTC下跌50%，你是否仍有現金流繼續投入？如果工作收入暫時下降，你是否需要降低定投？如果BTC在牛市中漲到資產組合占比過高，你是否有DCA out或再平衡計畫？這些問題比單日價格更重要。",
      "使用本頁資料時，可以把Bull Score當成節奏提示，把Fear & Greed當成情緒提示，把ETF Flow當成需求提示，把MVRV/NUPL/Puell當成週期提示。四者共同出現一致方向時，判斷才比較有力；如果互相矛盾，最好的行動通常是維持紀律、降低倉位變動幅度。"
    ]
  },
  {
    heading: "常見投資者誤區",
    body: [
      "第一個誤區是只看價格。價格最容易理解，也最容易引發情緒，但它只是結果，不是原因。BTC上漲可能來自ETF流入，也可能只是空頭回補；BTC下跌可能代表需求轉弱，也可能只是短線清算。缺少其他指標，就很難判斷價格背後的品質。",
      "第二個誤區是追求完美指標。市場沒有單一指標能永遠有效。Fear & Greed會在極端區停留很久，MVRV可能提前或延後反映週期，ETF Flow也可能受到短期再平衡影響。真正可用的是指標組合、風險控制與持續複盤。",
      "第三個誤區是把教育內容當成建議。每位投資者的現金流、負債、家庭責任、投資期限與心理承受能力都不同。同一個市場環境，對不同人可能代表不同選擇。因此本站只提供框架與資料，不會給出個人化買賣指令。"
    ]
  },
  {
    heading: "與其他洞見財富工具的關係",
    body: [
      "BTC Dashboard負責回答今天市場概況；DCA Calculator負責回答長期定投結果；ETF Flow頁面負責回答機構需求；Fear & Greed頁面負責回答情緒位置；Bull Bear Indicator負責把多個指標合成可讀分數；Daily Crypto Brief則把每天的重要新聞、影片與數據整理成文章。",
      "這些頁面的內部連結不是為了堆砌SEO，而是為了讓讀者形成完整流程。看完今日價格後，可以去ETF Flow確認資金；看完Fear & Greed後，可以去DCA Calculator測試長期策略；看完每日影片文章後，可以回到Dashboard確認最新資料。",
      "長期來看，網站的價值在於可回訪、可搜尋、可比較。YouTube影片適合快速理解，網站文章與工具適合保存、引用與重複使用。兩者結合，才能降低只靠社群流量的風險，建立真正的Google organic traffic基礎。"
    ]
  }
];

const enDeepSections = [
  {
    heading: "Daily reading workflow",
    body: [
      "The first step is to identify today's market state, not to rush into a buy decision. Start with BTC price and 24h change to understand short-term temperature. Then check the 7-day trend so one-day volatility does not dominate the conclusion. Next, read Fear & Greed to see whether retail sentiment is fearful or excited. Finally, compare ETF flow and Bull Score to confirm whether institutional demand and the broader model support the same direction.",
      "The second step is to separate time horizons. Price, funding rate and liquidation data are short-term. ETF flow is more useful on daily and weekly horizons. MVRV, NUPL and Puell Multiple are cycle indicators. Many investing mistakes come from using long-cycle indicators for intraday trades, or treating a one-day price move as a change in long-term trend. Time horizon discipline reduces overreaction.",
      "The third step is to return to your own plan. This site provides market information, not personalized instructions. If your DCA plan is monthly, one headline usually should not rewrite the strategy. If you already have a maximum allocation rule, a high bull score should not push you beyond risk limits. The value of the tool is to check discipline, not create impulses."
    ]
  },
  {
    heading: "Data reliability and update frequency",
    body: [
      "Crypto data often has fragmented sources, different methodologies and different update times. Spot price can be near real time, but ETF flow is usually compiled after the trading day. On-chain valuation may require third-party models. Some free APIs can fail because of rate limits, maintenance or request pressure. That is why each Insight Wealth card shows source and last updated time.",
      "If data is unavailable, the correct behavior is to show unavailable, not to display an old number as if it were live. This matters for user trust and for search quality. Investors are better served by a clear limitation than by false freshness. MVRV, NUPL and Puell are still useful even if updated daily or weekly; the key is not to present them as second-by-second signals.",
      "The site uses local JSON caches and server-side caching to improve speed, reduce repeated calls to free APIs and lower the risk of provider rate limits. For users, this means more stable pages. For search engines, it means content can be crawled more reliably."
    ]
  },
  {
    heading: "How to connect the page with DCA",
    body: [
      "DCA is not mindless buying. It is rule-based time diversification. When the market is fearful, valuation is not overheated and ETF flow begins to improve, long-term investors may split reserved capital into staged contributions. When the market is extremely greedy, price has risen quickly and leverage is crowded, maintaining the base plan or pausing extra buying can be more rational.",
      "A serious DCA plan should define failure scenarios. If BTC falls 50%, can you still contribute? If income drops, should the plan slow down? If BTC rises so much that it dominates the portfolio, do you have a DCA-out or rebalancing rule? These questions matter more than one daily candle.",
      "Use Bull Score as a pace signal, Fear & Greed as a sentiment signal, ETF flow as a demand signal and MVRV/NUPL/Puell as cycle signals. When several categories align, the conclusion is stronger. When they conflict, the better action is usually to stay disciplined and reduce the size of tactical changes."
    ]
  },
  {
    heading: "Common investor mistakes",
    body: [
      "The first mistake is reading only price. Price is easy to understand and emotionally powerful, but it is an outcome, not a cause. BTC can rise because of ETF inflow, but it can also rise because shorts are covering. BTC can fall because demand is weaker, but it can also fall because of short-term liquidations. Without other indicators, price quality is hard to judge.",
      "The second mistake is searching for a perfect indicator. No single metric works forever. Fear & Greed can stay extreme for weeks. MVRV can lead or lag cycle turns. ETF flow can be distorted by short-term rebalancing. What works better is a basket of indicators, risk control and consistent review.",
      "The third mistake is treating educational content as advice. Every investor has different cash flow, liabilities, family responsibilities, time horizon and emotional tolerance. The same market can mean different actions for different people. This site provides frameworks and data, not personalized buy or sell instructions."
    ]
  },
  {
    heading: "How this connects to other Insight Wealth tools",
    body: [
      "BTC Dashboard answers what the market looks like today. DCA Calculator answers what a long-term accumulation plan may have produced. ETF Flow explains institutional demand. Fear & Greed explains sentiment. Bull Bear Indicator combines multiple inputs into a readable score. Daily Crypto Brief turns the day's news, data and video workflow into an article.",
      "Internal links are not just for SEO. They support a real investor workflow. After checking today's price, a reader can verify ETF flow. After reading Fear & Greed, they can test a DCA scenario. After watching a daily video article, they can return to the dashboard to inspect live data.",
      "Over time, the website should become searchable, reusable and comparable. YouTube is good for fast explanation. Website articles and tools are better for reference, citation and repeat visits. Combining both reduces dependence on social referrals and builds a stronger Google organic traffic foundation."
    ]
  }
];

export const seoPages: SeoPage[] = [
  {
    slug: "btc-dca-calculator",
    zh: {
      title: "BTC DCA Calculator - 比特幣定投計算器與長期回測工具",
      description: "免費BTC DCA calculator，使用本地歷史價格資料估算比特幣定投投入、BTC累積、ROI、最大回撤與長期策略風險。",
      h1: "BTC DCA Calculator 比特幣定投計算器",
      summary: "這個工具幫助長期投資者比較每日、每週與每月定投BTC的結果，理解投入金額、開始日期、結束日期與策略規則如何影響最終收益與回撤。",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko cached historical BTC prices", "Local JSON cache: data/btc-daily-prices.json", "Insight Wealth DCA calculation model"],
      keyTakeaways: ["DCA降低的是進場時點風險，不是市場風險。", "定投金額必須小於可承受現金流。", "長期策略應該先看最大回撤，再看收益。"],
      sections: [
        { heading: "什麼是BTC定投？", body: ["BTC定投，也就是Bitcoin dollar cost averaging，是在固定時間投入固定金額購買比特幣。它的核心不是預測最低點，而是把買入行為制度化，降低情緒決策的比例。對多數長期投資者來說，問題不是能否買到最低點，而是能否在波動、恐慌與牛市誘惑中持續執行。", "定投適合有穩定現金流、投資期限較長、願意承受高波動但不想頻繁交易的人。它不保證獲利，也不代表每次下跌都應該加碼。真正有效的DCA計畫，應該包含定期投入、現金流上限、風險警戒、再平衡與必要時的DCA out規則。"] },
        { heading: "如何閱讀計算結果？", body: ["總投入代表你真正拿出的本金；BTC累積代表你的持幣數量；Current value代表用目前價格估算的資產價值；ROI與年化報酬只描述歷史結果，不代表未來收益。最大回撤是最容易被忽視但最重要的數字，因為它直接測試你是否能在壓力下繼續執行策略。", "如果一個策略歷史收益很高，但最大回撤也很深，投資者就必須問自己：如果未來再次下跌50%甚至70%，我是否還能照計畫投入？如果答案是否定的，策略金額可能太大。"] },
        { heading: "DCA何時應該調整？", body: ["當Fear & Greed進入極端恐懼、ETF流出減弱、MVRV與NUPL顯示估值不高時，長期投資者可以考慮小幅提高定投金額，但仍應分批而不是一次性all-in。當市場進入極端貪婪、槓桿擁擠、ETF資金轉弱或個人倉位過高時，可以降低投入或開始分批DCA out。"] }
      ],
      faq: [
        { q: "BTC DCA一定會賺錢嗎？", a: "不一定。DCA可以降低一次性進場風險，但不能消除比特幣價格下跌、長期熊市與個人現金流風險。" },
        { q: "每週定投還是每月定投比較好？", a: "差異取決於波動與時間長度。週期越短，買入價格越平滑；週期越長，執行更簡單。對多數人來說，可持續性比頻率更重要。" },
        { q: "這個計算器會即時呼叫CoinGecko嗎？", a: "不會。為避免API限制與速度問題，使用者計算時只讀取本地快取歷史價格。" }
      ]
    },
    en: {
      title: "Bitcoin DCA Calculator - BTC Dollar Cost Averaging Backtest",
      description: "Free Bitcoin DCA calculator for backtesting BTC dollar cost averaging with cached historical prices, ROI, drawdown and long-term strategy context.",
      h1: "Bitcoin DCA Calculator",
      summary: "This tool helps long-term investors compare daily, weekly and monthly BTC accumulation, showing how amount, date range and strategy rules affect final value and drawdown.",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko cached historical BTC prices", "Local JSON cache: data/btc-daily-prices.json", "Insight Wealth DCA calculation model"],
      keyTakeaways: ["DCA reduces entry timing risk, not market risk.", "Investment amount must fit sustainable cash flow.", "Long-term investors should study drawdown before returns."],
      sections: [
        { heading: "What is Bitcoin DCA?", body: ["Bitcoin DCA, or dollar cost averaging, means buying BTC with a fixed amount on a fixed schedule. The goal is not to call the exact bottom. The goal is to make accumulation rule-based so emotions have less control over the process. For long-term investors, the real challenge is not finding the perfect day to buy, but staying disciplined through volatility, fear and bull-market temptation.", "DCA works best for investors with stable cash flow, a multi-year time horizon and a realistic tolerance for volatility. It does not guarantee profit. A serious DCA plan should define contribution amount, maximum cash-flow exposure, review rules, rebalancing rules and possible DCA-out rules." ] },
        { heading: "How to read the result", body: ["Total invested is your actual capital committed. BTC accumulated is the amount of Bitcoin acquired. Current value estimates portfolio value using the latest available price. ROI and annualized return describe historical outcomes only. Maximum drawdown is often the most important number because it tests whether the plan could survive real pressure.", "If a backtest shows attractive returns but also a deep drawdown, the investor should ask whether they could continue the plan during a 50% or 70% decline. If not, the contribution amount is probably too large." ] },
        { heading: "When should DCA change?", body: ["When Fear & Greed is in extreme fear, ETF outflows are easing, and valuation metrics such as MVRV and NUPL are not overheated, a long-term investor may consider slightly increasing DCA. When greed is extreme, leverage is crowded, ETF demand weakens or personal allocation becomes too concentrated, reducing contributions or planning DCA-out can be more rational." ] }
      ],
      faq: [
        { q: "Does Bitcoin DCA guarantee profit?", a: "No. DCA can reduce entry timing risk, but it cannot remove Bitcoin price risk, bear-market risk or personal cash-flow risk." },
        { q: "Is weekly or monthly DCA better?", a: "Shorter intervals smooth entry price more, while monthly DCA is easier to maintain. Sustainability matters more than frequency." },
        { q: "Does this calculator call CoinGecko for every user?", a: "No. User calculations read local cached historical price data to avoid API limits and improve speed." }
      ]
    }
  },
  {
    slug: "btc-bull-bear-indicator",
    legacyHref: "/bull-bear-probability",
    zh: {
      title: "BTC Bull Bear Indicator - 比特幣牛熊指標與市場概率",
      description: "免費Bitcoin bull bear indicator，結合BTC價格、Fear & Greed、ETF Flow、MVRV、NUPL與Funding Rate判斷市場偏多或偏空。",
      h1: "BTC Bull Bear Indicator 比特幣牛熊指標",
      summary: "本頁把多個市場訊號整理成0到100分的牛熊框架，幫助長期投資者判斷今天應該提高警覺、維持DCA，還是降低追高衝動。",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko / Binance BTC price", "Alternative.me Fear & Greed", "Manual ETF flow JSON", "BGeometrics / manual on-chain indicators"],
      keyTakeaways: ["高分不是追高理由。", "低分不等於必須恐慌賣出。", "牛熊指標最適合搭配DCA與倉位管理。"],
      sections: [
        { heading: "牛熊指標看什麼？", body: ["牛熊指標不是單一訊號，而是多個維度的組合。價格趨勢回答短期動能，Fear & Greed回答情緒位置，ETF Flow回答機構資金需求，MVRV與NUPL回答週期估值，Funding Rate回答合約市場是否擁擠。", "當多數指標同時偏多，市場環境較有利；當價格上升但ETF轉弱、情緒過熱、Funding過高，就代表追高風險增加。"] },
        { heading: "如何使用分數？", body: ["65分以上代表市場偏多，但不是all-in訊號。45分以下代表風險偏高或市場疲弱，但也可能是長期DCA更有吸引力的區域。45到65分之間則應視為中性區，重點是遵守既有計畫。", "分數的真正價值，是讓你避免把單日新聞放大成投資結論。它把不同資料放在同一張表，迫使你看到市場的複雜性。"] },
        { heading: "常見錯誤", body: ["第一個錯誤是把牛熊指標當交易信號。第二個錯誤是只看總分，不看分數來源。第三個錯誤是在高分時提高槓桿，在低分時停止所有DCA。更成熟的做法，是用分數調整節奏，而不是取代策略。"] }
      ],
      faq: [
        { q: "Bull Score越高越好嗎？", a: "不一定。高分表示多個指標偏多，但也可能意味市場開始擁擠，仍需控制追高風險。" },
        { q: "牛熊指標多久更新？", a: "可用API資料會自動更新；ETF與部分鏈上資料依每日JSON或人工確認更新。" },
        { q: "這是投資建議嗎？", a: "不是。它是教育用途的風險框架。" }
      ]
    },
    en: {
      title: "Bitcoin Bull Bear Indicator - BTC Market Probability Score",
      description: "Free Bitcoin bull bear indicator combining BTC price, Fear & Greed, ETF flow, MVRV, NUPL and funding rate into a transparent market score.",
      h1: "Bitcoin Bull Bear Indicator",
      summary: "This page turns multiple market signals into a 0-100 bull/bear framework so long-term investors can judge whether to stay disciplined, reduce risk or avoid chasing price.",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko / Binance BTC price", "Alternative.me Fear & Greed", "Manual ETF flow JSON", "BGeometrics / manual on-chain indicators"],
      keyTakeaways: ["A high score is not a reason to chase.", "A low score is not automatically a panic-sell signal.", "The indicator works best with DCA and position sizing."],
      sections: [
        { heading: "What does the indicator measure?", body: ["A bull/bear indicator should not be a single signal. Price trend measures momentum, Fear & Greed measures sentiment, ETF flow measures institutional demand, MVRV and NUPL measure cycle valuation, and funding rate measures whether derivatives positioning is crowded.", "When most indicators lean constructive, the environment is healthier. When price rises while ETF demand weakens, sentiment overheats and funding becomes expensive, chasing risk rises." ] },
        { heading: "How to use the score", body: ["A score above 65 suggests a constructive market, but it is not an all-in signal. A score below 45 suggests elevated risk or weak conditions, but it may also create better DCA zones for long-term investors. Between 45 and 65, the best action is often to follow the existing plan.", "The score is useful because it prevents investors from turning one headline into a full market thesis. It forces price, sentiment, flows and valuation into the same view." ] },
        { heading: "Common mistakes", body: ["The first mistake is treating the indicator as a trading signal. The second is reading only the total score and ignoring the components. The third is increasing leverage when the score is high and stopping all DCA when the score is low. A better use is to adjust pace, not replace strategy." ] }
      ],
      faq: [
        { q: "Is a higher Bull Score always better?", a: "No. A high score means several indicators are constructive, but it can also coincide with crowding and chasing risk." },
        { q: "How often does it update?", a: "API-based data updates automatically; ETF and some on-chain data update through daily JSON or manual verification." },
        { q: "Is this financial advice?", a: "No. It is an educational risk framework." }
      ]
    }
  },
  {
    slug: "bitcoin-fear-greed-index",
    zh: {
      title: "Bitcoin Fear and Greed Index - 加密恐懼貪婪指數解讀",
      description: "查看Bitcoin Fear and Greed Index如何衡量市場情緒，理解極端恐懼、極端貪婪與BTC DCA策略的關係。",
      h1: "Bitcoin Fear and Greed Index 恐懼貪婪指數",
      summary: "Fear & Greed用一個數字描述加密市場情緒，但它不應單獨決定買賣。本頁說明如何把情緒指標放入BTC長期投資框架。",
      lastUpdated: "2026-07-09",
      dataSources: ["Alternative.me Fear & Greed API", "Insight Wealth market dashboard cache"],
      keyTakeaways: ["極端恐懼常代表壓力，也可能帶來分批機會。", "極端貪婪常提高追高風險。", "情緒指標必須搭配價格、ETF與鏈上資料。"],
      sections: [
        { heading: "Fear & Greed是什麼？", body: ["Fear & Greed Index把市場情緒壓縮成0到100分。低分代表恐懼，高分代表貪婪。它的價值不是預測明天價格，而是提醒投資者目前市場是否被恐慌或興奮主導。", "在極端恐懼時，很多投資者會停止原本的DCA；在極端貪婪時，又容易追高。情緒指標的用途，就是讓你看見這種心理偏差。"] },
        { heading: "如何結合DCA？", body: ["長期投資者可以把Fear & Greed當成節奏調整器，而不是買賣開關。例如在恐懼區維持或小幅提高DCA，在貪婪區停止追加或檢查倉位。但前提是價格、ETF資金流與鏈上估值沒有出現明顯相反訊號。"] },
        { heading: "限制", body: ["恐懼可以更恐懼，貪婪也可以更貪婪。單靠情緒指標，很容易太早買入或太早賣出。因此本站會把Fear & Greed放在儀表盤中，和BTC Price、ETF Flow、Bull Score一起閱讀。"] }
      ],
      faq: [
        { q: "Fear & Greed低於25代表應該買嗎？", a: "不一定。它代表市場恐懼，但仍需搭配趨勢、資金流與風險承受能力。" },
        { q: "指數多久更新？", a: "Alternative.me通常每日更新，本站會使用快取避免API壓力。" },
        { q: "高於75代表牛市嗎？", a: "不一定。高貪婪可能是強勢，也可能是短期過熱。" }
      ]
    },
    en: {
      title: "Bitcoin Fear and Greed Index - Crypto Sentiment Tool",
      description: "Learn how the Bitcoin Fear and Greed Index measures crypto sentiment and how extreme fear or greed can affect BTC DCA decisions.",
      h1: "Bitcoin Fear and Greed Index",
      summary: "Fear & Greed compresses crypto sentiment into one number, but it should not decide trades alone. This page explains how to use sentiment inside a long-term BTC framework.",
      lastUpdated: "2026-07-09",
      dataSources: ["Alternative.me Fear & Greed API", "Insight Wealth market dashboard cache"],
      keyTakeaways: ["Extreme fear can signal stress and possible staged opportunity.", "Extreme greed can increase chasing risk.", "Sentiment must be checked against price, ETF flow and on-chain data."],
      sections: [
        { heading: "What is Fear & Greed?", body: ["The Fear & Greed Index compresses market sentiment into a 0-100 score. Low values represent fear and high values represent greed. Its value is not in predicting tomorrow's price, but in showing whether the market is dominated by panic or excitement.", "During extreme fear, many investors stop their DCA plans. During extreme greed, they often chase price. Sentiment data helps reveal those psychological biases." ] },
        { heading: "How to combine it with DCA", body: ["Long-term investors can use Fear & Greed as a pace adjuster, not a buy/sell switch. In fear zones, they may maintain or slightly increase DCA. In greed zones, they may stop extra buying or review position size. Price, ETF flow and valuation should still confirm the context." ] },
        { heading: "Limitations", body: ["Fear can become more fearful, and greed can become more greedy. Used alone, the index can make investors buy too early or sell too early. That is why Insight Wealth displays it alongside BTC price, ETF flow and Bull Score." ] }
      ],
      faq: [
        { q: "Does a score below 25 mean buy?", a: "No. It means the market is fearful, but trend, flows and personal risk tolerance still matter." },
        { q: "How often does it update?", a: "Alternative.me usually updates daily, and this site uses caching to avoid API pressure." },
        { q: "Does a score above 75 mean bull market?", a: "Not necessarily. High greed can reflect strength or short-term overheating." }
      ]
    }
  },
  {
    slug: "bitcoin-mvrv",
    zh: {
      title: "Bitcoin MVRV - BTC鏈上估值指標教學",
      description: "了解Bitcoin MVRV如何比較市值與實現市值，判斷BTC週期估值溫度、低估區與過熱風險。",
      h1: "Bitcoin MVRV 指標",
      summary: "MVRV用市值除以實現市值，幫助投資者理解BTC相對持有人成本的週期位置。",
      lastUpdated: "2026-07-09",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Coin Metrics concept reference", "Local on-chain JSON cache"],
      keyTakeaways: ["MVRV是週期估值工具，不是短線交易訊號。", "過高可能代表獲利壓力，過低可能代表壓力區。", "資料若超過7天應視為stale data。"],
      sections: [
        { heading: "MVRV是什麼？", body: ["MVRV代表Market Value to Realized Value。Market Value是BTC市值，Realized Value則試圖用每枚BTC最後移動時的價格估算整體成本基礎。兩者相除後，可以觀察市場價格相對持有人成本的位置。", "當MVRV很高，代表市場價格遠高於實現成本，持有人獲利較多，潛在賣壓可能升高。當MVRV較低，代表市場接近或低於許多人的成本區，長期估值可能更有吸引力。"] },
        { heading: "如何用在長期投資？", body: ["MVRV適合看週期，不適合看日內交易。長期投資者可以把它當成估值溫度計：高溫時降低追高，低溫時檢查是否適合維持或提高DCA。但即使MVRV偏低，市場仍可能繼續下跌，因此倉位與現金流仍是核心。"] },
        { heading: "資料限制", body: ["MVRV需要可靠的realized cap資料。免費來源不一定即時或穩定，因此本站若無法自動取得可靠資料，會使用人工確認JSON並顯示來源與日期。超過7天的資料會被視為過期，不應當作最新判斷。"] }
      ],
      faq: [
        { q: "MVRV越低越好嗎？", a: "通常估值壓力較低，但不能保證價格立即上漲。" },
        { q: "MVRV適合短線交易嗎？", a: "不適合。它更適合週期與估值背景。" },
        { q: "本站MVRV是即時嗎？", a: "不是。若無可靠免費API，會標示為每日或人工確認資料。" }
      ]
    },
    en: {
      title: "Bitcoin MVRV - BTC On-chain Valuation Indicator",
      description: "Learn how Bitcoin MVRV compares market value with realized value to evaluate BTC cycle valuation, undervaluation and overheating risk.",
      h1: "Bitcoin MVRV",
      summary: "MVRV divides market value by realized value to show where BTC trades relative to the network's estimated cost basis.",
      lastUpdated: "2026-07-09",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Coin Metrics concept reference", "Local on-chain JSON cache"],
      keyTakeaways: ["MVRV is a cycle valuation tool, not a short-term signal.", "High MVRV can imply profit-taking risk; low MVRV can imply stress.", "Data older than seven days should be treated as stale."],
      sections: [
        { heading: "What is MVRV?", body: ["MVRV means Market Value to Realized Value. Market value is Bitcoin's market capitalization. Realized value estimates the network's cost basis using the price at which each coin last moved. The ratio helps investors judge where price sits relative to holder cost basis.", "When MVRV is high, BTC trades far above realized value, holders are more profitable and potential selling pressure can increase. When MVRV is low, price is closer to cost basis and long-term valuation may be more attractive." ] },
        { heading: "How long-term investors use it", body: ["MVRV is a cycle tool, not an intraday trading tool. Long-term investors can use it as a valuation thermometer: avoid chasing when it is hot, and review DCA discipline when it is cool. Even low MVRV does not prevent further downside, so cash flow and position sizing remain central." ] },
        { heading: "Data limitations", body: ["MVRV requires reliable realized cap data. Free sources are not always live or stable. If this site cannot fetch a reliable free source, it uses manually verified JSON and displays source and date. Data older than seven days is treated as stale." ] }
      ],
      faq: [
        { q: "Is lower MVRV always better?", a: "It often means lower valuation pressure, but it does not guarantee immediate upside." },
        { q: "Is MVRV useful for short-term trading?", a: "No. It is better for cycle context and valuation background." },
        { q: "Is the site's MVRV real time?", a: "No. It is labelled as daily or manually verified when no reliable free API is available." }
      ]
    }
  },
  {
    slug: "bitcoin-etf-flow",
    legacyHref: "/crypto-etf-flow",
    zh: {
      title: "Bitcoin ETF Flow - 比特幣ETF資金流追蹤",
      description: "追蹤Bitcoin ETF flow，包括IBIT、FBTC、ARKB、BITB、GBTC與總淨流入，理解機構資金對BTC需求的影響。",
      h1: "Bitcoin ETF Flow 比特幣ETF資金流",
      summary: "ETF Flow是本輪BTC市場最重要的需求端指標之一。本頁說明如何解讀日淨流入、7日趨勢、30日趨勢與資金連續性。",
      lastUpdated: "2026-07-09",
      dataSources: ["Manual ETF flow JSON", "ETF issuers / Farside-style public tables", "Insight Wealth daily update workflow"],
      keyTakeaways: ["ETF淨流入代表機構需求改善。", "單日流入不如連續趨勢重要。", "GBTC流出與IBIT/FBTC流入要分開看。"],
      sections: [
        { heading: "ETF Flow為什麼重要？", body: ["Bitcoin現貨ETF把傳統金融資金與BTC市場連接起來。當ETF出現穩定淨流入，代表有新增資金透過受監管產品進入BTC；當淨流出擴大，代表需求轉弱或資金再平衡。", "ETF Flow不等於價格一定上漲，但它是需求端的重要背景。尤其在供給相對固定的BTC市場，持續流入會改變短期供需。"] },
        { heading: "如何解讀表格？", body: ["不要只看單日。更重要的是7日與30日累積、正負連續天數、不同發行商之間的分布。如果IBIT與FBTC持續流入，而GBTC流出下降，通常比單日小幅流入更有意義。", "如果價格上漲但ETF流入減弱，代表上漲可能缺少機構需求確認；如果價格下跌但ETF仍穩定流入，則需要觀察是否是短期拋壓與長期買盤的分歧。"] },
        { heading: "資料更新限制", body: ["ETF Flow通常不是秒級資料。本站使用手動JSON與公開表格整理，因此會標示Updated daily。這種資料適合日線與週線判斷，不適合用來做分鐘級交易。"] }
      ],
      faq: [
        { q: "ETF Flow是即時資料嗎？", a: "不是。本站清楚標示為每日更新，不把它當成即時交易資料。" },
        { q: "正流入一定利多嗎？", a: "通常偏利多，但仍需看價格、情緒與連續性。" },
        { q: "哪些ETF最重要？", a: "IBIT、FBTC、ARKB、BITB與GBTC是主要觀察對象。" }
      ]
    },
    en: {
      title: "Bitcoin ETF Flow - BTC ETF Inflow and Outflow Tracker",
      description: "Track Bitcoin ETF flow across IBIT, FBTC, ARKB, BITB, GBTC and total net flow to understand institutional BTC demand.",
      h1: "Bitcoin ETF Flow",
      summary: "ETF flow is one of the most important demand-side indicators in the current Bitcoin cycle. This page explains daily flow, 7-day trend, 30-day trend and streaks.",
      lastUpdated: "2026-07-09",
      dataSources: ["Manual ETF flow JSON", "ETF issuers / Farside-style public tables", "Insight Wealth daily update workflow"],
      keyTakeaways: ["Net inflow can indicate improving institutional demand.", "Trend matters more than one day.", "GBTC outflows should be separated from IBIT/FBTC inflows."],
      sections: [
        { heading: "Why ETF flow matters", body: ["Spot Bitcoin ETFs connect traditional capital with the BTC market. Stable net inflows mean new capital is entering Bitcoin through regulated products. Larger outflows can signal weaker demand or portfolio rebalancing.", "ETF flow does not guarantee price direction, but it is important demand-side context. In a market with relatively fixed BTC supply, persistent inflow can change short-term supply and demand." ] },
        { heading: "How to read the table", body: ["Do not focus only on one day. The 7-day and 30-day totals, positive or negative streaks and issuer distribution matter more. Continued IBIT and FBTC inflows with declining GBTC outflows usually carry more weight than a single small inflow day.", "If price rises while ETF inflow weakens, the move may lack institutional confirmation. If price falls while ETF inflow remains stable, short-term selling and long-term demand may be diverging." ] },
        { heading: "Data update limits", body: ["ETF flow is usually not second-by-second data. Insight Wealth uses manual JSON and public tables, labelled as updated daily. This data is suitable for daily and weekly context, not minute-level trading." ] }
      ],
      faq: [
        { q: "Is ETF flow real time?", a: "No. This site labels it as daily updated and does not present it as live trading data." },
        { q: "Is positive inflow always bullish?", a: "Usually it is constructive, but price, sentiment and persistence still matter." },
        { q: "Which ETFs matter most?", a: "IBIT, FBTC, ARKB, BITB and GBTC are the main funds to monitor." }
      ]
    }
  },
  {
    slug: "bitcoin-price-today",
    legacyHref: "/btc-dashboard",
    zh: {
      title: "Bitcoin Price Today - 今日BTC價格與市場儀表盤",
      description: "查看Bitcoin price today、BTC 24h變化、市值、Fear & Greed、ETF Flow、Bull Score與DCA Opinion。",
      h1: "Bitcoin Price Today 今日BTC價格",
      summary: "本頁把今日BTC價格放入更完整的市場背景，避免只看單一價格數字就做投資決策。",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko public API", "Binance public ticker fallback", "Insight Wealth server-side cache"],
      keyTakeaways: ["價格是溫度計，不是完整診斷。", "24h變化要搭配7日趨勢與資金流。", "DCA投資者應該避免被單日波動牽動。"],
      sections: [
        { heading: "今日BTC價格怎麼看？", body: ["Bitcoin price today通常是投資者最先看的數字，但它只是市場溫度計。真正重要的是價格變化背後的原因：ETF是否流入？市場情緒是否恐慌？合約槓桿是否擁擠？鏈上估值是否過熱？", "本站會優先顯示BTC Price、Fear & Greed、ETF Flow、Bull Score與DCA Opinion，讓長期投資者在五秒內知道今天市場最重要的資訊。"] },
        { heading: "24h與7d的差異", body: ["24h變化適合看短線壓力或反彈，7d變化更適合看一週動能。如果24h下跌但7d仍強，可能只是短期回調；如果24h與7d同時轉弱，就需要提高風險意識。", "價格本身不應單獨使用。當價格上漲但Fear & Greed極端貪婪、Funding過高，就要小心追高。當價格下跌但ETF仍流入、估值不高，就可能是長期投資者更應該保持紀律的時候。"] },
        { heading: "資料來源", body: ["BTC價格優先使用CoinGecko API，若CoinGecko不可用，回退到Binance公開ticker。結果會使用伺服器快取，以降低API限制並提升速度。如果資料暫時不可用，網站會顯示不可用，而不是使用假價格。"] }
      ],
      faq: [
        { q: "BTC價格多久更新？", a: "伺服器端快取通常約1到5分鐘更新，視API與部署狀態而定。" },
        { q: "CoinGecko失敗怎麼辦？", a: "系統會嘗試Binance公開ticker作為備援。" },
        { q: "今日價格可以決定DCA嗎？", a: "不應單獨決定。DCA應看長期現金流、估值與風險承受能力。" }
      ]
    },
    en: {
      title: "Bitcoin Price Today - Live BTC Price and Market Dashboard",
      description: "Check Bitcoin price today, BTC 24h change, market cap, Fear & Greed, ETF flow, Bull Score and DCA opinion.",
      h1: "Bitcoin Price Today",
      summary: "This page puts today's BTC price into broader market context so investors do not make decisions from one number alone.",
      lastUpdated: "2026-07-09",
      dataSources: ["CoinGecko public API", "Binance public ticker fallback", "Insight Wealth server-side cache"],
      keyTakeaways: ["Price is a thermometer, not a full diagnosis.", "24h change should be checked against 7d trend and flows.", "DCA investors should avoid reacting to one-day volatility."],
      sections: [
        { heading: "How to read today's BTC price", body: ["Bitcoin price today is usually the first number investors check, but it is only a market thermometer. The real question is why price moved: are ETFs seeing inflows, is sentiment fearful, is leverage crowded, and is on-chain valuation overheated?", "Insight Wealth prioritizes BTC Price, Fear & Greed, ETF Flow, Bull Score and DCA Opinion so long-term investors can understand the market in seconds." ] },
        { heading: "24h versus 7d change", body: ["The 24h change is useful for short-term pressure or rebound. The 7d change is better for weekly momentum. If 24h is weak but 7d remains strong, it may be a short pullback. If both weaken, risk awareness should rise.", "Price should not be used alone. If price rises while Fear & Greed is extremely greedy and funding is high, chasing risk increases. If price falls while ETF inflow remains stable and valuation is not overheated, disciplined long-term investors may stay calm." ] },
        { heading: "Data sources", body: ["BTC price uses CoinGecko first. If CoinGecko is unavailable, the site falls back to Binance public ticker data. Results are cached server-side to reduce API pressure and improve speed. If data is unavailable, the site shows unavailable instead of fake prices." ] }
      ],
      faq: [
        { q: "How often does BTC price update?", a: "Server-side cache usually updates around every 1-5 minutes depending on API and deployment status." },
        { q: "What happens if CoinGecko fails?", a: "The system attempts Binance public ticker as fallback." },
        { q: "Should today's price decide my DCA?", a: "No. DCA should consider long-term cash flow, valuation and risk tolerance." }
      ]
    }
  }
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "2026-07-09-sol-gpt56-microstrategy-selloff",
    date: "2026-07-09",
    videoUrl: "https://www.youtube.com/embed/S4LBtsh6yt0",
    zh: {
      title: "GPT-5.6、Strategy BTC框架與FOMC後市場反應",
      description: "洞見財富每日影片文章：解析GPT-5.6與Sol/Terra/Luna話題、Strategy 12.5B BTC框架、FOMC會議紀要與BTC風險管理。",
      h1: "GPT-5.6、MicroStrategy賣壓疑慮與FOMC後BTC市場反應",
      summary: "本篇整理2026-07-09洞見財富每日影片重點。影片討論AI與加密敘事、Strategy/MicroStrategy的BTC資本管理框架、FOMC會議紀要後的市場情緒，以及長期BTC投資者如何避免被單日新聞牽著走。",
      keyPoints: ["GPT-5.6與Sol/Terra/Luna相關話題應謹慎看待，不應放大成無來源的內部評分或確定性敘事。", "Strategy的12.5B BTC相關框架更適合理解為資本管理能力與授權空間，不應直接解讀為立即拋售。", "FOMC會議紀要後，市場重點在利率路徑、通膨語氣與風險資產流動性。", "MVRV約1.20到1.22附近屬於估值背景資料，不是短線買賣指令。", "長期BTC投資者應維持DCA紀律，避免因標題情緒追漲殺跌。"],
      marketImpact: "市場影響偏向情緒與流動性層面。AI敘事能提升風險偏好，但若缺少可驗證數據，容易變成短線炒作。FOMC語氣則會影響美元、利率預期與加密資產估值。",
      btcImpact: "BTC的核心仍是ETF需求、宏觀流動性與鏈上估值。Strategy相關新聞容易引發賣壓猜測，但必須區分資本授權與實際拋售。",
      ethImpact: "ETH受整體風險偏好影響，但本集重點不是以太坊基本面。若AI與風險資產情緒改善，ETH可能間接受益；若宏觀壓力升高，ETH波動可能更大。",
      riskWarning: "本內容僅供教育用途，不是財務建議。AI敘事、公司BTC持倉與FOMC新聞都可能被市場過度解讀，投資者應自行查證來源並控制倉位。",
      dcaOpinion: "今日更適合維持既有DCA節奏，而不是因單一新聞追高或恐慌賣出。若價格快速上漲，追加資金應拆分；若波動加大，先檢查現金流與最大可承受回撤。",
      faq: [
        { q: "Strategy 12.5B框架代表馬上賣BTC嗎？", a: "不應這樣解讀。它更接近資本管理能力或授權空間，是否實際交易需要看後續披露。" },
        { q: "GPT-5.6話題對加密市場一定利多嗎？", a: "不一定。AI敘事能帶動風險偏好，但未驗證資訊不能當作投資依據。" },
        { q: "今天適合all-in BTC嗎？", a: "不適合。本站一直強調DCA、風險管理與長期紀律。" }
      ]
    },
    en: {
      title: "GPT-5.6, Strategy BTC Framework and Post-FOMC Market Reaction",
      description: "Insight Wealth daily video article covering GPT-5.6/Sol narratives, Strategy's BTC framework, FOMC minutes and BTC risk management.",
      h1: "GPT-5.6, MicroStrategy Selloff Concerns and Post-FOMC BTC Market Reaction",
      summary: "This article summarizes the 2026-07-09 Insight Wealth daily video. It covers AI and crypto narratives, Strategy/MicroStrategy's BTC capital management framework, market reaction after FOMC minutes and how long-term BTC investors can avoid headline-driven decisions.",
      keyPoints: ["GPT-5.6 and Sol/Terra/Luna-related narratives should be treated carefully and not inflated into unsupported internal-score claims.", "Strategy's 12.5B BTC-related framework is better understood as capital management capacity, not immediate forced selling.", "After FOMC minutes, markets focus on rate path, inflation language and risk-asset liquidity.", "MVRV around the 1.20-1.22 area is valuation context, not a short-term trade command.", "Long-term BTC investors should maintain DCA discipline and avoid chasing headlines."],
      marketImpact: "The market impact is mainly sentiment and liquidity related. AI narratives can lift risk appetite, but without verifiable data they can become short-term speculation. FOMC language affects dollar strength, rate expectations and crypto valuation.",
      btcImpact: "For BTC, the core drivers remain ETF demand, macro liquidity and on-chain valuation. Strategy-related news can trigger selloff concerns, but investors must separate capital authorization from actual selling.",
      ethImpact: "ETH is affected by overall risk appetite, but this episode is not primarily about Ethereum fundamentals. If AI and risk sentiment improve, ETH may benefit indirectly; if macro pressure rises, ETH volatility can increase.",
      riskWarning: "This content is educational only and is not financial advice. AI narratives, corporate BTC holdings and FOMC news can all be overinterpreted. Investors should verify sources and control position size.",
      dcaOpinion: "Today favors maintaining the existing DCA plan instead of chasing or panic selling because of one headline. If price rises quickly, split additional capital into stages. If volatility increases, check cash flow and maximum tolerable drawdown first.",
      faq: [
        { q: "Does Strategy's 12.5B framework mean immediate BTC selling?", a: "No. It is better read as capital management capacity or authorization space. Actual transactions require later disclosure." },
        { q: "Is the GPT-5.6 narrative automatically bullish for crypto?", a: "No. AI narratives can support risk appetite, but unverified information should not be used as an investment basis." },
        { q: "Is today an all-in BTC setup?", a: "No. Insight Wealth emphasizes DCA, risk management and long-term discipline." }
      ]
    }
  }
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function expandedBody(copy: SeoCopy, locale: Locale) {
  const shared = locale === "zh" ? zhShared : enShared;
  const deepSections = locale === "zh" ? zhDeepSections : enDeepSections;
  return [
    ...copy.sections,
    { heading: locale === "zh" ? "如何把本頁放進每日流程？" : "How this page fits a daily workflow", body: shared },
    ...deepSections
  ];
}
