# Verkefni 10

Útfæra skal reiknileik sem byggir á verkefni 7. Notast við öll þau tól sem við höfum séð í vetur. Allt útlit er gefið með sass ásamt viðeigandi HTML. Leyfilegt er að breyta út af því sem gefið er.

Dæmi um virkni er gefin í `demo.mp4`.

## Leikur

Þegar smellt er á `Byrja leik` er settur af stað niðurteljari sem telur niður í 10 sekúndur. Á meðan er notanda birt dæmi fengin úr `lib/question.js`. Fyrir hvert svar er nýtt dæmi birt. Heildarfjöldi dæma ásamt fjölda réttra dæma er talin og þegar tími rennur út eru þær upplýsingar birtar ásamt stigum.

Gefinn er grunnur að leik í `lib/game.js`. Virkni til að útbúa spurningu er gefin í `lib/question.js`. Hjálparföll eru gefin í `lib/helpers.js`.

## Stigatafla

Stigatafla byrjar tóm. Eftir að fyrsta skráning kemur er skilaboðum um að engin stig séu skráð fjarlægð og stigatafla birt. Undir stigatöflu sem ekki er tóm er takki sem leyfir að fjarlægja allar færslur úr stigatöflu. Þegar búið er að spila leik skal reikna út stig (þessi formúla var afskaplega sniðug síðla kvölds í nóvember en hefur vankanta sem komu snemma í ljós, leyfilegt er að bæta, endilega bætið):

```math
correct := fjöldi réttra svara
total := fjöldi spurninga
time := lengd leiks í sekúndum

score := ((correct / total)^2 + correct) * total / time
```

`score` er síðan námundað og margfaldað með `100`.

Allar færslur í stigatöflu skal geyma í `localStorage`.

Gefinn er grunnur að stigatöflu í `lib/highscore.js` ásamt virkni til að vista stig í `lib/storage.js`.

## Tól og grunnkóði

Í verkefninu eru eftirfarandi tól uppsett:

* rollup til að pakka kóða
* babel til að transpilea kóða og gera aðgengilegri fyrir fleiri vafra
* node-sass fyrir Sass
* eslint fyrir lint á JavaScript
* stylelint fyrir lint á Sass
* browser-sync til að keyra verkefni

```bash
> npm install
> npm test -s
# Upp koma villur
> npm run dev
# Vefþjónn keyrir á localhost:3000
```

Allur grunnkóði er undir `src/` en þýddur kóði undir `dist/`. `index.html` vísar rétt í þýddar skrár.

Í gefnum kóða eru föll með athugasemdum. Leyfilegt er að breyta að öllu leiti.

`game.js` byggir á að nota aðeins módúl en `highscore.js` að nota klasa.

## Mat

* 10% – Snyrtilegur kóði, engar villur þegar `npm test` er keyrt
* 50% – Spila leik og sjá niðurstöður eftir leik
* 20% – Vista niðurstöður í stigatöflu
* 20% – Hlaða inn stigatöflu og hreinsa stigatöflu

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 12. nóvember 2018.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags þriðjudaginn 20. nóvember 2018.

Skilaboð skulu innihalda:

* Slóð á verkefni á heimasvæði
* Slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)). Notendanöfn þeirra eru `arnar44`, `mimiqkz`, `gorri4`, `hinriksnaer`, `gunkol`, `freyrdanielsson`, `osk`

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 3,5% hvert, samtals 28% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 11%, samtals 22% af lokaeinkunn.

---

> Útgáfa 0.1
