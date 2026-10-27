export default function handler(req, res) {
  // 日本時間 (JST: UTC+9) を取得
  const now = new Date();
  const jstOffset = 9 * 60; // 分単位
  const utcMinutes = now.getTime() + (now.getTimezoneOffset() * 60000);
  const jstNow = new Date(utcMinutes + (jstOffset * 60000));

  const hours = jstNow.getHours();
  const minutes = jstNow.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // 17:10 〜 17:15 の判定 (分換算)
  // 17:10 = 1030分、17:15 = 1035分
  const isSpecialTime = timeInMinutes >= (17 * 60 + 10) && timeInMinutes <= (17 * 60 + 15);

  const metadata = isSpecialTime
    ? {
        name: "Halloween Witch (Special 1)",
        description: "Yeah!",
        image: "ipfs://bafkreicmxg72jllt2gcmp3gblndmcqaf3d3gyzl4g2ndtenzucnf2ti",
        attributes: [
          { trait_type: "Mode", value: "Special" },
          { trait_type: "Current JST", value: `${hours}:${minutes < 10 ? '0' : ''}${minutes}` }
        ]
      }
    : {
        name: "Halloween Witch (Normal 22)",
        description: "hello",
        image: "ipfs://bafkreigsskflnc2dki2hm6gnmuaj5dgdwogznj6iuhb7tvm6kdlnbl2zou",
        attributes: [
          { trait_type: "Mode", value: "Normal" },
          { trait_type: "Current JST", value: `${hours}:${minutes < 10 ? '0' : ''}${minutes}` }
        ]
      };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.status(200).json(metadata);
}
