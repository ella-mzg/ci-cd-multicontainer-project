# **Team Workflow Guidelines**

## **Best Practices**

### **1. Issues**

- **Use appropriate labels to categorize issues** (e.g., **"bug"**, **"feature"**, **"documentation"**, **"enhancement"**, etc.).
- **Track Issue State**:
  - Move the issue to **In Progress** when you start working on it.
  - Move the issue to **Review** after submitting a merge request.
  - Move the issue to **Closed** once the merge request has been approved and merged.
- **Comment on the issue** to track progress or highlight blockers if necessary.

---

### **2. Commits**

- **Keep commits small and focused**:
  - Avoid combining unrelated changes in a single commit.
- **Write clear messages**:
  - Be concise yet descriptive.
  - Use verbs like **"add"**, **"fix"**, **"remove"**, **"update"**, etc., to describe the action taken.
  - Include the issue number using `See #<issue-number>` or `Closes #<issue-number>` if resolving it.

**Examples:**

- `add docker commands in README - See #5`
- `fix database connection issue - Closes #8`

---

### **3. Branches**

- **Use Prefixes to indicate the branch purpose**:
  - `feat/` for new features
  - `fix/` for bug fixes
  - `docs/` for documentation changes
  - `ci-cd/` for changes related to CI/CD pipelines
- **Use the format**: `<prefix>/<issue-number>-<short-title>`
- **Keep your branch up to date** with the latest changes from `main`:
  ```bash
  git pull origin main
  ```
  **Examples:**
- `docs/5-usage-instructions`
- `fix/8-database-connection-error`

---

### **4. Merge Requests**

- The merge request title will become the commit message after squashing, so ensure it is clear and descriptive.
- **Use the format**: `<prefix>: <short description>`.

**Examples**:

- `docs: add usage instructions in README`
- `fix: resolve database connection issue`

---

### **4. Reviews**

- **Always review and test changes before merging.**
- **Review comments should be constructive.**

## **Workflow Overview**

### **1. Start with an Issue**

- Go to the issue board and select an issue to work on. (e.g., #10: Develop and Dockerize Backend Service).
- Assign the issue to yourself and move it to the **In Progress** column.

### **2. Create a Branch**

- Create a branch for the issue using the naming conventions:
  ```bash
  git checkout -b feat/10-develop-backend-service
  ```

### **3. Make Changes and Commit**

- Make necessary changes.
- Stage all changes:
  ```bash
  git add .
  ```
  or stage specific files:
  ```bash
  git add backend/Dockerfile backend/app.py
  ```
- Commit changes with a clear message:
  ```bash
  git commit -m "dockerize backend service - Closes #3"
  ```

### **4. Push Your Branch**

- Push the branch to the remote repository.
  ```bash
  git push origin feat/3-develop-backend-service
  ```

### **5. Submit a Merge Request**

- Open a Merge Request (MR) from your branch to the `main` branch.
- Use `Closes #<issue-number>` in the MR description to automatically close the issue when the MR is merged.

### **6. Review and Approve**

- You can assign the MR to a teammate for review.
- Wait for at least one approval.

### **7. Merge and Close**

- After approval, squash commits into a single meaningful commit during the merge to keep the history clean.
- Merge the MR into `main`.
- Move the issue to the **Closed** column if necessary.
