# Nautical Storefront

A GraphQL-powered, PWA, single-page application storefront for [Nautical](https://github.com/Nautical-Commerce/nautical-clients/).

## Features

- Headless ecommerce storefront built with [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/client), [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Offline mode (beta)
- Nautical GraphQL API integration
- Single-page application experience
- [Braintree Payment Gateway](https://www.braintreepayments.com/) integration

## Demo

See the [public demo](http://demo.nauticalcommerce.com) of Nautical Storefront!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+
- A running instance of Nautical.


  To run the storefront, you have to set the `API_URI` environment variable to point to the Nautical GraphQL API. If you are running Nautical locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

#### Social Links
To configure social links in footer, you have to set next environment variables:
- `FACEBOOK_LINK` for Facebook
- `INSTAGRAM_LINK` for Instagram
- `YOUTUBE_LINK` for YouTube
- `TIKTOK_LINK` for TikTok
- `TWITTER_LINK` for Twitter

### Installing

Clone the repository:

```
git clone https://github.com/Nautical-Commerce/nautical-clients.git
```

Enter the project directory:

```
cd nautical-storefront
```

#### Using stable release

To use the official stable release, checkout to a release tag:

```
$ git checkout 2.10.4
```

See the list of all releases here: https://github.com/Nautical-Commerce/nautical-clients/releases/

#### Using development version

If you want to use the latest development version, checkout to the `master` branch:

```
$ git checkout master
```

Install NPM dependencies:

```
npm i
```

Run the development server:

```
npm start
```

Go to `http://localhost:3000` to access the storefront.

## Cypress tests

If you want to run [Cypress](https://www.cypress.io/) tests, make sure that all dependecies (including `Cypress`) are installed by running the install command.

```
npm i
```

Following environment variables are required to be set in order to be able to run tests properly:

- `API_URI` - GraphQL API address.
- `STATIC_URL` - static files destination url, eg. S3 bucket
- `CYPRESS_USER_NAME` - username (email) for `Storefront` user.
- `CYPRESS_USER_PASSWORD` - for the user mentioned above.

If you are runninng the Storefront from the perspective of `Docker` container, then you can run tests using following commands:

Headless mode:

```
cy:run
```

Cypress UI mode:

```
cy:open
```

If you want to run tests against your local development environment then use following commands:

Headless mode:

```
test:e2e:run
```

Cypress UI mode:

```
test:e2e:dev
```

## Creating new components

All new components should follow Atomic Design Guidelines and be placed in `src/@next/components` directory.

Files structure can be generated using `plop`:

```
npm run generate
```

### Important Files

- **nautical-storefront/config/webpack/config.base.js** - Base webpack config file.
  - Can change name of the app (displayed when installed on mobile)
- **nautical-storefront/src/index.html** - Main template file that contains the <div id="root"></div>
  - Can change title of storefront here
- **nautical-storefront/src/index.tsx** - Main entry point file. Render's the <App /> component, Apollo Client, and others to the root div in index.html file above.
- **nautical-storefront/src/core/config.ts** - Controls number of products shown per page, support email, gateway providers, social media, and some meta.
  - Can change support email
  - Can change products shown per page
  - Can change gateway providers
  - Can change social media links that are displayed in the footer
  - Can change some meta options
- **nautical-storefront/src/images/** - Holds all the images for logo, cart, favicon, etc.
  - Can change storefront logo, favicon, or add new images here.
- **nautical-storefront/src/globalStyles/scss/variables.scss** - Contains base styles like colors, font size, container width, media breakpoints and more.
- **nautical-storefront/src/@next/globalStyles/** - Contains more base styles, themes, media, and constants.
- **nautical-storefront/src/views/** - This folder controls the views, or what is displayed for each page. Most views have a file named "Page.tsx" that controls the layout of the page and a file named "View.tsx" that calls the query and renders the <Page /> component with the data.
  - Can add another view to storefront here. Requires adding a route (see routes below).
- nautical-storefront/src/@next/pages/ - Second spot for modifying/adding different pages. This is the recommended directory to add new pages.
- **nautical-storefront/src/app/routes/** - This folder contains the paths as well as holds the <Routes /> component. Here is where you add a new path and route.
  1.  Export a new path in paths.ts
  2.  Inside AppRoutes.tsx import your new view (see views above) and create a new route with path={paths.newPath} and component={newViewPage}
  3.  To link to your new view import { Link } from "react-router-dom" and use new path you created in paths.ts (make sure to import it)
- **nautical-storefront/src/app/App.tsx** - This is main <App /> component that renders the <MainMenu />, <Routes /> (explained below), <Footer /> and a couple other components.

### Adding a Payment Gateway

- **nautical-storefront/src/core/config.ts** - Add new gateway provider name here.
- **nautical-storefront/src/@next/components/organisms/** - Create a new folder for new payment gateway component here.
- **nautical-storefront/src/@next/components/organisms/PaymentGatewaysList/PaymentGatewaysList.tsx** - Import new gateway component, create a new switch case to handle your gateway component.

### Receiving confirmation emails

- **Set [EMAIL_URL](https://docs.nautical.io/docs/developer/running-nautical/configuration#setting-environment-variables) environment variable for nautical core.**
  - Using Docker - Add EMAIL_URL as new enviornment variable to both the api and worker service following the format [here](https://docs.nautical.io/docs/developer/running-nautical/configuration#email_url).
- **Issues getting emails working?**
  - Gmail
    - Check to see that "Less secure app access" is turned ON. Under "Manage your Google Account" > Go to the security tab. By default, the setting is off for security reasons.
    - If using 2FA make sure to set an [app password](https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637355441414497566-1310044707&rd=1) and use that in place of your normal login password.

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](https://github.com/Nautical-Commerce/nautical-clients/blob/master/LICENSE) file for details

#### Crafted with ❤️ by [Nautical Commerce, Inc.](http://nauticalcommerce.app)

hello@nauticalcommerce.com
