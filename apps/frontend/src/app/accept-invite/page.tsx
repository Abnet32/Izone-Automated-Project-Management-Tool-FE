'use client';

// /accept-invite?token=<JWT>
//
// This page is linked from the invitation EMAIL button.
// Flow:
//  1. User clicks email button → lands here with ?token=...
//  2. If NOT logged in  → redirect to /login?redirect=/accept-invite?token=...
//  3. If logged  in     → call POST /workspaces/invitations/{token}/accept
//  4. On success        → redirect to /workspace/{workspace_id}
//  5. On error          → show the error clearly

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import { inviteService } from '@/services/invite.service';

type Stage = 'checking' | 'accepting' | 'success' | 'error' | 'needs_login';

function AcceptInviteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [stage, setStage] = useState<Stage>('checking');
    const [error, setError] = useState<string | null>(null);
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError('No invitation token in the URL. Please use the link from your email.');
            setStage('error');
            return;
        }

        const authToken = getAuthToken();
        if (!authToken) {
            // Not logged in — send to login first, then come back
            setStage('needs_login');
            setTimeout(() => {
                router.push(`/login?redirect=/accept-invite?token=${encodeURIComponent(token)}`);
            }, 1500);
            return;
        }

        // Logged in — auto-accept immediately
        setStage('accepting');
        inviteService
            .acceptInvite(token)
            .then((res) => {
                setWorkspaceId(res.workspace_id);
                setStage('success');
                setTimeout(() => {
                    router.push(`/workspace/${res.workspace_id}`);
                }, 1800);
            })
            .catch((err) => {
                setError(err?.response?.data?.detail || err.message || 'Failed to accept the invitation.');
                setStage('error');
            });
    }, [token, router]);

    return (
        <div style={styles.page}>
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progress { from { width: 0% } to { width: 100% } }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(24px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        * { box-sizing: border-box; }
      `}</style>

            <div style={styles.card}>
                <div style={styles.accentBar} />
                <div style={styles.logo}>Izone</div>

                {/* CHECKING / ACCEPTING */}
                {(stage === 'checking' || stage === 'accepting') && (
                    <div style={styles.body}>
                        <div style={styles.spinnerLarge} />
                        <h2 style={styles.headline}>
                            {stage === 'checking' ? 'Verifying invitation…' : 'Joining workspace…'}
                        </h2>
                        <p style={styles.sub}>Please wait just a moment.</p>
                    </div>
                )}

                {/* NEEDS LOGIN */}
                {stage === 'needs_login' && (
                    <div style={styles.body}>
                        <div style={{ ...styles.iconCircle, borderColor: '#fef9c3', background: '#fefce8', color: '#854d0e' }}>
                            <span style={{ fontSize: 32 }}>🔐</span>
                        </div>
                        <h2 style={styles.headline}>Login required</h2>
                        <p style={styles.sub}>Redirecting you to login first…<br />You'll be brought back automatically.</p>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, background: 'linear-gradient(90deg,#eab308,#facc15)' }} /></div>
                    </div>
                )}

                {/* SUCCESS */}
                {stage === 'success' && (
                    <div style={styles.body}>
                        <div style={{ ...styles.iconCircle, borderColor: '#dcfce7', background: '#f0fdf4', color: '#166534' }}>
                            <span style={{ fontSize: 32 }}>🎉</span>
                        </div>
                        <h2 style={{ ...styles.headline, color: '#10b981' }}>Welcome aboard!</h2>
                        <p style={styles.sub}>You've successfully joined the workspace.<br />Taking you there now…</p>
                        <div style={styles.progressBar}><div style={styles.progressFill} /></div>
                        {workspaceId && (
                            <button style={styles.skipBtn} onClick={() => router.push(`/workspace/${workspaceId}`)}>
                                Go now →
                            </button>
                        )}
                    </div>
                )}

                {/* ERROR */}
                {stage === 'error' && (
                    <div style={styles.body}>
                        <div style={{ ...styles.iconCircle, borderColor: '#fee2e2', background: '#fef2f2', color: '#991b1b' }}>
                            <span style={{ fontSize: 32 }}>⚠️</span>
                        </div>
                        <h2 style={{ ...styles.headline, color: '#ef4444' }}>Something went wrong</h2>
                        <div style={styles.errorBox}>
                            <p style={{ margin: 0, fontSize: 14, color: '#b91c1c' }}>{error}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={styles.secondaryBtn} onClick={() => router.push('/login')}>Go to Login</button>
                            <button style={styles.primaryBtn} onClick={() => router.push('/')}>Home</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: 440,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 24,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        textAlign: 'center',
        animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    accentBar: {
        height: 6,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)',
    },
    logo: {
        display: 'inline-block',
        margin: '32px auto 16px',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        borderRadius: 14,
        padding: '10px 24px',
        color: '#fff',
        fontWeight: 800,
        fontSize: 22,
        letterSpacing: '-0.02em',
        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
    },
    body: {
        padding: '16px 40px 48px',
    },
    spinnerLarge: {
        width: 64,
        height: 64,
        border: '4px solid #f1f5f9',
        borderTop: '4px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        margin: '16px auto 24px',
    },
    iconCircle: {
        width: 80,
        height: 80,
        border: '2px solid #f1f5f9',
        background: '#f8fafc',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '16px auto 24px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.02)',
    },
    headline: {
        fontSize: 26,
        fontWeight: 800,
        color: '#0f172a',
        margin: '0 0 12px',
        letterSpacing: '-0.02em',
    },
    sub: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 1.6,
        marginBottom: 32,
    },
    progressBar: {
        height: 6,
        background: '#f1f5f9',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 24,
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #6366f1, #3b82f6)',
        animation: 'progress 2s linear forwards',
    },
    errorBox: {
        background: '#fef2f2',
        border: '1px solid #fee2e2',
        borderRadius: 12,
        padding: '16px',
        marginBottom: 32,
    },
    primaryBtn: {
        background: '#0f172a',
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '12px 28px',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 10px rgba(15, 23, 42, 0.1)',
    },
    secondaryBtn: {
        background: '#fff',
        border: '1px solid #e2e8f0',
        color: '#475569',
        borderRadius: 12,
        padding: '12px 28px',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    skipBtn: {
        background: 'none',
        border: 'none',
        color: '#6366f1',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
        marginTop: 16,
        display: 'inline-block',
    },
};

export default function AcceptInvitePage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#475569' }}>Loading…</p>
            </div>
        }>
            <AcceptInviteContent />
        </Suspense>
    );
}
