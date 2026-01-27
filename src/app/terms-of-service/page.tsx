import { redirect } from 'next/navigation';

export default function TermsOfServiceRedirectPage() {
  // Redirect to the canonical /terms page to resolve build errors and duplicate content.
  redirect('/terms');
}
