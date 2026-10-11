---
title: "Polityka prywatności"
description: "Zasady przetwarzania danych osobowych w serwisie Mateusza Muszarskiego: formularz kontaktowy, dzienniki serwera, statystyki bez plików cookie i prawa Użytkownika."
version: "1.0"
updated: 2026-10-05
---

## 1. Postanowienia ogólne

1. Niniejsza polityka prywatności (dalej: „Polityka”) określa zasady przetwarzania danych osobowych w związku z korzystaniem z serwisu internetowego dostępnego pod adresem [[SITE_URL]], we wszystkich jego wersjach językowych (dalej: „Serwis”). Polityka stanowi wykonanie obowiązków informacyjnych, o których mowa w art. 13 RODO oraz w art. 399 ust. 1 pkt 1 PKE.
2. Użyte w Polityce określenia oznaczają:
   1) **RODO**: rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) (Dz. Urz. UE L 119 z 4.05.2016, str. 1);
   2) **PKE**: ustawę z dnia 12 lipca 2024 r. - Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221, ze zm.);
   3) **Użytkownik**: osobę fizyczną korzystającą z Serwisu.
3. Serwis nie jest skierowany do dzieci.
4. Administrator stosuje środki, o których mowa w art. 32 RODO, w tym szyfrowanie transmisji danych między przeglądarką Użytkownika a Serwisem (HTTPS).

## 2. Administrator danych

1. Administratorem danych osobowych jest Mateusz Muszarski, osoba fizyczna (Polska), adres e-mail: [[EMAIL]] (dalej: „Administrator”).
2. Administrator nie wyznaczył inspektora ochrony danych, ponieważ nie jest do tego zobowiązany na podstawie art. 37 ust. 1 RODO. We wszystkich sprawach dotyczących danych osobowych należy kontaktować się z Administratorem na adresy wskazane w ust. 1.

## 3. Cele, podstawy prawne i okresy przechowywania

| Cel | Podstawa prawna i prawnie uzasadniony interes | Okres przechowywania |
| --- | --- | --- |
| Dostarczanie Serwisu i zapewnienie jego bezpieczeństwa (pkt 4) | art. 6 ust. 1 lit. f RODO: bezpieczeństwo sieci i informacji oraz prawidłowe działanie Serwisu (motyw 49 RODO) | okres określony przez Vercel dla planu Administratora; w dniu sporządzenia Polityki dzienniki wykonania funkcji serwerowych: 1 dzień |
| Odpowiedź na wiadomość z formularza kontaktowego (pkt 5) | art. 6 ust. 1 lit. f RODO: udzielanie odpowiedzi na kierowane zapytania; art. 6 ust. 1 lit. b RODO, gdy wiadomość dotyczy zatrudnienia albo projektu (działania na żądanie Użytkownika przed zawarciem umowy) | czas obsługi sprawy, a następnie nie dłużej niż 12 miesięcy od ostatniej wiadomości; w usłudze EmailJS: do 30 dni |
| Ochrona formularza przed spamem i nadużyciami (pkt 5 i 6) | art. 6 ust. 1 lit. f RODO: ochrona formularza przed zautomatyzowanymi nadużyciami | adres IP: przez czas niezbędny do stosowania limitu wiadomości; dane Turnstile: zgodnie z zasadami Cloudflare |
| Statystyki odwiedzin (pkt 7) | art. 6 ust. 1 lit. f RODO: poznanie sposobu korzystania z Serwisu; art. 399 PKE w zakresie, w jakim ma zastosowanie | 6 miesięcy |
| Ustalenie, dochodzenie lub obrona roszczeń | art. 6 ust. 1 lit. f RODO: ochrona praw Administratora | do upływu terminu przedawnienia roszczeń |

## 4. Hosting i dzienniki serwera

