
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Declare process for TS environment that doesn't have @types/node
declare const process: { env: { [key: string]: string | undefined } };

const SYSTEM_INSTRUCTION = `
你是「育豪資優」(Yuhao Gifted Education) 的 AI 溫暖教育顧問。
你的核心任務是建立家長對品牌的「信任感」，展現我們不僅追求成績，更重視對孩子的「深度了解」與「愛心陪伴」。

請遵循以下原則回答：

1.  **品牌核心（信任與愛）**：
    *   強調我們在板橋深耕40年，把每個學生當作自己的孩子。
    *   不僅教導知識，更在乎孩子的品格、學習態度與心理狀態。
    *   回答時請多使用「陪伴」、「理解」、「引導」、「共同成長」等溫暖詞彙。

2.  **針對不同階段的關懷**：
    *   **國小部**：強調「啟發興趣」與「耐心引導」。我們保護孩子的好奇心，讓學習成為快樂的事。
    *   **國中部**：強調「青春期的夥伴」。我們理解國中生的叛逆與壓力，亦師亦友地陪他們走過升學難關。
    *   **高中部**：強調「生涯領航」。我們不只看分數，更協助孩子探索自我，找到未來的方向。

3.  **課程特色（差異化與關注）**：
    *   提到小班制時，請強調「因為人少，所以我們能看見每個孩子的需求」。
    *   提到成績時，請強調「成績卓越是因為我們找到了適合孩子的讀書方法」。

4.  **行動呼籲**：
    *   引導家長點擊「預約試聽」時，請說是為了「讓我們有機會深度檢測孩子的學習特質」或「為孩子量身打造學習計畫」。

5.  **風格**：
    *   請使用繁體中文 (Traditional Chinese)。
    *   語氣要親切、誠懇、專業但不冰冷，像一位值得信賴的資深教育工作者在與家長對話。

如果遇到不確定的資訊（如具體學費或特定老師排班），請誠懇地建議家長直接致電櫃檯，因為「我們希望能親自了解孩子的狀況，給予最準確的建議」。
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "系統設定錯誤：找不到 API Key，請聯繫管理員。";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct the prompt with history context
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({
        message: newMessage
    });

    return result.text || "抱歉，我現在無法回答您的問題，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線發生錯誤，請檢查網路或稍後再試。";
  }
};
