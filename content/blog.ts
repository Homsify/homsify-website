export interface BlogPost {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  sections: {
    heading?: string;
    paragraphs?: string[];
    orderedList?: string[];
    bulletList?: string[];
    afterParagraphs?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-renovation-company-ontario",
    metaTitle: "How to Choose a Renovation Company in Ontario (2026)",
    metaDescription:
      "Hiring a renovation company in Ontario? Check licences, WSIB, contracts, deposits, permits and quotes. A 2026 checklist with red flags.",
    title: "How to Choose the Best Renovation Company in Ontario in 2026",
    publishedAt: "2026-11-24",
    excerpt:
      "Ontario does not license general renovation contractors. This 2026 guide covers what to verify, what the contract must say, how to compare quotes, and when to walk away.",
    sections: [
      {
        paragraphs: [
          "Ontario does not license general renovation contractors. Anyone with a truck and a business card can call themselves a renovation company, so the checking falls to you. The checks themselves are quick. This guide covers what to verify, what the contract must say, how to compare quotes, and when to walk away. It applies whether you are hiring a home renovation contractor for a kitchen or a commercial renovation company for a plaza.",
        ],
      },
      {
        heading: "The short checklist",
        orderedList: [
          "Get written estimates from at least three companies, after each has seen the property.",
          "Get at least three references, including some from jobs similar to yours.",
          "Search the business name and the owner’s name on the Consumer Beware List.",
          "Ask for proof of liability insurance and WSIB coverage.",
          "Check licences for electrical, gas and plumbing work.",
          "Insist on a written contract that includes the estimate.",
          "Keep the deposit to 10% or less and never pay in full before the work is done.",
          "Confirm who applies for the permit, and see it before work starts.",
        ],
        afterParagraphs: ["The rest of this guide explains each item."],
      },
      {
        heading: "What Ontario licenses and what it does not",
        paragraphs: [
          "There is no provincial licence for general renovation contractors. The Home Construction Regulatory Authority licenses new home builders and sellers, not renovators. Individual trades are different:",
        ],
        bulletList: [
          "Electrical: a company cannot run an electrical contracting business without a licence from the Electrical Safety Authority (ESA). The licence number should appear on the estimate and on the work vehicle. You can look it up in the ESA database.",
          "Plumbing: plumber is a compulsory trade. Ask whether the people on site hold certification from Skilled Trades Ontario.",
          "Gas: gas work belongs to TSSA-registered contractors.",
        ],
        afterParagraphs: [
          "Some cities also license renovation businesses. Ask the city where the work is happening whether a municipal licence applies.",
        ],
      },
      {
        heading: "Match the company to the size of the job",
        paragraphs: [
          "The right choice depends on how many trades the project involves.",
        ],
        table: {
          headers: ["Project", "Better fit"],
          rows: [
            [
              "One trade, such as repainting two rooms or replacing a floor",
              "A single tradesperson",
            ],
            [
              "Two or three trades with a simple order of work",
              "A small contractor, or trades you coordinate yourself",
            ],
            [
              "Three or more trades, such as a basement or full bathroom",
              "A full-service renovation company with one project manager",
            ],
            [
              "Layout changes, structural work or additions",
              "A company that also handles drawings and permits",
            ],
          ],
        },
        afterParagraphs: [
          "If you hire trades separately, you become the project manager. You schedule the plumber before the drywaller, chase the inspection, and settle it when two trades blame each other. Some people do this well. If you work full time and have not done it before, a company that employs its own crews and manages the schedule is usually the calmer route.",
        ],
      },
      {
        heading: "Check insurance and WSIB",
        paragraphs: [
          "Workers and independent operators in construction must carry workplace safety and insurance coverage, with a few exceptions. A homeowner hiring a contractor does not need a clearance certificate, but asking for proof of coverage is the simplest way to see that the company is set up properly.",
          "Liability insurance protects your property if something goes wrong. Ask for a certificate that names the insurer and the coverage amount, and check that it is current. A company that hesitates over either document has told you something.",
        ],
      },
      {
        heading: "Get three estimates and compare them properly",
        paragraphs: [
          "Ontario’s guidance is to get at least three written estimates and never accept one over the phone or without an inspection. A good estimate describes the work, itemizes products and services with prices, and lists everything you expect.",
          "Quotes only compare when they describe the same job. Line them up on these points before you look at the totals:",
        ],
        table: {
          headers: ["Point", "What to look for"],
          rows: [
            ["Scope", "Same rooms, same demolition, same finishes"],
            [
              "Materials",
              "Named products or clear allowances for tile, fixtures and flooring",
            ],
            ["Permits", "Included, or your responsibility"],
            [
              "Disposal and protection",
              "Who hauls debris and protects floors and furniture",
            ],
            ["Sub-trades", "Who they are and who pays them"],
            [
              "Schedule",
              "Start date, completion date, and what happens if it slips",
            ],
          ],
        },
        afterParagraphs: [
          "The lowest price is often lowest because something is missing. Ask each company to fill the gaps in writing, then compare again.",
        ],
      },
      {
        heading: "What the contract must say",
        paragraphs: [
          "Any home renovation contract worth more than $50 must be in writing under Ontario law. It should include:",
        ],
        bulletList: [
          "the contractor’s name, address and contact details",
          "a detailed description of the work and materials",
          "warranties",
          "the total cost and payment terms",
          "start and completion dates",
          "the payment schedule, including the deposit",
          "who cleans up",
          "all sub-trades and who pays them",
        ],
        afterParagraphs: [
          "Ask for the estimate to be attached to the contract. If it is, the final price cannot be more than 10% above the estimate unless you agree to new work or a new price in a signed change. If you sign a contract in your own home, you have a 10-day cooling-off period and can cancel for any reason without a fee.",
          "For a large project, have a lawyer read the contract before you sign.",
        ],
      },
      {
        heading: "Deposits and payments",
        paragraphs: [
          "Ontario recommends keeping the deposit to 10% or less and never paying the full amount before the work is finished. A legitimate company has the credit to buy its materials, so a request for a large deposit “for materials” is a known scam.",
          "Tie later payments to milestones, such as framing complete or cabinets installed, rather than to dates on a calendar. Avoid cash. If you do pay cash, get a detailed, signed receipt. If a company offers financing, arranging your own may be cheaper.",
        ],
      },
      {
        heading: "Permits",
        paragraphs: [
          "Getting building permits is the owner’s responsibility. A renovation contractor can apply for you, but the contract should say so, and work should not begin until you have seen the permit. Structural changes, new bathrooms, basement suites and most additions need one. Your city or town hall will tell you what applies.",
        ],
      },
      {
        heading: "References and portfolio",
        paragraphs: [
          "Ask for three references, then call them. Each should come from someone who dealt with the contractor directly. Ask for jobs similar to yours, some recent and some older, because problems in work like roofing or paving can take a year or more to show up.",
          "When you look at a renovation portfolio, ask which photos are jobs the company completed with its own crew. Ask what the original budget was and how many change orders the project had. Online reviews help, but read the detailed ones and the company’s replies to complaints.",
        ],
      },
      {
        heading: "Residential, commercial and public-sector work",
        paragraphs: [
          "The consumer protections above, including the cooling-off period and the 10% cap on estimate overruns, are written for homeowners. Commercial and public clients rely on their own contract, so the paperwork matters more.",
          "If you manage a plaza, an office or a municipal building, ask a commercial renovation company about:",
        ],
        bulletList: [
          "WSIB clearance certificates and insurance certificates naming your organization",
          "work in occupied buildings, after-hours scheduling and tenant notice",
          "procurement documents, tender responses and screened crews",
          "the 10% holdback under Ontario’s Construction Act, and how liens affect your final payment",
        ],
      },
      {
        heading: "Questions to ask at the site visit",
        bulletList: [
          "Who is my day-to-day contact, and who will be on site each day?",
          "Which work does your own crew do, and which trades do you bring in?",
          "Who prepares drawings, applies for the permit and books inspections?",
          "Can I see your insurance and WSIB documents?",
          "What is included in the price, and what is an allowance?",
          "How are changes priced and approved?",
          "Can we live here during the work, and how do you protect the rest of the property?",
          "What does your warranty cover, and for how long?",
        ],
        afterParagraphs: [
          "Good contractors ask a lot of questions too. A company that quotes after a ten-minute walk-through has not planned your project.",
        ],
      },
      {
        heading: "Red flags",
        bulletList: [
          "A door-to-door offer with a price that expires today",
          "A free “inspection” followed by an urgent, expensive repair",
          "A large deposit, or pressure to pay in full early",
          "No written contract, no start or completion dates, or a vague scope",
          "Cash-only pricing, or a discount for skipping the permit",
          "An electrician with no ESA licence number",
          "Reluctance to give references or a business address",
          "A business operator who has changed the company name before",
        ],
      },
      {
        heading: "How Homsify handles these checks",
        paragraphs: [
          "Homsify is a full-service renovation company in Ontario serving residential, commercial and public-sector clients from London, with crews covering Windsor, Kitchener, Sarnia and Chatham-Kent. Here is how that lines up with the checklist above:",
        ],
        bulletList: [
          "One project manager from quote to walkthrough",
          "A written, itemized, fixed-price quote after a free on-site visit",
          "Fully insured, WSIB-covered crews",
          "A two-year written workmanship warranty",
          "A walkthrough, with the punch list closed before invoicing",
        ],
        afterParagraphs: [
          "The work includes [home renovations](/services/home-renovations), [kitchen remodeling](https://homsify.ca/services/kitchen-remodeling/), [bathroom renovations](https://homsify.ca/services/bathroom-renovations/), [basement finishing](https://homsify.ca/services/basement-finishing/), [flooring](/services/flooring), [drywall](/services/drywall-plaster), [painting](/services/painting), plumbing, electrical and windows and doors, all on one schedule and one invoice.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Do renovation contractors need a licence in Ontario? Not a general provincial one. Electrical, gas and plumbing work have their own licensing or certification, and some cities license renovation businesses.",
          "How many quotes should I get? At least three written estimates, each based on an inspection of the property.",
          "How much deposit is normal? Ontario recommends no more than 10%. Never pay the full amount before the work is finished.",
          "Who is responsible for the building permit? The owner. The contractor can apply on your behalf if the contract says so. Do not let work start until you have seen the permit.",
          "Can I cancel a renovation contract? If you signed it in your home, you have 10 calendar days to cancel for any reason without a fee. If work started during that period, you may owe reasonable compensation for work and materials provided.",
        ],
      },
      {
        heading: "Get a written quote",
        paragraphs: [
        "If you want a fixed-price quote from a renovation company in Ontario, [send Homsify the property details](https://homsify.ca/#quote) or call 226-386-4012." 
         "A project manager replies within one business day."
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
