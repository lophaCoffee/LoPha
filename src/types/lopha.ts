export interface MindmapNode {
  id: string;
  label: string;
  shortDesc: string;
  category: 'root' | 'legal' | 'philosophy' | 'tech' | 'products' | 'b2b' | 'certs' | 'network' | 'recruitment';
  iconName?: string;
  children?: MindmapNode[];
  badge?: string;
}

export interface LegalEntityInfo {
  companyFullName: string;
  internationalName: string;
  brandName: string;
  taxCode: string;
  establishedDate: string;
  registrationChanges: string;
  legalRepresentative: string;
  headquarters: string;
  factory: string;
  showrooms: { name: string; address: string }[];
  hotline: string;
  email: string;
}

export interface ProductItem {
  id: string;
  name: string;
  format: string;
  packOptions: { size: string; price: number; formattedPrice: string }[];
  flavorProfile: string;
  targetAudience: string;
  characteristics: { label: string; score: number }[];
  description: string;
  image: string;
  tag: string;
}

export interface B2BSolution {
  id: string;
  title: string;
  subtitle: string;
  target: string;
  commitments: string[];
  keyFeatures: string[];
  recommendedProducts: string[];
}

export interface CertificateItem {
  code: string;
  name: string;
  issuer: string;
  scope: string;
  strategicValue: string;
  icon: string;
}

export interface LocationItem {
  id: string;
  type: 'hq' | 'factory' | 'showroom';
  name: string;
  address: string;
  role: string;
  strategicValue: string;
  phone?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  metadata?: {
    topic?: string;
    sourceSection?: string;
  };
}
