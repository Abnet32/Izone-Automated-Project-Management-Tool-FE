"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { invitationsAPI, type Invitation } from "@/lib/api/invitations";
import { toast } from "sonner";
import { authTokenManager } from "@/lib/api/auth";

function InviteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [invitation, setInvitation] = useState<Invitation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(authTokenManager.isLoggedIn());
    }, []);

    useEffect(() => {
        if (!token) {
            setError("Missing invitation token");
            setLoading(false);
            return;
        }

        const fetchInvitation = async () => {
            try {
                const data = await invitationsAPI.getInvitation(token);
                setInvitation(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Invalid or expired invitation");
            } finally {
                setLoading(false);
            }
        };

        fetchInvitation();
    }, [token]);

    const handleAccept = async () => {
        if (!token) return;

        setAccepting(true);
        try {
            await invitationsAPI.acceptInvitation(token);
            toast.success("Invitation accepted! Redirecting to workspace...");

            // Redirect to the workspace after a short delay
            setTimeout(() => {
                if (invitation) {
                    router.push(`/workspace/${invitation.workspace_id}`);
                } else {
                    router.push("/dashboard");
                }
            }, 1000);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to accept invitation");
            setAccepting(false);
        }
    };

    const handleLogin = () => {
        // Redirect to login with return url
        router.push(`/login?redirect=/invite?token=${token}`);
    };

    const handleSignup = () => {
        // Redirect to signup with return url
        router.push(`/signup?redirect=/invite?token=${token}${invitation?.email ? `&email=${encodeURIComponent(invitation.email)}` : ''}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md border-red-200">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <CardTitle className="text-red-700">Invitation Error</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                        <Button variant="outline" onClick={() => router.push("/")}>
                            Home
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">You've been invited!</CardTitle>
                    <CardDescription>
                        <strong>{invitation?.inviter_name}</strong> invited you to join the workspace <strong>{invitation?.workspace_name}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-100">
                        <div className="flex justify-between mb-2">
                            <span>Role:</span>
                            <span className="font-medium capitalize text-gray-900">{invitation?.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Email:</span>
                            <span className="font-medium text-gray-900">{invitation?.email}</span>
                        </div>
                    </div>

                    {!isAuthenticated && (
                        <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded">
                            You need to be logged in to accept this invitation.
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    {isAuthenticated ? (
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleAccept}
                            disabled={accepting}
                        >
                            {accepting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                <>
                                    Join Workspace
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button variant="outline" onClick={handleLogin}>
                                Log In
                            </Button>
                            <Button onClick={handleSignup}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default function InvitePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        }>
            <InviteContent />
        </Suspense>
    );
}
