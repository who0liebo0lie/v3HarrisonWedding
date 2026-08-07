# Future live-data plan
The prototype stores name entry and RSVP submissions in the visitor's browser with `localStorage` so it works immediately on GitHub Pages.

For production, replace the localStorage save in `assets/js/rsvp.js` with a POST request to Google Apps Script, Supabase, Firebase, or another database.

Recommended collections:
- `guest_access`: first_name, last_name, opened_at, invitation_id
- `rsvps`: household_id, guest_name, event, response, submitted_at
- `bingo_facts`: guest_id, fact, approved, randomized_board_ids
- `pickleball_players`: guest_id, partner_name, team_name, status

The Bingo and Pickleball pages include clearly marked containers ready to populate from those collections. Never put private contact data in public JSON files.
