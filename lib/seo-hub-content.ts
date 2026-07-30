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
  },
  {
    slug: "bitcoin-nupl",
    zh: {
      title: "Bitcoin NUPL - BTC未實現盈虧鏈上指標教學",
      description: "了解Bitcoin NUPL如何衡量BTC網路未實現盈虧，判斷市場恐慌、信心、樂觀與過熱階段。",
      h1: "Bitcoin NUPL 指標",
      summary: "NUPL用未實現利潤與虧損觀察BTC持有人整體盈虧狀態，適合長期投資者理解市場週期溫度，而不是用來做短線買賣。",
      lastUpdated: "2026-07-30",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Coin Metrics realized cap concept", "Local on-chain JSON cache: data/onchain-indicators.json"],
      keyTakeaways: ["NUPL偏高通常代表市場獲利較多，追高風險上升。", "NUPL偏低可能代表市場壓力或投資者投降，但不保證見底。", "NUPL必須搭配MVRV、ETF Flow、Fear & Greed與DCA計畫閱讀。"],
      sections: [
        { heading: "NUPL是什麼？", body: ["NUPL代表Net Unrealized Profit/Loss，中文可以理解為淨未實現盈虧。它試圖衡量整個Bitcoin網路中，持有人目前帳面上是處於獲利還是虧損狀態。當市值高於實現市值越多，NUPL通常越高；當市場價格接近或低於許多持有人的成本區，NUPL就會下降。", "NUPL不是用來回答明天BTC會漲還是跌，而是回答市場整體心理位置。高NUPL常出現在牛市後段或快速上漲後，因為大量持有人處於獲利狀態，潛在獲利了結壓力較高。低NUPL常出現在熊市壓力期，投資者信心較弱，但長期估值可能開始變得更值得研究。"] },
        { heading: "如何解讀NUPL區間？", body: ["傳統鏈上分析常把NUPL分成恐慌、希望、樂觀、信念與狂熱等階段。這些名稱有助於理解市場心理，但不應被當成機械交易規則。不同週期、宏觀利率環境、ETF資金流與市場結構都可能改變NUPL的有效區間。", "對長期BTC投資者來說，NUPL最有用的方式是觀察方向與極端值。如果NUPL快速上升，同時Fear & Greed進入極端貪婪、Funding Rate偏高，就要避免因短期上漲而追高。如果NUPL低迷但ETF流出開始減弱，DCA投資者可以檢查自己的現金流與分批投入規則。"] },
        { heading: "NUPL與DCA的關係", body: ["DCA策略的目標是讓投資者在不同市場環境中持續累積，而不是依靠一次判斷押注頂底。NUPL可以幫助投資者調整DCA節奏：當市場獲利過熱時，維持基礎定投或降低追加；當市場壓力較大但基本資料沒有惡化時，維持定投紀律可能比恐慌賣出更合理。", "真正重要的是不要把NUPL單獨使用。若NUPL偏低但價格仍跌破重要趨勢、ETF持續流出、宏觀流動性收緊，就應該承認市場仍有風險。若NUPL偏高但ETF需求強勁、價格趨勢穩定，也不代表市場一定立刻反轉。"] },
        { heading: "資料更新與限制", body: ["NUPL需要可靠的實現市值或相關鏈上模型。免費資料來源不一定穩定，因此Insight Wealth會以每日或人工確認方式更新，並在卡片上顯示Last updated、Source與資料狀態。如果資料超過7天，應視為Stale data。", "本站不會把過期資料包裝成即時數字。若來源暫時不可用，頁面應顯示Coming Soon或Data temporarily unavailable。這樣做雖然保守，但比用假數字提高頁面完整度更符合投資者利益與AdSense內容品質。"] }
      ],
      faq: [
        { q: "NUPL越高代表越看多嗎？", a: "不一定。NUPL高代表市場帳面獲利較多，可能是強勢，也可能代表獲利了結風險升高。" },
        { q: "NUPL低於0是否代表必然見底？", a: "不是。低NUPL代表壓力較大或許多持有人虧損，但市場仍可能繼續下跌。" },
        { q: "本站NUPL是即時資料嗎？", a: "不是。若無可靠免費即時API，本站會使用每日或人工確認資料並標示來源與日期。" }
      ]
    },
    en: {
      title: "Bitcoin NUPL - BTC Net Unrealized Profit/Loss Explained",
      description: "Learn how Bitcoin NUPL measures unrealized profit and loss across BTC holders and how it helps long-term investors read cycle risk.",
      h1: "Bitcoin NUPL",
      summary: "NUPL measures the unrealized profit and loss position of the Bitcoin network. It is useful for cycle context and investor psychology, not short-term trade calls.",
      lastUpdated: "2026-07-30",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Coin Metrics realized cap concept", "Local on-chain JSON cache: data/onchain-indicators.json"],
      keyTakeaways: ["High NUPL often means more holders are in profit and chasing risk can rise.", "Low NUPL can indicate stress or capitulation, but it does not guarantee a bottom.", "NUPL should be read with MVRV, ETF flow, Fear & Greed and a DCA plan."],
      sections: [
        { heading: "What is NUPL?", body: ["NUPL stands for Net Unrealized Profit/Loss. It attempts to measure whether the Bitcoin network, in aggregate, is sitting on unrealized profit or unrealized loss. When market value is far above realized value, NUPL tends to rise. When price is close to or below many holders' cost basis, NUPL falls.", "NUPL is not designed to predict tomorrow's BTC price. It is better understood as a map of investor psychology. High NUPL often appears after strong rallies or in later bull-market conditions, when many holders have profit and potential selling pressure can increase. Low NUPL often appears during bear-market stress, when confidence is weak but long-term valuation may become more interesting." ] },
        { heading: "How to interpret NUPL zones", body: ["On-chain analysts often describe NUPL zones as capitulation, hope, optimism, belief and euphoria. These labels are useful for psychology, but they should not become mechanical trading rules. Different cycles, interest-rate regimes, ETF flows and market structure can change how each zone behaves.", "For long-term BTC investors, the most practical use is to watch direction and extremes. If NUPL rises quickly while Fear & Greed is extremely greedy and funding is high, chasing risk increases. If NUPL is depressed while ETF outflows are slowing, DCA investors can review cash flow and staged contribution rules." ] },
        { heading: "How NUPL connects with DCA", body: ["The purpose of DCA is to keep accumulation rule-based across different market environments. NUPL can help adjust pace: when unrealized profits are overheated, maintain base DCA or reduce extra buying; when market stress is high but core data has not deteriorated, maintaining discipline can be more rational than panic selling.", "NUPL should never be used alone. If NUPL is low but price trend is weak, ETF outflows continue and liquidity tightens, risk remains. If NUPL is high but ETF demand is strong and price structure remains healthy, it does not guarantee an immediate reversal." ] },
        { heading: "Data updates and limitations", body: ["NUPL requires reliable realized value or related on-chain models. Free sources are not always stable, so Insight Wealth updates it daily or manually verifies it and displays last updated date, source and status on each card. Data older than seven days should be treated as stale.", "The site does not present stale values as live data. If a source is unavailable, the page should show Coming Soon or Data temporarily unavailable. That is more conservative, but it is better for investors and stronger for publisher quality than filling the page with fake numbers." ] }
      ],
      faq: [
        { q: "Is higher NUPL always bullish?", a: "No. High NUPL means more unrealized profit. It can reflect strength, but it can also raise profit-taking risk." },
        { q: "Does NUPL below zero guarantee a bottom?", a: "No. It shows stress or broad unrealized loss, but the market can continue falling." },
        { q: "Is Insight Wealth NUPL real time?", a: "No. Without a reliable free real-time API, it is daily or manually verified data with source and date labels." }
      ]
    }
  },
  {
    slug: "bitcoin-puell-multiple",
    zh: {
      title: "Bitcoin Puell Multiple - BTC礦工收入週期指標",
      description: "了解Bitcoin Puell Multiple如何用礦工收入判斷BTC週期壓力、礦工賣壓、低估區與過熱區。",
      h1: "Bitcoin Puell Multiple 指標",
      summary: "Puell Multiple從礦工收入角度觀察Bitcoin週期，適合用來理解礦工壓力與市場過熱程度，但不應單獨作為買賣訊號。",
      lastUpdated: "2026-07-30",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Blockchain.com mining data reference", "Local on-chain JSON cache: data/onchain-indicators.json"],
      keyTakeaways: ["Puell偏低常代表礦工收入壓力較大。", "Puell偏高可能代表市場收入與價格週期過熱。", "減半後Puell解讀需要搭配哈希率、難度與價格趨勢。"],
      sections: [
        { heading: "Puell Multiple是什麼？", body: ["Puell Multiple比較Bitcoin礦工每日美元收入與其長期平均收入。礦工是BTC供給端的重要參與者，因為他們需要支付電力、設備與營運成本。當礦工收入低於長期平均，市場可能處於壓力區；當礦工收入遠高於平均，市場可能進入週期偏熱階段。", "這個指標的價值在於提供供給端視角。很多投資者只看價格與需求，但礦工收入、哈希率與難度會影響礦工行為。Puell Multiple讓長期投資者看到BTC生產者的經濟狀態。"] },
        { heading: "如何解讀礦工壓力？", body: ["當Puell Multiple偏低時，礦工收入可能承壓，弱勢礦工需要關機、出售BTC或尋求融資。歷史上，這類壓力區有時接近週期低位，但不是精準底部。價格可以在低Puell環境中持續盤整，宏觀流動性與市場信心仍然重要。", "當Puell Multiple偏高時，礦工收入相對歷史均值很強。這可能代表牛市動能，也可能代表市場進入較高風險區。若同時出現極端貪婪、高MVRV、高Funding與價格急漲，追高風險會明顯上升。"] },
        { heading: "減半後要小心什麼？", body: ["Bitcoin Halving會直接降低區塊補貼，因此Puell Multiple在減半前後的比較需要小心。單純把減半後收入下降解讀成礦工危機，可能忽略交易費、價格上升與礦工效率改善。相反，若減半後價格沒有跟上、難度仍高，礦工壓力可能逐步累積。", "因此本站會把Puell放在Advanced Analysis區，而不是首頁五個核心指標之一。對每日決策來說，BTC Price、Fear & Greed、ETF Flow、Bull Score與DCA Opinion更直接；Puell則提供週期背景。"] },
        { heading: "如何與DCA一起使用？", body: ["長期DCA投資者可以把低Puell視為值得研究的壓力環境，但仍要分批。當Puell偏低、Fear & Greed恐慌、MVRV不高且ETF流出減弱時，維持DCA紀律可能比停止投入更合理。當Puell偏高且多項風險指標同步過熱時，則應檢查倉位是否過大。", "Puell不會告訴你今天一定該買或賣。它的作用是提醒投資者BTC供給端的週期壓力，幫助你避免只用價格做判斷。"] }
      ],
      faq: [
        { q: "Puell Multiple低代表礦工投降嗎？", a: "可能代表礦工壓力升高，但需要搭配哈希率、難度、價格與鏈上流量確認。" },
        { q: "Puell高代表要賣BTC嗎？", a: "不一定。它可能代表市場強勢，也可能代表過熱，需要搭配其他指標。" },
        { q: "Puell適合每日交易嗎？", a: "不適合。它是週期與礦工收入背景指標。" }
      ]
    },
    en: {
      title: "Bitcoin Puell Multiple - BTC Miner Revenue Cycle Indicator",
      description: "Learn how the Bitcoin Puell Multiple uses miner revenue to evaluate BTC cycle pressure, miner stress, undervaluation and overheating risk.",
      h1: "Bitcoin Puell Multiple",
      summary: "Puell Multiple reads the Bitcoin cycle from the miner revenue side. It helps explain miner stress and overheating, but it should not be used alone as a buy or sell signal.",
      lastUpdated: "2026-07-30",
      dataSources: ["BGeometrics Bitcoin Data API / manual verification", "Blockchain.com mining data reference", "Local on-chain JSON cache: data/onchain-indicators.json"],
      keyTakeaways: ["Low Puell can indicate miner revenue stress.", "High Puell can suggest overheated cycle conditions.", "After halvings, Puell should be read with hash rate, difficulty and price trend."],
      sections: [
        { heading: "What is Puell Multiple?", body: ["Puell Multiple compares Bitcoin miners' daily USD revenue with its long-term average. Miners are important supply-side participants because they must pay for electricity, hardware and operations. When miner revenue is far below its long-term average, the market may be under stress. When revenue is far above average, the cycle may be hotter.", "The indicator is valuable because it gives investors a supply-side view. Many investors focus only on price and demand, but miner revenue, hash rate and difficulty can affect miner behavior. Puell Multiple shows the economic condition of Bitcoin producers." ] },
        { heading: "How to read miner stress", body: ["When Puell is low, miner revenue may be under pressure. Weaker miners may shut down, sell BTC or seek financing. Historically, these stress zones sometimes appear near cycle lows, but they are not precise bottoms. Price can remain weak while Puell is low, and macro liquidity still matters.", "When Puell is high, miner revenue is strong relative to history. That can reflect bull-market strength, but it can also indicate a higher-risk zone. If extreme greed, high MVRV, high funding and rapid price appreciation appear together, chasing risk increases." ] },
        { heading: "Why halvings matter", body: ["Bitcoin halvings directly reduce block subsidy, so Puell comparisons around halving periods require care. Reading lower post-halving revenue as an automatic miner crisis can ignore transaction fees, price appreciation and efficiency improvements. On the other hand, if price does not rise and difficulty stays high, miner pressure can build.", "That is why Insight Wealth treats Puell as advanced analysis rather than one of the five core daily indicators. BTC Price, Fear & Greed, ETF Flow, Bull Score and DCA Opinion are more direct for daily decisions. Puell provides cycle background." ] },
        { heading: "How to use it with DCA", body: ["Long-term DCA investors can treat low Puell as a stress environment worth studying, but still stage entries. If Puell is low, Fear & Greed is fearful, MVRV is not overheated and ETF outflows are easing, maintaining DCA discipline may be more rational than stopping. If Puell is high and several risk indicators are overheated, review position size.", "Puell does not tell you to buy or sell today. It reminds investors to consider Bitcoin's supply-side economics instead of judging the market from price alone." ] }
      ],
      faq: [
        { q: "Does low Puell mean miner capitulation?", a: "It can indicate higher miner stress, but hash rate, difficulty, price and flows should confirm the context." },
        { q: "Does high Puell mean sell BTC?", a: "No. It can reflect strength or overheating and must be checked with other indicators." },
        { q: "Is Puell useful for daily trading?", a: "No. It is better for cycle and miner revenue context." }
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
  },
  {
    slug: "2026-07-30-google-ai-russia-crypto-regulation",
    date: "2026-07-30",
    videoUrl: "https://www.youtube.com/embed/K-oTXl2nRQ0",
    zh: {
      title: "歐盟Google Android AI入口、俄羅斯加密法案與BTC投資者每日觀察",
      description: "洞見財富每日影片文章：整理歐盟要求Google開放Android AI入口、俄羅斯杜馬推進加密法案，以及BTC長期投資者今天應關注的風險與DCA觀點。",
      h1: "歐盟Google Android AI入口、俄羅斯加密法案與BTC市場觀察",
      summary: "本篇整理洞見財富2026-07-30每日影片重點。今天的主軸不是單一幣種喊單，而是AI入口競爭、歐盟平台監管、俄羅斯加密法案與BTC核心數據如何共同影響風險資產情緒。對長期BTC投資者來說，最重要的仍是價格、Fear & Greed、ETF Flow、Bull Score與DCA紀律。",
      keyPoints: [
        "歐盟要求Google開放Android AI入口，反映AI分發入口正在成為新一輪平台監管焦點。",
        "AI入口變化可能影響大型科技公司估值與市場風險偏好，但不等於加密市場會立即單邊上漲。",
        "俄羅斯杜馬推進加密相關法案，代表監管框架仍在全球不同地區快速演變。",
        "政策新聞需要區分方向、落地時間與實際資金流，不應只看標題就追漲殺跌。",
        "長期BTC投資者今天仍應優先檢查BTC價格、情緒、ETF流向、Bull Score與DCA計畫。"
      ],
      marketImpact: "今天的市場影響主要來自兩條線：第一是AI入口監管，可能影響科技股與風險資產估值；第二是加密法規演進，可能影響交易所、礦工、支付與機構參與預期。這些因素通常不會立即形成單一方向，但會改變市場對流動性、監管風險與長期採用的理解。",
      btcImpact: "BTC受到宏觀流動性、ETF需求與監管預期共同影響。若AI與科技股情緒改善，風險偏好可能支撐BTC；若監管新聞造成不確定性，短線波動可能增加。真正值得追蹤的是ETF Flow是否確認需求，以及Bull Score是否與價格方向一致。",
      ethImpact: "ETH同樣受風險偏好影響，但它對應用層、DeFi、AI代理與鏈上活動的敏感度更高。政策與平台入口競爭可能間接影響市場對Web3應用的想像，但仍需要鏈上數據與資金流確認。",
      riskWarning: "本內容僅供教育與資訊用途，不構成財務建議。政策、AI與加密新聞容易被市場短線放大，投資者應自行查證來源，避免因單日標題all-in、追高或恐慌賣出。",
      dcaOpinion: "今日DCA觀點是維持紀律、不要因新聞標題改變整個策略。若BTC價格短線反彈但ETF資金仍未確認，追加資金應拆分；若市場回落但核心指標沒有惡化，長期投資者可按原定節奏執行。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。",
      faq: [
        { q: "AI入口監管會直接推動BTC上漲嗎？", a: "不一定。它可能影響風險偏好與科技股情緒，但BTC仍需要ETF資金、流動性與市場結構確認。" },
        { q: "俄羅斯加密法案是否代表全球監管利多？", a: "不能簡化成利多或利空。不同國家的政策目的、限制與落地方式不同，應看具體條文與市場反應。" },
        { q: "今天適合改變DCA計畫嗎？", a: "除非你的現金流、風險承受能力或長期目標改變，單日新聞通常不應改寫DCA計畫。" }
      ]
    },
    en: {
      title: "EU Google Android AI Access, Russia Crypto Regulation and BTC Daily Investor View",
      description: "Insight Wealth daily video article covering EU pressure on Google Android AI access, Russia crypto legislation and the BTC data long-term investors should watch today.",
      h1: "EU Google Android AI Access, Russia Crypto Regulation and BTC Market View",
      summary: "This article summarizes the 2026-07-30 Insight Wealth daily video. The focus is not a coin call. It connects AI distribution, EU platform regulation, Russia's crypto legislation and core BTC market data into one daily decision framework for long-term investors.",
      keyPoints: [
        "EU pressure on Google to open Android AI access shows that AI distribution is becoming a major platform-regulation issue.",
        "AI access changes can affect large technology valuations and risk appetite, but they do not automatically make crypto bullish.",
        "Russia's crypto legislation shows that global regulation is still changing quickly across jurisdictions.",
        "Policy headlines should be separated from implementation timeline and actual capital flows.",
        "Long-term BTC investors should still prioritize BTC price, Fear & Greed, ETF flow, Bull Score and DCA discipline."
      ],
      marketImpact: "Today's market impact comes from two channels. First, AI access regulation can affect technology stocks and broader risk-asset valuation. Second, crypto regulation can change expectations for exchanges, miners, payments and institutional participation. These factors do not always create a single direction, but they change how investors think about liquidity, policy risk and adoption.",
      btcImpact: "BTC is influenced by macro liquidity, ETF demand and regulatory expectations. If AI and technology sentiment improves, risk appetite may support BTC. If regulatory headlines raise uncertainty, short-term volatility can increase. The most important checks remain ETF Flow and whether Bull Score confirms the price trend.",
      ethImpact: "ETH is also affected by risk appetite, but it is more sensitive to application-layer activity, DeFi, AI agents and on-chain usage. Policy and platform competition can influence the market's view of Web3 applications, but flows and on-chain data still need to confirm the narrative.",
      riskWarning: "This content is educational and informational only. It is not financial advice. Policy, AI and crypto headlines can be amplified by short-term markets. Investors should verify sources and avoid all-in behavior, chasing pumps or panic selling.",
      dcaOpinion: "Today's DCA view is to maintain discipline and avoid rewriting the whole plan because of one headline. If BTC rebounds before ETF demand confirms it, split additional capital into stages. If price falls while core indicators remain intact, long-term investors can follow the original schedule.",
      faq: [
        { q: "Does AI access regulation directly push BTC higher?", a: "No. It may affect risk appetite and technology sentiment, but BTC still needs ETF demand, liquidity and market structure confirmation." },
        { q: "Is Russia's crypto legislation automatically bullish?", a: "No. Country-level regulation depends on details, restrictions, implementation and market response." },
        { q: "Should one daily headline change a DCA plan?", a: "Usually no. Unless cash flow, risk tolerance or long-term goals change, a DCA plan should not be rewritten by one headline." }
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
