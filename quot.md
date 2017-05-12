# AFBASKET multi-store ecommerce v1.0

#### Roberto only:
- faccio io da PM e gestisco tutto io, da cliente a risorse (con tuo supporto quando vanno bastonati chiaramente): dal designer che se no parte per la tangente, al FE che deve sviluppare il mostro per renderlo facilmente bundlabile ad app iOS e Android, etc etc
- potrei impiegare Davide o Romolo per la parte di FE statico (ovvero transpiling da prototype ad HTML/CSS statico)
- considera che se entra sto di fatto full solo su questo 5 mesi unbroken
- picchia pesante, io chiedo a te 30k per la parte di sviluppo (ovvero tutto ciò che è il sistema tranne prototype) ma a loro gli altri se si fanno fare un preve in giro non chiederanno mai sotto i 100k
- chiarisci da subito che al termine dello sviluppo dovrà essere concordato un canone di manutenzione della piattaforma per manutenzione macchine, improvements, debugging, supporto agli utilizzatori (gli admins)

#### Cost and timing
- 6 months development timespan after prototype approval
- 6mo x 22d x 8h x 30E/h = ~~31.680E~~ 30.000E

##### Breakdown
- 3 months (12w) for Front-end development: HTML/CSS/JS/React, iOS and Android app bundling / €15k
- 3 months (12w) for Back-end development: API, pipelines, servers / €15k

## Main components
- admin app: back-office
- user app: online store for both visitors and users
- visitor app: public company website

### Admin
Admins will be able to manage the following system entities with both a list view (tabular list of items) and a single view (item details).

Some entities will allow for bulk import/export in csv/xls format for both a better system bootstrapping and its maintenance and monitoring.

Charts and reports will not be included in the following iteration of software after admins feedback on their needs.

Views:
- stores: import/export
- categories: import/export
- products: import/export
- events: product promos, store specific promo, events
- users: export
- orders: export
- deliveries
- messages: as collected from contact-us view

### User
Public views:
- category: products categories collection to choose from (food, clothes...)
- tag: products tags collection to choose from (promo, last arrivals...)
- search: products matching given terms
- list: products list to choose to add to basket
- item: product detail
- basket: cart with choosen items
- checkout: payment and pick-up or delivery handling
- purchase confirmation: purchase review and confirmation
- auth: sign-up and sign-up flows

Private views:
- profile: general info about user
- addresses: to manage deliveries destination(s)
- billing details: to manage credit card info
- orders list: list of purchases history
- order item: purchase detail
- shopping lists: named list of products for quick re-buy

Additional features:
- filters on list view
- visitor prompted to sign up just on checkout
- option on cart to save the purchased products list as a shopping list to easily buy-again

### Visitor
Views:
- homepage: stacked promo or events from the store
- store locator: city map with available stores
- contact us: messaging form to ask for info and help
- shipping and delivery: description of delivery handling
- privacy policy
- terms and conditions
Additional features:
- search: global product finder

## Technical aspects

### Infrastructure
Staging and production environment fully hosted over Amazon Web Services company's account:
1. Amazon EC2 t2.small server hosting staging environment
2. Amazon EC2 t2.large server hosting production environment
3. Amazon S3 hosting assets

##### Notes
- Amazon EC2 pricing details: https://aws.amazon.com/ec2/pricing/on-demand/
- Amazon S3 pricing details: https://aws.amazon.com/s3/pricing/
- additional or more powerful Amazon services may be required
- cost is proportional to generated network traffic thus huge amount of consumed pageviews translate to billing increase

##### Security
- no traffic out of ports 22, 80, 443 is allowed
- only RSA-login over servers

### Development stack
Fully JavaScript development stack:
- GIT v2+
- JavaScript ES8
- NodeJS v7+
- PostgreSQL v9.6+
- SQLite v3+
- React v15+
- Material-UI v1.0+
- Webpack v2+
- Phonegap

