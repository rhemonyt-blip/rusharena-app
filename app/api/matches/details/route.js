import { connectDB } from "@/lib/connectDB";
import { response } from "@/lib/healperFunc";
import Matches from "@/models/matches";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return new response(false, 400, "Match Id is required");
    }

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(matchId)) {
      return response(false, 400, "Invalid Match Id");
    }

    // // Fetch the match by ID
    // const match = await Matches.findById(matchId).lean();

    // if (!match) {
    //   return response(false, 404, "No match found");
    // }
    const match = [{
      "_id": "698f60592a694925af5f4a9c",
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
      "startTime": "2026-03-12T16:00:00.000Z",
      "joinedPlayers": [
        {
          "name": "ONEㅤÄĻMÄŚㅤ࿐",
          "authId": "69859f1fe6951ab4900f1a0b",
          "userName": "ALMAS",
          "_id": "698f638cfdf0b82a717fd7e2"
        },
        {
          "name": "REX   PANE",
          "authId": "6971fb351aa364559e95b423",
          "userName": "Rimon",
          "_id": "698f6505faa2ad69314d50e4"
        },
        {
          "name": "ㅥᴏʙɪᴛᴏᴜᴄʜɪʜᴀ",
          "authId": "693cdad1fd1d0fd35ed08fb8",
          "userName": "XftyGvg",
          "_id": "698fca07ae1164c7cce939d2"
        },
        {
          "name": "—͞ꕶᴀɪᴋᴀᴛﾠ모.",
          "authId": "69744574df559fe54937cd3e",
          "userName": "Saikat",
          "_id": "698fd731bf1794acac84c597"
        },
        {
          "name": "EꜰㅤMᴜꜱʜꜰɪQ ┊",
          "authId": "69442c5d4fdcd142e178ed4f",
          "userName": "Jon",
          "_id": "698fec4f6df4bf6cb4a3fa11"
        },
        {
          "name": "LABIB",
          "authId": "697ef62c786d9f2288078e0c",
          "userName": "LABIB",
          "_id": "698ffff927013ce221b060b7"
        },
        {
          "name": "PĹÝÆ`\"`HÆŔĎ√",
          "authId": "69901ea26d0de6c915f8af84",
          "userName": "gaming",
          "_id": "69904252244957d81c0b6758"
        },
        {
          "name": "SC ROBIUL",
          "authId": "69724536c0d7763e622a6527",
          "userName": "Robiul455",
          "_id": "699066546e324c66dc6ceca9"
        },
        {
          "name": "ン 𝙵𝙸𝙶𝚃𝙷𝙴R-➋ꪜ",
          "authId": "6986cf7407cdf880eaa86ac0",
          "userName": "sharif78",
          "_id": "69908cc0805998c8aaae592d"
        },
        {
          "name": "BDBSKSayan",
          "authId": "69731ac7bc5c1398e87555f4",
          "userName": "SAYAN",
          "_id": "69909886f403e1fd5db47fec"
        },
        {
          "name": "ᵀᴳ〆FAHAD★모",
          "authId": "6991cc4e97dab8e8e8c41cf2",
          "userName": "FahaD",
          "_id": "6995d33c41235901848eeb67"
        },
        {
          "name": "ᵀᴳ〆ᴍᴜɴɴᴀ20K",
          "authId": "697c3f5a1beb67443582e29a",
          "userName": "Munna",
          "_id": "6997cb8a005bab291c53d63f"
        },
        {
          "name": "PĹÝÆ`\"`HÆŔĎ√",
          "authId": "691466df5b1c69f1288ead26",
          "userName": "mdshadhin",
          "_id": "69980378b60406eb3653799e"
        },
        {
          "name": "Ҡ❤Ƭ᭄RIDOY★࿐",
          "authId": "6988805fcee54f1db4247d71",
          "userName": "Hidoy",
          "_id": "699858d7ac0208c8649ed6b2"
        },
        {
          "name": "নরসিংদীটপ 1 亗",
          "authId": "697794b3921909e2b06a919f",
          "userName": "MANIK1",
          "_id": "6999943ca5027b1a076032b8"
        },
        {
          "name": "꧁ⒼⓂⓈⒽⒶⒽⓇⒾⒶⓇ꧂",
          "authId": "69372812e8b9d4a522b949df",
          "userName": "Shahriar",
          "_id": "699d71ab44469749dd995b3e"
        },
        {
          "name": "MR°Belal",
          "authId": "6985eb8f41d614830c6387f6",
          "userName": "BELAL",
          "_id": "699fb4acd0f4b2a6312af2ed"
        },
        {
          "name": "X7  cor  !?⠋",
          "authId": "699fc0cca99e47f939ca292e",
          "userName": "X7core67",
          "_id": "69a07333720f9e24ca245d1d"
        },
        {
          "name": "MEHRAZㅤYTㅤᥫ᭡",
          "authId": "69a11ab704f8901a5b7505ce",
          "userName": "MeherazYt",
          "_id": "69a11b71b592218b9f4ed9a5"
        },
        {
          "name": "ᴱᴸᵀﾠᴀʟɪꜰﾠ❶",
          "authId": "69a1819f292a498a8fd778ba",
          "userName": "alifhossine1",
          "_id": "69a182b4b41908bfb9f34f18"
        },
        {
          "name": "×͜ɴɪʀᴏʙ×6T9࿐",
          "authId": "69a227999de2548b9810ebe4",
          "userName": "Nirobhasan",
          "_id": "69a229039de2548b9810ed2f"
        },
        {
          "name": "ᴴᴬᴿᴰ-RꫝɮɮɎ࿐",
          "authId": "69a284bafeea983d0b3eb9d7",
          "userName": "Akash2233",
          "_id": "69a285b1804a5a0bd47ff359"
        },
        {
          "name": "꧁₮₳Jł₦₲₳₥ɆⱤ༒",
          "authId": "69a8133af1477802fd70f365",
          "userName": "MDTajin",
          "_id": "69a813a9558ed1361c097db9"
        },
        {
          "name": "Fꫝ%⚔Rꫝ᥊??",
          "authId": "69802e5fb60c82dc30e1e882",
          "userName": "Abid",
          "_id": "69a857bf1c76d119c5ea890d"
        },
        {
          "name": "ONLYLEOBOOS",
          "authId": "69a8cf4418f5c65ae3b57a03",
          "userName": "kajolali12",
          "_id": "69a8d0ca18f5c65ae3b57bac"
        },
        {
          "name": "ɴꫝʏᴇᴇᴍㅤㅤᥫ᭡",
          "authId": "699166f5b76d7ba82c7a05a6",
          "userName": "Nayeem3135",
          "_id": "69a9acfa4cd7eaefd8275202"
        },
        {
          "name": "×͜×ㅤSOWROBㅤ",
          "authId": "699d51d05a552e74ce16c4e7",
          "userName": "sowrob",
          "_id": "69aad7901d4cb39206338a17"
        },
        {
          "name": "MONGEL Gamer",
          "authId": "69a155799216f2b6ff9b0564",
          "userName": "mongel",
          "_id": "69ab108224fe83224e72b394"
        },
        {
          "name": "ᴺˣᵀ_SOHEL亗",
          "authId": "697cb4ed6f14eddd476e469d",
          "userName": "SOHEL",
          "_id": "69acde99addefbc349453d1c"
        },
        {
          "name": "ᴊɪʜᴀᴅㅤVꫝɪㅤ모",
          "authId": "69a07c32dd9a2f4f5b13ffa5",
          "userName": "rjjihad1234",
          "_id": "69ad13c559c79b837f1f7f7e"
        },
        {
          "name": "Bsxismail",
          "authId": "69aa14c7e4da9928694ce527",
          "userName": "ISMAIL",
          "_id": "69ad3906bff9c1677e0b93e8"
        },
        {
          "name": "ᵀᴳᴿ〆EMRAN",
          "authId": "69ad6374a5d9895b5c13803b",
          "userName": "alemran",
          "_id": "69ad63e64102c212ce147511"
        },
        {
          "name": "ᵀᴳ〆SOBUJ★모",
          "authId": "697b25da4ce771ca661784bc",
          "userName": "Sobuj12",
          "_id": "69ad7ac8244dbbccb9fd7d6f"
        },
        {
          "name": "WALID MvP",
          "authId": "6989abe492360e72d2f5ce24",
          "userName": "Walid",
          "_id": "69ad9946217e29793a8446ee"
        },
        {
          "name": "ƬFㅤ戈ㅤRTYAD⸙",
          "authId": "69725a2bc0d7763e622a6b83",
          "userName": "shohag",
          "_id": "69ae2f1233398143506457fa"
        },
        {
          "name": "Robiul",
          "authId": "69ae61c2f249cbb6f6fb96e8",
          "userName": "Subarn",
          "_id": "69ae62c3f249cbb6f6fb9757"
        },
        {
          "name": "Ƭᴹ〆__ROBIN⁹",
          "authId": "697254e0bef833dad1328022",
          "userName": "Rusharen",
          "_id": "69aec2cc76bb59e543dc1720"
        },
        {
          "name": "♡ⓈⓄⒽⒺⓁⓇⒶⒿ모",
          "authId": "6998954b4927151340cd03d1",
          "userName": "Sohel143",
          "_id": "69aed444abf96a15fc5e132b"
        },
        {
          "name": "ᵀᴳ〆ABIR★모",
          "authId": "697a345e0452b84eb6eb2603",
          "userName": "ABIR",
          "_id": "69aee616af11575f780cfb6e"
        },
        {
          "name": "Ꮐꪝㅤᴍɪɴʜꫝꜱㅤ⸙",
          "authId": "697b31d074fdf6ed469b3970",
          "userName": "mim",
          "_id": "69af81c9db5d2f05cb8ff482"
        },
        {
          "name": "RFSㅤGHOST",
          "authId": "69aff42effb5d9b6bf21ecba",
          "userName": "Hasanahmed",
          "_id": "69aff454f60c792dafd241f4"
        },
        {
          "name": "×͜×<ＴＥＲＲＯＲ>亗",
          "authId": "69af96b33a0562775f063a0a",
          "userName": "repon2026",
          "_id": "69affc820007362be90b984a"
        },
        {
          "name": "ᴺᴳ᭄FOYSAL࿐",
          "authId": "69a623250e96fbb8e2d3a0ff",
          "userName": "Foysal",
          "_id": "69b040c69e387b8b161bc461"
        },
        {
          "name": "Ꭾʀ!ᴍᴇZᴇʀᴏꪎ࿐.",
          "authId": "697590602327d9f6a665bae4",
          "userName": "fahimmahamud",
          "_id": "69b048ab5b1ce5e8fb2e5ba8"
        },
        {
          "name": "⸙ Z X 4 4 4",
          "authId": "6988b81a79d70f26ecbe74f4",
          "userName": "Abdulla9t2",
          "_id": "69b0495e5b1ce5e8fb2e5c31"
        },
        {
          "name": "Ꮋꫝ𝙵ᏆᏃՄᏞᏞꫝᎻ",
          "authId": "697b7cb43579773297dbc3d3",
          "userName": "MDHafizullah",
          "_id": "69b062fcaca1db373070cebd"
        },
        {
          "name": "7H_S4J!M_XF",
          "authId": "6985aed7648a5c1485d07e32",
          "userName": "MDSAJIM",
          "_id": "69b0d34250caf3333a322012"
        },
        {
          "name": "ᴴ⁴ˣܔᏒᴀꜰɪ→ᥫ᭡",
          "authId": "6976057a85c86826ba101185",
          "userName": "Rafikhanrafikhan",
          "_id": "69b0ee1790cf693962d2ef38"
        },
        {
          "name": "BTX✓Mojahid",
          "authId": "6979fd103588eb5c823856b6",
          "userName": "Mojahid",
          "_id": "69b0f654fa6466d3d90850df"
        },
        {
          "name": "RBE-BULLET",
          "authId": "6991c1f30d3e1afcbd970c74",
          "userName": "Sadik",
          "_id": "69b11cdae81a760dea74182c"
        },
        {
          "name": "SyamWat2251P",
          "authId": "6919ce43882230c672731482",
          "userName": "RHKSagor",
          "_id": "69b146e2f06505a89d95a6ae"
        }
      ],
      "createdAt": "2026-02-13T17:33:13.180Z",
      "updatedAt": "2026-02-13T17:33:13.180Z",
      "serialNumber": 6132,
      "__v": 51,
      "priseDetails": []
    }]
    

    return new Response(JSON.stringify({ message: "Success", data: match }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch match",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
