export type NavigationTab = 
  | 'landing'
  | 'dashboard' 
  | 'tenders' 
  | 'new-verification' 
  | 'verification' 
  | 'reports' 
  | 'audit-trail';

export type WorkflowStepId = 1 | 2 | 3 | 4 | 5 | 6;

export interface WorkflowStep {
  id: WorkflowStepId;
  label: string;
  title: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
}

export interface DiscrepancyItem {
  id: string;
  severity: 'high' | 'medium' | 'low';
  category: 'Financial' | 'Regulatory' | 'Technical' | 'Experience';
  title: string;
  description: string;
  citation: string;
  pageNumber: number;
  docName: string;
  suggestedAction: string;
  aiConfidence: number;
  officerAction?: 'pending' | 'confirmed' | 'overridden';
  overrideReason?: string;
}

export interface BidDocument {
  id: string;
  name: string;
  type: string;
  fileSize: string;
  uploadDate: string;
  tamperCheck: 'Valid SHA-256' | 'Digital Signature Valid' | 'Tamper Alert';
  sha256: string;
  extractedClauses: {
    label: string;
    value: string;
    match: boolean;
    confidence: number;
  }[];
}

export interface CrossVerification {
  source: 'GSTN' | 'Udyam' | 'PAN / ITD' | 'MCA21' | 'DigiLocker' | 'EPFO / ESIC' | 'Startup India' | 'GeM Portal';
  field: string;
  claimedValue: string;
  registryValue: string;
  status: 'Verified' | 'Mismatch' | 'Warning' | 'Fallback';
  confidence: number;
  verifiedAt: string;
  details: string;
}

export interface Bidder {
  id: string;
  companyName: string;
  vendorId: string;
  cin: string;
  gstin: string;
  pan: string;
  udyamNumber: string;
  quotedAmount: string;
  complianceScore: number;
  riskCategory: 'Low Risk' | 'Medium Risk' | 'High Risk';
  status: 'Pending Officer Review' | 'Officer Approved' | 'Clarification Requested' | 'Disqualified';
  officerDecision?: {
    decision: 'approve' | 'reject' | 'clarification';
    timestamp: string;
    officerName: string;
    officerDesignation: string;
    remarks: string;
    digitalSignatureHash: string;
  };
  crossVerifications: CrossVerification[];
  discrepancies: DiscrepancyItem[];
  documents: BidDocument[];
  scores: {
    technical: number;
    financial: number;
    regulatory: number;
    experience: number;
  };
}

export interface TenderRequirement {
  clauseNumber: string;
  category: 'Financial' | 'Technical' | 'Regulatory' | 'Experience';
  title: string;
  specification: string;
  mandatory: boolean;
}

export interface Tender {
  id: string;
  title: string;
  subtitle: string;
  department: string;
  estimatedValue: string;
  bidsCount: number;
  bidsSubtext: string;
  status: 'Under Verification' | 'Verified' | 'Attention Required';
  riskLevel: 'Low Risk (Score: 94)' | 'Medium Risk (Score: 72)' | 'High Risk (Score: 48)';
  score: number;
  riskCategory: 'Low Risk' | 'Medium Risk' | 'High Risk';
  dueDate: string;
  publishedDate: string;
  evaluatingOfficer: string;
  requirements: TenderRequirement[];
  bidders: Bidder[];
  sourceName?: 'GeM' | 'CPPP' | 'Manual';
  sourceUrl?: string;
  bidDetailUrl?: string;
  pdfUrl?: string;
  location?: string;
  rawEligibility?: string;
}

export interface GovernmentDataSource {
  id: string;
  name: string;
  statusText: string;
  subtext: string;
  isOnline: boolean;
  type: 'live' | 'mock' | 'oauth' | 'manual';
  latencyMs: number;
  description: string;
}

export interface AuditTrailLog {
  id: string;
  timestamp: string;
  officer: string;
  tenderId: string;
  bidderName?: string;
  action: string;
  category: 'VERIFICATION' | 'OVERRIDE' | 'DECISION' | 'CLARIFICATION' | 'SYNC';
  sha256: string;
  justification?: string;
}