1. Serwis jest utrzymywany na infrastrukturze Vercel Inc. (Stany Zjednoczone). Strony są dostarczane przez globalną sieć dostarczania treści (CDN) Vercel, co do zasady z lokalizacji najbliższej Użytkownikowi. Funkcja serwerowa obsługująca formularz kontaktowy działa w regionie Unii Europejskiej (Frankfurt nad Menem, Niemcy).
2. Przy wyświetleniu strony w dziennikach serwera zapisywane są: adres IP, data i czas żądania, ścieżka żądanego zasobu, adres strony odsyłającej (referrer) oraz identyfikator przeglądarki (user agent).
3. W zakresie danych generowanych przez usługę (dane o korzystaniu z usługi i metadane) Vercel Inc. jest odrębnym administratorem i przetwarza je na zasadach określonych w [polityce prywatności Vercel](https://vercel.com/legal/privacy-policy).

## 5. Formularz kontaktowy

1. Formularz kontaktowy zawiera pola: treść wiadomości (obowiązkowe); dane do odpowiedzi, tj. adres e-mail, numer telefonu albo adres profilu w serwisie LinkedIn, według wyboru Użytkownika (obowiązkowe); temat: praca, projekt albo pytanie (nieobowiązkowe).
2. Przy wysyłaniu wiadomości funkcja serwerowa przetwarza ponadto adres IP nadawcy w celu ograniczenia liczby wiadomości wysyłanych z jednego adresu (rate limiting).
3. Wiadomość jest doręczana pocztą elektroniczną za pośrednictwem usługi EmailJS, świadczonej przez EmailJS Pte. Ltd. (Singapur), której serwery znajdują się w Stanach Zjednoczonych, do skrzynki pocztowej Administratora prowadzonej przez [[MAILBOX_PROVIDER]].
4. Administrator odpowiada za pośrednictwem kanału wskazanego przez Użytkownika. W przypadku profilu LinkedIn korespondencja odbywa się w tym serwisie, którego operator jest odrębnym administratorem.
5. W wiadomości nie należy przekazywać danych szczególnych kategorii (art. 9 ust. 1 RODO) ani zbędnych danych osób trzecich.
6. Z Administratorem można kontaktować się także bezpośrednio pod adresem e-mail [[EMAIL]].

## 6. Ochrona formularza (Cloudflare Turnstile)

1. Formularz kontaktowy jest chroniony usługą Cloudflare Turnstile, świadczoną przez Cloudflare, Inc. (Stany Zjednoczone). Turnstile jest ładowany wyłącznie wtedy, gdy Użytkownik rozpocznie korzystanie z formularza.
2. Cloudflare przetwarza adres IP, odcisk połączenia TLS (TLS fingerprint), nagłówek User-Agent, klucz witryny (sitekey) wraz z domeną oraz inne sygnały dotyczące przeglądarki i urządzenia, a także może zapisywać w przeglądarce informacje niezbędne do weryfikacji (pkt 8).
3. Cloudflare działa jako podmiot przetwarzający w zakresie ochrony Serwisu oraz jako odrębny administrator w zakresie doskonalenia wykrywania botów, na zasadach określonych w [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/) i [polityce prywatności Cloudflare](https://www.cloudflare.com/privacypolicy/).
4. Jeżeli weryfikacja nie powiedzie się, Użytkownik może skontaktować się z Administratorem pocztą elektroniczną.

## 7. Statystyki odwiedzin (Umami)

1. Serwis korzysta z usługi Umami Cloud, świadczonej przez Umami Software, Inc. (Stany Zjednoczone), z przechowywaniem danych w regionie Unii Europejskiej. Usługa nie wykorzystuje plików cookie.
2. Przetwarzane są: ścieżka odwiedzanej strony, adres strony odsyłającej, rozdzielczość ekranu, język przeglądarki, rodzaj przeglądarki, system operacyjny, rodzaj urządzenia, kraj (ustalany na podstawie adresu IP w chwili odwiedzin; adres IP nie jest przechowywany), identyfikator odwiedzającego w postaci skrótu (hash) zmienianego co miesiąc oraz zdarzenia, np. pobranie CV, wysłanie formularza kontaktowego, zmiana wersji językowej. Zdarzenia nie obejmują treści wpisywanych w formularz.
3. Administrator nie łączy identyfikatora odwiedzającego z innymi danymi, nie wykorzystuje go do ustalania tożsamości i nie profiluje Użytkowników.
4. Skrypt statystyk odczytuje z przeglądarki w szczególności rozdzielczość ekranu, język, ustawienie Do Not Track i wpis `umami.disabled`. Niniejszy punkt stanowi informację, o której mowa w art. 399 ust. 1 pkt 1 PKE; odczyt odbywa się z uwzględnieniem art. 399 PKE, w zakresie, w jakim przepis ten ma zastosowanie. Serwis nie wyświetla komunikatu (banera) dotyczącego zgody na statystyki.
5. Użytkownik może określić warunki tego dostępu (art. 399 ust. 1 pkt 1 lit. b PKE):
   1) włączając w przeglądarce sygnał Do Not Track albo Global Privacy Control; skrypt statystyk nie jest wówczas ładowany;
   2) korzystając z przełącznika na niniejszej stronie, który zapisuje wpis `umami.disabled`; skrypt nie przesyła wówczas danych;
   3) blokując skrypty w ustawieniach przeglądarki lub za pomocą rozszerzeń.

## 8. Pliki cookie i pamięć przeglądarki

