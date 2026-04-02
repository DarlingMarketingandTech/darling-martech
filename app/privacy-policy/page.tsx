import type { Metadata } from 'next'
import styles from './PrivacyPolicy.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Darling MarTech',
  description:
    'Privacy Policy for Darling Martech Dev — how data is handled when using the custom GPT and its GitHub integration.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Privacy Policy for Darling Martech Dev</h1>
        <p className={styles.meta}>Effective Date: April 2, 2026</p>

        <p>
          This Privacy Policy describes how Marketing and Technology LLC (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) handles information through the Darling Martech Dev Custom GPT (the
          &quot;GPT&quot;) and its integrated GitHub actions.
        </p>

        <h2>1. Information Processing &amp; GitHub Integration</h2>
        <p>
          Darling Martech Dev is an autonomous full-stack copilot. To perform audits and ship code, it
          interacts with the GitHub API based on the permissions you grant.
        </p>
        <ul>
          <li>
            <strong>Repository Access:</strong> The GPT accesses file contents, branch structures, and
            commit history via the getRepository and getFileContent actions to provide technical
            insights.
          </li>
          <li>
            <strong>Write Permissions:</strong> When instructed, the GPT uses actions such as
            createBranch, createCommit, and createPR to modify your repositories. No write actions
            are performed without your explicit request or confirmation within the chat interface.
          </li>
          <li>
            <strong>Authentication:</strong> Your GitHub credentials (API Keys or OAuth tokens) are
            managed securely by OpenAI&apos;s infrastructure. We do not host or store your private
            keys on our own servers.
          </li>
        </ul>

        <h2>2. Data Usage</h2>
        <ul>
          <li>
            <strong>Real-time Processing:</strong> Data retrieved from your GitHub repositories is
            processed in real-time to fulfill your specific prompts.
          </li>
          <li>
            <strong>No Persistent Code Storage:</strong> Marketing and Technology LLC does not
            maintain a database of your source code, proprietary algorithms, or personal repository
            data outside of the immediate session context provided by the OpenAI platform.
          </li>
        </ul>

        <h2>3. Third-Party Services</h2>
        <ul>
          <li>
            <strong>OpenAI:</strong> As a Custom GPT, all interactions are subject to the OpenAI
            Privacy Policy.
          </li>
          <li>
            <strong>GitHub:</strong> This GPT communicates directly with https://api.github.com.
            Your use of this GPT is also governed by your existing agreement and privacy settings
            with GitHub, Inc.
          </li>
        </ul>

        <h2>4. User Control &amp; Security</h2>
        <ul>
          <li>
            <strong>Scope of Access:</strong> We recommend using GitHub Fine-grained Personal Access
            Tokens to limit the GPT&apos;s access to only the specific repositories intended for
            auditing or development.
          </li>
          <li>
            <strong>Data Deletion:</strong> You can terminate the GPT&apos;s access at any time by
            revoking the API connection in your GPT settings or your GitHub account security portal.
          </li>
        </ul>

        <h2>5. Contact Information</h2>
        <p>For questions regarding this policy or the data handling practices of this GPT, please contact:</p>
        <address className={styles.address}>
          <div>Marketing and Technology LLC</div>
          <div>Indianapolis, IN</div>
          <div>
            Email: <a href="mailto:jacob@jdarlingmt.com">jacob@jdarlingmt.com</a>
          </div>
          <div>
            Website: <a href="https://darlingmartech.com">darlingmartech.com</a>
          </div>
        </address>
      </div>
    </article>
  )
}
