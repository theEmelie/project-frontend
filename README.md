### To run the project you need to do the following:

### `npm install`
Install npm modules.

### `npm start`
Run the application in developer mode.

### `npm run build`
Build the app for production to the `build` map.


### Frontend
I våran frontend vill vi använda alla funktioner som vi gjort i backenden. Vi börjar med att sätta upp våran 'app.js' i den kommer alla våra routrar vara, vi kollar även om användaren är inloggad eller inte, är den det så ändrar vi våra länkar till 'logga ut' och 'depå' och är vi inte inloggade så är länkarna 'logga in' och 'registrering'.
Den sista länken 'webbshop' och 'hem'. Alla dessa routrar länkar till olika filer som finns under src/components/.


`Homepage`
Första sidan utav hemsidan är väldigt enkel, den hämtar data ifrån våran backend med hjälp utav react hooks. Sedan skriver vi ut meddelandet i en p tag och vi lägger även till lite bilder.

`Forms`
Här ska vi skapa vårat registreringsformulär, det är en ganska stor fil, men mycket utav det har med vårat egengjorda datePicker att göra. Vi har fyra olika funktioner som i princip gör samma sak, men med olika fält (email, pass, name, date), och dom här funktionerna anropas i vårat formulär längst ner i filen. Och det vi gör är att kolla om fälten är giltiga, och är dom det så uppdaterar vi staten på dom. Vi har även funktioner för att kolla om dessa fält är giltiga med hjälp utav regex förutom lösenordet där det enda vi vill är att det är 6 karaktärer eller mer. Sedan när man skriver in all info i vårat formulär och trycker på registrera knappen så skickat vi en fetch till våran backend, vi sparar all data och skickat användaren vidare till logga in sidan.

`Login/Logout`
Det vi gör för att användaren ska kunna logga in är ett formulär, där man anger e-post och lösenord. Vi sparar staten utav dom fälten i en fieldChange funktion. När användaren trycker på logga in knappen så gör vi en fetch på våran backend och när vi har fått tillbaka svaren så kallar vi på funktionen 'handleLoginResponse' som tar svaren och kollar om dom matchar databasen dvs. om användaren finns eller inte, är allt ok så skickar vi användaren till framsidan, annars kommer en ruta upp som säger att det är fel inloggningsuppgifter.

För att logga ut så behöver vi endast göra en clear på sessionStorage.

`Webbshop`
I våran webbshop börjar vi först att kolla om det finns en token i sessionStorage, gör det inte det så skickar vi användaren till logga in sidan, annars får användaren vara kvar. Det betyder att man måste vara inloggad för att se våran webbshop och det är mest för att förenkla köp funktionen. Vi vill börja med att hämta alla våra objekti funktionen 'getObject' som vi kallar i våran constructor så det skrivs ut direkt. Det gör vi med hjälp utav en fetch på 'view-objects' och vi sparar svaret ifrån fetchen i funktionen saveObjectData och i den har vi en setState på alla våra objekt, så när vi senare lägger in vårat dynamiska pris så kommer det uppdateras hela tiden på sidan. Vi använder oss utav en tabell för att visa alla objekt och en knapp för att köpa ett objekt, trycker man på knappen så kallas 'buyButtonClicked' funktionen och vi börjar med att kolla att vi har köpt mer än en styck. Har vi det så gör vi en fetch på 'buy-object' och vi skickar svaret till funktionen 'handleBuyResponse' som tar emot all data och skriver ut hur mycket vi har köpt av objektet, eller har användaren inte tillräckligt med medel så skriver vi ut det.

`Depot`
I vårat depot vill vi visa användarens medel och hur många objekt dom har utav varje produkt, och även kunna sälja objekt. Precis som i webbshoppen börjar vi med att kolla om användaren är inloggad eller inte, användaren kan endast se sidan om den är inloggad. Vi börjar med att hämta alla objekt i vårat depot genom att göra en fetch på 'view-depot' i funktionen 'getObject' som vi kallar i våran constructor så det skrivs ut direkt. Och vi sparar svaret från våran fetch i 'saveObjectData' och där sparar vi antal medel vi har, våran namn och om ett objekt existerar eller inte i vårat depå. Och vi lägger dom i setState så att det uppdateras varje gång vi köper/säljer/lägger till medel osv.

