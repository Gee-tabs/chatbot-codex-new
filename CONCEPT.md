# Avatar Chatbot Concept + Layout (Web App)

## Core Principle
The avatar **shows** assets (photos, videos, slides, 3D) directly. It does **not** narrate or describe them in text. Text is reserved for intent, instructions, or coordination.

## Layout Structure
- **Top Bar**: brand, workspace modes, share/new session.
- **Left Panel (Avatar + Controls)**: avatar presence, mode toggle, operator controls.
- **Center Panel (Content Stage)**: primary canvas where the selected asset is displayed.
- **Right Panel (Conversation)**: text chat + inline asset cards that activate the stage.

## Interaction Flow
1. User asks for a deliverable or asset.
2. Avatar responds with minimal coordination text.
3. Asset appears as a card in chat and in the asset shelf.
4. Clicking a card **shows the actual asset** in the stage.
5. Stage remains the focal point while avatar continues speaking.

## Asset Handling
- **Photo**: full‑bleed image in the stage.
- **Video**: stage video player with controls.
- **Slides**: embedded deck in the stage.
- **3D**: viewer mount placeholder (swap to a real 3D viewer container like model‑viewer or three.js).

## Conversation Rules
- No textual descriptions of assets.
- Text is used for: intent confirmation, sequencing, and next steps.
- Attachments are first‑class objects with thumbnails and metadata.

## States
- **Idle**: “Select an asset to display.”
- **Active**: stage contains the chosen asset.
- **Handoff**: avatar paused; stage stays active.

## Mobile Behavior
- Panels stack vertically: Avatar → Stage → Chat.
- Stage and asset shelf remain above the chat feed.

## Why This Works
- Keeps the asset as the primary output, not a text summary.
- Clear separation of presence (avatar) and evidence (media).
- Scales to many asset types without changing the interaction model.
