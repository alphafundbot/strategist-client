

import AppLayout from '@/components/common/app-layout';
import VoiceControlFab from '@/components/common/voice-control-fab';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
        {children}
        <VoiceControlFab />
    </AppLayout>
  );
}
