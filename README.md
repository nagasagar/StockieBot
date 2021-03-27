# Stockie-Bot
Discord bot for accessing Google Sheets.
It is used to keep record of stocks with entry limits and exit criteria.

## stockie 
- used to track current holdings. 
- alerts are sent on reaching target (code to send alerts is in gsheet , using webhooks)
## watchie 
- used to track stocks which we want to enter. 
- alerts are sent when price reaches entry range (code to send alerts is in gsheet , using webhooks)

#### Commands:
- "stockie add [stock_ticker] [entry_limit] [target]"
- "stockie edit [stock_ticker] [entry_limit] [target]" 
- "stockie remove [stock_ticker]"
- "stockie get [stock_ticker] [result_size]"
- "stockie status [stock_ticker] [HOLDING / SOLD]"
- "stockie suggestor [stock_ticker] [suggestor_name]"
- "stockie note [stock_ticker] [stock_note]"

all command syntax are same for watchie.


