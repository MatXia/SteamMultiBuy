# SteamMultiBuy
A website for opening a purchase page for all trading cards on Steam for a specific game.
## How does it work?
When you visit the website, you enter the Steam Game ID in the input field.

After clicking the button, the site sends a request to Steam’s Market search API to retrieve the full list of trading cards available for that specific game.

Once the data is received:

- The system filters the cards based on your selected type (Normal or Foil).
- It removes unnecessary items and keeps only the matching trading cards.
- Then it automatically generates a Steam multi-buy link containing all selected cards.
- Finally, you are redirected to the Steam Market purchase page where all selected cards are pre-filled and ready for checkout.
## Sources
favicon.ico: https://www.flaticon.com/free-icon/shopping-bag_3868728?term=bag&page=1&position=21&origin=search&related_id=3868728

index.html, script.js, styles.css: ChatGPT because I'm a lazy ass, but I researched requests for a steam myself.