# Data Model

## Entities

### Conversation
A session of back-and-forth between a user and the AI, tied to a specific analytics context. Represents the top-level container for an AI interaction.

### Message
A single turn in a conversation — either a user query or an AI response. AI messages include source traceability metadata linking the answer back to the semantic layer.

### Feedback
A thumbs up or thumbs down rating attached to an AI message, optionally accompanied by a short written comment. Captures immediate signal on response quality.

### FeedbackForm
A structured set of feedback fields submitted for a specific AI message — including reason categories and free-text detail. Provides richer qualitative signal beyond a simple rating.

### CsatSurvey
A satisfaction survey triggered after a conversation ends, capturing an overall experience score and an optional comment. Measures end-to-end AI interaction quality.

## Relationships

- Conversation has many Messages
- Message belongs to a Conversation
- Message has one Feedback (optional)
- Message has one FeedbackForm (optional)
- Conversation has one CsatSurvey (optional)
