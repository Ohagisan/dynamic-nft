export default function handler(req, res) {
  // 現在の日本時間（JST）を取得
  const now = new Date();
  const jstHour = (now.getUTCHours() + 9) % 24;
  const jstMinute = now.getUTCMinutes();

  // 特別なタイミング：22時40分 〜 22時45分（45分59秒まで）の間
  const isSpecial = (jstHour === 22 && jstMinute >= 40 && jstMinute <= 45);

  // 画像のCID設定（PinataのCIDを貼り付けてください）
  const normalImage = "ipfs://bafkreigsskflnc2dki2hm6gnmuaj5dgdwogznj6iuhb7tvm6kdlnbl2zou";
  const specialImage = "ipfs://bafkreicmxg72jllt2gcmp3gblndmcqaf6af3d3gyzl4g2ndtenzucnf2ti";

  // キャッシュを無効化（常に最新の判定を返す設定）
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");

  // メタデータを返す
  res.status(200).json({
    name: isSpecial ? "Halloween Witch (Special 1)" : "Halloween Witch (Normal 22)",
    description: "A dynamic witch NFT whose appearance transforms between 22:40 and 22:45 JST.",
    image: isSpecial ? specialImage : normalImage,
    attributes: [
      {
        trait_type: "Mode",
        value: isSpecial ? "Special" : "Normal"
      },
      {
        trait_type: "Current JST",
        value: `${jstHour}:${jstMinute < 10 ? '0' : ''}${jstMinute}`
      }
    ]
  });
}