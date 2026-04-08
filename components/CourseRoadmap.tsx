
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, BookOpen, Calendar, Map, Target, CheckCircle2, Rocket, ArrowRight, Clock, FileText, Lightbulb, Waypoints, Calculator, Languages, FlaskConical, ChevronUp, ChevronsDown } from 'lucide-react';
import BrochureViewer from './BrochureViewer';
import Modal from './Modal';

interface ClassInfo {
  name: string;
  desc: string;
  age: string;
  time: string;
  objectives: string;
  target: string;
  features: string[];
  roadmap: string[];
  gradeHighlights?: Record<string, string[]>;
  gradeDescs?: Record<string, string>;
  gradeObjectives?: Record<string, string>;
  gradeTargets?: Record<string, string>;
  gradeFeatures?: Record<string, string[]>;
  gradeRoadmaps?: Record<string, string[]>;
}

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/02bku21xf9kcds9976086/250603_-PO-_-_AH_-A.jpg?rlkey=36lldwmj1t91wp5izhm806m96&raw=1",
  "https://www.dropbox.com/scl/fi/2cxysztok0xjwqflocxf3/250813_-_-PO-_AH_01.jpg?rlkey=we58ed84mufdgg08t1yjkjc4r&raw=1"
];

const CourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  
  // NEW STATE
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [modalMode, setModalMode] = useState<'schedule' | 'detail'>('schedule');
  const [selectedGrade, setSelectedGrade] = useState<string>('三年級');
  const [activeDetailTab, setActiveDetailTab] = useState<'main' | 'highlights' | 'features' | 'roadmap'>('main');

  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // NEW: Updated Course Data with Detail Fields
  const COURSE_DATA = [
    {
      id: 'english',
      label: '艾森樂美語',
      description: '語言是通往世界的鑰匙，艾森樂美語 (Essenjoy) 致力於為孩子打造最自然的全美語沉浸式學習環境。我們不只教單字與文法，更結合繪本閱讀、科學實驗與跨領域主題教學，激發孩子對語言的興趣與自信。透過外師引導與互動式情境模擬，讓孩子自然而然開口說英語，培養語感與國際視野，從小具備與世界接軌的競爭力。',
      icon: <Languages size={20} />,
      color: 'text-teal-500',
      classes: [
        { name: '劍橋英檢．KET養成班', desc: '針對劍橋英檢 KET 級數，強化聽說讀寫全方位實力', age: '小五 ~ 小六', time: '週三/六 晚上', objectives: '熟悉劍橋英檢 KET 考試題型，強化聽說讀寫綜合能力，順利取得國際認證。', target: '計畫報考 KET 英檢 or 希望檢視英語學習成效的學生。', features: ['仿真模考實戰演練', '口試技巧個別指導', '聽力解題策略分析', '閱讀寫作重點強化'], roadmap: ['檢定觀念建立', '分項能力強化', '模考衝刺與檢討'] },
        { name: '美語程度分班', desc: '依據入學測驗程度能力分班，適性教學成效最佳', age: '小一 ~ 小六', time: '平日/週六 晚上', objectives: '適性分級教學，讓每個孩子在最適合的難度下學習，循序漸進提升聽說讀寫能力。', target: '所有國小學齡兒童，需透過測驗分班。', features: ['全美語沉浸式教學環境', '主題式情境教學，學以致用', '定期成果發表，展現自信', '結合線上學習資源，延伸學習'], roadmap: ['L1-L2: 啟蒙與發音', 'L3-L4: 生活會話與閱讀', 'L5-L6: 寫作與進階表達'] },
        { name: '外師發音班', desc: '純正口音引導，掌握自然發音 (Phonics) 技巧', age: '小一 ~ 小三', time: '週一/四 晚上', objectives: '建立正確發音嘴型與聽音辨位能力，看到單字能讀，聽到單字能拼。', target: '初學美語 or 希望矯正發音的孩子。', features: ['專業外師親自授課', '趣味發音遊戲與歌謠', '矯正台式發音習慣', '建立拼讀自信心'], roadmap: ['Level A: 字母與短母音', 'Level B: 長母音與混合音', 'Level C: 特殊發音規則'] },
        { name: '英文閱讀班', desc: '精選分級繪本與讀本，培養閱讀理解力與語感', age: '小三 ~ 小五', time: '週二/五 晚上', objectives: '透過大量閱讀累積單字量，培養語感與閱讀理解策略，養成閱讀英文書籍的習慣。', target: '具備基礎拼讀能力，希望提升閱讀速度與廣度的學生。', features: ['精選國外分級讀本', '引導式閱讀討論', '閱讀理解策略教學', '讀後心得分享與寫作'], roadmap: ['繪本閱讀期', '橋樑書閱讀期', '章節小說閱讀期'] },
        { name: '口說美語班', desc: '全美語情境對話練習，鼓勵孩子大膽開口說英語', age: '小一 ~ 小六', time: '週三/六 晚上', objectives: '打破不敢開口的心理障礙，在模擬情境中自然運用英語溝通，提升口語流利度。', target: '害羞不敢開口或希望增加口語練習機會的學生。', features: ['角色扮演與情境模擬', '小組討論與發表', '生活實用對話練習', '即席演講訓練'], roadmap: ['日常問候與自我介紹', '生活情境應對', '議題討論與表達'] },
        { name: '外師寫作班', desc: '創意寫作引導，建立邏輯思維與正確文法架構', age: '小四 ~ 小六', time: '週六 上午', objectives: '從句子到段落，從段落到文章，循序漸進培養英文寫作能力與邏輯架構。', target: '已有一定單字量與文法基礎，希望提升寫作能力的學生。', features: ['心智圖構思與大綱擬定', '各種文體寫作指導', '個別化作文批改', '優美句型與修辭運用'], roadmap: ['句型練習期', '段落寫作期', '短文創作期'] },
      ]
    },
    {
      id: 'math',
      label: '小育豪資優數學',
      description: '數學是培養孩子「思考及解決問題能力」的最佳途徑。深耕板橋40年的育豪資優文教已孕育無數優秀學子，在小學數學中承襲國中<觀念導向>的方式教導，使學生能夠愉快並有系統的學習。從國小至國中、從基礎到資優等不同班別，皆由【育豪師資親授】使孩子適性養成，課程中引導不只單一的思考，藉由提問＞思考＞精準表達＞互動式教學，以明星私中、公校資優鑑定、明星高中等目標的同學，絕對不能錯過。',
      icon: <Calculator size={20} />,
      color: 'text-green-600',
      classes: [
        { 
          name: '進度數學班', 
          desc: '搭配學校進度，穩紮穩打建立數學觀念與運算基礎', 
          age: '小一 ~ 小六', 
          time: '週二五/三/六',
          objectives: '鞏固學校課堂所學，強化運算準確度，並建立正確的數學解題觀念，培養自信心。',
          target: '希望跟上學校進度、加強計算能力與基礎概念的學生。',
          features: [
            '對應學校版本，重點單元精準複習',
            '強調計算過程與驗算習慣的養成',
            '獨家圖解教學，將抽象概念具象化',
            '定期小考檢測，即時掌握學習成效'
          ],
          roadmap: ['低年級：數感啟蒙與運算', '中年級：邏輯思考與應用', '高年級：抽象概念與升學銜接']
        },
        { 
          name: '種子超前數學班', 
          desc: '啟發數學潛能，培養邏輯思考種子，為資優之路鋪路', 
          age: '小五', 
          time: '週六',
          objectives: '跳脫制式框架，透過操作與遊戲激發數學興趣，提早開發邏輯思維與空間概念。',
          target: '對數學有濃厚興趣、學習反應快，希望挑戰進階內容的低年級學生。',
          features: [
            '引入益智教具與桌遊，寓教於樂',
            '開放式問題引導，鼓勵多角度思考',
            '生活情境融入，發現身邊的數學',
            '小班制互動教學，高頻率師生對話'
          ],
          roadmap: ['G1：形狀與空間探索', 'G2：邏輯推理與數列', 'G3：資優數學前導課程']
        },
        { 
          name: '超前數學班', 
          desc: '前進私中及公校資優班，挑戰高階思維題型，訓練解題速度', 
          age: '小六', 
          time: '週六',
          objectives: '針對高年級課程進行加深加廣，訓練複雜問題的分析能力，為國中數理資優班做準備。',
          target: '校內成績優異，目標鎖定私中入學或資優鑑定的高年級學生。',
          features: [
            '前進私中及公校資優班 1-2 個單元',
            '資優試題與奧數題型專題解析',
            '強化應用問題的文字解構能力',
            '系統化筆記教學，建立知識架構'
          ],
          roadmap: ['G4：整數四則與幾何進階', 'G5：因倍數與分數應用', 'G6：國中代數與幾學銜接']
        },
      ]
    },
    {
      id: 'chinese',
      label: '國語文閱讀寫作',
      description: '在資訊爆炸的時代，閱讀素養與文字表達能力是孩子終身受用的核心競爭力。我們的國語文課程精選經典文學作品導讀，引導孩子深入思考與鑑賞，並運用心智圖法進行寫作構思，將抽象的思維轉化為有溫度的文字。從造句練習到篇章結構，循序漸進提升閱讀理解力與寫作表達力，讓孩子能自信地用文字與世界對話。',
      icon: <BookOpen size={20} />,
      color: 'text-orange-500',
      classes: [
        { 
          name: '閱讀素養班', 
          desc: '長文閱讀理解訓練，培養批判性思考與分析能力', 
          age: '小一~小二', 
          time: '週六 下午', 
          objectives: '提升長篇文章閱讀速度與理解力，培養擷取資訊、統統分析與批判思考的能力。', 
          target: '閱讀速度慢、抓不到重點 or 希望能深入解讀文本的學生。', 
          features: ['多元文本閱讀材料', '閱讀理解策略教學', 'PISA 題型實戰演練', '議題探討與思辨'], 
          roadmap: ['擷取訊息能力', '統整解釋能力', '省思評鑑能力'],
          gradeDescs: {
            '一年級': '專為小一新生設計，從基礎詞彙補充引導孩子建立文字敏感度。透過趣味繪本與看圖說故事訓練，將圖像資訊轉化為文字表達，並在互動中培養口語自信。這是開啟閱讀興趣、建立良好習慣的關鍵啟蒙期，讓孩子在輕鬆氛圍中奠定紮實語文基礎。',
            '二年級': '引進心智圖法作為思考工具，幫助孩子學習邏輯分類與內容延伸。重點在於強化文章結構概念，引導學生掌握段落串聯技巧，將生活細節轉化為結構完整的短文。透過系統化引導與優美詞句積累，孩子將不再畏懼下筆，自信運用文字記錄生活，展現邏輯思維。'
          },
          gradeObjectives: {
            '一年級': '建立基礎閱讀習慣，提升詞彙量，並能將簡單的圖像資訊轉化為文字表達。',
            '二年級': '強化文章結構概念，學習運用心智圖進行內容發想與段落串聯。'
          },
          gradeTargets: {
            '一年級': '剛升上小一，需要強化識字量與口語表達能力的學生。',
            '二年級': '已具備基本識字量，但在寫作時常感到不知如何下筆或內容零碎的學生。'
          },
          gradeFeatures: {
            '一年級': ['生活化詞彙補充', '看圖說故事訓練', '趣味繪本導讀', '口語表達遊戲'],
            '二年級': ['心智圖寫作法', '短文結構引導', '創意聯想練習', '優美詞句積累']
          },
          gradeRoadmaps: {
            '一年級': ['詞彙累積期', '句子組成期', '圖像轉文字期'],
            '二年級': ['心智圖發想期', '段落串聯期', '短文創作期']
          },
          gradeHighlights: {
            '一年級': [
              '基礎的詞彙補充與應用。',
              '能正確理解圖像，轉換成文字，並寫下造句，反之亦然。',
              '閱讀與口語表達。'
            ],
            '二年級': [
              '藉由心智圖，讓孩子學習分段與內容延伸的能力。',
              '能正確理解圖像，轉換成文字，並寫下短文，反之亦然。'
            ]
          }
        },
        { 
          name: '閱讀寫作班', 
          desc: '結合經典文學導讀與創意寫作，提升表達力與文采', 
          age: '小四~小六', 
          time: '週六 上午', 
          objectives: '培養閱讀興趣，激發寫作靈感，能流暢表達個人想法與情感。', 
          target: '對寫作感到困難 or 希望提升文采的學生。', 
          features: ['經典文學作品賞析', '感官摹寫與修辭練習', '創意引導與聯想訓練', '佳作觀摩與互評'], 
          roadmap: ['基礎語句練習', '段落結構鋪陳', '完整篇章創作'],
          gradeDescs: {
            '中年級': '以生活經驗為核心，結合創意想像引導孩子寫出情感真摯的文章。強化感官摹寫訓練，教導孩子運用多元角度觀察世界，讓文字更具感染力。透過經典文學導讀與創意故事接龍，激發創作靈感，讓寫作不再枯燥，而是一場充滿成就感的自我表達旅程，提升文字駕馭力。',
            '高年級': '針對升學需求，結合國學常識與進階修辭技巧，訓練批判性思考與邏輯論證能力。精選多元文本深度分析，掌握不同文體寫作策略，為國中會考與私中考試做好全方位準備。這不僅是技巧磨練，更是思維層次的提升，讓孩子面對複雜考題時能冷靜分析、精準表達。'
          },
          gradeObjectives: {
            '中年級': '培養觀察力與感受力，學習運用豐富的感官摹寫，將生活經驗轉化為動人的篇章。',
            '高年級': '深化文本分析能力，掌握多元寫作技巧，並建立紮實的國學常識基礎，應對進階考試需求。'
          },
          gradeTargets: {
            '中年級': '希望提升文章豐富度，學習如何將生活觀察融入寫作的小三、小四學生。',
            '高年級': '目標鎖定私中入學、資優鑑定或希望為國中會考打下深厚語文根基的小五、小六學生。'
          },
          gradeFeatures: {
            '中年級': ['生活觀察筆記', '感官摹寫訓練', '創意故事接龍', '情感書寫引導'],
            '高年級': ['修辭技巧進階', '國學常識專題', '思辨性議題寫作', '私中/會考題型解析']
          },
          gradeRoadmaps: {
            '中年級': ['觀察感受期', '段落鋪陳期', '情感抒發期'],
            '高年級': ['技巧深化期', '思辨表達期', '應試實戰期']
          },
          gradeHighlights: {
            '中年級': [
              '由生活經驗出發，寫出一篇段落分明、言辭恰當的文章。',
              '創造力與想像力'
            ],
            '高年級': [
              '藉由多元的寫作技巧，以及想法的練灶，為國中會考立下堅實的基礎。',
              '思辨力與表達力',
              '［私中預跑〕：私中考試一般來說會延伸至國中一年級的範圍，包括：基本修辭判讀、形音義（同音異字、一字多音、一字多義）、基本國學常識（天干地支、慣用語、季節風向、成語等）、閱讀素養（白話長文、唐詩、宋詞、元曲、世說新語、古文觀止等）。'
            ]
          }
        },
      ]
    },
    {
      id: 'science',
      label: '小小科學實驗家',
      description: '科學不只是課本上的知識，更是探索世界的工具。小小科學實驗家課程強調「動手做 (Hands-on)」的科學精神，帶領孩子走出書本，親手操作有趣的科學實驗。在觀察、假設、實驗、驗證的過程中，培養實事求是的科學態度與邏輯思維。我們鼓勵孩子勇於提問、主動探究，發現日常生活中的科學奧秘，激發對大自然的好奇心與創造力。',
      icon: <FlaskConical size={20} />,
      color: 'text-blue-500',
      classes: [
        { name: '小小科學家', desc: '生活科學實驗，激發好奇心', age: '小一 ~ 小三', time: '週六 下午', objectives: '透過趣味實驗引發科學興趣，培養觀察力與動手操作的能力。', target: '充滿好奇心，喜歡動手做的低年級學生。', features: ['安全有趣的科學實驗', '生活化科學原理介紹', '觀察記錄與分享', '培養科學探究精神'], roadmap: ['物理現象探索', '化學變化觀察', '生物與環境認識'] },
        { name: '科展培訓班', desc: '專題研究與實驗設計，培養探究精神', age: '小四 ~ 小六', time: '週日 下午', objectives: '學習完整的科學研究方法，從選題、實驗設計到數據分析，完成專題研究。', target: '對科學研究有濃厚興趣，有意參加科展的高年級學生。', features: ['專題研究方法指導', '實驗設計與變因控制', '數據分析與圖表製作', '報告撰寫與口頭發表'], roadmap: ['研究主題確立', '實驗執行與記錄', '成果發表與競賽'] },
      ]
    },
    {
      id: 'gifted',
      label: '公私立資優班升學',
      description: '針對目標鎖定明星私中入學考與公校資優鑑定的同學，我們 provide 最專業且系統化的培訓課程。憑藉多年豐富的輔導經驗，精準掌握各校命題趨勢與考試方向，針對國語文、英語、數學邏輯及自然科學進行全方位強化。透過高強度的模擬演練與個別化弱點分析，提升孩子的應試技巧與抗壓性，協助孩子自信面對挑戰，順利進入理想學府。',
      icon: <Rocket size={20} />,
      color: 'text-purple-500',
      classes: [
        { name: '超前數學班', desc: '針對資優鑑定需求，深化數學邏輯與難題解析', age: '小四 ~ 小六', time: '週三/五 晚上', objectives: '針對資優鑑定數學題型進行深度解析，強化邏輯推理與解題技巧。', target: '目標報考數理資優班或私中入學考的學生。', features: ['歷屆資優試題全解析', '邏輯推理與空間觀念', '難題破解策略教學', '模擬測驗實戰演練'], roadmap: ['基礎資優觀念', '進階題型挑戰', '考前密集衝刺'] },
        { name: '自然實驗班', desc: '實作科學實驗，強化自然科觀念與探究實力', age: '小三 ~ 小六', time: '週六 上午', objectives: '透過實驗操作加深自然科觀念，培養科學實作能力與應試實力。', target: '目標報考自然資優班 or 對科學實驗有興趣的學生。', features: ['配合資優鑑定實驗主題', '強調實驗操作與原理', '科學探究能力訓練', '自然科筆試重點複習'], roadmap: ['基礎實驗操作', '進階探究實驗', '術科實作模擬'] },
        { name: '公校黑馬營', desc: '針對公立數理資優班鑑定，全方位衝刺培訓', age: '小六', time: '寒暑假/考前 上午', objectives: '針對公立資優班鑑定考試進行密集訓練，全面提升數理能力。', target: '目標考取公立國中數理資優班的小六學生。', features: ['性向測驗模擬練習', '數理實作能力強化', '口試面試技巧指導', '考前重點總整理'], roadmap: ['初試性向測驗準備', '複試實作評量準備', '全真模擬演練'] },
        { name: '私中黑馬營', desc: '私中入學考全科衝刺，高強度模擬考實戰演練', age: '小六', time: '週六/日 上午', objectives: '針對私中入學考試科目進行全方位複習與衝刺，確保金榜題名。', target: '目標考取延平、薇閣、東山等明星私中的小六學生. ', features: ['國英數三科重點複習', '私中命題趨勢分析', '高強度模擬考演練', '落點分析與志願選填'], roadmap: ['單元複習期', '綜合演練期', '考前衝刺期'] },
      ]
    },
    {
      id: 'essenjoy-player',
      label: '艾森樂小玩家',
      description: '艾森樂小玩家系列課程，結合寒暑假主題營隊與週末多元工作坊，旨在讓學習延伸至教室之外。透過科學實驗、藝術創作、戶外探索與體能活動，啟發孩子的多元興趣與潛能。我們相信「玩」是最好的學習，在遊戲與團隊合作中，培養解決問題的能力與人際互動技巧，讓孩子在歡笑中快樂成長，玩出屬於自己的競爭力。',
      icon: <Clock size={20} />,
      color: 'text-pink-500',
      classes: [
        { name: '艾森樂夏令營', desc: '主題式教學，結合科學、藝術、體能與戶外參訪', age: '升小一 ~ 小六', time: '暑假期間 上午', objectives: '透過多元主題活動，豐富暑假生活，培養團隊合作與探索精神。', target: '希望度過充實快樂暑假的國小學生。', features: ['每週不同主題課程', '戶外教學與參訪', '專業師資帶領活動', '成果發表與展示'], roadmap: ['科學探索週', '藝術創作週', '體能挑戰週'] },
        { name: '艾森樂冬令營', desc: '短期密集營隊，專注力訓練與多元智能開發', age: '小一 ~ 小六', time: '寒假期間 上午', objectives: '利用寒假時間進行集中式學習與體驗，激發多元智能發展。', target: '希望在寒假期間學習新技能或體驗多元活動的學生。', features: ['專注力與記憶力訓練', '創客 Maker 動手做', '邏輯桌遊挑戰', '情緒管理與人際互動'], roadmap: ['大腦潛能開發', '創客實作體驗', '團隊合作挑戰'] },
        { name: '週六多元課程', desc: '科學實驗、創意積木、邏輯桌遊，豐富週末生活', age: '小一 ~ 小六', time: '週六 上午', objectives: '提供平日課業以外的興趣探索機會，發掘孩子的天賦與熱情。', target: '希望利用週末時間培養興趣 or 專長的學生。', features: ['多元領域課程選擇', '小班制精緻教學', '著重動手做與體驗', '培養跨領域素養'], roadmap: ['科學實驗班', '創意積木班', '邏輯桌遊班'] },
      ]
    }
  ];

  const TIMELINE_DATA = [
    { 
      grade: '低年級 (小一~小二)', 
      subtitle: '興趣啟發期', 
      goal: '建立學習習慣 × 激發好奇心', 
      courses: [
        '【數學】小育豪資優數學啟蒙', 
        '【美語】ESL 生活會話 / 外師發音', 
        '【科學】小小科學家動手做',
        '【營隊】艾森樂主題探索營隊'
      ] 
    },
    { 
      grade: '中年級 (小三~小四)', 
      subtitle: '能力養成期', 
      goal: '奠定學科基礎 × 培養邏輯思考', 
      courses: [
        '【數學】資優數學邏輯養成', 
        '【美語】英語閱讀與寫作起步', 
        '【國語】閱讀素養與短文創作',
        '【科學】科學原理探究 / 科展培訓'
      ] 
    },
    { 
      grade: '高年級 (小五)', 
      subtitle: '升學準備期', 
      goal: '深化學科實力 × 探索升學方向', 
      courses: [
        '【數學】高年級數學進階 / 資優特訓', 
        '【美語】GEPT 英檢初級/中級培訓', 
        '【國語】長篇閱讀理解 / 修辭寫作',
        '【升學】私中入學 / 資優鑑定準備'
      ] 
    },
    { 
      grade: '升國中 (小六)', 
      subtitle: '衝刺關鍵期', 
      goal: '私中錄取 × 國中課程銜接', 
      courses: [
        '【升學】私中入學全科衝刺 (模考實戰)', 
        '【升學】公校資優班鑑定專題輔導', 
        '【銜接】國中數學 / 生物先修課程',
        '【美語】國中英文文法銜接 / KET檢定'
      ] 
    },
  ];

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  const handleTogglePlan = () => {
    if (!isPlanOpen) {
      // Opening
      setIsPlanOpen(true);
      setTimeout(() => {
        if (timelineRef.current) {
          const y = timelineRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Closing
      handleCollapse();
    }
  };

  const handleCollapse = () => {
    // Scroll back to top of section first
    if (sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Delay closing to allow scroll to complete visibly
    setTimeout(() => {
      setIsPlanOpen(false);
    }, 500);
  };

  const openSchedule = (cls: any) => {
    setSelectedClass(cls);
    setModalMode('schedule');
    if (cls.name === '進度數學班') {
      setSelectedGrade('三年級');
    } else if (cls.name === '閱讀素養班') {
      setSelectedGrade('一年級');
    } else if (cls.name === '閱讀寫作班') {
      setSelectedGrade('中年級');
    }
  };

  const openDetail = (cls: any) => {
    setSelectedClass(cls);
    setModalMode('detail');
    setActiveDetailTab('main');
    if (cls.name === '進度數學班') {
      setSelectedGrade('三年級');
    } else if (cls.name === '閱讀素養班') {
      setSelectedGrade('一年級');
    } else if (cls.name === '閱讀寫作班') {
      setSelectedGrade('中年級');
    }
  };

  // Generate Mock Schedule Data
  const generateSchedule = (cls: any) => {
    // Specific data for Progress Math
    if (cls.name === '進度數學班') {
      const gradeData: Record<string, string[]> = {
        '三年級': [
          '10000以內的數', '四位數的加減', '數線', '毫米', '乘法', '分數(一)', '除法(一)', '圓', '除法(二)', '小數',
          '公斤與公克', '時間', '公升與毫升', '兩步驟應用問題', '角', '分數(二)', '正方形與長方形', '面積', '生活中的表格', '找規律'
        ],
        '四年級': [
          '一億以內的數', '整數的乘法', '整數的除法', '角度', '假分數與帶分數', '公里', '兩步驟問題與併式', '三角形與全等', '二位小數', '概數',
          '四則運算', '時間', '四邊形', '周長與面積', '統計圖表', '體積', '小數的乘法', '等值分數', '找規律'
        ],
        '五年級': [
          '倍數與因數', '四則運算', '公倍數與公因數', '平面圖形', '擴分、約分和通分', '面積', '數的十進位結構', '分數', '小數', '扇形與圓心角',
          '生活中的大單位', '體積', '立體形體', '時間的乘除', '比率與百分率', '表面積', '容積', '線對稱圖形', '折線圖'
        ],
        '六年級': [
          '最大公因數與最小公倍數', '分數的除法', '長條圖與折線圖', '小數的除法', '圓和扇形的周長', '比、比值與正比', '縮放圖和比例尺', '圓和扇形的面積', '怎樣解題(一)', '等量公理',
          '分數與小數的四則運算', '角柱和圓柱', '速率', '基準量與比較量', '怎樣解題(二)', '圓形圖'
        ]
      };

      const units = gradeData[selectedGrade] || [];
      return units.map((name, i) => ({
        unit: `單元${['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十'][i]}`,
        courseName: name
      }));
    }

    // Specific data for Seed Advanced Math and Advanced Math
    if (cls.name === '種子超前數學班' || cls.name === '超前數學班') {
      const units = [
        '整數的四則運算', '因數與倍數', '小數的四則運算', '分數的四則運算', '比與比值',
        '比率與百分率', '速率的應用', '體積與容積', '圓與扇形', '形體關係與柱體表面積',
        '縮圖、放大圖與比例尺', '圖解法', '等量公理', '傳統問題', '一元一次方程式及應用問題'
      ];
      return units.map((name, i) => ({
        unit: `單元${['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五'][i]}`,
        courseName: name
      }));
    }

    // Specific data for Reading Literacy
    if (cls.name === '閱讀素養班') {
      const literacyData: Record<string, {topic: string, category: string}[]> = {
        '一年級': [
          { topic: '魔術師', category: '新詩讀寫' },
          { topic: '釣魚', category: '新詩讀寫' },
          { topic: '蛇', category: '新詩讀寫' },
          { topic: '「樂樂遊樂場」使用規則', category: '應用閱讀' },
          { topic: '去遊樂場玩耍', category: '段文寫作' },
          { topic: '伊索寓言：獅子和熊（一）', category: '寓言故事' },
          { topic: '標點符號大解密', category: '標點符號' },
          { topic: '楊喚詩選：小螞蟻', category: '新詩讀寫' },
          { topic: '唱童謠，學作文：小蜜蜂', category: '新詩讀寫' },
          { topic: '新詩讀寫：輕輕的', category: '新詩讀寫' },
          { topic: '楊喚詩選：七彩的虹', category: '新詩讀寫' },
          { topic: '並列句型練習', category: '句型練習' },
          { topic: '品德故事：胖乎乎的小手', category: '品德故事' },
          { topic: '轉折句型練習', category: '句型練習' },
          { topic: '疊字詞練習', category: '疊字詞' },
          { topic: '生命教育：小壁虎長尾巴', category: '生命教育' },
          { topic: '看圖說故事：放學路上', category: '看圖寫作' },
          { topic: '看圖說故事：勤勞的兔子', category: '看圖寫作' },
        ],
        '二年級': [
          { topic: '世界兒童經典文學《夏綠蒂的網》：小豬韋伯', category: '閱讀寫作' },
          { topic: '譬喻法描寫人體部位', category: '修辭法' },
          { topic: '世界兒童經典文學《夏綠蒂的網》：每隻豬都需要朋友', category: '閱讀寫作' },
          { topic: '句型練習', category: '寫作技巧' },
          { topic: '世界兒童經典文學《夏綠蒂的網》：被宰殺的命運', category: '閱讀寫作' },
          { topic: '運用聲音寫季節', category: '修辭法' },
          { topic: '世界兒童經典文學《夏綠蒂的網》：聰慧的夏綠蒂', category: '閱讀寫作' },
          { topic: '情理兼備的表達技巧', category: '寫作技巧' },
          { topic: '世界兒童經典文學《夏綠蒂的網》：榮耀之豬', category: '閱讀寫作' },
          { topic: '按照順序寫景物', category: '寫作技巧' },
          { topic: '世界兒童經典文學《夏綠蒂的網》：用不結束的友誼', category: '閱讀寫作' },
          { topic: '視覺摹寫練習：描寫人物外觀（一）', category: '修辭法' },
          { topic: '讀後心得撰寫', category: '讀後心得' },
          { topic: '《寄給貓巧可的信》解謎冒險遊戲（一）', category: '閱讀寫作' },
          { topic: '《寄給貓巧可的信》解謎冒險遊戲（二）', category: '閱讀寫作' },
          { topic: '《寄給貓巧可的信》解謎冒險遊戲（三）', category: '閱讀寫作' },
          { topic: '《寄給貓巧可的信》解謎冒險遊戲（四）', category: '閱讀寫作' },
          { topic: '《寄給貓巧可的信》解謎冒險遊戲（五）', category: '閱讀寫作' },
        ]
      };
      const units = literacyData[selectedGrade] || [];
      return units.map((item, i) => ({
        unit: i + 1,
        courseName: item.topic,
        category: item.category
      }));
    }

    // Specific data for Reading and Writing
    if (cls.name === '閱讀寫作班') {
      const writingData: Record<string, {topic: string, category: string}[]> = {
        '中年級': [
          { topic: '〈科學怪人——北極奇遇記〉', category: '閱讀理解＋詞彙' },
          { topic: '氛圍感寫作技巧（寫景）', category: '短文寫作' },
          { topic: '〈科學怪人——躊躇滿志的慘綠少年〉', category: '閱讀理解＋詞彙' },
          { topic: '科學腦與文學腦的轉換練習', category: '寫作技巧' },
          { topic: '作文：颱風過境', category: '長篇作文' },
          { topic: '〈科學怪人——你好！世界〉', category: '閱讀理解＋詞彙' },
          { topic: '情緒的書寫技巧（抒情）', category: '短文寫作' },
          { topic: '〈科學怪人——可望而不可及的溫暖〉', category: '閱讀理解＋詞彙' },
          { topic: '起承轉合的敘事結構', category: '寫作技巧' },
          { topic: '人性的反思', category: '閱讀思辨' },
          { topic: '作文：發考卷的時候', category: '長篇作文' },
          { topic: '〈科學怪人——威廉之死〉', category: '閱讀理解＋詞彙' },
          { topic: '作文：是否應該再造一個女性怪物', category: '長篇作文' },
          { topic: '〈科學怪人——孤獨的靈魂〉', category: '閱讀理解＋詞彙' },
        ],
        '高年級': [
          { topic: '近體詩的故事', category: '國學常識' },
          { topic: '論語與孔子', category: '文言文' },
          { topic: '月餅與朱元璋起義', category: '文化常識' },
          { topic: '現代詩欣賞', category: '新詩賞析' },
          { topic: '短文閱讀精粹', category: '短文賞析' },
          { topic: '唐傳奇——李娃傳', category: '長文賞析' },
          { topic: '唐傳奇——杜子春傳', category: '長文賞析' },
          { topic: '〈中學生報：少年犯罪怎麼罰？〉', category: '讀報與思辨' },
          { topic: '亂世奸雄——曹操', category: '長文賞析' },
          { topic: '仁義之君——劉備', category: '長文賞析' },
          { topic: '《世說新語》故事選', category: '文言文' },
          { topic: '《世說新語》成語選', category: '文言文' },
          { topic: '黃粱一夢', category: '成語典故' },
          { topic: '慎選朋友的勇氣', category: '讀報與思辨' },
        ]
      };
      const units = writingData[selectedGrade] || [];
      return units.map((item, i) => ({
        unit: i + 1,
        courseName: item.topic,
        category: item.category
      }));
    }

    const daysMap: Record<string, string> = { '週一': 'Mon', '週二': 'Tue', '週三': 'Wed', '週四': 'Thu', '週五': 'Fri', '週六': 'Sat', '週日': 'Sun' };
    let primaryDay = '週六';
    
    for (const d of Object.keys(daysMap)) {
      if (cls.time.includes(d)) {
        primaryDay = d;
        break;
      }
    }

    const topics = [
      '課程相見歡 & 基礎觀念建立',
      '核心素養導讀 & 分組討論',
      '進階題型演練 (一)',
      '進階題型演練 (二)',
      '單元實作與應用',
      '歷屆試題解析 & 難點突破',
      '模擬測驗檢定',
      '期末成果發表與回饋'
    ];

    // Helper to get period from time string
    const getPeriod = (timeStr: string) => {
      if (timeStr.includes('上午')) return '上午';
      if (timeStr.includes('下午')) return '下午';
      if (timeStr.includes('晚上')) return '晚上';
      
      // Fallback for legacy data or specific formats
      if (timeStr.includes('10:00')) return '上午';
      if (timeStr.includes('13:30') || timeStr.includes('15:30')) return '下午';
      if (timeStr.includes('18:') || timeStr.includes('19:') || timeStr.includes('平日')) return '晚上';
      
      return '上午'; // Default
    };

    return Array.from({ length: 8 }).map((_, i) => ({
      date: `07/${String(i * 7 + 5).padStart(2, '0')}`,
      day: primaryDay,
      time: getPeriod(cls.time),
      unit: `第 ${i+1} 單元`,
      courseName: topics[i]
    }));
  };

  const commonNotes = [
    "請準時出席，遲到超過 15 分鐘請先至櫃檯報到。",
    "請攜帶指定教材、筆記本與文具用品。",
    "課堂中請勿使用手機，並將手機轉為靜音。",
    "請假請提前 24 小時告知，以利安排補課。",
    "補習班保有課程異動之權利，如有變動將另行通知。"
  ];

  const renderTimeWithCircles = (timeStr: string) => {
    if (!timeStr.includes('週')) return <span>{timeStr}</span>;

    const parts = timeStr.split(' ');
    const dayPart = parts[0];
    const suffix = parts.slice(1).join(' ');

    // Remove '週' and split by '/'
    const days = dayPart.replace('週', '').split('/');

    return (
      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-bold text-sm">週</span>
        <div className="flex gap-1.5 items-center">
          {days.map((d, i) => (
            <span key={i} className="min-w-[2.25rem] h-9 px-2 flex items-center justify-center rounded-full border-2 border-green-600 text-green-700 font-bold text-sm bg-green-50/50">
              {d}
            </span>
          ))}
        </div>
        {suffix && <span className="text-slate-900 font-medium ml-1">{suffix}</span>}
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="course-roadmap" className="py-20 bg-green-600 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-green-200 font-bold tracking-wide uppercase text-sm mb-3">育豪資優</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">國小課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="flex items-center justify-between bg-green-700/50 rounded-xl p-2 backdrop-blur-sm border border-green-500/30">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-green-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100').replace('400', '100')} text-green-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-green-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-green-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Sidebar Tabs */}
          <div className="hidden md:flex md:w-1/4 flex-col gap-2">
            {COURSE_DATA.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-3 lg:px-6 lg:py-4 rounded-xl transition-all whitespace-nowrap text-left ${
                  activeTab === index 
                    ? `bg-white text-green-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-green-700/50 text-green-100 hover:bg-green-700 border border-green-500/30'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-green-100 text-green-600' : 'bg-green-800 text-green-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">熱門課程</span>
            </button>

            <button
              onClick={handleTogglePlan}
              className={`mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-green-800 ring-2 ring-white' 
                  : 'bg-green-800 text-white hover:bg-green-700 border border-green-600'
              }`}
            >
              <Map size={20} />
              <span className="text-lg">完整規劃</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-green-50 leading-relaxed md:leading-loose text-base md:text-lg font-medium text-justify">
                  {COURSE_DATA[activeTab].description}
               </p>
            </div>

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-green-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                      {cls.name}
                    </h4>

                    {/* Meta Tags: Age & Time */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
                         <Users size={14} className="text-green-600" /> 
                         <span>{cls.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
                         <Clock size={14} className="text-green-600" /> 
                         <span>{cls.time}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {cls.desc}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                     <button 
                       onClick={() => openSchedule(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-1.5 border border-green-200"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <button 
                       onClick={() => openDetail(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-green-200"
                     >
                        了解課程 <ArrowRight size={14} />
                     </button>
                  </div>
                </div>
              ))}
            </div>

             {/* Mobile Action Buttons (Moved below cards) */}
             <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
               <button
                onClick={() => setIsBrochureOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-sm"
              >
                <FileText size={18} />
                <span>熱門課程</span>
              </button>
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-green-700' : 'bg-green-700 text-white border border-green-500'}`}
              >
                <Map size={18} />
                <span>完整規劃</span>
              </button>
             </div>
          </div>
        </div>

        {/* Full Plan Timeline Section (Vertical Centered) */}
        {isPlanOpen && (
          <div ref={timelineRef} className="mt-16 py-12 px-4 md:px-12 bg-white rounded-3xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex flex-col items-center justify-center gap-2 mb-16 md:mb-20">
               <div className="flex items-center gap-3">
                 <Map className="text-green-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-green-800 text-center">國小完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">六年初衷，快樂學習，自信成長</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-green-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-green-100 -translate-x-1/2 rounded-full md:hidden"></div>

                {/* NEW: Start Icon - Bouncing ChevronsDown */}
                <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="bg-green-50 p-2 rounded-full border-2 border-green-100 animate-bounce shadow-sm">
                      <ChevronsDown size={20} className="text-green-600" />
                   </div>
                </div>
                
                <div className="space-y-8 md:space-y-16 mb-8"> 
                   {TIMELINE_DATA.map((step, idx) => (
                      // Changed logic here: Start with Main Card on Left (idx % 2 !== 0 condition flipped)
                      <div key={idx} className={`flex flex-col md:flex-row items-center md:justify-between relative ${idx % 2 !== 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                         
                         {/* Side Content: Recommended Course Direction (Desktop Only) */}
                         <div className={`hidden md:flex w-5/12 flex-col justify-center ${idx % 2 !== 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                            <div className={`flex items-center gap-2 text-amber-500 font-bold mb-2 ${idx % 2 !== 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                               {/* Icon order flips based on side */}
                               <span className="font-bold text-lg">推薦選課方向</span>
                               <CheckCircle2 size={20} />
                            </div>
                            <ul className="space-y-2">
                                {step.courses.map(c => (
                                    <li key={c} className={`text-slate-600 font-medium hover:text-green-600 transition-colors ${idx % 2 !== 0 ? 'mr-1' : 'ml-1'}`}>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                         </div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-green-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                         </div>

                         {/* Main Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-green-50 rounded-2xl p-6 border border-green-100 hover:bg-green-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-green-700 text-xs font-bold mb-3 border border-green-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-green-900 mb-1">{step.grade}</h4>
                                <p className="text-green-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-green-200 ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-1.5 ${idx % 2 !== 0 ? '' : 'md:flex-row-reverse'}`}>
                                            <Target size={16} />
                                            <span>學習目標</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">{step.goal}</p>
                                    </div>

                                    {/* Mobile Only: Courses Section inside card */}
                                    <div className="md:hidden pt-4 border-t border-green-200/50 mt-2">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                                            <CheckCircle2 size={16} />
                                            <span>推薦選課方向</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {step.courses.map(c => (
                                                <li key={c} className="flex items-center gap-2 text-slate-700 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Bouncing Rocket Icon - Absolute position at bottom-0 */}
                <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-white border-4 border-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Rocket className="text-green-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
                >
                  <ChevronUp size={16} />
                  收起時間軸
                </button>
             </div>
          </div>
        )}
      </div>
      
      <BrochureViewer 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
        images={BROCHURE_IMAGES} 
      />

      {/* Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass ? (
          modalMode === 'schedule' 
            ? `${selectedClass.name} - 課程表`
            : `${selectedClass.name} - 課程介紹`
        ) : ''}
        maxWidth="max-w-4xl"
        headerClassName="bg-[#4CAF50]"
      >
        {selectedClass && modalMode === 'schedule' && (
          <div className="space-y-6">
             {/* Grade Selection */}
             {(selectedClass.name === '進度數學班' || selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl">
                   {(selectedClass.name === '進度數學班' 
                     ? ['三年級', '四年級', '五年級', '六年級'] 
                     : selectedClass.name === '閱讀素養班'
                     ? ['一年級', '二年級']
                     : ['中年級', '高年級']
                   ).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                          selectedGrade === grade
                            ? 'bg-white text-green-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {grade}
                      </button>
                   ))}
                </div>
             )}

             {/* Info Header */}
             <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 items-center">
                <div className="flex items-center gap-2">
                   {!(selectedClass.name === '進度數學班' || selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                     <span className="text-slate-500 font-bold text-sm">上課對象：</span>
                   )}
                   <span className={`text-slate-900 font-bold ${(selectedClass.name === '進度數學班' || selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') ? 'text-xl' : 'text-medium'}`}>
                     {selectedClass.name === '進度數學班' ? `${selectedGrade}進度資優班` : 
                      selectedClass.name === '閱讀素養班' ? `${selectedGrade}閱讀素養班` : 
                      selectedClass.name === '閱讀寫作班' ? `${selectedGrade}閱讀寫作班` : 
                      selectedClass.age}
                   </span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-slate-500 font-bold text-sm">上課時間：</span>
                   <div className="text-slate-900 font-medium">
                     {renderTimeWithCircles(selectedClass.time)}
                   </div>
                </div>
             </div>

             {/* Schedule Table */}
             <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[600px]">
                       <thead className="bg-[#4CAF50] text-white font-bold uppercase">
                          <tr>
                             {!(selectedClass.name === '進度數學班' || selectedClass.name === '種子超前數學班' || selectedClass.name === '超前數學班' || selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                               <>
                                 <th className="px-4 py-3 whitespace-nowrap">日期</th>
                                 <th className="px-4 py-3 whitespace-nowrap">星期</th>
                                 <th className="px-4 py-3 whitespace-nowrap">時間</th>
                               </>
                             )}
                             <th className="px-4 py-3 whitespace-nowrap">單元</th>
                             <th className="px-4 py-3 whitespace-nowrap">
                               {(selectedClass.name === '進度數學班' || selectedClass.name === '種子超前數學班' || selectedClass.name === '超前數學班') ? '課程規劃' : 
                                (selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') ? '主題' : '課程名稱'}
                             </th>
                             {(selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                               <th className="px-4 py-3 whitespace-nowrap">類別</th>
                             )}
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {generateSchedule(selectedClass).map((row: any, idx) => (
                             <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                {!(selectedClass.name === '進度數學班' || selectedClass.name === '種子超前數學班' || selectedClass.name === '超前數學班' || selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                                  <>
                                    <td className="px-4 py-3 font-medium text-slate-900">{row.date}</td>
                                    <td className="px-4 py-3 text-slate-500">{row.day}</td>
                                    <td className="px-4 py-3 text-slate-500">{row.time}</td>
                                  </>
                                )}
                                <td className="px-4 py-3 text-green-600 font-bold">{row.unit}</td>
                                <td className="px-4 py-3 text-slate-700">{row.courseName}</td>
                                {(selectedClass.name === '閱讀素養班' || selectedClass.name === '閱讀寫作班') && (
                                  <td className="px-4 py-3 text-slate-500">{row.category}</td>
                                )}
                             </tr>
                          ))}
                       </tbody>
                    </table>
                </div>
             </div>

             {/* Notes */}
             <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                   課程注意事項
                </h4>
                <ul className="space-y-2 bg-yellow-50 p-5 rounded-xl text-slate-700 text-sm border border-yellow-100">
                   {commonNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                         <span className="text-yellow-500 font-bold">•</span>
                         {note}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        )}

        {selectedClass && modalMode === 'detail' && (
           <div className="space-y-6 p-2">
              {/* Grade Selection for Detail Mode */}
              {selectedClass.gradeHighlights && (
                <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl">
                   {(selectedClass.name === '閱讀素養班'
                     ? ['一年級', '二年級']
                     : ['中年級', '高年級']
                   ).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                          selectedGrade === grade
                            ? 'bg-white text-green-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {grade}
                      </button>
                   ))}
                </div>
              )}

              {/* Content Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: 'main', label: '課程概述', icon: <FileText size={16} /> },
                  { id: 'highlights', label: '教學重點', icon: <CheckCircle2 size={16} /> },
                  { id: 'features', label: '課程特色', icon: <Lightbulb size={16} /> },
                  { id: 'roadmap', label: '系列規劃', icon: <Waypoints size={16} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id as any)}
                    className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${
                      activeDetailTab === tab.id
                        ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-200'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-green-200 hover:text-green-600'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeDetailTab === 'main' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        {selectedClass.gradeDescs && selectedClass.gradeDescs[selectedGrade] 
                          ? selectedClass.gradeDescs[selectedGrade] 
                          : selectedClass.desc}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-100">
                          <Users size={18} className="text-green-600" />
                          <span className="text-sm font-bold text-slate-700">
                            對象：{selectedClass.gradeTargets && selectedClass.gradeTargets[selectedGrade] 
                              ? selectedClass.gradeTargets[selectedGrade] 
                              : selectedClass.target}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-100">
                          <Target size={18} className="text-green-600" />
                          <span className="text-sm font-bold text-slate-700">
                            目標：{selectedClass.gradeObjectives && selectedClass.gradeObjectives[selectedGrade] 
                              ? selectedClass.gradeObjectives[selectedGrade] 
                              : selectedClass.objectives}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'highlights' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {selectedClass.gradeHighlights && selectedClass.gradeHighlights[selectedGrade] ? (
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                           <CheckCircle2 className="text-green-600" size={20} />
                           【{selectedGrade} 教學重點】
                        </h4>
                        <ul className="space-y-3">
                           {selectedClass.gradeHighlights[selectedGrade].map((highlight, i) => (
                              <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                 <span className="text-green-500 font-bold shrink-0 mt-0.5 text-base">˙</span>
                                 <span className="text-base text-slate-700 whitespace-pre-line leading-relaxed">{highlight}</span>
                              </li>
                           ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400">暫無教學重點資料</div>
                    )}
                  </div>
                )}

                {activeDetailTab === 'features' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Lightbulb className="text-yellow-500" size={20} />
                       課程特色
                    </h4>
                    <ul className="space-y-3">
                       {(selectedClass.gradeFeatures && selectedClass.gradeFeatures[selectedGrade] 
                         ? selectedClass.gradeFeatures[selectedGrade] 
                         : selectedClass.features).map((feat: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                             <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                             <span className="text-base text-slate-700 leading-relaxed">{feat}</span>
                          </li>
                       ))}
                    </ul>
                  </div>
                )}

                {activeDetailTab === 'roadmap' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Waypoints className="text-green-600" size={20} />
                       系列課程規劃
                    </h4>
                    <div className="space-y-4">
                       {(selectedClass.gradeRoadmaps && selectedClass.gradeRoadmaps[selectedGrade] 
                         ? selectedClass.gradeRoadmaps[selectedGrade] 
                         : selectedClass.roadmap).map((step: string, i: number, arr: string[]) => (
                          <div key={i} className="flex items-center gap-4 relative group">
                             {/* Vertical Line */}
                             {i !== arr.length - 1 && (
                                <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-slate-200"></div>
                             )}
                             
                             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0 z-10 border-4 border-white shadow-sm text-base">
                                {i + 1}
                             </div>
                             <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-base text-slate-700 font-medium leading-relaxed">
                                {step}
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Call to Action */}
              <div className="pt-6 border-t border-slate-100 text-center">
                 <a 
                   href="#contact" 
                   onClick={() => setSelectedClass(null)}
                   className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-green-700 hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                 >
                    立即預約試聽 <ArrowRight size={20} />
                 </a>
                 <p className="mt-3 text-sm text-slate-400">名額有限，建議提早預約保留席位</p>
              </div>
           </div>
        )}
      </Modal>
    </section>
  );
};

export default CourseRoadmap;
