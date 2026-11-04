(function () {
  "use strict";
  var CFG = window.CRYPTOLAZ_CONFIG || {};
  var API = CFG.API_BASE || "";
  var CODE_RE = /^CL-[A-Z2-7]{8}$/;
  var $ = function (id) { return document.getElementById(id); };

  // ?ref=CODE from the share link (kept in sessionStorage so a reload keeps it)
  var ref = (new URLSearchParams(location.search).get("ref") || "").toUpperCase();
  if (CODE_RE.test(ref)) { try { sessionStorage.setItem("cl_ref", ref); } catch (e) {} }
  else { try { ref = sessionStorage.getItem("cl_ref") || ""; } catch (e) { ref = ""; } }
  if (!CODE_RE.test(ref)) ref = "";
  var q = ref ? "?ref=" + encodeURIComponent(ref) : "";

  if (ref) { $("invited").hidden = false; $("invited").textContent = "You were invited with link " + ref + "."; }

  // Step 1: all clicks go through the backend so they are counted with the ref
  $("getmuse").href = API + "/go/muse" + q;
  if (CFG.MUSE_INVITE_CODE) { $("invite").hidden = false; $("invitecode").textContent = CFG.MUSE_INVITE_CODE; }
  // Invites-left counter: null/undefined = hidden, 0 = full, N = "Muse invites left: N"
  var left = CFG.MUSE_INVITES_LEFT;
  if (CFG.MUSE_INVITE_CODE && typeof left === "number" && left >= 0) {
    var il = $("invitesleft"); il.hidden = false;
    if (left === 0) { il.textContent = "Code full - check back soon"; il.className = "left full"; $("redeembody").hidden = true; }
    else { il.textContent = "Muse invites left: " + left; }
  }
  $("copycode").addEventListener("click", function () {
    var c = CFG.MUSE_INVITE_CODE, m = $("codemsg");
    var done = function () { m.className = "msg"; m.textContent = " Copied " + c + "!"; };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(c).then(done, fail); } else { fail(); }
    function fail() {
      var ta = document.createElement("textarea"); ta.value = c; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { m.className = "msg err"; m.textContent = " Could not copy. Code: " + c; }
      document.body.removeChild(ta);
    }
  });

  // Step 2: copy the message (fetching it logs "steps_copy"); file download logs "steps_download"
  $("dl").href = API + "/dl" + q;
  $("copysteps").addEventListener("click", function () {
    var m = $("copymsg"); m.className = "msg"; m.textContent = "Getting it…";
    fetch(API + "/steps" + q).then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) {
        if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
        var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
      })
      .then(function () { m.textContent = "Copied! Now open a new chat in Muse and paste."; })
      .catch(function () { m.className = "msg err"; m.textContent = "Could not copy. Use the download link instead."; });
  });

  // Own share link
  $("regform").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var msg = $("msg"); msg.className = "msg"; msg.textContent = "Working…";
    var payload = { email: $("email").value };
    var hv = $("handle").value.trim();
    if (hv) { payload.handle = hv; payload.handle_consent = $("consent").checked; }  // blank = leave stored handle unchanged
    fetch(API + "/api/register", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) { msg.className = "msg err"; msg.textContent = res.j.error || "Something went wrong."; return; }
        var link = res.j.link;
        if (link.charAt(0) === "/") link = location.origin + link;
        $("code").textContent = res.j.code; $("link").value = link; $("result").hidden = false;
        msg.textContent = res.j.created ? "Your link is ready." : "Welcome back. Same code as before.";
      }).catch(function () { msg.className = "msg err"; msg.textContent = "Could not reach the server. Try again later."; });
  });

  $("copy").addEventListener("click", function () {
    var el = $("link"); el.select();
    if (navigator.clipboard) navigator.clipboard.writeText(el.value); else document.execCommand("copy");
    $("msg").textContent = "Copied.";
  });
})();
