import { redirect } from 'next/navigation';

export default function TermsOfServiceRedirectPage() {
  // Permanently redirect to the canonical /terms page to resolve duplicate content.
  redirect('/terms', 'permanent');
}
