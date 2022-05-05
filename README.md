PG6301 Eksamen - Nyhetsside

https://eksamen-pg6301-nyhetsside.herokuapp.com
https://github.com/Ollybolli/PG6301-Eksamen-V-22

Hei, hatt mye problemer med heroku gjennom eksamen, tilbrakte mye av tiden på bugfikses,
men klarte ikke å få profil siden til å fungere på heroku, appen klikker når man trykker seg inn på profilsiden,
selvom alt dette fungerer på den lokale react appen. Valgte å prioritere å dekke de fleste kravene.
Har av den grunn ikke rukket å "designe" websiden noe særlig i css, og mangler noe av funksjonaliteten som var ønsket.



# PG6301 eksamen <Nyheter Database>

[Heroku] https://eksamen-pg6301-nyhetsside.herokuapp.com
[Github] https://github.com/Ollybolli/PG6301-Eksamen-V-22

## Tips

* Bruk versjoner av alle dependencies som vi brukte på forelesningene. Det skjer hele tiden endringer i JavaScript-land og noen ganger vil siste versjon oppføre seg forskjellig - ikke kast bort verdifull eksamenstid. Du kan kopiere package.json fra innlevering eller en øving
* Spesielt: React 18 kom i løpet av semesteret. Alt vi har vist er på React 17. Kjør på React 17 nå med mindre du har brukt en del tid på versjon 18 den siste måneden. Det er vesentlige problemer!
* Start med å løse det kritiske: Deployment til Heroku
* Ikke bli sittende med ting du ikke får til mens det er enklere ting du kunne ha gjort. Spesielt tester har overraskende mye vrient med seg. Legg det til siden og løs andre ting om du har problemer
* Les de funksjonelle kravene grundig og test at løsningen din oppfyller dem
* Les læringsmålene beskrevet i eksamensteksten grundig og sjekk at løsningen din demonstrere at du behersker disse

Dette er versjonene vi brukte under forelesningene om som er validert som ok:

```
"jest": "^27.5.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^6.2.2"
```


## Egenutfylling av funksjonelle krav

* [ ] Anonyme brukere skal se nyhetsaker når de kommer til nettsiden. Legg inn noen nyhetssaker for å demonstrere*
    * *Man får nyhetsaker ved å trykke på liste over nyheter knappen*
* [ ] *Når en ny sak publiseres, skal alle brukerne få se den nye saken umiddelbart. Bruk websockets for å sende oppdateringer*
    * *Jeg rakk ikke å implementere websockets*
* [ ] *Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre
  mekanismer er også akseptabelt*
    * *Bruker kan logge seg inn via google*
* [ ] *En bruker som er logget inn kan se på sin profilside (userinfo fra Google)*
    * *Det er en egen profilside brukeren kan klikke seg inn på for å få frem userinfo fra google. Dette fungerer merkelig nok ikke i heroku appen, men det fungerer lokalt.*
* [ ] *Brukere skal forbli logget inn når de refresher websiden*
    * *Det fungerer som det skal*
* [ ] *En bruker som er logget inn kan klikke på en nyhetssak for å se detaljene om nyhetssaken. Detaljene skal inkludere en
  nyhetskategori, overskrift, tekst og navn på den som publiserte den*
    * *Man ser alle nyhetssakene på den ene siden, jeg misforsto oppgaven litt, og lagde en egen side for nyhetsartiklene.
  Nyhetsartiklene inkluderer en overskrift/tittel, artikkeltekst og "author". Her mangler jeg nyhetskategori.
* [ ] *"Redaksjonelle brukere" kan logge seg inn med Active Directory. Det må fungere å logge seg inn med en Active Directory
  på skolens AD ( domain_hint=egms.no )*
    * *Jeg klarte dessverre ikke å lage flere forskjellige brukere.*
* [ ] * Redaksjonelle brukere kan publisere nye nyhetsartikler*
    * *Siden jeg ikke klarte å lage flere brukere, prøvde jeg å la alle ha muligheten for å publisere nyhetsartikler
    men jeg slet veldig med å implementere dette, ettersom jeg henter nyhetsartiklene fra mongodb. Derfor fungerer det ikke å publisere nyhetsartikler.
* [ ] * Nyhetsartikkel skal inneholde en kategori valgt fra en nedtrekksliste ( <select> ), tittel ( <input> ) og tekst ( <textarea> )*
    * *Nyhetsartiklene inneholder alt unntatt kategorien, som nevnt tidligere*
* [ ] *Dersom noen allerede har publisert en nyhetsartikkel med samme tittel skal serveren sende HTTP status kode 400 og en
  feilmelding*
    * *Går som sagt ikke ann å publisere nyhetsartikler*
* [ ] * Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler kategori, tittel eller tekst*
    * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [ ] *Fungerer veldig godt, ettersom det ikke er mulig å publisere artikler*
    * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [ ] * En redaksjonell bruker skal kunne redigere en artikkel de selv har publisert*
    * *---/---*



## Egenutfylling av tekniske krav

* [ ] Oppsett av package.json, parcel, express, prettier
    * *Alt dette er implementert ordentlig*
* [ ] React Router
    * *Gikk velidg fint å implementere*
* [ ] Express app
    * *Fungerer som det skal*
* [ ] Kommunikasjon mellom frontend (React) og backend (Express)
    * *Fungerer greit*
* [ ] Deployment til Heroku
    * *Alt fungerer som det skal, unntatt profilsiden, denne fungerer ikke i heroku og crasher appen hvis man trykker på den.
  Men i den lokale react appen fungerer profilsiden som den skal. Prøvde å bugfixe i timesvis, men ble ikke noe klokere.
* [ ] Bruk av MongoDB
    * *Fungerte bra, nyhetsartiklene er fra laget i MongoDB*
* [ ] OpenID Connect
    * *Fungerer fint, man logger seg in med Google ved å trykke på Login knappen *
* [ ] Web Sockets
    * *Jeg rakk ikke å starte med Web Sockets*
* [ ] Jest med dokumentert testdekning
    * *Jeg rakk heller ikke å begynne med Jest testdekning*