import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '../Components/Toast/ToastContainer';
import reportService from '../services/reportService';
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

const REPORT_REASONS = [
  { value: 'inappropriate_content', label: 'Inappropriate Content', icon: 'visibility_off', hint: 'Contains offensive or inappropriate material' },
  { value: 'fake_listing', label: 'Fake Listing', icon: 'block', hint: 'Listing appears to be fraudulent or fake' },
  { value: 'wrong_category', label: 'Wrong Category', icon: 'category', hint: 'Posted in an incorrect category' },
  { value: 'spam', label: 'Spam', icon: 'report', hint: 'Spam, scam, or misleading content' },
  { value: 'price_fraud', label: 'Price Fraud', icon: 'attach_money', hint: 'Suspicious pricing or overcharging' },
  { value: 'other', label: 'Other', icon: 'more_horiz', hint: 'Other reason not listed above' },
];

const ReportPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const productName = location.state?.productName || '';

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedReason = watch('reason');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pickReason = (value) => {
    if (isSubmitting) return;
    setValue('reason', value);
  };

  const onSubmit = async (data) => {
    try {
      await reportService.submitReport({
        productId,
        reason: data.reason,
        message: data.message?.trim() || '',
      });
      showToast('Report submitted successfully. Thank you!', 'success', 3000);
      navigate(-1);
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to submit report.';
      showToast(msg, 'error', 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#060E20] py-10 px-4 relative">
      <AtmosphericBlooms intensity="vibrant" />

      <div className="relative z-10 w-full max-w-2xl animate-fadeIn">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-on-surface-variant/70 hover:text-primary mb-8 transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.1)]"
          style={{ background: 'rgba(15,12,41,0.95)', backdropFilter: 'blur(24px)' }}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-white/10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-red-400 text-2xl" data-icon="flag">flag</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Report Listing</h1>
                <p className="text-sm text-on-surface-variant/60 mt-0.5">Help us keep the marketplace safe</p>
              </div>
            </div>
            {productName && (
              <div className="bg-white/5 rounded-xl border border-white/8 px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-sm" data-icon="inventory_2">inventory_2</span>
                <span className="text-sm text-slate-300 font-medium truncate">{productName}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7 space-y-6">
            {/* Reason chips */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Reason for reporting <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REPORT_REASONS.map((r) => {
                  const active = selectedReason === r.value;
                  return (
                    <div key={r.value}>
                      <button
                        type="button"
                        onClick={() => pickReason(r.value)}
                        className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                          active
                            ? 'bg-red-500/20 border-red-500/40 text-red-300 shadow-sm'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/8 hover:border-white/15'
                        }`}
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>{r.icon}</span>
                        {r.label}
                      </button>
                      {active && r.hint && (
                        <p className="text-xs text-on-surface-variant/60 mt-1.5 px-1 leading-snug">{r.hint}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.reason && (
              <p className="text-xs text-red-400">{errors.reason.message}</p>
            )}

            {/* Comment / Description - Always visible */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Describe the issue <span className={selectedReason !== 'other' ? 'text-slate-500' : 'text-red-400'}>
                  {selectedReason === 'other' ? '*' : '(optional)'}
                </span>
              </label>
              <textarea
                rows={4}
                placeholder={
                  selectedReason === 'other'
                    ? 'Please explain the issue in detail...'
                    : selectedReason
                      ? 'Add any additional context or details that might help...'
                      : 'First select a reason above...'
                }
                {...register('message', {
                  required: selectedReason === 'other' ? 'Please provide details about the issue' : false,
                })}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm leading-relaxed text-white placeholder:text-slate-500 focus:outline-none resize-none transition-all ${
                  selectedReason === 'other'
                    ? 'border-white/10 focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!selectedReason || isSubmitting}
              className={`w-full py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 ${
                !selectedReason || isSubmitting
                  ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                  Submit Report
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
