# Lab 1 — Simple Messenger: CI/CD Cloud Deployment and Secure Implementation
# Report 

| | |
|---|---|
| **Course** | EECE/CS 3093C — Software Engineering, Summer 2026 |
| **Instructor** | Dr. Phu Phung |
| **Name** | *[Your Full Name]* |
| ** Email** | *[yourlogin@mail.uc.edu]* |
| **GitHub Repository** | *[https://github.com/yourusername/se-yourid]* |
| **Azure Live URL** | *[https://yourid-messenger-lab1.azurewebsites.net]* |

---
## Overview

Provide a brief overview of the lab and its learning outcomes.

## Task 1 — Git Branch, Node.js Web Application Setup and Testing

### Screenshot 1a — Local app running
*Caption:* [Describe what the screenshot shows — terminal with `npm start` output and browser Web Preview with your name visible.]

![task1a](task1a-npm-start-webpreview.png)

### Commit Link
*[URL to your specific commit for Task 1 — e.g., https://github.com/yourusername/se-yourlogin/commit/abc1234]*

---

## Task 2 — CI/CD Pipeline and Azure Deployment

### Screenshot 2a — Azure App Service Overview
*Caption:* [Azure portal showing app name, status Running, and default domain URL.]

![task2a](task2a-azure-overview.png)

### Screenshot 2b — GitHub Actions green run
*Caption:* [GitHub Actions tab showing the workflow run completed successfully (green checkmark).]

![task2b](task2b-github-actions.png)

### Screenshot 2c — Live app on Azure
*Caption:* [Browser showing the Messenger UI with your name at the Azure URL, with browser console debug information visible.]

![task2c](task2c-live-azure-app.png)

---

## Task 3 — Use Case Realization: "Send Message"

### Analysis and Design

Copy the use case PBI from your personal board, including the use case brief description, user stories, acceptance criteria (AC), and the sequence diagram developed previously.

For each user story and AC, check the box to verify that it has been implemented.

### Screenshot 3a — `client.js` sendMessage() code
*Caption:* [Your `sendMessage()` implementation with AC comments visible.]

![task3a](task3a-client-sendmessage.png)

### Screenshot 3b — `server.js` chat message handler
*Caption:* [Server-side `chat message` event handler with AC comments visible.]

![task3b](task3b-server-chathandler.png)

### Screenshot 3c — Two-tab live demo
*Caption:* [Two browser windows at Azure URL — a message sent from one window appears in both, with username displayed. Demonstrates AC-01.3 and AC-01.4.]

![task3c](task3c-two-tab-send.png)

### Commit Link
*[URL to your specific commit for Task 3]*

---

## Task 4 — Use Case Realization: "Receive Message"

### Analysis and Design

Copy the use case PBI from your personal board, including the use case brief description, user stories, acceptance criteria (AC), and the sequence diagram developed previously.

For each user story and AC, check the box to verify that it has been implemented.
### Screenshot 4a — `client.js` socket listeners
*Caption:* [Your `chat message` and `status` socket handler implementations with AC comments.]

![task4a](task4a-client-receive.png)

### Screenshot 4b — `server.js` connect/disconnect handlers
*Caption:* [Server-side connect and disconnect status emissions with AC comments.]

![task4b](task4b-server-status.png)

### Screenshot 4c — Two-tab live demo with timestamp and status
*Caption:* [Two browser windows — chat message with timestamp visible (AC-02.2), join/leave notification in a visually separate status area (AC-02.3).]

![task4c](task4c-two-tab-receive.png)

### Commit Link
*[URL to your specific commit for Task 4]*

---


## Task 5 — Security: Input Validation, CSP, and XSS Prevention

5a. Screenshot of the GitHub Issue updated with new user stories and security ACs before implementing any security code. (SSDLC feedback loop)
5b. Screenshot of the XSS attack before the fix — show the alert dialog appearing in the victim's browser tab. The caption must identify which tab is the attacker and which is the victim.
5c. Screenshot of the XSS attack after the fix.
5d. Screenshot of the browser DevTools Network tab showing the Content-Security-Policy header in the server response.
5e. URL link to the specific commit for this task.


### Screenshot 5a — GitHub Issue (before security code)
*Caption:* [ GitHub Issue updated with new user stories and security ACs before implementing any security code. (SSDLC feedback loop)]

![task5a](task5a-github-issue.png)

### Screenshot 5b — XSS attack BEFORE the fix
*Caption:* [Two browser tabs open. show the alert dialog appearing in the victim's browser tab. The caption must identify which tab is the attacker and which is the victim.]

![task5b](task5b-xss-before-fix.png)

### Screenshot 5c — XSS attack AFTER the fix
*Caption:* [The chat window code element showing the injected payload was removed. Demonstrates DOMPurify blocking the attack.]

![task5c](task5c-xss-after-fix.png)

### Screenshot 5d — Browser DevTools CSP header
*Caption:* [Browser DevTools → Network tab → document response showing the `Content-Security-Policy` header returned by the server.]

![task5d](task5d-devtools-csp.png)


### Commit Link
*[URL to your specific commit for Task 5]*

---

## Reflection Questions

**Q1.** The Secure Software Development Lifecycle (SSDLC) principle applied in Step 0 requires creating a GitHub Issue *before* writing security code. Why is this order important, and how does it reflect the "security as a cross-cutting concern" principle discussed in Lecture 11?

*[Your answer here.]*

---

**Q2.** In Task 5 you used `DOMPurify.sanitize()` rather than setting `element.textContent`. What is the key advantage of DOMPurify over `textContent` for this application, and why was the server-side `xss` npm package not used?

*[Your answer here.]*

---

**Q3.** Explain why the `style-src 'unsafe-inline'` directive was needed in the CSP configuration, and what risk this introduces. How would you mitigate that risk in a future sprint?

*[Your answer here.]*

---

## Summary

| Task | Description | Points Claimed |
|---|---|---|
| Task 1 | Skeleton setup, package.json, local test | /6 |
| Task 2 | CI/CD pipeline and Azure deployment | /6 |
| Task 3 | Use-Case-01: Send Message | /6 |
| Task 4 | Use-Case-02: Receive Message | /6 |
| Task 5 | Security: XSS prevention and CSP | /6 |
| Report | Screenshots, captions, commit links | /5 |
| **Total** | | **/35** |
---

*This lab report was prepared as part of EECE/CS 3093C Software Engineering, Summer 2026, University of Cincinnati.*
