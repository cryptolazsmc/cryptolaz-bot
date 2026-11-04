# CryptoLaz-bot — referral landing (LIVE)

**Public landing:** https://cryptolaz-bot.cryptolaz.workers.dev/
**Guide (the text users paste into their Muse):** https://cryptolaz-bot.cryptolaz.workers.dev/steps
**GitHub Pages mirror (same site files, once Pages is enabled):** https://cryptolazsmc.github.io/cryptolaz-bot/

## How referrals work (for Aura / ReferralCode wiring)

1. A visitor registers on the landing with their email and gets a personal
   referral code `CL-XXXXXXXX` and a share link:
   `https://cryptolaz-bot.cryptolaz.workers.dev/?ref=CL-XXXXXXXX`
2. Anyone arriving through that link is attributed to the code: the landing
   shows the invite, "Get Muse" clicks (`/go/muse`) and guide copies /
   downloads (`/steps`, `/dl`) are counted against the referrer.
3. Re-registering with the same email returns the same code (idempotent).
4. Codes match `^CL-[A-Z2-7]{8}$`. Stats are admin-only (`/api/stats`,
   requires the `ADMIN_TOKEN` Worker secret; 404 until it is set).

## The guide

Paper practice only — basic Dip/Rip — Solana (SOL) only. No real money, no
wallet, no live trading. The user copies the guide into a NEW Muse chat and
their Muse walks them through the practice step by step (paper notebook,
their own stated rules, paper entries/exits, discipline review).

Version of record: `guide/CryptoLaz-bot-muse-steps.txt` in the Sentinel
workspace; the Worker serves it byte-identically at `/steps` and `/dl`.
Verified live 2026-11-04 (93/93 differential tests vs the reference backend;
live register → code → tracked Muse click → guide fetch all PASS).

Status: published by owner order 2026-11-04.
