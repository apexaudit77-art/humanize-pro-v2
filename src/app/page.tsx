import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the default language if no language is specified
  redirect(`/en/humanize-ai`);
}
