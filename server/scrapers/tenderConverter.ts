import { Tender, Bidder, TenderRequirement } from '../../src/types';
import { ScrapedTender } from './cpppScraper';

export function convertScrapedToTenders(scrapedList: ScrapedTender[]): Tender[] {
  return scrapedList.map((item, idx) => {
    const isGem = item.source_name === 'GeM';
    const estimatedValue = item.budget
      ? `₹${(item.budget / 10000000).toFixed(2)} Cr`
      : isGem ? '₹12.50 Cr' : '₹4.80 Cr';

    const cleanTitle = item.title.replace(/^(CPPP:|GeM Bid:)\s*/i, '').trim();
    const requirements = generateRequirements(item);
    const bidders = generateBiddersForTender(item, cleanTitle, idx);

    // Calculate initial risk and score
    const avgScore = Math.round(
      bidders.reduce((acc, b) => acc + b.complianceScore, 0) / (bidders.length || 1)
    );
    const riskCat = avgScore >= 80 ? 'Low Risk' : avgScore >= 60 ? 'Medium Risk' : 'High Risk';
    const riskLevelStr = avgScore >= 80 
      ? `Low Risk (Score: ${avgScore})` 
      : avgScore >= 60 
        ? `Medium Risk (Score: ${avgScore})` 
        : `High Risk (Score: ${avgScore})`;

    return {
      id: item.tender_id,
      title: cleanTitle,
      subtitle: `${item.source_name} Live Procurement • Ref: ${item.tender_id} • Location: ${item.location}`,
      department: item.department,
      estimatedValue,
      bidsCount: bidders.length,
      bidsSubtext: `${bidders.length} bids received • Cross-checks ready`,
      status: 'Under Verification',
      riskLevel: riskLevelStr as any,
      score: avgScore,
      riskCategory: riskCat,
      dueDate: item.deadline || '2026-09-30',
      publishedDate: item.published_date || '2026-09-14',
      evaluatingOfficer: 'Smt. Ananya Sen, Dy. Dir. (Procurement)',
      requirements,
      bidders,
      sourceName: item.source_name,
      sourceUrl: item.source_url || undefined,
      bidDetailUrl: item.bid_detail_url || undefined,
      pdfUrl: item.pdf_url || undefined,
      location: item.location,
      rawEligibility: item.eligibility_criteria,
    };
  });
}

function generateRequirements(item: ScrapedTender): TenderRequirement[] {
  const isGem = item.source_name === 'GeM';

  return [
    {
      clauseNumber: 'CL-01-FIN',
      category: 'Financial',
      title: 'Average Annual Turnover & Solvency',
      specification: `Bidder must demonstrate average annual turnover of at least ₹${item.budget ? (item.budget * 0.4 / 10000000).toFixed(1) : '2.5'} Cr across the last 3 financial years verified via UDIN-certified balance sheet.`,
      mandatory: true,
    },
    {
      clauseNumber: 'CL-02-REG',
      category: 'Regulatory',
      title: isGem ? 'Make In India (MII) & GeM Registration' : 'GSTIN & PAN Active Compliance',
      specification: isGem
        ? 'Class-I Local Supplier status with >= 50% local content requirement and valid OEM Authorization Form (MAF).'
        : 'Active GSTIN filing with clean GSTR-3B history, PAN matching legal name, and no debarment on CPPP / GeM caution lists.',
      mandatory: true,
    },
    {
      clauseNumber: 'CL-03-TECH',
      category: 'Technical',
      title: 'Technical Certification & Delivery SLA',
      specification: `Compliance with specifications for ${item.title.slice(0, 60)} including ISO 9001 certification and 24x7 support commitment.`,
      mandatory: true,
    },
    {
      clauseNumber: 'CL-04-EXP',
      category: 'Experience',
      title: 'Past Similar Work Experience',
      specification: 'Successfully completed at least 1 similar contract with value not less than 80% or 2 contracts of 50% for Government/PSU entities.',
      mandatory: false,
    },
  ];
}

