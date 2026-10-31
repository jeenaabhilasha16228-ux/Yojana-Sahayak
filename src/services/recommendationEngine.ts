import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import { Scheme, SchemeRecommendation, UserDocument, UserProfile } from '../types';

export const recommendationEngine = {
  // Compute personalized recommendations for a user profile + uploaded documents
  getRecommendations(
    profile: UserProfile | null,
    documents: UserDocument[],
    allSchemes: Scheme[] = DEFAULT_SCHEMES
  ): SchemeRecommendation[] {
    // Collect available document category tags
    const availableCategories = new Set<string>();
    documents.forEach(d => {
      availableCategories.add(d.category);
      if (d.category === 'aadhaar') availableCategories.add('identity');
      if (d.category === 'residence_domicile') availableCategories.add('address');
    });

    const recommendations: SchemeRecommendation[] = allSchemes.map(scheme => {
      let score = 50; // Base score
      const matchReasons: string[] = [];
      const pendingRequirements: string[] = [];
      const availableDocsList: string[] = [];
      const missingDocsList: string[] = [];

      // 1. Age check
      if (profile?.age !== undefined) {
        if (scheme.eligibility.minAge !== undefined && profile.age < scheme.eligibility.minAge) {
          score -= 35;
          pendingRequirements.push(`Applicant age (${profile.age}) is below minimum requirement (${scheme.eligibility.minAge} years).`);
        } else if (scheme.eligibility.maxAge !== undefined && profile.age > scheme.eligibility.maxAge) {
          score -= 35;
          pendingRequirements.push(`Applicant age (${profile.age}) exceeds maximum limit (${scheme.eligibility.maxAge} years).`);
        } else if (scheme.eligibility.minAge !== undefined || scheme.eligibility.maxAge !== undefined) {
          score += 15;
          matchReasons.push(`Age criterion satisfied (${profile.age} years).`);
        }
      } else {
        pendingRequirements.push('Age details not provided in profile.');
      }

      // 2. Occupation & Status Check
      if (scheme.id === 'pm-kisan') {
        const hasLandDoc = documents.some(d => d.category === 'land_records');
        if (profile?.isFarmer || profile?.hasAgriLand || hasLandDoc) {
          score += 25;
          matchReasons.push('Identified as landholding farmer family with agricultural land.');
        } else {
          score -= 20;
          pendingRequirements.push('Cultivable agricultural landholding required.');
        }

        if (profile?.paysIncomeTax) {
          score -= 40;
          pendingRequirements.push('Income Tax Payers are excluded under Section 4.');
        }
      } else if (scheme.id === 'nmmss-scholarship') {
        const hasEduDoc = documents.some(d => d.category === 'education_certificate');
        if (profile?.isStudent || hasEduDoc) {
          score += 30;
          matchReasons.push('Student enrolled in school/secondary education matches target group.');
        } else {
          score -= 25;
          pendingRequirements.push('Enrolment in secondary education required.');
        }

        if (profile?.annualIncome && profile.annualIncome <= 350000) {
          score += 15;
          matchReasons.push('Family annual income satisfies the ₹3.5 Lakh scholarship ceiling.');
        }
      } else if (scheme.id === 'pm-jay') {
        if (profile?.age && profile.age >= 70) {
          score += 35;
          matchReasons.push('Senior citizen aged 70+ qualifies unconditionally under Ayushman Vayo Vandana.');
        } else if (profile?.annualIncome && profile.annualIncome <= 250000) {
          score += 20;
          matchReasons.push('Income bracket qualifies under SECC deprived socioeconomic group.');
        } else {
          pendingRequirements.push('Ration card / SECC family tree verification required.');
        }
      } else if (scheme.id === 'pm-awas') {
        if (profile?.annualIncome && profile.annualIncome <= 300000) {
          score += 25;
          matchReasons.push('Qualifies under Economically Weaker Section (EWS) for ₹2.5L subsidy.');
        } else if (profile?.annualIncome && profile.annualIncome <= 600000) {
          score += 20;
          matchReasons.push('Qualifies under Low Income Group (LIG) interest subsidy.');
        }
      } else if (scheme.id === 'pm-mudra') {
        if (profile?.occupation && ['Business', 'Shopkeeper', 'Self Employed', 'Artisan', 'Trader'].includes(profile.occupation)) {
          score += 20;
          matchReasons.push(`Micro/small business activity (${profile.occupation}) eligible for collateral-free credit.`);
        }
      } else if (scheme.id === 'sukanya-samriddhi') {
        if (profile?.hasGirlChildUnder10) {
          score += 35;
          matchReasons.push('Presence of girl child under 10 years qualifies for high sovereign interest (8.2%).');
        } else {
          score -= 20;
          pendingRequirements.push('Applicable exclusively for families with girl children under 10.');
        }
      } else if (scheme.id === 'pm-vishwakarma') {
        if (profile?.isArtisan || ['Artisan', 'Carpenter', 'Blacksmith', 'Potter', 'Tailor'].includes(profile?.occupation || '')) {
          score += 35;
          matchReasons.push('Engagement in 18 recognized traditional artisan trades satisfies core eligibility.');
        } else {
          score -= 15;
          pendingRequirements.push('Reserved for traditional artisans and craftspeople working with hands and tools.');
        }
      } else if (scheme.id === 'atal-pension') {
        if (profile?.paysIncomeTax) {
          score -= 40;
          pendingRequirements.push('Income tax payers excluded from joining APY w.e.f. October 1, 2022.');
        } else if (profile?.age && profile.age >= 18 && profile.age <= 40) {
          score += 25;
          matchReasons.push('Age (18-40) satisfies eligibility for ₹1,000 to ₹5,000 monthly pension.');
        }
      } else if (scheme.id === 'pm-surya-ghar') {
        score += 15;
        matchReasons.push('Residential electricity connection holder eligible for rooftop solar subsidy up to ₹78,000.');
      } else if (scheme.id === 'pm-ujjwala') {
        if (profile?.gender === 'female' && (profile?.annualIncome || 0) <= 250000) {
          score += 25;
          matchReasons.push('Adult woman of poor household qualifies for free LPG connection & ₹300 subsidy.');
        }
      }

      // 3. Document Availability Check
      scheme.documents.forEach(reqDoc => {
        const docNameLower = reqDoc.name.toLowerCase();
        let isPresent = false;

        if (docNameLower.includes('aadhaar') && availableCategories.has('aadhaar')) isPresent = true;
        else if (docNameLower.includes('income') && availableCategories.has('income_certificate')) isPresent = true;
        else if ((docNameLower.includes('residence') || docNameLower.includes('domicile') || docNameLower.includes('ration')) && (availableCategories.has('residence_domicile') || availableCategories.has('aadhaar'))) isPresent = true;
        else if (docNameLower.includes('land') && availableCategories.has('land_records')) isPresent = true;
        else if (docNameLower.includes('bank') && availableCategories.has('bank_passbook')) isPresent = true;
        else if ((docNameLower.includes('marksheet') || docNameLower.includes('class 7') || docNameLower.includes('school')) && availableCategories.has('education_certificate')) isPresent = true;
        else if (docNameLower.includes('caste') && availableCategories.has('caste_certificate')) isPresent = true;

        if (isPresent) {
          availableDocsList.push(reqDoc.name);
          score += 5;
        } else if (reqDoc.required) {
          missingDocsList.push(reqDoc.name);
        }
      });

      // Clamp score between 10 and 98
      const finalScore = Math.max(15, Math.min(95, score));

      // Match level classification
      let matchLevel: 'High' | 'Moderate' | 'More Info Needed' = 'Moderate';
      if (finalScore >= 75) {
        matchLevel = 'High';
      } else if (finalScore < 50 || pendingRequirements.length > 2) {
        matchLevel = 'More Info Needed';
      }

      return {
        scheme,
        matchLevel,
        matchScore: finalScore,
        matchReasons: matchReasons.length > 0 ? matchReasons : ['General welfare demographic criteria align with your profile.'],
        pendingRequirements,
        availableDocuments: availableDocsList,
        missingDocuments: missingDocsList,
        officialSourceTitle: scheme.officialDocTitle,
        officialSourceSection: scheme.eligibility.sourceSection,
        officialSourcePage: scheme.eligibility.sourcePage,
        officialUrl: scheme.officialPortal
      };
    });

    // Sort descending by matchScore
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    return recommendations;
  },

  generateRecommendations(
    profile: UserProfile | null,
    documents: UserDocument[],
    allSchemes: Scheme[] = DEFAULT_SCHEMES
  ): SchemeRecommendation[] {
    return this.getRecommendations(profile, documents, allSchemes);
  },

  getGeneralRecommendations(allSchemes: Scheme[] = DEFAULT_SCHEMES): SchemeRecommendation[] {
    return this.getRecommendations(null, [], allSchemes);
  }
};
