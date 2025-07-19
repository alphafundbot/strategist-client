
import AppLayout from '@/components/common/app-layout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Re-introduce authentication and tier-based logic
  // once routing is confirmed to be stable.
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
