# Main Difficulties Encountered and Solutions

## **DNS Resolution Issues (Local Development)**

### Problem Encountered

During local development, the frontend encountered communication issues with the backend.

### Root Cause

- Browsers cannot resolve Docker’s internal network addresses and instead require external-facing addresses.

### Steps Taken to Investigate

1. Verified internal connectivity between containers and confirmed that the issue was specific to browser access.
2. Reviewed the backend's CORS configuration and ensured it included the necessary headers.
3. Checked and adjusted how environment variables were passed to ensure they aligned with the browser’s expectations.

### Resolution

- Set the frontend's environment variable to use `http://localhost:5000` for API requests during local development.
- Ensured the backend URL aligned with the browser's network context.

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

---

## **Frontend-Backend Communication via Public Address**

### Problem Encountered

Initially, the application had issues being accessed and functioning correctly when using the VM’s public IP address:

1. The frontend service was not accessible externally on port 3000.
2. After resolving access to the frontend, the frontend could not fetch data from the backend, even though the backend was functional within the Docker network.
3. Adding NGINX as a reverse proxy to bridge the frontend and backend introduced a similar issue: external access was still blocked due to port 80 not being open.

### Root Cause

- **Firewall Restrictions in Azure VM Settings**: The Azure VM's network security settings initially blocked inbound traffic on both port 3000 (frontend) and port 80 (NGINX).
- **DNS and Proxying**: The frontend browser could not directly resolve Docker service names (`http://backend:5000`) and required a publicly accessible route to access backend APIs.

### Steps Taken to Investigate

1. Verified connectivity between Docker containers to confirm internal networking was working.
2. Tested browser access to the VM's public IP.
3. Analyzed the browser network logs.
4. Added NGINX to serve as a reverse proxy.
5. Tested the NGINX configuration internally and externally.

### Resolution

- Updated the Azure VM's firewall rules to allow external traffic on:
  - Port 3000 for accessing the frontend during development.
  - Port 80 for accessing NGINX as the reverse proxy in production.
- Configured NGINX to route requests to the backend, allowing the frontend to use `/backend` as the API base URL.
- Confirmed that the frontend could fetch data from the backend via NGINX without DNS resolution issues.

### Lessons Learned

1. **Firewall Configuration**:

   - When deploying on cloud VMs, ensure all necessary ports are explicitly allowed for external traffic.
   - Consider restricting access to specific IP ranges for enhanced security in production environments.

2. **Using a Reverse Proxy**:

   - Adding NGINX simplifies frontend-backend communication in containerized environments, especially when exposing services externally.

## **Handling Environment-Specific Configurations**

### Problem Encountered

The application needed to function seamlessly across three distinct environments, each requiring its own database configuration and tailored settings:

1. **Tests**: SQLite database for lightweight, in-memory testing.
2. **Docker Compose**: PostgreSQL database specified in the containerized environment.
3. **Local Development**: PostgreSQL database running on the developer's local machine.

This complexity was compounded by the need to dynamically adjust host, port, and other configurations based on the environment. Managing these variables while avoiding conflicts presented a significant challenge, especially during frequent environment switches.

### Resolution

- Simplified the `.env` file configuration:

  - Consolidated to a single `.env` file at the root of the project instead of maintaining multiple files for each service.
  - Established default values for local development to ensure a consistent baseline configuration.
  - Leveraged **NGINX** and variables in the Docker Compose file to minimize reliance on `.env` for containerized setups.

- Implemented fallback mechanisms to:
  - Use SQLite for testing when no database URL is explicitly set.
  - Ensure the app does not crash if key environment variables are missing.

### Lessons Learned

1. **Dynamic Defaults**:

   - Providing intelligent defaults for key variables like `DATABASE_URL` reduces the risk of errors across environments.

2. **Environment Variable Simplification**:

   - Consolidating environment variables and documenting their purpose helps streamline development and prevent configuration conflicts.

3. **Environment-Specific Testing**:
   - Testing the application across all target environments (local, containerized, and test setups) is essential to identify configuration-related issues early.