### Supported devices and resolutions
| Device | Browser | Resolutions | Models ref. |
| --- | --- | --- | --- | --- |
| Notebook | Chrome Latest, Safari 10+, Firefox Latest, Edge 14+ | 1366x768, 1920x1080 | Notebook, HD monitor, QHD monitor |
| iOS tablet | Safari 10+ | 1024x1366, 768x1024 | iPad Pro (10"), iPad Air 2 |
| Android tablet | Chrome Latest | 800 x 1280 | Samsung Galaxy Tab 2 (10") |
| iOS smartphone | Safari 10+ | 375x667 | iPhone 6, iPhone 6s, iPhone 7 |
| Android Smartphone | Chrome Latest | 360x640 | Samsung Galaxy S6, Samsung Galaxy S7 |

### 3rd party tools
- Basecamp: project management
- Invision: mockups hosting
- Origami: app prototype hosting
- GitHub: codebase repository hosting
- ssls.com: ssl wildcard certificate

### 3rd party services integrated through available API
- Stripe: payment processing
- UberRUSH: delivery processing
- Google plus: easy user sign-up through connect
- Facebook: easy user sign-up through connect
- Google maps: store map locator

## Workflow

### Glossary
- feature: aspect of a software
- bug: aspect of a software not behaving as intended
- priority: one between 0 (urgent), 1 (required), 2 (wanted)
- task: one between feature and bug
- release: collection of features and bug fixes delivered into a software version
- prototype: visual sample of an idea hosted appropriate 3rd party tool (i.e: invisionapp.com, origami.design, flinto.com)
- web app: software running into a browser
- ios app: software running on a ios device
- android app: software running on a android device
- staging environment: a private website or installable ios package or installable android package containing the next version of software
- production environment: a public website or installable ios package or installable android packag containing the current version of software
- MVPBLD: company developing the project and/or anyone on its behalf
- CLIENT: customer committing the project and/or anyone on its behalf

### Release
- a release is a collection of features and bug fixes delivered into a software version
- releases happen on a weekly or biweekly basis
- only exception to "weekly and biweekly rule" are hot fixes due to critical bugs thus urgent updates
- feature can be scheduled into a release if:
1. a prototype describing it is approved
2. every needed material is provided by CLIENT (i.e: text, translations, images, videos, links, documents, 3rd party services credentials)

### Release workflow
1. weekly call between (at least one) MVPBLD team member and (at least one) CLIENT representative is scheduled (typically on Monday or Tuesday)
2. MVPBLD and CLIENT agree on tasks for next 7 or 14 days thus scheduling the next software release
3. MVPBLD pushes the release on the staging environment on the scheduled date
4. CLIENT verifies and approves the release
5. MVPBLD pushes the release on the production environment

### Weekly call
- call goal is setting up next week release tasks
- call happens weekly or biweekly right after last release
- CLIENT has to share content he wants to be deal within  the call prior to the call itself (i.e: text, images, videos, links, documents, 3rd party services credentials, questions, hand sketched wireframes)
- call happens on company's uberconference tool
- call is followed by:
1. recap thread on Basecamp by MVPBLD listing next release agreed schedule and tasks done
2. scheduled todo on Basecamp by MVPBLD listing next release agreed tasks: features and bugs
- if anything is wrong/misunderstood/missing from previous point CLIENT has 24 hours to claim about it
- MVPBLD will tipically remember to client prior to the call the following "as per policy":
1. uberconference contacts
2. no unshared content will be dealt within the call

### Feature
- feature has to be considered delivered when the targeted browser/resolution reflects the approved prototype's behaviour in every aspect
- feature is considered delivered on MVPBLD's solely discretion when no approved prototype defining it does exist
- no objections are allowed on feature's aspects not defined on the approved prototype
- if the correct implementation of the feature depends on CLIENT's provided material (i.e: text, images, videos, links, documents, 3rd party services credentials) and 1) material is not provided 2) feature is scheduled into next release then MVPBLD declines every responsibility over missed release schedule
- admin dashboards are excluded from mobile and responsive web development
- mobile device orientation must be agreed upon upfront: default is developing for portrait orientation

### Bug
- bugs are considered critical when a "reasonable amount of software users" are not able to use the software because of it
- MVPBLD does not provide coverage over both "critical" and non-critical" bugs spotted further the development phase
- MVPBLD denies any responsibility once developed project is modified by others

#### Additional notes
- the only search engine taken into account for whatever technical choice is Google