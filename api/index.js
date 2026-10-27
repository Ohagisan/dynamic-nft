export default function handler(req, res) {
  // 日本時間を取得 (UTC + 9時間)
  const now = new Date();
  const jstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  const hours = jstTime.getUTCHours();
  const minutes = jstTime.getUTCMinutes();

  // 21:50 〜 21:55 の間かどうか判定
  const isSpecial = (hours === 21 && minutes >= 50 && minutes < 55);

  const normalMetadata = {
    schema: "ipfs://bafkreidbtjf2ihiwtptiyadjfmesplo555iy2jdcwhfr6hkenr2z3fvxn2y",
    nftType: "art.v0",
    name: "Halloween Witch (Normal 22)",
    description: "This is the normal version.",
    image: "ipfs://bafybeih5xr3piujqjly5sa5ujgdg4mb3kc4453uxb62shegk5jkixjtra/1.png"
  };

  const specialMetadata = {
    schema: "ipfs://bafkreidbtjf2ihiwtptiyadjfmesplo555iy2jdcwhfr6hkenr2z3fvxn2y",
    nftType: "art.v0",
    name: "Halloween Witch (Special 1)",
    description: "This is the limited special version!",
    image: "ipfs://bafybeic4mztotq6ketl6zirfarjytm5rgc2uf7723y4373zcpfgjxysbu4/2.png"
  };

  // CORSヘッダー（外部ツール等からのブロック防止）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (isSpecial) {
    res.status(200).json(specialMetadata);
  } else {
    res.status(200).json(normalMetadata);
  }
}