1. Serwis nie wykorzystuje plików cookie. Informacje są zapisywane w pamięci przeglądarki Użytkownika wyłącznie w następujących przypadkach:

| Klucz | Kiedy jest zapisywany | Cel | Okres przechowywania |
| --- | --- | --- | --- |
| `theme` | wybór motywu kolorystycznego Papier albo Atrament | zapamiętanie motywu | do przywrócenia motywu domyślnego albo usunięcia danych witryny |
| `motion` | zatrzymanie animacji | zapamiętanie tego wyboru | do wznowienia animacji albo usunięcia danych witryny |
| `umami.disabled` | wyłączenie statystyk | zapamiętanie rezygnacji ze statystyk | do ponownego włączenia statystyk albo usunięcia danych witryny |
| dane Cloudflare Turnstile | korzystanie z formularza kontaktowego | weryfikacja antyspamowa | zgodnie z zasadami Cloudflare |

2. Wpisy `theme`, `motion` i `umami.disabled` są przechowywane w pamięci lokalnej przeglądarki (localStorage), odczytywane wyłącznie przez skrypty Serwisu w przeglądarce Użytkownika i nie są przesyłane na serwer.
3. Administrator uznaje operacje opisane w ust. 1 za konieczne do dostarczenia funkcji żądanej przez Użytkownika w rozumieniu art. 399 ust. 3 pkt 2 PKE.
4. Użytkownik może w każdej chwili usunąć te informacje w ustawieniach przeglądarki; Serwis stosuje wówczas ustawienia domyślne.

## 9. Odnośniki do serwisów zewnętrznych

1. Serwis nie osadza treści podmiotów trzecich. Czcionki i nagrania wideo są udostępniane z infrastruktury Serwisu.
2. Odnośniki do serwisów GitHub, LinkedIn, npm, Instagram, Facebook, Telegram, App Store, Google Play, Discord i Messenger są zwykłymi hiperłączami; do chwili kliknięcia żadne dane nie są przekazywane operatorom tych serwisów. Po kliknięciu operator danego serwisu przetwarza dane jako odrębny administrator, na zasadach określonych we własnej polityce prywatności.

## 10. Dane Administratora publikowane w Serwisie

1. Na stronie „Moje życie” Administrator publikuje z własnej decyzji informacje o sobie, w tym o swoich zainteresowaniach i przekonaniach religijnych, jako dane w sposób oczywisty upublicznione przez osobę, której dotyczą (art. 9 ust. 2 lit. e RODO). Strona ta nie zawiera danych osobowych osób trzecich.
2. Podmiot, który dalej przetwarza te informacje, musi posiadać własną podstawę prawną przetwarzania.

## 11. Odbiorcy danych

1. Odbiorcami danych osobowych są:

| Odbiorca i zakres | Rola | Miejsce przechowywania danych |
| --- | --- | --- |
| Vercel Inc. (Stany Zjednoczone): hosting, dzienniki serwera, obsługa formularza | podmiot przetwarzający; odrębny administrator danych generowanych przez usługę | globalna sieć CDN; funkcja formularza: UE (Frankfurt) |
| EmailJS Pte. Ltd. (Singapur), operator usługi EmailJS: doręczanie wiadomości | podmiot przetwarzający | Stany Zjednoczone |
| [[MAILBOX_PROVIDER]]: skrzynka pocztowa Administratora | podmiot przetwarzający | [[MAILBOX_LOCATION]] |
| Cloudflare, Inc. (Stany Zjednoczone): weryfikacja Turnstile | podmiot przetwarzający; odrębny administrator w zakresie doskonalenia wykrywania botów | globalna sieć Cloudflare |
| Umami Software, Inc. (Stany Zjednoczone): statystyki odwiedzin | podmiot przetwarzający | Unia Europejska |

2. Podmioty przetwarzające przetwarzają dane wyłącznie na polecenie Administratora, na podstawie umów zawartych zgodnie z art. 28 RODO.
3. Dane mogą być udostępnione organom publicznym, jeżeli obowiązek taki wynika z przepisów prawa (art. 6 ust. 1 lit. c RODO).

## 12. Przekazywanie danych poza Europejski Obszar Gospodarczy

