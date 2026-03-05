'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { inviteService } from '@/services/invite.service';
import { WorkspaceInvitationResponse } from '@/types/invite';
import { getAuthToken } from '@/lib/auth';

function JoinWorkspaceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [invite, setInvite] = useState<WorkspaceInvitationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No invitation token found in the link.');
      setLoading(false);
      return;
    }
    inviteService.getInviteDetails(token)
      .then(setInvite)
      .catch((err) => setError(err?.response?.data?.detail || err.message || 'Invalid or expired invitation.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAccept = async () => {
    const authToken = getAuthToken();
    if (!authToken) {
      router.push(`/login?redirect=/join-workspace?token=${token}`);
      return;
    }
    setIsJoining(true);
    try {
      const res = await inviteService.acceptInvite(token!);
      setJoined(true);
      setTimeout(() => router.push(`/workspaces/${res.workspace_id}`), 1500);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || 'Could not join the workspace.');
      setIsJoining(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-10">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Verifying your invitation…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gradient-to-b from-[#1e1e35] to-[#1a1a2e] border border-indigo-500/20 rounded-3xl shadow-2xl overflow-hidden text-center">
          <div className="h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500" />
          <div className="p-10">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-extrabold text-red-400 mb-2">Invitation Error</h2>
            <p className="text-slate-400 text-sm mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="border border-indigo-500/30 text-slate-400 rounded-xl px-6 py-2.5 text-sm hover:border-indigo-500/60 transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────
  if (joined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gradient-to-b from-[#1e1e35] to-[#1a1a2e] border border-indigo-500/20 rounded-3xl shadow-2xl overflow-hidden text-center">
          <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400" />
          <div className="p-10">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-extrabold text-green-400 mb-2">You've joined!</h2>
            <p className="text-slate-400 text-sm mb-4">Taking you to the workspace…</p>
            <div className="h-1 bg-green-500/15 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-[progress_1.5s_linear_forwards]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Card ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-6">
      <style>{`@keyframes progress { from{width:0%} to{width:100%} }`}</style>

      <div className="w-full max-w-md bg-gradient-to-b from-[#1e1e35] to-[#1a1a2e] border border-indigo-500/25 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden text-center">

        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

        {/* Logo */}
        <div className="px-10 pt-8 pb-2">
          <span className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-extrabold text-xl px-5 py-2 rounded-xl tracking-tight">
            Izone
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mt-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-2 border-indigo-500/40 flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>
        </div>

        <div className="px-10 pb-2">
          {/* Headline */}
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight mb-2">You're invited!</h1>
          <p className="text-slate-400 text-sm mb-5">You've been invited to collaborate on</p>

          {/* Workspace info */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-left mb-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Workspace</p>
            <p className="text-slate-200 font-bold text-base truncate">
              {invite?.workspace_id ?? '—'}
            </p>
          </div>

          {/* Role badge */}
          <div className="inline-flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
            Joining as&nbsp;<strong className="text-indigo-300 capitalize">{invite?.role}</strong>
          </div>

          {/* CTA */}
          <button
            onClick={handleAccept}
            disabled={isJoining}
            className="w-full py-3.5 rounded-xl font-bold text-base text-white
              bg-gradient-to-r from-indigo-500 to-violet-600
              shadow-[0_8px_25px_rgba(99,102,241,0.4)]
              hover:shadow-[0_10px_30px_rgba(99,102,241,0.55)]
              hover:from-indigo-400 hover:to-violet-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 mb-3"
          >
            {isJoining
              ? <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining…
              </span>
              : 'Accept & Join Workspace →'
            }
          </button>

          {/* Email note */}
          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
            Invitation sent to <span className="text-slate-400 font-medium">{invite?.email}</span>
            <br />You must be logged in with this account to accept.
          </p>

          <hr className="border-indigo-500/10 mb-4" />

          {/* Decline */}
          <button
            onClick={() => router.push('/')}
            className="text-xs text-red-500/60 hover:text-red-400 transition underline mb-6"
          >
            Decline invitation
          </button>
        </div>

      </div>
    </div>
  );
}

export default function JoinWorkspacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <p className="text-slate-600 text-sm">Loading…</p>
      </div>
    }>
      <JoinWorkspaceContent />
    </Suspense>
  );
}