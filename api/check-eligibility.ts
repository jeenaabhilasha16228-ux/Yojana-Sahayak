import { DEFAULT_SCHEMES } from '../src/data/defaultSchemes.js';
import { EligibilityResult, UserEligibilityProfile } from '../src/types/index.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const profile: UserEligibilityProfile = req.body || {};
    const targetSchemeId = profile.selectedSchemeId;

    const schemesToEvaluate = targetSchemeId && targetSchemeId !== 'all'
      ? DEFAULT_SCHEMES.filter(s => s.id === targetSchemeId)
      : DEFAULT_SCHEMES;

    const evaluations: EligibilityResult[] = schemesToEvaluate.map(scheme => {
      const matchedCriteria: string[] = [];
      const unmatchedCriteria: string[] = [];
      const pendingQuestions: string[] = [];

      if (scheme.id === 'pm-kisan') {
        if (profile.paysIncomeTax) {
          unmatchedCriteria.push('Income Tax Payers are explicitly excluded under Section 4.');
        } else if (profile.isGovtEmployee) {
          unmatchedCriteria.push('Central/State Government employees are excluded (except Class IV).');
        } else if (profile.hasAgriculturalLand) {
          matchedCriteria.push('Holds cultivable agricultural land registered in farmer/family name.');
        } else {
          unmatchedCriteria.push('Must own cultivable agricultural land.');
        }
      } else if (scheme.id === 'pm-jay') {
        if (profile.age >= 70) {
          matchedCriteria.push('Citizen aged 70 or above qualifies unconditionally under Ayushman Vayo Vandana.');
        } else if (profile.annualIncome <= 250000 || profile.socialCategory === 'SC' || profile.socialCategory === 'ST') {
          matchedCriteria.push('Low-income / deprived socioeconomic status aligns with SECC criteria.');
        } else {
          pendingQuestions.push('Inclusion depends on SECC 2011 deprivation record or Ration Card category.');
        }
      } else if (scheme.id === 'pm-awas') {
        if (profile.annualIncome <= 300000) {
          matchedCriteria.push('Annual income qualifies under Economically Weaker Section (EWS up to ₹3 Lakh).');
        } else if (profile.annualIncome <= 600000) {
          matchedCriteria.push('Qualifies under Low Income Group (LIG ₹3-6 Lakh) interest subsidy.');
        } else if (profile.annualIncome <= 900000) {
          matchedCriteria.push('Qualifies under Middle Income Group (MIG ₹6-9 Lakh).');
        } else {
          unmatchedCriteria.push('Family annual income exceeds PMAY ceiling of ₹9 Lakh.');
        }
      } else if (scheme.id === 'pm-mudra') {
        if (profile.age >= 18 && profile.age <= 65) {
          matchedCriteria.push('Age satisfies the 18 to 65 years criterion for enterprise loan.');
        } else {
          unmatchedCriteria.push('Applicant must be between 18 and 65 years old.');
        }
        matchedCriteria.push('Micro/small business activity eligible for Shishu, Kishore, or Tarun.');
      } else if (scheme.id === 'sukanya-samriddhi') {
        if (profile.hasGirlChildUnder10) {
          matchedCriteria.push('Has a girl child below 10 years of age for account opening.');
        } else {
          unmatchedCriteria.push('Account can only be opened for a girl child aged 10 years or younger.');
        }
      } else if (scheme.id === 'pm-vishwakarma') {
        if (profile.isTraditionalArtisan && profile.age >= 18) {
          matchedCriteria.push('Working in one of the 18 recognized traditional artisan trades with hands and tools.');
        } else if (!profile.isTraditionalArtisan) {
          unmatchedCriteria.push('Must be an artisan engaged in one of the 18 specified traditional trades.');
        }
      } else if (scheme.id === 'atal-pension') {
        if (profile.paysIncomeTax) {
          unmatchedCriteria.push('Income Tax payers excluded w.e.f. October 1, 2022.');
        } else if (profile.age >= 18 && profile.age <= 40) {
          matchedCriteria.push('Age is within the permissible 18 to 40 years bracket.');
        } else {
          unmatchedCriteria.push('Applicant age must be between 18 and 40 years at entry.');
        }
      } else if (scheme.id === 'nmmss-scholarship') {
        if (profile.isStudentClass9To12 && profile.annualIncome <= 350000) {
          matchedCriteria.push('Class 9-12 student with parental annual income under ₹3.5 Lakh.');
        } else if (profile.annualIncome > 350000) {
          unmatchedCriteria.push('Parental income exceeds ₹3.5 Lakh threshold.');
        } else {
          pendingQuestions.push('Requires enrollment in Class 8/9 in Government/Aided school and qualifying exam score.');
        }
      } else if (scheme.id === 'pm-surya-ghar') {
        matchedCriteria.push('Domestic residential connection holder with terrace/rooftop space.');
      } else if (scheme.id === 'pm-ujjwala') {
        if (profile.gender === 'female' && profile.age >= 18) {
          matchedCriteria.push('Adult woman of poor household with no existing LPG connection.');
        } else {
          unmatchedCriteria.push('Connection is issued exclusively to adult women.');
        }
      }

      let verdict: 'Likely Eligible' | 'May Not Be Eligible' | 'More Information Required' = 'Likely Eligible';
      let verdictHindi: 'पात्र होने की संभावना' | 'संभवतः पात्र नहीं' | 'अधिक जानकारी की आवश्यकता' = 'पात्र होने की संभावना';

      if (unmatchedCriteria.length > 0) {
        verdict = 'May Not Be Eligible';
        verdictHindi = 'संभवतः पात्र नहीं';
      } else if (pendingQuestions.length > 0 && matchedCriteria.length === 0) {
        verdict = 'More Information Required';
        verdictHindi = 'अधिक जानकारी की आवश्यकता';
      }

      return {
        schemeId: scheme.id,
        schemeName: scheme.name,
        schemeNameHindi: scheme.hindiName,
        verdict,
        verdictHindi,
        matchedCriteria,
        unmatchedCriteria,
        pendingQuestions,
        sourceDocument: scheme.officialDocTitle,
        sourceSection: scheme.eligibility.sourceSection,
        sourcePage: scheme.eligibility.sourcePage,
        officialUrl: scheme.officialPortal
      };
    });

    return res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error in Vercel /api/check-eligibility:', error);
    return res.status(500).json({ error: 'Failed to assess eligibility' });
  }
}
