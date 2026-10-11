---
title: "Privacy Policy"
description: "How Mateusz Muszarski processes personal data on this website: the contact form, server logs, cookieless visit statistics and the rights of users."
version: "1.0"
updated: 2026-10-05
---

## 1. General provisions

1. This privacy policy (the "Policy") sets out the rules for processing personal data in connection with the use of the website available at [[SITE_URL]], in all its language versions (the "Website"). This Policy fulfils the information obligations under Article 13 GDPR and Article 399(1)(1) PKE.
2. In this Policy:
   1) **GDPR** means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ L 119, 4.5.2016, p. 1);
   2) **PKE** means the Polish Act of 12 July 2024, Electronic Communications Law (Prawo komunikacji elektronicznej; Journal of Laws (Dz.U.) 2024, item 1221, as amended);
   3) **User** means a natural person using the Website.
3. The Website is not directed at children.
4. The Controller applies the measures referred to in Article 32 GDPR, including encryption of data transmitted between the User's browser and the Website (HTTPS).

## 2. Controller

1. The controller of personal data is Mateusz Muszarski, a natural person (Poland), e-mail: [[EMAIL]] (the "Controller").
2. The Controller has not designated a data protection officer, as he is not required to do so under Article 37(1) GDPR. In all matters concerning personal data, the Controller may be contacted at the addresses given in paragraph 1.

## 3. Purposes, legal bases and retention periods

| Purpose | Legal basis and legitimate interest | Retention period |
| --- | --- | --- |
| Delivering the Website and ensuring its security (section 4) | Article 6(1)(f) GDPR: network and information security and the proper operation of the Website (recital 49 GDPR) | the period set by Vercel for the Controller's plan; on the date of this Policy, runtime logs of server functions: 1 day |
| Replying to a message sent through the contact form (section 5) | Article 6(1)(f) GDPR: replying to enquiries; Article 6(1)(b) GDPR where the message concerns employment or a project (steps taken at the User's request prior to entering into a contract) | the time needed to handle the matter, then no longer than 12 months from the last message; in the EmailJS service: up to 30 days |
| Protecting the form against spam and abuse (sections 5 and 6) | Article 6(1)(f) GDPR: protecting the form against automated abuse | IP address: as long as necessary to apply the message limit; Turnstile data: according to Cloudflare's rules |
| Visit statistics (section 7) | Article 6(1)(f) GDPR: understanding how the Website is used; Article 399 PKE, as applicable | 6 months |
| Establishment, exercise or defence of legal claims | Article 6(1)(f) GDPR: protecting the Controller's rights | until the limitation period for the claims expires |

## 4. Hosting and server logs

1. The Website is hosted on the infrastructure of Vercel Inc. (United States). Pages are delivered through Vercel's global content delivery network (CDN), as a rule from the location nearest to the User. The server function handling the contact form runs in a European Union region (Frankfurt am Main, Germany).
2. When a page is displayed, the following are recorded in server logs: the IP address, the date and time of the request, the path of the requested resource, the referring page (referrer) and the browser identifier (user agent).
3. With regard to service-generated data (usage data and metadata), Vercel Inc. is an independent controller and processes it under the [Vercel privacy policy](https://vercel.com/legal/privacy-policy).

## 5. Contact form

1. The contact form contains the following fields: the message (required); reply details, that is an e-mail address, a telephone number or a LinkedIn profile URL, at the User's choice (required); the topic: a job, a project or a question (optional).
2. When a message is sent, the server function also processes the sender's IP address in order to limit the number of messages sent from one address (rate limiting).
3. The message is delivered by e-mail through the EmailJS service, provided by EmailJS Pte. Ltd. (Singapore), whose servers are located in the United States, to the Controller's mailbox maintained by [[MAILBOX_PROVIDER]].
4. The Controller replies through the channel indicated by the User. Where a LinkedIn profile is indicated, the correspondence takes place on that service, whose operator is an independent controller.
5. Messages should not contain special categories of personal data (Article 9(1) GDPR) or unnecessary data of third parties.
6. The Controller may also be contacted directly at [[EMAIL]].

## 6. Form protection (Cloudflare Turnstile)

1. The contact form is protected by the Cloudflare Turnstile service, provided by Cloudflare, Inc. (United States). Turnstile is loaded only when the User starts using the form.
2. Cloudflare processes the IP address, the TLS fingerprint, the User-Agent header, the sitekey together with the domain, and other signals concerning the browser and the device, and may store in the browser information necessary for the verification (section 8).
3. Cloudflare acts as a processor with regard to protecting the Website and as an independent controller with regard to improving its bot detection, as set out in the [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/) and the [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/).
4. If the verification fails, the User may contact the Controller by e-mail.

## 7. Visit statistics (Umami)

1. The Website uses the Umami Cloud service, provided by Umami Software, Inc. (United States), with data stored in the European Union region. The service does not use cookies.
2. The following are processed: the path of the visited page, the referring page, the screen size, the browser language, the browser type, the operating system, the device type, the country (derived from the IP address at the time of the visit; the IP address is not stored), a visitor identifier in the form of a hash that changes monthly, and events, for example a CV download, sending the contact form or switching the language version. Events do not include anything typed into the form.
3. The Controller does not combine the visitor identifier with other data, does not use it to identify anyone and does not profile Users.
4. The statistics script reads from the browser, in particular, the screen size, the language, the Do Not Track setting and the `umami.disabled` entry. This section constitutes the information referred to in Article 399(1)(1) PKE; the access takes place with regard to Article 399 PKE, to the extent that provision applies. The Website does not display a consent notice (banner) for statistics.
5. The User may determine the conditions of this access (Article 399(1)(1)(b) PKE):
   1) by enabling the Do Not Track or Global Privacy Control signal in the browser; the statistics script is then not loaded;
   2) by using the switch on this page, which stores the `umami.disabled` entry; the script then sends no data;
   3) by blocking scripts in the browser settings or with extensions.

