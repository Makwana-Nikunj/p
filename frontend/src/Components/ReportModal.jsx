import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from './Toast/ToastContainer';

const REPORT_REASONS = [
  { value: 'inappropriate_content', label: 'Inappropriate Content', icon: 'visibility_off' },
  { value: 'fake_listing', label: 'Fake Listing', icon: 'block' },
  { value: 'wrong_category', label: 'Wrong Category', icon: 'category' },
  { value: 'spam', label: 'Spam', icon: 'report' },
  { value: 'price_fraud', label: 'Price Fraud', icon: 'attach_money' },
  { value: 'other', label: 'Other', icon: 'more_horiz' },
];

const ReportModal = ({ isOpen, onClose, productId, productName }) => {
  const { showToast } = useToast();
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
    if (isOpen) {
      reset();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, reset]);

  const handleEscape = (e) => {
    if (e.key === 'Escape') onClose();
  };

  const pickReason = (value) => {
    if (isSubmitting) return;
    setValue('reason', value);
  };

  const onSubmit = async (data) => {
    try {
      const reportService = (await import('../services/reportService.js')).default;
      await reportService.submitReport({
        productId,
        reason: data.reason,
        message: data.message?.trim() || '',
      });
      showToast('Report submitted. Thank you!', 'success', 3000);
      onClose();
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to submit report.';
      showToast(msg, 'error', 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={handleEscape}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Compact Popup */}
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.15)] transition-all animate-fadeIn"
        style={{ background: 'rgba(15,12,41,0.95)', backdropFilter: 'blur(24px)' }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-400 text-base" data-icon="flag">flag</span>
            </div>
            <span className="text-sm font-bold text-white">Report Listing</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400 text-lg" data-icon="close">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 space-y-4">
          {/* Product name */}
          {productName && (
            <p className="text-xs text-slate-400 truncate">
              Reporting: <span className="text-slate-300 font-medium">{productName}</span>
            </p>
          )}

          {/* Reason chips */}
          <div>
            <p className="text-xs font-semibold text-slate-300 mb-2">Why are you reporting this?</p>
            <div className="grid grid-cols-2 gap-1.5">
              {REPORT_REASONS.map((r) => {
                const active = selectedReason === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => pickReason(r.value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      active
                        ? 'bg-red-500/20 border-red-500/40 text-red-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/8 hover:border-white/15'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm" data-icon={r.icon} style={{ fontVariationSettings: "'FILL' 1" }}>{r.icon}</span>
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
          {errors.reason && (
            <p className="text-xs text-red-400">{errors.reason.message}</p>
          )}

          {/* Message field (conditional) */}
          {selectedReason === 'other' && (
            <div>
              <textarea
                rows={2}
                placeholder="Describe the issue..."
                {...register('message', {
                  required: 'Please provide details',
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500/40 transition-all resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
              )}
            </div>
          )}

          {selectedReason && selectedReason !== 'other' && (
            <div>
              <textarea
                rows={2}
                placeholder="Additional details (optional)"
                {...register('message')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/40 transition-all resize-none"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!selectedReason || isSubmitting}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              !selectedReason || isSubmitting
                ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
