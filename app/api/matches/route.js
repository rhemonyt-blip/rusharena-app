import { connectDB } from "@/lib/connectDB";
import Matches from "@/models/matches";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const matchType = searchParams.get("type");

    if (!matchType) {
      return new Response(
        JSON.stringify({ message: "Match type is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // // Fetch matches ONLY by matchType (no date filtering)
    // const matches = await Matches.find({ matchType }).lean();

    // if (!matches || matches.length === 0) {
    //   return new Response(
    //     JSON.stringify({ message: "No matches found", data: [] }),
    //     { status: 404, headers: { "Content-Type": "application/json" } }
    //   );
    // }
    const matches =[ {
      "_id": "698f606e2a694925af5f4ab4",
      "title": "Free Match || ID Pass in Telegram📌",
      "roomId": "",
      "roomPass": "",
      "matchType": "Free match",
      "winPrize": 110,
      "perKill": 0,
      "entryFee": 0,
      "entryType": "Solo",
      "map": "Bermuda",
      "totalSpots": 1000,
      "prizeDetails": [],
      "startTime": "2026-03-24T16:00:00.000Z",
      "joinedPlayers": [
        {
          "name": "ONEㅤÄĻMÄŚㅤ࿐",
          "authId": "69859f1fe6951ab4900f1a0b",
          "userName": "ALMAS",
          "_id": "698f6415fdf0b82a717fd8a3"
        },
        {
          "name": "REX   PANE",
          "authId": "6971fb351aa364559e95b423",
          "userName": "Rimon",
          "_id": "698f6428466886a25c032d82"
        },
        {
          "name": "ㅥᴏʙɪᴛᴏᴜᴄʜɪʜᴀ",
          "authId": "693cdad1fd1d0fd35ed08fb8",
          "userName": "XftyGvg",
          "_id": "698fc9ab96c36850b4b63fce"
        },
        {
          "name": "—͞ꕶᴀɪᴋᴀᴛﾠ모.",
          "authId": "69744574df559fe54937cd3e",
          "userName": "Saikat",
          "_id": "698fd791bf1794acac84c5d3"
        },
        {
          "name": "EꜰㅤMᴜꜱʜꜰɪQ ┊",
          "authId": "69442c5d4fdcd142e178ed4f",
          "userName": "Jon",
          "_id": "698febe85da614292af1d4a3"
        },
        {
          "name": "LABIB",
          "authId": "697ef62c786d9f2288078e0c",
          "userName": "LABIB",
          "_id": "698fffb1ded62a175c5d9658"
        },
        {
          "name": "PĹÝÆ`\"`HÆŔĎ√",
          "authId": "69901ea26d0de6c915f8af84",
          "userName": "gaming",
          "_id": "699042812e96ed7d1f4af1d7"
        },
        {
          "name": "SC ROBIUL",
          "authId": "69724536c0d7763e622a6527",
          "userName": "Robiul455",
          "_id": "699065806e324c66dc6cec06"
        },
        {
          "name": "BDBSKSayan",
          "authId": "69731ac7bc5c1398e87555f4",
          "userName": "SAYAN",
          "_id": "699098d3d8a3819fd3fd6aab"
        },
        {
          "name": "ᵀᴳ〆FAHAD★모",
          "authId": "6991cc4e97dab8e8e8c41cf2",
          "userName": "FahaD",
          "_id": "6995d393ea2e9fd6f5bc3288"
        },
        {
          "name": "ᵀᴳ〆ᴍᴜɴɴᴀ20K",
          "authId": "697c3f5a1beb67443582e29a",
          "userName": "Munna",
          "_id": "6997cbd637322a0a46e2ccc1"
        },
        {
          "name": "PĹÝÆ`\"`HÆŔĎ√",
          "authId": "691466df5b1c69f1288ead26",
          "userName": "mdshadhin",
          "_id": "699803a7b60406eb36537a06"
        },
        {
          "name": "꧁ⒼⓂⓈⒽⒶⒽⓇⒾⒶⓇ꧂",
          "authId": "69372812e8b9d4a522b949df",
          "userName": "Shahriar",
          "_id": "699d71e744469749dd995bb9"
        },
        {
          "name": "MR°Belal",
          "authId": "6985eb8f41d614830c6387f6",
          "userName": "BELAL",
          "_id": "699fb4fad0f4b2a6312af36e"
        },
        {
          "name": "MEHRAZㅤYTㅤᥫ᭡",
          "authId": "69a11ab704f8901a5b7505ce",
          "userName": "MeherazYt",
          "_id": "69a11ba004f8901a5b750679"
        },
        {
          "name": "ᴱᴸᵀﾠᴀʟɪꜰﾠ❶",
          "authId": "69a1819f292a498a8fd778ba",
          "userName": "alifhossine1",
          "_id": "69a182e5b41908bfb9f34fef"
        },
        {
          "name": "×͜ɴɪʀᴏʙ×6T9࿐",
          "authId": "69a227999de2548b9810ebe4",
          "userName": "Nirobhasan",
          "_id": "69a2295d9de2548b9810edaa"
        },
        {
          "name": "MONGEL gamer",
          "authId": "69a155799216f2b6ff9b0564",
          "userName": "mongel",
          "_id": "69a254485b94285bacc1d56e"
        },
        {
          "name": "꧁₮₳Jł₦₲₳₥ɆⱤ༒",
          "authId": "69a8133af1477802fd70f365",
          "userName": "MDTajin",
          "_id": "69a81403558ed1361c097e9f"
        },
        {
          "name": "ONLYLEOBOOS",
          "authId": "69a8cf4418f5c65ae3b57a03",
          "userName": "kajolali12",
          "_id": "69a8d07b18f5c65ae3b57afa"
        },
        {
          "name": "ᵀᴳᴿ〆EMRAN",
          "authId": "69ad6374a5d9895b5c13803b",
          "userName": "alemran",
          "_id": "69ad642d4102c212ce1475cd"
        },
        {
          "name": "7H_S4J!M_XF",
          "authId": "6985aed7648a5c1485d07e32",
          "userName": "MDSAJIM",
          "_id": "69b0d37d50caf3333a3220e7"
        },
        {
          "name": "SyamWat2251P",
          "authId": "6919ce43882230c672731482",
          "userName": "RHKSagor",
          "_id": "69b14720f06505a89d95a7f6"
        },
        {
          "name": "❶DEVIL‿KING࿐",
          "authId": "69733d816380f3d2e4d2d506",
          "userName": "MdSiham",
          "_id": "69b28d101d404b1651d3ca12"
        }
      ],
      "createdAt": "2026-02-13T17:33:34.095Z",
      "updatedAt": "2026-02-13T17:33:34.095Z",
      "serialNumber": 6138,
      "__v": 24,
      "priseDetails": []
    }];

    return new Response(JSON.stringify({ message: "Success", data: matches }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch matches",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
