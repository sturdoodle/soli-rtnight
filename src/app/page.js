import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata, getJsonLd } from "@/lib/seo-config";

export const generateMetadata = async () => {
  const pageData = {
    title: "Free ATS-Compliant Resume Builder: Create a Professional Resume",
    description: "Build a job-winning, ATS-compliant resume in minutes. Use our free, professional templates to get past automated hiring filters and land more interviews. No sign-up required.",
    path: "/"
  };
  return getMetadata(pageData);
};

export default function Home() {
  const pageData = {
    title: "Free ATS Resume Builder 2026 | Professional CV Maker & AI Resume Creator",
    path: "/",
    faqs: [
      {
        question: "Is this resume builder really free?",
        answer: "Yes, QPkendra's ATS Resume Builder is 100% free with no hidden charges. You can create, edit, and download your professional resume in PDF format without any cost."
      },
      {
        question: "Are the resumes ATS-compliant?",
        answer: "Absolutely. Our templates are designed based on industry standards to ensure they are fully ATS-compliant and easily readable by Applicant Tracking Systems (ATS) used by major recruiters."
      },
      {
        question: "Do I need to create an account?",
        answer: "No account is required. Your data is stored locally in your browser, ensuring privacy and instant access without a sign-up process."
      }
    ]
  };
  const jsonLd = getJsonLd(pageData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Visually hidden but accessible H1 for SEO */}
      <h1 className="sr-only">
        Free ATS-Compliant Resume Builder: Create a Professional, Job-Winning Resume for Free
      </h1>
      
      <ClientOnlyEditor version="v5" />
      
      {/* Hidden SEO-rich content for search engines */}
      <section className="sr-only" aria-hidden="true">
        <h2>Professional Resume Templates</h2>
        <p>Choose from a variety of ATS-optimized resume templates designed for 2026. Our AI-driven builder helps you craft the perfect CV.</p>
        <ul>
          <li>Real-time preview</li>
          <li>Instant PDF export</li>
          <li>Privacy-focused (No sign-up)</li>
          <li>Industry-standard keywords</li>
        </ul>
      </section>
    </>
  );
}

