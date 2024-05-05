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

Also, ensure to add `NEXT_PUBLIC_BASE_URL` and set it to `http://localhost:3000` in your development environment. Upon deployment, such as on Vercel, remember to set `NEXT_PUBLIC_BASE_URL` to your domain name, like `https://example.vercel.app`.

#### Add environment variables in a file named `.env.local` at the root of your directory:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
CLERK_SECRET_KEY=${SECRET_KEY}
NEXT_PUBLIC_BASE_URL='http://localhost:3000'
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

## Updated Process

With permission granted to readdress the challenge, I'm pleased to report that I have been able to successfully utilize the LinkedIn Share API to create a post. Here's a brief overview of the process:

- After creating an app on LinkedIn Developer's website, I added the "Share on LinkedIn" and "Sign In with LinkedIn using OpenID Connect" products to my app. Following this, I configured the LinkedIn connection for my production instance by following the Clerk documentation.

- Following that, I proceeded to obtain the unique authenticated user access token. Through research, I discovered the method for retrieving the user OAuth access token in the Clerk documentation. The code can be found in `src/utils/dateUtils.ts`

- Once I obtained the access token, my next task was to retrieve the user ID, which I needed for making requests to the LinkedIn Share API. To accomplish this, I sent a request to the `https://api.linkedin.com/v2/userinfo` LinkedIn API endpoint. From the response, I extracted the `sub` value, which I referred to as the user ID. This request was executed by including the access token in the authorization headers. The code can be found in `src/app/api/linkedIn/route.ts`

- Now that I have both the user ID and the access token, I proceeded to make a request to the `https://api.linkedin.com/v2/ugcPosts` endpoint to share content containing both text and an image. For sharing text content alone, you can find the code in `src/app/api/linkedIn/route.ts`, where route handlers were utilized. However, for sharing both text content and an image, the code can be found in `src/utils/apiClients/apiCalls.ts`. In this case, I didn't employ route handlers because I needed to upload the image as a binary file to the uploadUrl after registering the image.

- I utilized server actions to handle form data upon submission, as seen in `src/lib/actions.ts`. This is where I managed requests for sharing text-only or both text and an image. Additionally, I employed `useFormStatus` to manage form status, as demonstrated in `src/components/Dashboard/DashboardButtons.tsx`

- I also improved the UI by implementing a custom tooltip that appears when a user hovers over any of the icons in the dashboard form. The publish button is disabled initially and becomes enabled when a user starts typing in the text area element.

- Upon successful post, a success message will be displayed, while an error message will appear in case of an error.

- I've also included meaningful comments where necessary.

**I hope I was able to summarize the process I undertook to utilize the LinkedIn Share API in order to create and share a post.**

## Deployment

The project is deployed on Vercel. You can access the live version at [lica-world-test.vercel.app](https://lica-world-test.vercel.app/)
