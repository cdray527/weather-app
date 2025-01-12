# Weather App

A simple weather application built with Remix and DaisyUI, featuring state management powered by Jotai.

## Features

- **Check Current Weather:** Search for the current weather by city and country.
- **Theme Toggle:** Switch between light and dark themes. Default Theme based on user's current location time.
- **Manage Weather History:**
    - Delete specific weather history items.
    - Refresh weather data for any saved location.

## Development

To start the development server:

````bash
npm run dev
## Development

Run the dev server:

```shellscript
npm run dev
````

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
