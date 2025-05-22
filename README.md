# WebJournal

## **Project Overview**
This is a **journaling app**. Intended features of MVP include:
- Making journal entries.
- Reviewing past entries.
- Allowing Photo Uploads.
- Having Spotify songs linked to your entries that describe your day.
---

## **Tech Stack**
| Feature | Technology |
|------------|--------------|
| **Frontend** | Next.js, Tailwind CSS |
| **Auth** | NextAuth, Google OAuth |
| **Backend** | MongoDB  |
| **APIs** | Spotify webAPI  |
---

## **Contribution Rules**
Features and Changes needed are found under the **Issues Tab**.  
Each issue's title is of the format: [x]-Issue description, where x+1 is the order in which an issue should be implemented. IE: Issue 0 should be first to be implemented, issue 1 should be 2nd, and so on. Some issues can be completed in parallel, which requires your judgment to decide.  
To make a change as a contributor:
- Select the issue that you want to address and assign it to yourself
- Create a branch, name it after the issue, and check it out
- Commit changes to the branch
    - For the commit message, style it like this: [issue#] - how much progress you made/what you made progress on
- Once you want the changes to be added to the main branch, push your code and make a pull request
- Pull Requests will only require 1 approval
- Once the PR is approved, go to the issue tab and mark the issue as completed
---
## **Future ideas**
- Integrating LLM to label and color code the mood of daily entries
- Having a conversation mode: allowing users to make entries by having a conversation with the LLM and having the LLM either synthesize an entry from the conversation or directly save the conversation as an entry.
