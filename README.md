# users-app-vue3

## Overview

`users-app-vue3` is a remote microfrontend built with Vue 3. It provides the user list and display functionality for a microfrontend architecture, and is designed to be loaded into a shell/host application via Webpack Module Federation.

## Features
- Vue 3 component for displaying a list of users (with fields like name, email, gender, etc.)
- Receives global state and event bus from the host as props
- Communicates with the host for edit actions and cross-app events
- Designed to be loaded by a shell/host app

## Project Structure
```
users-app-vue3/
  src/
    components/      # Vue components (UserCard)
    main.js          # Entry point for module federation
    App.vue          # Root component (for standalone dev)
    i18n/            # (Optional) i18n messages
  public/
  webpack.config.js  # Webpack + Module Federation config
  package.json
```

## Setup & Development

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:8081](http://localhost:8081)

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Lint the code:**
   ```sh
   npm run lint
   ```

## Microfrontend Integration
- Exposes the `UserCard` component via Module Federation in `webpack.config.js`.
- Designed to be loaded by a shell/host app.
- Receives `store` and event bus as props from the host.
- Communicates with the host using the event bus for edit actions and other events.

## Usage in Host
- The host mounts the remote by importing `remoteApp/UserCard` and calling its `mount` function, passing required props.
