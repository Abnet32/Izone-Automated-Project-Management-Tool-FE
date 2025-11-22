// WorkspaceManager removed per design request to hide the left-side "All Workspaces / All Boards" panel.
// This component previously returned the WorkspaceManager UI. It now renders nothing so the
// left-side block will no longer appear where this component is used.

export default function BoardsPage() {
  return null;
}