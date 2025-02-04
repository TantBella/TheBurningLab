# Labb 2 Webbutveckling
I denna uppgift skall ni skapa två stycken API som ”pratar” med varandra.
Ett Express API och ett .NET API som ligger hostat på Azure.
Ert .NET API skall prata med databasen och ert node API skall kunna
hämta och visa upp informationen som finns tillgängligt i databasen
genom att göra requests. Skapa gärna en databas med information som
kan komma till nytta.

## API med .NET:
### Ni skall skapa ett API med .NET som ligger uppe på Azure
• SwaggerUI skall finnas med
• Använd .NET7
• Skapa minimal API som är kopplad till en databas med EF
• Ert API skall kunna göra CRUD requests till datbasen
## Express API:
### Ni skall skapa ett API med express och Nodejs.
• Skapa ett express api med node
• Ett request som retunerar någon sorts av JSON data
• Någon sorts grundläggande UI
• Skapa en endpoint som hämtar tillgänglig data ifrån .net API
• Skapa en endpoint som lägger till information i vårt .net API