function generateBiddersForTender(item: ScrapedTender, cleanTitle: string, index: number): Bidder[] {
  const seedNames = [
    { name: 'Bharat Infotech & Engineering Ltd', state: 'Delhi', gstState: '07' },
    { name: 'Trident Systech Solutions Pvt Ltd', state: 'Maharashtra', gstState: '27' },
    { name: 'Kavach Technologies & Automation LLP', state: 'Karnataka', gstState: '29' },
  ];

  return seedNames.map((s, idx) => {
    const idNum = 1000 + (index * 10) + idx;
    const gstin = `${s.gstState}AAACB${idNum}E1Z${idx + 2}`;
    const pan = `AAACB${idNum}E`;
    const cin = `U72900DL2018PTC${idNum + 2000}`;
    const udyam = `UDYAM-${s.gstState}-${idx + 1}-000${idNum}`;
    const score = idx === 0 ? 94 : idx === 1 ? 76 : 58;

    return {
      id: `bidder-${index}-${idx}`,
      companyName: s.name,
      vendorId: `${item.source_name}-VD-${idNum}`,
      cin,
      gstin,
      pan,
      udyamNumber: udyam,
      quotedAmount: `₹${(4.2 + (idx * 0.6)).toFixed(2)} Cr`,
      complianceScore: score,
      riskCategory: score >= 80 ? 'Low Risk' : score >= 65 ? 'Medium Risk' : 'High Risk',
      status: 'Pending Officer Review',
      crossVerifications: [
        {
          source: 'GSTN',
          field: 'Active GSTIN Status & GSTR-3B Filings',
          claimedValue: `Active (${gstin})`,
          registryValue: 'Active • Regular Taxpayer • 0 Defaults',
          status: 'Verified',
          confidence: 99,
          verifiedAt: '2026-09-14 12:00',
          details: 'Direct API reconciliation with GSTN Sandbox returned match on legal entity name and PIN code.',
        },
        {
          source: 'Udyam',
          field: 'MSME Classification',
          claimedValue: 'Small Enterprise (Eligible for EMD Exemption)',
          registryValue: idx === 2 ? 'Micro Enterprise (Expired Certificate)' : 'Small Enterprise (Active FY 2026-27)',
          status: idx === 2 ? 'Warning' : 'Verified',
          confidence: idx === 2 ? 82 : 98,
          verifiedAt: '2026-09-14 12:01',
          details: 'Verified via National MSME Udyam Database.',
        },
        {
          source: 'MCA21',
          field: 'Company Status & Director DIN Checks',
          claimedValue: 'Active • Compliant',
          registryValue: 'Active Company • 2 Registered Directors • No Charges Pending',
          status: 'Verified',
          confidence: 96,
          verifiedAt: '2026-09-14 12:02',
          details: 'MCA21 ROC registry confirms incorporation and active status.',
        },
      ],
      discrepancies: idx === 0 ? [] : [
        {
          id: `disc-${index}-${idx}`,
          severity: idx === 1 ? 'medium' : 'high',
          category: idx === 1 ? 'Experience' : 'Financial',
          title: idx === 1 ? 'Client Completion Certificate Date Mismatch' : 'UDIN Turnover Figure Differs by 8.4%',
          description: idx === 1
            ? 'Completion certificate submitted indicates project wrap in Dec 2024, but work order milestone was listed as Jan 2025.'
            : 'CA certified balance sheet turnover is declared as ₹3.8 Cr, whereas GST annual aggregate shows ₹3.48 Cr.',
          citation: idx === 1 ? 'Tender Document Page 14, Clause 4.2' : 'Annexure III - Financial Solvency Certificate',
          pageNumber: idx === 1 ? 14 : 6,
          docName: idx === 1 ? 'Past_Experience_Certificates.pdf' : 'Audited_Financial_Statement_FY24-25.pdf',
          suggestedAction: idx === 1
            ? 'Request confirmation from client department via official government letterhead.'
            : 'Issue formal clarification notice to bidder for turnover reconciliation within 48 hours.',
          aiConfidence: idx === 1 ? 88 : 94,
          officerAction: 'pending',
        }
      ],
      documents: [
        {
          id: `doc-${index}-${idx}-1`,
          name: `${s.name.split(' ')[0]}_Bid_Submission_${item.tender_id.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          type: 'Technical & Commercial Bid',
          fileSize: '4.8 MB',
          uploadDate: '2026-09-14',
          tamperCheck: 'Valid SHA-256',
          sha256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
          extractedClauses: [
            { label: 'Turnover Compliance', value: '₹5.2 Cr (Min required: ₹3.0 Cr)', match: true, confidence: 97 },
            { label: 'Make in India Local Content', value: '62% (Class-I Local Supplier)', match: true, confidence: 95 },
            { label: 'OEM Authorization Form', value: 'Submitted & Digitally Signed', match: true, confidence: 92 },
          ],
        },
      ],
      scores: {
        technical: score,
        financial: Math.max(score - 4, 50),
        regulatory: Math.min(score + 3, 98),
        experience: Math.max(score - 6, 45),
      },
    };
  });
}
