import React from 'react';

const ReportsSection = () => {
    return (
        <section className="mb-12">
            <div className="glass-panel rounded-3xl p-20 shadow-2xl">
                <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                    {/* Icon */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-tertiary/10 flex items-center justify-center mb-6 border border-primary/20">
                        <span className="material-symbols-outlined text-5xl text-primary">assessment</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-headline text-on-surface mb-3">
                        Reports Coming Soon
                    </h3>

                    {/* Description */}
                    <p className="text-on-surface-variant leading-relaxed mb-8">
                        User-reported products and moderation insights will appear here.
                        This section is under development to provide comprehensive analytics
                        and reporting tools for platform administrators.
                    </p>

                    {/* Feature list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                        <div className="glass p-4 rounded-xl border border-subtle">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary">flag</span>
                                <span className="text-sm font-semibold text-on-surface">Reported Products</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">
                                View and manage product reports from users
                            </p>
                        </div>

                        <div className="glass p-4 rounded-xl border border-subtle">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-tertiary">trending_up</span>
                                <span className="text-sm font-semibold text-on-surface">Analytics</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">
                                Insights on platform health and user safety
                            </p>
                        </div>

                        <div className="glass p-4 rounded-xl border border-subtle">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-secondary">history</span>
                                <span className="text-sm font-semibold text-on-surface">Moderation Log</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">
                                Track all moderation actions taken
                            </p>
                        </div>

                        <div className="glass p-4 rounded-xl border border-subtle">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary">download</span>
                                <span className="text-sm font-semibold text-on-surface">Export Reports</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">
                                Download detailed reports in CSV/PDF format
                            </p>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-on-surface-variant/60 mt-8">
                        This feature will be available in a future update.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReportsSection;
