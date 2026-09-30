import { Tender, GovernmentDataSource, AuditTrailLog } from '../types';

export const INITIAL_GOVERNMENT_SOURCES: GovernmentDataSource[] = [
  {
    id: 'gstn',
    name: 'GSTN',
    statusText: '✓ Connected',
    subtext: 'Sandbox API',
    isOnline: true,
    type: 'live',
    latencyMs: 142,
    description: 'Goods and Services Tax Network real-time return filing (GSTR-1, GSTR-3B) and active status verification.'
  },
  {
    id: 'udyam',
    name: 'Udyam',
    statusText: '✓ Connected',
    subtext: 'MSME Verify',
    isOnline: true,
    type: 'live',
    latencyMs: 98,
    description: 'Ministry of MSME verification for enterprise classification, investment slab, and tender fee exemption.'
  },
  {
    id: 'pan',
    name: 'PAN / ITD',
    statusText: '✓ Connected',
    subtext: 'NSDL Mock',
    isOnline: true,
    type: 'live',
    latencyMs: 110,
    description: 'Income Tax Department PAN validation, entity legal name matching, and Aadhaar linking validation.'
  },
  {
    id: 'mca21',
    name: 'MCA21',
    statusText: 'Demo Data',
    subtext: 'CIN Match',
    isOnline: true,
    type: 'mock',
    latencyMs: 230,
    description: 'Ministry of Corporate Affairs registry for active company status, DIN of directors, and debenture charges.'
  },
  {
    id: 'digilocker',
    name: 'DigiLocker',
    statusText: 'Ready',
    subtext: 'OAuth Stub',
    isOnline: true,
    type: 'oauth',
    latencyMs: 310,
    description: 'Digital document verification repository for Aadhaar, driving license, and certified academic credentials.'
  },
  {
    id: 'epfo',
    name: 'EPFO / ESIC',
    statusText: 'Fallback',
    subtext: 'Manual Check',
    isOnline: false,
    type: 'manual',
    latencyMs: 0,
    description: 'Statutory compliance register for provident fund remittance and employee count verification.'
  },
  {
    id: 'startup',
    name: 'Startup India',
    statusText: 'Demo Data',
    subtext: 'DPIIT Cache',
    isOnline: true,
    type: 'mock',
    latencyMs: 185,
    description: 'Department for Promotion of Industry and Internal Trade recognition check for prior experience waivers.'
  },
  {
    id: 'gem',
    name: 'GeM Portal',
    statusText: '✓ Scraper Live',
    subtext: 'bidplus.gem.gov.in',
    isOnline: true,
    type: 'live',
    latencyMs: 84,
    description: 'Government e-Marketplace primary catalog, bid publications, and vendor bids feed via bidplus.gem.gov.in scraper.'
  },
  {
    id: 'cppp',
    name: 'CPPP eProcure',
    statusText: '✓ Scraper Live',
    subtext: 'eprocure.gov.in',
    isOnline: true,
    type: 'live',
    latencyMs: 120,
    description: 'Central Public Procurement Portal active tenders published across Union Ministries, Departments, and Central PSUs.'
  }
];

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'GEM/2026/PROC/1024',
    title: 'IT Infrastructure & Cloud Procurement',
    subtitle: 'Min 3 yrs exp, ₹50L turnover • GeM Live Procurement',
    department: 'Ministry of Electronics & IT',
    sourceName: 'GeM',
    sourceUrl: 'https://bidplus.gem.gov.in/all-bids',
    bidDetailUrl: 'https://bidplus.gem.gov.in/all-bids',
    location: 'New Delhi, India',
    estimatedValue: 'Est. ₹25.0 Lakhs',
    bidsCount: 8,
    bidsSubtext: '1 selected for demo',
    status: 'Under Verification',
    riskLevel: 'Medium Risk (Score: 72)',
    score: 72,
    riskCategory: 'Medium Risk',
    dueDate: '18 Sep 2026, 17:00 IST',
    publishedDate: '02 Sep 2026',
    evaluatingOfficer: 'R. K. Sharma (Procurement Officer, MeitY)',
    requirements: [
      {
        clauseNumber: 'Clause 4.1',
        category: 'Experience',
        title: 'Minimum Operational Experience',
        specification: 'Bidder must have at least 3 completed fiscal years of commercial cloud deployment operations.',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 4.2',
        category: 'Financial',
        title: 'Average Annual Financial Turnover',
        specification: 'Average annual financial turnover over the last 3 fiscal years (FY 2023-24, 2024-25, 2025-26) must not be less than ₹50.00 Lakhs certified by a registered Chartered Accountant with UDIN.',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 5.1',
        category: 'Regulatory',
        title: 'Public Procurement (Preference to Make in India)',
        specification: 'Minimum 50% local content requirement under Class-I Local Supplier category as per DPIIT Order P-45021/2/2017-PP (BE-II).',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 6.3',
        category: 'Technical',
        title: 'Data Sovereignty & MeitY Cloud Empanelment',
        specification: 'Cloud service provider must be officially empaneled with MeitY and data centers must strictly reside within the territorial boundary of India.',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 7.2',
        category: 'Regulatory',
        title: 'Statutory Tax Compliance',
        specification: 'Valid GSTIN registration with no active defaults or cancellation proceedings; active PAN card linked with CBDT database.',
        mandatory: true
      }
    ],
    bidders: [
      {
        id: 'bid-1024-01',
        companyName: 'Apex Cloud Solutions Pvt Ltd',
        vendorId: 'GEM-VD-889102',
        cin: 'U72200DL2018PTC334521',
        gstin: '07AABCA1234F1Z8',
        pan: 'AABCA1234F',
        udyamNumber: 'UDYAM-DL-01-0023419',
        quotedAmount: '₹22,80,000',
        complianceScore: 72,
        riskCategory: 'Medium Risk',
        status: 'Pending Officer Review',
        scores: {
          technical: 88,
          financial: 58,
          regulatory: 80,
          experience: 90
        },
        discrepancies: [
          {
            id: 'disc-01',
            severity: 'high',
            category: 'Financial',
            title: 'Turnover Variance between CA Certificate and GSTN Returns',
            description: 'Chartered Accountant certificate submitted claims FY 2024-25 turnover of ₹52.40 Lakhs (UDIN: 25034129AAAAAA1021). However, live GSTN sandbox return reconciliation (GSTR-3B taxable supplies sum) reflects ₹41.20 Lakhs. Variance of ₹11.20 Lakhs (21.4%) detected.',
            citation: 'Tender Clause 4.2 vs CA_Certificate_2025.pdf (Page 3, Line 14)',
            pageNumber: 3,
            docName: 'CA_Certificate_Turnover_FY24-25.pdf',
            suggestedAction: 'Issue formal Clarification Notice under Rule 173(iv) requesting Chartered Accountant ledger reconciliation and filed audited balance sheet.',
            aiConfidence: 94.2
          },
          {
            id: 'disc-02',
            severity: 'medium',
            category: 'Experience',
            title: 'Client Satisfaction Certificate Date Pre-dates Purchase Order',
            description: 'Completion Certificate for Delhi Metro Rail Corp cloud project is dated 14 Feb 2023, while the attached Work Order Award date specifies 28 Feb 2023. Possible typographical error or annexure mismatch in bid pack.',
            citation: 'Annexure-III Work Experience (Page 11, Para 2)',
            pageNumber: 11,
            docName: 'DMRC_Completion_Certificate_Ann3.pdf',
            suggestedAction: 'Require bidder to re-upload authenticated copy of Purchase Order with matching completion sign-off.',
            aiConfidence: 87.5
          },
          {
            id: 'disc-03',
            severity: 'low',
            category: 'Regulatory',
            title: 'Make in India Local Content Declaration Self-Certified without CA Endorsement',
            description: 'For tender values exceeding ₹10 Lakhs, self-certification is accepted for MSMEs under DPIIT guidelines, but secondary supplier BoM split was missing from Annexure VII.',
            citation: 'Make in India Declaration (Page 18)',
            pageNumber: 18,
            docName: 'Local_Content_Self_Affidavit.pdf',
            suggestedAction: 'Verify MSME Udyam status eligibility for self-certification exemption.',
            aiConfidence: 91.0
          }
        ],
        crossVerifications: [
          {
            source: 'GSTN',
            field: 'Annual Taxable Turnover',
            claimedValue: '₹52,40,000 (CA Certificate)',
            registryValue: '₹41,20,000 (GSTR-3B Taxable Supplies)',
            status: 'Mismatch',
            confidence: 96,
            verifiedAt: '2026-09-11 10:14:02 IST',
            details: '21.4% shortfall between declared CA turnover and aggregate outward taxable supply reported in GSTR-3B portal.'
          },
          {
            source: 'Udyam',
            field: 'MSME Category & Registration',
            claimedValue: 'Small Enterprise (Services)',
            registryValue: 'Small Enterprise — Active (NIC 62020)',
            status: 'Verified',
            confidence: 99,
            verifiedAt: '2026-09-11 10:14:05 IST',
            details: 'Udyam Certificate UDYAM-DL-01-0023419 active. Entitled to EMD / Tender Fee exemption.'
          },
          {
            source: 'PAN / ITD',
            field: 'Entity PAN & Name Match',
            claimedValue: 'APEX CLOUD SOLUTIONS PRIVATE LIMITED',
            registryValue: 'APEX CLOUD SOLUTIONS PRIVATE LIMITED',
            status: 'Verified',
            confidence: 100,
            verifiedAt: '2026-09-11 10:14:06 IST',
            details: 'PAN AABCA1234F is active, compliant, and correctly seeded with CBDT.'
          },
          {
            source: 'MCA21',
            field: 'Corporate Status & Directorship',
            claimedValue: 'Active Company, 2 Directors',
            registryValue: 'Active (RoC-Delhi), DIN 07891234, 08129341',
            status: 'Verified',
            confidence: 98,
            verifiedAt: '2026-09-11 10:14:08 IST',
            details: 'CIN U72200DL2018PTC334521 matched. No debentures or winding up petition filed.'
          },
          {
            source: 'GeM Portal',
            field: 'Debarment / Blacklist Index',
            claimedValue: 'Clean Record (No incidents)',
            registryValue: '0 Active Incident Warnings, Score 4.8/5.0',
            status: 'Verified',
            confidence: 100,
            verifiedAt: '2026-09-11 10:14:10 IST',
            details: 'Vendor has fulfilled 14 past GeM purchase contracts with zero incident escalation.'
          }
        ],
        documents: [
          {
            id: 'doc-01',
            name: 'CA_Certificate_Turnover_FY24-25.pdf',
            type: 'Financial Statement',
            fileSize: '1.4 MB',
            uploadDate: '08 Sep 2026',
            tamperCheck: 'Digital Signature Valid',
            sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
            extractedClauses: [
              { label: 'Turnover Declared', value: '₹52,40,000', match: false, confidence: 95 },
              { label: 'UDIN Identifier', value: '25034129AAAAAA1021', match: true, confidence: 98 },
              { label: 'Member Reg No', value: '034129 (ICAI)', match: true, confidence: 99 }
            ]
          },
          {
            id: 'doc-02',
            name: 'Local_Content_Self_Affidavit.pdf',
            type: 'Make in India Affidavit',
            fileSize: '840 KB',
            uploadDate: '08 Sep 2026',
            tamperCheck: 'Digital Signature Valid',
            sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            extractedClauses: [
              { label: 'Local Content %', value: '64.5% (Class-I Supplier)', match: true, confidence: 92 },
              { label: 'Data Center Location', value: 'Navi Mumbai & Noida, India', match: true, confidence: 97 }
            ]
          },
          {
            id: 'doc-03',
            name: 'Udyam_Registration_Certificate.pdf',
            type: 'MSME Registration',
            fileSize: '520 KB',
            uploadDate: '08 Sep 2026',
            tamperCheck: 'Valid SHA-256',
            sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
            extractedClauses: [
              { label: 'Udyam No', value: 'UDYAM-DL-01-0023419', match: true, confidence: 100 },
              { label: 'Major Activity', value: 'Services / Cloud Computing', match: true, confidence: 96 }
            ]
          },
          {
            id: 'doc-04',
            name: 'MeitY_Cloud_Empanelment_Proof.pdf',
            type: 'Technical Certification',
            fileSize: '2.1 MB',
            uploadDate: '08 Sep 2026',
            tamperCheck: 'Digital Signature Valid',
            sha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
            extractedClauses: [
              { label: 'Empanelment Ref', value: 'MeitY/CC/EMP/2024/918', match: true, confidence: 99 },
              { label: 'Validity Period', value: 'Valid up to 31 Dec 2027', match: true, confidence: 94 }
            ]
          }
        ]
      },
      {
        id: 'bid-1024-02',
        companyName: 'Bharat Cybernetix Infrastructure Ltd',
        vendorId: 'GEM-VD-654129',
        cin: 'L72900MH2012PLC239102',
        gstin: '27AABCB9876Q1Z2',
        pan: 'AABCB9876Q',
        udyamNumber: 'N/A (Large Enterprise)',
        quotedAmount: '₹24,15,000',
        complianceScore: 94,
        riskCategory: 'Low Risk',
        status: 'Pending Officer Review',
        scores: {
          technical: 96,
          financial: 92,
          regulatory: 95,
          experience: 94
        },
        discrepancies: [],
        crossVerifications: [
          {
            source: 'GSTN',
            field: 'Annual Taxable Turnover',
            claimedValue: '₹3.40 Crores',
            registryValue: '₹3.38 Crores',
            status: 'Verified',
            confidence: 99,
            verifiedAt: '2026-09-11 10:14:12 IST',
            details: 'Reported GSTR-3B filings strictly match certified financial balance sheets within 0.6% rounding.'
          },
          {
            source: 'MCA21',
            field: 'Corporate Status',
            claimedValue: 'Active Listed Public Limited',
            registryValue: 'Active (RoC-Mumbai)',
            status: 'Verified',
            confidence: 100,
            verifiedAt: '2026-09-11 10:14:14 IST',
            details: 'Public listed company with clean filing record and verified directors.'
          }
        ],
        documents: []
      },
      {
        id: 'bid-1024-03',
        companyName: 'TechnoCraft IT Services LLP',
        vendorId: 'GEM-VD-334190',
        cin: 'AAB-9921',
        gstin: '29AACCT4421R1Z5',
        pan: 'AACCT4421R',
        udyamNumber: 'UDYAM-KR-03-0091823',
        quotedAmount: '₹19,50,000',
        complianceScore: 48,
        riskCategory: 'High Risk',
        status: 'Pending Officer Review',
        scores: {
          technical: 70,
          financial: 32,
          regulatory: 45,
          experience: 50
        },
        discrepancies: [
          {
            id: 'disc-tc-01',
            severity: 'high',
            category: 'Financial',
            title: 'Turnover below mandatory tender threshold',
            description: 'Average 3-year turnover confirmed at ₹31.2 Lakhs vs required ₹50.00 Lakhs in Clause 4.2.',
            citation: 'Tender Clause 4.2 (Financial Ineligibility)',
            pageNumber: 2,
            docName: 'Audited_Accounts_2025.pdf',
            suggestedAction: 'Disqualification under mandatory financial qualification criterion.',
            aiConfidence: 98.4
          }
        ],
        crossVerifications: [],
        documents: []
      }
    ]
  },
  {
    id: 'GEM/2026/PROC/1018',
    title: 'Medical Equipment & Consumable Supply',
    subtitle: 'NABL certification, ISO 13485 compliant',
    department: 'Health Department',
    estimatedValue: 'Est. ₹14.5 Lakhs',
    bidsCount: 5,
    bidsSubtext: '5 bids evaluated',
    status: 'Verified',
    riskLevel: 'Low Risk (Score: 94)',
    score: 94,
    riskCategory: 'Low Risk',
    dueDate: '25 Sep 2026, 15:00 IST',
    publishedDate: '28 Aug 2026',
    evaluatingOfficer: 'Dr. V. Menon (Director of Medical Supplies)',
    requirements: [
      {
        clauseNumber: 'Clause 2.1',
        category: 'Regulatory',
        title: 'CDSCO Medical Device License',
        specification: 'Must hold valid Central Drugs Standard Control Organisation manufacturing or import license.',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 3.4',
        category: 'Technical',
        title: 'ISO 13485 & CE / USFDA Marking',
        specification: 'All consumable lots must carry valid quality management assurance certification.',
        mandatory: true
      }
    ],
    bidders: [
      {
        id: 'bid-1018-01',
        companyName: 'MedTech LifeSciences India Pvt Ltd',
        vendorId: 'GEM-VD-112930',
        cin: 'U24232MH2015PTC261902',
        gstin: '27AABCM5512D1Z9',
        pan: 'AABCM5512D',
        udyamNumber: 'UDYAM-MH-19-0012903',
        quotedAmount: '₹13,90,000',
        complianceScore: 94,
        riskCategory: 'Low Risk',
        status: 'Officer Approved',
        officerDecision: {
          decision: 'approve',
          timestamp: '2026-09-10 16:30:11 IST',
          officerName: 'R. K. Sharma',
          officerDesignation: 'Procurement Officer',
          remarks: 'All 5 regulatory licenses verified against CDSCO and GSTN database with zero discrepancy. Technical criteria fully satisfied.',
          digitalSignatureHash: '8b4a2f901c8e7d56e3b2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0'
        },
        scores: {
          technical: 96,
          financial: 94,
          regulatory: 98,
          experience: 90
        },
        discrepancies: [],
        crossVerifications: [
          {
            source: 'GSTN',
            field: 'Filing Health',
            claimedValue: 'Active',
            registryValue: 'Active (Regular Taxpayer)',
            status: 'Verified',
            confidence: 100,
            verifiedAt: '2026-09-10 14:20:00 IST',
            details: 'Clean record with zero delay notices.'
          }
        ],
        documents: []
      }
    ]
  },
  {
    id: 'GEM/2026/PROC/1009',
    title: 'Solar Panel Array Procurement & Installation',
    subtitle: 'ALMM approved modules, Tier-1 cell warranty',
    department: 'Energy Department',
    estimatedValue: 'Est. ₹85.0 Lakhs',
    bidsCount: 15,
    bidsSubtext: '4 flagged with high risk',
    status: 'Attention Required',
    riskLevel: 'High Risk (Score: 48)',
    score: 48,
    riskCategory: 'High Risk',
    dueDate: '22 Sep 2026, 12:00 IST',
    publishedDate: '20 Aug 2026',
    evaluatingOfficer: 'R. K. Sharma (Procurement Officer)',
    requirements: [
      {
        clauseNumber: 'Clause 3.1',
        category: 'Regulatory',
        title: 'MNRE Approved List of Models and Manufacturers (ALMM)',
        specification: 'Solar PV modules must be strictly sourced from OEM registered under valid ALMM Order list.',
        mandatory: true
      },
      {
        clauseNumber: 'Clause 5.2',
        category: 'Financial',
        title: 'Earnest Money Deposit (EMD) Bank Guarantee',
        specification: 'EMD of ₹1,70,000 in form of scheduled bank guarantee or valid exemption certificate.',
        mandatory: true
      }
    ],
    bidders: [
      {
        id: 'bid-1009-01',
        companyName: 'SuryaVidyut Green Power Corp',
        vendorId: 'GEM-VD-992384',
        cin: 'U40106GJ2019PTC109823',
        gstin: '24AABCS9912E1Z3',
        pan: 'AABCS9912E',
        udyamNumber: '',
        quotedAmount: '₹79,40,000',
        complianceScore: 48,
        riskCategory: 'High Risk',
        status: 'Pending Officer Review',
        scores: {
          technical: 50,
          financial: 42,
          regulatory: 48,
          experience: 52
        },
        discrepancies: [
          {
            id: 'disc-sol-01',
            severity: 'high',
            category: 'Regulatory',
            title: 'PV Module Manufacturer Not Listed in MNRE ALMM Order',
            description: 'Submitted OEM technical datasheet specifies "HelioTech Alpha-X 550W". Verification with MNRE ALMM database confirms manufacturer was suspended as of 15 May 2026.',
            citation: 'Technical Specification Annexure 2 (Page 4)',
            pageNumber: 4,
            docName: 'Solar_Module_Datasheet_ALMM.pdf',
            suggestedAction: 'Immediate Disqualification or Issue Show Cause Notice under Clause 3.1.',
            aiConfidence: 97.8
          },
          {
            id: 'disc-sol-02',
            severity: 'high',
            category: 'Financial',
            title: 'Bank Guarantee Verification Expired',
            description: 'Submitted Bank Guarantee for EMD expired on 31 August 2026 without renewal endorsement.',
            citation: 'EMD Submission BG_9921_SBI.pdf (Page 1)',
            pageNumber: 1,
            docName: 'BG_9921_SBI_EMD.pdf',
            suggestedAction: 'Demand replacement bank guarantee with 180-day validity.',
            aiConfidence: 99.1
          }
        ],
        crossVerifications: [
          {
            source: 'GSTN',
            field: 'GSTR-3B Tax Filing',
            claimedValue: 'Active',
            registryValue: 'Active (Delayed Q1 return)',
            status: 'Warning',
            confidence: 89,
            verifiedAt: '2026-09-11 09:12:00 IST',
            details: 'Late filing penalty incurred in May 2026.'
          }
        ],
        documents: []
      }
    ]
  },
  {
    id: 'GEM/2026/PROC/0995',
    title: 'High-Performance Computing Cluster Expansion',
    subtitle: 'NVIDIA H100 or equivalent, InfiniBand fabric',
    department: 'Ministry of Science & Technology',
    estimatedValue: 'Est. ₹140.0 Lakhs',
    bidsCount: 6,
    bidsSubtext: 'Awaiting opening',
    status: 'Under Verification',
    riskLevel: 'Low Risk (Score: 94)',
    score: 89,
    riskCategory: 'Low Risk',
    dueDate: '30 Sep 2026, 18:00 IST',
    publishedDate: '05 Sep 2026',
    evaluatingOfficer: 'Prof. K. Swaminathan',
    requirements: [],
    bidders: []
  }
];

