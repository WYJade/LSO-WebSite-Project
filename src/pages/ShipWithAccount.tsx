import React, { useState, useEffect } from 'react';
import Toast, { useToast } from '../components/Toast';
import './ShipWithAccount.css';

const ShipWithAccount: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast, showToast } = useToast();

  // Step 1 state
  const [originatingZip, setOriginatingZip] = useState('');
  const [toQuickCode, setToQuickCode] = useState('');
  const [destinationZip, setDestinationZip] = useState('');
  const [country, setCountry] = useState('United States');
  const [service, setService] = useState('');
  const [useSimplePricing, setUseSimplePricing] = useState(true);
  const [weight, setWeight] = useState('');
  const [dimLength, setDimLength] = useState('');
  const [dimWidth, setDimWidth] = useState('');
  const [dimHeight, setDimHeight] = useState('');
  const [isEnvelope, setIsEnvelope] = useState(false);
  const [declaredValue, setDeclaredValue] = useState('100');
  const [showSummary, setShowSummary] = useState(false);
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2 state
  const [fromQuickCode, setFromQuickCode] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromPhone, setFromPhone] = useState('');
  const [fromCompany, setFromCompany] = useState('');
  const [fromAddress1, setFromAddress1] = useState('');
  const [fromAddress2, setFromAddress2] = useState('');
  const [fromResidential, setFromResidential] = useState(false);
  const [fromCountry, setFromCountry] = useState('United States');
  const [fromCity, setFromCity] = useState('');
  const [fromState, setFromState] = useState('');
  const [fromZip, setFromZip] = useState('');
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  // Step 3 state
  const [toQuickCode3, setToQuickCode3] = useState('');
  const [pieces, setPieces] = useState('1');
  const [sameDeliveryOptions, setSameDeliveryOptions] = useState(false);
  const [applyWeightAll, setApplyWeightAll] = useState('');
  const [toName, setToName] = useState('');
  const [toCompany, setToCompany] = useState('');
  const [toAddress1, setToAddress1] = useState('');
  const [toAddress2, setToAddress2] = useState('');
  const [toResidential, setToResidential] = useState(false);
  const [toCountry3, setToCountry3] = useState('United States');
  const [toCity, setToCity] = useState('');
  const [toState, setToState] = useState('');
  const [toZip, setToZip] = useState('');
  const [toPhone, setToPhone] = useState('');
  const [toDeclaredValue, setToDeclaredValue] = useState('100');
  const [toWeight, setToWeight] = useState('');
  const [toDimLength, setToDimLength] = useState('');
  const [toDimWidth, setToDimWidth] = useState('');
  const [toDimHeight, setToDimHeight] = useState('');
  const [toEnvelope, setToEnvelope] = useState(false);
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});

  // Step 4 state
  const [billingRef1, setBillingRef1] = useState('');
  const [billingRef2, setBillingRef2] = useState('');
  const [billingRef3, setBillingRef3] = useState('');
  const [billingRef4, setBillingRef4] = useState('');
  const [signatureReq, setSignatureReq] = useState('None');
  const [releaseSignature, setReleaseSignature] = useState(false);
  const [releaseSignatureName, setReleaseSignatureName] = useState('');
  const [deliveryNotification, setDeliveryNotification] = useState(false);
  const [deliveryNotificationEmail, setDeliveryNotificationEmail] = useState('');
  const [emailNotifications, setEmailNotifications] = useState('None');
  const [returnLabels, setReturnLabels] = useState('None');
  const [handlingFee, setHandlingFee] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [promotionCode, setPromotionCode] = useState('');
  const [thirdPartyBilling, setThirdPartyBilling] = useState('');
  const [lsoPickup, setLsoPickup] = useState(false);
  const [precisionHint, setPrecisionHint] = useState('');

  // Limit numeric input to 3 decimal places, auto-truncate excess
  const limitPrecision = (value: string, setter: (v: string) => void) => {
    if (value === '' || value === '.') { setter(value); return; }
    const match = value.match(/^(\d*\.?\d{0,3})/);
    const truncated = match ? match[1] : value;
    if (truncated !== value) {
      setPrecisionHint('Up to 3 decimal places allowed. Extra digits have been removed.');
      setTimeout(() => setPrecisionHint(''), 3000);
    }
    setter(truncated);
  };

  // Envelope logic: auto-fill and disable weight/dimensions
  useEffect(() => {
    if (isEnvelope) {
      setWeight('0.5');
      setDimLength('1');
      setDimWidth('1');
      setDimHeight('1');
    }
  }, [isEnvelope]);

  useEffect(() => {
    if (toEnvelope) {
      setToWeight('0.5');
      setToDimLength('1');
      setToDimWidth('1');
      setToDimHeight('1');
    }
  }, [toEnvelope]);

  const steps = [
    { number: 1, title: 'Check\nservice area' },
    { number: 2, title: 'From' },
    { number: 3, title: 'To' },
    { number: 4, title: 'Shipping\noptions' },
    { number: 5, title: 'Review &\ncreate airbill' }
  ];

  const computeSummary = () => {
    const w = parseFloat(weight) || 0;
    const basePrice = +(w * 1.86).toFixed(2);
    const serviceCharge = 0;
    const insuranceCharge = 0;
    const fuelSurcharge = +(basePrice * 0.168).toFixed(2);
    const totalCharge = +(basePrice + serviceCharge + insuranceCharge + fuelSurcharge).toFixed(2);
    return { service: service || 'LSO Ground™', basePrice, serviceCharge, insuranceCharge, fuelSurcharge, totalCharge };
  };

  // LSO service area: Texas, Oklahoma, Louisiana, Arkansas, New Mexico and parts of surrounding states
  const lsoServiceZipPrefixes = [
    '700','701','702','703','704','705','706','707','708','709','710','711','712','713','714',
    '716','717','718','719','720','721','722','723','724','725','726','727','728','729',
    '730','731','733','734','735','736','737','738','739','740','741','743','744','745','746','747','748','749',
    '750','751','752','753','754','755','756','757','758','759','760','761','762','763','764','765','766','767','768','769',
    '770','771','772','773','774','775','776','777','778','779','780','781','782','783','784','785','786','787','788','789',
    '790','791','792','793','794','795','796','797','798','799',
    '870','871','872','873','874','875','876','877','878','879',
    '880','881','882','883','884','885',
  ];
  const isZipInServiceArea = (zip: string) => {
    if (!zip || zip.length < 3) return true; // don't validate incomplete zips
    return lsoServiceZipPrefixes.includes(zip.substring(0, 3));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!originatingZip.trim()) errors.originatingZip = 'Originating Zip is required';
    else if (!/^\d{5}$/.test(originatingZip.trim())) errors.originatingZip = 'Please enter a valid 5-digit zip code';
    else if (!isZipInServiceArea(originatingZip.trim())) errors.originatingZip = 'LSO does not offer service to that Originating Zip';
    if (!destinationZip.trim()) errors.destinationZip = 'Destination Zip is required';
    else if (!/^\d{5}$/.test(destinationZip.trim())) errors.destinationZip = 'Please enter a valid 5-digit zip code';
    else if (!isZipInServiceArea(destinationZip.trim())) errors.destinationZip = 'LSO does not offer service to that Destination Zip';
    if (!service) errors.service = 'Service is required';
    if (!weight.trim()) errors.weight = 'Weight is required';
    else if (parseFloat(weight) <= 0) errors.weight = 'Weight must be greater than 0';
    if (!dimLength.trim() || !dimWidth.trim() || !dimHeight.trim()) errors.dimensions = 'Dimensions are required';
    else if (parseFloat(dimLength) <= 0 || parseFloat(dimWidth) <= 0 || parseFloat(dimHeight) <= 0) errors.dimensions = 'Each dimension must be greater than 0';
    if (!declaredValue.trim()) errors.declaredValue = 'Declared Value is required';
    else if (parseFloat(declaredValue) < 0) errors.declaredValue = 'Declared Value cannot be negative';
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!fromName.trim()) errors.fromName = 'Name is required';
    if (!fromPhone.trim()) errors.fromPhone = 'Phone is required';
    else if (!/^[\d\s\-()+]{7,15}$/.test(fromPhone.trim())) errors.fromPhone = 'Please enter a valid phone number';
    if (!fromCompany.trim()) errors.fromCompany = 'Company is required';
    if (!fromAddress1.trim()) errors.fromAddress1 = 'Address 1 is required';
    if (!fromZip.trim()) errors.fromZip = 'Zip is required';
    else if (!/^\d{5}$/.test(fromZip.trim())) errors.fromZip = 'Please enter a valid 5-digit zip code';
    if (!fromCountry.trim()) errors.fromCountry = 'Country is required';
    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!toName.trim()) errors.toName = 'Name is required';
    if (!toCompany.trim()) errors.toCompany = 'Company is required';
    if (!toAddress1.trim()) errors.toAddress1 = 'Address 1 is required';
    if (!toZip.trim()) errors.toZip = 'Zip is required';
    else if (!/^\d{5}$/.test(toZip.trim())) errors.toZip = 'Please enter a valid 5-digit zip code';
    if (!toPhone.trim()) errors.toPhone = 'Phone is required';
    else if (!/^[\d\s\-()+]{7,15}$/.test(toPhone.trim())) errors.toPhone = 'Please enter a valid phone number';
    if (!toDeclaredValue.trim()) errors.toDeclaredValue = 'Declared Value is required';
    else if (parseFloat(toDeclaredValue) < 0) errors.toDeclaredValue = 'Declared Value cannot be negative';
    if (!toWeight.trim()) errors.toWeight = 'Weight is required';
    else if (parseFloat(toWeight) <= 0) errors.toWeight = 'Weight must be greater than 0';
    if (!toDimLength.trim() || !toDimWidth.trim() || !toDimHeight.trim()) errors.toDimensions = 'Dimensions are required';
    else if (parseFloat(toDimLength) <= 0 || parseFloat(toDimWidth) <= 0 || parseFloat(toDimHeight) <= 0) errors.toDimensions = 'Each dimension must be greater than 0';
    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckRate = () => { if (!validateStep1()) return; setShowSummary(true); };
  const handleStep1Continue = () => { if (!validateStep1()) return; if (!showSummary) { setShowSummary(true); return; } setCurrentStep(2); };
  const handleStep2Continue = () => { if (!validateStep2()) return; setCurrentStep(3); };
  const handleStep3Continue = () => { if (!validateStep3()) return; setCurrentStep(4); };
  const handleStep4Continue = () => { setCurrentStep(5); };

  const handleResetForm = () => {
    setCurrentStep(1); setShowSummary(false);
    setOriginatingZip(''); setDestinationZip(''); setService(''); setWeight('');
    setDimLength(''); setDimWidth(''); setDimHeight(''); setDeclaredValue('100');
    setIsEnvelope(false); setToQuickCode(''); setCountry('United States'); setUseSimplePricing(true);
    setStep1Errors({});
    setFromQuickCode(''); setFromName(''); setFromPhone(''); setFromCompany('');
    setFromAddress1(''); setFromAddress2(''); setFromResidential(false);
    setFromCountry('United States'); setFromCity(''); setFromState(''); setFromZip('');
    setStep2Errors({});
    setToQuickCode3(''); setPieces('1'); setSameDeliveryOptions(false); setApplyWeightAll('');
    setToName(''); setToCompany(''); setToAddress1(''); setToAddress2('');
    setToResidential(false); setToCountry3('United States'); setToCity(''); setToState(''); setToZip('');
    setToPhone(''); setToDeclaredValue('100'); setToWeight(''); setToDimLength(''); setToDimWidth(''); setToDimHeight('');
    setToEnvelope(false); setStep3Errors({});
    setBillingRef1(''); setBillingRef2(''); setBillingRef3(''); setBillingRef4('');
    setSignatureReq('None'); setReleaseSignature(false); setReleaseSignatureName('');
    setDeliveryNotification(false); setDeliveryNotificationEmail('');
    setEmailNotifications('None'); setReturnLabels('None'); setHandlingFee('');
    setPoNumber(''); setPromotionCode(''); setThirdPartyBilling(''); setLsoPickup(false);
    showToast('Form has been reset.');
  };

  const summary = computeSummary();

  return (
    <div className="ship-with-account-page">
      <div className="ship-content-wrapper">
        <div className="ship-content">
          {/* Page Title */}
          <div className="ship-page-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M1 12L5 4h14l4 8" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12h22v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6z" stroke="#003087" strokeWidth="2"/>
              <line x1="12" y1="4" x2="12" y2="12" stroke="#003087" strokeWidth="2"/>
            </svg>
            <h1>Ship With Account</h1>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className="progress-line-bg"></div>
            {steps.map((step) => (
              <div key={step.number} className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                <div className="step-label">{step.title}</div>
                <div className="step-number">{currentStep > step.number ? '✓' : step.number}</div>
              </div>
            ))}
          </div>

          {/* Blue Divider */}
          <div className="step-divider"></div>

          {/* Step Content */}
          <div className="step-content">

            {/* ===== STEP 1: Check Service Area ===== */}
            {currentStep === 1 && (
              <div className={`step-form ${showSummary ? 'step1-with-summary' : ''}`}>
                <div className="step1-form-area">
                  <div className="form-header-row">
                    <h2>Check Service Area</h2>
                    <span className="required-notice"><span className="required-star">*</span>required fields</span>
                  </div>
                  <div className="form-row-4col">
                    <div className="form-field">
                      <label>Originating Zip<span className="required-star">*</span></label>
                      <input type="text" value={originatingZip} onChange={(e) => { setOriginatingZip(e.target.value); setStep1Errors(p => ({...p, originatingZip: ''})); }} maxLength={5} className={step1Errors.originatingZip ? 'input-error' : ''} />
                      {step1Errors.originatingZip && <span className="field-error">{step1Errors.originatingZip}</span>}
                    </div>
                    <div className="form-field">
                      <div className="label-with-action">
                        <label>To Quick Code</label>
                        <button type="button" className="refresh-btn" onClick={() => {}}>🔄 Refresh</button>
                      </div>
                      <select value={toQuickCode} onChange={(e) => setToQuickCode(e.target.value)} className="form-select-field">
                        <option value="">Select Quick Code</option>
                        <option value="HOME01">HOME01</option>
                        <option value="OFFICE">OFFICE</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Destination Zip<span className="required-star">*</span></label>
                      <input type="text" value={destinationZip} onChange={(e) => { setDestinationZip(e.target.value); setStep1Errors(p => ({...p, destinationZip: ''})); }} maxLength={5} className={step1Errors.destinationZip ? 'input-error' : ''} />
                      {step1Errors.destinationZip && <span className="field-error">{step1Errors.destinationZip}</span>}
                    </div>
                    <div className="form-field">
                      <label>Country<span className="required-star">*</span></label>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className="form-select-field">
                        <option value="Mexico">Mexico</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>
                  <div className="service-box">
                    <div className="form-field">
                      <label>Service selected<span className="required-star">*</span></label>
                      <select value={service} onChange={(e) => { setService(e.target.value); setStep1Errors(p => ({...p, service: ''})); }} className={`form-select-field ${step1Errors.service ? 'input-error' : ''}`}>
                        <option value="">Select service</option>
                        <option value="LSO Priority Next Day™">LSO Priority Next Day™</option>
                        <option value="LSO Early Next Day™">LSO Early Next Day™</option>
                        <option value="LSO Economy Next Day™">LSO Economy Next Day™</option>
                        <option value="LSO Ground™">LSO Ground™</option>
                        <option value="LSO 2nd Day™">LSO 2nd Day™</option>
                        <option value="LSO E-Commerce Delivery™">LSO E-Commerce Delivery™</option>
                      </select>
                      {step1Errors.service && <span className="field-error">{step1Errors.service}</span>}
                    </div>
                    <div className="service-box-footer">
                      <label className="checkbox-inline">
                        <input type="checkbox" checked={useSimplePricing} onChange={(e) => setUseSimplePricing(e.target.checked)} />
                        <span>Use <a href="/calculate-rates" className="link-blue">Simple Pricing</a></span>
                      </label>
                      <span className="pricing-link">Go to pricing page <a href="/calculate-rates" className="link-blue">here</a></span>
                    </div>
                  </div>
                  <div className="form-row-3col-wde">
                    <div className="form-field">
                      <label>Weight<span className="required-star">*</span></label>
                      <div className="input-with-suffix">
                        <input type="text" inputMode="decimal" value={weight} onChange={(e) => { limitPrecision(e.target.value, setWeight); setStep1Errors(p => ({...p, weight: ''})); }} className={step1Errors.weight ? 'input-error' : ''} disabled={isEnvelope} />
                        <span className="input-suffix">lbs.</span>
                      </div>
                      {step1Errors.weight && <span className="field-error">{step1Errors.weight}</span>}
                    </div>
                    <div className="form-field">
                      <label>Dimensions<span className="required-star">*</span></label>
                      <div className="dimension-row">
                        <input type="text" inputMode="decimal" value={dimLength} onChange={(e) => { limitPrecision(e.target.value, setDimLength); setStep1Errors(p => ({...p, dimensions: ''})); }} className={step1Errors.dimensions ? 'input-error' : ''} disabled={isEnvelope} />
                        <span className="dim-x">x</span>
                        <input type="text" inputMode="decimal" value={dimWidth} onChange={(e) => { limitPrecision(e.target.value, setDimWidth); setStep1Errors(p => ({...p, dimensions: ''})); }} className={step1Errors.dimensions ? 'input-error' : ''} disabled={isEnvelope} />
                        <span className="dim-x">x</span>
                        <input type="text" inputMode="decimal" value={dimHeight} onChange={(e) => { limitPrecision(e.target.value, setDimHeight); setStep1Errors(p => ({...p, dimensions: ''})); }} className={step1Errors.dimensions ? 'input-error' : ''} disabled={isEnvelope} />
                        <span className="dim-unit">in.</span>
                      </div>
                      {step1Errors.dimensions && <span className="field-error">{step1Errors.dimensions}</span>}
                    </div>
                    <div className="form-field">
                      <label>&nbsp;</label>
                      <label className="checkbox-inline" style={{ marginTop: '8px' }}>
                        <input type="checkbox" checked={isEnvelope} onChange={(e) => setIsEnvelope(e.target.checked)} />
                        <span>Envelope</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-row-2col">
                    <div className="form-field">
                      <label>Declared Value<span className="required-star">*</span></label>
                      <div className="input-with-prefix">
                        <span className="input-prefix">$</span>
                        <input type="number" value={declaredValue} onChange={(e) => { setDeclaredValue(e.target.value); setStep1Errors(p => ({...p, declaredValue: ''})); }} min="0" step="0.01" className={step1Errors.declaredValue ? 'input-error' : ''} />
                      </div>
                      {step1Errors.declaredValue && <span className="field-error">{step1Errors.declaredValue}</span>}
                    </div>
                  </div>
                  {precisionHint && (
                    <div className="precision-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0d6eaa" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#0d6eaa" strokeWidth="2" strokeLinecap="round"/></svg>
                      {precisionHint}
                    </div>
                  )}
                </div>
                {showSummary && (
                  <div className="step1-summary-side">
                    <div className="summary-side-panel">
                      <div className="summary-side-header">Summary</div>
                      <div className="summary-side-body">
                        <div className="summary-side-row"><span>Service selected</span><span className="summary-side-val">{summary.service}</span></div>
                        <div className="summary-side-row"><span>Estimated base price</span><span className="summary-side-val">${summary.basePrice.toFixed(2)}</span></div>
                        <div className="summary-side-row"><span>Estimated service charge</span><span className="summary-side-val">${summary.serviceCharge.toFixed(2)}</span></div>
                        <div className="summary-side-row"><span>Estimated additional insurance charge</span><span className="summary-side-val">${summary.insuranceCharge.toFixed(2)}</span></div>
                        <div className="summary-side-row"><span>Estimated fuel surcharge</span><span className="summary-side-val">${summary.fuelSurcharge.toFixed(2)}</span></div>
                        <div className="summary-side-row summary-side-total"><span>Estimated total charge</span><span className="summary-side-val">${summary.totalCharge.toFixed(2)}</span></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="step1-actions-full">
                  <div className="step-actions">
                    <button type="button" className="btn-cancel" onClick={handleResetForm}>Reset</button>
                    <div className="step-actions-right">
                      <button type="button" className="btn-outline" onClick={handleCheckRate}>Check rate</button>
                      {showSummary && <button type="button" className="btn-primary" onClick={handleStep1Continue}>Continue</button>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== STEP 2: Ship From ===== */}
            {currentStep === 2 && (
              <div className="step-form">
                <div className="form-header-row">
                  <h2>Ship From</h2>
                  <span className="required-notice"><span className="required-star">*</span>required fields</span>
                </div>
                <div className="form-row-2col">
                  <div className="form-field">
                    <div className="label-with-action">
                      <label>From Quick Code</label>
                      <button type="button" className="refresh-btn" onClick={() => {}}>🔄 Refresh</button>
                    </div>
                    <select value={fromQuickCode} onChange={(e) => setFromQuickCode(e.target.value)} className="form-select-field">
                      <option value="">Select or type to add new Quick Code</option>
                      <option value="HOME01">HOME01</option>
                      <option value="OFFICE">OFFICE</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Name<span className="required-star">*</span></label>
                    <input type="text" value={fromName} onChange={(e) => { setFromName(e.target.value); setStep2Errors(p => ({...p, fromName: ''})); }} placeholder="Name" className={step2Errors.fromName ? 'input-error' : ''} />
                    {step2Errors.fromName && <span className="field-error">{step2Errors.fromName}</span>}
                  </div>
                </div>
                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Phone<span className="required-star">*</span></label>
                    <input type="tel" value={fromPhone} onChange={(e) => { setFromPhone(e.target.value); setStep2Errors(p => ({...p, fromPhone: ''})); }} placeholder="Phone" className={step2Errors.fromPhone ? 'input-error' : ''} />
                    {step2Errors.fromPhone && <span className="field-error">{step2Errors.fromPhone}</span>}
                  </div>
                  <div className="form-field">
                    <label>Company<span className="required-star">*</span></label>
                    <input type="text" value={fromCompany} onChange={(e) => { setFromCompany(e.target.value); setStep2Errors(p => ({...p, fromCompany: ''})); }} placeholder="Company" className={step2Errors.fromCompany ? 'input-error' : ''} />
                    {step2Errors.fromCompany && <span className="field-error">{step2Errors.fromCompany}</span>}
                  </div>
                </div>
                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Address 1<span className="required-star">*</span></label>
                    <input type="text" value={fromAddress1} onChange={(e) => { setFromAddress1(e.target.value); setStep2Errors(p => ({...p, fromAddress1: ''})); }} placeholder="Address 1" className={step2Errors.fromAddress1 ? 'input-error' : ''} />
                    {step2Errors.fromAddress1 && <span className="field-error">{step2Errors.fromAddress1}</span>}
                  </div>
                  <div className="form-field">
                    <label>Address 2</label>
                    <input type="text" value={fromAddress2} onChange={(e) => setFromAddress2(e.target.value)} placeholder="Address" />
                  </div>
                </div>
                <div className="envelope-row">
                  <label className="checkbox-inline">
                    <input type="checkbox" checked={fromResidential} onChange={(e) => setFromResidential(e.target.checked)} />
                    <span>Residential Address</span>
                  </label>
                </div>
                <div className="form-row-address">
                  <div className="form-field field-country">
                    <label>Country<span className="required-star">*</span></label>
                    <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="form-select-field">
                      <option value="Mexico">Mexico</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                  <div className="form-field field-city">
                    <label>City</label>
                    <input type="text" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
                  </div>
                  <div className="form-field field-state">
                    <label>State</label>
                    <input type="text" value={fromState} onChange={(e) => setFromState(e.target.value)} maxLength={2} />
                  </div>
                  <div className="form-field field-zip">
                    <label>Zip<span className="required-star">*</span></label>
                    <input type="text" value={fromZip} onChange={(e) => { setFromZip(e.target.value); setStep2Errors(p => ({...p, fromZip: ''})); }} maxLength={5} className={step2Errors.fromZip ? 'input-error' : ''} />
                    {step2Errors.fromZip && <span className="field-error">{step2Errors.fromZip}</span>}
                  </div>
                </div>
                <div className="step-actions step-actions-end">
                  <button type="button" className="btn-outline" onClick={() => setCurrentStep(1)}>Go Back</button>
                  <button type="button" className="btn-primary" onClick={handleStep2Continue}>Continue</button>
                </div>
              </div>
            )}

            {/* ===== STEP 3: Ship To ===== */}
            {currentStep === 3 && (
              <div className="step-form">
                <div className="form-header-row">
                  <h2>Ship To</h2>
                  <span className="required-notice"><span className="required-star">*</span>required fields</span>
                </div>

                {/* Top controls: To Quick Code, Pieces, checkboxes */}
                <div className="form-row-2col">
                  <div className="form-field">
                    <div className="label-with-action">
                      <label>To Quick Code</label>
                      <button type="button" className="refresh-btn" onClick={() => {}}>🔄 Refresh</button>
                    </div>
                    <select value={toQuickCode3} onChange={(e) => setToQuickCode3(e.target.value)} className="form-select-field">
                      <option value="">Select or type to add new Quick Code</option>
                      <option value="" disabled>No options</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Pieces</label>
                    <input type="number" value={pieces} onChange={(e) => setPieces(e.target.value)} min="1" />
                  </div>
                </div>

                <div className="step3-options-row">
                  <div className="step3-options-left">
                    <label className="checkbox-inline">
                      <input type="checkbox" checked={sameDeliveryOptions} onChange={(e) => setSameDeliveryOptions(e.target.checked)} />
                      <span>Same delivery options for all packages</span>
                    </label>
                    <span className="step3-help-link">(see <a href="#help" className="link-blue">help</a> for details)</span>
                  </div>
                  <div className="apply-weight-row">
                    <label className="checkbox-label-text">Apply weight to all packages (lbs.)</label>
                    <div className="apply-weight-input">
                      <input type="number" value={applyWeightAll} onChange={(e) => setApplyWeightAll(e.target.value)} placeholder="" min="0" step="0.1" />
                      <span className="apply-weight-suffix">lbs.</span>
                      <button type="button" className="btn-apply" onClick={() => { if (applyWeightAll) { setToWeight(applyWeightAll); showToast('Weight applied to all packages.'); } }}>Apply</button>
                    </div>
                  </div>
                </div>

                {/* Airbill 1 Section */}
                <div className="airbill-section">
                  <div className="airbill-header">Airbill 1</div>
                  <div className="airbill-body">
                    <div className="form-row-2col">
                      <div className="form-field">
                        <label>Name<span className="required-star">*</span></label>
                        <input type="text" value={toName} onChange={(e) => { setToName(e.target.value); setStep3Errors(p => ({...p, toName: ''})); }} className={step3Errors.toName ? 'input-error' : ''} />
                        {step3Errors.toName && <span className="field-error">{step3Errors.toName}</span>}
                      </div>
                      <div className="form-field">
                        <label>Company<span className="required-star">*</span></label>
                        <input type="text" value={toCompany} onChange={(e) => { setToCompany(e.target.value); setStep3Errors(p => ({...p, toCompany: ''})); }} className={step3Errors.toCompany ? 'input-error' : ''} />
                        {step3Errors.toCompany && <span className="field-error">{step3Errors.toCompany}</span>}
                      </div>
                    </div>
                    <div className="form-row-2col">
                      <div className="form-field">
                        <label>Address 1<span className="required-star">*</span></label>
                        <input type="text" value={toAddress1} onChange={(e) => { setToAddress1(e.target.value); setStep3Errors(p => ({...p, toAddress1: ''})); }} className={step3Errors.toAddress1 ? 'input-error' : ''} />
                        {step3Errors.toAddress1 && <span className="field-error">{step3Errors.toAddress1}</span>}
                      </div>
                      <div className="form-field">
                        <label>Address 2</label>
                        <input type="text" value={toAddress2} onChange={(e) => setToAddress2(e.target.value)} />
                      </div>
                    </div>
                    <div className="envelope-row">
                      <label className="checkbox-inline">
                        <input type="checkbox" checked={toResidential} onChange={(e) => setToResidential(e.target.checked)} />
                        <span>Residential Address</span>
                      </label>
                    </div>
                    <div className="form-row-address">
                      <div className="form-field field-country">
                        <label>Country<span className="required-star">*</span></label>
                        <select value={toCountry3} onChange={(e) => setToCountry3(e.target.value)} className="form-select-field">
                          <option value="Mexico">Mexico</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>
                      <div className="form-field field-city">
                        <label>City</label>
                        <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} />
                      </div>
                      <div className="form-field field-state">
                        <label>State</label>
                        <input type="text" value={toState} onChange={(e) => setToState(e.target.value)} maxLength={2} />
                      </div>
                      <div className="form-field field-zip">
                        <label>Zip<span className="required-star">*</span></label>
                        <input type="text" value={toZip} onChange={(e) => { setToZip(e.target.value); setStep3Errors(p => ({...p, toZip: ''})); }} maxLength={5} className={step3Errors.toZip ? 'input-error' : ''} />
                        {step3Errors.toZip && <span className="field-error">{step3Errors.toZip}</span>}
                      </div>
                    </div>
                    <div className="form-row-2col">
                      <div className="form-field">
                        <label>Phone<span className="required-star">*</span></label>
                        <input type="tel" value={toPhone} onChange={(e) => { setToPhone(e.target.value); setStep3Errors(p => ({...p, toPhone: ''})); }} className={step3Errors.toPhone ? 'input-error' : ''} />
                        {step3Errors.toPhone && <span className="field-error">{step3Errors.toPhone}</span>}
                      </div>
                      <div className="form-field">
                        <label>Declared Value<span className="required-star">*</span></label>
                        <div className="input-with-prefix">
                          <span className="input-prefix">$</span>
                          <input type="number" value={toDeclaredValue} onChange={(e) => { setToDeclaredValue(e.target.value); setStep3Errors(p => ({...p, toDeclaredValue: ''})); }} min="0" step="0.01" className={step3Errors.toDeclaredValue ? 'input-error' : ''} />
                        </div>
                        {step3Errors.toDeclaredValue && <span className="field-error">{step3Errors.toDeclaredValue}</span>}
                      </div>
                    </div>
                    <div className="form-row-2col">
                      <div className="form-field">
                        <label>Weight<span className="required-star">*</span></label>
                        <div className="input-with-suffix">
                          <input type="text" inputMode="decimal" value={toWeight} onChange={(e) => { limitPrecision(e.target.value, setToWeight); setStep3Errors(p => ({...p, toWeight: ''})); }} className={step3Errors.toWeight ? 'input-error' : ''} disabled={toEnvelope} />
                          <span className="input-suffix">lbs.</span>
                        </div>
                        {step3Errors.toWeight && <span className="field-error">{step3Errors.toWeight}</span>}
                      </div>
                      <div className="form-field">
                        <label>Dimensions<span className="required-star">*</span></label>
                        <div className="dimension-row">
                          <input type="text" inputMode="decimal" value={toDimLength} onChange={(e) => { limitPrecision(e.target.value, setToDimLength); setStep3Errors(p => ({...p, toDimensions: ''})); }} className={step3Errors.toDimensions ? 'input-error' : ''} disabled={toEnvelope} />
                          <span className="dim-x">x</span>
                          <input type="text" inputMode="decimal" value={toDimWidth} onChange={(e) => { limitPrecision(e.target.value, setToDimWidth); setStep3Errors(p => ({...p, toDimensions: ''})); }} className={step3Errors.toDimensions ? 'input-error' : ''} disabled={toEnvelope} />
                          <span className="dim-x">x</span>
                          <input type="text" inputMode="decimal" value={toDimHeight} onChange={(e) => { limitPrecision(e.target.value, setToDimHeight); setStep3Errors(p => ({...p, toDimensions: ''})); }} className={step3Errors.toDimensions ? 'input-error' : ''} disabled={toEnvelope} />
                          <span className="dim-unit">in.</span>
                        </div>
                        {step3Errors.toDimensions && <span className="field-error">{step3Errors.toDimensions}</span>}
                      </div>
                    </div>
                    <div className="envelope-row">
                      <label className="checkbox-inline">
                        <input type="checkbox" checked={toEnvelope} onChange={(e) => setToEnvelope(e.target.checked)} />
                        <span>Envelope</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="step-actions step-actions-end">
                  <button type="button" className="btn-outline" onClick={() => setCurrentStep(2)}>Go Back</button>
                  <button type="button" className="btn-primary" onClick={handleStep3Continue}>Continue</button>
                </div>
              </div>
            )}

            {/* ===== STEP 4: Shipping Options ===== */}
            {currentStep === 4 && (
              <div className="step-form">
                <div className="form-header-row">
                  <h2>Shipping Options</h2>
                  <span className="required-notice"><span className="required-star">*</span>required fields</span>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Billing Reference 1</label>
                    <input type="text" value={billingRef1} onChange={(e) => setBillingRef1(e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Billing Reference 2</label>
                    <input type="text" value={billingRef2} onChange={(e) => setBillingRef2(e.target.value)} />
                  </div>
                </div>
                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Billing Reference 3</label>
                    <input type="text" value={billingRef3} onChange={(e) => setBillingRef3(e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Billing Reference 4</label>
                    <input type="text" value={billingRef4} onChange={(e) => setBillingRef4(e.target.value)} />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Signature Requirement</label>
                    <select value={signatureReq} onChange={(e) => setSignatureReq(e.target.value)} className="form-select-field">
                      <option value="None">None</option>
                      <option value="General">General</option>
                      <option value="Adult">Adult</option>
                      <option value="Recipient">Recipient</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="checkbox-inline" style={{ marginTop: '28px' }}>
                      <input type="checkbox" checked={releaseSignature} onChange={(e) => setReleaseSignature(e.target.checked)} />
                      <span>Release Signature</span>
                    </label>
                    {releaseSignature && (
                      <input type="text" value={releaseSignatureName} onChange={(e) => setReleaseSignatureName(e.target.value)} placeholder="Printed name" style={{ marginTop: '8px' }} />
                    )}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label className="checkbox-inline">
                      <input type="checkbox" checked={deliveryNotification} onChange={(e) => setDeliveryNotification(e.target.checked)} />
                      <span>Delivery Notification</span>
                    </label>
                    {deliveryNotification && (
                      <input type="email" value={deliveryNotificationEmail} onChange={(e) => setDeliveryNotificationEmail(e.target.value)} placeholder="Email address" style={{ marginTop: '8px' }} />
                    )}
                  </div>
                  <div className="form-field">
                    <label>Email Notifications</label>
                    <select value={emailNotifications} onChange={(e) => setEmailNotifications(e.target.value)} className="form-select-field">
                      <option value="None">None</option>
                      <option value="Ship Notification">Ship Notification</option>
                      <option value="Exception Notification">Exception Notification</option>
                      <option value="Delivery Notification">Delivery Notification</option>
                      <option value="All Notifications">All Notifications</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label>Return Labels</label>
                    <select value={returnLabels} onChange={(e) => setReturnLabels(e.target.value)} className="form-select-field">
                      <option value="None">None</option>
                      <option value="Print Return Label">Print Return Label</option>
                      <option value="Email Return Label">Email Return Label</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Handling Fee</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input type="number" value={handlingFee} onChange={(e) => setHandlingFee(e.target.value)} min="0" step="0.01" />
                    </div>
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label>PO #</label>
                    <input type="text" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Promotion Code</label>
                    <input type="text" value={promotionCode} onChange={(e) => setPromotionCode(e.target.value)} />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-field">
                    <label>3rd Party Billing</label>
                    <input type="text" value={thirdPartyBilling} onChange={(e) => setThirdPartyBilling(e.target.value)} placeholder="Account number" />
                  </div>
                  <div className="form-field">
                    <label className="checkbox-inline" style={{ marginTop: '28px' }}>
                      <input type="checkbox" checked={lsoPickup} onChange={(e) => setLsoPickup(e.target.checked)} />
                      <span>LSO Pickup</span>
                    </label>
                  </div>
                </div>

                <div className="step-actions step4-actions">
                  <div className="step-actions-left">
                    <button type="button" className="btn-outline-sm" onClick={() => {}}>User Preferences</button>
                    <button type="button" className="btn-outline-sm" onClick={() => {}}>Help</button>
                    <button type="button" className="btn-outline-sm" onClick={() => {}}>Reports</button>
                  </div>
                  <div className="step-actions-right">
                    <button type="button" className="btn-outline" onClick={() => { setBillingRef1(''); setBillingRef2(''); setBillingRef3(''); setBillingRef4(''); setSignatureReq('None'); setReleaseSignature(false); setReleaseSignatureName(''); setDeliveryNotification(false); setDeliveryNotificationEmail(''); setEmailNotifications('None'); setReturnLabels('None'); setHandlingFee(''); setPoNumber(''); setPromotionCode(''); setThirdPartyBilling(''); setLsoPickup(false); }}>Clear form</button>
                    <button type="button" className="btn-primary" onClick={handleStep4Continue}>Continue</button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== STEP 5: Review & Create Airbill ===== */}
            {currentStep === 5 && (
              <div className="step-form">
                <div className="form-header-row">
                  <h2>Review &amp; Create Airbill</h2>
                </div>

                {/* From Section */}
                <div className="review-section">
                  <div className="review-section-header">
                    <span className="review-badge">From</span>
                    <button type="button" className="btn-edit" onClick={() => setCurrentStep(2)}>Edit</button>
                  </div>
                  <div className="review-details">
                    <div className="review-row"><span className="review-label">Name:</span><span>{fromName || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Company:</span><span>{fromCompany || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Address:</span><span>{fromAddress1}{fromAddress2 ? `, ${fromAddress2}` : ''}</span></div>
                    <div className="review-row"><span className="review-label">City/State/Zip:</span><span>{fromCity}{fromState ? `, ${fromState}` : ''} {fromZip}</span></div>
                    <div className="review-row"><span className="review-label">Country:</span><span>{fromCountry}</span></div>
                    <div className="review-row"><span className="review-label">Phone:</span><span>{fromPhone || '—'}</span></div>
                    {fromResidential && <div className="review-row"><span className="review-label">Type:</span><span>Residential</span></div>}
                  </div>
                </div>

                {/* Airbill 1 - To Section */}
                <div className="review-section">
                  <div className="review-section-header">
                    <div className="review-badge-group">
                      <span className="review-badge">Airbill 1</span>
                      <span className="review-badge review-badge-to">To</span>
                    </div>
                    <button type="button" className="btn-edit" onClick={() => setCurrentStep(3)}>Edit</button>
                  </div>
                  <div className="review-details">
                    <div className="review-row"><span className="review-label">Name:</span><span>{toName || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Company:</span><span>{toCompany || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Address:</span><span>{toAddress1}{toAddress2 ? `, ${toAddress2}` : ''}</span></div>
                    <div className="review-row"><span className="review-label">City/State/Zip:</span><span>{toCity}{toState ? `, ${toState}` : ''} {toZip}</span></div>
                    <div className="review-row"><span className="review-label">Country:</span><span>{toCountry3}</span></div>
                    <div className="review-row"><span className="review-label">Phone:</span><span>{toPhone || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Service:</span><span>{service || '—'}</span></div>
                    <div className="review-row"><span className="review-label">Weight:</span><span>{toWeight || weight} lbs</span></div>
                    <div className="review-row"><span className="review-label">Dimensions:</span><span>{toDimLength || dimLength} x {toDimWidth || dimWidth} x {toDimHeight || dimHeight} in.</span></div>
                    <div className="review-row"><span className="review-label">Declared Value:</span><span>${toDeclaredValue || declaredValue}</span></div>
                    {(toEnvelope || isEnvelope) && <div className="review-row"><span className="review-label">Package:</span><span>Envelope</span></div>}
                  </div>
                  <div className="review-cost-summary">
                    <div className="summary-row"><span>Estimated base price</span><span className="summary-val">${summary.basePrice.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Fuel surcharge</span><span className="summary-val">${summary.fuelSurcharge.toFixed(2)}</span></div>
                    <div className="summary-row summary-total"><span>Estimated total</span><span className="summary-val">${summary.totalCharge.toFixed(2)}</span></div>
                  </div>
                </div>

                {/* Shipping Options Section */}
                <div className="review-section">
                  <div className="review-section-header">
                    <span className="review-badge">Shipping Options</span>
                    <button type="button" className="btn-edit" onClick={() => setCurrentStep(4)}>Edit</button>
                  </div>
                  <div className="review-details">
                    {billingRef1 && <div className="review-row"><span className="review-label">Billing Ref 1:</span><span>{billingRef1}</span></div>}
                    {billingRef2 && <div className="review-row"><span className="review-label">Billing Ref 2:</span><span>{billingRef2}</span></div>}
                    {billingRef3 && <div className="review-row"><span className="review-label">Billing Ref 3:</span><span>{billingRef3}</span></div>}
                    {billingRef4 && <div className="review-row"><span className="review-label">Billing Ref 4:</span><span>{billingRef4}</span></div>}
                    <div className="review-row"><span className="review-label">Signature:</span><span>{signatureReq}</span></div>
                    {releaseSignature && <div className="review-row"><span className="review-label">Release Signature:</span><span>{releaseSignatureName || 'Yes'}</span></div>}
                    {deliveryNotification && <div className="review-row"><span className="review-label">Delivery Notification:</span><span>{deliveryNotificationEmail || 'Yes'}</span></div>}
                    {emailNotifications !== 'None' && <div className="review-row"><span className="review-label">Email Notifications:</span><span>{emailNotifications}</span></div>}
                    {returnLabels !== 'None' && <div className="review-row"><span className="review-label">Return Labels:</span><span>{returnLabels}</span></div>}
                    {handlingFee && <div className="review-row"><span className="review-label">Handling Fee:</span><span>${handlingFee}</span></div>}
                    {poNumber && <div className="review-row"><span className="review-label">PO #:</span><span>{poNumber}</span></div>}
                    {promotionCode && <div className="review-row"><span className="review-label">Promotion Code:</span><span>{promotionCode}</span></div>}
                    {thirdPartyBilling && <div className="review-row"><span className="review-label">3rd Party Billing:</span><span>{thirdPartyBilling}</span></div>}
                    {lsoPickup && <div className="review-row"><span className="review-label">LSO Pickup:</span><span>Yes</span></div>}
                  </div>
                </div>

                <div className="step-actions step5-actions">
                  <div className="step-actions-left">
                    <button type="button" className="btn-outline" onClick={() => { showToast('Ready for another shipment.'); setCurrentStep(1); setShowSummary(false); }}>Ship another package</button>
                    <button type="button" className="btn-outline-sm" onClick={() => {}}>Reports</button>
                  </div>
                  <div className="step-actions-right">
                    <button type="button" className="btn-outline" onClick={() => {}}>Schedule a pickup</button>
                    <button type="button" className="btn-primary" onClick={() => { showToast('Airbill created successfully! Label ready to print.'); }}>Print label</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default ShipWithAccount;