## 8. Cookies and browser storage

1. The Website does not use cookies. Information is stored in the User's browser only in the following cases:

| Key | When it is stored | Purpose | Retention period |
| --- | --- | --- | --- |
| `theme` | choosing the Paper or Ink colour theme | remembering the theme | until the default theme is restored or site data is deleted |
| `motion` | pausing animations | remembering that choice | until animations are resumed or site data is deleted |
| `umami.disabled` | switching statistics off | remembering the opt-out | until statistics are switched back on or site data is deleted |
| Cloudflare Turnstile data | using the contact form | anti-spam verification | according to Cloudflare's rules |

2. The `theme`, `motion` and `umami.disabled` entries are kept in the browser's local storage (localStorage), are read only by the Website's scripts in the User's browser and are not sent to the server.
3. The Controller considers the operations described in paragraph 1 to be necessary to provide a function requested by the User within the meaning of Article 399(3)(2) PKE.
4. The User may delete this information at any time in the browser settings; the Website then applies its default settings.

## 9. Links to external services

1. The Website does not embed third-party content. Fonts and video files are served from the Website's own infrastructure.
2. Links to GitHub, LinkedIn, npm, Instagram, Facebook, Telegram, the App Store, Google Play, Discord and Messenger are plain hyperlinks; no data is transmitted to the operators of those services until a link is clicked. After a click, the operator of the service concerned processes data as an independent controller under its own privacy policy.

## 10. The Controller's own data published on the Website

1. On the "My life" page, the Controller publishes, by his own decision, information about himself, including his interests and religious beliefs, as data manifestly made public by the data subject (Article 9(2)(e) GDPR). That page does not contain personal data of third parties.
2. Any entity that further processes this information must have its own legal basis for the processing.

## 11. Recipients of data

1. The recipients of personal data are:

| Recipient and scope | Role | Place of data storage |
| --- | --- | --- |
| Vercel Inc. (United States): hosting, server logs, form handling | processor; independent controller of service-generated data | global CDN; form function: EU (Frankfurt) |
| EmailJS Pte. Ltd. (Singapore), operator of the EmailJS service: message delivery | processor | United States |
| [[MAILBOX_PROVIDER]]: the Controller's mailbox | processor | [[MAILBOX_LOCATION]] |
| Cloudflare, Inc. (United States): Turnstile verification | processor; independent controller for improving bot detection | Cloudflare global network |
| Umami Software, Inc. (United States): visit statistics | processor | European Union |

