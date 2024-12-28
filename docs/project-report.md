# Project Report

## Project Organization

The project was managed using GitLab's issue board, with tasks initially assigned to individual team members. However, several challenges arose that impacted the workflow:

- One team member left before the project began, leaving the remaining two to adjust.
- Differences in planning approaches between the remaining members caused delays and misalignment.
- Meetings were infrequent due to conflicting schedules, leading to minimal task assignment and reliance on informal discussions.
- Despite establishing and documenting clear guidelines at the start, they were not consistently followed, further complicating progress.
- Due to significant delays in code reviews, I eventually stopped waiting for reviews to merge my code, prioritizing progress over process.

These issues collectively resulted in delays and ultimately a late delivery of the project.

---

## Main Difficulties Encountered and Solutions

### **DNS Resolution Issues**

#### Problem Encountered

While setting up the application with Dockerized services, the frontend encountered communication issues with the backend due to:

- **CORS (Cross-Origin Resource Sharing)** restrictions.
- Misconfigured environment variables for backend URLs.

Specifically:

- The frontend at `http://localhost:3000` was unable to fetch data from the backend at `http://backend:5000` due to browser-enforced CORS rules.
- The backend URL (`http://backend:5000`) worked within Docker containers but was inaccessible from the browser, which required `http://localhost:5000` for cross-origin requests.

#### Root Cause

- **DNS Resolution**: Browsers cannot resolve Docker’s internal network addresses (e.g., `http://backend`) and instead require external-facing addresses.
- **Environment Variables**: The backend URL, configured for Docker's internal networking, was not adapted for browser-facing requests.

#### Steps Taken to Investigate

1. Verified internal connectivity between containers and confirmed that the issue was specific to browser access.
2. Reviewed the backend's CORS configuration and ensured it included the necessary headers.
3. Checked and adjusted how environment variables were passed to ensure they aligned with the browser’s expectations.

#### Resolution

- Updated environment variables to provide the correct backend URL (`http://localhost:5000`) for browser access while maintaining Docker's internal networking configuration.
- Restarted Docker containers to apply changes and verified connectivity from both the browser and within the Docker network.

#### Lessons Learned

1. **CORS Debugging**:
   - Always test connectivity from both inside the container and the browser to identify networking versus browser-specific issues.
2. **DNS Resolution**:
   - Understand the distinction between internal Docker service names and external addresses required by the browser.
3. **Environment Variables**:
   - Properly configure environment variables for compatibility across development and production environments.

---

### **Direct Pushes and Disordered Merges on Main Branch**

#### Problem Encountered

Significant disruptions occurred due to improper version control practices by a team member, including unauthorized direct pushes to the `main` branch and disorderly merging of merge requests.

#### Root Cause

- **Non-Compliance with Version Control Protocols**: Despite established guidelines, the team member disregarded them, leading to workflow disruptions and unstable code in the `main` branch.

#### Resolution

- **Reset the Main Branch**: Reverted the `main` branch to its last stable state before the disruptive changes.
- **Reordered Merge Requests**: Reorganized and remerged merge requests to maintain proper sequence and dependency management.

#### Lessons Learned

1. **Branch Protection Policies**:
   - Implement strict branch protection rules to prevent direct pushes and enforce proper review processes.
2. **Team Accountability**:
   - Ensure all team members understand and adhere to version control protocols to avoid similar disruptions in future projects.

---

## Critical Analysis of GitLab and SAST Usage

### **GitLab for Project Management and CI/CD**

GitLab and its tools were critical to the success of this project, significantly enhancing productivity, code quality, and security. Its seamless integration of issue tracking, version control, and CI/CD pipeline automation streamlined the workflow. Key observations include:

- **Strengths**:

  - **Unified Platform**: Combining code management, CI/CD, and issue tracking in one platform simplified project organization.
  - **Ease of Use**: The `.gitlab-ci.yml` file was easy to configure, enabling effective automation of build, test, and deploy stages.
  - **Real-Time Feedback**: Immediate pipeline status updates facilitated quick identification and resolution of issues.

- **Challenges**:
  - **Pipeline Debugging**: Debugging complex pipelines, particularly with Docker and GitLab Runners, required extra effort as error logs could be cryptic.
  - **Learning Curve**: Some features, such as configuring self-hosted runners, involved trial and error despite extensive documentation.

---

### **SAST (Static Application Security Testing)**

GitLab’s SAST tool offered useful insights into code quality and security by automatically scanning the codebase during the CI pipeline to identify potential vulnerabilities early in development.

However, I encountered significant limitations, particularly with the free version of GitLab. Even after lowering thresholds and adding custom rules, the tool often failed to detect vulnerabilities. To test its effectiveness, I deliberately introduced insecure patterns, but the results were mixed:

- **JavaScript**: Critical vulnerabilities like `eval`, `document.write`, and unsafe `innerHTML` were not flagged.
- **Python**: While the tool identified issues like `os.system("rm -rf /")`, it ignored other dangerous constructs such as `exec("...")`.

_For more details about detected vulnerabilities, refer to the `gl-sast-report.json` file included in the `docs/` directory of the project._

Another issue was that the SAST pipeline didn’t automatically fail when vulnerabilities were detected. Although I enabled SAST using the default GitLab template in `.gitlab-ci.yml`, I had to create a custom job to enforce pipeline failures. This involved parsing the `gl-sast-report.json` file for vulnerabilities and explicitly exiting with a non-zero status.

In summary, while GitLab’s SAST tool was somewhat effective, it required significant customization to enforce proper security measures. For more reliable static analysis, especially on the free plan, integrating tools like Semgrep could provide better coverage and flexibility.

---

## Future Improvements

To further enhance the project and improve its security, efficiency, and maintainability, here are some ideas for improvement:

- **DNS Management**: Implement Traefik or a similar solution to streamline DNS resolution across environments.
- **Environment Modes**: Simplify switching between development and production modes to minimize manual configuration.
- **Security Enhancements**:
  - Add server-side validation to ensure data integrity.
  - Secure PostgreSQL secrets by moving them out of project files and into a dedicated secret management system.
  - Refine SAST usage by focusing scans and introducing custom rules tailored for Python and JavaScript.
- **Code Quality**: Integrate a linting job into the pipeline to enforce coding standards and identify potential issues early.
- **Optimized Dependency Management**: Ensure test dependencies like Jest and Pytest are installed only during test jobs and not during the build stage to reduce unnecessary overhead.