1. Dane mogą być przekazywane do Stanów Zjednoczonych, odpowiednio na podstawie:
   1) decyzji wykonawczej Komisji (UE) 2023/1795 z dnia 10 lipca 2023 r. dotyczącej EU-US Data Privacy Framework (art. 45 RODO), w odniesieniu do Vercel Inc. oraz, w zakresie, w jakim jej certyfikacja ma zastosowanie, Cloudflare, Inc.;
   2) standardowych klauzul umownych przyjętych decyzją wykonawczą Komisji (UE) 2021/914 z dnia 4 czerwca 2021 r. (art. 46 ust. 2 lit. c RODO), w odniesieniu do EmailJS Pte. Ltd. (Singapur i Stany Zjednoczone) oraz Umami Software, Inc. w razie dostępu do danych z terytorium Stanów Zjednoczonych, a także jako zabezpieczenie dodatkowe w odniesieniu do Cloudflare, Inc.
2. Jeżeli [[MAILBOX_PROVIDER]] lub inny odbiorca przetwarza dane poza Europejskim Obszarem Gospodarczym, przekazanie następuje wyłącznie na podstawie art. 45 albo art. 46 RODO.
3. Kopię stosowanych zabezpieczeń można uzyskać od Administratora. Wykaz podmiotów certyfikowanych jest dostępny pod adresem [dataprivacyframework.gov](https://www.dataprivacyframework.gov/list).

## 13. Prawa osoby, której dane dotyczą

1. Użytkownikowi przysługuje prawo dostępu do danych (art. 15 RODO), ich sprostowania (art. 16 RODO), usunięcia (art. 17 RODO), ograniczenia przetwarzania (art. 18 RODO), przenoszenia danych przetwarzanych w sposób zautomatyzowany na podstawie art. 6 ust. 1 lit. b RODO (art. 20 RODO) oraz sprzeciwu (art. 21 RODO; pkt 14).
2. Administrator nie przetwarza danych Użytkowników na podstawie zgody (art. 6 ust. 1 lit. a RODO).
3. Administrator odpowiada na żądanie bez zbędnej zwłoki, nie później niż w terminie miesiąca od jego otrzymania; termin ten może zostać przedłużony o dwa miesiące, o czym Administrator informuje Użytkownika (art. 12 ust. 3 RODO). Działania są nieodpłatne, z zastrzeżeniem art. 12 ust. 5 RODO. W razie uzasadnionych wątpliwości Administrator może zażądać informacji potwierdzających tożsamość (art. 12 ust. 6 RODO).
4. Jeżeli Administrator nie jest w stanie zidentyfikować Użytkownika, w szczególności w danych statystycznych, art. 15-20 RODO nie mają zastosowania, chyba że Użytkownik dostarczy dodatkowych informacji umożliwiających identyfikację (art. 11 ust. 2 RODO).

## 14. Prawo sprzeciwu

1. Użytkownik ma prawo w dowolnym momencie wnieść sprzeciw, z przyczyn związanych z jego szczególną sytuacją, wobec przetwarzania dotyczących go danych na podstawie art. 6 ust. 1 lit. f RODO (art. 21 ust. 1 RODO). Administrator przestaje wówczas przetwarzać te dane, chyba że wykaże istnienie ważnych prawnie uzasadnionych podstaw, nadrzędnych wobec interesów, praw i wolności Użytkownika, lub podstaw do ustalenia, dochodzenia lub obrony roszczeń.
2. Sprzeciw wobec statystyk odwiedzin Użytkownik może wyrazić w każdej chwili w sposób opisany w pkt 7 ust. 5.

## 15. Skarga do organu nadzorczego

1. Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego (art. 77 RODO): Prezesa Urzędu Ochrony Danych Osobowych, ul. Stanisława Moniuszki 1A, 00-014 Warszawa ([uodo.gov.pl](https://uodo.gov.pl)), albo organu nadzorczego w państwie członkowskim zwykłego pobytu Użytkownika, jego miejsca pracy lub miejsca popełnienia domniemanego naruszenia.

## 16. Dobrowolność podania danych i zautomatyzowane podejmowanie decyzji

1. Podanie danych w formularzu kontaktowym jest dobrowolne i nie jest wymogiem ustawowym ani umownym; bez treści wiadomości i danych do odpowiedzi wysłanie wiadomości i udzielenie odpowiedzi nie jest możliwe. Dane zapisywane w dziennikach serwera przekazuje automatycznie przeglądarka.
2. Administrator nie podejmuje decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu, o których mowa w art. 22 RODO. Weryfikacja Turnstile rozstrzyga jedynie o możliwości wysłania formularza.

## 17. Zmiany Polityki i wersje językowe

1. Niniejsza wersja Polityki: 1.0 z dnia 5 października 2026 r. Każda zmiana Polityki jest oznaczana nowym numerem wersji i datą, wskazanymi na początku dokumentu.
2. Polityka jest sporządzona w języku polskim. Wersje angielska i hiszpańska są tłumaczeniami; w razie rozbieżności rozstrzyga wersja polska.
