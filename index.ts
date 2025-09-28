// Generated script for workflow 776459ec-7bcf-4215-b9a9-4719f75234d7
// Generated at 2025-09-28T19:38:20.441Z

import { Stagehand, type ConstructorParams } from "@browserbasehq/stagehand";
import { z } from "zod";

// Stagehand configuration
const stagehandConfig = (): ConstructorParams => {
  return {
    env: "BROWSERBASE",
    verbose: 1,
    modelName: "google/gemini-2.5-flash-preview-05-20",
    disablePino: true,
    modelClientOptions: {
      apiKey: process.env.GOOGLE_API_KEY,
    },
  };
};

async function runWorkflow() {
  let stagehand: Stagehand | null = null;

  try {
    // Initialize Stagehand
    console.log("Initializing Stagehand...");
    stagehand = new Stagehand(stagehandConfig());
    await stagehand.init();
    console.log("Stagehand initialized successfully.");

    // Get the page instance
    const page = stagehand.page;
    if (!page) {
      throw new Error("Failed to get page instance from Stagehand");
    }

    // Step 1: Navigate to URL
    console.log("Navigating to: https://vaul.emilkowal.ski/getting-started");
    await page.goto("https://vaul.emilkowal.ski/getting-started");

    // Step 2: Extract data
    console.log(
      `Extracting: Reading and extracting data of all interactive elements on this page.`
    );
    const extractedData2 = await page.extract({
      instruction: `give me all the actions possible on https://vaul.emilkowal.ski/getting-started annotating them in the following data structure

{
  "website_section": "Sidebar",
  "website_section_selector": "nav.sidebar",
  "state_before": "The sidebar is visible.",
  "state_after": "The sidebar is hidden.",
  "change_analysis": "The sidebar is hidden after the click.",
  "element_aria_label": "Collapse the sidebar.", // What the action does (later used for the  agent)
}

Example:

Website has a sidebar with a button to collapse the sidebar, a link to navigate to a different page and the website also has a button on a section of the main body of the page to collapse the section.

[
  // For a give nav.sidebar > button(Collapse the sidebar) or nav.sidebar > a(Navigate to the home page) or main > button(aria-label: Collapse the main body)
  {
    "website_section": "Sidebar",
    "website_section_selector": "nav.sidebar",
    "state_before": "The sidebar is visible.",
    "state_after": "The sidebar is hidden.",
    "change_analysis": "The sidebar is hidden after the click.",
    "element_aria_label": "Collapse the sidebar",
  },
  // For a give nav.sidebar > a(Navigate to the home page)
  {
    "website_section": "Sidebar",
    "website_section_selector": "nav.sidebar",
    "state_before": "The page is on the getting started page.",
    "state_after": "The page is navigated to the home page.",
    "change_analysis": "The page is navigated to the home page after the click.",
    "element_aria_label": "Navigate to the home page.",
  },
  // For a give section.main > button(aria-label: Collapse the main body)
  {
    "website_section": "Main Body",
    "website_section_selector": "section.main",
    "state_before": "The main body is visible.",
    "state_after": "The main body is hidden.",
    "change_analysis": "The main body is hidden after the click.",
    "element_aria_label": "Collapse the main body.",
  }
]

Those will be used by an algorithm / agent to locate the elements and interact with them autonomously, so we need the locators to be accurate and the descriptions to be correct.`,
      schema: z.object({
        interactive_elements: z.array(
          z.object({
            website_section: z
              .string()
              .optional()
              .describe(
                "The section of the website where this element is located (e.g., Header, Sidebar, Main Content, Footer, Navigation, etc.)"
              ),
            website_section_selector: z
              .string()
              .optional()
              .describe(
                "A CSS selector that targets the section containing this element (e.g., 'nav.sidebar', 'header', 'main', '.footer')"
              ),
            state_before: z
              .string()
              .optional()
              .describe(
                "Description of the current state before interacting with this element"
              ),
            state_after: z
              .string()
              .optional()
              .describe(
                "Description of the expected state after interacting with this element"
              ),
            change_analysis: z
              .string()
              .optional()
              .describe(
                "Analysis of what changes occur when this element is interacted with"
              ),
            element_aria_label: z
              .string()
              .optional()
              .describe(
                "The best possible text locator for this element (e.g., aria-label, innerText, label, alt text, etc.)"
              ),
          })
        ),
      }),
    });
    console.log("Extracted:", extractedData2);

    console.log("Workflow completed successfully");
    return { success: true };
  } catch (error) {
    console.error("Workflow failed:", error);
    return { success: false, error };
  } finally {
    // Clean up
    if (stagehand) {
      console.log("Closing Stagehand connection.");
      try {
        await stagehand.close();
      } catch (err) {
        console.error("Error closing Stagehand:", err);
      }
    }
  }
}

// Single execution
runWorkflow().then((result) => {
  console.log("Execution result:", result);
  process.exit(result.success ? 0 : 1);
});

export default runWorkflow;