2. Processors process data only on the Controller's instructions, on the basis of agreements concluded in accordance with Article 28 GDPR.
3. Data may be disclosed to public authorities where such an obligation arises from the law (Article 6(1)(c) GDPR).

## 12. Transfers outside the European Economic Area

1. Data may be transferred to the United States on the basis of, as applicable:
   1) Commission Implementing Decision (EU) 2023/1795 of 10 July 2023 concerning the EU-US Data Privacy Framework (Article 45 GDPR), with regard to Vercel Inc. and, to the extent its certification applies, Cloudflare, Inc.;
   2) the standard contractual clauses adopted by Commission Implementing Decision (EU) 2021/914 of 4 June 2021 (Article 46(2)(c) GDPR), with regard to EmailJS Pte. Ltd. (Singapore and the United States) and Umami Software, Inc. in the event of access to the data from the United States, and as an additional safeguard with regard to Cloudflare, Inc.
2. Where [[MAILBOX_PROVIDER]] or another recipient processes data outside the European Economic Area, the transfer takes place only on the basis of Article 45 or Article 46 GDPR.
3. A copy of the safeguards applied may be obtained from the Controller. The list of certified entities is available at [dataprivacyframework.gov](https://www.dataprivacyframework.gov/list).

## 13. Rights of the data subject

1. The User has the right of access to the data (Article 15 GDPR), to rectification (Article 16 GDPR), to erasure (Article 17 GDPR), to restriction of processing (Article 18 GDPR), to portability of data processed by automated means on the basis of Article 6(1)(b) GDPR (Article 20 GDPR) and to object (Article 21 GDPR; section 14).
2. The Controller does not process Users' data on the basis of consent (Article 6(1)(a) GDPR).
3. The Controller responds to a request without undue delay and in any event within one month of its receipt; that period may be extended by two further months, of which the Controller informs the User (Article 12(3) GDPR). Actions are free of charge, subject to Article 12(5) GDPR. In case of reasonable doubts, the Controller may request information confirming the requester's identity (Article 12(6) GDPR).
4. Where the Controller is not in a position to identify the User, in particular in statistical data, Articles 15 to 20 GDPR do not apply, except where the User provides additional information enabling identification (Article 11(2) GDPR).

## 14. Right to object

1. The User has the right to object, on grounds relating to his or her particular situation, at any time to processing of personal data concerning him or her based on Article 6(1)(f) GDPR (Article 21(1) GDPR). The Controller then no longer processes the data unless he demonstrates compelling legitimate grounds which override the interests, rights and freedoms of the User, or grounds for the establishment, exercise or defence of legal claims.
2. The User may object to visit statistics at any time in the manner described in section 7(5).

## 15. Complaint to a supervisory authority

1. The User has the right to lodge a complaint with a supervisory authority (Article 77 GDPR): the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stanisława Moniuszki 1A, 00-014 Warszawa, Poland ([uodo.gov.pl](https://uodo.gov.pl)), or the supervisory authority in the Member State of the User's habitual residence, place of work or place of the alleged infringement.

## 16. Voluntary provision of data and automated decision-making

1. Providing data in the contact form is voluntary and is neither a statutory nor a contractual requirement; without the message and the reply details, it is not possible to send the message or to reply. Data recorded in server logs is transmitted automatically by the browser.
2. The Controller does not take decisions based solely on automated processing, including profiling, within the meaning of Article 22 GDPR. The Turnstile verification only determines whether the form can be sent.

## 17. Changes to this Policy and language versions

1. Current version of this Policy: 1.0 of 5 October 2026. Each change to this Policy is marked with a new version number and date, shown at the top of the document.
2. This Policy is drawn up in Polish. The English and Spanish versions are translations; in the event of any discrepancy, the Polish version prevails.
