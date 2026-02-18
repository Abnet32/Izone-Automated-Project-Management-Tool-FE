import { User } from "@/types"; // Assuming you have a User type, otherwise I'll define a local one

// Types based on the design document
export interface Invitation {
  id: string;
  email: string;
  workspace_id: string;
  workspace_name: string; // Mocked for display
  inviter_name: string;   // Mocked for display
  role: "owner" | "member" | "admin";
  token: string;
  expires_at: string;
  status: "pending" | "accepted" | "expired";
}

export interface SendInvitationPayload {
  email: string;
  workspace_id: string;
  role: "member" | "admin";
}

// Mock database
const MOCK_INVITATIONS: Invitation[] = [
  {
    id: "inv-1",
    email: "test@example.com",
    workspace_id: "ws-1",
    workspace_name: "Acme Corp",
    inviter_name: "John Doe",
    role: "member",
    token: "valid-token-123",
    expires_at: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    status: "pending",
  },
  {
    id: "inv-2",
    email: "expired@example.com",
    workspace_id: "ws-1",
    workspace_name: "Acme Corp",
    inviter_name: "John Doe",
    role: "member",
    token: "expired-token-456",
    expires_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: "expired",
  }
];

const API_DELAY = 1000; // ms

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const invitationsAPI = {
  /**
   * Send an invitation to an email address
   * Mocks POST /api/invitations
   */
  async sendInvitation(payload: SendInvitationPayload): Promise<Invitation> {
    await delay(API_DELAY);

    // Simulate backend validation
    if (!payload.email || !payload.email.includes("@")) {
      throw new Error("Invalid email address");
    }

    const newInvitation: Invitation = {
      id: `inv-${Math.random().toString(36).substr(2, 9)}`,
      email: payload.email,
      workspace_id: payload.workspace_id,
      workspace_name: "Demo Workspace", // Mocked
      inviter_name: "You",              // Mocked
      role: payload.role,
      token: `${Math.random().toString(36).substr(2)}`,
      expires_at: new Date(Date.now() + 86400000 * 7).toISOString(),
      status: "pending",
    };

    MOCK_INVITATIONS.push(newInvitation);
    console.log("[MOCK API] Invitation sent:", newInvitation);
    console.log(`[MOCK API] SHARE THIS LINK: http://localhost:3000/invite?token=${newInvitation.token}`);
    
    return newInvitation;
  },

  /**
   * Validate an invitation token and get details
   * Mocks GET /api/invitations/{token}
   */
  async getInvitation(token: string): Promise<Invitation> {
    await delay(API_DELAY);

    const invitation = MOCK_INVITATIONS.find((i) => i.token === token);

    if (!invitation) {
      throw new Error("Invalid or missing invitation");
    }

    if (new Date(invitation.expires_at) < new Date()) {
       // Auto-expire if checking
       invitation.status = "expired";
       throw new Error("Invitation has expired");
    }

    if (invitation.status !== "pending") {
        throw new Error(`Invitation is ${invitation.status}`);
    }

    return invitation;
  },

  /**
   * Accept an invitation
   * Mocks POST /api/invitations/{token}/accept
   */
  async acceptInvitation(token: string): Promise<void> {
    await delay(API_DELAY);

    const invitation = MOCK_INVITATIONS.find((i) => i.token === token);

    if (!invitation || invitation.status !== "pending") {
      throw new Error("Cannot accept this invitation");
    }

    // In a real app, this would add the user to the workspace
    invitation.status = "accepted";
    console.log("[MOCK API] Invitation accepted for:", invitation.email);
  }
};
