// API_BASE: where the referral backend lives.
//   ""  -> same origin (the backend serves this site too; default)
//   "https://refs.example.com" -> if these static files sit on GitHub Pages and the backend is elsewhere
// MUSE_INVITE_CODE: the owner's Muse invite code (shown in step 1 with a copy button; "" hides the box).
// MUSE_INVITES_LEFT: number the owner updates by hand. null = hide the counter; 0 = "Code full - check back soon".
window.CRYPTOLAZ_CONFIG = { API_BASE: "https://cryptolaz-bot.cryptolaz.workers.dev", MUSE_INVITE_CODE: "OPKX8W", MUSE_INVITES_LEFT: 24 };
