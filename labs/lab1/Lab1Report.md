# Lab 1 — Simple Messenger: CI/CD Cloud Deployment and Secure Implementation
# Report 

| | |
|---|---|
| **Course** | EECE/CS 3093C — Software Engineering, Summer 2026 |
| **Instructor** | Dr. Phu Phung |
| **Name** | Manjinder Kaur |
| ** Email** | kaurmd@mail.uc.edu |
| **GitHub Repository** | https://github.com/uc-se-sm26-kaurmd/eece3093c-Kaurmd |
| **Azure Live URL** | https://kaurmd-messenger-lab1.azurewebsites.net |

---
## Overview

In this lab, needed to build and deploy a chat application. This is done by using the code skeleton, altering the UI visuals, and running the app. These functions are then implemented by completing the use cases for Send Message and Receive Message. SSDLC security practices, such as a Content-Security-Policy header and DOMPurify are also enforced as protection against XSS attacks. This lab's learning outcomes involve deploying a messenging app and understanding different security measures.

## Task 1 — Git Branch, Node.js Web Application Setup and Testing

### Screenshot 1a — Local app running

*Caption:* [Terminal with `npm start` output and browser Web Preview with name visible.]

[task1a]:
 


### Commit Link
https://github.com/uc-se-sm26-kaurmd/eece3093c-Kaurmd/commit/369fac53f0a741bce26108d3ea9ff8cb16ee0406 

---

## Task 2 — CI/CD Pipeline and Azure Deployment

### Screenshot 2a — Azure App Service Overview
*Caption:* [Azure portal showing app name, status Running, and default domain URL.]

[task2a]:
 


### Screenshot 2b — GitHub Actions green run
*Caption:* [GitHub Actions tab showing the workflow run completed successfully (green checkmark).]

[task2b]:
 


### Screenshot 2c — Live app on Azure
*Caption:* [Browser showing the Messenger UI with name at the Azure URL, with browser console debug information visible.]

[task2c]:
 

---

## Task 3 — Use Case Realization: "Send Message"

### Analysis and Design

Copy the use case PBI from your personal board, including the use case brief description, user stories, acceptance criteria (AC), and the sequence diagram developed previously.

For each user story and AC, check the box to verify that it has been implemented.

### Screenshot 3a — `client.js` sendMessage() code
*Caption:* [`sendMessage()` implementation with AC comments visible.]

[task3a]:
 

### Screenshot 3b — `server.js` chat message handler
*Caption:* [Server-side `chat message` event handler with AC comments visible.]

[task3b]:
 


### Screenshot 3c — Two-tab live demo
*Caption:* [Message sent from one window appears in both, with username displayed. Demonstrates AC-01.3 and AC-01.4.]

[task3c]:
 

---

## Task 4 — Use Case Realization: "Receive Message"

### Analysis and Design

Copy the use case PBI from your personal board, including the use case brief description, user stories, acceptance criteria (AC), and the sequence diagram developed previously.

For each user story and AC, check the box to verify that it has been implemented.
### Screenshot 4a — `client.js` socket listeners
*Caption:* [`chat message` and `status` socket handler implementations with AC comments.]

[task4a]:
 

### Screenshot 4b — `server.js` connect/disconnect handlers
*Caption:* [Server-side connect and disconnect status emissions with AC comments.]

[task4b]:
 
 


### Screenshot 4c — Two-tab live demo with timestamp and status
*Caption:* [Chat message with timestamp visible (AC-02.2), join/leave notification in a visually separate status area (AC-02.3).]

[task4c]:
 

### Commit Link
https://github.com/uc-se-sm26-kaurmd/eece3093c-Kaurmd/commit/d55ca10925ed66e0084ff306b45814c215b9ce2f 

---


## Task 5 — Security: Input Validation, CSP, and XSS Prevention

5a. Screenshot of the GitHub Issue updated with new user stories and security ACs before implementing any security code. (SSDLC feedback loop)
5b. Screenshot of the XSS attack before the fix — show the alert dialog appearing in the victim's browser tab. The caption must identify which tab is the attacker and which is the victim.
5c. Screenshot of the XSS attack after the fix.
5d. Screenshot of the browser DevTools Network tab showing the Content-Security-Policy header in the server response.
5e. URL link to the specific commit for this task.


### Screenshot 5a — GitHub Issue (before security code)
*Caption:* [GitHub Issue updated with new user stories and security ACs before implementing any security code. (SSDLC feedback loop)]

[task5a]:
 

### Screenshot 5b — XSS attack BEFORE the fix
*Caption:* [Alert dialog appearing in the victim's browser tab on the left, with the attacker’s tab on the right.]

[task5b]:
 

### Screenshot 5c — XSS attack AFTER the fix
*Caption:* [The chat window code element showing the injected payload was removed. Demonstrates DOMPurify blocking the attack.]

[task5c]:
 

### Screenshot 5d — Browser DevTools CSP header
*Caption:* [Browser DevTools → Network tab → document response showing the `Content-Security-Policy` header returned by the server.]

[task5d]:
 


### Commit Link
https://github.com/uc-se-sm26-kaurmd/eece3093c Kaurmd/commit/24a23ab400e68a88163f12160adf3d11a43c8925 

---

## Reflection Questions

**Q1.** The Secure Software Development Lifecycle (SSDLC) principle applied in Step 0 requires creating a GitHub Issue *before* writing security code. Why is this order important, and how does it reflect the "security as a cross-cutting concern" principle discussed in Lecture 11?

Creating a GitHub issue first before writing security code is important to do because it shows how it will be involved during each and every step. Understanding and planning out these requirements before implementing anything is what allows us to realize that it is not just something that can be considered. 

---

**Q2.** In Task 5 you used `DOMPurify.sanitize()` rather than setting `element.textContent`. What is the key advantage of DOMPurify over `textContent` for this application, and why was the server-side `xss` npm package not used?

DOMPurify enables us to continue using formatting that is not dangerous, whereas textContent would erase the whole thing and not allow any formatting. The server-side XSS npm package was not used because the attack was directed toward the browser. DOMPurify ensured that the browser was sanitized.

---

**Q3.** Explain why the `style-src 'unsafe-inline'` directive was needed in the CSP configuration, and what risk this introduces. How would you mitigate that risk in a future sprint?

The directive was needed in the CSP configuration because it allows for the code to work and be allowed by CSP. This, however, may allow attackers to inject code that is malicious and involves changing the inline styles. To mitigate that risk in a future sprint, one way might be to use DOMPurify to prevent dangerous inline code. Another way would be to alter the CSP.

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
