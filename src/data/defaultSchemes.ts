import { Scheme } from '../types';

export const DEFAULT_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    hindiName: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    shortCode: 'PM-KISAN',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'agriculture',
    shortDescription: 'Income support scheme providing ₹6,000 per year in three equal installments to landholding farmer families.',
    shortDescriptionHindi: 'भूमिधारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष ₹6,000 की वित्तीय सहायता प्रदान करने वाली योजना।',
    benefitHighlight: '₹6,000 / year (3 installments of ₹2,000 directly via DBT into bank accounts)',
    benefitHighlightHindi: '₹6,000 प्रति वर्ष (₹2,000 की 3 किश्तें सीधे बैंक खाते में डीबीटी द्वारा)',
    targetAudience: 'Small and marginal landholding farmer families across India',
    targetAudienceHindi: 'देश भर के छोटे और सीमांत भूमिधारक किसान परिवार',
    officialPortal: 'https://pmkisan.gov.in',
    officialDocTitle: 'PM-KISAN Operational Guidelines (Rev. 2024) - Dept. of Agriculture & Farmers Welfare',
    applicationMode: 'both',
    tags: ['agriculture', 'farmer', 'cash transfer', 'dbt', 'kisan'],
    eligibility: {
      landOwnershipRequired: true,
      excludedOccupations: [
        'Institutional land holders',
        'Farmer families holding constitutional posts',
        'Former and present Ministers, MPs, MLAs, Mayors, District Panchayat Chairpersons',
        'Serving or retired officers and employees of Central/State Government, PSEs, Autonomous bodies (except Multi-Tasking Staff/Class IV)',
        'All superannuated/retired pensioners whose monthly pension is ₹10,000 or more (excluding Class IV)',
        'All persons who paid Income Tax in the last assessment year',
        'Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects registered with professional bodies'
      ],
      summary: 'All landholding farmer families who have cultivable landholding in their names are eligible, subject to exclusion criteria like income tax payment and government employment.',
      summaryHindi: 'वे सभी भूमिधारक किसान परिवार जिनके नाम पर कृषि योग्य भूमि है, वे पात्र हैं, बशर्ते वे आयकरदाता या सरकारी कर्मचारी जैसे अपवर्जन मानदंडों के अंतर्गत न आते हों।',
      sourceSection: 'Section 3: Eligibility & Exclusion Criteria',
      sourcePage: 4
    },
    documents: [
      {
        name: 'Aadhaar Card (Mandatory)',
        nameHindi: 'आधार कार्ड (अनिवार्य)',
        required: true,
        purpose: 'Identity verification and biometric eKYC authentication',
        purposeHindi: 'पहचान सत्यापन और बायोमेट्रिक ई-केवाईसी प्रमाणीकरण',
        sourcePage: 6,
        sourceSection: 'Section 5: Registration Requirements'
      },
      {
        name: 'Land Ownership Records (Khatauni / RoR)',
        nameHindi: 'भूमि स्वामित्व रिकॉर्ड (खतौनी / जमाबंदी)',
        required: true,
        purpose: 'Proof of cultivable landholding in the name of the farmer family',
        purposeHindi: 'किसान परिवार के नाम पर कृषि योग्य भूमि का प्रमाण',
        sourcePage: 6,
        sourceSection: 'Section 5: Land Verification'
      },
      {
        name: 'Aadhaar-Linked Bank Account Details',
        nameHindi: 'आधार से जुड़ा बैंक खाता विवरण',
        required: true,
        purpose: 'Direct Benefit Transfer (DBT) via PFMS NPCI Aadhaar mapper',
        purposeHindi: 'एनपीसीआई आधार मैपर के माध्यम से प्रत्यक्ष लाभ अंतरण (डीबीटी)',
        sourcePage: 7,
        sourceSection: 'Section 6: Payment Delivery'
      },
      {
        name: 'Active Mobile Number',
        nameHindi: 'सक्रिय मोबाइल नंबर',
        required: true,
        purpose: 'Receiving OTP for PM-KISAN portal login and OTP-based eKYC',
        purposeHindi: 'पोर्टल लॉगिन और ओटीपी-आधारित ई-केवाईसी सत्यापन के लिए',
        sourcePage: 7,
        sourceSection: 'Section 6: Digital Verification'
      }
    ],
    benefits: [
      {
        title: 'Financial Assistance',
        titleHindi: 'वित्तीय सहायता',
        amountOrCoverage: '₹6,000 annually',
        frequency: '3 equal installments of ₹2,000 every 4 months (Apr-Jul, Aug-Nov, Dec-Mar)',
        frequencyHindi: 'प्रत्येक 4 माह में ₹2,000 की 3 समान किश्तें'
      },
      {
        title: 'Kisan Credit Card (KCC) Linkage',
        titleHindi: 'किसान क्रेडिट कार्ड (केसीसी) लिंकेज',
        amountOrCoverage: 'Subsidized institutional credit up to ₹3,00,000 at 4% interest rate',
        frequency: 'Available on application through linked PM-KISAN record',
        frequencyHindi: 'संबद्ध पीएम-किसान रिकॉर्ड के माध्यम से उपलब्ध'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Official Portal or CSC Center',
        titleHindi: 'आधिकारिक पोर्टल या सीएससी केंद्र पर जाएं',
        details: 'Go to pmkisan.gov.in and click on "Farmers Corner" -> "New Farmer Registration" or visit nearest Common Service Center (CSC).',
        detailsHindi: 'pmkisan.gov.in पर जाएं और "Farmers Corner" -> "New Farmer Registration" पर क्लिक करें अथवा नजदीकी सीएससी केंद्र पर जाएं।'
      },
      {
        stepNumber: 2,
        title: 'Submit Aadhaar and State Information',
        titleHindi: 'आधार और राज्य की जानकारी दर्ज करें',
        details: 'Enter 12-digit Aadhaar number, registered mobile number, state, and capture OTP received on Aadhaar-linked mobile.',
        detailsHindi: '12-अंकों का आधार नंबर, पंजीकृत मोबाइल नंबर दर्ज करें और ओटीपी सत्यापित करें।'
      },
      {
        stepNumber: 3,
        title: 'Fill Land Details and Bank Information',
        titleHindi: 'जमीन का विवरण और बैंक खाता दर्ज करें',
        details: 'Upload land records (Khatauni Khasra number, land ownership date) and verify Aadhaar-seeded bank account.',
        detailsHindi: 'खतौनी, खसरा नंबर और भूमि रजिस्ट्री का विवरण अपलोड करें तथा बैंक खाता जांचें।'
      },
      {
        stepNumber: 4,
        title: 'Complete eKYC & State Approval',
        titleHindi: 'ई-केवाईसी और राज्य अनुमोदन पूर्ण करें',
        details: 'Complete OTP-based eKYC on portal or biometric eKYC at CSC. State nodal revenue officer verifies land records.',
        detailsHindi: 'ओटीपी या बायोमेट्रिक ई-केवाईसी पूरी करें। संबंधित राजस्व अधिकारी सत्यापन के बाद अनुमोदन देंगे।'
      }
    ],
    chunks: [
      {
        id: 'pmk-chunk-1',
        schemeId: 'pm-kisan',
        schemeName: 'PM-KISAN',
        documentTitle: 'PM-KISAN Operational Guidelines (Rev. 2024)',
        section: 'Section 3: Eligibility Criteria and Definition of Beneficiary',
        pageNumber: 4,
        content: 'Under PM-KISAN, a landholder farmer family is defined as a family consisting of husband, wife and minor children who own cultivable land as per land records of the concerned State/UT. The eligible family will receive financial support of ₹6,000 per annum paid in three four-monthly installments of ₹2,000 each. The cut-off date for determination of eligibility of beneficiaries is 01.02.2019.',
        contentHindi: 'पीएम-किसान के तहत, एक भूमिधारक किसान परिवार को ऐसे परिवार के रूप में परिभाषित किया गया है जिसमें पति, पत्नी और नाबालिग बच्चे शामिल हैं, जिनके पास राज्य/केंद्र शासित प्रदेश के भूमि अभिलेखों के अनुसार कृषि योग्य भूमि है। पात्र परिवार को प्रति वर्ष ₹6,000 की वित्तीय सहायता मिलेगी, जिसका भुगतान ₹2,000 की तीन चार-मासिक किस्तों में किया जाएगा।',
        officialUrl: 'https://pmkisan.gov.in',
        keywords: ['pm-kisan', 'eligibility', 'amount', 'installment', 'farmer', 'family', 'cultivable land', '6000', '2000', 'पात्रता', 'किसान', 'किस्त']
      },
      {
        id: 'pmk-chunk-2',
        schemeId: 'pm-kisan',
        schemeName: 'PM-KISAN',
        documentTitle: 'PM-KISAN Operational Guidelines (Rev. 2024)',
        section: 'Section 4: Exclusion Categories (Who cannot apply)',
        pageNumber: 5,
        content: 'The following categories of beneficiaries of higher economic status shall not be eligible for benefits under PM-KISAN: (a) All Institutional Landholders; (b) Farmer families in which one or more members belong to: Former and present holders of constitutional posts; Former and present Ministers/State Ministers, MPs, MLAs, MLCs, Mayors of Municipal Corporations, Chairpersons of District Panchayats; (c) All serving or retired officers/employees of Central/State Government Ministries/Offices/Departments and Field Units, Central or State PSEs and Attached offices/Autonomous Institutions (excluding Multi-Tasking Staff / Class IV / Group D employees); (d) All superannuated/retired pensioners whose monthly pension is ₹10,000 or more; (e) All persons who paid Income Tax in the last assessment year; (f) Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects registered with professional bodies.',
        contentHindi: 'निम्नलिखित उच्च आर्थिक श्रेणी के लाभार्थी पीएम-किसान के पात्र नहीं होंगे: (क) संस्थागत भूमिधारक; (ख) संवैधानिक पदों के पूर्व एवं वर्तमान धारक, मंत्री, सांसद, विधायक; (ग) केंद्र/राज्य सरकार के अधिकारी व कर्मचारी (ग्रुप डी/चतुर्थ श्रेणी कर्मचारियों को छोड़कर); (घ) ₹10,000 या अधिक मासिक पेंशन पाने वाले सेवानिवृत्त कर्मचारी; (ङ) पिछले मूल्यांकन वर्ष में आयकर का भुगतान करने वाले सभी व्यक्ति; (च) पेशेवर जैसे डॉक्टर, इंजीनियर, वकील, सीए आदि।',
        officialUrl: 'https://pmkisan.gov.in',
        keywords: ['exclusion', 'tax', 'income tax', 'government employee', 'pension', 'who cannot apply', 'ineligible', 'आयकर', 'अपात्र', 'सरकारी नौकरी']
      },
      {
        id: 'pmk-chunk-3',
        schemeId: 'pm-kisan',
        schemeName: 'PM-KISAN',
        documentTitle: 'PM-KISAN Operational Guidelines (Rev. 2024)',
        section: 'Section 5: Mandatory Documents & Registration Process',
        pageNumber: 6,
        content: 'Documents required for registration under PM-KISAN: 1. Aadhaar Card: Mandatory for all farmers. No benefit shall be disbursed without Aadhaar authentication. 2. Land Records: Updated Record of Rights (RoR) / Khatauni / Khasra confirming ownership of cultivable land. 3. Bank Account: Bank account must be seeded and mapped with Aadhaar on the NPCI database for PFMS Direct Benefit Transfer (DBT). 4. Active Mobile number for OTP validation. Mandatory eKYC: Every beneficiary must complete biometric or OTP-based eKYC through the PM-KISAN portal or CSC center.',
        contentHindi: 'पीएम-किसान पंजीकरण हेतु आवश्यक दस्तावेज: 1. आधार कार्ड: सभी किसानों के लिए अनिवार्य। 2. भूमि अभिलेख: खतौनी/जमाबंदी जिससे कृषि भूमि का स्वामित्व प्रमाणित हो। 3. बैंक खाता: डीबीटी के लिए बैंक खाते का आधार से जुड़ा होना और एनपीसीआई पर मैप होना अनिवार्य है। 4. सक्रिय मोबाइल नंबर। सभी लाभार्थियों के लिए ई-केवाईसी पूरा करना अनिवार्य है।',
        officialUrl: 'https://pmkisan.gov.in',
        keywords: ['documents', 'aadhaar', 'land record', 'khatauni', 'bank account', 'ekyc', 'npci', 'dbt', 'दस्तावेज', 'आधार', 'खतौनी', 'ई-केवाईसी']
      }
    ]
  },
  {
    id: 'pm-jay',
    name: 'Ayushman Bharat - PM-JAY (Pradhan Mantri Jan Arogya Yojana)',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)',
    shortCode: 'PM-JAY',
    ministry: 'Ministry of Health & Family Welfare / National Health Authority (NHA)',
    ministryHindi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय / राष्ट्रीय स्वास्थ्य प्राधिकरण',
    category: 'healthcare',
    shortDescription: 'World’s largest public health assurance scheme offering cashless health insurance cover up to ₹5 lakh per family per year.',
    shortDescriptionHindi: 'विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना जो प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य सुरक्षा कवर प्रदान करती है।',
    benefitHighlight: 'Cashless hospital cover of up to ₹5,00,000 per family per year for secondary and tertiary care',
    benefitHighlightHindi: 'माध्यमिक एवं तृतीयक स्तर के अस्पताल में भर्ती होने पर प्रति परिवार प्रति वर्ष ₹5,00,000 तक का कैशलेस इलाज',
    targetAudience: 'Vulnerable and low-income families identified through SECC 2011 and senior citizens aged 70+',
    targetAudienceHindi: 'एसईसीसी 2011 द्वारा चिन्हित गरीब व कमजोर परिवार तथा 70 वर्ष से अधिक आयु के वरिष्ठ नागरिक',
    officialPortal: 'https://beneficiary.nha.gov.in',
    officialDocTitle: 'AB-PMJAY Implementation Framework & Operational Guidelines - National Health Authority',
    applicationMode: 'both',
    tags: ['health', 'insurance', 'hospital', 'cashless', 'ayushman', 'ayushman card'],
    eligibility: {
      minAge: 0,
      targetCategories: ['Low Income', 'SECC 2011 Beneficiary', 'Senior Citizens 70+ (Vayo Vandana)'],
      summary: 'Families classified as deprived in rural areas (e.g. kuccha house, landless laborer) and occupational categories in urban areas as per SECC 2011 data. Recently expanded to all senior citizens aged 70 years and above irrespective of family income.',
      summaryHindi: 'ग्रामीण क्षेत्रों में वंचित श्रेणियों (जैसे कच्चा मकान, भूमिहीन श्रमिक) और शहरी क्षेत्रों में निर्धारित व्यावसायिक श्रेणियों के परिवार। हाल ही में 70 वर्ष या अधिक आयु के सभी वरिष्ठ नागरिकों को आय सीमा के बिना इसमें शामिल किया गया है।',
      sourceSection: 'Chapter 2: Beneficiary Identification & Eligibility Criteria',
      sourcePage: 8
    },
    documents: [
      {
        name: 'Aadhaar Card (Mandatory)',
        nameHindi: 'आधार कार्ड (अनिवार्य)',
        required: true,
        purpose: 'Biometric/OTP eKYC and beneficiary verification',
        purposeHindi: 'बायोमेट्रिक/ओटीपी ई-केवाईसी और लाभार्थी सत्यापन',
        sourcePage: 12,
        sourceSection: 'Chapter 3: Ayushman Card Issuance'
      },
      {
        name: 'Ration Card / Family ID',
        nameHindi: 'राशन कार्ड / परिवार पहचान पत्र',
        required: true,
        purpose: 'Verification of family tree and co-beneficiary linkage',
        purposeHindi: 'परिवार के सदस्यों के सत्यापन और लिंकेज के लिए',
        sourcePage: 12,
        sourceSection: 'Chapter 3: Family Verification'
      },
      {
        name: 'Mobile Number Linked to Aadhaar',
        nameHindi: 'आधार से लिंक मोबाइल नंबर',
        required: true,
        purpose: 'Authentication and receiving electronic Ayushman Card (PVC/PDF)',
        purposeHindi: 'प्रमाणीकरण और आयुष्मान कार्ड डाउनलोड करने के लिए',
        sourcePage: 13,
        sourceSection: 'Chapter 3: Digital Delivery'
      }
    ],
    benefits: [
      {
        title: 'Annual Inpatient Hospital Cover',
        titleHindi: 'वार्षिक अस्पताल भर्ती सुरक्षा',
        amountOrCoverage: '₹5,00,000 per family per year',
        frequency: 'Renewed annually; covers over 1,949 medical and surgical procedures',
        frequencyHindi: 'प्रति वर्ष नवीनीकृत; 1,949 से अधिक चिकित्सा और शल्य प्रक्रियाओं को कवर करता है'
      },
      {
        title: 'Pre and Post Hospitalization',
        titleHindi: 'अस्पताल में भर्ती से पूर्व और बाद का खर्च',
        amountOrCoverage: 'Covers 3 days of pre-hospitalization and 15 days of post-hospitalization medicines/diagnostics',
        frequency: 'Included in every inpatient episode',
        frequencyHindi: 'अस्पताल से छुट्टी के 15 दिन बाद तक की दवाएं और जांचें शामिल'
      },
      {
        title: 'Portability Across India',
        titleHindi: 'अखिल भारतीय पोर्टेबिलिटी',
        amountOrCoverage: 'Cashless treatment at any empaneled public or private hospital nationwide',
        frequency: 'Anytime nationwide',
        frequencyHindi: 'देश भर के किसी भी सूचीबद्ध सरकारी या निजी अस्पताल में कैशलेस'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Check Eligibility on Beneficiary Portal',
        titleHindi: 'लाभार्थी पोर्टल पर पात्रता जांचें',
        details: 'Visit beneficiary.nha.gov.in or open Ayushman App. Enter mobile number, select state, and search by Ration Card number, Aadhaar, or PM-JAY Family ID.',
        detailsHindi: 'beneficiary.nha.gov.in पर जाएं या आयुष्मान ऐप डाउनलोड करें। मोबाइल नंबर, राज्य चुनें और राशन कार्ड या आधार से सर्च करें।'
      },
      {
        stepNumber: 2,
        title: 'Perform eKYC',
        titleHindi: 'ई-केवाईसी पूर्ण करें',
        details: 'Select beneficiary member, click "eKYC", and verify via Aadhaar OTP, IRIS scan, or Face Auth on smartphone.',
        detailsHindi: 'लाभार्थी का चयन करें, "eKYC" पर क्लिक करें और आधार ओटीपी या फेस ऑथेंटिकेशन से सत्यापित करें।'
      },
      {
        stepNumber: 3,
        title: 'Download Ayushman Card',
        titleHindi: 'आयुष्मान कार्ड डाउनलोड करें',
        details: 'Upon instant verification or approval by the District Implementation Unit (DIU), download the Ayushman Card PDF or collect laminated card.',
        detailsHindi: 'सत्यापन के तुरंत बाद अपना आयुष्मान कार्ड डाउनलोड करें या नजदीकी अस्पताल/सीएससी से प्राप्त करें।'
      }
    ],
    chunks: [
      {
        id: 'pmjay-chunk-1',
        schemeId: 'pm-jay',
        schemeName: 'Ayushman Bharat PM-JAY',
        documentTitle: 'AB-PMJAY Implementation Framework - National Health Authority',
        section: 'Chapter 2: Eligibility and Target Group',
        pageNumber: 8,
        content: 'Ayushman Bharat PM-JAY provides health cover of ₹5,00,000 per family per year on a family floater basis for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families. There is no restriction on family size, age, or gender. Pre-existing conditions are covered from day one of the policy. In September 2024, the Union Cabinet approved the expansion of PM-JAY to cover all senior citizens aged 70 years and above (Ayushman Vayo Vandana Card), granting an additional distinct ₹5 lakh top-up cover irrespective of socio-economic status.',
        contentHindi: 'आयुष्मान भारत पीएम-जय 12 करोड़ से अधिक गरीब और कमजोर परिवारों को माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5,00,000 का स्वास्थ्य कवर प्रदान करता है। परिवार के आकार, उम्र या लिंग पर कोई प्रतिबंध नहीं है। पहले से मौजूद बीमारियाँ पहले दिन से कवर होती हैं। इसके अतिरिक्त 70 वर्ष या अधिक उम्र के सभी बुजुर्गों को भी ₹5 लाख का कवर दिया गया है।',
        officialUrl: 'https://beneficiary.nha.gov.in',
        keywords: ['ayushman', 'pm-jay', 'health', '5 lakh', 'hospital', 'cashless', 'senior citizen 70', 'vayo vandana', 'बीमा', 'इलाज', 'अस्पताल', '५ लाख']
      },
      {
        id: 'pmjay-chunk-2',
        schemeId: 'pm-jay',
        schemeName: 'Ayushman Bharat PM-JAY',
        documentTitle: 'AB-PMJAY Implementation Framework - National Health Authority',
        section: 'Chapter 3: Required Documents & Ayushman Card Generation',
        pageNumber: 12,
        content: 'Documents required for Ayushman Card creation: 1. Aadhaar Card is the primary mandatory document for individual identification and biometric authentication. 2. Ration Card, NFSA Card, or State Recognized Family ID to establish family linkage. 3. Mobile number for OTP verification. Beneficiaries do not need to pay any fee for card creation or hospital treatment; the scheme is 100% cashless and paperless at all empaneled public and private hospitals.',
        contentHindi: 'आयुष्मान कार्ड बनाने के लिए आवश्यक दस्तावेज: 1. व्यक्तिगत पहचान और बायोमेट्रिक सत्यापन के लिए आधार कार्ड अनिवार्य है। 2. पारिवारिक संबंध साबित करने के लिए राशन कार्ड या राज्य द्वारा मान्यता प्राप्त परिवार पहचान पत्र। 3. ओटीपी सत्यापन के लिए मोबाइल नंबर। कार्ड बनाने या इलाज के लिए कोई शुल्क नहीं देना होता; योजना पूरी तरह से कैशलेस है।',
        officialUrl: 'https://beneficiary.nha.gov.in',
        keywords: ['documents', 'ayushman card', 'ration card', 'aadhaar', 'cashless', 'free treatment', 'दस्तावेज', 'आयुष्मान कार्ड', 'राशन कार्ड', 'आधार']
      }
    ]
  },
  {
    id: 'pm-awas',
    name: 'Pradhan Mantri Awas Yojana (PMAY - Urban 2.0 & Gramin)',
    hindiName: 'प्रधानमंत्री आवास योजना (पीएमएवाई - शहरी एवं ग्रामीण)',
    shortCode: 'PMAY',
    ministry: 'Ministry of Housing and Urban Affairs & Ministry of Rural Development',
    ministryHindi: 'आवासन और शहरी कार्य मंत्रालय एवं ग्रामीण विकास मंत्रालय',
    category: 'housing',
    shortDescription: 'Flagship government housing scheme providing financial subsidy up to ₹2.5 Lakh for constructing or buying a pucca house.',
    shortDescriptionHindi: 'पक्का मकान बनाने या खरीदने के लिए ₹2.5 लाख तक की वित्तीय सहायता/सब्सिडी प्रदान करने वाली प्रमुख सरकारी आवास योजना।',
    benefitHighlight: 'Subsidy up to ₹1,20,000–₹1,30,000 for rural (Gramin) and interest subsidy / assistance up to ₹2,50,000 for urban (PMAY-U 2.0)',
    benefitHighlightHindi: 'ग्रामीण क्षेत्रों में ₹1.20–₹1.30 लाख की सीधी सहायता और शहरी क्षेत्रों में ₹2.50 लाख तक की ब्याज सब्सिडी/सहायता',
    targetAudience: 'Homeless families and those living in kutcha or dilapidated houses across rural and urban India',
    targetAudienceHindi: 'बेघर परिवार तथा ग्रामीण व शहरी क्षेत्रों में कच्चे या जर्जर मकानों में रहने वाले नागरिक',
    officialPortal: 'https://pmay-urban.gov.in & https://pmayg.nic.in',
    officialDocTitle: 'PMAY-Urban 2.0 & PMAY-Gramin Operational Guidelines - MoHUA / MoRD',
    applicationMode: 'both',
    tags: ['housing', 'home', 'subsidy', 'pucca house', 'awas', 'pmay'],
    eligibility: {
      maxAnnualIncome: 900000,
      summary: 'The beneficiary family must not own a pucca house anywhere in India. For PMAY-Urban 2.0: EWS (income up to ₹3 lakh), LIG (income ₹3–6 lakh), and MIG (income ₹6–9 lakh). For PMAY-Gramin: verified through SECC 2011 and Awaas+ list.',
      summaryHindi: 'लाभार्थी परिवार के पास भारत में कहीं भी पक्का मकान नहीं होना चाहिए। शहरी योजना (PMAY-U 2.0) में ईडब्ल्यूएस (₹3 लाख तक आय), एलआईजी (₹3-6 लाख आय) और एमआईजी (₹6-9 लाख आय) पात्र हैं। ग्रामीण में आवास+ सूची से चयन होता है।',
      sourceSection: 'Section 2: Beneficiary Eligibility Criteria',
      sourcePage: 5
    },
    documents: [
      {
        name: 'Aadhaar Card of all family members',
        nameHindi: 'परिवार के सभी सदस्यों का आधार कार्ड',
        required: true,
        purpose: 'Identity verification and de-duplication check against housing database',
        purposeHindi: 'पहचान सत्यापन और यह जांचना कि पहले से आवास आवंटित तो नहीं है',
        sourcePage: 9,
        sourceSection: 'Section 4: Mandatory Documentation'
      },
      {
        name: 'Income Certificate / Salary Slip / ITR',
        nameHindi: 'आय प्रमाण पत्र / वेतन पर्ची',
        required: true,
        purpose: 'Classification into EWS, LIG, or MIG category',
        purposeHindi: 'ईडब्ल्यूएस, एलआईजी अथवा एमआईजी श्रेणी निर्धारण हेतु',
        sourcePage: 9,
        sourceSection: 'Section 4: Income Verification'
      },
      {
        name: 'Land Document / Registered Title / Patta',
        nameHindi: 'भूमि के कागजात / रजिस्ट्री / पट्टा',
        required: true,
        purpose: 'Proof of land ownership for beneficiary-led individual house construction (BLC)',
        purposeHindi: 'व्यक्तिगत आवास निर्माण हेतु भू-स्वामित्व का प्रमाण',
        sourcePage: 10,
        sourceSection: 'Section 4: Land Verification'
      },
      {
        name: 'Bank Passbook showing IFSC & Account No.',
        nameHindi: 'बैंक पासबुक (आईएफएससी और खाता संख्या)',
        required: true,
        purpose: 'Direct DBT payment linked with geo-tagged construction stages',
        purposeHindi: 'निर्माण के विभिन्न चरणों की जियो-टैगिंग के बाद सीधे खाते में भुगतान हेतु',
        sourcePage: 10,
        sourceSection: 'Section 4: Financial Disbursal'
      },
      {
        name: 'Affidavit of No Pucca House Owned',
        nameHindi: 'पक्का मकान न होने का शपथ पत्र',
        required: true,
        purpose: 'Declaration that no family member owns an all-weather dwelling unit in India',
        purposeHindi: 'यह घोषणा कि परिवार के किसी सदस्य के पास भारत में पक्का मकान नहीं है',
        sourcePage: 11,
        sourceSection: 'Section 4: Declaration'
      }
    ],
    benefits: [
      {
        title: 'Rural Housing Direct Grant (PMAY-G)',
        titleHindi: 'ग्रामीण आवास सीधी सहायता अनुदान',
        amountOrCoverage: '₹1,20,000 in plains and ₹1,30,000 in hilly/difficult states',
        frequency: 'Disbursed in 3 or 4 installments directly to bank account based on geo-tagged construction stages',
        frequencyHindi: 'निर्माण की प्रगति (जियो-टैगिंग) के आधार पर 3-4 किस्तों में सीधे खाते में'
      },
      {
        title: 'Interest Subsidy Scheme (PMAY-U 2.0 ISS)',
        titleHindi: 'ब्याज सब्सिडी योजना (शहरी 2.0)',
        amountOrCoverage: '4% interest subsidy on home loans up to ₹25 lakh for EWS/LIG/MIG families (net benefit up to ₹1.80 lakh)',
        frequency: 'Credited directly upfront to the home loan account via NHB/HUDCO',
        frequencyHindi: 'गृह ऋण खाते में सीधे अग्रिम रूप से जमा की जाती है'
      },
      {
        title: 'Toilet Construction Additional Grant',
        titleHindi: 'शौचालय निर्माण अतिरिक्त सहायता',
        amountOrCoverage: '₹12,000 via Swachh Bharat Mission convergence + 90-95 days of unskilled labor wage via MGNREGA',
        frequency: 'Added alongside housing unit construction',
        frequencyHindi: 'स्वच्छ भारत मिशन व मनरेगा के तहत अतिरिक्त सहायता'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Confirm Eligibility & Category',
        titleHindi: 'पात्रता व श्रेणी की पुष्टि करें',
        details: 'Verify that your family does not own a pucca house and check whether your income falls within EWS (up to ₹3L), LIG (₹3-6L), or MIG (₹6-9L).',
        detailsHindi: 'जांचें कि परिवार के पास पक्का मकान नहीं है और आय ईडब्ल्यूएस, एलआईजी या एमआईजी श्रेणी के अनुरूप है।'
      },
      {
        stepNumber: 2,
        title: 'Online Application on PMAY-U 2.0 Portal or CSC',
        titleHindi: 'पोर्टल या सीएससी के जरिए ऑनलाइन आवेदन',
        details: 'Go to pmay-urban.gov.in -> Citizen Assessment. Enter Aadhaar number and fill demographic, income, bank, and land details.',
        detailsHindi: 'pmay-urban.gov.in पर जाकर सिटिजन असेसमेंट में आधार दर्ज करें और व्यक्तिगत, आय तथा भू-विवरण भरें।'
      },
      {
        stepNumber: 3,
        title: 'Geo-tagging and Fund Disbursal',
        titleHindi: 'जियो-टैगिंग और किस्त भुगतान',
        details: 'Municipality or Gram Panchayat officials conduct geo-tagging of the vacant plot, plinth, lintel, and roof stages for installment releases.',
        detailsHindi: 'संबंधित अधिकारी नींव, छत आदि चरणों की जियो-टैगिंग करते हैं जिसके बाद किस्तों का भुगतान सीधे खाते में होता है।'
      }
    ],
    chunks: [
      {
        id: 'pmay-chunk-1',
        schemeId: 'pm-awas',
        schemeName: 'PMAY Housing',
        documentTitle: 'PMAY-Urban 2.0 & PMAY-Gramin Guidelines',
        section: 'Section 2: Eligibility Criteria',
        pageNumber: 5,
        content: 'A beneficiary family will comprise husband, wife, unmarried sons and/or unmarried daughters. An eligible family should not own a pucca house either in his/her name or in the name of any member of his/her family in any part of India. Under PMAY-U 2.0: EWS families having annual income up to ₹3,00,000; LIG families having annual income between ₹3,00,001 to ₹6,00,000; and MIG families having annual income between ₹6,00,001 to ₹9,00,000 are eligible for financial support and interest subsidy.',
        contentHindi: 'लाभार्थी परिवार में पति, पत्नी, अविवाहित पुत्र एवं अविवाहित पुत्रियां शामिल होंगी। परिवार के किसी भी सदस्य के नाम पर भारत में कहीं भी पक्का मकान नहीं होना चाहिए। PMAY-U 2.0 के तहत: ईडब्ल्यूएस (वार्षिक आय ₹3 लाख तक), एलआईजी (₹3 लाख से ₹6 लाख तक) और एमआईजी (₹6 लाख से ₹9 लाख तक) ब्याज सब्सिडी व अनुदान के पात्र हैं।',
        officialUrl: 'https://pmay-urban.gov.in',
        keywords: ['pmay', 'housing', 'pucca house', 'income limit', 'ews', 'lig', 'mig', 'subsidy', 'मकान', 'आवास', 'सब्सिडी', 'पक्का घर']
      },
      {
        id: 'pmay-chunk-2',
        schemeId: 'pm-awas',
        schemeName: 'PMAY Housing',
        documentTitle: 'PMAY-Urban 2.0 & PMAY-Gramin Guidelines',
        section: 'Section 4: Required Documents & Application Steps',
        pageNumber: 9,
        content: 'Mandatory documentation for PMAY: 1. Aadhaar Card of all family members. 2. Income certificate or self-declaration for EWS. 3. Land ownership documents/patta for individual house construction. 4. Bank passbook with IFSC code for DBT. 5. Notarized affidavit stating that applicant does not own any pucca house in India. The application can be submitted online via pmay-urban.gov.in or nearest Common Service Center (CSC).',
        contentHindi: 'पीएम आवास योजना के लिए आवश्यक दस्तावेज: 1. परिवार के सभी सदस्यों का आधार कार्ड। 2. आय प्रमाण पत्र। 3. जमीन के मालिकाना हक का दस्तावेज/पट्टा। 4. बैंक पासबुक। 5. पक्का मकान न होने का शपथ पत्र। आवेदन आधिकारिक पोर्टल या सीएससी केंद्र के माध्यम से किया जा सकता है।',
        officialUrl: 'https://pmay-urban.gov.in',
        keywords: ['documents', 'pmay documents', 'income certificate', 'patta', 'affidavit', 'dbt', 'दस्तावेज', 'आय प्रमाण पत्र', 'शपथ पत्र']
      }
    ]
  },
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    hindiName: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
    shortCode: 'PMMY',
    ministry: 'Ministry of Finance / Dept. of Financial Services (DFS)',
    ministryHindi: 'वित्त मंत्रालय / वित्तीय सेवाएं विभाग',
    category: 'employment',
    shortDescription: 'Collateral-free institutional business loans up to ₹20 Lakh for micro, small enterprises and entrepreneurs.',
    shortDescriptionHindi: 'सूक्ष्म, लघु उद्यमों और व्यवसायियों के लिए बिना किसी गारंटी (कोलैटरल) के ₹20 लाख तक का संस्थागत व्यापार ऋण।',
    benefitHighlight: 'Collateral-free micro loans: Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L), and Tarun Plus (₹10L-₹20L)',
    benefitHighlightHindi: 'बिना गारंटी ऋण: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), तरुण (₹5 लाख से ₹10 लाख) तथा तरुण प्लस (₹10 लाख से ₹20 लाख)',
    targetAudience: 'Non-corporate, non-farm small and micro enterprises, shopkeepers, traders, and artisans',
    targetAudienceHindi: 'गैर-कॉर्पोरेट, गैर-कृषि लघु और सूक्ष्म उद्यमी, दुकानदार, व्यापारी और कारीगर',
    officialPortal: 'https://www.mudra.org.in & https://www.udyamimitra.in',
    officialDocTitle: 'PMMY Operational Guidelines (Enhanced Limit 2024) - Dept. of Financial Services',
    applicationMode: 'both',
    tags: ['business', 'loan', 'entrepreneur', 'startup', 'collateral-free', 'mudra'],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      summary: 'Any Indian citizen who has a business plan for a non-farm sector income-generating activity such as manufacturing, processing, trading, or service sector, and whose credit requirement is up to ₹20 Lakh. No loan defaulter history in any financial institution.',
      summaryHindi: 'कोई भी भारतीय नागरिक जिसके पास विनिर्माण, प्रसंस्करण, व्यापार या सेवा क्षेत्र जैसी गैर-कृषि आय सृजन गतिविधि के लिए व्यावसायिक योजना है और ऋण आवश्यकता ₹20 लाख तक है। किसी बैंक का डिफाल्टर नहीं होना चाहिए।',
      sourceSection: 'Section 1: Scope & Eligibility Conditions',
      sourcePage: 3
    },
    documents: [
      {
        name: 'Identity Proof (Aadhaar / Voter ID / Passport)',
        nameHindi: 'पहचान का प्रमाण (आधार / वोटर आईडी / पासपोर्ट)',
        required: true,
        purpose: 'Identity and citizenship verification',
        purposeHindi: 'पहचान और नागरिकता सत्यापन',
        sourcePage: 7,
        sourceSection: 'Section 3: Standard Documentation Checklist'
      },
      {
        name: 'Proof of Residence (Electricity Bill / Aadhaar / Ration Card)',
        nameHindi: 'निवास का प्रमाण (बिजली बिल / आधार)',
        required: true,
        purpose: 'Residential address verification',
        purposeHindi: 'आवासीय पते का सत्यापन',
        sourcePage: 7,
        sourceSection: 'Section 3: Standard Documentation Checklist'
      },
      {
        name: 'Proof of Business Enterprise / Udyam Registration',
        nameHindi: 'व्यवसाय पंजीकरण प्रमाण / उद्यम रजिस्ट्रेशन',
        required: true,
        purpose: 'Verification of business existence and MSME Udyam certificate',
        purposeHindi: 'व्यवसाय की निरंतरता और एमएसएमई उद्यम पंजीकरण प्रमाण',
        sourcePage: 8,
        sourceSection: 'Section 3: Business Documentation'
      },
      {
        name: 'Last 6 Months Bank Statement',
        nameHindi: 'पिछले 6 महीने का बैंक स्टेटमेंट',
        required: true,
        purpose: 'Assessing banking turnover and financial conduct',
        purposeHindi: 'वित्तीय लेन-देन और टर्नओवर का मूल्यांकन करने के लिए',
        sourcePage: 8,
        sourceSection: 'Section 3: Financial Records'
      },
      {
        name: 'Project Report / Business Quotation',
        nameHindi: 'प्रोजेक्ट रिपोर्ट / मशीनरी कोटेशन',
        required: true,
        purpose: 'Details of equipment, machinery or working capital requirement',
        purposeHindi: 'मशीनरी, उपकरण या कार्यशील पूंजी की आवश्यकता का विवरण',
        sourcePage: 8,
        sourceSection: 'Section 3: Project Feasibility'
      }
    ],
    benefits: [
      {
        title: 'Shishu Category Loan',
        titleHindi: 'शिशु श्रेणी ऋण',
        amountOrCoverage: 'Loans up to ₹50,000 for seed stage / new micro ventures',
        frequency: 'Repayment period 3 to 5 years; zero processing fee',
        frequencyHindi: '₹50,000 तक का ऋण, 3 से 5 वर्ष की चुकौती अवधि, शून्य प्रोसेसिंग शुल्क'
      },
      {
        title: 'Kishore Category Loan',
        titleHindi: 'किशोर श्रेणी ऋण',
        amountOrCoverage: 'Loans from ₹50,001 up to ₹5,00,000 for establishing existing business',
        frequency: 'Repayment period up to 5 years',
        frequencyHindi: '₹50,001 से ₹5,00,000 तक का ऋण'
      },
      {
        title: 'Tarun & Tarun Plus Category Loan',
        titleHindi: 'तरुण एवं तरुण प्लस श्रेणी ऋण',
        amountOrCoverage: 'Loans from ₹5,00,001 up to ₹20,00,000 (limit raised in Union Budget 2024 for entrepreneurs who repaid earlier loans)',
        frequency: 'Repayment period up to 7 years with MUDRA Card overdraft facility',
        frequencyHindi: '₹20 लाख तक का ऋण (बजट 2024 में पूर्व ऋण चुकाने वाले उद्यमियों हेतु सीमा बढ़ाई गई)'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Prepare Business Proposal and Choose Category',
        titleHindi: 'व्यापार प्रस्ताव तैयार करें और श्रेणी चुनें',
        details: 'Draft your project report detailing equipment cost, working capital requirement, and identify category (Shishu, Kishore, or Tarun).',
        detailsHindi: 'प्रोजेक्ट रिपोर्ट तैयार करें और अपनी आवश्यकता अनुसार शिशु, किशोर या तरुण श्रेणी चुनें।'
      },
      {
        stepNumber: 2,
        title: 'Apply on Udyamimitra Portal or Visit Bank Branch',
        titleHindi: 'उद्यमी मित्र पोर्टल पर आवेदन करें या बैंक शाखा जाएं',
        details: 'Apply online at udyamimitra.in or approach any commercial bank, RRB, Small Finance Bank, or MFI with MUDRA application form.',
        detailsHindi: 'udyamimitra.in पर ऑनलाइन आवेदन करें अथवा किसी भी वाणिज्यिक बैंक, ग्रामीण बैंक या वित्तीय संस्थान में जाएं।'
      },
      {
        stepNumber: 3,
        title: 'Document Verification & Loan Sanction',
        titleHindi: 'दस्तावेज सत्यापन और ऋण स्वीकृति',
        details: 'Bank assesses credit feasibility and sanctions loan without requiring collateral or third-party guarantee.',
        detailsHindi: 'बैंक बिना किसी संपत्ति को गिरवी रखे (कोलैटरल-फ्री) ऋण स्वीकृत करता है।'
      }
    ],
    chunks: [
      {
        id: 'mudra-chunk-1',
        schemeId: 'pm-mudra',
        schemeName: 'PMMY Mudra',
        documentTitle: 'PMMY Operational Guidelines (Enhanced 2024) - DFS',
        section: 'Section 1: Loan Categories and Enhanced Limits',
        pageNumber: 3,
        content: 'Pradhan Mantri Mudra Yojana (PMMY) provides collateral-free institutional credit to non-farm micro and small enterprises. The loan categories are: 1. Shishu: covering loans up to ₹50,000. 2. Kishore: covering loans above ₹50,000 and up to ₹5,00,000. 3. Tarun: covering loans above ₹5,00,000 and up to ₹10,00,000. 4. Tarun Plus: enhanced limit up to ₹20,00,000 for entrepreneurs who have previously availed and successfully repaid loans under the Tarun category. No collateral security or third-party guarantee is required.',
        contentHindi: 'पीएम मुद्रा योजना सूक्ष्म व लघु उद्यमों को बिना गारंटी ऋण प्रदान करती है: 1. शिशु: ₹50,000 तक। 2. किशोर: ₹50,000 से ₹5 लाख तक। 3. तरुण: ₹5 लाख से ₹10 लाख तक। 4. तरुण प्लस: उन उद्यमियों के लिए ₹20 लाख तक जिन्होंने पूर्व तरुण ऋण का सफलतापूर्वक भुगतान किया है। किसी गारंटी/कोलैटरल की आवश्यकता नहीं है।',
        officialUrl: 'https://www.mudra.org.in',
        keywords: ['mudra', 'loan', 'shishu', 'kishore', 'tarun', '20 lakh', 'collateral free', 'business', 'मुद्रा', 'ऋण', 'लोन', 'बिना गारंटी']
      },
      {
        id: 'mudra-chunk-2',
        schemeId: 'pm-mudra',
        schemeName: 'PMMY Mudra',
        documentTitle: 'PMMY Operational Guidelines (Enhanced 2024) - DFS',
        section: 'Section 3: Documents and Application Process',
        pageNumber: 7,
        content: 'Required documents for PMMY loan: 1. Proof of identity (Aadhaar Card, Voter ID, PAN). 2. Proof of residence (Electricity bill, Aadhaar, Ration Card). 3. Applicant’s recent photographs (2 copies). 4. Quotation of machinery/equipment or items to be purchased. 5. Proof of business identity/address (Udyam Registration Certificate, trade license). 6. Bank statements for past 6 months. There is no processing fee for Shishu loans.',
        contentHindi: 'मुद्रा ऋण हेतु आवश्यक दस्तावेज: 1. पहचान पत्र (आधार, पैन, वोटर आईडी)। 2. निवास प्रमाण। 3. पासपोर्ट साइज फोटो। 4. खरीदी जाने वाली मशीनरी/सामान का कोटेशन। 5. व्यवसाय का प्रमाण (उद्यम रजिस्ट्रेशन प्रमाण पत्र)। 6. पिछले 6 माह का बैंक खाता विवरण। शिशु श्रेणी में कोई प्रोसेसिंग शुल्क नहीं लगता।',
        officialUrl: 'https://www.mudra.org.in',
        keywords: ['documents', 'mudra documents', 'udyam', 'bank statement', 'quotation', 'pan card', 'दस्तावेज', 'उद्यम रजिस्ट्रेशन', 'बैंक स्टेटमेंट']
      }
    ]
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    hindiName: 'सुकन्या समृद्धि योजना (एसएसवाई)',
    shortCode: 'SSY',
    ministry: 'Ministry of Finance & Ministry of Women and Child Development',
    ministryHindi: 'वित्त मंत्रालय एवं महिला एवं बाल विकास मंत्रालय',
    category: 'women_child',
    shortDescription: 'High-interest government savings scheme for girl children offering tax-free returns and guaranteed maturity corpus.',
    shortDescriptionHindi: 'बालिकाओं के लिए उच्च ब्याज वाली सरकारी बचत योजना, जो कर-मुक्त रिटर्न और परिपक्वता पर सुरक्षित धनराशि प्रदान करती है।',
    benefitHighlight: 'High sovereign-backed interest rate (8.2% p.a.) with triple tax exemption (EEE) under Section 80C',
    benefitHighlightHindi: 'सर्वोच्च सरकारी ब्याज दर (8.2% वार्षिक) और धारा 80सी के तहत पूर्ण कर छूट (EEE)',
    targetAudience: 'Parents/legal guardians of girl children aged below 10 years',
    targetAudienceHindi: '10 वर्ष से कम आयु की बालिकाओं के माता-पिता या कानूनी अभिभावक',
    officialPortal: 'https://www.indiapost.gov.in',
    officialDocTitle: 'Government Savings Promotion Act - Sukanya Samriddhi Account Rules',
    applicationMode: 'both',
    tags: ['girl child', 'savings', 'interest', 'education', 'marriage', 'tax free', 'sukanya'],
    eligibility: {
      maxAge: 10,
      gender: 'female',
      summary: 'The account can be opened by the natural or legal guardian in the name of a girl child from her birth till she attains the age of 10 years. Maximum of 2 girl children per family (allowed for triplets/twins with medical certificate).',
      summaryHindi: 'लड़की के जन्म से लेकर 10 वर्ष की आयु प्राप्त करने तक माता-पिता या कानूनी अभिभावक द्वारा खाता खोला जा सकता है। एक परिवार में अधिकतम 2 बालिकाओं के लिए (जुड़वां/तिड़वां होने पर विशेष छूट)।',
      sourceSection: 'Rule 3: Account Opening Eligibility',
      sourcePage: 2
    },
    documents: [
      {
        name: 'Birth Certificate of the Girl Child (Mandatory)',
        nameHindi: 'बालिका का जन्म प्रमाण पत्र (अनिवार्य)',
        required: true,
        purpose: 'Proof of age and parentage issued by Municipal authority or Hospital',
        purposeHindi: 'आयु और माता-पिता का प्रमाणित प्रमाण',
        sourcePage: 4,
        sourceSection: 'Rule 4: Mandatory Documents'
      },
      {
        name: 'Identity & Address Proof of Guardian (Aadhaar / PAN)',
        nameHindi: 'अभिभावक का पहचान व निवास प्रमाण (आधार / पैन)',
        required: true,
        purpose: 'Guardian KYC verification as per Post Office / Bank rules',
        purposeHindi: 'डाकघर या बैंक नियमों के अनुसार अभिभावक का केवाईसी',
        sourcePage: 4,
        sourceSection: 'Rule 4: KYC Verification'
      },
      {
        name: 'Passport Size Photographs of Guardian & Child',
        nameHindi: 'अभिभावक व बालिका की पासपोर्ट साइज फोटो',
        required: true,
        purpose: 'Affixing on the account opening form and passbook',
        purposeHindi: 'खाता खोलने के फॉर्म और पासबुक पर लगाने हेतु',
        sourcePage: 5,
        sourceSection: 'Rule 4: Passbook Documentation'
      }
    ],
    benefits: [
      {
        title: 'High Guaranteed Sovereign Interest',
        titleHindi: 'उच्च गारंटीकृत सरकारी ब्याज',
        amountOrCoverage: 'Currently 8.2% per annum, compounded annually',
        frequency: 'Compounded annually and credited every financial year',
        frequencyHindi: 'वार्षिक चक्रवृद्धि आधार पर गणना और वित्तीय वर्ष में क्रेडिट'
      },
      {
        title: 'Triple Tax Exemption (EEE)',
        titleHindi: 'पूर्ण कर छूट (EEE दर्जा)',
        amountOrCoverage: 'Tax deduction under Section 80C up to ₹1.5 Lakh; interest and maturity amount are 100% tax-free',
        frequency: 'Applicable every tax assessment year',
        frequencyHindi: 'निवेश, ब्याज और परिपक्वता राशि पूरी तरह कर-मुक्त'
      },
      {
        title: 'Partial Withdrawal for Higher Education',
        titleHindi: 'उच्च शिक्षा हेतु आंशिक निकासी',
        amountOrCoverage: 'Up to 50% of the balance at preceding financial year once the girl turns 18 or passes Class 10',
        frequency: 'Available in single installment or 5 yearly installments',
        frequencyHindi: '18 वर्ष की आयु या 10वीं कक्षा उत्तीर्ण करने के बाद उपलब्ध'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Post Office or Designated Bank',
        titleHindi: 'डाकघर या अधिकृत बैंक शाखा जाएं',
        details: 'Collect Form-1 (Sukanya Samriddhi Account Opening Form) from any Post Office, SBI, PNB, or authorized nationalized/private bank.',
        detailsHindi: 'किसी भी डाकघर या अधिकृत बैंक शाखा (जैसे एसबीआई, पीएनबी) से फॉर्म-1 प्राप्त करें।'
      },
      {
        stepNumber: 2,
        title: 'Attach Documents and Initial Deposit',
        titleHindi: 'दस्तावेज और प्रारंभिक जमा राशि संलग्न करें',
        details: 'Attach girl child’s birth certificate, guardian’s Aadhaar and PAN, and deposit minimum ₹250 (max ₹1.5 lakh per year).',
        detailsHindi: 'जन्म प्रमाण पत्र, अभिभावक का आधार व पैन लगाएं और न्यूनतम ₹250 जमा करें।'
      },
      {
        stepNumber: 3,
        title: 'Collect Passbook',
        titleHindi: 'पासबुक प्राप्त करें',
        details: 'Post office or bank issues a physical passbook carrying account number, child name, date of birth, and maturity date (21 years from opening).',
        detailsHindi: 'खाता संख्या, बालिका के नाम और परिपक्वता तिथि वाली पासबुक प्राप्त करें।'
      }
    ],
    chunks: [
      {
        id: 'ssy-chunk-1',
        schemeId: 'sukanya-samriddhi',
        schemeName: 'Sukanya Samriddhi Yojana',
        documentTitle: 'Sukanya Samriddhi Account Rules - Ministry of Finance',
        section: 'Rule 3 & 4: Eligibility & Deposit Limits',
        pageNumber: 2,
        content: 'An account can be opened by the natural or legal guardian in the name of a girl child who is below the age of 10 years on the date of opening. Only one account can be opened for one girl child, and a maximum of two accounts in a family. Minimum initial deposit is ₹250, and subsequent deposits in multiples of ₹50. Maximum deposit in a financial year is ₹1,50,000. Deposits can be made for a period of 15 years from the date of opening. The account matures after completion of 21 years from opening date or upon marriage after age 18.',
        contentHindi: 'खाता बालिका के 10 वर्ष की आयु प्राप्त करने से पूर्व खोला जा सकता है। एक बालिका के नाम पर केवल एक खाता और एक परिवार में अधिकतम दो खाते खुल सकते हैं। न्यूनतम वार्षिक जमा ₹250 तथा अधिकतम ₹1,50,000 है। खाता खोलने की तिथि से 15 वर्षों तक राशि जमा की जा सकती है। खाता 21 वर्ष बाद या 18 वर्ष की आयु के बाद विवाह पर परिपक्व होता है।',
        officialUrl: 'https://www.indiapost.gov.in',
        keywords: ['sukanya', 'girl child', 'age limit 10', 'deposit 250', '1.5 lakh', 'interest 8.2', 'tax free', 'सुकन्या', 'बेटी', 'ब्याज', 'कर मुक्त']
      },
      {
        id: 'ssy-chunk-2',
        schemeId: 'sukanya-samriddhi',
        schemeName: 'Sukanya Samriddhi Yojana',
        documentTitle: 'Sukanya Samriddhi Account Rules - Ministry of Finance',
        section: 'Rule 5: Documents Required for Account Opening',
        pageNumber: 4,
        content: 'Documents required to open Sukanya Samriddhi Account: 1. Birth Certificate of the girl child issued by the competent government authority (Municipality, Gram Panchayat, or Registrar of Births). 2. Identity and Address proof of the depositor/guardian (Aadhaar Card, Passport, Voter ID, Driving License). 3. PAN card of the guardian. 4. Passport photographs of child and guardian. 5. Medical certificate in case of twins or triplets born in the second order.',
        contentHindi: 'सुकन्या खाता खोलने हेतु आवश्यक दस्तावेज: 1. बालिका का सक्षम प्राधिकारी द्वारा जारी जन्म प्रमाण पत्र। 2. अभिभावक का पहचान एवं पता प्रमाण (आधार, पैन कार्ड)। 3. अभिभावक और बालिका की पासपोर्ट साइज फोटो। 4. दूसरे प्रसव में जुड़वां बेटियां होने की स्थिति में चिकित्सा प्रमाण पत्र।',
        officialUrl: 'https://www.indiapost.gov.in',
        keywords: ['documents', 'sukanya documents', 'birth certificate', 'aadhaar', 'guardian kyc', 'दस्तावेज', 'जन्म प्रमाण पत्र', 'अभिभावक']
      }
    ]
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    hindiName: 'पीएम विश्वकर्मा योजना',
    shortCode: 'PM-VISHWAKARMA',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    ministryHindi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय (एमएसएमई)',
    category: 'employment',
    shortDescription: 'Comprehensive financial, skilling, and toolkit incentive scheme for 18 traditional trade artisans and craftspeople.',
    shortDescriptionHindi: '18 पारंपरिक शिल्पों और दस्तकारों के लिए कौशल प्रशिक्षण, ₹15,000 टूलकिट अनुदान और ₹3 लाख तक का सस्ता ऋण।',
    benefitHighlight: 'Free skill training with ₹500/day stipend, ₹15,000 toolkit grant, and collateral-free loan up to ₹3,00,000 at 5% interest',
    benefitHighlightHindi: 'निःशुल्क प्रशिक्षण + ₹500/दिन वजीफा, ₹15,000 टूलकिट ग्रांट और मात्र 5% ब्याज पर ₹3 लाख तक बिना गारंटी ऋण',
    targetAudience: 'Traditional artisans and craftspeople engaged in 18 specified trades using hands and tools',
    targetAudienceHindi: '18 पारंपरिक व्यवसायों में अपने हाथों और औजारों से कार्य करने वाले कारीगर व दस्तकार',
    officialPortal: 'https://pmvishwakarma.gov.in',
    officialDocTitle: 'PM Vishwakarma Scheme Operational Guidelines - Ministry of MSME',
    applicationMode: 'both',
    tags: ['artisan', 'craftsperson', 'carpenter', 'blacksmith', 'toolkit', 'vishwakarma'],
    eligibility: {
      minAge: 18,
      targetCategories: ['Artisan', 'Craftsperson'],
      summary: 'An artisan or craftsperson working with hands and tools in one of the 18 traditional family trades (Carpenter, Blacksmith, Potter, Mason, Barber, Tailor, Cobbler, etc.). Minimum age is 18 years. Only one member of the family can avail the benefits. Beneficiary must not have active loans under PMEGP or Mudra.',
      summaryHindi: '18 पारंपरिक ट्रेडों (जैसे बढ़ई, लोहार, कुम्हार, राजमिस्त्री, नाई, दर्जी, मोची आदि) में हाथों और औजारों से काम करने वाले कारीगर। न्यूनतम आयु 18 वर्ष। परिवार का केवल एक सदस्य पात्र होगा।',
      sourceSection: 'Chapter 2: Eligibility Criteria & Covered Trades',
      sourcePage: 4
    },
    documents: [
      {
        name: 'Aadhaar Card (Mandatory biometric auth)',
        nameHindi: 'आधार कार्ड (बायोमेट्रिक प्रमाणीकरण अनिवार्य)',
        required: true,
        purpose: 'Identity verification and biometric registration at CSC',
        purposeHindi: 'सीएससी पर बायोमेट्रिक पंजीकरण और पहचान सत्यापन',
        sourcePage: 8,
        sourceSection: 'Chapter 4: Enrolment Verification'
      },
      {
        name: 'Bank Passbook / Account seeded with Aadhaar',
        nameHindi: 'बैंक पासबुक / आधार से लिंक खाता',
        required: true,
        purpose: 'Direct disbursement of training stipend (₹500/day) and toolkit e-Voucher',
        purposeHindi: 'प्रशिक्षण वजीफा (₹500/दिन) और टूलकिट ई-वाउचर प्राप्त करने हेतु',
        sourcePage: 8,
        sourceSection: 'Chapter 4: Financial Disbursal'
      },
      {
        name: 'Active Mobile Number',
        nameHindi: 'सक्रिय मोबाइल नंबर',
        required: true,
        purpose: 'Receiving PM Vishwakarma digital ID and OTP authentication',
        purposeHindi: 'डिजिटल आईडी और ओटीपी प्रमाणीकरण के लिए',
        sourcePage: 9,
        sourceSection: 'Chapter 4: Digital ID'
      },
      {
        name: 'Ration Card (For family verification)',
        nameHindi: 'राशन कार्ड (परिवार सत्यापन हेतु)',
        required: false,
        purpose: 'Verifying that only one family member avails scheme benefits',
        purposeHindi: 'यह सुनिश्चित करने के लिए कि परिवार का एक ही सदस्य लाभ ले रहा है',
        sourcePage: 9,
        sourceSection: 'Chapter 4: De-duplication'
      }
    ],
    benefits: [
      {
        title: 'PM Vishwakarma Certificate & ID Card',
        titleHindi: 'पीएम विश्वकर्मा प्रमाण पत्र और आईडी कार्ड',
        amountOrCoverage: 'Official national recognition as a certified artisan',
        frequency: 'Lifetime validity upon biometric verification',
        frequencyHindi: 'सत्यापन के बाद आजीवन मान्य'
      },
      {
        title: 'Skill Upgradation & Daily Stipend',
        titleHindi: 'कौशल उन्नयन एवं दैनिक वजीफा',
        amountOrCoverage: 'Basic training (5-7 days) & Advanced training (15 days) with ₹500 per day stipend',
        frequency: 'During training period',
        frequencyHindi: 'प्रशिक्षण के दौरान ₹500 प्रति दिन'
      },
      {
        title: 'Toolkit Incentive e-Voucher',
        titleHindi: 'टूलकिट प्रोत्साहन ई-वाउचर',
        amountOrCoverage: '₹15,000 digital e-RUPI voucher to purchase modern trade tools',
        frequency: 'One-time incentive upon completing basic training',
        frequencyHindi: 'बुनियादी प्रशिक्षण पूरा करने पर एकमुश्त ₹15,000'
      },
      {
        title: 'Concessional Enterprise Loan',
        titleHindi: 'रियायती व्यापार ऋण',
        amountOrCoverage: 'Tranche 1: Up to ₹1,00,000 (18 months); Tranche 2: Up to ₹2,00,000 (30 months) at 5% interest rate with 8% MoMSME subvention',
        frequency: 'Collateral-free, credit-guarantee covered by CGTMSE',
        frequencyHindi: 'बिना गारंटी 5% की रियायती ब्याज दर पर'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Common Service Center (CSC)',
        titleHindi: 'कॉमन सर्विस सेंटर (सीएससी) पर जाएं',
        details: 'Artisan visits CSC center with Aadhaar card, mobile phone, and bank passbook. CSC operator conducts biometric authentication.',
        detailsHindi: 'कारीगर आधार, मोबाइल और बैंक पासबुक लेकर सीएससी केंद्र जाएं, जहां बायोमेट्रिक सत्यापन किया जाता है।'
      },
      {
        stepNumber: 2,
        title: 'Three-tier Verification Process',
        titleHindi: 'तीन-स्तरीय सत्यापन प्रक्रिया',
        details: 'Application is verified first by Gram Panchayat head / Urban Local Body executive, second by District Implementation Committee, and third by State Screening Committee.',
        detailsHindi: 'ग्राम प्रधान/नगर निकाय, जिला कार्यान्वयन समिति और राज्य स्क्रीनिंग समिति द्वारा सत्यापन किया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Attend Training and Receive Benefits',
        titleHindi: 'प्रशिक्षण लें और लाभ प्राप्त करें',
        details: 'Complete 5-day basic training, receive ₹15,000 toolkit voucher, Vishwakarma ID card, and apply for first tranche loan.',
        detailsHindi: '5 दिवसीय प्रशिक्षण पूरा करें, ₹15,000 का टूलकिट वाउचर और पहचान पत्र प्राप्त करें तथा ऋण हेतु आवेदन करें।'
      }
    ],
    chunks: [
      {
        id: 'vish-chunk-1',
        schemeId: 'pm-vishwakarma',
        schemeName: 'PM Vishwakarma',
        documentTitle: 'PM Vishwakarma Guidelines - Ministry of MSME',
        section: 'Chapter 2: Eligible 18 Traditional Trades',
        pageNumber: 4,
        content: 'PM Vishwakarma covers artisans working in 18 traditional trades: (1) Carpenter (Suthar), (2) Boat Maker, (3) Armorer, (4) Blacksmith (Lohar), (5) Hammer and Tool Kit Maker, (6) Locksmith, (7) Sculptor (Moortikar/Stone carver), (8) Goldsmith (Sonar), (9) Potter (Kumhaar), (10) Cobbler (Mochi/Shoemaker), (11) Mason (Rajmistri), (12) Basket/Mat/Broom Maker/Coir Weaver, (13) Doll & Toy Maker (Traditional), (14) Barber (Naai), (15) Garland maker (Malakaar), (16) Washerman (Dhobi), (17) Tailor (Darzi), and (18) Fishing Net Maker. Minimum age is 18 years.',
        contentHindi: 'पीएम विश्वकर्मा योजना में 18 पारंपरिक ट्रेड शामिल हैं: (1) बढ़ई, (2) नाव निर्माता, (3) अस्त्रकार, (4) लोहार, (5) हथौड़ा व टूलकिट निर्माता, (6) ताला बनाने वाले, (7) मूर्तिकार, (8) सुनार, (9) कुम्हार, (10) मोची, (11) राजमिस्त्री, (12) टोकरी/चटाई निर्माता, (13) गुड़िया व खिलौना निर्माता, (14) नाई, (15) मालाकार, (16) धोबी, (17) दर्जी, और (18) मछली का जाल बनाने वाले। न्यूनतम आयु 18 वर्ष है।',
        officialUrl: 'https://pmvishwakarma.gov.in',
        keywords: ['vishwakarma', 'artisan', '18 trades', 'carpenter', 'blacksmith', 'potter', 'tailor', 'barber', 'कारीगर', 'बढ़ई', 'लोहार', 'दर्जी', 'कुम्हार']
      },
      {
        id: 'vish-chunk-2',
        schemeId: 'pm-vishwakarma',
        schemeName: 'PM Vishwakarma',
        documentTitle: 'PM Vishwakarma Guidelines - Ministry of MSME',
        section: 'Chapter 3: Benefits and Toolkit Incentive',
        pageNumber: 6,
        content: 'Benefits under PM Vishwakarma: 1. PM Vishwakarma Certificate and ID Card. 2. Skill verification followed by 5-7 days basic skill training with a stipend of ₹500 per day. 3. Modern Toolkit Incentive: A toolkit incentive of ₹15,000 provided via e-RUPI digital voucher upon commencement of basic training. 4. Enterprise Credit Support: Collateral-free enterprise development loan of up to ₹1,00,000 (Tranche 1 for 18 months) and ₹2,00,000 (Tranche 2 for 30 months) at a concessional interest rate of 5%, with 8% interest subvention by the Ministry of MSME.',
        contentHindi: 'योजना के मुख्य लाभ: 1. प्रमाण पत्र और पहचान पत्र। 2. 5-7 दिवसीय बुनियादी प्रशिक्षण तथा ₹500 प्रतिदिन वजीफा। 3. टूलकिट प्रोत्साहन: आधुनिक औजार खरीदने हेतु ₹15,000 का ई-रूपी डिजिटल वाउचर। 4. ऋण सहायता: बिना किसी गारंटी के 5% ब्याज दर पर प्रथम किस्त में ₹1 लाख और द्वितीय किस्त में ₹2 लाख तक का ऋण।',
        officialUrl: 'https://pmvishwakarma.gov.in',
        keywords: ['benefits', 'toolkit 15000', 'stipend 500', 'loan 3 lakh', '5 percent interest', 'टूलकिट', 'वाउचर', 'वजीफा', 'सस्ता ऋण']
      }
    ]
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    hindiName: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
    shortCode: 'PM-SURYA-GHAR',
    ministry: 'Ministry of New and Renewable Energy (MNRE)',
    ministryHindi: 'नवीन और नवीकरणीय ऊर्जा मंत्रालय',
    category: 'energy',
    shortDescription: 'Rooftop solar subsidy providing up to ₹78,000 financial support and 300 units of free electricity every month.',
    shortDescriptionHindi: 'छत पर सोलर पैनल लगाने के लिए ₹78,000 तक की सीधी सरकारी सब्सिडी और प्रतिमाह 300 यूनिट तक मुफ्त बिजली।',
    benefitHighlight: 'Direct Central Government subsidy up to ₹78,000 for residential rooftop solar systems up to 3 kW',
    benefitHighlightHindi: '3 किलोवाट तक के रूफटॉप सोलर सिस्टम के लिए ₹78,000 तक की केंद्रीय सब्सिडी',
    targetAudience: 'Residential households with suitable roof space and a grid-connected electricity connection',
    targetAudienceHindi: 'उपयुक्त छत वाले आवासीय परिवार जिनके पास वैध घरेलू बिजली कनेक्शन है',
    officialPortal: 'https://pmsuryaghar.gov.in',
    officialDocTitle: 'PM Surya Ghar Scheme Implementation Guidelines - Ministry of New & Renewable Energy',
    applicationMode: 'online',
    tags: ['solar', 'electricity', 'free power', 'green energy', 'subsidy', 'surya ghar'],
    eligibility: {
      summary: 'Any Indian residential household owning a house with suitable roof space and having a valid domestic electricity connection in their name from the local DISCOM. Beneficiary must not have received prior central rooftop solar subsidy.',
      summaryHindi: 'कोई भी भारतीय आवासीय परिवार जिसके पास घर की छत पर पर्याप्त जगह है और स्थानीय बिजली कंपनी (डिस्कॉम) का वैध घरेलू बिजली कनेक्शन है।',
      sourceSection: 'Section 3: Eligibility of Households',
      sourcePage: 3
    },
    documents: [
      {
        name: 'Recent Electricity Bill (Last 6 months)',
        nameHindi: 'हालिया बिजली बिल (पिछले 6 माह का)',
        required: true,
        purpose: 'Consumer number, CA number, sanctioned load and DISCOM verification',
        purposeHindi: 'उपभोक्ता संख्या, स्वीकृत लोड और डिस्कॉम सत्यापन हेतु',
        sourcePage: 5,
        sourceSection: 'Section 4: Application Requirements'
      },
      {
        name: 'Aadhaar Card of Electricity Connection Holder',
        nameHindi: 'बिजली कनेक्शन धारक का आधार कार्ड',
        required: true,
        purpose: 'Identity verification and subsidy bank account validation',
        purposeHindi: 'पहचान सत्यापन और सब्सिडी बैंक खाता प्रमाणीकरण',
        sourcePage: 5,
        sourceSection: 'Section 4: Application Requirements'
      },
      {
        name: 'Bank Account Passbook / Cancelled Cheque',
        nameHindi: 'बैंक पासबुक / रद्द किया गया चेक',
        required: true,
        purpose: 'Direct subsidy transfer from National Portal to consumer account',
        purposeHindi: 'राष्ट्रीय पोर्टल से सीधे उपभोक्ता के खाते में सब्सिडी भेजने हेतु',
        sourcePage: 6,
        sourceSection: 'Section 4: Bank Details'
      },
      {
        name: 'Photograph of Roof showing Solar Feasibility',
        nameHindi: 'छत का फोटो (सोलर पैनल की जगह दर्शाने हेतु)',
        required: false,
        purpose: 'Vendor technical feasibility assessment',
        purposeHindi: 'तकनीकी व्यवहार्यता और छाया-मुक्त स्थान जांचने के लिए',
        sourcePage: 6,
        sourceSection: 'Section 4: Site Feasibility'
      }
    ],
    benefits: [
      {
        title: 'Central Government Capital Subsidy',
        titleHindi: 'केंद्रीय सरकारी पूंजी सब्सिडी',
        amountOrCoverage: '₹30,000 for 1 kW system; ₹60,000 for 2 kW system; ₹78,000 for 3 kW and higher systems',
        frequency: 'Directly credited into bank account within 30 days of net-meter commissioning',
        frequencyHindi: 'नेट-मीटर कमीशनिंग के 30 दिनों के भीतर सीधे बैंक खाते में जमा'
      },
      {
        title: '300 Units Free Solar Electricity per Month',
        titleHindi: 'प्रतिमाह 300 यूनिट तक मुफ्त सौर बिजली',
        amountOrCoverage: 'Drastic reduction in monthly electricity bills with surplus power fed back into grid',
        frequency: 'Continuous monthly savings over 25 years warranty life',
        frequencyHindi: '25 वर्षों तक मासिक बिजली बिल में बचत व अतिरिक्त बिजली ग्रिड को बेचने की सुविधा'
      },
      {
        title: 'Collateral-free Concessional Bank Loans',
        titleHindi: 'बिना गारंटी रियायती बैंक ऋण',
        amountOrCoverage: 'Collateral-free solar loans at ~7% interest rate from nationalized banks through JanSamarth portal',
        frequency: 'Tenure up to 10 years',
        frequencyHindi: 'जनसमर्थ पोर्टल के माध्यम से 10 वर्ष तक की अवधि के लिए'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Register on National Portal',
        titleHindi: 'राष्ट्रीय पोर्टल पर पंजीकरण करें',
        details: 'Visit pmsuryaghar.gov.in. Select State, Electricity Distribution Company (DISCOM), enter Consumer Account Number and Mobile.',
        detailsHindi: 'pmsuryaghar.gov.in पर जाएं। राज्य, बिजली वितरण कंपनी (डिस्कॉम) और उपभोक्ता खाता संख्या दर्ज करें।'
      },
      {
        stepNumber: 2,
        title: 'Select Empaneled Solar Vendor',
        titleHindi: 'सूचीबद्ध सोलर विक्रेता का चयन करें',
        details: 'Apply for Rooftop Solar and choose an MNRE-empaneled registered vendor for installation of DCR-compliant solar modules.',
        detailsHindi: 'रूफटॉप सोलर के लिए आवेदन करें और अपने क्षेत्र के अनुमोदित विक्रेता का चयन करें।'
      },
      {
        stepNumber: 3,
        title: 'Net-meter Installation & Direct Subsidy Disbursal',
        titleHindi: 'नेट-मीटर स्थापना और सब्सिडी भुगतान',
        details: 'DISCOM inspects setup and installs bidirectional net-meter. Commissioning report generated on portal triggers ₹78,000 subsidy into bank account.',
        detailsHindi: 'डिस्कॉम नेट-मीटर स्थापित करेगा। कमीशनिंग रिपोर्ट अपलोड होते ही सब्सिडी सीधे बैंक खाते में भेज दी जाती है।'
      }
    ],
    chunks: [
      {
        id: 'surya-chunk-1',
        schemeId: 'pm-surya-ghar',
        schemeName: 'PM Surya Ghar',
        documentTitle: 'PM Surya Ghar Operational Guidelines - MNRE',
        section: 'Section 2: Subsidy Structure and Capacity Matrix',
        pageNumber: 2,
        content: 'Under PM Surya Ghar: Muft Bijli Yojana, financial assistance is structured as follows for residential households: (a) For 1 kW capacity system: ₹30,000 subsidy; (b) For 2 kW capacity system: ₹60,000 subsidy; (c) For 3 kW capacity and above: maximum subsidy of ₹78,000. For Group Housing Societies / Residential Welfare Associations (GHS/RWA), CFA of ₹18,000 per kW is available for common facilities up to 500 kW.',
        contentHindi: 'पीएम सूर्य घर मुफ्त बिजली योजना के अंतर्गत आवासीय परिवारों को निम्नलिखित सब्सिडी दी जाती है: (क) 1 किलोवाट सिस्टम पर ₹30,000 सब्सिडी; (ख) 2 किलोवाट सिस्टम पर ₹60,000 सब्सिडी; (ग) 3 किलोवाट या उससे अधिक क्षमता पर अधिकतम ₹78,000 सब्सिडी। सोसायटियों के लिए ₹18,000 प्रति किलोवाट की दर से उपलब्ध है।',
        officialUrl: 'https://pmsuryaghar.gov.in',
        keywords: ['solar', 'surya ghar', 'subsidy', '78000', '30000', '60000', 'rooftop', 'free electricity', '300 units', 'सोलर', 'सब्सिडी', 'बिजली', 'सूर्य घर']
      },
      {
        id: 'surya-chunk-2',
        schemeId: 'pm-surya-ghar',
        schemeName: 'PM Surya Ghar',
        documentTitle: 'PM Surya Ghar Operational Guidelines - MNRE',
        section: 'Section 4: Documents and Verification Process',
        pageNumber: 5,
        content: 'Documents required for PM Surya Ghar: 1. Valid Electricity Bill in the name of the applicant showing consumer number and active connection. 2. Aadhaar card of the applicant. 3. Bank Account details (Passbook copy or Cancelled Cheque) matching the Aadhaar name. 4. Proof of house ownership or consent letter if connection is under family member’s name. The consumer applies via the national portal pmsuryaghar.gov.in.',
        contentHindi: 'पीएम सूर्य घर के लिए आवश्यक दस्तावेज: 1. आवेदक के नाम पर वैध बिजली बिल (कंज्यूमर नंबर सहित)। 2. आधार कार्ड। 3. बैंक खाता विवरण (पासबुक या कैंसिल्ड चेक)। 4. मकान के स्वामित्व का प्रमाण। आवेदन राष्ट्रीय पोर्टल pmsuryaghar.gov.in के माध्यम से किया जाता है।',
        officialUrl: 'https://pmsuryaghar.gov.in',
        keywords: ['documents', 'surya ghar documents', 'electricity bill', 'consumer number', 'bank details', 'दस्तावेज', 'बिजली बिल', 'बैंक पासबुक']
      }
    ]
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana (APY)',
    hindiName: 'अटल पेंशन योजना (एपीवाई)',
    shortCode: 'APY',
    ministry: 'Ministry of Finance / PFRDA',
    ministryHindi: 'वित्त मंत्रालय / पीएफआरडीए',
    category: 'senior_citizens',
    shortDescription: 'Guaranteed pension scheme for unorganized sector workers providing ₹1,000 to ₹5,000 monthly pension from age 60.',
    shortDescriptionHindi: 'असंगठित क्षेत्र के श्रमिकों के लिए गारंटीकृत पेंशन योजना, जो 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक मासिक पेंशन देती है।',
    benefitHighlight: 'Government-guaranteed lifetime monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 from age 60',
    benefitHighlightHindi: '60 वर्ष की उम्र से आजीवन ₹1,000 से ₹5,000 प्रति माह की गारंटीकृत पेंशन',
    targetAudience: 'All Indian citizens aged 18 to 40 years holding a savings bank account',
    targetAudienceHindi: '18 से 40 वर्ष की आयु के सभी भारतीय नागरिक जिनका किसी बैंक में बचत खाता है',
    officialPortal: 'https://www.npscra.nsdl.co.in & https://pfrda.org.in',
    officialDocTitle: 'Atal Pension Yojana Operational Guidelines - PFRDA',
    applicationMode: 'both',
    tags: ['pension', 'senior citizens', 'unorganized sector', 'retirement', 'apy'],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      excludedOccupations: ['Income tax payers as per Rule amendment 01.10.2022'],
      summary: 'Any Indian citizen between 18 and 40 years of age having a savings bank or post office account. W.e.f 1st October 2022, any citizen who is or has been an income-tax payer is not eligible to join APY.',
      summaryHindi: '18 से 40 वर्ष की आयु का कोई भी भारतीय नागरिक जिसका बैंक या डाकघर में खाता है। 1 अक्टूबर 2022 से आयकर देने वाले नागरिक इसमें शामिल होने के पात्र नहीं हैं।',
      sourceSection: 'Section 2: Subscriber Eligibility & Age Limits',
      sourcePage: 2
    },
    documents: [
      {
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        required: true,
        purpose: 'Identity verification and spouse nominee linkage',
        purposeHindi: 'पहचान सत्यापन और पति/पत्नी के नॉमिनी लिंकेज के लिए',
        sourcePage: 4,
        sourceSection: 'Section 3: KYC & Enrollment'
      },
      {
        name: 'Savings Bank Account with Auto-Debit Mandate',
        nameHindi: 'ऑटो-डेबिट सुविधा वाला बचत बैंक खाता',
        required: true,
        purpose: 'Automated deduction of monthly/quarterly contribution',
        purposeHindi: 'मासिक या तिमाही अंशदान की स्वतः कटौती के लिए',
        sourcePage: 4,
        sourceSection: 'Section 3: Contribution Mechanism'
      },
      {
        name: 'Active Mobile Number',
        nameHindi: 'सक्रिय मोबाइल नंबर',
        required: true,
        purpose: 'Receiving PRAN SMS and transaction alerts',
        purposeHindi: 'प्रान (PRAN) नंबर और लेन-देन अलर्ट प्राप्त करने हेतु',
        sourcePage: 5,
        sourceSection: 'Section 3: Alerts'
      }
    ],
    benefits: [
      {
        title: 'Guaranteed Monthly Pension',
        titleHindi: 'गारंटीकृत मासिक पेंशन',
        amountOrCoverage: '₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month depending on contribution amount and entry age',
        frequency: 'Credited on 1st of every month upon attaining 60 years of age till demise',
        frequencyHindi: '60 वर्ष की आयु के बाद मृत्युपर्यंत हर माह की पहली तारीख को'
      },
      {
        title: 'Spouse Pension Guarantee',
        titleHindi: 'पति/पत्नी हेतु समान पेंशन गारंटी',
        amountOrCoverage: 'In case of subscriber’s demise, the spouse continues to receive the exact same pension amount',
        frequency: 'Lifetime for spouse',
        frequencyHindi: 'पति/पत्नी को आजीवन समान पेंशन'
      },
      {
        title: 'Return of Accumulated Corpus to Nominee',
        titleHindi: 'नॉमिनी को संपूर्ण संचित राशि की वापसी',
        amountOrCoverage: 'Full accumulated pension wealth (up to ₹8.5 Lakh for ₹5,000 pension slab) returned to children/nominee on demise of both subscriber and spouse',
        frequency: 'Lump-sum settlement',
        frequencyHindi: 'दोनों की मृत्यु के उपरांत बच्चों या कानूनी उत्तराधिकारी को एकमुश्त वापसी'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Approach Savings Bank or Net Banking',
        titleHindi: 'बैंक शाखा जाएं या नेट बैंकिंग का उपयोग करें',
        details: 'Visit your bank branch where you hold savings account, or log into Net Banking / Mobile Banking app under "Social Security / Insurance" section.',
        detailsHindi: 'अपनी बैंक शाखा में जाएं अथवा बैंक के मोबाइल ऐप/नेट बैंकिंग में "सामाजिक सुरक्षा/पेंशन" खंड में जाएं।'
      },
      {
        stepNumber: 2,
        title: 'Choose Desired Pension Slab',
        titleHindi: 'वांछित पेंशन स्लैब चुनें',
        details: 'Select pension amount (₹1,000 to ₹5,000/month). The system automatically calculates monthly contribution based on current age (e.g., ₹210/month at age 18 for ₹5,000 pension).',
        detailsHindi: 'पेंशन राशि (₹1,000 से ₹5,000) चुनें। उम्र के अनुसार मासिक अंशदान स्वतः निर्धारित होगा (जैसे 18 वर्ष की आयु में ₹210 प्रति माह)।'
      },
      {
        stepNumber: 3,
        title: 'Provide Nominee and Auto-Debit Mandate',
        titleHindi: 'नॉमिनी विवरण और ऑटो-डेबिट सहमति दें',
        details: 'Provide spouse Aadhaar for nominee details and sign auto-debit consent. PRAN card is generated instantly.',
        detailsHindi: 'पति/पत्नी का आधार नॉमिनी के रूप में दें और ऑटो-डेबिट स्वीकार करें। तुरंत प्रान (PRAN) कार्ड जारी होगा।'
      }
    ],
    chunks: [
      {
        id: 'apy-chunk-1',
        schemeId: 'atal-pension',
        schemeName: 'Atal Pension Yojana',
        documentTitle: 'Atal Pension Yojana Guidelines - PFRDA',
        section: 'Section 2: Age, Pension Slabs and Income Tax Exclusion',
        pageNumber: 2,
        content: 'Atal Pension Yojana (APY) is open to all citizens of India aged between 18 and 40 years having a savings bank account. Under APY, subscribers receive a guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month from the age of 60 years. Exclusion: From 1st October 2022, any citizen who is or has been an income tax payer as per Income Tax Act is not eligible to join APY. In case an income tax payer joins, the account will be closed and subscriber contribution refunded.',
        contentHindi: 'अटल पेंशन योजना (एपीवाई) 18 से 40 वर्ष की आयु के सभी नागरिकों के लिए खुली है। 60 वर्ष की आयु से ₹1,000 से ₹5,000 तक की न्यूनतम गारंटीकृत मासिक पेंशन मिलती है। 1 अक्टूबर 2022 से आयकर देने वाले नागरिक इस योजना में शामिल होने के पात्र नहीं हैं।',
        officialUrl: 'https://pfrda.org.in',
        keywords: ['apy', 'pension', '18 to 40', '5000 pension', '60 years', 'income tax exclusion', 'पेंशन', 'अटल पेंशन', 'रिटायरमेंट']
      },
      {
        id: 'apy-chunk-2',
        schemeId: 'atal-pension',
        schemeName: 'Atal Pension Yojana',
        documentTitle: 'Atal Pension Yojana Guidelines - PFRDA',
        section: 'Section 3: Documents and Contribution Mechanism',
        pageNumber: 4,
        content: 'Documents required for APY: 1. Aadhaar Card (primary KYC proof). 2. Savings Bank Account Number with active Auto-Debit facility. 3. Active mobile number. 4. Spouse and Nominee details (Nominee Aadhaar). Monthly contributions are debited automatically from the bank account on the chosen date. If contribution is delayed, nominal overdue interest (₹1 per ₹100 per month) applies.',
        contentHindi: 'एपीवाई हेतु आवश्यक दस्तावेज: 1. आधार कार्ड। 2. ऑटो-डेबिट सुविधा वाला बचत बैंक खाता। 3. मोबाइल नंबर। 4. पति/पत्नी और नॉमिनी का विवरण। अंशदान बैंक खाते से स्वतः काटा जाता है।',
        officialUrl: 'https://pfrda.org.in',
        keywords: ['documents', 'apy documents', 'auto-debit', 'aadhaar', 'nominee', 'दस्तावेज', 'आधार', 'नॉमिनी', 'ऑटो डेबिट']
      }
    ]
  },
  {
    id: 'nmmss-scholarship',
    name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    hindiName: 'राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना (एनएमएमएसएस)',
    shortCode: 'NMMSS',
    ministry: 'Ministry of Education / Department of School Education & Literacy',
    ministryHindi: 'शिक्षा मंत्रालय / स्कूल शिक्षा और साक्षरता विभाग',
    category: 'education',
    shortDescription: 'Scholarship of ₹12,000 per year for meritorious economically disadvantaged students studying in Class 9 to 12.',
    shortDescriptionHindi: 'कक्षा 9 से 12 तक पढ़ने वाले आर्थिक रूप से कमजोर मेधावी छात्रों के लिए प्रति वर्ष ₹12,000 की छात्रवृत्ति।',
    benefitHighlight: '₹12,000 / year (₹1,000 per month) scholarship from Class 9 to Class 12 paid directly via DBT',
    benefitHighlightHindi: 'कक्षा 9 से 12 तक प्रति वर्ष ₹12,000 (₹1,000/माह) की छात्रवृत्ति सीधे बैंक खाते में डीबीटी द्वारा',
    targetAudience: 'Meritorious students studying in government and local body schools with family income below ₹3.5 Lakh',
    targetAudienceHindi: 'सरकारी व स्थानीय निकाय स्कूलों के छात्र जिनके परिवार की वार्षिक आय ₹3.5 लाख से कम है',
    officialPortal: 'https://scholarships.gov.in',
    officialDocTitle: 'NMMSS Scheme Operational Guidelines - Ministry of Education',
    applicationMode: 'online',
    tags: ['scholarship', 'education', 'student', 'class 9', 'merit', 'nsp'],
    eligibility: {
      maxAnnualIncome: 350000,
      targetCategories: ['Student', 'Low Income'],
      summary: 'Students studying in Class VIII in Government, Local Body, and Government-aided schools with at least 55% marks (50% for SC/ST) in Class VII. Parental annual income from all sources must not exceed ₹3,50,000. Must qualify state-level selection examination (MAT + SAT). Students of Kendriya Vidyalayas, Navodaya Vidyalayas, and private residential schools are not eligible.',
      summaryHindi: 'सरकारी या सहायता प्राप्त स्कूलों में कक्षा 8 में पढ़ने वाले छात्र जिनके कक्षा 7 में कम से कम 55% अंक हों (एससी/एसटी हेतु 50%)। परिवार की वार्षिक आय ₹3,50,000 से अधिक न हो तथा राज्य स्तरीय परीक्षा उत्तीर्ण की हो।',
      sourceSection: 'Section 3: Eligibility Conditions',
      sourcePage: 3
    },
    documents: [
      {
        name: 'Class 7 Marksheet',
        nameHindi: 'कक्षा 7 की अंकतालिका',
        required: true,
        purpose: 'Proof of securing minimum 55% aggregate marks (50% for SC/ST)',
        purposeHindi: 'कक्षा 7 में न्यूनतम 55% (एससी/एसटी 50%) अंक प्रमाणित करने हेतु',
        sourcePage: 6,
        sourceSection: 'Section 5: Required Verification Documents'
      },
      {
        name: 'Competent Authority Income Certificate',
        nameHindi: 'सक्षम प्राधिकारी द्वारा जारी आय प्रमाण पत्र',
        required: true,
        purpose: 'Proof that total family income does not exceed ₹3,50,000 per annum',
        purposeHindi: 'प्रमाणित करने के लिए कि वार्षिक पारिवारिक आय ₹3.5 लाख से कम है',
        sourcePage: 6,
        sourceSection: 'Section 5: Income Proof'
      },
      {
        name: 'Aadhaar Card of Student',
        nameHindi: 'छात्र का आधार कार्ड',
        required: true,
        purpose: 'Identity verification and National Scholarship Portal (NSP) biometric OTR',
        purposeHindi: 'एनएसपी पोर्टल पर वन-टाइम रजिस्ट्रेशन (OTR) और बायोमेट्रिक सत्यापन',
        sourcePage: 7,
        sourceSection: 'Section 5: Identity and Bank Linkage'
      },
      {
        name: 'Student Aadhaar-Seeded Bank Passbook',
        nameHindi: 'छात्र का आधार से जुड़ा बैंक खाता पासबुक',
        required: true,
        purpose: 'Direct disbursement of scholarship via PFMS DBT',
        purposeHindi: 'छात्रवृत्ति की राशि सीधे खाते में डीबीटी द्वारा प्राप्त करने हेतु',
        sourcePage: 7,
        sourceSection: 'Section 5: Financial Records'
      },
      {
        name: 'Caste Certificate (For SC/ST applicants)',
        nameHindi: 'जाति प्रमाण पत्र (एससी/एसटी छात्रों के लिए)',
        required: false,
        purpose: 'Availing reservation quotas and relaxed qualifying marks',
        purposeHindi: 'आरक्षण और 5% अंक छूट का लाभ लेने हेतु',
        sourcePage: 7,
        sourceSection: 'Section 5: Category Proof'
      }
    ],
    benefits: [
      {
        title: 'Annual Scholarship Disbursement',
        titleHindi: 'वार्षिक छात्रवृत्ति भुगतान',
        amountOrCoverage: '₹12,000 per annum (₹1,000 per month) for 4 consecutive academic years (Classes 9, 10, 11, and 12)',
        frequency: 'Annual lump sum DBT disbursement into student bank account via NSP',
        frequencyHindi: 'एनएसपी के माध्यम से प्रति वर्ष एकमुश्त ₹12,000 छात्र के बैंक खाते में'
      },
      {
        title: 'Drop-out Prevention Incentive',
        titleHindi: 'ड्राप-आउट रोकथाम सहायता',
        amountOrCoverage: 'Enables talented economically weaker students to complete secondary education without financial strain',
        frequency: 'Renewable every year on passing previous class with minimum 55% marks (60% in Class 10)',
        frequencyHindi: 'कक्षा 10 में 60% व अन्य में 55% अंक के साथ नवीकरणीय'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Appear in State Level NMMSS Selection Exam',
        titleHindi: 'राज्य स्तरीय चयन परीक्षा में भाग लें',
        details: 'Apply for the state selection exam while in Class 8 through school headmaster. Clear Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).',
        detailsHindi: 'कक्षा 8 में स्कूल प्रधानाचार्य के माध्यम से आवेदन करें और मानसिक क्षमता (MAT) व शैक्षणिक योग्यता (SAT) परीक्षा उत्तीर्ण करें।'
      },
      {
        stepNumber: 2,
        title: 'Register on National Scholarship Portal (NSP)',
        titleHindi: 'नेशनल स्कॉलरशिप पोर्टल (NSP) पर पंजीकरण करें',
        details: 'Shortlisted candidates complete One-Time Registration (OTR) on scholarships.gov.in using Aadhaar and enter student bank details.',
        detailsHindi: 'चयनित छात्र scholarships.gov.in पर आधार से वन-टाइम रजिस्ट्रेशन (OTR) पूर्ण करें।'
      },
      {
        stepNumber: 3,
        title: 'Institutional Verification & DBT Transfer',
        titleHindi: 'स्कूल सत्यापन और डीबीटी अंतरण',
        details: 'School Head and District Nodal Officer verify credentials online. Scholarship is disbursed directly through PFMS.',
        detailsHindi: 'स्कूल और जिला नोडल अधिकारी द्वारा ऑनलाइन सत्यापन के बाद छात्रवृत्ति सीधे बैंक में भेजी जाती है।'
      }
    ],
    chunks: [
      {
        id: 'nmmss-chunk-1',
        schemeId: 'nmmss-scholarship',
        schemeName: 'NMMSS Scholarship',
        documentTitle: 'NMMSS Guidelines - Ministry of Education',
        section: 'Section 3: Eligibility & Examination Criteria',
        pageNumber: 3,
        content: 'Under National Means-cum-Merit Scholarship Scheme (NMMSS), 1,00,000 fresh scholarships of ₹12,000 per annum (₹1,000 per month) are awarded to meritorious students from Class 9 to Class 12. Eligibility: 1. Student must be enrolled in Class 8 in Government, Government-aided, or Local Body school. 2. Must have scored minimum 55% marks in Class 7 (50% for SC/ST). 3. Parental annual income from all sources must not exceed ₹3,50,000. 4. Ineligible: Students of Kendriya Vidyalaya, Jawahar Navodaya Vidyalaya, Sainik Schools, and residential schools run by government where boarding and lodging are provided.',
        contentHindi: 'एनएमएमएसएस के तहत कक्षा 9 से 12 तक के मेधावी छात्रों को ₹12,000 प्रति वर्ष (₹1,000 प्रति माह) की छात्रवृत्ति दी जाती है। पात्रता: 1. सरकारी या सहायता प्राप्त स्कूल में कक्षा 8 का छात्र। 2. कक्षा 7 में न्यूनतम 55% अंक (एससी/एसटी 50%)। 3. माता-पिता की वार्षिक आय ₹3.5 लाख से अधिक न हो। 4. केंद्रीय विद्यालय, नवोदय व आवासीय विद्यालय के छात्र पात्र नहीं हैं।',
        officialUrl: 'https://scholarships.gov.in',
        keywords: ['nmmss', 'scholarship', '12000', 'student', 'class 8', 'class 9', 'income limit 3.5 lakh', 'mat sat', 'छात्रवृत्ति', 'विद्यार्थी', 'शिक्षा']
      },
      {
        id: 'nmmss-chunk-2',
        schemeId: 'nmmss-scholarship',
        schemeName: 'NMMSS Scholarship',
        documentTitle: 'NMMSS Guidelines - Ministry of Education',
        section: 'Section 5: Documentation & Renewal Conditions',
        pageNumber: 6,
        content: 'Documents required for NMMSS: 1. Class 7 Marksheet. 2. Income Certificate from competent revenue authority (Tahsildar/SDM). 3. Caste Certificate if claiming SC/ST reservation. 4. Aadhaar Card of the student. 5. Bank Passbook in student’s single name seeded with Aadhaar on NPCI. Renewal rules: To continue receiving scholarship in Class 10, 11, and 12, the student must pass the examination with at least 55% marks (50% for SC/ST), and minimum 60% in Class 10 for continuation in Class 11.',
        contentHindi: 'आवश्यक दस्तावेज: 1. कक्षा 7 की मार्कशीट। 2. तहसीलदार द्वारा जारी आय प्रमाण पत्र (अधिकतम ₹3.5 लाख)। 3. जाति प्रमाण पत्र। 4. छात्र का आधार कार्ड। 5. छात्र का आधार से जुड़ा बैंक खाता। नवीनीकरण हेतु कक्षा 10 में न्यूनतम 60% तथा अन्य कक्षाओं में 55% अंक अनिवार्य हैं।',
        officialUrl: 'https://scholarships.gov.in',
        keywords: ['documents', 'nmmss documents', 'income certificate', 'marksheet', 'renewal', 'nsp', 'दस्तावेज', 'मार्कशीट', 'आय प्रमाण पत्र']
      }
    ]
  },
  {
    id: 'pm-ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)',
    hindiName: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (पीएमयूवाई)',
    shortCode: 'PMUY',
    ministry: 'Ministry of Petroleum and Natural Gas (MoPNG)',
    ministryHindi: 'पेट्रोलियम और प्राकृतिक गैस मंत्रालय',
    category: 'women_child',
    shortDescription: 'Free LPG gas connection with first refill and stove, plus ₹300 targeted subsidy per 14.2 kg cylinder for rural women.',
    shortDescriptionHindi: 'ग्रामीण और गरीब महिलाओं के लिए मुफ्त एलपीजी गैस कनेक्शन, पहला सिलेंडर व चूल्हा मुफ्त, तथा प्रति सिलेंडर ₹300 की लक्षित सब्सिडी।',
    benefitHighlight: 'Free LPG connection + first 14.2 kg refill + hotplate (stove) + ₹300 cylinder subsidy up to 12 refills/year',
    benefitHighlightHindi: 'मुफ्त गैस कनेक्शन + पहला सिलेंडर व चूल्हा मुफ्त + प्रति सिलेंडर ₹300 की सब्सिडी (वर्ष में 12 रिफिल तक)',
    targetAudience: 'Adult women belonging to poor households without existing LPG connection',
    targetAudienceHindi: 'गरीब परिवारों की वयस्क महिलाएं जिनके घर में पहले से कोई एलपीजी कनेक्शन नहीं है',
    officialPortal: 'https://www.pmuy.gov.in',
    officialDocTitle: 'PMUY 2.0 Operational Guidelines - Ministry of Petroleum and Natural Gas',
    applicationMode: 'both',
    tags: ['lpg', 'gas cylinder', 'women', 'subsidy', 'clean fuel', 'ujjwala'],
    eligibility: {
      minAge: 18,
      gender: 'female',
      summary: 'Applicant must be an adult woman aged 18 years or above belonging to poor households (SC/ST, PMAY beneficiaries, Antyodaya Anna Yojana, Most Backward Classes, Tea garden tribes, Forest dwellers, or 14-point declaration poor family). No other LPG connection should exist in the same household.',
      summaryHindi: 'आवेदक की आयु 18 वर्ष या उससे अधिक होनी चाहिए और वह गरीब परिवार की महिला होनी चाहिए। घर में किसी अन्य सदस्य के नाम पर पहले से एलपीजी गैस कनेक्शन नहीं होना चाहिए।',
      sourceSection: 'Section 2: Beneficiary Identification & Eligibility Criteria',
      sourcePage: 3
    },
    documents: [
      {
        name: 'Aadhaar Card of Applicant Woman (Mandatory)',
        nameHindi: 'महिला आवेदक का आधार कार्ड (अनिवार्य)',
        required: true,
        purpose: 'Identity verification and biometric KYC authentication',
        purposeHindi: 'पहचान सत्यापन और बायोमेट्रिक केवाईसी हेतु',
        sourcePage: 5,
        sourceSection: 'Section 4: Mandatory Documents'
      },
      {
        name: 'Ration Card / Family Composition Document',
        nameHindi: 'राशन कार्ड / परिवार संरचना दस्तावेज',
        required: true,
        purpose: 'Verification of family composition and address proof (Self-declaration accepted for migrant workers under Ujjwala 2.0)',
        purposeHindi: 'परिवार के सदस्यों का सत्यापन (प्रवासी मजदूरों के लिए स्व-घोषणा पत्र मान्य)',
        sourcePage: 5,
        sourceSection: 'Section 4: Family Details'
      },
      {
        name: 'Aadhaar of all adult family members',
        nameHindi: 'परिवार के सभी वयस्क सदस्यों का आधार',
        required: true,
        purpose: 'De-duplication check across all Oil Marketing Companies (IOCL, BPCL, HPCL)',
        purposeHindi: 'यह जांचने के लिए कि घर में किसी अन्य सदस्य के पास गैस कनेक्शन तो नहीं है',
        sourcePage: 6,
        sourceSection: 'Section 4: De-duplication'
      },
      {
        name: 'Aadhaar-Seeded Bank Account Passbook',
        nameHindi: 'आधार से जुड़ा बैंक खाता पासबुक',
        required: true,
        purpose: 'Disbursal of ₹300 per cylinder DBT subsidy via PAHAL scheme',
        purposeHindi: 'पहल योजना के अंतर्गत ₹300 प्रति सिलेंडर सब्सिडी सीधे खाते में पाने हेतु',
        sourcePage: 6,
        sourceSection: 'Section 4: Subsidy Disbursal'
      }
    ],
    benefits: [
      {
        title: 'Free LPG Connection & Security Deposit Waiver',
        titleHindi: 'मुफ्त एलपीजी कनेक्शन और सुरक्षा जमा माफी',
        amountOrCoverage: 'Complete financial assistance for cylinder deposit, pressure regulator, and installation charges (₹1,600 value)',
        frequency: 'Provided upfront by Central Government',
        frequencyHindi: 'केंद्र सरकार द्वारा पूर्ण वित्तीय सहायता'
      },
      {
        title: 'Free First Refill & Gas Stove (Hotplate)',
        titleHindi: 'पहला गैस सिलेंडर व चूल्हा पूरी तरह मुफ्त',
        amountOrCoverage: 'First 14.2 kg LPG refill and certified double burner LPG stove provided completely free under Ujjwala 2.0',
        frequency: 'At the time of connection delivery',
        frequencyHindi: 'कनेक्शन मिलने के समय एकमुश्त'
      },
      {
        title: 'Targeted Direct Subsidy of ₹300 per Cylinder',
        titleHindi: 'प्रति सिलेंडर ₹300 की सीधी सब्सिडी',
        amountOrCoverage: '₹300 direct cash subsidy credited into bank account for up to 12 refills per financial year',
        frequency: 'Credited directly via DBT upon cylinder delivery',
        frequencyHindi: 'प्रति वर्ष 12 सिलेंडर तक डिलीवरी के बाद खाते में'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply Online or at Nearest LPG Distributor',
        titleHindi: 'ऑनलाइन या नजदीकी गैस एजेंसी पर आवेदन करें',
        details: 'Apply online at pmuy.gov.in choosing Indane, Bharatgas, or HP Gas, or submit physical form at nearest LPG dealership.',
        detailsHindi: 'pmuy.gov.in पर जाएं या नजदीकी इंडेन, भारत गैस या एचपी गैस एजेंसी में फॉर्म जमा करें।'
      },
      {
        stepNumber: 2,
        title: 'Biometric eKYC Verification',
        titleHindi: 'बायोमेट्रिक ई-केवाईसी सत्यापन',
        details: 'Submit Aadhaar cards of applicant and adult family members, ration card, and bank account details for distributor biometric authentication.',
        detailsHindi: 'आवेदक व परिवार के आधार कार्ड, राशन कार्ड और बैंक खाता जमा कर बायोमेट्रिक सत्यापन कराएं।'
      },
      {
        stepNumber: 3,
        title: 'Collect Connection, Stove and First Cylinder',
        titleHindi: 'गैस कनेक्शन, चूल्हा और पहला सिलेंडर प्राप्त करें',
        details: 'Upon OMC de-duplication clearance, receive gas connection documents, safety rubber hose, certified stove, and filled 14.2 kg cylinder at zero cost.',
        detailsHindi: 'जांच पूर्ण होने पर मुफ्त गैस सिलेंडर, चूल्हा, रेगुलेटर और पाइप प्राप्त करें।'
      }
    ],
    chunks: [
      {
        id: 'pmuy-chunk-1',
        schemeId: 'pm-ujjwala',
        schemeName: 'PM Ujjwala Yojana 2.0',
        documentTitle: 'PMUY 2.0 Guidelines - Ministry of Petroleum & Natural Gas',
        section: 'Section 2: Beneficiary Eligibility Criteria',
        pageNumber: 3,
        content: 'Under PMUY 2.0, an adult woman belonging to a poor family is eligible for a new LPG connection provided no other LPG connection is held in the same household by any member. The applicant must belong to any of the following categories: (a) SC households; (b) ST households; (c) Pradhan Mantri Awas Yojana (Gramin) beneficiaries; (d) Antyodaya Anna Yojana (AAY); (e) Most Backward Classes (MBC); (f) Tea and Ex-Tea Garden Tribes; (g) Forest Dwellers; (h) People residing in Islands and River Islands; or (i) Any poor household as per 14-point declaration.',
        contentHindi: 'पीएमयूवाई 2.0 के तहत गरीब परिवार की वयस्क महिला नए गैस कनेक्शन की पात्र है, बशर्ते परिवार में पहले से कोई कनेक्शन न हो। आवेदक एससी, एसटी, पीएम आवास लाभार्थी, अंत्योदय अन्न योजना, अत्यंत पिछड़ा वर्ग, वनवासी या 14-सूत्रीय घोषणा के अनुसार गरीब परिवार से होनी चाहिए।',
        officialUrl: 'https://www.pmuy.gov.in',
        keywords: ['ujjwala', 'lpg', 'gas cylinder', 'clean cooking', 'woman', '18 years', 'free connection', 'उज्ज्वला', 'गैस कनेक्शन', 'सिलेंडर', 'महिला']
      },
      {
        id: 'pmuy-chunk-2',
        schemeId: 'pm-ujjwala',
        schemeName: 'PM Ujjwala Yojana 2.0',
        documentTitle: 'PMUY 2.0 Guidelines - Ministry of Petroleum & Natural Gas',
        section: 'Section 4: Benefits, Free Stove, Refill and ₹300 Subsidy',
        pageNumber: 5,
        content: 'Benefits provided under Ujjwala 2.0: 1. Complete financial assistance of ₹1,600 per connection covering security deposit of cylinder, regulator, D.G.C.C. booklet, and installation charges. 2. A free first refill of 14.2 kg LPG. 3. A free hotplate (LPG stove). 4. In addition, the Government of India provides a targeted subsidy of ₹300 per 14.2 kg cylinder for up to 12 refills per year credited directly to the beneficiary’s Aadhaar-linked bank account.',
        contentHindi: 'उज्ज्वला 2.0 के लाभ: 1. कनेक्शन शुल्क, रेगुलेटर और स्थापना शुल्क की पूर्ण माफी। 2. पहला 14.2 किग्रा सिलेंडर बिल्कुल मुफ्त। 3. दो बर्नर वाला गैस चूल्हा मुफ्त। 4. इसके अलावा प्रति वर्ष 12 सिलेंडरों तक ₹300 प्रति सिलेंडर की सीधी नकद सब्सिडी बैंक खाते में डीबीटी द्वारा।',
        officialUrl: 'https://www.pmuy.gov.in',
        keywords: ['benefits', 'free stove', 'free refill', '300 subsidy', '14.2 kg', 'cylinder', 'दस्तावेज', 'मुफ्त चूल्हा', 'सब्सिडी ३००']
      }
    ]
  }
];
