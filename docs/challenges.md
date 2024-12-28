# Main Difficulties Encountered and Solutions

## **DNS Resolution Issues**

### Problem Encountered

While setting up the application with Dockerized services, the frontend encountered communication issues with the backend due to:

- **CORS (Cross-Origin Resource Sharing)** restrictions.
- Misconfigured environment variables for backend URLs.

Specifically:

- The frontend at `http://localhost:3000` was unable to fetch data from the backend at `http://backend:5000` due to browser-enforced CORS rules.
- The backend URL (`http://backend:5000`) worked within Docker containers but was inaccessible from the browser, which required `http://localhost:5000` for cross-origin requests.

### Root Cause

- **DNS Resolution**: Browsers cannot resolve Docker’s internal network addresses (e.g., `http://backend`) and instead require external-facing addresses.
- **Environment Variables**: The backend URL, configured for Docker's internal networking, was not adapted for browser-facing requests.

### Steps Taken to Investigate

1. Verified internal connectivity between containers and confirmed that the issue was specific to browser access.
2. Reviewed the backend's CORS configuration and ensured it included the necessary headers.
3. Checked and adjusted how environment variables were passed to ensure they aligned with the browser’s expectations.

### Resolution

- Updated environment variables to provide the correct backend URL (`http://localhost:5000`) for browser access while maintaining Docker's internal networking configuration.
- Restarted Docker containers to apply changes and verified connectivity from both the browser and within the Docker network.

### Lessons Learned

1. **CORS Debugging**:
   - Always test connectivity from both inside the container and the browser to identify networking versus browser-specific issues.
2. **DNS Resolution**:
   - Understand the distinction between internal Docker service names and external addresses required by the browser.
3. **Environment Variables**:
   - Properly configure environment variables for compatibility across development and production environments.

---

## **Direct Pushes and Disordered Merges on Main Branch**

### Problem Encountered

Significant disruptions occurred due to improper version control practices by a team member, including unauthorized direct pushes to the `main` branch and disorderly merging of merge requests.

### Root Cause

- **Non-Compliance with Version Control Protocols**: Despite established guidelines, the team member disregarded them, leading to workflow disruptions and unstable code in the `main` branch.

### Resolution

- **Reset the Main Branch**: Reverted the `main` branch to its last stable state before the disruptive changes.
- **Reordered Merge Requests**: Reorganized and remerged merge requests to maintain proper sequence and dependency management.

### Lessons Learned

1. **Branch Protection Policies**:
   - Implement strict branch protection rules to prevent direct pushes and enforce proper review processes.
2. **Team Accountability**:
   - Ensure all team members understand and adhere to version control protocols to avoid similar disruptions in future projects.