För att lägga till medel har vi ett input fält som sparar datan till 'fundChange' som sparar det till 'funds' och sedan när man trycker på knappen 'Lägg till medel' så kallar vi på funktionen 'handleAddFunds' som gör en fetch på 'add-funds' som sedan skickar datan till 'handleAddFundsResponse' som uppdaterar vårat medel med hjälp utav setState.

För att kunna sälja ett objekt gör vi ganska likt Webbshop, vi skapar en tabell där vi visar alla objekt som vi äger och antalet. Och sedan har vi en sälj knapp. Man anger antalet man vill sälja i ett input fält. När man trycker på knappen för att sälja så kallar vi på 'sellButtonClicked' funktionen som gör en fetch på 'sell-object' (vi kollar först att användaren har sålt mer än 1st) och vi sparar svaret till 'handleSellResponse' som tar emot all data och uppdaterar våra fält och ger användaren ett meddelande om hur mycket dom har sålt och vad dom har tjänat. Om dom inte har tillräckligt att sälja så kommer ett felmeddelande upp.

### Realtid
Vi vill implementera våran backend socket till vårat frontend, vi kommer uppdatera både depåt och webbshoppen, våran webbshop kommer även få en graf för att se prisförändringarna.

`Depot`
Vi skapar funktionen 'componentDidMount' vilket är en inbyggd livscykel i react. Den kallas en gång, innan render. Vi börjar med att hämta våran socket ifrån backend. Och sedan gör vi en 'socket.on' på 'newPrices' som är sparat i backenden och tar hand om det nya priset av objektet. Sedan kollar vi om objektet finns i vårat depå, gör den det så uppdaterar vi priset på objektet varje gång det ändras. Sedan använder vi den andra inbyggda livscykeln 'ComponentWillUnmount' vilket kallas när en komponent inte är behövt vilket i vårat fall är när vi går ifrån sidan, och då stänger vi våran socket.

`Webbshop`
Vi skapar de två funktionerna som vi använde i depot. För att uppdatera priset i tabellen gör vi samma som i depåt, men här vill vi också rita ut en graf som visar hur priset har ändrats sen vi kom till sidan. För att göra detta har jag valt att använda mig utav chart.js, jag försökte på mig en den andra grafer men som jag inte fick att fungera korrekt. I chart behöver vi 'labels' och 'datasets'. Utanför våran klass skapar vi en global variabel 'graphData' som är ett tomt objekt och den kommer användas till att lägga 'labels' och 'datasets' i. och även 'xVal' som vi initierar till 0. Sedan i 'componentDidMount' så börjar vi med att sätta ett 'maxValues' till 30, det betyder att våran graf kommer visa dom 30 senaste ändringarna. Sedan gör vi en push på 'graphData.labels' till 'xVal'. Och vi kollar om 'labels' är större än 'maxValues' och är den det så gör vi en shift, vilket betyder att vi tar bort det första elementet i labels. Efter det gör vi likadant med datasets men det måste vi göra inuti en foreach loop så at alla objekt är med. Och vi öker 'xVal' varje gång våran socket uppdateras (allt detta är inuti våran 'socket.on') Vi gör även en setState på 'shouldRedraw: true' vilket är för att grafen ska uppdateras varje gång ny data kommer in.

Sedan i våran funktion 'saveObjectData' vilket kallas när vi hämtar alla objekt så vill vi skriva ut våran graf, vi sätter datasets  till en tom array och vi sätter colours till 5 olika färger. Sedan gör vi en loop på svaret vi får ifrån våran fetch och för varje objekt så ger vi dom egenskaper såsom label vilket vi sätter till dess namn (object.name) och data är det nuvarande priset. Sedan gör vi en push på 'datasets' Och i våran tidigare 'graphData' så sätter vi 'labels' och 'datasets'. Och för att skriva ut grafen så gör vi '<Line data={graphData}' under våran objekt tabell.