export const INITIAL_AUDIT_LOGS: AuditTrailLog[] = [
  {
    id: 'aud-001',
    timestamp: '2026-09-11 11:20:14 IST',
    officer: 'R. K. Sharma (Procurement Officer)',
    tenderId: 'GEM/2026/PROC/1024',
    bidderName: 'Apex Cloud Solutions Pvt Ltd',
    action: 'AI Verification Analysis Initiated for Tender 1024 Bid Pack',
    category: 'VERIFICATION',
    sha256: 'a6c8e312f4b9d072e519c8f2b34e109d78ab45c6123e45f67a8b9c0d1e2f3a4b',
    justification: 'Automated ingestion and cross-registry validation completed in 8.2 seconds.'
  },
  {
    id: 'aud-002',
    timestamp: '2026-09-11 10:14:02 IST',
    officer: 'System (GeM Live Bot)',
    tenderId: 'GEM/2026/PROC/1024',
    bidderName: 'Apex Cloud Solutions Pvt Ltd',
    action: 'GSTN Sandbox API Cross-Check Flagged 21.4% Turnover Discrepancy',
    category: 'VERIFICATION',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    justification: 'CA certificate UDIN: 25034129AAAAAA1021 claims ₹52.4L vs GSTR-3B ₹41.2L.'
  },
  {
    id: 'aud-003',
    timestamp: '2026-09-10 16:30:11 IST',
    officer: 'R. K. Sharma (Procurement Officer)',
    tenderId: 'GEM/2026/PROC/1018',
    bidderName: 'MedTech LifeSciences India Pvt Ltd',
    action: 'Officer Formally Approved Technical Evaluation Clearance',
    category: 'DECISION',
    sha256: '8b4a2f901c8e7d56e3b2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0',
    justification: 'All CDSCO licenses and NABL certifications verified authentic without discrepancies.'
  },
  {
    id: 'aud-004',
    timestamp: '2026-09-09 14:15:39 IST',
    officer: 'R. K. Sharma (Procurement Officer)',
    tenderId: 'GEM/2026/PROC/1009',
    bidderName: 'SuryaVidyut Green Power Corp',
    action: 'Discrepancy Raised: ALMM Blacklisted Module & Expired EMD',
    category: 'CLARIFICATION',
    sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    justification: 'Tender Clause 3.1 & 5.2 mandatory violation flagged to committee.'
  }
];
