import { redirect } from 'next/navigation';

export default function AppRootPage() {
  // Permanently redirect users from the base app route to the dashboard.
  redirect('/dashboard');
}
