import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Test {
  id: number;
  name: string;
  price: number;
  url: string;
  parameters?: number | null;
  condition?: string;
}

interface Package {
  id: number;
  name: string;
  price: number;
  parameters: number;
  reports: string;
  includes: string[];
}

interface CartItem {
  name: string;
  price: number;
  type: 'test' | 'package';
}

interface LabLocation {
  id: string;
  name: string;
  address: string;
}

const NOTIFY_API_URL =
  'https://ikit.chatomate.in/saas/workflow/bot/62c44626e4eedda7941d73f0?webhookId=69faed5034cd415d7f73999d';
const WHATSAPP_URL = 'https://wa.me/+919313234679';

@Component({
  selector: 'app-book-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-test.component.html',
  styleUrl: './book-test.component.css',
})
export class BookTestComponent {
  // ── Step flow ──────────────────────────────────────
  currentStep: 1 | 2 = 1;
  showStep1Errors = false;

  get step1Valid(): boolean {
    if (!this.serviceType) return false;
    if (this.serviceType === 'home') {
      return (
        this.homeForm.pincode.trim().length === 6 &&
        !!this.homeForm.date &&
        !!this.homeForm.slot
      );
    }
    return !!this.selectedLabId;
  }

  goToStep2(): void {
    this.showStep1Errors = true;
    if (!this.step1Valid) return;
    this.showStep1Errors = false;
    this.currentStep = 2;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  backToStep1(): void {
    this.currentStep = 1;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ── Booking state ──────────────────────────────────
  serviceType: 'home' | 'lab' | null = 'home';

  // Home collection form
  homeForm = { pincode: '', date: '', slot: '' };
  readonly slots = [
    '7:00 AM – 9:00 AM',
    '9:00 AM – 11:00 AM',
    '11:00 AM – 1:00 PM',
    '2:00 PM – 4:00 PM',
    '4:00 PM – 6:00 PM',
  ];

  // Nearest lab
  readonly labLocations: LabLocation[] = [
    {
      id: 'lb1',
      name: 'AMPATH – Banjara Hills',
      address: '6-3-249, Road No. 1, Banjara Hills, Hyderabad',
    },
    {
      id: 'lb2',
      name: 'AMPATH – Jubilee Hills',
      address: 'Plot 1241, Road 45, Jubilee Hills, Hyderabad',
    },
    {
      id: 'lb3',
      name: 'AMPATH – Kukatpally',
      address: 'KPHB Colony, Phase 1, Kukatpally, Hyderabad',
    },
    {
      id: 'lb4',
      name: 'AMPATH – Secunderabad',
      address: 'MG Road, Secunderabad, Hyderabad',
    },
    {
      id: 'lb5',
      name: 'AMPATH – Madhapur',
      address: 'Hitech City Road, Madhapur, Hyderabad',
    },
  ];
  selectedLabId = '';

  // ── Tests / packages tab ───────────────────────────
  activeTab: 'tests' | 'packages' = 'tests';
  searchQuery = '';
  filterCondition = '';
  filterPrice = '';
  dateFocused = false;
  cart: CartItem[] = [];
  cartOpen = false;

  tests: Test[] = [
    {
      id: 888,
      name: 'Thyroid Profile - I',
      parameters: 3,
      price: 550,
      condition: 'endocrine',
      url: 'https://www.ampath.com/lab-test/thyroid-profile-i',
    },
    {
      id: 979,
      name: 'Lipid Profile',
      parameters: 1,
      price: 900,
      condition: 'cardiovascular',
      url: 'https://www.ampath.com/lab-test/lipid-profile',
    },
    {
      id: 980,
      name: 'Liver Function Tests (LFT) with GGT',
      parameters: 1,
      price: 1100,
      condition: 'gastrointestinal',
      url: 'https://www.ampath.com/lab-test/liver-function-tests-lft',
    },
    {
      id: 988,
      name: 'Renal Function Test (RFT)',
      parameters: 8,
      price: 950,
      condition: 'renal',
      url: 'https://www.ampath.com/lab-test/renal-function-test-rft-basic',
    },
    {
      id: 1010,
      name: 'Diabetes Check - I',
      parameters: 3,
      price: 575,
      condition: 'diabetes',
      url: 'https://www.ampath.com/lab-test/diabetes-check-i',
    },
    {
      id: 1056,
      name: 'Diabetes Check- Comprehensive (Glucose-F&PP, HbA1c, Lipid Profile, CUE, Microalbumin, Creatinine, BUN, Urea, Electrolytes)',
      parameters: null,
      price: 1350,
      condition: 'diabetes',
      url: 'https://www.ampath.com/lab-test/diabetes-check-comprehensive-glucose-f-pp-hba1c-lipid-profile-cue-microalbumin-creatinine-bun-urea-electrolytes',
    },
    {
      id: 1094,
      name: 'Arthritis Panel - I (ASO, Calcium, CBC, ESR, CRP, RF, Uric acid)',
      parameters: 6,
      price: 2200,
      condition: 'skeletomuscular',
      url: 'https://www.ampath.com/lab-test/arthritis-panel-i-aso-calcium-cbc-esr-crp-rf-uric-acid',
    },
    {
      id: 4106,
      name: '1-3-ß-D-Glucan Assay',
      parameters: null,
      price: 11000,
      condition: 'infectious',
      url: 'https://www.ampath.com/lab-test/1-3-ß-d-glucan-assay',
    },
    {
      id: 4450,
      name: '16S RRNA SEQUENCING BACTERIAL IDENTIFICATION',
      parameters: null,
      price: 3000,
      condition: 'genetics',
      url: 'https://www.ampath.com/lab-test/16s-rrna-sequencing-bacterial-identification',
    },
    {
      id: 2887,
      name: '17 - Alpha- Hydroxy Progesterone',
      parameters: null,
      price: 1800,
      condition: 'endocrine',
      url: 'https://www.ampath.com/lab-test/17-alpha-hydroxy-progesterone',
    },
    {
      id: 2371,
      name: '17 - hydroxycorticosteroids (17-OHCS) - 24 hr urine',
      parameters: null,
      price: 7000,
      condition: 'endocrine',
      url: 'https://www.ampath.com/lab-test/17-hydroxycorticosteroids-17-ohcs-24-hr-urine',
    },
    {
      id: 3348,
      name: '17-Alpha Hydroxyprogesterone (Neonatal Screening)',
      parameters: null,
      price: 550,
      condition: 'endocrine',
      url: 'https://www.ampath.com/lab-test/17-alpha-hydroxyprogesterone-neonatal-screening',
    },
    {
      id: 2888,
      name: '17-Keto Steroids - 24hr urine',
      price: 6200,
      condition: 'endocrine',
      url: 'https://www.ampath.com/lab-test/17-keto-steroids-24hr-urine',
    },
    {
      id: 4193,
      name: '30 CELL KARYOTYPING',
      price: 4000,
      condition: 'genetics',
      url: 'https://www.ampath.com/lab-test/30-cell-karyotyping',
    },
    {
      id: 1781,
      name: '5-Hydroxy Indole Acetic Acid (5 HIAA) - 24 hrs urine',
      price: 3700,
      condition: 'oncology',
      url: 'https://www.ampath.com/lab-test/5-hydroxy-indole-acetic-acid-5-hiaa-24-hrs-urine',
    },
    {
      id: 2892,
      name: '5-Hydroxy Indole Acetic Acid (5-HIAA) - Spot urine',
      price: 4500,
      condition: 'oncology',
      url: 'https://www.ampath.com/lab-test/5-hydroxy-indole-acetic-acid-5-hiaa-spot-urine',
    },
    {
      id: 2893,
      name: 'A/G (Albumin/Globulin) Ratio',
      price: 160,
      condition: 'gastrointestinal',
      url: 'https://www.ampath.com/lab-test/a-g-albumin-globulin-ratio',
    },
    {
      id: 1443,
      name: 'ABG (Blood Gas Analysis) - Arterial',
      price: 1000,
      condition: 'pulmonary',
      url: 'https://www.ampath.com/lab-test/abg-blood-gas-analysis-arterial',
    },
    {
      id: 3272,
      name: 'ABG with Lactate',
      price: 1500,
      condition: 'pulmonary',
      url: 'https://www.ampath.com/lab-test/abg-with-lactate',
    },
    {
      id: 2694,
      name: 'ABL1',
      price: 4900,
      condition: 'oncology',
      url: 'https://www.ampath.com/lab-test/abl1',
    },
    {
      id: 2695,
      name: 'ABL2',
      price: 4900,
      condition: 'oncology',
      url: 'https://www.ampath.com/lab-test/abl2',
    },
    {
      id: 2894,
      name: 'Absolute Eosinophil Count (AEC)',
      price: 160,
      condition: 'allergy',
      url: 'https://www.ampath.com/lab-test/absolute-eosinophil-count-aec',
    },
    {
      id: 2895,
      name: 'Absolute Lymphocyte Count (ALC)',
      price: 160,
      condition: 'blood',
      url: 'https://www.ampath.com/lab-test/absolute-lymphocyte-count-alc',
    },
    {
      id: 2896,
      name: 'Absolute Neutrophil Count (ANC)',
      price: 160,
      condition: 'blood',
      url: 'https://www.ampath.com/lab-test/absolute-neutrophil-count-anc',
    },
  ];

  packages: Package[] = [
    {
      id: 4250,
      name: 'Am-Fit (With Vitamin D)',
      price: 599,
      parameters: 29,
      reports: 'Schedule: Daily',
      includes: [
        'Complete Blood Counts',
        'Glucose - Fasting',
        'Cholesterol Total',
      ],
    },
    {
      id: 1128,
      name: 'Basic Health Check',
      price: 800,
      parameters: 62,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'Glucose - Fasting', 'Lipid profile'],
    },
    {
      id: 1114,
      name: 'Comprehensive Health Check',
      price: 2099,
      parameters: 67,
      reports: 'N/A',
      includes: [
        'Complete Blood Counts',
        'HbA1c - Glycated Hemoglobin',
        'Glucose - Fasting',
      ],
    },
    {
      id: 1130,
      name: 'Executive Health Check',
      price: 1500,
      parameters: 65,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'LFT', 'Lipid profile'],
    },
    {
      id: 1129,
      name: 'Advance Health Check',
      price: 1000,
      parameters: 64,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'Glucose - Fasting', 'HbA1c'],
    },
    {
      id: 1124,
      name: 'Senior Citizens - Male',
      price: 1899,
      parameters: 62,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'HbA1c', 'Glucose - Fasting'],
    },
    {
      id: 1123,
      name: 'Senior Citizens - Female',
      price: 1699,
      parameters: 62,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'HbA1c', 'Glucose - Fasting'],
    },
    {
      id: 1122,
      name: 'Kids Check',
      price: 799,
      parameters: 29,
      reports: 'N/A',
      includes: ['CBC', 'Blood sugar - Fasting', 'Cholesterol Total'],
    },
    {
      id: 4252,
      name: 'Am-Fit Plus',
      price: 799,
      parameters: 31,
      reports: 'Schedule: Daily',
      includes: [
        'Complete Blood Counts',
        'Glucose - Fasting',
        'Cholesterol Total',
      ],
    },
    {
      id: 4349,
      name: 'Am-Fit Freedom',
      price: 1199,
      parameters: 66,
      reports: 'Schedule: Daily',
      includes: ['Complete Blood Counts', 'Glucose - Fasting', 'HbA1c'],
    },
    {
      id: 4350,
      name: 'Am-Fit Senior Citizen - Male',
      price: 2299,
      parameters: 68,
      reports: 'Schedule: Daily',
      includes: ['Complete Blood Counts', 'Lipid profile', 'LFT'],
    },
    {
      id: 4351,
      name: 'Am-Fit Senior Citizen - Female',
      price: 2299,
      parameters: 68,
      reports: 'Schedule: Daily',
      includes: ['Complete Blood Counts', 'Lipid profile', 'LFT'],
    },
    {
      id: 4367,
      name: 'Am-Fit Shubh Health',
      price: 2399,
      parameters: 71,
      reports: 'Schedule: Daily',
      includes: ['Complete Blood Counts', 'Glucose - Fasting', 'HbA1c'],
    },
    {
      id: 4373,
      name: 'Am-Fit Healthy Womens Check - 2',
      price: 699,
      parameters: 26,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'Ferritin', 'Serum Iron'],
    },
    {
      id: 4372,
      name: 'Am-Fit Healthy Womens Check - 1',
      price: 499,
      parameters: 0,
      reports: 'N/A',
      includes: ['Complete Blood Counts', 'Ferritin', 'Serum Iron'],
    },
    {
      id: 4382,
      name: 'Am-Fit Freedom Plus (1+1)',
      price: 2899,
      parameters: 73,
      reports: 'Schedule: Daily',
      includes: [],
    },
    {
      id: 4385,
      name: 'Am-Fit Freedom Plus',
      price: 1499,
      parameters: 73,
      reports: 'Schedule: Daily',
      includes: ['Complete Blood Counts', 'Glucose - Fasting', 'HbA1c'],
    },
  ];

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get filteredTests(): Test[] {
    let result = this.tests.filter((t) =>
      t.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    if (this.filterCondition) {
      result = result.filter((t) => t.condition === this.filterCondition);
    }
    if (this.filterPrice === '0-500') {
      result = result.filter((t) => t.price <= 500);
    } else if (this.filterPrice === '501-1000') {
      result = result.filter((t) => t.price > 500 && t.price <= 1000);
    } else if (this.filterPrice === '>1000') {
      result = result.filter((t) => t.price > 1000);
    }
    return result;
  }

  get filteredPackages(): Package[] {
    return this.packages.filter((p) =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  get selectedLabName(): string {
    return (
      this.labLocations.find((l) => l.id === this.selectedLabId)?.name ?? ''
    );
  }

  selectServiceType(type: 'home' | 'lab'): void {
    this.serviceType = type;
  }

  switchTab(tab: 'tests' | 'packages'): void {
    this.activeTab = tab;
    this.searchQuery = '';
  }

  isInCart(name: string): boolean {
    return !!this.cart.find((c) => c.name === name);
  }

  addToCart(item: CartItem): void {
    if (this.isInCart(item.name)) return;
    this.cart = [...this.cart, item];
  }

  removeFromCart(name: string): void {
    this.cart = this.cart.filter((c) => c.name !== name);
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  isBooking = false;

  proceedToBook(): void {
    if (this.isBooking) return;
    this.isBooking = true;

    const bookingId = Math.floor(1000 + Math.random() * 9000);

    // Use no-cors fetch to avoid CORS preflight on the third-party webhook.
    // The request is fired as a simple POST; the opaque response is ignored.
    fetch(NOTIFY_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        ph: '+919157447576',
        bookingId: String(bookingId),
      }),
    }).finally(() => {
      window.location.href = WHATSAPP_URL;
      // On mobile the OS intercepts wa.me and opens WhatsApp natively,
      // leaving this browser tab alive with stale state.
      // Reload the page after a short delay so it is fresh when the user returns.
      // If the browser actually navigated away (desktop), this timer is cancelled
      // automatically and never fires.
      setTimeout(() => window.location.replace(window.location.pathname), 1500);
    });
  }
}
