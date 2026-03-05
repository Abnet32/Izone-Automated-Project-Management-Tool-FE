'use client';

// /accept-invite?token=<JWT>
//
// This page is linked from the invitation EMAIL button.
// Flow:
//  1. User clicks email button → lands here with ?token=...
//  2. If NOT logged in  → redirect to /login?redirect=/accept-invite?token=...
//  3. If logged  in     → call POST /workspaces/invitations/{token}/accept
//  4. On success        → redirect to /workspaces/{workspace_id}
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
                    router.push(`/workspaces/${res.workspace_id}`);
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
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
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
                        <div style={{ ...styles.iconCircle, borderColor: 'rgba(234,179,8,0.4)', background: 'rgba(234,179,8,0.1)' }}>
                            <span style={{ fontSize: 30 }}>🔐</span>
                        </div>
                        <h2 style={styles.headline}>Login required</h2>
                        <p style={styles.sub}>Redirecting you to login first…<br />You'll be brought back automatically.</p>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, background: 'linear-gradient(90deg,#eab308,#facc15)' }} /></div>
                    </div>
                )}

                {/* SUCCESS */}
                {stage === 'success' && (
                    <div style={styles.body}>
                        <div style={{ ...styles.iconCircle, borderColor: 'rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.1)' }}>
                            <span style={{ fontSize: 30 }}>🎉</span>
                        </div>
                        <h2 style={{ ...styles.headline, color: '#4ade80' }}>Welcome aboard!</h2>
                        <p style={styles.sub}>You've successfully joined the workspace.<br />Taking you there now…</p>
                        <div style={styles.progressBar}><div style={styles.progressFill} /></div>
                        {workspaceId && (
                            <button style={styles.skipBtn} onClick={() => router.push(`/workspaces/${workspaceId}`)}>
                                Go now →
                            </button>
                        )}
                    </div>
                )}

                {/* ERROR */}
                {stage === 'error' && (
                    <div style={styles.body}>
                        <div style={{ ...styles.iconCircle, borderColor: 'rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)' }}>
                            <span style={{ fontSize: 30 }}>⚠️</span>
                        </div>
                        <h2 style={{ ...styles.headline, color: '#f87171' }}>Something went wrong</h2>
                        <div style={styles.errorBox}>
                            <p style={{ margin: 0, fontSize: 14, color: '#fca5a5' }}>{error}</p>
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
        background: 'linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
    },
    card: {
        width: '100%',
        maxWidth: 440,
        background: 'linear-gradient(145deg,#1e1e35,#1a1a2e)',
        border: '1px solid rgba(99,102,241,0.25)',
        borderRadius: 24,
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        textAlign: 'center',
        animation: 'fadeUp 0.4s ease',
    },
    accentBar: {
        height: 4,
        background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)',
    },
    logo: {
        display: 'inline-block',
        margin: '24px auto 16px',
        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        borderRadius: 12,
        padding: '8px 20px',
        color: '#fff',
        fontWeight: 800,
        fontSize: 20,
    },
    body: {
        padding: '16px 36px 36px',
    },
    spinnerLarge: {
        width: 56,
        height: 56,
        border: '4px solid rgba(99,102,241,0.2)',
        borderTop: '4px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite',
        margin: '8px auto 20px',
    },
    iconCircle: {
        width: 72,
        height: 72,
        border: '2px solid rgba(99,102,241,0.4)',
        background: 'rgba(99,102,241,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '8px auto 20px',
    },
    headline: {
        fontSize: 24,
        fontWeight: 800,
        color: '#f1f5f9',
        margin: '0 0 8px',
    },
    sub: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 1.7,
        marginBottom: 20,
    },
    progressBar: {
        height: 4,
        background: 'rgba(99,102,241,0.15)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg,#22c55e,#4ade80)',
        animation: 'progress 1.8s linear forwards',
    },
    errorBox: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 20,
    },
    primaryBtn: {
        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '10px 24px',
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
    },
    secondaryBtn: {
        background: 'none',
        border: '1px solid rgba(99,102,241,0.3)',
        color: '#94a3b8',
        borderRadius: 10,
        padding: '10px 24px',
        fontSize: 14,
        cursor: 'pointer',
    },
    skipBtn: {
        background: 'none',
        border: 'none',
        color: '#4ade80',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'underline',
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
