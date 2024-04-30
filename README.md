This is a [Next.js](https://nextjs.org/) and TypeScript project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Home Page Preview

<img width="1440" alt="home-page" src="https://github.com/mfonPeeter/lica-world-test/assets/105684251/0219d666-9818-445f-91cf-fa5369a503d1">

## Dashboard Page Preview

<img width="1440" alt="dashboard-page" src="https://github.com/mfonPeeter/lica-world-test/assets/105684251/76c19e77-922a-467d-a6cc-31dc1ea5b14d">

## Getting Started

### Installing Packages

To install the necessary Node.js modules, run:

```bash
npm install
```

### Adding Environment Variables

This project utilizes [Clerk](https://clerk.com/) to handle authentication with LinkedIn. If you intend to clone the project, you'll need to get your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` on the platform and add it to your `.env.local`.

#### Add environment variables in a file named `.env.local` at the root of your directory:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
CLERK_SECRET_KEY=${SECRET_KEY}
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## The Process

1. On the first day, I dedicated time to understanding the project, delving into Clerk documentation, and familiarizing myself with the Createful website. Following this, I focused on building the UI and successfully authenticated with LinkedIn using Clerk.
2. On the second day, I devoted most of my time to attempting to send a request to the LinkedIn Share API. Sadly, I encountered various error messages and was unable to proceed. With limited time remaining, I shifted my focus to enhancing the UI to make it more visually appealing. I hope that the UI compensates for my inability to integrate the LinkedIn Share API within the given timeframe

3. Since I couldn't utilize the LinkedIn Share API to create a post, I opted to deactivate all buttons on the dashboard page except for the media upload button. Additionally, users can still add images to the text area element, but they won't be able to post content with the image attached.
4. On the other pages, I included some content to indicate to users that they are still a work in progress.

Apart from the inability to make LinkedIn posts and the disabled buttons (except for the media upload button), feel free to explore the UI. Everything works perfectly and is responsive.

## Deployment

The project is deployed on Vercel. You can access the live version at [lica-world-test.vercel.app](https://lica-world-test.vercel.app/)
