# Oraluxe booking automation (n8n)

The website's booking form posts to an n8n webhook. n8n checks the enquiry, logs it to a Google Sheet and emails the clinic.

## Flow (built so far)
1. **Booking form webhook**: `POST /webhook/oraluxe-booking`
2. **Tidy and check enquiry**: trims the data, adds an ID (`ENQ-...`), re-checks every field
3. **Is the enquiry valid?**: invalid enquiries get a 400 reply and nothing else
4. **Log to Google Sheet**: appends a row to "Oraluxe enquiries"
5. **Alert the clinic by Gmail**: subject starts with URGENT when the treatment is Emergency Care
6. **Reply to website**: `{ ok, id, problems }`

The AI step (**Prepare AI request** -> **Ask Gemini** -> **Read AI result**) sits between the validity check and the Sheet. Gemini (`gemini-3.5-flash-lite`, free tier) sorts the enquiry (emergency / routine / cosmetic / general question), writes a one-line summary and drafts a reply. The draft goes into the clinic email for review and is **not** sent to the patient. If Gemini fails, simple rules take over so nothing is lost.

## Run it locally
From this folder (keep the n8n data inside the project, never in the user folder):

```bash
export N8N_USER_FOLDER="$(pwd)/n8n-data" N8N_DIAGNOSTICS_ENABLED=false
npx --yes n8n@2.42.6 start        # editor at http://localhost:5678
```

Two copies of the workflow live here:
- `oraluxe-booking-workflow.json` is the **public** copy with placeholders (`YOUR_GOOGLE_SHEET_ID`, `clinic@example.com`, credential IDs). To reuse it, import it into n8n, pick your own Google/Gemini credentials in the nodes, and fill in the placeholders.
- `oraluxe-booking-workflow.local.json` is the real working copy and is **not committed** (it is git-ignored).

Update the local n8n from the real copy (stop n8n first for the CLI route):

```bash
n8n import:workflow --input=oraluxe-booking-workflow.local.json
n8n publish:workflow --id=k1aAkOAuy017PRDO
```

Then restart n8n. After a restart, send one test request before trusting it.

## Google connection
- A separate demo Gmail account sends and receives the alerts.
- Gmail and Google Sheets OAuth2 credentials, made from a Google Cloud project "Oraluxe n8n" (consent screen in **Testing** mode).
- In Testing mode the Google sign-in expires after about 7 days. Fix: open the credential in n8n and click **Sign in with Google** again.

## Never commit
`n8n-data/` holds the saved Google logins. It is excluded by `automation/.gitignore`.
